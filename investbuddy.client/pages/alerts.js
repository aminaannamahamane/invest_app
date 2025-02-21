import React from "react";
import CreateAlertForm from "../src/components/CreateAlertForm";
import UserAlerts from "../src/components/UserAlerts";
const AlertsPage = () => {
  return (
    <div className="container mt-5">
      <h2>Gérer mes alertes</h2>
      <CreateAlertForm />
      <UserAlerts />
    </div>
  );
};

export default AlertsPage;
