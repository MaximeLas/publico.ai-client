import { Route, Routes } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import Demo from "../pages/demo/Demo";
import Bloomsbury from "../pages/demo/Bloomsbury";
import Rachel from "../pages/demo/Rachel";
import Dev from "../pages/demo/Dev";
import FullPage from "../components/full-page/FullPage";
import Home from "../pages/home/Home";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import ScheduleDemo from "../pages/schedule-demo/ScheduleDemo";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import NotFound from "../pages/not-found/NotFound";
import PrivateRoute from "./PrivateRoute";
import TryIt from "../pages/try-it/TryIt";
import Placeholder from "../pages/home/Placeholder";


const PublicoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<FullPage />}>
        {/* Important: Every non-Header non-Footer class must get 4rem padding-bottom added.
          For details, go to Footer.css .my-footer */}
        <Route index element={<Placeholder />} />
        <Route path="schedule-demo" element={<ScheduleDemo />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="try-it" element={<TryIt />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="bloomsbury" element={<Bloomsbury />} />
        <Route path="rachel" element={<Rachel />} />
        <Route path="dev" element={<Dev />} />
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
