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

