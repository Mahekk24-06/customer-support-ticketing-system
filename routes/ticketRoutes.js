const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");

// Create a ticket
router.post("/create", async (req, res) => {
  try {
    const { title, description, createdBy, priority } = req.body;
    const ticket = new Ticket({ title, description, createdBy, priority });
    await ticket.save();
    res.status(201).json({ message: "Ticket created", ticket });
  } catch (error) {
    res.status(500).json({ message: "Error creating ticket", error });
  }
});

// Get all tickets for a support agent
router.get("/assigned/:agentId", async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.params.agentId }).populate("createdBy", "username");
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error });
  }
});

// Update ticket status
router.put("/updateStatus/:ticketId", async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { status: req.body.status },
      { new: true }
    );
    res.json({ message: "Ticket status updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

module.exports = router;
