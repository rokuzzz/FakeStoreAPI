import categoryService from "../services/categoryService";
import { Request, Response } from "express";
// Category controller
const getCategories = async (req: Request, res: Response) => {
  const categories = await categoryService.getCategories();
  return res.json(categories);
};

export default {
  getCategories,
};
