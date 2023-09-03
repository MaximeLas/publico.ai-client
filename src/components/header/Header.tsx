import { Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="my-header">
      <Link to="/">
        <img src={logo} alt="Publico main logo" className="my-logo" />
      </Link>

      {/* NavLink and Link are the same except that NavLink has extra styling
        functionality but I'm not using it here. For more info, can go to
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 34:10 */}
      <NavLink to="login" className="my-header-right-btn">
        <Button variant="dark">Log In</Button>
      </NavLink>

      <NavLink to="signup" className="my-header-right-btn">
        <Button variant="dark">Sign Up</Button>
      </NavLink>
    </header>
  );
};

export default Header;
