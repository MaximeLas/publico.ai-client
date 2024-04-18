import { User } from '../types/Auth';

export async function fetchAuthorized(url: string | URL, options: RequestInit, user: User) {
  const token = await user.getIdToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
