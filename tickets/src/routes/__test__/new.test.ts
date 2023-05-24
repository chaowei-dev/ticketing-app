import request from "supertest";
import { app } from "../../app";

// listening for post
it("has a rout handler listening to /api/tickets for post request", async () => {});

// non-signin
it("can only be access if user is signed in", async () => {});

// err for invalid title
it("returns an error if an invalid title is provided", async () => {});

// err for invalid price
it("returns an error if an invalid price is provided", async () => {});

// creation for valid input
it("creates a ticket with valid inputs", async () => {});
