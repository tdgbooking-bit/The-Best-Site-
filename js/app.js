// --- Stripe Checkout Integration ---
// Assumes js/stripe-checkout.js is loaded on cart.html
function promptEmailAndCheckout() {
	const cart = getCart();
	if (!cart.length) return;
	let email = prompt('Enter your email for order confirmation:');
	if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
		alert('Please enter a valid email.');
		return;
	}
	// Optionally collect phone here for marketing, but will do after payment as requested
	checkout(cart, { email });
}

// --- E-Commerce Cart Logic ---
function getCart() {
	return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product, price, size) {
	if (!size) {
		alert('Please select a size before adding to cart.');
		return;
	}
	const cart = getCart();
	// Check for existing product+size, increment qty if found
	const idx = cart.findIndex(item => item.product === product && item.size === size);
	if (idx !== -1) {
		cart[idx].qty += 1;
	} else {
		cart.push({ product, price, size, qty: 1 });
	}
	setCart(cart);
	alert(`Added ${product} (Size: ${size}) to cart!`);
}

function renderCart() {
	const cartItemsDiv = document.getElementById('cart-items');
	if (!cartItemsDiv) return;
	const cart = getCart();
	if (cart.length === 0) {
		cartItemsDiv.innerHTML = 'Your cart is empty.';
		return;
	}
	let html = '<table style="width:100%;color:#fff;font-size:1em;border-collapse:collapse;">';
	html += '<tr><th style="text-align:left;">Product</th><th>Size</th><th>Qty</th><th>Price</th><th></th></tr>';
	cart.forEach((item, idx) => {
		html += `<tr>
			<td>${item.product}</td>
			<td>${item.size}</td>
			<td>
				<button onclick="updateQty(${idx},-1)" style="background:#222;color:#bfe9ff;border-radius:8px;padding:2px 8px;border:none;cursor:pointer;font-weight:bold;">-</button>
				<span style="margin:0 8px;">${item.qty}</span>
				<button onclick="updateQty(${idx},1)" style="background:#222;color:#bfe9ff;border-radius:8px;padding:2px 8px;border:none;cursor:pointer;font-weight:bold;">+</button>
			</td>
			<td>$${(item.price * item.qty).toFixed(2)}</td>
			<td><button onclick="removeFromCart(${idx})" style="background:#bfe9ff;color:#111;border-radius:8px;padding:2px 10px;border:none;cursor:pointer;">Remove</button></td>
		</tr>`;
	});
	html += '</table>';
	html += `<div style="margin-top:1.2rem;font-weight:600;">Total: $${cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</div>`;
	html += '<button onclick="checkout()" style="margin-top:1.5rem;padding:0.7rem 2.5rem;border:1.5px solid #bfe9ff;background:rgba(191,233,255,0.08);color:#fff;border-radius:24px;cursor:pointer;font-weight:700;font-size:1.15em;letter-spacing:1px;box-shadow:0 2px 12px rgba(0,0,0,0.15);backdrop-filter:blur(2px);transition:background 0.2s,color 0.2s,border 0.2s;">Checkout</button>';
	cartItemsDiv.innerHTML = html;
}

function updateQty(idx, delta) {
	const cart = getCart();
	cart[idx].qty += delta;
	if (cart[idx].qty < 1) cart[idx].qty = 1;
	setCart(cart);
	renderCart();
}

function removeFromCart(idx) {
	const cart = getCart();
	cart.splice(idx, 1);
	setCart(cart);
	renderCart();
}

function checkout() {
	promptEmailAndCheckout();
}

// Render cart if on cart page
if (window.location.pathname.includes('cart.html')) {
	document.addEventListener('DOMContentLoaded', renderCart);
}
