import CustomDrawer from '@/components/CustomDrawer';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, View } from 'react-native';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     NavigationBar.setVisibilityAsync('hidden');
  //     NavigationBar.setBehaviorAsync('overlay-swipe');
  //   }
  // }, []);

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
        { name: 'dashboard/index', title: 'Home' },
        { name: 'dashboard/my-orders', title: 'My Orders' },
        { name: 'all-orders', title: 'All Orders' },
        { name: 'order-details', title: 'Order Details' },
        { name: 'dashboard/qr-scanner', title: 'QR Scanner' },
        { name: 'warranty/warranty-status', title: 'Warranty Status' },
        { name: 'warranty/warranty-status-page', title: 'Warranty Status' },
        { name: 'warranty/claim-form', title: 'Warranty Request Form' },
        { name: 'warranty/claim-media-wizard', title: 'Upload Files' },
        // { name: 'warranty/claim-media-wizard', title: 'Upload Files' },
        { name: 'warranty/index', title: 'Warranty' },
        { name: 'warranty/warranty-card', title: 'Warranty Card' },
        { name: 'kit-details', title: 'Kit details' },
        // { name: 'tasks/[taskId]/update', title: 'Update Task' },
        // { name: 'my-tasks', title: 'My Tasks' },
        { name: 'notifications', title: 'Notifications' },
      ].map(({ name, title }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            drawerItemStyle: { display: 'none' },
            // headerRight: () => <BellWithNotification />,
            title,
            drawerLabel: title,
          }}
        />
      ))}
    </Drawer>
  );
}
