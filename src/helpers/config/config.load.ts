import * as dotenv from "dotenv";
import { ObjectSchema } from "joi";
import { name, version } from "../../../package.json";
import configSchema from "./config.validator";
import path from "path";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? path.resolve(process.cwd(), ".env")
      : path.resolve(process.cwd(), ".env.hml"),
});

function loadConfig(schema: ObjectSchema, data: any) {
  const { error, value: envVars } = schema.validate(data, {
    abortEarly: false,
  });
  if (error) {
    throw new Error(
      `Environment's variable validation error: ${error.message}`
    );
  }

  return {
    name,
    version,
    // host: envVars.HOST || null,
    port: envVars.PORT || 3032,
    env: envVars.NODE_ENV,
    // jwt_secret_key: envVars.JWT_SECRET_KEY,
    // sendEmail: envVars.ENABLE_EMAILS,
    // sendGrid: {
    //   apiKey: envVars.SEND_GRID_API_KEY,
    //   mailSender: envVars.SEND_GRID_MAIL_SENDER,
    // },
    // database: {
    //   postgresql: {
    //     uri: envVars.DATABASE_POSTGRESQL_URI,
    //   },
    //   mongo: {
    //     uri: envVars.DATABASE_MONGO_URI,
    //   },
    // },
    // services: {
    //   s3: {
    //     keyId: envVars.AWS_KEY,
    //     secret: envVars.AWS_SECRET,
    //     bucket: envVars.BUCKET_NAME,
    //   },
    // },
  };
}

export default (schema = configSchema, env = process.env) =>
  loadConfig(schema, env);
