import jwt from "jsonwebtoken";
import config from "../config/config.js";

const DEFAULT_EXPIRES = "1d";

export function signJWT(payload, expiresIn = DEFAULT_EXPIRES) {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn });
}

export function verifyJWT(token) {
  return jwt.verify(token, config.SECRET_KEY);
}

