const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Register Page
app.get("/register", (req, res) => {
  res.render("register");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

// Gifts Page (Server-side token forwarding)
app.get("/gifts", async (req, res) => {
  const token = req.query.token;
  if (!token) return res.send("Authorization token missing in URL");

  try {
    const response = await axios.get(`${BACKEND_URL}/api/gifts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.render("gifts", { gifts: response.data });
  } catch (err) {
    res.send("Error loading gifts: " + (err.response?.data?.message || "Unknown error"));
  }
});

// Start server
app.listen(3000, () => console.log("Frontend running on http://localhost:3000"));
