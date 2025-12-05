const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

// For forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Set EJS
app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Register page
app.get("/register", (req, res) => {
  res.render("register");
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Gifts page
app.get("/gifts", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.send("Authorization token missing in URL");
  }

  try {
    const response = await axios.get("http://localhost:5000/api/gifts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    res.render("gifts", { gifts: response.data });

  } catch (err) {
    return res.send("Error loading gifts: " + (err.response?.data?.message || "Unknown error"));
  }
});


// START FRONTEND SERVER
app.listen(3000, () => console.log("Frontend running on http://localhost:3000"));
