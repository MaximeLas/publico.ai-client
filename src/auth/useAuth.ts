import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

// good tutorial: https://www.youtube.com/watch?v=AVVrhYXYwvo
const useAuth = () => useContext(AuthContext)

export default useAuth
