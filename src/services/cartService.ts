import { CustomError } from "../models/CustomError";
import Cart from "../models/Cart";
import { CartItem } from "../models/CartItem";

const getCart = async () => {
  return await Cart.find();
};

const getCartById = async (cartItemId: string) => {
  const foundItem = await Cart.findById(cartItemId).populate("productId");
  if (!foundItem) {
    throw new CustomError(404, "Item does not exist in cart");
  }
  return foundItem;
};

const updateProductInCart = async (cartId: string, cartItem: any) => {
  const { quantity, productId } = cartItem;
};

const deleteCart = async (cartId: string) => {
  const existedCart = await Cart.findById(cartId);
  if (existedCart) {
    return await Cart.findByIdAndDelete(existedCart._id);
  } else {
    throw new CustomError(404, "Cart does not exist");
  }
};

const addNewProductToCart = async (cartItem: CartItem, userId: string) => {
  const { productId, quantity } = cartItem;
  //Check if cart matches any cart in the DB
  const existedCart = await Cart.findOne({ userId: userId });
  if (existedCart) {
    //Check if product has already existed in cart
    const existedProduct = await Cart.findOne({ products: productId });
    console.log(existedProduct);
    if (existedProduct) {
    }
    return await Cart.findByIdAndUpdate(
      existedCart._id,
      {
        // $push: { products: { productId, quantity } },
        userId: userId,
      },
      { new: true }
    );
  }
  const newCart = new Cart({
    userId: userId,
    products: cartItem,
  });
  return newCart.save();
};

export default {
  getCart,
  getCartById,
  addNewProductToCart,
  updateProductInCart,
  deleteCart,
};
