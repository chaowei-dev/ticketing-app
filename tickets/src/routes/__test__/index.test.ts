import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "adfafd",
    price: 20,
  });
};

// read: list of tickets
it("can fetch a list of tickets", async () => {
  // craete 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  // retrieve tickets
  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
