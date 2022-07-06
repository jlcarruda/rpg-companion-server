import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { Server } from "http";
import swaggerUi from "swagger-ui-express";
import * as openApiValidator from "express-openapi-validator";
import swaggerDocument from "./swagger/spec.json";
// import { makeLoggerMiddleware } from "./middlewares";
import { config } from "./config";
// import { logger } from "./services";
// import router from "./router";

const server = express();

server.set("json spaces", 2);
server.use(helmet());
server.use(cors());
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// server.use(makeLoggerMiddleware(logger));

// server.locals.logger = logger;
// server.locals.config = config;

server.use(
  openApiValidator.middleware({
    apiSpec: path.join(__dirname, "./swagger/spec.json"),
    // validateResponses: true,
  })
);

// server.use(router);

export default async function app(
  port: number | string,
  host?: string
): Promise<Server> {
  // logger.info(`Loading ${config.env} config`);

  // await connectionMongo(logger);

  return server.listen(host ? { port, host } : port, () => {
    // logger.info(
    //   `Server started at port ${port}${host ? ` and host ${host}` : ""}`
    // );
  });
}
