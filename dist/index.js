"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const URI = process.env.SHOP_DB_URI;
mongoose_1.default
    .connect(`${URI}`)
    .then(() => {
    server_1.default.listen(server_1.default.get("port"), () => console.log(`app is up and running in port ${server_1.default.get("port")}`));
})
    .catch((e) => {
    console.log("DB connect error");
    process.exit(1);
});
//# sourceMappingURL=index.js.map