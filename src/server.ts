import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import products from "./routes/products";
import categories from "./routes/categories";

dotenv.config();
const port: string = process.env.PORT as string;
//import swaggerDocument from './swagger/swagger.json'
const swaggerDocument = YAML.load(
  path.join(__dirname, "../_build/swagger.yaml")
);

//initialize the express server
const app = express();
app.set("port", port);

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add swagger router
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

// Add routes
app.use("/products", products);
app.use("/categories", categories);

// Export here and start in a diff file (for testing).
export default app;
