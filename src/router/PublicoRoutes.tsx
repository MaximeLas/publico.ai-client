import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import FullPage from "../components/full-page/FullPage";
import NotFound from "../pages/not-found/NotFound";
import TryIt from "../pages/try-it/TryIt";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import Contact from "../pages/contact/Contact";

const PublicoRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<FullPage />}>
        {/* Important: Every non-Header non-Footer class must get 4rem padding-bottom added.
          For details, go to Footer.css .my-footer */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
        <Route path="try-it" element={<TryIt />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicoRoutes;