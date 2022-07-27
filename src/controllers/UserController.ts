import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { CustomError } from "../models/CustomError";
import User, { UserRole } from "../models/Users";

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
  const name = req.file?.filename;
  const avatar = `http://localhost:5000/images/${name}`;
  const role: UserRole = 'guest';
  const { firstName, lastName, email, password } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    avatar,
    role,
  });

  const newUser = await user.save();
  return res.status(201).json(newUser);
};

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
