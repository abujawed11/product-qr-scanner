// app/(adminDashboard)/_layout.tsx

// import CustomDrawer from '@/components/CustomDrawer';
import CustomAdminDrawer from '@/components/CustomAdminDrawer';
import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { ActivityIndicator, View } from 'react-native';


export default function AdminDashboardLayout() {
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

  if (user.account_type !== 'admin') {
    return <Redirect href="/dashboard" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <CustomAdminDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerStyle: { backgroundColor: '#facc15' }, // Yellow
        headerTintColor: 'black',
      }}
    >
      {[
        { name: 'index', title: 'Admin Home' },
        { name: 'manage-clients', title: 'Manage Clients' },
        { name: 'manage-orders', title: 'Manage Orders' },
        { name: 'manage-kits', title: 'Manage Kits' },
        { name: 'review-req-dashboard', title: 'Warranty Dashboard' },
        { name: 'review-req-warranty-status', title: 'Requests' },
        { name: 'review-claim-fulldetails', title: 'Complete Details' },
        { name: 'review-claim-update', title: 'Update Status' },
        { name: 'admin-order-details', title: 'Order Details' },
        // { name: 'review-claims', title: 'Review Claims' },
      ].map(({ name, title }) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            title,
            drawerLabel: title,
            drawerItemStyle: { paddingLeft: 10 },
            // headerRight: () => <BellWithNotification />,
          }}
        />
      ))}
    </Drawer>
  );
}
