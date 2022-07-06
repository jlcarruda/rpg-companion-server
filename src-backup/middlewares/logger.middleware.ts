import { Logger } from "winston";
import morgan from "morgan";

export const makeLoggerMiddleware = (logger: Logger) => {
  const stream = { write: (text: string) => logger.info(text) };
  return morgan("dev", { stream });
};
