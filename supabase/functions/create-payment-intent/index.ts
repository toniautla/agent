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
    const { amount, currency = 'usd', metadata = {} } = await req.json()

    // Get Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') || 'sk_test_51Rii86BNO7VLm76kXlfptnOq7Ag1NqG3lDTN47AlI1vO8BcP47sdMEqHSAvqnbYiFrKXQTzpdyHLCCgAGFwatgV600wrdV9M20'
    
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured')
    }

    // Create payment intent with Stripe API
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: amount.toString(),
        currency: currency,
        'metadata[order_id]': metadata.order_id || '',
        'metadata[user_id]': metadata.user_id || '',
        'automatic_payment_methods[enabled]': 'true'
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Stripe API error: ${error}`)
    }

    const paymentIntent = await response.json()

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Payment intent creation failed:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create payment intent' 
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