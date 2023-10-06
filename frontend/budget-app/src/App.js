import Dashboard from "./Dashboard";
import React, { useState } from "react";

const mockdata = {
  _id: "crandon",
  income: 10800,
  budget: {
    "Fixed Costs": 3744,
    Vacations: 300,
    Gifts: 300,
    "Guilt Free Crandon": 1000,
    "Guilt Free Chandrika": 1000,
    "Emergency Fund": 1000,
    "Jay Savings": 300,
    Savings: 600,
    "Extra Home Payments": 2000,
    Misc: 555,
  },
};
function App() {
  const [dashboard, setDashboard] = useState("");
  const handleDataChange = (data) => {
    setDashboard(data);
  };
  return (
    <div>
      <Dashboard props={mockdata} onDataChange={handleDataChange} />
    </div>
  );
}

export default App;
