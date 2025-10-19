// COA Logistica - App Logic

// Demo users database
const users = {
    'admin@coa.it': {
        password: 'admin123',
        role: 'Admin',
        name: 'Amministratore'
    },
    'operatore@coa.it': {
        password: 'op123',
        role: 'Operatore',
        name: 'Mario Rossi'
    },
    'autista@coa.it': {
        password: 'aut123',
        role: 'Autista',
        name: 'Giuseppe Verdi'
    }
};

// Sample shipments data
const shipments = [
    { id: 'SP001', destination: 'Milano', status: 'In Transito', driver: 'Giuseppe Verdi' },
    { id: 'SP002', destination: 'Roma', status: 'Consegnato', driver: 'Marco Bianchi' },
    { id: 'SP003', destination: 'Napoli', status: 'In Preparazione', driver: 'Luigi Neri' },
    { id: 'SP004', destination: 'Torino', status: 'In Transito', driver: 'Giuseppe Verdi' },
    { id: 'SP005', destination: 'Firenze', status: 'Consegnato', driver: 'Anna Rossi' }
];

// Current user
let currentUser = null;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const userRole = document.getElementById('userRole');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Login form handler
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout handler
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation handlers
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Load shipments table
    loadShipmentsTable();
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (users[email] && users[email].password === password) {
        currentUser = users[email];
        showDashboard();
    } else {
        alert('Credenziali non valide!');
    }
}

function handleLogout() {
    currentUser = null;
    showLogin();
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
    userRole.textContent = `${currentUser.name} (${currentUser.role})`;
}

function showLogin() {
    dashboard.classList.add('hidden');
    loginScreen.classList.remove('hidden');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function handleNavigation(e) {
    e.preventDefault();
    
    const targetSection = e.target.getAttribute('data-section');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Show target section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(targetSection).classList.add('active');
}

function loadShipmentsTable() {
    const tableBody = document.getElementById('shipmentsTableBody');
    
    shipments.forEach(shipment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shipment.id}</td>
            <td>${shipment.destination}</td>
            <td><span class="status-badge status-${shipment.status.toLowerCase().replace(' ', '-')}">${shipment.status}</span></td>
            <td>${shipment.driver}</td>
            <td>
                <button class="btn-small" onclick="viewShipment('${shipment.id}')">Dettagli</button>
                <button class="btn-small" onclick="editShipment('${shipment.id}')">Modifica</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function viewShipment(id) {
    const shipment = shipments.find(s => s.id === id);
    if (shipment) {
        alert(`Dettagli spedizione ${id}:\nDestinazione: ${shipment.destination}\nStato: ${shipment.status}\nAutista: ${shipment.driver}`);
    }
}

function editShipment(id) {
    alert(`Funzione di modifica per spedizione ${id} - In sviluppo`);
}

// Auto-refresh data every 30 seconds
setInterval(() => {
    if (currentUser) {
        console.log('Aggiornamento dati automatico...');
        // Here you would typically fetch fresh data from server
    }
}, 30000);