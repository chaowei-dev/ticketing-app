import request from "supertest";
import { app } from "../../app";

// details with current user
it("responds with details about the current user", async () => {
  // catch cookie
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
