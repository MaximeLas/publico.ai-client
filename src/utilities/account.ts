import { PUBLICO_AI_TOKEN } from "./constants"

const isLoggedIn = (): boolean => !!localStorage.getItem(PUBLICO_AI_TOKEN)

const logout = () => {
  localStorage.removeItem(PUBLICO_AI_TOKEN)
}

export {
  isLoggedIn,
  logout,
}
