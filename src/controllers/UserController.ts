import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { v4 as uuidv4, v4 } from 'uuid';

import { User } from '../types/UserType';
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
  const {
    firstName,
    lastName,
    email,
    password,
    avatar
  } = req.body

  const user: User = {
    id: v4(),
    firstName,
    lastName,
    email,
    password,
    avatar
  }

  //save this user into db
  
  return res.status(201).json(user)
}

export default {
  getAllUsers,
  getSingleUser,
  successLogin,
  createUser
}