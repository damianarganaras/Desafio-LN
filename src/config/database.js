const mysql = require('mysql2/promise');
const config = require('./index');

let pool;

const getPool = () => {
  if (pool) {
    return pool;
  }

  pool = mysql.createPool({
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

  return pool;
};

const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

module.exports = getPool;
module.exports.closePool = closePool;
