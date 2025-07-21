const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photo: String,
});

module.exports = mongoose.model("Agent", agentSchema);
