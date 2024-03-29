import { useEffect } from "react";
import useAuth from "../../auth/useAuth";
import useStore from "../useStore";

// Temporary sync until auth state is moved to store
export default function useTempSyncStoreAuth() {
  const { user } = useAuth() || { user: null };
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);
}
