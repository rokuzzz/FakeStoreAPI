"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../services/productService"));
const Products_1 = __importDefault(require("../models/Products"));
const Categories_1 = __importDefault(require("../models/Categories"));
const CustomError_1 = require("../models/CustomError");
// Product controller
const getProducts = async (req, res, next) => {
    try {
        const products = await productService_1.default.getProducts();
        return res.json(products);
    }
    catch (e) {
        next(e);
    }
};
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService_1.default.getProductById(productId);
        return res.json(product);
    }
    catch (e) {
        next(e);
    }
};
const createProduct = async (req, res, next) => {
    try {
        let { name, description, category, variant, size, image } = req.body;
        const categoryId = await Categories_1.default.findOne({ name: category });
        if (categoryId) {
            const newProduct = new Products_1.default({
                name,
                description,
                categoryId,
                variant,
                size,
                image,
            });
            const product = await productService_1.default.createProduct(newProduct);
            return res.status(201).json(product);
        }
        else {
            throw new CustomError_1.CustomError(404, "Category does not exist");
        }
    }
    catch (e) {
        next(e);
    }
};
const updateProduct = async (req, res, next) => {
    try {
        const product = await productService_1.default.updateProduct(req.params.id, req.body);
        return res.status(201).json(product);
    }
    catch (e) {
        next(e);
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService_1.default.deleteProduct(req.params.id);
        return res.status(204).send("Product deleted");
    }
    catch (e) {
        next(e);
    }
};
exports.default = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=ProductController.js.map