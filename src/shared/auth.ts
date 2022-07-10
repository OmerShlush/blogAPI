import express from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const config = process.env;

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).send("No Authorization !");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN);
    req.body.user = decoded;
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Invalid Token");
  }
  return next();
};

export { verifyToken };