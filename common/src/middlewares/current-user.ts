import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayLoad {
  id: string;
  email: string;
}

// parse req.currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // cookie session set?
  if (!req.session?.jwt) {
    // if req.session is defined, then check jwt
    return next();
  }

  try {
    // if setted
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad;
    req.currentUser = payload;
  } catch (err) {}
  // if non-set
  next();
};
