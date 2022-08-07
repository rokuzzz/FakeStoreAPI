import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  description: string;
  categoryId: ObjectId;
  variant: string;
  size: string;
  image: string;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  variant: {
    type: String,
  },
  size: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
