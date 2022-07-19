import { Router } from "express";
import ProductController from "../controllers/ProductController";

const products = Router();
products.get("", ProductController.getProducts);
products.get("/:id", ProductController.getProductById);
products.put("/:id", ProductController.updateProduct);
products.delete("/:id", ProductController.deleteProduct);

export default products;
