
// Example: Stripe Checkout integration for your frontend
// Replace YOUR_VERCEL_URL with your deployed backend URL
// IMPORTANT: In your backend, set Stripe's success_url to "/css/pages/order-success.html" so customers see the marketing form after payment.

async function checkout(cart, customer) {
  const response = await fetch('https://YOUR_VERCEL_URL/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart, customer }),
  });
  const data = await response.json();
  if (data.url) {
    window.location.href = data.url; // Redirect to Stripe Checkout
  } else {
    alert('Checkout failed: ' + (data.error || 'Unknown error'));
  }
}

// Example usage:
// checkout([{ name: 'LEATHER JACKET', price: 350 }], { email: 'customer@email.com' });
