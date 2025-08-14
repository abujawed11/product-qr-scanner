import { callGlobalLogout } from '@/context/AuthContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { BASE_URL } from './constants';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes default timeout for all requests
});

// ✅ Request Interceptor (adds token to every request)
api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }


  // This shows what URL the API call will attempt to reach
  const fullUrl =
    (config.baseURL ?? api.defaults.baseURL ?? '') +
    (config.url || '');

  console.log('[API REQUEST]', fullUrl);
  return config;
});

// ✅ Response Interceptor (refreshes token on 401, handles network errors)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = await SecureStore.getItemAsync('refresh');
        if (!refresh) throw new Error('No refresh token');

        const res = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });

        const newAccess = res.data.access;
        const newRefresh = res.data.refresh ?? refresh;

        await SecureStore.setItemAsync('access', newAccess);
        await SecureStore.setItemAsync('refresh', newRefresh);

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        // Optional: trigger logout if refresh fails
        Alert.alert('Session Expired', 'Please login again.', [
          { text: 'OK', onPress: () => callGlobalLogout() },
        ]);
      }
    }

    // 🔥 Enhanced network error handling
    if (!error.response) {
      // Network error (no response received)
      console.log('🔥 Network Error:', error.message);
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        console.log('⏰ Request timeout');
        // Don't show alert for timeouts - let React Query handle retries
      } else if (error.message === 'Network Error' || error.code === 'NETWORK_ERROR') {
        console.log('📵 Network connection failed');
        // Don't show alert - let React Query handle retries
      }
    } else if (error.response.status >= 500) {
      // Server error
      console.log('🔥 Server Error:', error.response.status);
      // Don't show alert for server errors - let React Query handle retries
    }

    return Promise.reject(error);
  }
);

export default api;

