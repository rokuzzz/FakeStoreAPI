import { Router } from "express";
import CartController from "../controllers/cartController";

const cart = Router();
cart.get("", CartController.getCart);
cart.get("/:id", CartController.getCartById);
cart.put("", CartController.updateProductInCart);
cart.post("", CartController.addNewProductToCart);
cart.delete("/:id", CartController.deleteCart);

export default cart;
