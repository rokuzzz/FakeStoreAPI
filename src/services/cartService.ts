import { CustomError } from "../models/CustomError";
import CartItem, { CartItemDocument } from "../models/CartItem";
import { nextTick } from "process";

const getCartItems = async () => {
  return await CartItem.find().populate("productId");
};

const getCartItemById = async (cartItemId: string) => {
  const foundItem = await CartItem.findById(cartItemId).populate("productId");
  if (!foundItem) {
    throw new CustomError(404, "Item does not exist in cart");
  }
  return foundItem;
};

const updateCartItem = async (cartItemId: string, quantity: string) => {
  const updatedQuantity = Number(quantity);
  const existedItem = await CartItem.findById(cartItemId);
  if (existedItem) {
    return await CartItem.findByIdAndUpdate(
      existedItem._id,
      {
        quantity: updatedQuantity,
      },
      {
        new: true,
      }
    ).populate("productId");
  } else {
    throw new CustomError(404, "Item does not exist in cart");
  }
};

const deleteCartItem = async (cartItemId: string) => {
  const existedItem = await CartItem.findById(cartItemId);
  if (existedItem) {
    return await CartItem.findByIdAndDelete(existedItem._id);
  } else {
    throw new CustomError(404, "Item does not exist in cart");
  }
};

const createCartItem = async (cartItem: CartItemDocument) => {
  const { productId, quantity } = cartItem;
  // Check if product has already existed
  const existedItem = await CartItem.findOne({ productId: productId });
  if (existedItem) {
    // if item has already existed, update item's quantity
    const updatedQuantity = existedItem.quantity + quantity;
    // then update quantity field of the cart item
    return await CartItem.findByIdAndUpdate(
      existedItem._id,
      {
        quantity: updatedQuantity,
      },
      {
        new: true,
      }
    ).populate("productId");
  }
  return await cartItem.save();
};

export default {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem
};
