import logo from "../../assets/logo/logo.png";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const ResponsiveNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSideNavbar = () => setExpanded(!expanded);
  const hideSideNavbar = () => setExpanded(false);

  return (
    <header className="my-header">
      <Link to="/" onClick={hideSideNavbar}>
        <img
          src={logo}
          alt="Publico main logo"
          className="my-logo my-logo-mobile"
        />
      </Link>

      <div className="my-hamburger" onClick={toggleSideNavbar}>
        {expanded ? <FaTimes /> : <FaBars />}
      </div>

      {expanded && (
        <nav className="my-side-nav">
          <ul>
            <li onClick={hideSideNavbar}>
              <NavLink to="/" className="my-navlink-mobile">
                HOME
              </NavLink>
            </li>
            <li onClick={hideSideNavbar}>
              <NavLink to="/how-it-works" className="my-navlink-mobile">
                HOW IT WORKS
              </NavLink>
            </li>
            <li onClick={hideSideNavbar}>
              <NavLink to="/try-it" className="my-navlink-mobile">
                TRY IT
              </NavLink>
            </li>
            <li onClick={hideSideNavbar}>
              <NavLink to="/contact" className="my-navlink-mobile">
                CONTACT
              </NavLink>
            </li>
            <li onClick={hideSideNavbar}>
              <NavLink to="/login" className="my-navlink-mobile">
                LOG IN
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

const DesktopNavbar = () => (
  <header className="my-header">
    <Link to="/">
      <img src={logo} alt="Publico main logo" className="my-logo" />
    </Link>

    <nav>
      {/* NavLink and Link are the same except that NavLink has extra styling
        functionality but I'm not using it here. For more info, can go to
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 34:10 */}
      <NavLink to="/login" className="my-navlink my-navlink-dark">
        LOG IN
      </NavLink>
      <NavLink to="/contact" className="my-navlink">
        CONTACT
      </NavLink>
      <NavLink to="/try-it" className="my-navlink">
        TRY IT
      </NavLink>
      <NavLink to="/how-it-works" className="my-navlink">
        HOW IT WORKS
      </NavLink>
    </nav>
  </header>
);

const Header = () => {
  const shouldDisplayResponsiveNavbar = window.innerWidth < 980;

  return shouldDisplayResponsiveNavbar ? (
    <ResponsiveNavbar />
  ) : (
    <DesktopNavbar />
  );
};

export default Header;
