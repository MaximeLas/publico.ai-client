import { useCallback } from "react";
import { LoginInfo } from "../../types/Auth";
import useAuth from "../state/useAuth";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function useOnLoginSubmit(isEmailVerifyPage: boolean) {
  const { signInWithEmailLink } = useAuth();
  return useCallback(
    async ({ email }: LoginInfo) => {
      if (!email) return;
      if (isEmailVerifyPage) {
        try {
          await signInWithEmailLink(email, window.location.href);
          localStorage.setItem("emailForSignIn", email);
        } catch (error) {
          console.error("Login error: ", error);
        }
      } else {
        try {
          await sendSignInLinkToEmail(auth, email, {
            url: window.location.href,
            handleCodeInApp: true,
          });
          localStorage.setItem("emailForSignIn", email);
        } catch (error) {
          console.error("Login error: ", error);
        }
      }
    },
    [isEmailVerifyPage, signInWithEmailLink]
  );
}
