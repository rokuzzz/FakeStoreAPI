import productService from "../services/productService";
import { NextFunction, Request, Response } from "express";
import Product, { ProductDocument } from "../models/Products";

// Product controller
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getProducts();
    return res.json(products);
  } catch (e) {
    next(e);
  }
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    return res.json(product);
  } catch (e) {
    next(e);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, description, categoryId, variant, size, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      categoryId,
      variant,
      size,
      image,
    });
    const product = await productService.createProduct(newProduct);
    return res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    return res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    return res.status(204).send("Product deleted");
  } catch (e) {
    next(e);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
