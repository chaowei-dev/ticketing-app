import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@curry-tickets/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // no found
    if (!ticket) {
      throw new NotFoundError();
    }

    // no auth
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    // found and auth
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
