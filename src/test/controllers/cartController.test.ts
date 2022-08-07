import User from "../../models/Users";
import request from "supertest";
import app from "../../server";
import connect, { MockDb } from "../fixtures/mockdb";
import Category from "../../models/Categories";
import Product from "../../models/Products";

let mockdb: MockDb;
beforeAll(async () => {
  mockdb = await connect();
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
    const res = await request(app).get("/cart");
    expect(res.status).toBe(200);
  });
  test("test route /carts to successfully add a new product to cart", async () => {
    // First create a new user
    const newUser = new User({
      firstName: "Meow",
      lastName: "Meow",
      email: "acat@mail.com",
      password: "meowmeow",
      avatar: "catpicture.url",
      role: "guest"
    });
    await newUser.save();
    //Then create a new category
    const newCategory = new Category({
      name: "Pet",
    });
    await newCategory.save();
    //Then create a product
    const newProduct = new Product({
      name: "Cat tree",
      description: "Scratchable cat tree",
      category: "Pet",
      variant: "Beige",
      size: "Big",
      image: "cattree.pic",
    });
    await newProduct.save();
    const res = await request(app).post("/cart").send({
      name: "Cat tree",
      quantity: 1,
      userId: newUser._id,
    });
    expect(res.status).toBe(201);
  });
});
