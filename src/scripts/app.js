// This file contains the JavaScript code for the website. It handles interactivity, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Clothing Brand Website Loaded');

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
        document.getElementById('navbar').innerHTML = '<ul><li><a href="#" onclick="loadContent(\'home\')">Home</a></li><li><a href="#" onclick="loadContent(\'shop\')">Shop</a></li><li><a href="#" onclick="loadContent(\'contact\')">Contact</a></li><li><a href="#" onclick="loadContent(\'subscribe\')">Subscribe</a></li><li><a href="#" onclick="loadContent(\'profile\')">Profile</a></li></ul>';
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