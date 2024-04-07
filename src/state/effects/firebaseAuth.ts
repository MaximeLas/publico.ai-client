import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { StoreApi } from "zustand";
import { RootState } from "../types";

export default function firebaseAuthEffects(store: StoreApi<RootState>) {
  return onAuthStateChanged(auth, (user) => {
    store.setState(
      user?.email
        ? {
            user: { name: user.displayName, email: user.email, id: user.uid },
            isAuthInitialized: true,
          }
        : { user: null, isAuthInitialized: true }
    );
  });
}
