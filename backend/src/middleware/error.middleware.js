const logger = require('../utils/logger');
const AppError = require('../utils/AppError');

const handlePrismaError = (err) => {
  if (err.code === 'P2002') {
    const field = err.meta.target;
    return new AppError(`Duplicate field value: ${field}. Please use another value.`, 400);
  }
  if (err.code === 'P2025') {
    return new AppError('Record not found in the database.', 404);
  }
  return new AppError('Database operation failed.', 500);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again.', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again.', 401);

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err, message: err.message, name: err.name, code: err.code, meta: err.meta };

  if (error.code && error.code.startsWith('P')) error = handlePrismaError(error);
  
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  if (error.statusCode >= 500) {
    logger.error({ err }, '[UNEXPECTED ERROR] 💥: %s', err.message);
  } else {
    logger.warn(`[OPERATIONAL ERROR]: ${error.message}`);
  }

  const isOperational = error.isOperational === true;
  
  res.status(isOperational ? error.statusCode : 500).json({
    status: isOperational ? error.status : 'error',
    message: isOperational ? error.message : 'Internal server error.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = globalErrorHandler;