const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");

// Add agent
router.post("/", async (req, res) => {
  try {
    const { name, email, photo } = req.body;
    const agent = new Agent({ name, email, photo });
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
