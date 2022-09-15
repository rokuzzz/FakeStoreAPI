"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const userMiddleware_1 = require("../middlewares/userMiddleware");
const products = (0, express_1.Router)();
products.get("", ProductController_1.default.getProducts);
products.post("", userMiddleware_1.verifyAdmin, ProductController_1.default.createProduct);
products.get("/:id", ProductController_1.default.getProductById);
products.put("/:id", userMiddleware_1.verifyAdmin, ProductController_1.default.updateProduct);
products.delete("/:id", userMiddleware_1.verifyAdmin, ProductController_1.default.deleteProduct);
exports.default = products;
//# sourceMappingURL=products.js.map