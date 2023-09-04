import { Button } from "react-bootstrap";
import logo from "../../assets/logo/logo.png";
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
      <NavLink to="login" className="my-header-right-navlink">
        <Button variant="dark" className="my-header-right-btn-dark">
          LOG IN
        </Button>
      </NavLink>

      <NavLink to="contact" className="my-header-right-navlink">
        <Button variant="light" className="my-header-right-btn-light">
          CONTACT
        </Button>
      </NavLink>

      <NavLink to="try-it" className="my-header-right-navlink">
        <Button variant="light" className="my-header-right-btn-light">
          TRY IT
        </Button>
      </NavLink>

      <NavLink to="how-it-works" className="my-header-right-navlink">
        <Button variant="light" className="my-header-right-btn-light">
          HOW IT WORKS
        </Button>
      </NavLink>
    </header>
  );
};

export default Header;
