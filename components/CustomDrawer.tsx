import { useAuth } from '@/context/AuthContext';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, useColorScheme, View } from 'react-native';

const CustomDrawer = (props: any) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();

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
          label="Home"
          onPress={() => router.push('/dashboard')}
          icon={({ size }) => <Entypo name="home" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Orders"
          onPress={() => router.push('/all-orders')}
          icon={({ size }) => <FontAwesome5 name="box-open" size={24} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Warranty Status"
          onPress={() => router.push('/warranty-status')}
          icon={({ size }) => <FontAwesome name="id-card-o" size={24} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Warranty Cards"
          onPress={() => router.push('/(main)/warranty/my-cards')}
          icon={({ size }) => <FontAwesome name="id-card-o" size={24} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="About Product"
          onPress={() => router.push('/(main)/product-info')}
          icon={({ size }) => <AntDesign name="shoppingcart" size={24} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="About"
          onPress={() => router.push('/about')}
          icon={({ size }) => <AntDesign name="infocirlce" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

        <DrawerItem
          label="Settings"
          onPress={() => router.push('/settings')}
          icon={({ size }) => <AntDesign name="setting" size={size} color="#facc15" />}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }}
          style={{ backgroundColor: 'transparent' }}
        />

      </View>

      <View className="mt-auto border-t border-yellow-400">
        <DrawerItem label="Logout" onPress={handleLogout} icon={({ size }) => <MaterialCommunityIcons name="power-settings" size={size} color="red" />} labelStyle={{ color: 'red', fontWeight: 'bold' }} style={{ backgroundColor: 'transparent' }} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
