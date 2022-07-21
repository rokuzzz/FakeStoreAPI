import { Router, Request, Response, NextFunction } from "express";
import CategoryController from "../controllers/CategoryController";

const categories = Router();
categories.get("", CategoryController.getCategories);
categories.get("/:id", CategoryController.getCategoryById);
categories.post("", CategoryController.createCategory);
categories.put("/:id", CategoryController.updateCategoryById);

export default categories;
