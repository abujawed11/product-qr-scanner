// import { Slot, useFocusEffect, usePathname } from 'expo-router';
// import { useCallback } from 'react';
// import { Alert, BackHandler } from 'react-native';

// export default function DashboardLayout() {
//   const pathname = usePathname();

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         // Show exit alert only if inside dashboard tabs
//         if (
//           pathname === '/(main)/dashboard/home' ||
//           pathname === '/(main)/dashboard/my-orders'
//         ) {
//           Alert.alert(
//             'Exit App',
//             'Do you want to exit the app?',
//             [
//               { text: 'Cancel', style: 'cancel' },
//               { text: 'Exit', onPress: () => BackHandler.exitApp() },
//             ],
//             { cancelable: true }
//           );
//           return true; // prevent default back
//         }

//         return false; // allow normal back behavior elsewhere
//       };

//       const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => backHandler.remove();
//     }, [pathname])
//   );

//   return <Slot />;
// }


import { Slot } from 'expo-router';

export default function DashboardLayout() {
  return <Slot />;
}
