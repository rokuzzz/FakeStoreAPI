"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../models/CustomError");
const getUsers = async () => {
    return await Users_1.default.find();
};
const createUser = async (user) => {
    return await user.save();
};
const authenticateUser = async (user) => {
    const { email, password } = user;
    const foundUser = await Users_1.default.findOne({ email: email });
    if (foundUser) {
        const validPassword = await foundUser.comparePassword(password);
        if (validPassword) {
            const token = jsonwebtoken_1.default.sign({ sub: foundUser._id, user: foundUser.email, role: foundUser.role }, "mysecretkey" // this should be stored into .env as MYSECRETKEY
            );
            return token;
        }
        else {
            throw new CustomError_1.CustomError(401, "Password or Email is not correct");
        }
    }
    else {
        throw new CustomError_1.CustomError(401, "Password or Email is not correct");
    }
};
exports.default = { getUsers, authenticateUser, createUser };
//# sourceMappingURL=userService.js.map