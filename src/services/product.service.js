const productRepository = require('../repositories/product.repository');
const { NotFoundError } = require('../utils/errors');

async function getProducts(options) {
  const result = await productRepository.findAllFiltered(options);
  return result;
}

async function searchProducts(options) {
  const result = await productRepository.search(options);
  return result;
}

async function getProductBySlug(slug) {
  const product = await productRepository.findBySlug(slug);

  if (!product) {
    throw new NotFoundError('El producto solicitado no existe.');
  }

  const relatedProducts = await productRepository.findRelated(product.id, product.producto_categoria_id);

  return { product, relatedProducts };
}

module.exports = {
  getProducts,
  searchProducts,
  getProductBySlug
};
