import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ImageDocument extends Document{
  data: Buffer,
  userId: ObjectId
}

const imageSchema = new Schema({
  data: {
    type: Buffer
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
})

const Image = mongoose.model<ImageDocument>('Image', imageSchema)

export default Image