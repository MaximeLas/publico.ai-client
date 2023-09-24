import { useState } from "react"
import { PUBLICO_AI_TOKEN } from "../utilities/constants";
import { LoginInfo, SignupInfo } from "./auth";

export type UseAuthProvider = {
  signup: (data: SignupInfo) => Promise<any>;
  login: (data: LoginInfo) => Promise<any>;
  logout: () => void;
  user: string | null;
}

const useAuthProvider = (): UseAuthProvider => {
  const [user, setUser] = useState<null | string>(null)

  const signup = async (data: SignupInfo) => {
    // 1. Do API call - doing this just to simulate waiting some time for an API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 2. Set state
    setUser(data.email)
    localStorage.setItem(PUBLICO_AI_TOKEN, data.email)

    // 3. Return status of operatiom
    return { status: 'OK' }
  }

  const login = async (data: LoginInfo) => {
    // 1. Do API call - doing this just to simulate waiting some time for an API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 2. Set state
    setUser(data.email)
    localStorage.setItem(PUBLICO_AI_TOKEN, data.email)

    // 3. Return status of operatiom
    return { status: 'OK' }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem(PUBLICO_AI_TOKEN)
  }

  return { user, signup, login, logout }
}

export default useAuthProvider
