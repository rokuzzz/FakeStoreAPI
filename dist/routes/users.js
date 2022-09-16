"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const multerService_1 = __importDefault(require("../middlewares/multerService"));
const users = (0, express_1.Router)();
users.post("", multerService_1.default, UserController_1.default.createUser);
users.get("", userMiddleware_1.verifyAdmin, UserController_1.default.getAllUsers); // For authorized users only
users.post("/verify", UserController_1.default.verifyUser);
exports.default = users;
//# sourceMappingURL=users.js.map