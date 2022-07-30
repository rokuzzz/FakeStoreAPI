import { Router, Request, Response } from "express";
import CartController from "../controllers/CartController";

const cart = Router();
cart.get("", CartController.getCart);
cart.get("/:id", CartController.getCartById);
cart.put("/:id", CartController.updateProductInCart);
cart.post("", CartController.addNewProductToCart);
cart.delete("/:id", CartController.deleteCart);

export default cart;
