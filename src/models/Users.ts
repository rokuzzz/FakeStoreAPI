import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export type UserRole = "guest" | "admin";

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  avatar: string;
  role: UserRole;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props: any) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ["guest", "admin"],
    required: true,
  },
});

// Hash user's password before saving it to the DB
userSchema.pre<UserDocument>(
  "save",
  { document: true, query: false },
  async function (next) {
    if (this.isModified("password") || this.isNew) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
      } catch (e: any) {
        return next(e);
      }
    }
  }
);

// Function to compare input password with user's password in DB
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// the "users" collection will be created
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
