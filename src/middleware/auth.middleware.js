const { UnauthorizedError } = require('../utils/errors');
const config = require('../config');

function authMiddleware(req, res, next) {
  const secretKey = config.api.apiKey;
  const providedKey = req.headers['x-api-key'];

  if (!providedKey || providedKey !== secretKey) {
    throw new UnauthorizedError('API Key inválida o faltante');
  }

  next();
}

module.exports = authMiddleware;
