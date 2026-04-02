const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();
require("./Models/db");
const mongoSanitize = require("./middleware/Sanitize");
const apiRoutes = require("./Routes/apiroutes");
const errorHandler = require("./middleware/errorhandlermiddleware");
const logger = require("./middleware/logger");
const morgan = require("morgan");

const helmet = require("helmet");

const AuthRouter = require("./Routes/Router");
const xssMiddleware = require("./middleware/xss");

const app = express();
const PORT = process.env.PORT || 3001;

const frontendURL = process.env.frontend_url || "http://localhost:5173";

// 1. Create a stream object for Morgan
const myStream = {
  write: (text) => {
    //sending  it to the Winston logger
    logger.info(text.trim());
  },
};
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: myStream }));
}

// CORS FIRST
app.use(
  cors({
    origin: frontendURL, // EXACT frontend URL
    credentials: true, // allow cookies
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

//  THEN rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // max requests per IP
  message: "Too many requests, try again after 10 Minutes  ",
});

app.use(limiter);

//  THEN parsers
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize);
app.use(xssMiddleware);

// //  THEN routes

app.use("/api/auth", AuthRouter);
app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
