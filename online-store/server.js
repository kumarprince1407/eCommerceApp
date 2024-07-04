//server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3005;

//Middleware to parse JSON
app.use(express.json());
app.use(cors());

let users = [];

//Route to handle form submission
app.post("/submituserInfo", (req, res) => {
  const userInfo = req.body;
  users.push(userInfo);
  console.log("User Information:", userInfo);

  res.status(201).json({ message: "User information submitted successfully" });
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
