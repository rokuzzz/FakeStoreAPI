import User, { UserDocument } from "../models/Users";
import jwt from "jsonwebtoken";
import { CustomError } from "../models/CustomError";

const getUsers = async () => {
  return await User.find();
};

const getSingleUser = async (userId: string) => {
  try {
    const foundUser = await User.findById(userId)
    if (!foundUser) {
        throw new CustomError(404, 'User with the provided id is not found')
    }
    return foundUser
} catch (e) {
    console.log(e)
    return
}
}

const createUser = async (user: UserDocument) => {
  return await user.save();
};

const deleteUser = async (userId: string) => {
  const foundUser = await User.findById(userId)
  if (foundUser) {
    return await User.findByIdAndDelete(userId)
  } else {
    throw new CustomError(404, 'user not found')
  }
}

// const updateUser = async (userId: string) => {
//   const foundUser = await User.findById(userId)
//   if (foundUser) {
//     return await User.findByIdAndUpdate(userId)
//   }
// }

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

export default { getUsers, getSingleUser, authenticateUser, createUser, deleteUser };
