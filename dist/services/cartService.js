"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../models/CustomError");
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async () => {
    return await Cart_1.default.find();
};
const getCartById = async (cartItemId) => {
    const foundItem = await Cart_1.default.findById(cartItemId).populate("productId");
    if (!foundItem) {
        throw new CustomError_1.CustomError(404, "Item does not exist in cart");
    }
    return foundItem;
};
const updateProductInCart = async (cartItem, userId) => {
    const { quantity, productId } = cartItem;
    const existedCart = await Cart_1.default.findOne({ user: userId });
    if (existedCart) {
        const { products } = existedCart;
        const listOfProducts = products;
        //Check if product has already existed in cart
        const existedProduct = listOfProducts.find((product) => {
            return (product === null || product === void 0 ? void 0 : product.productId.toString()) === productId.toString();
        });
        if (existedProduct) {
            // if a matching product is found, update the quantity of that product
            existedProduct.quantity = quantity;
            const modifiedProductsList = listOfProducts.map((product) => {
                if ((product === null || product === void 0 ? void 0 : product.productId.toString()) === productId.toString()) {
                    return existedProduct;
                }
                else {
                    return product;
                }
            });
            return await Cart_1.default.findByIdAndUpdate(existedCart._id, {
                $set: { products: modifiedProductsList },
                user: userId,
            }, { new: true })
                .populate({ path: "products.productId", select: "name _id" })
                .populate({ path: "user", select: "email _id" });
        }
        else {
            throw new CustomError_1.CustomError(404, "Product does not exist in cart");
        }
    }
    else {
        throw new CustomError_1.CustomError(404, "Cart does not exist. Create a new cart before update product in cart");
    }
};
const deleteCart = async (cartId) => {
    const existedCart = await Cart_1.default.findById(cartId);
    if (existedCart) {
        return await Cart_1.default.findByIdAndDelete(existedCart._id);
    }
    else {
        throw new CustomError_1.CustomError(404, "Cart does not exist");
    }
};
const addNewProductToCart = async (cartItem, userId) => {
    const { productId, quantity } = cartItem;
    //Check if cart matches any cart in the DB
    const existedCart = await Cart_1.default.findOne({ user: userId });
    if (existedCart) {
        const { products } = existedCart;
        const listOfProducts = products;
        //Check if product has already existed in cart
        const existedProduct = listOfProducts.find((product) => {
            return (product === null || product === void 0 ? void 0 : product.productId.toString()) === productId.toString();
        });
        if (existedProduct) {
            // if a matching product is found, update the quantity of that product
            existedProduct.quantity = quantity;
            const modifiedProductsList = listOfProducts.map((product) => {
                if ((product === null || product === void 0 ? void 0 : product.productId.toString()) === productId.toString()) {
                    return existedProduct;
                }
                else {
                    return product;
                }
            });
            return await Cart_1.default.findByIdAndUpdate(existedCart._id, {
                $set: { products: modifiedProductsList },
                user: userId,
            }, { new: true })
                .populate({ path: "products.productId", select: "name _id" })
                .populate({ path: "user", select: "email _id" });
        }
        else {
            // else just push new product to products array
            return await Cart_1.default.findByIdAndUpdate(existedCart._id, {
                $push: { products: cartItem },
                user: userId,
            }, { new: true })
                .populate({ path: "products.productId", select: "name _id" })
                .populate({ path: "user", select: "email _id" });
        }
    }
    // otherwise just create a new cart
    const newCart = new Cart_1.default({
        user: userId,
        products: cartItem,
    });
    await newCart.save();
    return Cart_1.default.findById(newCart._id)
        .populate({ path: "products.productId", select: "name _id" })
        .populate({ path: "user", select: "email _id" });
};
exports.default = {
    getCart,
    getCartById,
    addNewProductToCart,
    updateProductInCart,
    deleteCart,
};
//# sourceMappingURL=cartService.js.map