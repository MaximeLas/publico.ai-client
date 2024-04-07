
export interface SignupInfo {
  email: string;
  name: string;
  acceptedTnC: boolean;
}

export interface LoginInfo {
  email: string;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
}