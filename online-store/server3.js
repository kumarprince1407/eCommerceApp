//server3.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3005;

//Middleware to parse JSON
app.use(express.json());
app.use(cors());

//
const { useAuth } = require("./AuthContext");
const { getAuth } = require("firebase/auth");
let firebaseId = null;
//User data
let users = [
  {
    id: "1",

    firstname: "",
    lastname: "",
    contact: "",
    address: "",
    gender: "",
  },
];

//Route to fetch user data
// app.get("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     const updatedUserInfo = req.body;

//     const userIndex = users.findIndex((user) => user.id === userId);
//     if (userIndex === -1) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     users[userIndex] = { ...users[userIndex], ...updatedUserInfo };
//     res.status(200).json(users[userIndex]);
//     console.log("User info: ", updatedUserInfo);
//   });

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
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

// app.put("/users/:id", (req, res) => {
//   const index = users.findIndex((u) => u.id === req.params.id);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...req.body.updatedUserInfo };
//     res.json(users[index]);
//   } else {
//     res.status(404).send("User not found");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
