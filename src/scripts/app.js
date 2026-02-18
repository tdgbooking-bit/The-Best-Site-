// This file contains the JavaScript code for the website. It handles interactivity, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Clothing Brand Website Loaded');

    // --- CART FUNCTIONALITY ---
    // Add to Cart handler for product pages
    const addToCartForm = document.querySelector('.product-container form');
    if (addToCartForm) {
        addToCartForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const productName = document.querySelector('.product-container h1').innerText;
            const productImg = document.querySelector('.product-container img').getAttribute('src');
            const productPrice = document.querySelector('.product-container p').innerText.replace(/[^\d.]/g, '');
            const size = addToCartForm.querySelector('select').value;
            if (!size || size === 'Select Size') {
                alert('Please select a size.');
                return;
            }
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart.push({ name: productName, img: productImg, price: parseFloat(productPrice), size });
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        });
    }

    // Cart page logic
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsDiv = document.getElementById('cart-items');
        const cartTotalDiv = document.getElementById('cart-total');
        const emptyCartDiv = document.getElementById('empty-cart');
        const checkoutBtn = document.getElementById('checkout-btn');
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        function renderCart() {
            cartItemsDiv.innerHTML = '';
            if (cart.length === 0) {
                cartTotalDiv.innerText = '';
                emptyCartDiv.style.display = 'block';
                checkoutBtn.style.display = 'none';
                return;
            }
            emptyCartDiv.style.display = 'none';
            checkoutBtn.style.display = 'block';
            let total = 0;
            cart.forEach((item, idx) => {
                total += item.price;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}" />
                    <div class="cart-details">
                        <div><b>${item.name}</b></div>
                        <div>Size: ${item.size}</div>
                        <div>$${item.price.toFixed(2)}</div>
                    </div>
                    <button data-idx="${idx}" class="remove-btn">Remove</button>
                `;
                cartItemsDiv.appendChild(itemDiv);
            });
            cartTotalDiv.innerText = 'Total: $' + total.toFixed(2);
            // Remove item
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const idx = parseInt(this.getAttribute('data-idx'));
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                });
            });
        }
        renderCart();
        checkoutBtn.addEventListener('click', function() {
            alert('Checkout is a demo. No payment processed.');
            localStorage.removeItem('cart');
            renderCart();
        });
    }

    // Check for referral
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
        sessionStorage.setItem('referrer', ref);
    }

    // Load navbar
    // document.getElementById('navbar').innerHTML = '<ul><li><a href="#" onclick="loadContent(\'home\')">Home</a></li><li><a href="#" onclick="loadContent(\'shop\')">Shop</a></li><li><a href="#" onclick="loadContent(\'contact\')">Contact</a></li><li><a href="#" onclick="loadContent(\'subscribe\')">Subscribe</a></li><li><a href="#" onclick="loadContent(\'profile\')">Profile</a></li></ul>';

    // Function to show navbar
    window.showNavbar = () => {
        document.getElementById('navbar').innerHTML = '<ul><li><a href="#" onclick="loadContent(\'home\')">Home</a></li><li><a href="#" onclick="loadContent(\'shop\')">Shop</a></li><li><a href="#" onclick="loadContent(\'contact\')">Contact</a></li><li><a href="#" onclick="loadContent(\'subscribe\')">Subscribe</a></li><li><a href="#" onclick="loadContent(\'profile\')">Profile</a></li><li><a href="../shop/cart.html">Cart</a></li></ul>';
    };

    // Example of adding an event listener to a button
    const shopButton = document.getElementById('shop-button');
    if (shopButton) {
        shopButton.addEventListener('click', () => {
            window.location.href = 'pages/shop.html';
        });
    }

    // Function to dynamically load content
    function loadContent(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
                // Load script if profile
                if (page === 'profile') {
                    const script = document.createElement('script');
                    script.src = 'scripts/profile.js';
                    document.getElementById('content').appendChild(script);
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Example of loading the home page content on initial load
        loadContent('subscribe');

        // Codex autocomplete UI logic
        const codexBtn = document.getElementById('codex-autocomplete-btn');
        const codexInput = document.getElementById('codex-input');
        const codexOutput = document.getElementById('codex-output');
        if (codexBtn && codexInput && codexOutput) {
            codexBtn.addEventListener('click', async () => {
                codexOutput.textContent = 'Loading...';
                try {
                    const response = await fetch('http://localhost:3001/codex-autocomplete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ prompt: codexInput.value })
                    });
                    const data = await response.json();
                    if (data.text) {
                        codexOutput.textContent = data.text;
                    } else {
                        codexOutput.textContent = 'Error: ' + (data.error || 'Unknown error');
                    }
                } catch (err) {
                    codexOutput.textContent = 'Error: ' + err.message;
                }
            });
        }
    });

// Enter gate functionality - button does nothing to keep on landing page
// const enterGate = document.getElementById('enterGate');
// const enterButton = document.getElementById('enterButton');
// if (enterGate && enterButton) {
//     enterButton.addEventListener('click', () => {
//         enterGate.style.display = 'none';
//     });
// }