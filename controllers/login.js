const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;