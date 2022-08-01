import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomError } from "../models/CustomError";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("jwt_token");
  if (!token) {
    throw new CustomError(403, "Access denied. Only admin can access this route");
  }
  try {
    const decoded: any = jwt.verify(token, "mysecretkey");
    if (decoded.role === "admin") {
      next();
    } else {
      throw new CustomError(
        401,
        "Access denied. Only admin can access this route"
      );
    }
  } catch (err) {
    next(err);
  }
};
