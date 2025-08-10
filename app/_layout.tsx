// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }




// // app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// // import { NotificationProvider } from '@/context/NotificationContext';
// import * as Notifications from 'expo-notifications';
// import { Slot } from 'expo-router';
// import { useEffect } from 'react';
// import { Platform } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// // 1. Foreground Notification Handler — show alert & sound
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export default function RootLayout() {
//   useEffect(() => {
//     const setupNotifications = async () => {
//       const { status } = await Notifications.getPermissionsAsync();
//       if (status !== 'granted') {
//         await Notifications.requestPermissionsAsync();
//       }

//       if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//           name: 'default',
//           importance: Notifications.AndroidImportance.MAX, // 🔊 popup + sound
//           sound: 'default',
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: '#FF231F7C',
//         });
//       }
//     };

//     setupNotifications();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         {/* <NotificationProvider> */}
//           <Slot />
//         {/* </NotificationProvider> */}
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }


// import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// configureReanimatedLogger({
//   level: ReanimatedLogLevel.warn,
//   strict: false,
// });

// // app/_layout.tsx
// import { AuthProvider } from '@/context/AuthContext';
// import { RefreshProvider } from '@/context/RefreshContext';
// import * as Notifications from 'expo-notifications';
// import { Slot } from 'expo-router';
// import { useEffect } from 'react';
// import { Platform } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import '../global.css';

// // ✅ ADD THIS AT THE TOP to suppress Reanimated value render warnings




// // Foreground Notification Handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export default function RootLayout() {
//   useEffect(() => {
//     const setupNotifications = async () => {
//       const { status } = await Notifications.getPermissionsAsync();
//       if (status !== 'granted') {
//         await Notifications.requestPermissionsAsync();
//       }

//       if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//           name: 'default',
//           importance: Notifications.AndroidImportance.MAX,
//           sound: 'default',
//           vibrationPattern: [0, 250, 250, 250],
//           lightColor: '#FF231F7C',
//         });
//       }
//     };

//     setupNotifications();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <AuthProvider>
//         <RefreshProvider>
//           <Slot />
//         </RefreshProvider>
//       </AuthProvider>
//     </GestureHandlerRootView>
//   );
// }


import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// --- React Query Imports ---
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// app/_layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import { RefreshProvider } from '@/context/RefreshContext';
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

// --- Create the Query Client ---
const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    const setupNotifications = async () => {
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
          // noop
        }
      }
    };

    setupNotifications();
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

