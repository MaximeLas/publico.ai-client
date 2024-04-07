import useStore from "./useStore";
import { useShallow } from "zustand/react/shallow";

export default function useAuth() {
  return useStore(
    useShallow((state) => ({
      signInWithEmailLink: state.signInWithEmailLink,
      signInWithGoogle: state.signInWithGoogle,
      logout: state.logout,
      user: state.user,
    }))
  );
}
