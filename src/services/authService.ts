import { getToken, deleteToken } from '../storage/tokenStorage';

const BASE_URL = 'https://dummyjson.com';

export async function authenticatedFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    await deleteToken();
    throw new Error('Session expired or unauthorized. Token removed.');
  }

  return response;
}

export async function loginUser(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });

  if (!response.ok) {
    throw new Error('Login failed. Check your username and password.');
  }

  const data = await response.json();
  return data;
}

export async function getCurrentUser() {
  const response = await authenticatedFetch('/auth/me');

  if (!response.ok) {
    throw new Error('Failed to retrieve user profile or session expired.');
  }

  const profile = await response.json();
  return profile;
}