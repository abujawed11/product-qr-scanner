import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router';

import HomeScreen from './home';
import MyScansScreen from './my-scans';


const Tab = createMaterialTopTabNavigator();

export default function DashboardTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: 'orange' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={{
          focus: () => navigation.setOptions({ title: 'Home' }),
        }}
      />
      <Tab.Screen
        name="My Scans"
        component={MyScansScreen}
        listeners={{
          focus: () => navigation.setOptions({ title: 'My Scans' }),
        }}
      />
    </Tab.Navigator>
  );
}
