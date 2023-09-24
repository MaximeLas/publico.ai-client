import { PUBLICO_AI_TOKEN } from "../utilities/constants";

export type SignupInfo = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  organization: string;
  organizationSize: string;
  organizationType: string;
  acceptedTnC: boolean;
};

export type LoginInfo = {
  email: string;
  password: string;
};

const getLocalStorageToken = () => localStorage.getItem(PUBLICO_AI_TOKEN)

const hasStoredToken = () => !!getLocalStorageToken()

export {
  hasStoredToken,
  getLocalStorageToken,
}
