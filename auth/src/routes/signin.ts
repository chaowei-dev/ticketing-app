import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must suppy a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // user existing
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // don't tell user email is wrong, just tell user something wrong
      throw new BadRequestError("Invalid credentials");
    }

    // password wrong
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      // don't tell user password is wrong, just tell user something wrong
      throw new BadRequestError("Invalid Credential");
    }

    // send JWT of existing user props
    // #1 Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // #2 Store it on session object
    req.session = {
      jwt: userJwt,
    };

    // #3 send
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
