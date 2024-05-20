import { Route, Routes } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import Demo from "../pages/demo/Demo";
import Bloomsbury from "../pages/demo/Bloomsbury";
import Rachel from "../pages/demo/Rachel";
import Dev from "../pages/demo/Dev";
import HowItWorks from "../pages/how-it-works/HowItWorks";
import ScheduleDemo from "../pages/schedule-demo/ScheduleDemo";
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import NotFound from "../pages/not-found/NotFound";
import PrivateRoute from "./PrivateRoute";
import Placeholder from "../pages/home/Placeholder";
import MainLayout from "../layout/main/MainLayout";
import MinimalLayout from "../layout/minimal/MinimalLayout";
import PreviousGrants from "../pages/previous-grants/PreviousGrants";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../pages/error-page/ErrorFallback";

const PublicoRoutes: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<MinimalLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Placeholder />} />
          <Route path="schedule-demo" element={<ScheduleDemo />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="contact" element={<Contact />} />
          <Route path="bloomsbury" element={<Bloomsbury />} />
          <Route path="rachel" element={<Rachel />} />
          <Route path="dev" element={<Dev />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="demo" element={<PrivateRoute component={Demo} />} />
          <Route path="my-previous-grants" element={<PrivateRoute component={PreviousGrants} />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default PublicoRoutes;
