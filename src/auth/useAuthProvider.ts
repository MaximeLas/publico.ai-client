import { useEffect, useState } from "react"
import { PUBLICO_AI_TOKEN } from "../utilities/constants";
import { LoginInfo, SignupInfo } from "./auth";
import { auth } from "../firebase";
import { signOut, sendSignInLinkToEmail} from "firebase/auth";

export type UseAuthProvider = {
  login: (data: LoginInfo) => Promise<any>;
  logout: () => void;
  setCurrentUser: (user: string) => void;
  user: string | null;
}

const useAuthProvider = (): UseAuthProvider => {
  const [user, setUser] = useState<null | string>(null)

  const login = async (data: LoginInfo) => {
    sendSignInLinkToEmail(auth, data.email, 
    { 
      // Replace this link with deployed url
      url: 'https://www.publico.ai/login',
      handleCodeInApp: true
    }).then(() => {
      // The link was successfully sent. Inform the user.
      localStorage.setItem('emailForSignIn', data.email);
    }).catch((error) => {
      // Some error occurred, you can inspect the code: error.code
    })
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

  const setCurrentUser = async (user: string) => {
    setUser(user);
    console.log(user);
    localStorage.setItem(PUBLICO_AI_TOKEN, user);
  }

  return { user, login, logout, setCurrentUser }
}

export default useAuthProvider
