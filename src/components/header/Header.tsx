import { Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="my-header">
      <img src={logo} alt="Publico main logo" className="my-logo" />

      <Button
        className="my-header-right-btn"
        variant="dark"
        onClick={() => (window.location.href = "/login")}
      >
        Log In
      </Button>

      <Button
        className="my-header-right-btn"
        variant="dark"
        onClick={() => (window.location.href = "/signup")}
      >
        Sign Up
      </Button>
    </header>
  );
};

export default Header;
