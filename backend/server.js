import { config } from 'dotenv'
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'

config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const app = express()
app.use(cors())
app.use(express.json())

const YOUR_DOMAIN = 'http://localhost:5173'

app.post('/create-checkout-session', async (req, res) => {
  const { priceId, quantity } = req.body

  try {
    console.log(`Attempting to retrieve price with ID: ${priceId}`)
    const price = await stripe.prices.retrieve(priceId, { expand: ['product'] })

    if (!price || !price.product) {
      console.error(`Price or product not found for priceId: ${priceId}`)
      return res.status(404).json({ error: `Price or product not found for priceId: ${priceId}` })
    }

    const size = price.metadata.size || 'unknown'
    const color = price.metadata.color || 'unknown'
    const stock = Number(price.metadata.stock) || 0

    if (!price.metadata.size || !price.metadata.color || !price.metadata.stock) {
      console.error(`Missing metadata for priceId: ${priceId}`, price.metadata)
      return res.status(400).json({ error: `Missing metadata (size, color, or stock) for priceId: ${priceId}` })
    }

    if (stock < quantity) {
      console.error(`Insufficient stock for ${size} ${color}: requested ${quantity}, available ${stock}`)
      return res.status(400).json({ error: `Only ${stock} available for ${size} ${color}` })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/shop`,
    })

    res.json({ clientSecret: session.client_secret, sessionId: session.id })
  } catch (error) {
    console.error(`Error creating checkout session for priceId: ${priceId}`, error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(4242, () => console.log('Server running on port 4242'))