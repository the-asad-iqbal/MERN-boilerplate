import mongoose from 'mongoose';
import { errorResponse } from '../lib/responseHandler.js';

const errorHandler = (err, req, res, next) => {
  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(error => ({
      field: error.path,
      message: error.message
    }));
    return errorResponse(res, 400, 'Validation Error', errors);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return errorResponse(res, 400, 'Duplicate Error', [{
      field,
      message: `${field} already exists`
    }]);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Token expired');
  }

  // Default error
  return errorResponse(res, err.status || 500, err.message || 'Internal Server Error');
};

export default errorHandler;
