"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Categories_1 = __importDefault(require("../../models/Categories"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const mockdb_1 = __importDefault(require("../fixtures/mockdb"));
let mockdb;
beforeAll(async () => {
    mockdb = await (0, mockdb_1.default)();
});
afterAll(async () => {
    await mockdb.closeDatabase();
});
afterEach(async () => {
    await mockdb.clearDatabase();
});
describe("test getAll controller", () => {
    //get products
    test("test route /products to return list of products", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get("/products");
        expect(res.status).toBe(200);
    });
    test("test route /products to successfully create a new product", async () => {
        //First create a new category
        const newCategory = new Categories_1.default({
            name: "Gaming",
        });
        await newCategory.save();
        //Then create a new product in that category
        const adminToken = process.env.ADMIN_TOKEN;
        const res = await (0, supertest_1.default)(server_1.default)
            .post("/products")
            .set("jwt_token", adminToken)
            .send({
            name: "Asus laptop",
            description: "A gaming laptop 2023",
            category: "Gaming",
            variant: "Black",
            size: "15inches",
            image: "image.url",
        });
        expect(res.status).toBe(201);
    });
});
//# sourceMappingURL=productService.test.js.map