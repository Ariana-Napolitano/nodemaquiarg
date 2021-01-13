/*const express = require("express");
const router = express.Router();
const { App } = require("mongodb");

//await App.currentUser.logOut();

router.post("/", async (req, res) => {
  const credentials = Realm.Credentials.emailPassword(mail, password);
  try {
    const user = await App.logIn(credentials);
    console.log("Successfully logged in!", user.id);
    return user;
  } catch (err) {
    console.error("Failed to log in", err.message);
  }
});

module.exports = router;
*/
