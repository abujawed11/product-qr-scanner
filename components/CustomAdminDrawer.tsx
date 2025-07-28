import { useAuth } from '@/context/AuthContext';
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const CustomAdminDrawer = (props: any) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <DrawerContentScrollView {...props} className="bg-black">
      <View className="items-center py-6 border-b border-yellow-400">
        <View className="w-20 h-20 rounded-full bg-yellow-400 items-center justify-center mb-3">
          <AntDesign name="user" size={40} color="black" />
        </View>
        <Text className="text-black font-bold text-lg">{user?.username?.toUpperCase()}</Text>
        <Text className="text-black-400 font-bold text-sm mt-1">
          {user?.email}
        </Text>
      </View>

      <View className="mt-6">
        <DrawerItem
          label="Admin Home"
          onPress={() => router.push('/(adminDashboard)')}
          icon={({ size }) => <Entypo name="home" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Manage Clients"
          onPress={() => router.push('/(adminDashboard)/manage-clients')}
          icon={({ size }) => <MaterialIcons name="people-outline" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Manage Orders"
          onPress={() => router.push('/(adminDashboard)/manage-orders')}
          icon={({ size }) => <FontAwesome5 name="clipboard-list" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Manage Kits"
          onPress={() => router.push('/(adminDashboard)/manage-kits')}
          icon={({ size }) => <MaterialIcons name="widgets" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Review Claims"
          onPress={() => router.push('/(adminDashboard)/review-req-dashboard')}
          icon={({ size }) => <MaterialIcons name="assignment" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>

      <View className="mt-auto border-t border-yellow-400">
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          icon={({ size }) => (
            <MaterialCommunityIcons name="power-settings" size={size} color="red" />
          )}
          labelStyle={{ color: 'red', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomAdminDrawer;
