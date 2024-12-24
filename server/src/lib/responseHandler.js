/**
 * Standard success response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 */
const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standard error response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {*} errors - Detailed errors
 */
const errorResponse = (
  res,
  statusCode = 500,
  message = "Internal Server Error",
  errors = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

/**
 * Validation error response
 * @param {Response} res - Express response object
 * @param {Object} errors - Validation errors
 */
const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 400, "Validation Error", errors);
};

/**
 * Not found response
 * @param {Response} res - Express response object
 * @param {string} message - Not found message
 */
const notFoundResponse = (res, message = "Resource not found") => {
  return errorResponse(res, 404, message);
};

/**
 * Unauthorized response
 * @param {Response} res - Express response object
 * @param {string} message - Unauthorized message
 */
const unauthorizedResponse = (res, message = "Unauthorized access") => {
  return errorResponse(res, 401, message);
};

export {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
};
