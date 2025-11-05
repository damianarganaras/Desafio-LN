const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(description) {
    super('Not Found', 404, description || 'Recurso no encontrado.');
  }
}

class BadRequestError extends AppError {
  constructor(description) {
    super('Bad Request', 400, description || 'Solicitud inválida.');
  }
}

class ValidationError extends AppError {
  constructor(description) {
    super('Validation Error', 400, description || 'Datos no válidos.');
  }
}

class UnauthorizedError extends AppError {
  constructor(description) {
    super('Unauthorized', 401, description || 'No estás autorizado para realizar esta acción.');
  }
}

module.exports = {
  AppError,
  NotFoundError,
  BadRequestError,
  ValidationError,
  UnauthorizedError
};
