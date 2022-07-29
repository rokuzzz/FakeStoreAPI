import categoryService from "../services/categoryService";
import { Request, Response, NextFunction } from "express";
import Category from "../models/Categories";
import { nextTick } from "process";
// Category controller
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getCategories();
    return res.json(categories);
  } catch (e) {
    next(e);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = new Category({
      name: req.body.name,
    });
    const newCategory = await categoryService.createCategory(category);
    return res.status(201).json(newCategory);
  } catch (e) {
    next(e);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return res.json(category);
  } catch (e) {
    next(e);
  }
};

const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.updateCategoryById(
      req.body,
      req.params.id
    );
    return res.status(201).json(category);
  } catch (e) {
    next(e);
  }
};

export default {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
};
