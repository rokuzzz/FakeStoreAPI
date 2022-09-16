"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageController_1 = __importDefault(require("../controllers/ImageController"));
const images = (0, express_1.Router)();
images.get("/:imageId", ImageController_1.default.getSingleImage);
exports.default = images;
//# sourceMappingURL=images.js.map