import request from "supertest";
import { app } from "../../app";

// successful singnup
it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "passwrod",
    })
    .expect(201);
});

// invalid email
it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "dsfasdfadsf",
      password: "passwrod",
    })
    .expect(400);
});

// invalid password
it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "dsfasdfadsf",
      password: "p",
    })
    .expect(400);
});

// missing email and password
it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "dsfasdfadsf" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "passwrod" })
    .expect(400);
});

// disallows duplicate emails
it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

// sets a cookie after successful signup
it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
