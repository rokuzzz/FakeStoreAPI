import { Router } from "express";
import ImageController from "../controllers/ImageController";

const images = Router();
images.get("/:imageId", ImageController.getSingleImage);

export default images;
