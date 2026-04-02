const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  // 1. Log the error for yourself
  logger.error(`${req.method} ${req.url} - ${err.stack}`);

  // 2. Mongoose Duplicate Key (Code 11000) - e.g., Email already exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ 
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.` 
    });
  }

  // 3. Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // 4. Mongoose Bad ID (CastError)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Resource not found (Invalid ID format)" });
  }

  // 5. JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token. Please log in again." });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Your session has expired. Please log in again." });
  }

  // 6. Multer Errors
  if (err.message === "Only PDF files allowed") {
    return res.status(400).json({ message: err.message });
  }

  // 7. Final Safety Error response
  const statusCode = err.status || 500;
  const responseMessage = process.env.NODE_ENV === 'Production' && statusCode === 500 
    ? "Something went wrong on our end" 
    : err.message;

  res.status(statusCode).json({
    message: responseMessage || "Internal server error",
  });
};

module.exports = errorHandler;