import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@curry-tickets/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // check in https, if test set false, false true
  })
);

app.all("*", async (req, res) => {
  throw new NotFoundError(); // express will catch this error and throw to middleware(errorHandler)
});

app.use(errorHandler);

export { app };
