import { createLogger, format, transports, Logger } from "winston";
import { config } from "../helpers";

let _logger: Logger;
const { printf, timestamp, splat, combine } = format;

// TODO: Use the conf passed as a way to get the env and switch types of transport
export const makeLogger = (conf = config) => {
  const logFormat = printf(
    ({ level, message, timestamp: tmp, ...metadata }) => {
      let msg = `${tmp} [${level}] : ${message} `;

      if (metadata && Object.keys(metadata).length > 0) {
        msg += JSON.stringify(metadata);
      }

      return msg;
    }
  );

  const loggerTransports = [
    new transports.File({
      filename: `${__dirname}/../../logs/error.log`,
      level: "error",
    }),
    new transports.File({ filename: `${__dirname}/../../logs/combined.log` }),
    new transports.Console(),
  ];

  if (!_logger) {
    _logger = createLogger({
      level: "info",
      exitOnError: false,
      format: combine(format.colorize(), splat(), timestamp(), logFormat),
      transports: loggerTransports,
    });
  }
  return _logger;
};

export default makeLogger();
