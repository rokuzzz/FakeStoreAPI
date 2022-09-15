"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Images_1 = __importDefault(require("../models/Images"));
const getSingleImage = async (imageId) => {
    const foundImage = await Images_1.default.findById(imageId);
    return foundImage;
};
const createImage = async (data) => {
    const foundImage = await Images_1.default.findOne({ data: data });
    if (foundImage) {
        return foundImage;
    }
    else {
        const newImage = new Images_1.default({
            data: data
        });
        return await newImage.save();
    }
};
exports.default = {
    getSingleImage,
    createImage
};
//# sourceMappingURL=imageService.js.map