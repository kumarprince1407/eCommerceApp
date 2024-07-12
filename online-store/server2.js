//server2.js
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("../online-store/src/credentials/online-store-5330d-firebase-adminsdk-qjuwg-d4a74670ab.json");

const app = express();
const PORT = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://online-store-5330d.firebaseio.com",
});

//Function to get user metadata
const getUserMetaData = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    console.log("Successfully fetched user data:", userRecord.toJSON());
    return {
      email: userRecord.email,
      creationTime: userRecord.metadata.creationTime,
    };
  } catch (error) {
    console.log("Error fetching datauser data:", error);
    return null;
  }
};
//const uid = "TX4PqK5dUUgsadcYAX94fYmGK8c2";
// getUserMetaData(uid).then((metadata) => {
//   if (metadata) {
//     console.log("User Email: ", metadata.email);
//     console.log("User Creation Time", metadata.creationTime);
//   }
// });

//Define the endpoint
app.get("/api/getUserMetaData/:uid", async (req, res) => {
  const uid = req.params.uid;
  try {
    const metadata = await getUserMetaData(uid);
    if (metadata) {
      res.status(200).json(metadata);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching metadata: " + error.message);
  }
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
