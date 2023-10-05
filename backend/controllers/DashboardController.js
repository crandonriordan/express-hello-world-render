const express = require("express");
const router = express.Router();
const DashboardModel = require("../models/Dashboard");
router.use(express.json());

router.get("/", function (req, res) {
  if (!req.isAuthenticated()) {
    res.json({ message: "You are not authenticated" });
  }
  DashboardModel.find();
});

router.post("/", function (req, res) {
  if (!req.isAuthenticated()) {
    res.json({ message: "You are not authenticated" });
  }
  const newDashboard = new DashboardModel({
    income: req.body.income,
    budget: req.body.budget,
    _id: req.user.username,
  });
  newDashboard.save((err, savedObj) => {
    if (err) {
      console.error("Error saving object: ", err);
    } else {
      console.log("Successfully saved! ", savedObj);
    }
  });
});

module.exports = router;
