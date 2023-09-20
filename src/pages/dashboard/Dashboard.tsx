import { Button } from "react-bootstrap";
import "./Dashboard.css";
import { TfiWrite } from "react-icons/tfi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { MdContactSupport } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const BUTTONS = [
    { text: "Start a new grant", Icon: TfiWrite, action: () => navigate('/try-it') },
    { text: "My previous grants", Icon: HiOutlineDocumentSearch },
    { text: "My Documents", Icon: IoDocumentsOutline },
    { text: "My Account", Icon: MdAccountBox },
    { text: "Support", Icon: MdContactSupport },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="center-align">Dashboard</h1>
      <div className="center-align line-below-dashboard"></div>
      <br />
      {BUTTONS.map((button) => (
        <Button className="dashboard-btn" variant="light">
          <button.Icon className="dashboard-btn-icon" />
          <br />
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default Dashboard;
