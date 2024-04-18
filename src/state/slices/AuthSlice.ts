import { StateCreator } from "zustand";
import { RootState, AuthSliceState } from "../types";
import { auth, googleAuthProvider } from "../../firebase";
import {
  sendSignInLinkToEmail,
  signOut,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";

const isDev = process.env.NODE_ENV === "development";
const DevURL = "http://localhost:3000/";
const ProdURL = "https://www.publico.ai/";
const returnUrl = new URL(isDev ? DevURL : ProdURL);
returnUrl.pathname = "login";

const createAuthSlice: StateCreator<RootState, [], [], AuthSliceState> = (
  set
) => ({
  user: auth?.currentUser ?? null,
  isAuthInitialized: false,
  isAuthSubmitting: false,
  setUser(user) {
    set({ user });
  },
  async sendEmailLoginLink(email) {
    set({ isAuthSubmitting: true });
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: returnUrl.toString(),
        handleCodeInApp: true,
      });
      localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      set({ isAuthSubmitting: false });
    }
  },
  async signInWithEmailLink(email, url) {
    set({ isAuthSubmitting: true });
    try {
      await signInWithEmailLink(auth, email, url);
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      set({
        isAuthSubmitting: false,
      });
    }
  },
  async signInWithGoogle() {
    set({ isAuthSubmitting: true });
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      set({ isAuthSubmitting: false });
    }
  },
  async logout() {
    set({ isAuthSubmitting: true });
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error: ", error);
    } finally {
      set({ user: null, isAuthSubmitting: false });
    }
  },
});

export default createAuthSlice;
