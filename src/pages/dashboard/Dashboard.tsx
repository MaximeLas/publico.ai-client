import "./Dashboard.css";
import { Button } from "react-bootstrap";
import { TfiWrite } from "react-icons/tfi";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdAccountBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const BUTTONS = [
    {
      text: "Start a new grant",
      Icon: TfiWrite,
      action: () => navigate("/demo"),
    },
    { text: "My previous grants", Icon: HiOutlineDocumentSearch },
    { text: "My Documents", Icon: IoDocumentsOutline },
    { text: "My Account", Icon: MdAccountBox },
  ];

  return (
    <div className="dashboard-container center-align">
      <h1>Dashboard</h1>
      <div className="line-below-dashboard"></div>
      <br />
      {BUTTONS.map((button) => (
        <Button
          className="dashboard-btn"
          variant="light"
          onClick={button.action}
        >
          <button.Icon className="dashboard-btn-icon" />
          <br />
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default Dashboard;
