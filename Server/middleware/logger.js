const winston = require('winston');

// 1. Create the logger instance
const logger = winston.createLogger({
  // 2. Decide the format (Timestamp + Text)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  // 3. Decide where it goes (Console and File)
  transports: [
    new winston.transports.Console(), // Prints to your terminal
    new winston.transports.File({ filename: 'app.log' }) // Saves to app.log file
  ],
});

// 4. Export it so other files can use it
module.exports = logger;