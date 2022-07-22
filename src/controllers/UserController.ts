import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { v4 as uuidv4, v4 } from 'uuid';

import { CustomError } from '../models/CustomError';
import User, { UserRole } from "../models/Users";


const getAllUsers = ( req: Request, res: Response) => {
  return User.find()
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

const createUser = async (req: Request, res: Response) => {
  const role: UserRole = 'guest'
  const {
    firstName,
    lastName,
    email,
    password,
    avatar
  } = req.body

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    avatar,
    role
  })

  const newUser = await user.save()
  return res.status(201).json(newUser)
}

export default {
  getAllUsers,
  getSingleUser,
  successLogin,
  createUser
}