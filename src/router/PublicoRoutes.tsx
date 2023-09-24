import { Route, Routes } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import Demo from "../pages/demo/Demo";
import FullPage from "../components/full-page/FullPage";
import Home from "../pages/home/Home";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import NotFound from "../pages/not-found/NotFound";
import PrivateRoute from "./PrivateRoute";
import TryIt from "../pages/try-it/TryIt";

const PublicoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<FullPage />}>
        {/* Important: Every non-Header non-Footer class must get 4rem padding-bottom added.
          For details, go to Footer.css .my-footer */}
        <Route index element={<Home />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="try-it" element={<TryIt />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path="demo" element={<PrivateRoute component={Demo} />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicoRoutes;
