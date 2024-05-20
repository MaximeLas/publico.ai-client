import { User } from '../types/Auth';

export async function fetchAuthorized(url: string | URL, options: RequestInit, user: User): Promise<Response> {
  try {
    const token = await user.getIdToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    throw error;
  }
}
