qq// Profile management
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    loadUser();
    document.getElementById('auth-form').addEventListener('submit', handleAuth);
});

function handleAuth(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
        users[username] = { email, points: 0, id: Date.now() };
        localStorage.setItem('users', JSON.stringify(users));
    }
    currentUser = users[username];
    localStorage.setItem('currentUser', username);
    showProfile();
}

function loadUser() {
    const username = localStorage.getItem('currentUser');
    if (username) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        currentUser = users[username];
        if (currentUser) showProfile();
    }
}

function showProfile() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('profile-section').style.display = 'block';
    document.getElementById('user-name').textContent = currentUser.email.split('@')[0];
    document.getElementById('user-points').textContent = currentUser.points;
    generateQR();
    updateGifts();
}

function generateQR() {
    const url = window.location.origin + window.location.pathname + '?ref=' + currentUser.id;
    QRCode.toCanvas(document.getElementById('qrcode'), url, { width: 128 }, function (error) {
        if (error) console.error(error);
    });
}

function updateGifts() {
    const gifts = document.querySelectorAll('#gifts-list li');
    gifts.forEach((li, index) => {
        const pointsNeeded = [10, 50, 100][index];
        if (currentUser.points >= pointsNeeded) {
            li.style.textDecoration = 'line-through';
            li.style.color = 'green';
        } else {
            li.style.textDecoration = 'none';
            li.style.color = 'black';
        }
    });
}

// Function to add points (called from shop)
window.addPoints = function(points) {
    if (currentUser) {
        currentUser.points += points;
        const users = JSON.parse(localStorage.getItem('users')) || {};
        users[currentUser.email.split('@')[0]] = currentUser; // assuming username is email prefix
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('user-points').textContent = currentUser.points;
        updateGifts();
    }
};