import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@curry-tickets/common";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  // not found
  if (!ticket) {
    throw new NotFoundError();
  }

  // found
  res.send(ticket);
});

export { router as showTicketRouter };
