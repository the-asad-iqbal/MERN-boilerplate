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
 * @param {*} error - Detailed error
 */
const errorResponse = (
  res,
  statusCode = 500,
  message = "Internal Server Error",
  error = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

/**
 * Validation error response
 * @param {Response} res - Express response object
 * @param {Object} error - Validation error
 */
const validationErrorResponse = (res, error) => {
  return errorResponse(res, 400, "Validation Error", error);
};

/**
 * Not found response
 * @param {Response} res - Express response object
 * @param {string} message - Not found message
 */
const notFoundResponse = (res, message = "Resource not found") => {
  return errorResponse(res, 404, message);
};

export {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
};
