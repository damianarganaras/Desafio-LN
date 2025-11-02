const { ValidationError } = require('../utils/errors');

function validateDto(dto) {
  return function(req, res, next) {
    const fields = Object.keys(dto);

    for (const field of fields) {
      const rule = dto[field];

      if (rule.required && !(field in req.body)) {
        throw new ValidationError(`El campo '${field}' es requerido.`);
      }

      if (field in req.body && rule.type === 'number' && typeof req.body[field] !== 'number') {
        throw new ValidationError(`El campo '${field}' debe ser un número.`);
      }
    }

    next();
  };
}

module.exports = validateDto;
