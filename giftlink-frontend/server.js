const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Pages
app.get("/", (_, res) => res.render("home"));
app.get("/login", (_, res) => res.render("login"));
app.get("/register", (_, res) => res.render("register"));

// Gifts list — server side fetch
app.get("/gifts", async (req, res) => {
  const token = req.query.token || req.headers.authorization?.split(" ")[1] || null;

  if (!token) {
    return res.render("gifts", { gifts: [] });
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/api/gifts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.render("gifts", { gifts: response.data });
  } catch (err) {
    res.render("gifts", { gifts: [] });
  }
});

app.listen(3000, () => console.log("Frontend running at http://localhost:3000"));
