import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/useAuth';

const Logout: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth?.logout();
    navigate('/');
  }, [auth, navigate]);

  return null;
};

export default Logout;
