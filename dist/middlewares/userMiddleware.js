"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../models/CustomError");
const verifyAdmin = (req, res, next) => {
    const token = req.header("jwt_token");
    if (!token) {
        throw new CustomError_1.CustomError(403, "Access denied. Only admin can access this route");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "mysecretkey");
        if (decoded.role === "admin") {
            next();
        }
        else {
            throw new CustomError_1.CustomError(401, "Access denied. Only admin can access this route");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.verifyAdmin = verifyAdmin;
//# sourceMappingURL=userMiddleware.js.map