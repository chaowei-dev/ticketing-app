import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  // cookie session set?
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }
  try {
    // if setted
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (err) {
    // if non-set
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
