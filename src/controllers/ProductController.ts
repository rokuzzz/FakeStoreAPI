import productService from "../services/productService";
import { Request, Response } from "express";
import { request } from "http";
// Product controller
const getProducts = async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  return res.json(products);
};

const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  console.log(productId);
  const product = await productService.getProductById(Number(productId));
  return res.json(product);
};

const updateProduct = async (req: Request, res: Response) => {
  const product = await productService.updateProduct(
    Number(req.params.id),
    req.body
  );
  return res.json(product);
};

const deleteProduct = async (req: Request, res: Response) => {
  const product = await productService.deleteProduct(Number(req.params.id));
  return res.json("Product deleted");
};

export default {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
