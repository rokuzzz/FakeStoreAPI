import { NextFunction, Request, Response } from "express";

export const logRequest  = (req: Request, res: Response, next: NextFunction) => {
  console.log('middleware example')
  next()
}
