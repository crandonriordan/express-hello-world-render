const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
  _id: String,
  income: { type: Number, min: 0, max: 99999, required: true },
  budget: Schema.Types.Mixed,
});

const DashboardModel = mongoose.model("dashboard", DashboardSchema);
module.exports = DashboardModel;
