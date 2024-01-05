import { PUBLICO_AI_TOKEN } from "../utilities/constants";

export type SignupInfo = {
  email: string;
  name: string;
  acceptedTnC: boolean;
};

export type LoginInfo = {
  email: string;
};

const getLocalStorageToken = () => localStorage.getItem(PUBLICO_AI_TOKEN)

const hasStoredToken = () => !!getLocalStorageToken()

export {
  hasStoredToken,
  getLocalStorageToken,
}
