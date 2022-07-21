import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

import { CustomError } from '../models/CustomError';


const getAllUsers = ( req: Request, res: Response) => {
  return res.send('GET response from /users endpoint')
}

const getSingleUser =  (req: Request, res: Response) => {
  const { userId } = req.params
  if (userId !== '3') {
    throw new CustomError(401, 'not allowed to get this user')
  }
  return res.send(`GET response form /users/${userId} endpoint`)
}

const successLogin = (req: Request, res: Response) => {
  const token = jwt.sign(req.body, 'mysecretkey', { algorithm: 'RS256'});
  return res.send(token)

  // return res.send(`login as ${req.body.username}`)
}

const createUser = (req: Request, res: Response) => {
  return res.send(req.body)
}

export default {
  getAllUsers,
  getSingleUser,
  successLogin,
  createUser
}