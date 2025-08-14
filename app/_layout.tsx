import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

import { AuthProvider } from '@/context/AuthContext';
import { RefreshProvider } from '@/context/RefreshContext';
import { setupNetworkListener } from '@/utils/networkListener';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as NavigationBar from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

// Foreground Notification Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Network recovery & retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for network/server errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      
      // Network recovery settings
      refetchOnWindowFocus: true, // Refetch when app regains focus
      refetchOnReconnect: true, // 🔥 KEY: Refetch when network reconnects
      
      // Stale time settings
      staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
      gcTime: 10 * 60 * 1000, // 10 minutes - cache retention (renamed from cacheTime in v5)
      
      // Network mode
      networkMode: 'online', // Only run queries when online
    },
    mutations: {
      retry: 1, // Retry mutations once on network failure
      networkMode: 'online',
    },
  },
});

export default function RootLayout() {
  useEffect(() => {
    const setupApp = async () => {
      // Setup notifications
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        // Configure Android navigation bar: dim or hide
        try {
          // Make nav bar darker and buttons light for a dimmed look
          await NavigationBar.setBackgroundColorAsync('#0a0a0a');
          await NavigationBar.setButtonStyleAsync('light');

          // If you want it hidden by default, uncomment the next two lines
          await NavigationBar.setBehaviorAsync('overlay-swipe');
          await NavigationBar.setVisibilityAsync('hidden');
        } catch (e) {
          // Navigation bar configuration failed
        }
      }
    };

    setupApp();

    // 🔥 Setup network listener for auto-refetch on reconnect
    const unsubscribeNetwork = setupNetworkListener(queryClient);

    return () => {
      unsubscribeNetwork();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RefreshProvider>
            <Slot />
          </RefreshProvider>
        </AuthProvider>
      </QueryClientProvider>
   </GestureHandlerRootView>
  );
}

