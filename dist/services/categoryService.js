"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../models/CustomError");
const Categories_1 = __importDefault(require("../models/Categories"));
const getCategories = async () => {
    return await Categories_1.default.find();
};
const createCategory = async (category) => {
    return await category.save();
};
const getCategoryById = async (categoryId) => {
    const foundCategory = await Categories_1.default.findById(categoryId);
    if (!foundCategory) {
        throw new CustomError_1.CustomError(404, "Category does not exist");
    }
    return foundCategory;
};
const updateCategoryById = async (updatedCategory, categoryId) => {
    const foundCategory = await Categories_1.default.findById(categoryId);
    if (foundCategory) {
        return await Categories_1.default.findByIdAndUpdate(categoryId, {
            name: updatedCategory.name
        }, { new: true });
    }
    else {
        throw new CustomError_1.CustomError(404, "Category does not exist");
    }
};
exports.default = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
};
//# sourceMappingURL=categoryService.js.map