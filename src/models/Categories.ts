import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  id: number;
  name: string;
}

const categorySchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model<CategoryDocument>("Category", categorySchema);


export default Category;
