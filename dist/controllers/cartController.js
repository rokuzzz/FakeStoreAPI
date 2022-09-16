"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Products_1 = __importDefault(require("../models/Products"));
const CustomError_1 = require("../models/CustomError");
const cartService_1 = __importDefault(require("../services/cartService"));
const Users_1 = __importDefault(require("../models/Users"));
const getCart = async (req, res, next) => {
    try {
        const cart = await cartService_1.default.getCart();
        return res.json(cart);
    }
    catch (err) {
        next(err);
    }
};
const getCartById = async (req, res, next) => {
    try {
        const foundCart = await cartService_1.default.getCartById(req.params.id);
        res.json(foundCart);
    }
    catch (err) {
        next(err);
    }
};
const updateProductInCart = async (req, res, next) => {
    try {
        const { name, quantity, userId } = req.body;
        // check if the user exists in the DB
        const existedUser = await Users_1.default.findById(userId);
        // check if product exists in DB
        const product = await Products_1.default.findOne({ name: name });
        if (product && existedUser) {
            const productId = product._id;
            const cartItem = { productId, quantity };
            const item = await cartService_1.default.updateProductInCart(cartItem, userId);
            return res.status(201).json(item);
        }
        else {
            throw new CustomError_1.CustomError(404, "Product or User does not exist");
        }
    }
    catch (err) {
        next(err);
    }
};
const addNewProductToCart = async (req, res, next) => {
    try {
        const { name, quantity, userId } = req.body;
        // check if the user exists in the DB
        const existedUser = await Users_1.default.findById(userId);
        // check if product exists in DB
        const product = await Products_1.default.findOne({ name: name });
        if (product && existedUser) {
            const productId = product._id;
            const cartItem = { productId, quantity };
            const item = await cartService_1.default.addNewProductToCart(cartItem, userId);
            return res.status(201).json(item);
        }
        else {
            throw new CustomError_1.CustomError(404, "Product or User does not exist");
        }
    }
    catch (err) {
        next(err);
    }
};
const deleteCart = async (req, res, next) => {
    try {
        const deletedItem = await cartService_1.default.deleteCart(req.params.id);
        return res.status(204).send("Cart deleted!");
    }
    catch (err) {
        next(err);
    }
};
exports.default = {
    getCart,
    getCartById,
    addNewProductToCart,
    updateProductInCart,
    deleteCart,
};
//# sourceMappingURL=CartController.js.map