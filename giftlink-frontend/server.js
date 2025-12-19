const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_, res) => res.render("home"));
app.get("/login", (_, res) => res.render("login"));
app.get("/register", (_, res) => res.render("register"));
app.get("/gifts", (_, res) => res.render("gifts", { gifts: [] }));

app.listen(PORT, () =>
  console.log(`Frontend running on port ${PORT}`)
);
