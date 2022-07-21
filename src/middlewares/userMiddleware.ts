import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

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

export const decodeUserToken = (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.body
  const decoded = jwt.verify(token, 'mysecretkey')
  if(decoded) {
    next()
  } else {
    throw new CustomError(404, 'user not found')
  }
}