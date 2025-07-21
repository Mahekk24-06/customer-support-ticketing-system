const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Customer", "Admin", "SupportAgent"],
    default: "Customer"
  }
});

module.exports = mongoose.model("User", userSchema);
