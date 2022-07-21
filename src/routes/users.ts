import { logRequest, authenticateUser } from '../middlewares/userMiddleware';
import { Router, Request, Response } from "express";
import userController from '../controllers/userController';

const users = Router()

users.get('', logRequest, userController.getAllUsers)
users.get('/:userId', userController.getSingleUser)
users.post('/auth/account', authenticateUser, userController.successLogin)
users.post('', userController.createUser)

export default users