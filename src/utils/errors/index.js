const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(description) {
    super(
      'Not Found',
      404,
      description || 'Recurso no encontrado.'
    );
  }
}

class BadRequestError extends AppError {
  constructor(description) {
    super(
      'Bad Request',
      400,
      description || 'Solicitud inválida.'
    );
  }
}

class ValidationError extends AppError {
  constructor(description) {
    super(
      'Validation Error',
      400,
      description || 'Datos no válidos.'
    );
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  ValidationError
};
