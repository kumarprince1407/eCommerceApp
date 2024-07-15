//server3.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3005;

//Middleware to parse JSON
app.use(express.json());
app.use(cors());

//User data
// let users = [
//   {
//     id: "",

//     firstname: "",
//     lastname: "",
//     contact: "",
//     address: "",
//     gender: "",
//   },
// ];

let users = [];
//Change

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

//Route to add a new UID
app.post("/users", (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ message: "UID is required" });
  }

  const newUser = {
    id: uid,
    firstname: "",
    lastname: "",
    contact: "",
    address: "",
    gender: "",
  };
  users.push(newUser);
  res.status(201).json(newUser);
  console.log("New user added", newUser);
});

//Route to handle updated user information
app.patch("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUserInfo = req.body;

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[userIndex] = { ...users[userIndex], ...updatedUserInfo };
  res.status(200).json(users[userIndex]);
  console.log("Updated user info: ", updatedUserInfo);
});

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
