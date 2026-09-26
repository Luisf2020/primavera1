require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');
const path = require('path');

const app = express();
app.use(cors(), express.json());

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  throw new Error('JWT_SECRET debe estar definido y tener al menos 32 caracteres.');
}

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.sendStatus(401);

  const token = auth.slice(7);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Bootstrap opcional de cuentas administrativas.
// Define estas variables solo durante la inicialización del entorno y luego retíralas.
(async () => {
  const bootstrapUsers = [
    {
      user: process.env.BOOTSTRAP_SUPERADMIN_USER,
      pass: process.env.BOOTSTRAP_SUPERADMIN_PASSWORD,
      role: 'super'
    },
    {
      user: process.env.BOOTSTRAP_ADMIN_USER,
      pass: process.env.BOOTSTRAP_ADMIN_PASSWORD,
      role: 'admin'
    }
  ];

  for (const account of bootstrapUsers) {
    if (!account.user || !account.pass) continue;
    if (account.pass.length < 12) {
      throw new Error(`La contraseña bootstrap para ${account.role} debe tener al menos 12 caracteres.`);
    }

    const hash = await bcrypt.hash(account.pass, 12);
    db.run(
      'INSERT OR IGNORE INTO users (user, pass, role) VALUES (?, ?, ?)',
      [account.user, hash, account.role]
    );
  }
})();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body || {};
  if (typeof user !== 'string' || typeof pass !== 'string') {
    return res.status(400).json({ error: 'Solicitud inválida' });
  }

  db.get('SELECT * FROM users WHERE user = ?', [user], async (err, row) => {
    if (err || !row) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const ok = await bcrypt.compare(pass, row.pass);
    if (!ok) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: row.id, user: row.user, role: row.role },
      SECRET,
      { expiresIn: '8h', algorithm: 'HS256' }
    );

    res.json({ token, user: row.user, role: row.role });
  });
});

app.get('/api/visitas', authenticate, (req, res) => {
  db.all('SELECT * FROM visitas ORDER BY id DESC LIMIT 100', [], (err, rows) => {
    if (err) return res.sendStatus(500);
    res.json(rows);
  });
});

app.post('/api/visitas', authenticate, (req, res) => {
  const { nombre, tipo, guard, time } = req.body || {};
  if (![nombre, tipo, guard, time].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  db.run(
    'INSERT INTO visitas (nombre, tipo, guard, time) VALUES (?, ?, ?, ?)',
    [nombre.trim(), tipo.trim(), guard.trim(), time.trim()],
    function (err) {
      if (err) return res.sendStatus(500);
      res.json({ id: this.lastID });
    }
  );
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));
