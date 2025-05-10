// public/app.js

// Estado de la sesión
let token = '';
let currentUser = '';

// ————————————————————————————————————————————————
// 1. LOGIN
// ————————————————————————————————————————————————
document.getElementById('loginForm').onsubmit = async e => {
  e.preventDefault();
  const user = document.getElementById('user').value.trim();
  const pass = document.getElementById('pass').value.trim();

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, pass })
  });
  if (!res.ok) {
    return Swal.fire('Error', 'Credenciales incorrectas', 'error');
  }
  const data = await res.json();
  token = data.token;
  currentUser = data.user;

  // Ocultar login y mostrar dashboard
  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  // Inicializar UI
  initTabs();
  cargarVisitas();
};

// ————————————————————————————————————————————————
// 2. TAB NAVIGATION
// ————————————————————————————————————————————————
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Active class on buttons
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide panes
      panes.forEach(p => p.classList.add('hidden'));
      document.getElementById(tab.dataset.tab).classList.remove('hidden');
    });
  });

  // Activa la primera pestaña por defecto
  if (tabs.length) {
    tabs[0].classList.add('active');
    panes.forEach(p => p.classList.add('hidden'));
    document.getElementById(tabs[0].dataset.tab).classList.remove('hidden');
  }
}

// ————————————————————————————————————————————————
// 3. CARGAR VISITAS
// ————————————————————————————————————————————————
async function cargarVisitas() {
  const res = await fetch('/api/visitas', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) {
    return console.error('Error al cargar visitas:', await res.text());
  }
  const lista = await res.json();
  document.getElementById('accessList').innerHTML = lista
    .map(a => `
      <div class="flex justify-between mb-2 items-start">
        <div>
          ${a.time} • ${a.tipo} • ${a.nombre}<br>
          <small>Registró: ${a.guard}</small>
        </div>
      </div>
    `).join('');
}

// ————————————————————————————————————————————————
// 4. REGISTRAR VISITA
// ————————————————————————————————————————————————
document.getElementById('accessForm').onsubmit = async e => {
  e.preventDefault();
  const rec = {
    nombre: document.getElementById('acNombre').value.trim(),
    tipo:   document.getElementById('acTipo').value,
    guard:  currentUser,
    time:   new Date().toLocaleString()
  };
  const res = await fetch('/api/visitas', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(rec)
  });
  if (!res.ok) {
    return Swal.fire('Error', 'No se pudo registrar la visita', 'error');
  }
  document.getElementById('accessForm').reset();
  cargarVisitas();
};

// ————————————————————————————————————————————————
// 5. LOGOUT
// ————————————————————————————————————————————————
document.getElementById('logoutBtn').onclick = () => {
  token = '';
  currentUser = '';
  document.getElementById('app').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
  document.getElementById('loginForm').reset();
};
