import { handleError } from './middlewares/handleError';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import dotenv from "dotenv";
import products from "./routes/products";
import categories from "./routes/categories";
import users from './routes/users';
import images from './routes/images';
import cart from './routes/cart';


dotenv.config();
const port: string = process.env.PORT as string;
//import swaggerDocument from './swagger/swagger.json'
const swaggerDocument = YAML.load(
  path.join(__dirname, "../_build/swagger.yaml")
);

//initialize the express server
const app = express();
app.set("port", port || 5000);

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
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
app.use('/users', users)
app.use('/images', images)
app.use('/cart', cart)

// Error middleware
app.use(handleError)

// Export here and start in a diff file (for testing).
export default app;
