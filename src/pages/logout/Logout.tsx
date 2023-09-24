import { Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const Logout: React.FC = () => {
  const auth = useAuth();
  auth?.logout();
  return <Navigate to="/" />;
};

export default Logout;
