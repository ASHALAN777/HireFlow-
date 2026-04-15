const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();
require("./Models/db");
require("./middleware/redis");

const mongoSanitize = require("./middleware/Sanitize");
const apiRoutes = require("./Routes/apiroutes");
const errorHandler = require("./middleware/errorhandlermiddleware");
const logger = require("./middleware/logger");
const morgan = require("morgan");

const helmet = require("helmet");

const AuthRouter = require("./Routes/Router");
const xssMiddleware = require("./middleware/xss");

const app = express();
const PORT = "3001";

app.set("trust proxy", 1);

const frontendURL = process.env.frontend_url || "http://localhost:5173";

const myStream = {
  write: (text) => {
    logger.info(text.trim());
  },
};

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: myStream }));
}

app.use(
  cors({
    origin: "*",

    credentials: true,
  }),
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: "Too many requests, try again after 10 Minutes  ",
});

app.use(limiter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize);
app.use(xssMiddleware);

app.get("/health", (req, res) => res.send("ok"));

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.use("/api/auth", AuthRouter);
app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is booting up on port ${PORT}`);
});
