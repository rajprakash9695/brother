/**
 *
 * @param {*} res
 * @param {*} statusCode
 * @param {*} message
 * @param {*} data
 * @param {*} errors
 * @returns
 */
export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message || 'success',
    data,
    errors,
  });
};
