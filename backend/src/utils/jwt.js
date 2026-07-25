import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};
export const extractToken = (authorization) => {

    if (!authorization) return null;

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") return null;

    return token;

};