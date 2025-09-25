import { User } from '@/types/user.types';
import api from '@/utils/api';
import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let refreshTimer: ReturnType<typeof setTimeout>;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await SecureStore.getItemAsync('access');
        const refresh = await SecureStore.getItemAsync('refresh');
        const userJson = await SecureStore.getItemAsync('user');
        if (token && refresh && userJson) {
          setAccessToken(token);
          setUser(JSON.parse(userJson));
          scheduleTokenRefresh(token);
        }
      } catch (err) {
        console.error('Error loading auth data', err);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const scheduleTokenRefresh = (token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Date.now();
      const expiresIn = exp * 1000 - now - 10000; // 10s before expiry
      if (expiresIn > 0) {
        refreshTimer = setTimeout(() => {
          refreshToken();
        }, expiresIn);
      } else {
        refreshToken();
      }
    } catch (err) {
      console.error('Error decoding token for scheduling', err);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/token/', { username, password });
      const { access, refresh, user } = response.data;

      await SecureStore.setItemAsync('access', access);
      await SecureStore.setItemAsync('refresh', refresh);
      await SecureStore.setItemAsync('user', JSON.stringify(user));

      setAccessToken(access);
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      scheduleTokenRefresh(access);

      queryClient.invalidateQueries({ queryKey: ["warrantyDashboardCounts"] });
      queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
      queryClient.invalidateQueries({ queryKey: ["myWarrantyClaims"] });
      queryClient.invalidateQueries({ queryKey: ["myWarrantyCards"] });
      queryClient.invalidateQueries({ queryKey: ["warrantyStatusById"] });

    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = await SecureStore.getItemAsync('refresh');
      if (!refresh) throw new Error('No refresh token');

      const res = await api.post('/token/refresh/', { refresh });
      const newAccess = res.data.access;
      const newRefresh = res.data.refresh ?? refresh;

      await SecureStore.setItemAsync('access', newAccess);
      await SecureStore.setItemAsync('refresh', newRefresh);

      setAccessToken(newAccess);
      api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
      scheduleTokenRefresh(newAccess);
    } catch (err) {
      console.error('Refresh token failed, logging out', err);
      logout();
    }
  };

  const logout = async () => {
    try {
      const refresh = await SecureStore.getItemAsync('refresh');
      if (refresh) {
        await api.post('/token/logout/', { refresh });
      }
    } catch (err) {
      console.warn('Logout failed or already invalid');
    } finally {
      clearTimeout(refreshTimer);
      await SecureStore.deleteItemAsync('access');
      await SecureStore.deleteItemAsync('refresh');
      await SecureStore.deleteItemAsync('user');
      setUser(null);
      setAccessToken(null);
      delete api.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    setGlobalLogout(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

let externalLogout: (() => void) | null = null;

export const setGlobalLogout = (fn: () => void) => {
  externalLogout = fn;
};

export const callGlobalLogout = () => {
  if (externalLogout) externalLogout();
};