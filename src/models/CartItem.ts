import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CartItemDocument extends Document {
  productId: ObjectId;
  quantity: number;
}

const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItem = mongoose.model<CartItemDocument>("CartItem", cartItemSchema);

export default CartItem;
