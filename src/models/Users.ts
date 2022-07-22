import mongoose, { Document, Schema } from "mongoose";

export type UserRole = 'guest' | 'admin'

export interface UserDocument extends Document {
  firstName: string,
  lastName: string,
  email: string,
  avatar: string, 
  role: UserRole
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    enum: ['guest', 'admin'],
    required: true
  }
})

// the "users" collection will be created
const User = mongoose.model<UserDocument>('User', userSchema)

export default User