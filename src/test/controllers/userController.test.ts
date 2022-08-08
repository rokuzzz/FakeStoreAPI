import mongoose from 'mongoose';
import request from "supertest";

import connect, { MockDb } from "../fixtures/mockdb";
import app from "../../server";
import User from "../../models/Users";

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

describe('test user controller', () => {
  test('test route /users with token of normal user', async () => {
    const response = await request(app).get('/users')
    .set(
      "jwt_token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmUwNDJhZTE2ZTFjZDY2MWZkYTgyYTgiLCJ1c2VyIjoiaG9hbi5ob0BtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1OTM3Njg2Mn0.TfowqKID48tOxcC5pwjg1QEyoseFRp7lTeIImyLOGoE"
    )
    expect(response.status).toBe(200);
})
  test('get single user', async () => {
    const userId = new mongoose.Types.ObjectId().toString()
    const newUser = new User({
      _id: userId,
      firstName: "Roman",
      lastName: "New",
      email: "new.roman@test-mail.com",
      password: "testing",
      avatar: "https://picsum.photos/200/300",
      role: "guest"
    });
    await newUser.save();

    const response = await request(app).get(`/users/${userId}`)
    expect(response.status).toBe(200)
  })
  test('create new user', async () => {
    const response = await request(app).post('/users')
        .set("Content-Type", "multipart/form-data")
        .field('firstName', 'Roman')
        .field('lastName', 'Kuzero')
        .field('email', 'roman.kuzero@gmail.com')
        .field('password', 'testpass')
        .field('phone', '0468461234')
        .attach('avatar', 'src/test/fixtures/avatar.jpg')
    expect(response.status).toBe(201)
  })
  test('delete user', async () => {
    const userId = new mongoose.Types.ObjectId().toString()
    const newUser = new User({
      _id: userId,
      firstName: "Roman",
      lastName: "New",
      email: "new.roman@test-mail.com",
      password: "testing",
      avatar: "https://picsum.photos/200/300",
      role: "guest"
    });
    await newUser.save();

    const response = await request(app).delete(`/users/${userId}`)
    expect(response.status).toBe(204)
  })
})