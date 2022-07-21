import { CustomError } from '../models/CustomError';
import { Request, Response } from "express"

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
  console.log(req.body)
  return res.send(`login as ${req.body.username}`)
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