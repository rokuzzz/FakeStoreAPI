import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Product from "../models/Products";
import CartItem from "../models/CartItem";
import cartItemService from "../services/cartService";
import { CustomError } from "../models/CustomError";

const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems = await cartItemService.getCartItems();
    return res.json(cartItems);
  } catch (err) {
    next(err);
  }
};

const getCartItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundItem = await cartItemService.getCartItemById(req.params.id);
    res.json(foundItem);
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quantity } = req.body;
    const updatedItem = await cartItemService.updateCartItem(
      req.params.id,
      quantity
    );
    return res.json(updatedItem);
  } catch (err) {
    next(err);
  }
};

const createCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, quantity } = req.body;
    const productId = await Product.findOne({ name: name });
    if (productId) {
      const cartItem = new CartItem({
        productId: productId,
        quantity: quantity,
      });
      const item = await cartItemService.createCartItem(cartItem);
      return res.status(201).json(item);
    } else {
      throw new CustomError(404, "Product does not exist");
    }
  } catch (err) {
    next(err);
  }
};

const deleteCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedItem = await cartItemService.deleteCartItem(req.params.id);
    return res.status(204).send("Item deleted from cart!");
  } catch (err) {
    next(err);
  }
};

export default {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem
};
