import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { CustomError } from "../models/CustomError";
import userService from "../services/userService";
import User, { UserRole } from "../models/Users";
import imageService from "../services/imageService";
import sharp from "sharp";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const foundUser = await userService.getSingleUser(userId)

  return res.status(200).json(foundUser)
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.file?.path);
    if (req.file?.path) {
      const dataBuffer = fs.readFileSync(req.file?.path);
      const data = await sharp(dataBuffer).resize(200, 200).toBuffer();
      const savedImage = await imageService.createImage(data);
      const avatar = `http://localhost:5000/images/${savedImage._id}`;
      const role: UserRole = "guest";
      let { firstName, lastName, email, phone, password } = req.body;
      const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password,
        avatar,
        role,
      });
      const newUser = await userService.createUser(user);
      return res.status(201).json(newUser);
    } else {
      throw new CustomError(404, "File cannot be empty");
    }
  } catch (e) {
    return next(e);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {userId} = req.params
    await userService.deleteUser(userId)
    return res.status(204).send('user get deleted')
  } catch (e) {
    if (e instanceof CustomError) {
      return next(e)
    } else {
      console.log(e)
    }
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const {userId} = req.params
    const foundUser = await User.findById(userId)
    if (foundUser) {
      if (req.file?.path) {
        const dataBuffer = fs.readFileSync(req.file?.path);
        const data = await sharp(dataBuffer).resize(200, 200).toBuffer();
        const savedImage = await imageService.createImage(data);
        const avatar = `http://localhost:5000/images/${savedImage._id}`;

        let { firstName, lastName, email, phone, password } = req.body;
        
        await User.findByIdAndUpdate(userId, {firstName, lastName, email, phone, password, avatar}, {
          new: true
        })
        
        const updatedUser = await userService.getSingleUser(userId)
        return res.status(200).json(updatedUser)
      } else {
        throw new CustomError(404, "File cannot be empty");
      } 
    } else {
      throw new CustomError(404, 'user not found')
    }
  } catch (e) {
    console.log(e)
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
  deleteUser,
  updateUser,
  verifyUser,
};
