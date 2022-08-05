import { Router, Request, Response } from "express";
import { verifyAdmin } from "../middlewares/userMiddleware";
import userController from "../controllers/userController";
import multerService from "../middlewares/multerService";

const users = Router();
users.get("", verifyAdmin, userController.getAllUsers); // For authorized users only
users.get("/:userId", userController.getSingleUser);
users.post("", multerService, userController.createUser);
users.delete('/:userId', userController.deleteUser)
users.put('/:userId', multerService, userController.updateUser)
users.post("/verify", userController.verifyUser);


export default users;
