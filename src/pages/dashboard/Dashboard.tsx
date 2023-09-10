import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <p>
      abc TODO Dashboard{" "}
      {location.state.isLoggedIn ? "logged in" : "not logged in"}
    </p>
  );
};

export default Dashboard;
