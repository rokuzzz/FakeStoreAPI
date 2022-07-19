import { Request, Response, NextFunction } from "express"
import { CustomError } from '../models/CustomError';

export const handleError = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'We are having troubles'
    )
  }

  res.status((customError as CustomError).status).send(customError);
}