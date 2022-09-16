"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const fileUpload = (0, multer_1.default)({
    storage,
}).single("avatar");
exports.default = fileUpload;
//# sourceMappingURL=multerService.js.map