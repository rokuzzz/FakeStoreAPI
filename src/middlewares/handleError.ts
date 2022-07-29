import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";

export const handleError = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  } else {
    return res.status(500).send(err.message);
  }
  }
