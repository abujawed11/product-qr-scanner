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


// import { Slot } from 'expo-router';

// export default function DashboardLayout() {
//   return <Slot />;
// }


// import { Ionicons } from "@expo/vector-icons";
// import type { DrawerNavigationProp } from "@react-navigation/drawer";
// import { DrawerActions } from "@react-navigation/native";
// import { Stack, useNavigation } from "expo-router";
// import { TouchableOpacity } from "react-native";

// export default function WarrantyStack() {
//   const nav = useNavigation();
//   const drawerNavigation = nav.getParent<DrawerNavigationProp<any>>();
//   // console.log('drawerNavigation', drawerNavigation);
//   return (
//     // <Stack screenOptions={{ headerStyle:{backgroundColor:"#222"}, headerTintColor:"#fff" }}>
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',
//         headerLeft: () => (
//           <TouchableOpacity
//             onPress={() => nav.dispatch(DrawerActions.openDrawer())}
//             // style={{ marginLeft: 3 }}
//           >
//             <Ionicons name="menu" size={24} color="black" />
//           </TouchableOpacity>
//         ),
//       }}
//     >
//       {/* <Stack.Screen name="index" options={{ title: "Warranty Home" }} />
//       <Stack.Screen name="warranty-status" options={{ title: "New Warranty Request" }} />
//       <Stack.Screen name="warranty-card" options={{ title: "Warranty Card" }} /> */}
//     </Stack>
//   );
// }


import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function WarrantyLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        // headerStyle: { backgroundColor: '#facc15' },
        // headerTintColor: 'black',
        headerStyle: { backgroundColor: '#facc15' },
        headerTintColor: 'black',
        // Hamburger menu to open the root drawer
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            // style={{ marginLeft: 16 }}
            style={{paddingRight: 10}}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >

      <Stack.Screen
        name="qr-scanner"
        options={{ title: 'QR Scanner' }}
      />
      {/* Define each warranty screen so you can set a custom title */}
      {/* <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="my-scans"
        options={{ title: 'My Scans' }}
      />
      <Stack.Screen
        name="warranty-status-page"
        options={{ title: 'Warranty Details' }}
      /> */}
    </Stack>
  );
}