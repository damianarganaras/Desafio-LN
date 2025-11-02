const getPool = require('../config/database');

async function search(filters) {
  const pool = getPool();
  let sql = 'SELECT p.*, c.nombre, c.apellido, c.cuit FROM pedidos p LEFT JOIN clientes c ON p.cliente_id = c.id';
  
  const whereClauses = [];
  const params = [];

  if (filters.id) {
    whereClauses.push('p.id = ?');
    params.push(filters.id);
  }

  if (filters.cuit) {
    whereClauses.push('c.cuit = ?');
    params.push(filters.cuit);
  }

  if (filters.created_at_min) {
    whereClauses.push('p.fecha_circulacion >= ?');
    params.push(filters.created_at_min);
  }

  if (filters.created_at_max) {
    whereClauses.push('p.fecha_circulacion <= ?');
    params.push(filters.created_at_max);
  }

  if (whereClauses.length > 0) {
    sql += ' WHERE ' + whereClauses.join(' AND ');
  }

  const [rows] = await pool.query(sql, params);
  return rows;
}

async function create(orderData, connection) {
  const client = connection || getPool();
  const sql = 'INSERT INTO pedidos SET ?';
  const [result] = await client.query(sql, orderData);
  return result;
}

module.exports = {
  search,
  create
};
