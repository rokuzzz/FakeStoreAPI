"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const userMiddleware_1 = require("../middlewares/userMiddleware");
const categories = (0, express_1.Router)();
categories.get("", CategoryController_1.default.getCategories);
categories.get("/:id", CategoryController_1.default.getCategoryById);
categories.post("", userMiddleware_1.verifyAdmin, CategoryController_1.default.createCategory);
categories.put("/:id", userMiddleware_1.verifyAdmin, CategoryController_1.default.updateCategoryById);
exports.default = categories;
//# sourceMappingURL=categories.js.map