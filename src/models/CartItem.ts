import { ObjectId } from "mongoose";

export interface CartItem {
    productId: ObjectId;
    quantity: Number;
  }