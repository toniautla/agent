const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { payment_intent_id, order_id, user_id } = await req.json()

    if (!payment_intent_id || !order_id || !user_id) {
      throw new Error('Missing required parameters')
    }

    // Get Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured')
    }

    // Update payment intent metadata with order information
    const response = await fetch(`https://api.stripe.com/v1/payment_intents/${payment_intent_id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'metadata[order_id]': order_id,
        'metadata[user_id]': user_id,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Stripe API error: ${error}`)
    }

    const paymentIntent = await response.json()

    return new Response(
      JSON.stringify({
        success: true,
        payment_intent: paymentIntent
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Payment confirmation failed:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to confirm payment' 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})