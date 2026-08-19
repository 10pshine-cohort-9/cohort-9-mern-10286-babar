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

  // 1. Map Prisma Database Errors
  if (error.code && error.code.startsWith('P')) error = handlePrismaError(error);
  
  // 2. Map Auth Errors
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // 3. Log the error for debugging
  if (error.statusCode >= 500) {
    logger.error(`[UNEXPECTED ERROR] 💥: ${err.message}`, err);
  } else {
    logger.warn(`[OPERATIONAL ERROR]: ${error.message}`);
  }

  // 4. Send Response
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = globalErrorHandler;