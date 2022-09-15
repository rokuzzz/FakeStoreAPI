"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleError_1 = require("./middlewares/handleError");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routes/products"));
const categories_1 = __importDefault(require("./routes/categories"));
const users_1 = __importDefault(require("./routes/users"));
const images_1 = __importDefault(require("./routes/images"));
const cart_1 = __importDefault(require("./routes/cart"));
dotenv_1.default.config();
const port = process.env.PORT;
//import swaggerDocument from './swagger/swagger.json'
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../_build/swagger.yaml"));
//initialize the express server
const app = (0, express_1.default)();
app.set("port", port);
// Common middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.text());
app.use((0, cookie_parser_1.default)());
// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
// Add swagger router
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, {
    explorer: true,
}));
// Add routes
app.use("/products", products_1.default);
app.use("/categories", categories_1.default);
app.use('/users', users_1.default);
app.use('/images', images_1.default);
app.use('/cart', cart_1.default);
// Error middleware
app.use(handleError_1.handleError);
// Export here and start in a diff file (for testing).
exports.default = app;
//# sourceMappingURL=server.js.map