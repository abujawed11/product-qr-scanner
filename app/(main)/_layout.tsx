// import CustomDrawer from '@/components/CustomDrawer';
// import { useAuth } from '@/context/AuthContext';
// import { Redirect } from 'expo-router';
// import { Drawer } from 'expo-router/drawer';
// import { ActivityIndicator, View } from 'react-native';

// export default function DashboardLayout() {
//   const { user, loading } = useAuth();

//   // useEffect(() => {
//   //   if (Platform.OS === 'android') {
//   //     NavigationBar.setVisibilityAsync('hidden');
//   //     NavigationBar.setBehaviorAsync('overlay-swipe');
//   //   }
//   // }, []);

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
//         drawerPosition: 'left',
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',
//       }}
//     >
//       {[
//         { name: 'dashboard/index', title: 'Home' },
//         { name: 'dashboard/my-orders', title: 'My Orders' },
//         { name: 'all-orders', title: 'All Orders' },
//         { name: 'order-details', title: 'Order Details' },
//         { name: 'dashboard/qr-scanner', title: 'QR Scanner' },
//         { name: 'warranty/warranty-status', title: 'Warranty Status' },
//         { name: 'warranty/warranty-status-page', title: 'Warranty Status' },
//         { name: 'warranty/claim-form', title: 'Warranty Request Form' },
//         { name: 'warranty/claim-media-wizard', title: 'Upload Files' },
//         // { name: 'warranty/claim-media-wizard', title: 'Upload Files' },
//         { name: 'warranty/index', title: 'Warranty' },
//         { name: 'warranty/warranty-card', title: 'Warranty Card' },
//         { name: 'kit-details', title: 'Kit details' },
//         // { name: 'tasks/[taskId]/update', title: 'Update Task' },
//         // { name: 'my-tasks', title: 'My Tasks' },
//         { name: 'notifications', title: 'Notifications' },
//       ].map(({ name, title }) => (
//         <Drawer.Screen
//           key={name}
//           name={name}
//           options={{
//             drawerItemStyle: { display: 'none' },
//             // headerRight: () => <BellWithNotification />,
//             title,
//             drawerLabel: title,
//           }}
//         />
//       ))}
//     </Drawer>
//   );
// }


//============= working ======================
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
//       screenOptions={({ route }) => ({
//         headerShown: route.name !== 'dashboard' && route.name !== 'warranty' , // Show header unless warranty route
//         drawerPosition: 'left',
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',
//         // other options ...
//       })}
//     // screenOptions={{
//     //   // headerShown:false,
//     //   headerShown: route.name !== 'warranty',
//     //   drawerPosition: 'left',
//     //   headerStyle: { backgroundColor: '#facc15' },
//     //   headerTintColor: 'black',

//     // }}
//     >
//       <Drawer.Screen
//         name="dashboard/index"
//         options={{
//           title: 'Home',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="dashboard/my-orders"
//         options={{
//           title: 'My Orders',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="all-orders"
//         options={{
//           title: 'All Orders',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="order-details"
//         options={{
//           title: 'Order Details',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="dashboard/qr-scanner"
//         options={{
//           title: 'QR Scanner',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="warranty/warranty-status"
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
//       <Drawer.Screen
//         name="kit-details"
//         options={{
//           title: 'Kit Details',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//       <Drawer.Screen
//         name="notifications"
//         options={{
//           title: 'Notifications',
//           drawerItemStyle: { display: 'none' },
//         }}
//       />
//     </Drawer>
//   );
// }




// app/(main)/_layout.tsx
// app/(main)/_layout.tsx

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
//       screenOptions={({ route }) => ({
//         // Hide Drawer header on dashboard and warranty
//         headerShown: route.name !== 'dashboard' && route.name !== 'warranty',
//         headerStyle: { backgroundColor: '#facc15' },
//         headerTintColor: 'black',
//         drawerPosition: 'left',
//       })}
//     >
//       <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
//       <Drawer.Screen name="warranty" options={{ title: 'Warranty' }} />

//       {/* The rest of your direct files as Drawer Screens */}
//       <Drawer.Screen name="about" options={{ title: 'About' }} />
//       <Drawer.Screen name="all-orders" options={{ title: 'All Orders' }} />
//       <Drawer.Screen name="kit-details" options={{ title: 'Kit Details' }} />
//       <Drawer.Screen name="notifications" options={{ title: 'Notifications' }} />
//       <Drawer.Screen name="order-details" options={{ title: 'Order Details' }} />
//       <Drawer.Screen name="product-info" options={{ title: 'Product Info' }} />
//       <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
//       <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
//       <Drawer.Screen name="support" options={{ title: 'Support' }} />
//       <Drawer.Screen name="test-upload" options={{ title: 'Test Upload' }} />
//     </Drawer>
//   );
// }


// app/(main)/_layout.tsx

// app/(main)/_layout.tsx

import CustomDrawer from '@/components/CustomDrawer';
import { CustomMainHeader } from '@/components/CustomHeader';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ route }) => ({
        headerShown: route.name !== 'dashboard' && route.name !== 'warranty',
        header:
          route.name !== 'dashboard' && route.name !== 'warranty'
            ? (props) => <CustomMainHeader {...props} />
            : undefined,
        drawerPosition: 'left',
      })}
    >
      <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="warranty" options={{ title: 'Warranty' }} />
      <Drawer.Screen name="about" options={{ title: 'About' }} />
      <Drawer.Screen name="all-orders" options={{ title: 'All Orders' }} />
      <Drawer.Screen name="kit-details" options={{ title: 'Kit Details' }} />
      <Drawer.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Drawer.Screen name="order-details" options={{ title: 'Order Details' }} />
      <Drawer.Screen name="product-info" options={{ title: 'Product Info' }} />
      <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
      <Drawer.Screen name="support" options={{ title: 'Support' }} />
      <Drawer.Screen name="test-upload" options={{ title: 'Test Upload' }} />
    </Drawer>
  );
}

