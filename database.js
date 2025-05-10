require('dotenv').config();
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(process.env.DB_PATH);

// Crea tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT UNIQUE,
    pass TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS visitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    tipo TEXT,
    guard TEXT,
    time TEXT
  )`);
});

module.exports = db;