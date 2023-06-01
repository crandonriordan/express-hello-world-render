const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    "_id": {
      "type": "String"
    },
    "dashboard": {
      "income": {
        "type": "Number"
      },
      "expenses": {}
    }
});

modules.export = Dashboard = new mongoose.model('dashboard', DashboardSchema);