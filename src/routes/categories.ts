import { Router } from "express";
import CategoryController from "../controllers/categoryController";
import { verifyAdmin } from "../middlewares/userMiddleware";

const categories = Router();
categories.get("", CategoryController.getCategories);
categories.get("/:id", CategoryController.getCategoryById);
categories.post("", verifyAdmin, CategoryController.createCategory);
categories.put("/:id", verifyAdmin, CategoryController.updateCategoryById);

export default categories;
