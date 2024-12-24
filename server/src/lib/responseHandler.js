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
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export { successResponse, errorResponse };
