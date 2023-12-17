const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Include the stack trace in development mode
  const stack = process.env.NODE_ENV === "production" ? null : err.stack;

  // Default error message for cases without a message
  const errorMessage = err.message || "Internal server error!";

  res.json({
    // status: "error",
    msg: errorMessage,
    // code: statusCode,
    // stack: stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
