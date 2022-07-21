import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";

export const logRequest  = (req: Request, res: Response, next: NextFunction) => {
  console.log('middleware example')
  next()
} 

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  const user = {username, password}
  console.log(user)
  if (username === 'romanku' && password === '123') {
    next()
  } else {
    throw new CustomError (401, 'wrong username or password')
  }

} 
