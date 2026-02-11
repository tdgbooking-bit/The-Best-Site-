// qr.js: Generates QR code for order-success.html
// Uses https://api.qrserver.com/v1/create-qr-code/ for demo QR generation

function generateOrderId() {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function getOrCreateOrderId() {
  let orderId = localStorage.getItem('lastOrderId');
  if (!orderId) {
    orderId = generateOrderId();
    localStorage.setItem('lastOrderId', orderId);
  }
  return orderId;
}

document.addEventListener('DOMContentLoaded', function() {
  const orderId = getOrCreateOrderId();
  document.getElementById('order-id').innerText = 'Order ID: ' + orderId;
  // QR code encodes a URL to claim the order
  const qrUrl = window.location.origin + '/shop/claim.html?order=' + encodeURIComponent(orderId);
  document.getElementById('qr-img').src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(qrUrl);
});
