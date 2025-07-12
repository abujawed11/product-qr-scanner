import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router'; // ✅ use expo-router's hook

// import AssignTaskScreen from './assigned-tasks';
// import Dashboard from './dashboard';
// import MyTaskScreen from './my-tasks';

// import HomeScreen from './home';
// import MyOrdersScreen from './my-orders';

import WarrantyForm from './claim-form';


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
        name="Claim Warranty"
        component={WarrantyForm}
        listeners={{
          focus: () => navigation.setOptions({ title: 'Claim Warranty' }),
        }}
      />
      <Tab.Screen
        name="Warranty Status"
        component={WarrantyForm}
        listeners={{
          focus: () => navigation.setOptions({ title: 'Warranty Status' }),
        }}
      />
      {/* <Tab.Screen
        name="Assign Tasks"
        component={AssignTaskScreen}
        listeners={{
          focus: () => navigation.setOptions({ title: 'Assigned Tasks' }),
        }}
      /> */}
    </Tab.Navigator>
  );
}