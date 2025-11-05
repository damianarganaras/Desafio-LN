const productRepository = require('../repositories/product.repository');
const { NotFoundError } = require('../utils/errors');

async function getProducts(options) {
  const { page, limit } = options;
  const { data, total } = await productRepository.findAllFiltered(options);
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    totalPages,
    currentPage: parseInt(page)
  };
}

async function searchProducts(options) {
  const { page, limit } = options;
  const { data, total } = await productRepository.search(options);
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    total,
    totalPages,
    currentPage: parseInt(page)
  };
}

async function getProductBySlug(slug) {
  const product = await productRepository.findBySlug(slug);

  if (!product) {
    throw new NotFoundError('El producto solicitado no existe.');
  }

  const relatedProducts = await productRepository.findRelated(
    product.id,
    product.producto_categoria_id
  );

  return { product, relatedProducts };
}

module.exports = {
  getProducts,
  searchProducts,
  getProductBySlug
};
