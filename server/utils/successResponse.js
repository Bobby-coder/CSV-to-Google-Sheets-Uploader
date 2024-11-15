export function successResponse(message, statusCode, res, key, data = null) {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response[key] = data;
  }

  return res.status(statusCode).json(response);
}
