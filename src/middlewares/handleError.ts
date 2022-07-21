import { Request, Response, NextFunction } from "express"
import { CustomError } from '../models/CustomError';

export const handleError = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof CustomError) {
    res.sendStatus(err.status)
  } else {
    res.send(err.message)
  }
}