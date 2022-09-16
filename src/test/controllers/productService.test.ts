import Category from "../../models/Categories";
import request from "supertest";
import app from "../../server";
import connect, { MockDb } from "../fixtures/mockdb";
import dotenv from "dotenv";

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

describe("test getAll controller", () => {
  //get products
  test("test route /products to return list of products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
  });
  test("test route /products to successfully create a new product", async () => {
    //First create a new category
    const newCategory = new Category({
      name: "Gaming",
    });
    await newCategory.save();
    //Then create a new product in that category
    const adminToken: string = process.env.ADMIN_TOKEN as string;
    const res = await request(app)
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
