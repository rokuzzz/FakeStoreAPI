"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const cart = (0, express_1.Router)();
cart.get("", CartController_1.default.getCart);
cart.get("/:id", CartController_1.default.getCartById);
cart.put("", CartController_1.default.updateProductInCart);
cart.post("", CartController_1.default.addNewProductToCart);
cart.delete("/:id", CartController_1.default.deleteCart);
exports.default = cart;
//# sourceMappingURL=cart.js.map