import CustomDrawer from '@/components/CustomDrawer';
import BellWithNotification from '@/components/NotificationBell';
import { useAuth } from '@/context/AuthContext';
import * as NavigationBar from 'expo-navigation-bar';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }
  }, []);

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
      screenOptions={{
        drawerPosition: 'left',
        headerStyle: { backgroundColor: '#facc15' },
        headerTintColor: 'black',
      }}
    >
      {[
        { name: 'index', title: 'Home' },
        { name: 'my-orders', title: 'My Orders' },
        { name: 'all-orders', title: 'All Orders' },
        { name: 'order-details', title: 'Order Details' },
        { name: 'dashboard/qr-scanner', title: 'QR Scanner' },
        // { name: 'tasks/[taskId]/update', title: 'Update Task' },
        // { name: 'my-tasks', title: 'My Tasks' },
        { name: 'notifications', title: 'Notifications' },
      ].map(({ name, title }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            drawerItemStyle: { display: 'none' },
            headerRight: () => <BellWithNotification />,
            title,
            drawerLabel: title,
          }}
        />
      ))}
    </Drawer>
  );
}
