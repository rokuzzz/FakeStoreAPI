"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../models/CustomError");
const Products_1 = __importDefault(require("../models/Products"));
const getProducts = async () => {
    return await Products_1.default.find();
};
const getProductById = async (productId) => {
    const foundProduct = await Products_1.default.findById(productId);
    if (!foundProduct) {
        throw new CustomError_1.CustomError(404, "Product does not exist");
    }
    return foundProduct;
};
const createProduct = async (product) => {
    await product.save();
    return await Products_1.default.findById(product._id).populate('categoryId');
};
const updateProduct = async (productId, updateProduct) => {
    const { name, description, variant, size, image } = updateProduct;
    const foundProduct = await Products_1.default.findById(productId);
    if (foundProduct) {
        return await Products_1.default.findByIdAndUpdate(productId, {
            name: name,
            description: description,
            variant: variant,
            size: size,
            image: image,
        }, { new: true });
    }
    else {
        throw new CustomError_1.CustomError(404, "Product not found");
    }
};
const deleteProduct = async (productId) => {
    const foundProduct = await Products_1.default.findById(productId);
    if (foundProduct) {
        return await Products_1.default.findByIdAndDelete(productId);
    }
    else {
        throw new CustomError_1.CustomError(404, "Product not found");
    }
};
exports.default = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=productService.js.map