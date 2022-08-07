import { Router } from "express";
import ImageController from "../controllers/imageController";

const images = Router();
images.get("/:imageId", ImageController.getSingleImage);

export default images;
