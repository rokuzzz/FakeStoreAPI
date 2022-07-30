import User, { UserDocument } from "../models/Users";
import jwt from "jsonwebtoken";
import { CustomError } from "../models/CustomError";

const getUsers = async () => {
  return await User.find();
};

const createUser = async (user: UserDocument) => {
  return await user.save();
};

const authenticateUser = async (user: any) => {
  const { email, password } = user;
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    const validPassword = await foundUser.comparePassword(password);
    if (validPassword) {
      const token = jwt.sign(
        { sub: foundUser._id, user: foundUser.email, role: foundUser.role },
        "mysecretkey" // this should be stored into .env as MYSECRETKEY
      );
      return token;
    } else {
      throw new CustomError(401, "Password or Email is not correct");
    }
  } else {
    throw new CustomError(401, "Password or Email is not correct");
  }
};

export default { getUsers, authenticateUser, createUser };
