import joi from "joi";

export default joi
  .object({
    NODE_ENV: joi
      .string()
      .lowercase()
      .valid("local", "test", "development", "production")
      .required(),
    PORT: joi.string().required(),
    // HOST: joi.string(),
    // DATABASE_POSTGRESQL_URI: joi.string().required(),
    // DATABASE_MONGO_URI: joi.string().required(),
    // JWT_SECRET_KEY: joi.string().required(),
    // SEND_GRID_API_KEY: joi.string().required(),
    // SEND_GRID_MAIL_SENDER: joi.string().required(),
    // AWS_KEY: joi.string().required(),
    // AWS_SECRET: joi.string().required(),
    // BUCKET_NAME: joi.string().required(),
    // ENABLE_EMAIL: joi.boolean().default(false),
  })
  .unknown()
  .required();
