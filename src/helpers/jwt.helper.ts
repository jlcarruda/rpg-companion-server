import jwt from "jsonwebtoken";

import { config } from ".";

const generateToken = (userID: string, props?: object): string =>
  jwt.sign({ userID, ...props }, config.jwt_secret_key, {
    expiresIn: config.jwt_expires,
  });

const checkToken = (token: string) => jwt.verify(token, config.jwt_secret_key);

export default { generateToken, checkToken };
