import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { CartItem } from "./CartItem";

export interface CartDocument extends Document {
  products: [];
  user: ObjectId;
}

const cartSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Cart = mongoose.model<CartDocument>("Cart", cartSchema);

export default Cart;
