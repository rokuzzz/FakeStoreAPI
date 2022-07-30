import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { verifyAdmin } from "../middlewares/userMiddleware";

const products = Router();
products.get("", ProductController.getProducts);
products.post("", verifyAdmin, ProductController.createProduct);
products.get("/:id", ProductController.getProductById);
products.put("/:id", verifyAdmin, ProductController.updateProduct);
products.delete("/:id", verifyAdmin, ProductController.deleteProduct);

export default products;
