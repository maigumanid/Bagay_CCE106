import { createContext, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { API_BASE_URL } from '@/constants/api';

const AUTH_TOKEN_KEY = 'auth_token';

async function isSecureStoreAvailable() {
  if (Platform.OS === 'web') {
    return false;
  }

  return SecureStore.isAvailableAsync();
}

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

function isUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const user = value as Record<string, unknown>;

  return typeof user.id === 'number'
    && Number.isFinite(user.id)
    && typeof user.name === 'string'
    && typeof user.email === 'string'
    && typeof user.role === 'string';
}

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const restorationStarted = useRef(false);

  const login = async (accessToken: string, userData: User) => {
    try {
      if (await isSecureStoreAvailable()) {
        await SecureStore.setItemAsync(AUTH_TOKEN_KEY, accessToken);
      }
    } catch (error) {
      console.error('Unable to save the authentication token securely.', error);
      throw error;
    }

    setToken(accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      if (await isSecureStoreAvailable()) {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      }
    } catch (error) {
      console.error('Unable to delete the stored authentication token.', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = useCallback(async () => {
    if (restorationStarted.current) {
      return;
    }

    restorationStarted.current = true;
    setAuthLoading(true);
    setToken(null);
    setUser(null);

    try {
      if (!(await isSecureStoreAvailable())) {
        return;
      }

      const savedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

      if (!savedToken) {
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (response.status === 401) {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        return;
      }

      if (!response.ok) {
        console.error(`Unable to restore the session: profile request failed with status ${response.status}.`);
        return;
      }

      let profile: unknown;

      try {
        profile = await response.json();
      } catch (error) {
        console.error('Unable to restore the session: the profile response was not valid JSON.', error);
        return;
      }

      if (!isUser(profile)) {
        console.error('Unable to restore the session: the profile response was invalid.');
        return;
      }

      setToken(savedToken);
      setUser(profile);
    } catch (error) {
      console.error('Unable to restore the saved session.', error);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  // SecureStore is native-only. Web sessions remain in memory and are not persisted.
  // TODO EXAM: Test secure session persistence on Android/iOS after restoration is implemented.
  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
