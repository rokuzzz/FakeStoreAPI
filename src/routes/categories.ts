import { Router, Request, Response, NextFunction } from "express";
import CategoryController from "../controllers/CategoryController";

const categories = Router();
categories.get("", CategoryController.getCategories);

export default categories;
