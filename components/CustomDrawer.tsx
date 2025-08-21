import { useAuth } from '@/context/AuthContext';
import { THEME } from '@/utils/theme';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const CustomDrawer = (props: any) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  // Helper function to check if current route is active
  const isActive = (route: string) => {
    // Handle special cases for route matching
    if (route === '/dashboard' && (pathname === '/dashboard' || pathname === '/dashboard/home' || pathname === '/(main)/dashboard/home')) {
      return true;
    }
    if (route === '/warranty' && pathname.includes('/warranty')) {
      return true;
    }
    if (route === '/all-orders' && pathname.includes('/all-orders')) {
      return true;
    }
    if (route === '/(main)/product-info' && pathname.includes('/product-info')) {
      return true;
    }
    if (route === '/(main)/installation-manual' && pathname.includes('/installation-manual')) {
      return true;
    }
    if (route === '/about' && pathname.includes('/about')) {
      return true;
    }
    if (route === '/settings' && pathname.includes('/settings')) {
      return true;
    }
    return false;
  };

  // Get styles for active/inactive items
  const getItemStyle = (route: string) => {
    const active = isActive(route);
    return {
      backgroundColor: active ? THEME.colors.primary : 'transparent',
      borderRadius: THEME.borderRadius.lg,
      marginHorizontal: THEME.spacing[3],
      marginVertical: THEME.spacing[1],
    };
  };

  const getLabelStyle = (route: string) => {
    const active = isActive(route);
    return {
      color: active ? THEME.colors.black : THEME.colors.white,
      fontWeight: THEME.typography.fontWeights.bold,
      fontSize: THEME.typography.fontSizes.base,
    };
  };

  const getIconColor = (route: string) => {
    return isActive(route) ? THEME.colors.black : THEME.colors.primary;
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.colors.gray[900] }}>
      <DrawerContentScrollView {...props} style={{ backgroundColor: THEME.colors.gray[900] }}>
        {/* User Profile Header */}
        <View 
          style={{
            alignItems: 'center',
            paddingVertical: THEME.spacing[6],
            borderBottomWidth: 1,
            borderBottomColor: THEME.colors.gray[700],
            marginBottom: THEME.spacing[4],
          }}
        >
          <View 
            style={{
              width: 80,
              height: 80,
              borderRadius: THEME.borderRadius.full,
              backgroundColor: THEME.colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: THEME.spacing[3],
              ...THEME.shadows.md,
            }}
          >
            <AntDesign name="user" size={40} color={THEME.colors.black} />
          </View>
          <Text 
            style={{
              color: THEME.colors.white,
              fontWeight: THEME.typography.fontWeights.bold,
              fontSize: THEME.typography.fontSizes.lg,
            }}
          >
            {user?.username?.toUpperCase()}
          </Text>
          <Text 
            style={{
              color: THEME.colors.gray[400],
              fontWeight: THEME.typography.fontWeights.medium,
              fontSize: THEME.typography.fontSizes.sm,
              marginTop: THEME.spacing[1],
            }}
          >
            {user?.email}
          </Text>
        </View>

        {/* Navigation Items */}
        <View style={{ paddingHorizontal: THEME.spacing[2] }}>
          <DrawerItem
            label="Home"
            onPress={() => router.push('/dashboard')}
            icon={({ size }) => <Entypo name="home" size={size} color={getIconColor('/dashboard')} />}
            labelStyle={getLabelStyle('/dashboard')}
            style={getItemStyle('/dashboard')}
          />

          <DrawerItem
            label="Orders"
            onPress={() => router.push('/all-orders')}
            icon={({ size }) => <FontAwesome5 name="box-open" size={24} color={getIconColor('/all-orders')} />}
            labelStyle={getLabelStyle('/all-orders')}
            style={getItemStyle('/all-orders')}
          />

          <DrawerItem
            label="Warranty"
            onPress={() => router.push('/warranty')}
            icon={({ size }) => <FontAwesome name="id-card-o" size={24} color={getIconColor('/warranty')} />}
            labelStyle={getLabelStyle('/warranty')}
            style={getItemStyle('/warranty')}
          />

          <DrawerItem
            label="About Product"
            onPress={() => router.push('/(main)/product-info')}
            icon={({ size }) => <AntDesign name="shoppingcart" size={24} color={getIconColor('/(main)/product-info')} />}
            labelStyle={getLabelStyle('/(main)/product-info')}
            style={getItemStyle('/(main)/product-info')}
          />

          <DrawerItem
            label="Installation Manual"
            onPress={() => router.push('/(main)/installation-manual')}
            icon={({ size }) => <MaterialIcons name="description" size={24} color={getIconColor('/(main)/installation-manual')} />}
            labelStyle={getLabelStyle('/(main)/installation-manual')}
            style={getItemStyle('/(main)/installation-manual')}
          />

          <DrawerItem
            label="About"
            onPress={() => router.push('/about')}
            icon={({ size }) => <AntDesign name="infocirlce" size={size} color={getIconColor('/about')} />}
            labelStyle={getLabelStyle('/about')}
            style={getItemStyle('/about')}
          />

          <DrawerItem
            label="Settings"
            onPress={() => router.push('/settings')}
            icon={({ size }) => <AntDesign name="setting" size={size} color={getIconColor('/settings')} />}
            labelStyle={getLabelStyle('/settings')}
            style={getItemStyle('/settings')}
          />
        </View>
      </DrawerContentScrollView>

      {/* Logout Section - Fixed at bottom */}
      <View 
        style={{
          borderTopWidth: 1,
          borderTopColor: THEME.colors.gray[700],
          paddingHorizontal: THEME.spacing[2],
          paddingVertical: THEME.spacing[2],
        }}
      >
        <DrawerItem 
          label="Logout" 
          onPress={handleLogout} 
          icon={({ size }) => <MaterialCommunityIcons name="power-settings" size={size} color={THEME.colors.error} />} 
          labelStyle={{ 
            color: THEME.colors.error, 
            fontWeight: THEME.typography.fontWeights.bold,
            fontSize: THEME.typography.fontSizes.base,
          }} 
          style={{ 
            backgroundColor: 'transparent',
            borderRadius: THEME.borderRadius.lg,
            marginHorizontal: THEME.spacing[3],
          }} 
        />
      </View>
    </View>
  );
};

export default CustomDrawer;
