require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const db         = require('./database');
const path       = require('path');

const app = express();
app.use(cors(), express.json());

const SECRET = process.env.JWT_SECRET;
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Registro inicial de super y admin
(async () => {
  const hash1 = await bcrypt.hash('root2025', 10);
  db.run(`INSERT OR IGNORE INTO users (user,pass,role) VALUES (?,?,?)`, ['rootadmin', hash1, 'super']);
  const hash2 = await bcrypt.hash('admin123', 10);
  db.run(`INSERT OR IGNORE INTO users (user,pass,role) VALUES (?,?,?)`, ['admin', hash2, 'admin']);
})();

// Ruta pública estática
app.use(express.static(path.join(__dirname, 'public')));

// LOGIN
app.post('/api/login', (req, res) => {
  const {user, pass} = req.body;
  db.get(`SELECT * FROM users WHERE user = ?`, [user], async (err, row) => {
    if (err || !row) return res.status(401).json({ error: 'Credenciales incorrectas' });
    const ok = await bcrypt.compare(pass, row.pass);
    if (!ok) return res.status(401).json({ error: 'Credenciales incorrectas' });
    const token = jwt.sign({ id: row.id, user: row.user, role: row.role }, SECRET, { expiresIn: '8h' });
    res.json({ token, user: row.user, role: row.role });
  });
});

// CRUD Visitas
app.get('/api/visitas', authenticate, (req, res) => {
  db.all(`SELECT * FROM visitas ORDER BY id DESC LIMIT 100`, [], (e, rows) => res.json(rows));
});
app.post('/api/visitas', authenticate, (req, res) => {
  const { nombre, tipo, guard, time } = req.body;
  db.run(`INSERT INTO visitas (nombre,tipo,guard,time) VALUES (?,?,?,?)`,
         [nombre, tipo, guard, time], function(err) {
    if (err) return res.sendStatus(500);
    res.json({ id: this.lastID });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API escuchando en puerto ${PORT}`));