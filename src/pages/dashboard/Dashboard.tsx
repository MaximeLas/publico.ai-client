import "./Dashboard.css";
import Account from "./account/Account";
import Documents from "./documents/Documents";
import NewGrant from "./new-grant/NewGrant";
import PreviousGrants from "./previous-grants/PreviousGrants";

const Dashboard = () => {
  return (
    <div className="dashboard-container dashboard-container-max-width">
      <h1 className="center-align">Dashboard</h1>
      <div className="center-align line-below-dashboard"></div>
      <br />
      <NewGrant />
      <PreviousGrants />
      <Documents />
      <Account />
    </div>
  );
};

export default Dashboard;
