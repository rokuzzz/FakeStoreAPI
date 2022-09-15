"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryService_1 = __importDefault(require("../services/categoryService"));
const Categories_1 = __importDefault(require("../models/Categories"));
// Category controller
const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService_1.default.getCategories();
        return res.json(categories);
    }
    catch (e) {
        next(e);
    }
};
const createCategory = async (req, res, next) => {
    try {
        const category = new Categories_1.default({
            name: req.body.name,
        });
        const newCategory = await categoryService_1.default.createCategory(category);
        return res.status(201).json(newCategory);
    }
    catch (e) {
        next(e);
    }
};
const getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService_1.default.getCategoryById(req.params.id);
        return res.json(category);
    }
    catch (e) {
        next(e);
    }
};
const updateCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService_1.default.updateCategoryById(req.body, req.params.id);
        return res.status(201).json(category);
    }
    catch (e) {
        next(e);
    }
};
exports.default = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
};
//# sourceMappingURL=CategoryController.js.map