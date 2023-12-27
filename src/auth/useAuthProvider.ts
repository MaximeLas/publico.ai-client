import { useEffect, useState } from "react"
import { PUBLICO_AI_TOKEN } from "../utilities/constants";
import { LoginInfo, SignupInfo } from "./auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";

export type UseAuthProvider = {
  signup: (data: SignupInfo) => Promise<any>;
  login: (data: LoginInfo) => Promise<any>;
  logout: () => void;
  user: string | null;
}

const useAuthProvider = (): UseAuthProvider => {
  const [user, setUser] = useState<null | string>(null)

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid)
        console.log(user.uid);
      } else {
        setUser(null)
      }
    });
    return () => listen();
  }, []);

  const signup = async (data: SignupInfo) => {
    await new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up 
          console.log(userCredential);
          setUser(userCredential.user.uid);
          resolve(userCredential);
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  const login = async (data: LoginInfo) => {
    await new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in 
          console.log(userCredential);
          setUser(userCredential.user.uid);
          localStorage.setItem(PUBLICO_AI_TOKEN, userCredential.user.uid);
          resolve(userCredential);
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  const logout = async (): Promise<void> => {
    await new Promise<void>((resolve, reject) => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setUser(null);
          localStorage.removeItem(PUBLICO_AI_TOKEN);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  return { user, signup, login, logout }
}

export default useAuthProvider
