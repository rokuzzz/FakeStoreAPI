import { Router } from "express";
import CategoryController from "../controllers/categoryController";

const categories = Router();
categories.get("", CategoryController.getCategories);
categories.get("/:id", CategoryController.getCategoryById);
categories.post("", CategoryController.createCategory);
categories.put("/:id", CategoryController.updateCategoryById);

export default categories;
