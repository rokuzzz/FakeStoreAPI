import { Router, Request, Response } from "express";
import CartController from "../controllers/CartController";

const cart = Router();
cart.get("", CartController.getCartItems);
cart.get("/:id", CartController.getCartItemById);
cart.put("/:id", CartController.updateCartItem);
cart.post("", CartController.createCartItem);
cart.delete("/:id", CartController.deleteCartItem);

export default cart;
