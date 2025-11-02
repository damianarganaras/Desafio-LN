class AppError extends Error {
  constructor(message, statusCode, description) {
    super(message);
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
