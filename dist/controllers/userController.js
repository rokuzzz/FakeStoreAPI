"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const CustomError_1 = require("../models/CustomError");
const userService_1 = __importDefault(require("../services/userService"));
const Users_1 = __importDefault(require("../models/Users"));
const imageService_1 = __importDefault(require("../services/imageService"));
const sharp_1 = __importDefault(require("sharp"));
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService_1.default.getUsers();
        return res.json(users);
    }
    catch (e) {
        next(e);
    }
};
const getSingleUser = (req, res) => {
    const { userId } = req.params;
    if (userId !== "3") {
        throw new CustomError_1.CustomError(401, "not allowed to get this user");
    }
    return res.send(`GET response form /users/${userId} endpoint`);
};
const createUser = async (req, res, next) => {
    var _a, _b, _c;
    try {
        console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        if ((_b = req.file) === null || _b === void 0 ? void 0 : _b.path) {
            const dataBuffer = fs_1.default.readFileSync((_c = req.file) === null || _c === void 0 ? void 0 : _c.path);
            const data = await (0, sharp_1.default)(dataBuffer).resize(200, 200).toBuffer();
            const savedImage = await imageService_1.default.createImage(data);
            const avatar = `http://localhost:5000/images/${savedImage._id}`;
            const role = "guest";
            console.log(req.body);
            let { firstName, lastName, email, password } = req.body;
            const user = new Users_1.default({
                firstName,
                lastName,
                email,
                password,
                avatar,
                role,
            });
            const newUser = await userService_1.default.createUser(user);
            return res.status(201).json(newUser);
        }
        else {
            throw new CustomError_1.CustomError(404, "File cannot be empty");
        }
    }
    catch (e) {
        return next(e);
    }
};
const verifyUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = { email, password };
    const foundUser = await userService_1.default.authenticateUser(user);
    if (foundUser) {
        return res.json(foundUser); // This will return a JWT token
    }
    else {
        throw new CustomError_1.CustomError(401, "Password or email is incorrect");
    }
};
exports.default = {
    getAllUsers,
    getSingleUser,
    createUser,
    verifyUser,
};
//# sourceMappingURL=UserController.js.map