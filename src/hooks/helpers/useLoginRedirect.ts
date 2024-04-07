import { useEffect, useState } from 'react'
import useAuth from '../state/useAuth';
import { isSignInWithEmailLink } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

function useLoginRedirect() {
  const [isLoading, setLoading] = useState(true);
  const { user, signInWithEmailLink } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");
      if (email) {
        signInWithEmailLink(email, window.location.href)
          .then(() => {
            localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [navigate, signInWithEmailLink, user]);

  return isLoading;
}

export default useLoginRedirect