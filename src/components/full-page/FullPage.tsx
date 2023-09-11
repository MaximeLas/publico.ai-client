import "./FullPage.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const FullPage = () => {
  return (
    <div className="page-container">
      <Header />
      {/* For more info about Outlet from react-router-dom, check out
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 20:48 */}
      <div className="add-footer-padding-bottom">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FullPage;
