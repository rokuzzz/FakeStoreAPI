import mongoose, { Document, ObjectId, Schema } from "mongoose";
import Category from "./Categories";

export interface ProductDocument extends Document {
  id: number;
  name: string;
  description: string;
  category: ObjectId;
  variant: string;
  size: string;
  image: string;
}

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  variant: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);


export default Product;
