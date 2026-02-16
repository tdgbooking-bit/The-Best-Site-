// This file contains the JavaScript code for the website. It handles interactivity, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', () => {
	console.log('Clothing Brand Website Loaded');

	// Example of adding an event listener to a button
	const shopButton = document.getElementById('shop-button');
	if (shopButton) {
		shopButton.addEventListener('click', () => {
			window.location.href = 'shop.html';
		});
	}

	// Function to dynamically load content
	function loadContent(page) {
		fetch(`${page}.html`)
			.then(response => response.text())
			.then(data => {
				document.getElementById('content').innerHTML = data;
			})
			.catch(error => console.error('Error loading content:', error));
	}

	// Example of loading the home page content on initial load
	loadContent('home');
});
