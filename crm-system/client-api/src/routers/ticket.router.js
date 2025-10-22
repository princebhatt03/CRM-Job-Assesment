import express from "express";
const router = express.Router();
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import {
  insertTicket,
  getTickets,
  getTicketById,
  updateClientTicket,
  updateStatusClose,
  deleteTicket,
} from "../model/ticket/ticket.model.js";
import {
  ticketCreationValidation,
  ticketUpdateValidation,
} from "../middlewares/validation.middleware.js";

router.all("/", (req, res, next) => {
  next();
});

router.post(
  "/",
  ticketCreationValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { subject, sender, message } = req.body;
      const clientId = req.userId;
      const ticketObj = {
        clientId,
        subject,
        conversation: [
          {
            sender,
            message,
          },
        ],
      };
      const ticket = await insertTicket(ticketObj);
      if (ticket && ticket._id) {
        return res.json({ message: "Ticket created successfully", ticket });
      }
      return res.status(500).json({ message: "Unable to create ticket" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Ticket already exist" });
      }
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/", userAuthorization, async (req, res) => {
  try {
    const clientId = req.userId;
    const tickets = await getTickets(clientId);
    return res.json({ message: "Tickets fetched successfully", tickets });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:ticketId", userAuthorization, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const clientId = req.userId;
    const ticket = await getTicketById(ticketId, clientId);
    return res.json({ message: "Ticket fetched successfully", ticket });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put(
  "/:ticketId",
  ticketUpdateValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const clientId = req.userId;
      const ticketId = req.params.ticketId;
      const updateObj = req.body;
      const ticket = await updateClientTicket(ticketId, clientId, updateObj);
      if (ticket && ticket._id) {
        return res.json({ message: "Ticket updated successfully" });
      }
      return res.status(500).json({ message: "Unable to update ticket" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.patch("/close-ticket/:ticketId", userAuthorization, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const clientId = req.userId;
    const ticket = await updateStatusClose(ticketId, clientId);
    if (ticket && ticket._id) {
      return res.json({ message: "Ticket closed successfully" });
    }
    return res.status(500).json({ message: "Unable to close ticket" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:ticketId", userAuthorization, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const clientId = req.userId;
    await deleteTicket(ticketId, clientId);
    return res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
