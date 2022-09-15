import { Router, Request, Response } from "express";
import { verifyAdmin } from "../middlewares/userMiddleware";
import userController from "../controllers/UserController";
import multerService from "../middlewares/multerService";

const users = Router();
users.post("", multerService, userController.createUser);
users.get("", verifyAdmin, userController.getAllUsers); // For authorized users only
users.post("/verify", userController.verifyUser);


export default users;
