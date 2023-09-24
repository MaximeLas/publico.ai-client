import { createContext } from "react";
import useAuthProvider, { UseAuthProvider } from "./useAuthProvider";
import { getLocalStorageToken, hasStoredToken } from "./auth";

export const AuthContext = createContext<UseAuthProvider | null>(null);

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useAuthProvider();
  if (hasStoredToken()) auth.user = getLocalStorageToken();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
