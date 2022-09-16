"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("../models/CustomError");
const imageService_1 = __importDefault(require("../services/imageService"));
const getSingleImage = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const foundImage = await imageService_1.default.getSingleImage(imageId);
        if (!foundImage) {
            throw new CustomError_1.CustomError(404, "image not found");
        }
        return res.end(foundImage.data);
    }
    catch (e) {
        next(e);
    }
};
exports.default = {
    getSingleImage,
};
//# sourceMappingURL=ImageController.js.map