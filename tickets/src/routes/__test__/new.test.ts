import request from "supertest";
import { app } from "../../app";

// listening for post
it("has a rout handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

// non-signin
it("can only be access if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

// signed in
it("returns an status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .send({})
    .set("Cookie", global.signin());

  // console.log(response.status);
  expect(response.status).not.toEqual(401);
});

// err for invalid title
it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

// err for invalid price
it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "assdaa",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "adfasfas",
    })
    .expect(400);
});

// creation for valid input
it("creates a ticket with valid inputs", async () => {});
