"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../../models/Users"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const mockdb_1 = __importDefault(require("../fixtures/mockdb"));
const Categories_1 = __importDefault(require("../../models/Categories"));
const Products_1 = __importDefault(require("../../models/Products"));
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
describe("test get all carts controller", () => {
    //get all carts
    test("test route /carts to return list of all carts", async () => {
        const res = await (0, supertest_1.default)(server_1.default).get("/cart");
        expect(res.status).toBe(200);
    });
    test("test route /carts to successfully add a new product to cart", async () => {
        // First create a new user
        const newUser = new Users_1.default({
            firstName: "Meow",
            lastName: "Meow",
            email: "acat@mail.com",
            password: "meowmeow",
            avatar: "catpicture.url",
            role: "guest"
        });
        await newUser.save();
        //Then create a new category
        const newCategory = new Categories_1.default({
            name: "Pet",
        });
        await newCategory.save();
        //Then create a product
        const newProduct = new Products_1.default({
            name: "Cat tree",
            description: "Scratchable cat tree",
            category: "Pet",
            variant: "Beige",
            size: "Big",
            image: "cattree.pic",
        });
        await newProduct.save();
        const res = await (0, supertest_1.default)(server_1.default).post("/cart").send({
            name: "Cat tree",
            quantity: 1,
            userId: newUser._id,
        });
        expect(res.status).toBe(201);
    });
});
//# sourceMappingURL=cartController.test.js.map