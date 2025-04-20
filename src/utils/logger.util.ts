import winston from "winston";

/**
 * Logger utility for centralized logging throughout the application.
 *
 * - Logs messages to both the console and a file (`logs.log`).
 * - Includes timestamps for each log entry.
 * - Outputs logs in JSON format for structured logging.
 */

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

export default logger;
