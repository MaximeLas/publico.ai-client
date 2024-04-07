import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/state/useAuth";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      await logout();
      navigate("/");
    })();
  }, [logout, navigate]);

  return null;
};

export default Logout;
