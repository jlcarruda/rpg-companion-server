/* eslint-disable no-console */
import { Server } from "http";
import { config } from "./src/helpers";
import app from "./src";

const { port } = config;

export default (async () => {
  const server: Server = await app(port);

  return server;
})();

process.on("uncaughtException", (err) => {
  console.error("uncaughtException >>>> ", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection >>>> ", err);
});
