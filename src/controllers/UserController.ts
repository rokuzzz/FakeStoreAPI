import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import fs from 'fs'

import { CustomError } from '../models/CustomError';
import userService from "../services/userService";
import User, { UserRole } from "../models/Users";
import Image from '../models/Images'

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    return res.json(users);
  } catch (e) {
    next(e);
  }
};

const getSingleUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (userId !== "3") {
    throw new CustomError(401, "not allowed to get this user");
  }
  return res.send(`GET response form /users/${userId} endpoint`);
};

// Update 

// Delete 

const createUser = async (req: Request, res: Response) => {
  if (req.file?.path) {
    const data = fs.readFileSync(req.file?.path)
    const newImage = new Image({
      data
    })
    const savedImage = await newImage.save()
    const avatar = `http://localhost:5000/images/${savedImage._id}`
    const role: UserRole = 'guest'
    const {
      firstName,
      lastName,
      email,
      password,
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
    savedImage.userId = newUser._id
    savedImage.save()
    return res.status(201).json(newUser)
  } 
  else {
    throw new CustomError(404, 'File cannot be empty')
  }
}

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = { email, password };
  const foundUser = await userService.authenticateUser(user);
  if (foundUser) {
    return res.json(foundUser); // This will return a JWT token
  } else {
    throw new CustomError(401, "Password or email is incorrect");
  }
};

export default {
  getAllUsers,
  getSingleUser,
  createUser,
  verifyUser,
};
