// import { Stack } from "expo-router";



// export default function WarrantyLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       {/* Let tab navigator manage its own "header" via options */}
//       <Stack.Screen name="claim-form" options={{ title: "Request Warranty" }} />
//       <Stack.Screen name="claim-status" options={{ title: "Warranty Status" }} />
//       {/* ...other screens */}
//     </Stack>
//   );
// }


// warranty/_layout.tsx

// import { Stack, useRouter } from "expo-router";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// export default function WarrantyLayout({ route }) {
//   // Helper to determine active tab route name:
//   const activeRouteName = getFocusedRouteNameFromRoute(route) ?? "Request Warranty";
//   // Map route names to titles:
//   const headerTitles = {
//     "Request Warranty": "Request Warranty",
//     "Warranty Status": "Warranty Status"
//   };

//   return (
//     <Stack
//       screenOptions={{
//         // Dynamically set the header title based on selected tab
//         headerTitle: headerTitles[activeRouteName] ?? "Warranty",
//       }}
//     />
//   );
// }

// app/(main)/warranty/_layout.tsx
// import { Stack } from "expo-router";
// export default function Layout() {
//     return <Stack
//         screenOptions={{
//             headerShown: false
//         }}
//     />;
// }

// import { Slot } from "expo-router";

// export default function WarrantyLayout() {
//   return <Slot />;
// }

// app/(main)/warranty/_layout.tsx
// import { Stack } from "expo-router";

// export default function WarrantyLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: "#222" },
//         headerTintColor: "#fff",
//         title: "Warranty", // This is the default, can be overridden by child screens
//       }}
//     />
//   );
// }

// app/(main)/warranty/_layout.tsx
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




// import CustomDrawer from '@/components/CustomDrawer';
// import { useAuth } from '@/context/AuthContext';
// import { Redirect } from 'expo-router';
// import { Drawer } from 'expo-router/drawer';
// import { ActivityIndicator, View } from 'react-native';

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="orange" />
//       </View>
//     );
//   }

//   if (!user) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   return (
//     <Drawer
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       screenOptions={{
//         headerShown:false,
//         drawerPosition: 'left',
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',

//       }}
//     >
      
//       <Drawer.Screen
//         name="warranty-status"
//         options={{
//           title: 'Warranty Status',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/warranty-status-page"
//         options={{
//           title: 'Warranty Status',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/claim-form"
//         options={{
//           title: 'Warranty Request Form',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/claim-media-wizard"
//         options={{
//           title: 'Upload Files',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/index"
//         options={{
//           title: 'Warranty',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/warranty-card"
//         options={{
//           title: 'Warranty Card',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//     </Drawer>
//   );
// }

// import { Stack } from "expo-router";
// export default function Layout() {
//     return <Stack
//         screenOptions={{
//             headerShown: false
//         }}
//     />;
// }


// File: app/(main)/warranty/_layout.tsx

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
      {/* Define each warranty screen so you can set a custom title */}


      <Stack.Screen
        name="warranty-status-page"
        options={{ title: 'Warranty Details' }}
      />
      <Stack.Screen
        name="claim-form"
        options={{ title: 'Warranty Request Form' }}
      />
      <Stack.Screen
        name="claim-media-wizard"
        options={{ title: 'Upload Files' }}
      />
      <Stack.Screen
        name="warranty-card"
        options={{ title: 'Warranty Card' }}
      />
    </Stack>
  );
}
