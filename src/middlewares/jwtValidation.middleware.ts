import { NextFunction, Request, Response } from "express";

import JWT from "../helpers/jwt.helper";

type TokenData = { userID: string; role: string };

export function validateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const regex = RegExp(/^Bearer/);
  const bearerToken = request.headers.authorization as string;

  if (!bearerToken) {
    return response.status(401).json({ message: "Token is required!" });
  } else if (bearerToken && !regex.test(bearerToken)) {
    return response.status(401).json({ message: "invalid token!" });
  }

  try {
    const [, token] = bearerToken.split(" ");

    const { userID, role } = JWT.checkToken(token) as TokenData;

    response.locals.authData = { userID, role };

    return next();
  } catch {
    return response.status(403).json({ message: "token expired or invalid!" });
  }
}
