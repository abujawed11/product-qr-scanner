// import axios from 'axios';
// import * as SecureStore from 'expo-secure-store';
// import { BASE_URL } from './constants';

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// // Interceptor for auto-refresh
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refresh = await SecureStore.getItemAsync('refresh');
//         if (!refresh) throw new Error('No refresh token');

//         const res = await axios.post(`${BASE_URL}/token/refresh/`, { refresh });

//         const newAccess = res.data.access;
//         const newRefresh = res.data.refresh ?? refresh;

//         await SecureStore.setItemAsync('access', newAccess);
//         await SecureStore.setItemAsync('refresh', newRefresh);

//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;

//         return api(originalRequest);
//       } catch (err) {
//         // Logout will be handled in context if needed
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import { callGlobalLogout } from '@/context/AuthContext';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { BASE_URL } from './constants';
// import {logout} from '@/context/AuthContext'; // Adjust the import path as needed

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ Request Interceptor (adds token to every request)
api.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor (refreshes token on 401)
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

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

    return Promise.reject(error);
  }
);

export default api;

