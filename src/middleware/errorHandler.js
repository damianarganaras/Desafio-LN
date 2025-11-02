const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const description = err.description || err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    code: statusCode,
    message: message,
    description: description
  });
};

module.exports = errorHandler;
