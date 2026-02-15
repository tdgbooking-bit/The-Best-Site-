
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Checkout endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { cart, customer } = req.body;
    const line_items = cart.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customer.email,
      success_url: 'https://tdgbooking-bit.github.io/New-New-Repository/shop/order-success.html',
      cancel_url: 'https://tdgbooking-bit.github.io/New-New-Repository/shop/checkout.html',
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Placeholder route (no Twilio)
app.post("/send-text", (req, res) => {
  res.status(200).send("SMS functionality removed for deployment. Add Twilio code after deployment.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
