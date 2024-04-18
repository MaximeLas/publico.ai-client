import { User as FUser } from 'firebase/auth';

export interface SignupInfo {
  email: string;
  name: string;
  acceptedTnC: boolean;
}

export interface LoginInfo {
  email: string;
}

export interface User extends FUser {
}
