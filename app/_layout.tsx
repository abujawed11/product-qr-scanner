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


import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

// app/_layout.tsx
import { AuthProvider } from '@/context/AuthContext';
import * as Notifications from 'expo-notifications';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

// ✅ ADD THIS AT THE TOP to suppress Reanimated value render warnings




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
      }
    };

    setupNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
