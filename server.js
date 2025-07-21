const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/supportDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve static frontend files
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// Frontend Page Routes
const frontendRoutes = [
  { url: "/", file: "login.html" },
  { url: "/signup", file: "signup.html" },
  { url: "/create-ticket", file: "create-ticket.html" },
  { url: "/my-tickets", file: "my-tickets.html" },
  { url: "/agents", file: "agents.html" },
  { url: "/overview", file: "overview.html" },
  { url: "/admin-profile", file: "admin profile.html" }, // Consider renaming to admin-profile.html
];

frontendRoutes.forEach(route => {
  app.get(route.url, (req, res) => {
    res.sendFile(path.join(frontendPath, route.file));
  });
});

// API Routes
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes"); // 👈 Role-based login in this file
const commentRoutes = require("./routes/commentRoutes");
const agentRoutes = require("./routes/agentRoutes");

app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes); // Role-based login/signup here
app.use("/api/comment", commentRoutes);
app.use("/api/agents", agentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
