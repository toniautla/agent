import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, stripe-signature',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get environment variables
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeWebhookSecret || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the raw body and signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      throw new Error('Missing Stripe signature');
    }

    // Verify webhook signature
    const crypto = await import('node:crypto');
    const elements = signature.split(',');
    const signatureElements: { [key: string]: string } = {};

    for (const element of elements) {
      const [key, value] = element.split('=');
      signatureElements[key] = value;
    }

    const timestamp = signatureElements.t;
    const v1 = signatureElements.v1;

    if (!timestamp || !v1) {
      throw new Error('Invalid signature format');
    }

    // Create expected signature
    const payload = timestamp + '.' + body;
    const expectedSignature = crypto
      .createHmac('sha256', stripeWebhookSecret)
      .update(payload, 'utf8')
      .digest('hex');

    if (expectedSignature !== v1) {
      throw new Error('Invalid signature');
    }

    // Parse the event
    const event = JSON.parse(body);
    console.log('Received Stripe webhook:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(supabase, event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(supabase, event.data.object);
        break;

      case 'payment_intent.canceled':
        await handlePaymentCanceled(supabase, event.data.object);
        break;

      case 'charge.dispute.created':
        await handleChargeDispute(supabase, event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);

    return new Response(
      JSON.stringify({
        error: error.message || 'Webhook processing failed',
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

async function handlePaymentSucceeded(supabase: any, paymentIntent: any) {
  try {
    console.log('Processing successful payment:', paymentIntent.id);

    // Extract order information from metadata
    const orderId = paymentIntent.metadata?.order_id;
    const userId = paymentIntent.metadata?.user_id;

    if (!orderId || !userId) {
      console.error('Missing order_id or user_id in payment intent metadata');
      return;
    }

    // Update order status to 'purchased'
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'purchased',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .eq('user_id', userId);

    if (orderError) {
      console.error('Error updating order status:', orderError);
      return;
    }

    // Create payment record
    const { error: paymentError } = await supabase.from('payments').insert({
      id: paymentIntent.id,
      order_id: orderId,
      user_id: userId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: 'succeeded',
      payment_method: paymentIntent.payment_method,
      created_at: new Date(paymentIntent.created * 1000).toISOString(),
    });

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
    }

    // Send confirmation email (optional)
    // await sendOrderConfirmationEmail(userId, orderId)

    console.log(`Order ${orderId} marked as purchased`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailed(supabase: any, paymentIntent: any) {
  try {
    console.log('Processing failed payment:', paymentIntent.id);

    const orderId = paymentIntent.metadata?.order_id;
    const userId = paymentIntent.metadata?.user_id;

    if (!orderId || !userId) {
      console.error('Missing order_id or user_id in payment intent metadata');
      return;
    }

    // Update order status to 'cancelled' or keep as 'pending'
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'pending', // Keep as pending so user can retry payment
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .eq('user_id', userId);

    if (orderError) {
      console.error('Error updating order status:', orderError);
    }

    // Create payment record
    const { error: paymentError } = await supabase.from('payments').insert({
      id: paymentIntent.id,
      order_id: orderId,
      user_id: userId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: 'failed',
      payment_method: paymentIntent.payment_method,
      failure_reason: paymentIntent.last_payment_error?.message,
      created_at: new Date(paymentIntent.created * 1000).toISOString(),
    });

    if (paymentError) {
      console.error('Error creating payment record:', paymentError);
    }

    console.log(`Payment failed for order ${orderId}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePaymentCanceled(supabase: any, paymentIntent: any) {
  try {
    console.log('Processing canceled payment:', paymentIntent.id);

    const orderId = paymentIntent.metadata?.order_id;
    const userId = paymentIntent.metadata?.user_id;

    if (!orderId || !userId) {
      console.error('Missing order_id or user_id in payment intent metadata');
      return;
    }

    // Update order status to 'cancelled'
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)
      .eq('user_id', userId);

    if (orderError) {
      console.error('Error updating order status:', orderError);
    }

    console.log(`Order ${orderId} cancelled`);
  } catch (error) {
    console.error('Error handling payment cancellation:', error);
  }
}

async function handleChargeDispute(supabase: any, dispute: any) {
  try {
    console.log('Processing charge dispute:', dispute.id);

    // Log dispute for manual review
    const { error } = await supabase.from('disputes').insert({
      id: dispute.id,
      charge_id: dispute.charge,
      amount: dispute.amount,
      currency: dispute.currency,
      reason: dispute.reason,
      status: dispute.status,
      created_at: new Date(dispute.created * 1000).toISOString(),
    });

    if (error) {
      console.error('Error logging dispute:', error);
    }

    // Notify admin team about dispute
    console.log(`Dispute created for charge ${dispute.charge}`);
  } catch (error) {
    console.error('Error handling charge dispute:', error);
  }
}
