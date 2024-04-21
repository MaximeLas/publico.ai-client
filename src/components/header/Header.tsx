import { useLayoutEffect } from "react";
import logo from "../../assets/logo/logo.png";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import useCurrentUser from "../../hooks/state/useCurrentUser";
import debounce from '../../utilities/debounce';

const ResponsiveNavbarPub: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const currentUser = useCurrentUser();

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
          {currentUser ? (
            <ul>
              <li onClick={hideSideNavbar}>
                <NavLink to="/" className="my-navlink-mobile">
                  Home
                </NavLink>
              </li>
              <li onClick={hideSideNavbar}>
                <NavLink to="/dashboard" className="my-navlink-mobile">
                  Dashboard
                </NavLink>
              </li>
              <li onClick={hideSideNavbar}>
                <NavLink to="/logout" className="my-navlink-mobile">
                  Log out
                </NavLink>
              </li>
              <li onClick={hideSideNavbar}>
                <NavLink to="/schedule-demo" className="my-navlink-mobile">
                  Schedule a demo
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={hideSideNavbar}>
                <NavLink to="/" className="my-navlink-mobile">
                  Home
                </NavLink>
              </li>
              <li onClick={hideSideNavbar}>
                <NavLink to="/login" className="my-navlink-mobile">
                  Log in
                </NavLink>
              </li>
              <li onClick={hideSideNavbar}>
                <NavLink to="/schedule-demo" className="my-navlink-mobile">
                  Schedule a demo
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
};

const DesktopNavbarPub: React.FC = () => {
  const currentUser = useCurrentUser();

  return (
    <header className="my-header">
      <Link to="/">
        <img src={logo} alt="Publico main logo" className="my-logo" />
      </Link>

      <nav>
        {/* NavLink and Link are the same except that NavLink has extra styling
        functionality but I'm not using it here. For more info, can go to
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 34:10 */}

        {currentUser ? (
          <>
            <NavLink to="/schedule-demo" className="my-navlink my-navlink-dark">
              Schedule a Demo
            </NavLink>
            <NavLink to="/logout" className="my-navlink">
              Log out
            </NavLink>
            <NavLink to="/dashboard" className="my-navlink">
              Dashboard
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/schedule-demo" className="my-navlink my-navlink-dark">
              Schedule a demo
            </NavLink>
            <NavLink to="/login" className="my-navlink">
              Log in
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

const Header: React.FC = () => {
  const [shouldDisplayResponsiveNavbar, setShouldDisplayResponsiveNavbar] =
    useState(false);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(debounce((entries) => {
      setShouldDisplayResponsiveNavbar(entries[0].contentRect.width < 980);
    }, 100));
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return shouldDisplayResponsiveNavbar ? (
    <ResponsiveNavbarPub />
  ) : (
    <DesktopNavbarPub />
  );
};

export default Header;
