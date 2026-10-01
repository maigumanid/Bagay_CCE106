import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

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

    // TODO EXAM: Redirect to /sign-in after logout.
  };

  const restoreSession = useCallback(async () => {
    setAuthLoading(true);

    try {
      // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
      // TODO EXAM: Validate the token via GET /profile with a Bearer token.
      // TODO EXAM: Update token and user state for a valid session.
      // TODO EXAM: Handle 401 Unauthorized / expired sessions and clear invalid credentials.
      // TODO EXAM: Handle restoration errors after the API contract is confirmed.
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
