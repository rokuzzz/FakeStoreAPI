import { decodeUserToken } from './../middlewares/userMiddleware';
import { logRequest, authenticateUser } from '../middlewares/userMiddleware';
import { Router, Request, Response } from "express";
import userController from '../controllers/userController';
import fileUpload from '../middlewares/multerService';

const users = Router()

users.get('', logRequest, decodeUserToken, userController.getAllUsers)
users.get('/:userId', userController.getSingleUser)
users.post('/auth/account', authenticateUser, userController.successLogin)
users.post('', fileUpload, userController.createUser)

export default users