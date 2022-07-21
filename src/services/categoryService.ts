import { CustomError } from "errorType";
import Category, { CategoryDocument } from "../models/Categories";

const getCategories = async () => {
  return await Category.find();
};

const createCategory = async (category: CategoryDocument) => {
  return await category.save();
};

const getCategoryById = async (categoryId: string) => {
  const foundCategory = await Category.findById(categoryId);
  if (!foundCategory) {
    throw new CustomError(404, "Category does not exist");
  }
  return foundCategory;
};

const updateCategoryById = async (
  updatedCategory: CategoryDocument,
  categoryId: string
) => {
  const foundCategory = await Category.findById(categoryId);
  if (foundCategory) {
    return await Category.findByIdAndUpdate(categoryId, {
      name: updatedCategory.name
    }, {new: true});
  } else {
    throw new CustomError(404, "Category does not exist");
  }
};

export default {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
};
