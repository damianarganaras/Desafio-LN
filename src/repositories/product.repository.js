const getPool = require('../config/database');

async function findAllFiltered(options) {
  const pool = getPool();
  const { page, limit, sortBy, orderBy } = options;

  const allowedSortBy = ['fecha_creacion', 'precio', 'categoria'];
  const allowedOrderBy = ['ASC', 'DESC'];

  const validSortBy = allowedSortBy.includes(sortBy) ? sortBy : 'fecha_creacion';
  const validOrderBy = allowedOrderBy.includes(orderBy.toUpperCase()) ? orderBy.toUpperCase() : 'DESC';

  const offset = (page - 1) * limit;

  let orderByClause;
  if (validSortBy === 'precio') {
    orderByClause = `lp.precio ${validOrderBy}`;
  } else if (validSortBy === 'categoria') {
    orderByClause = `pc.descripcion ${validOrderBy}`;
  } else {
    orderByClause = `p.fecha_creacion ${validOrderBy}`;
  }

  const sql = `
    SELECT 
      p.id,
      p.sku,
      p.descripcion_corta,
      p.descripcion_larga,
      p.qty,
      p.ubicacion_imagen,
      p.producto_tipo_id,
      p.producto_categoria_id,
      p.producto_estado_id,
      p.fecha_creacion,
      lp.precio,
      pc.descripcion as categoria
    FROM productos p
    INNER JOIN lista_precios lp ON p.id = lp.producto_id
    INNER JOIN producto_categoria pc ON p.producto_categoria_id = pc.id
    WHERE p.qty > 0 
      AND p.producto_estado_id = 3 
      AND p.ubicacion_imagen IS NOT NULL 
      AND lp.precio > 0
    ORDER BY ${orderByClause}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await pool.query(sql, [limit, offset]);
  return rows;
}

async function search(options) {
  const pool = getPool();
  const { q, page, limit, sortBy, orderBy } = options;

  const allowedSortBy = ['fecha_creacion', 'precio', 'categoria'];
  const allowedOrderBy = ['ASC', 'DESC'];

  const validSortBy = allowedSortBy.includes(sortBy) ? sortBy : 'fecha_creacion';
  const validOrderBy = allowedOrderBy.includes(orderBy.toUpperCase()) ? orderBy.toUpperCase() : 'DESC';

  const offset = (page - 1) * limit;
  const searchTerm = `%${q}%`;

  let orderByClause;
  if (validSortBy === 'precio') {
    orderByClause = `lp.precio ${validOrderBy}`;
  } else if (validSortBy === 'categoria') {
    orderByClause = `pc.descripcion ${validOrderBy}`;
  } else {
    orderByClause = `p.fecha_creacion ${validOrderBy}`;
  }

  const sql = `
    SELECT 
      p.id,
      p.sku,
      p.descripcion_corta,
      p.descripcion_larga,
      p.qty,
      p.ubicacion_imagen,
      p.producto_tipo_id,
      p.producto_categoria_id,
      p.producto_estado_id,
      p.fecha_creacion,
      lp.precio,
      pc.descripcion as categoria
    FROM productos p
    INNER JOIN lista_precios lp ON p.id = lp.producto_id
    INNER JOIN producto_categoria pc ON p.producto_categoria_id = pc.id
    WHERE (p.sku LIKE ? OR p.descripcion_corta LIKE ? OR p.descripcion_larga LIKE ?)
    ORDER BY ${orderByClause}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await pool.query(sql, [searchTerm, searchTerm, searchTerm, limit, offset]);
  return rows;
}

async function findBySlug(slug) {
  const pool = getPool();
  const sql = `
    SELECT 
      p.id,
      p.sku,
      p.descripcion_corta,
      p.descripcion_larga,
      p.qty,
      p.ubicacion_imagen,
      p.producto_tipo_id,
      p.producto_categoria_id,
      p.producto_estado_id,
      p.fecha_creacion,
      lp.precio,
      pc.descripcion as categoria
    FROM productos p
    LEFT JOIN lista_precios lp ON p.id = lp.producto_id
    INNER JOIN producto_categoria pc ON p.producto_categoria_id = pc.id
    WHERE LOWER(REPLACE(REGEXP_REPLACE(p.descripcion_larga, '[^a-zA-Z0-9 .]', ''), ' ', '-')) = ?
  `;

  const [rows] = await pool.query(sql, [slug]);
  return rows[0];
}

async function findRelated(productId, categoryId) {
  const pool = getPool();
  const sql = `
    SELECT 
      id,
      sku,
      descripcion_corta,
      descripcion_larga,
      qty,
      ubicacion_imagen,
      producto_tipo_id,
      producto_categoria_id,
      producto_estado_id,
      fecha_creacion
    FROM productos
    WHERE producto_categoria_id = ? AND id != ?
    LIMIT 5
  `;

  const [rows] = await pool.query(sql, [categoryId, productId]);
  return rows;
}

async function findById(id, connection) {
  const client = connection || getPool();
  const sql = 'SELECT * FROM productos WHERE id = ?';
  const [rows] = await client.query(sql, [id]);
  return rows[0];
}

async function updateStock(id, newQuantity, connection) {
  const client = connection || getPool();
  const sql = 'UPDATE productos SET qty = ? WHERE id = ?';
  await client.query(sql, [newQuantity, id]);
}

module.exports = {
  findAllFiltered,
  search,
  findBySlug,
  findRelated,
  findById,
  updateStock
};
