const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.json({ message: "You made it to the secured profie" });
  } else {
    res.json({ message: "You are not authenticated" });
  }
});

module.exports = router;
