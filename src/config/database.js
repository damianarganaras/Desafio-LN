const mysql = require('mysql2/promise');
const config = require('./index');

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Éxito: se generó pool de conexiones a MySQL.');

module.exports = pool;