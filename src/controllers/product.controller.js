const productService = require('../services/product.service');

async function getProducts(req, res, next) {
  try {
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      sortBy: req.query.sortBy || 'fecha_creacion',
      orderBy: req.query.orderBy || 'DESC'
    };

    const result = await productService.getProducts(options);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function searchProducts(req, res, next) {
  try {
    const options = {
      q: req.query.q || '',
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      sortBy: req.query.sortBy || 'fecha_creacion',
      orderBy: req.query.orderBy || 'DESC'
    };

    const result = await productService.searchProducts(options);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getProductBySlug(req, res, next) {
  try {
    const slug = req.params.slug;

    const result = await productService.getProductBySlug(slug);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  searchProducts,
  getProductBySlug
};
