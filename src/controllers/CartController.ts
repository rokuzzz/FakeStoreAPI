import { NextFunction, Request, Response } from "express";
import Product from "../models/Products";
import { CustomError } from "../models/CustomError";
import cartService from "../services/cartService";
import Users from "../models/Users";

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.getCart();
    return res.json(cart);
  } catch (err) {
    next(err);
  }
};

const getCartById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundCart = await cartService.getCartById(req.params.id);
    res.json(foundCart);
  } catch (err) {
    next(err);
  }
};

const updateProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, quantity, userId } = req.body;
    // check if the user exists in the DB
    const existedUser = await Users.findById(userId);
    // check if product exists in DB
    const product = await Product.findOne({ name: name });
    if (product && existedUser) {
      const productId = product._id;
      const cartItem = { productId, quantity };
      const item = await cartService.updateProductInCart(cartItem, userId);
      return res.status(201).json(item);
    } else {
      throw new CustomError(404, "Product or User does not exist");
    }
  } catch (err) {
    next(err);
  }
};

const addNewProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, quantity, userId } = req.body;
    // check if the user exists in the DB
    const existedUser = await Users.findById(userId);
    // check if product exists in DB
    const product = await Product.findOne({ name: name });
    if (product && existedUser) {
      const productId = product._id;
      const cartItem = { productId, quantity };
      const item = await cartService.addNewProductToCart(cartItem, userId);
      return res.status(201).json(item);
    } else {
      throw new CustomError(404, "Product or User does not exist");
    }
  } catch (err) {
    next(err);
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedItem = await cartService.deleteCart(req.params.id);
    return res.status(204).send("Cart deleted!");
  } catch (err) {
    next(err);
  }
};

export default {
  getCart,
  getCartById,
  addNewProductToCart,
  updateProductInCart,
  deleteCart,
};
