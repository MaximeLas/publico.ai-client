import "bootstrap/dist/css/bootstrap.css";
import "./FullPage.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import AuthProvider from "../../auth/AuthProvider";

const FullPage: React.FC = () => (
  <AuthProvider>
    <div className="page-container bg-light flex-no-wrap">
      <Header />
      {/* For more info about Outlet from react-router-dom, check out
        https://www.youtube.com/watch?v=Ul3y1LXxzdU at 20m 48s */}
      <div className="content add-footer-padding-bottom">
        <Outlet />
      </div>
      <Footer />
    </div>
  </AuthProvider>
);
export default FullPage;
