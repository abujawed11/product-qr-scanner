// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Stack, useLocalSearchParams } from 'expo-router';
// import React from "react";
// import WarrantyForm from './claim-form';
// import ClaimStatusScreen from './claim-status';

// const Tab = createMaterialTopTabNavigator();

// export default function WarrantyTabs() {
//   const params = useLocalSearchParams();
//   // Always resolve navigation keys to plain strings:
//   const navKeyRaw = params.navKey;
//   const navKey = Array.isArray(navKeyRaw) ? navKeyRaw[0] : navKeyRaw ?? "default";
//   const initialRoute = params.initial?.toString() === "Warranty Status"
//     ? "Warranty Status"
//     : "Request Warranty";
  
//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Tab.Navigator
//         key={navKey}
//         initialRouteName={initialRoute}
//         screenOptions={{ /* ...your tab styles... */ }}
//       >
//         <Tab.Screen
//           name="Request Warranty"
//           component={WarrantyForm}
//           initialParams={params}
//         />
//         <Tab.Screen
//           name="Warranty Status"
//           component={ClaimStatusScreen}
//           initialParams={params}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }



// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect } from '@react-navigation/native';
// import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
// import React from "react";
// import WarrantyForm from './claim-form';
// import ClaimStatusScreen from './claim-status';

// const Tab = createMaterialTopTabNavigator();

// export default function WarrantyTabs() {
//   const params = useLocalSearchParams();
//   const navigation = useNavigation();

//   // Set initial tab as before
//   const initialRoute = params.initial?.toString() === "Warranty Status"
//     ? "Warranty Status"
//     : "Request Warranty";

//   // **THIS is the workaround:** Force jump to tab according to param when (re-)focused and param is present.
//   useFocusEffect(
//     React.useCallback(() => {
//       // Only if coming here with 'initial' param
//       if (params.initial) {
//         // jump to the tab (do not use router, use the tab navigator)
//         navigation.navigate(params.initial as never);
//       }
//     }, [params.initial])
//   );

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Tab.Navigator
//         initialRouteName={initialRoute}
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarIndicatorStyle: { backgroundColor: 'orange' },
//           tabBarActiveTintColor: 'orange',
//           tabBarInactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen
//           name="Request Warranty"
//           component={WarrantyForm}
//           initialParams={params}
//         />
//         <Tab.Screen
//           name="Warranty Status"
//           component={ClaimStatusScreen}
//           initialParams={params}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }


// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Stack, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
// import React from 'react';
// import WarrantyForm from './claim-form';
// import ClaimStatusScreen from './claim-status';

// const Tab = createMaterialTopTabNavigator();

// const headerTitles: Record<string, string> = {
//   "Request Warranty": "Request Warranty",
//   "Warranty Status": "Warranty Status",
// };

// export default function WarrantyTabs() {
//   const params = useLocalSearchParams();
//   const initialRoute = (
//     params.initial?.toString() === "Warranty Status"
//       ? "Warranty Status"
//       : "Request Warranty"
//   );
//   const navigation = useNavigation();
//   // const navKey = params.navKey || "default";
//   // const { navKey } = params;
//   // const resolvedNavKey = Array.isArray(navKey) ? navKey[0] : navKey ?? "default";

//   // Use a key based on the tab you want selected.
//   // Changing this key will remount the navigator and always open the right tab.
//   const tabNavigatorKey = "warranty-tabs-" + initialRoute;

//     // **THIS is the workaround:** Force jump to tab according to param when (re-)focused and param is present.
//   useFocusEffect(
//     React.useCallback(() => {
//       // Only if coming here with 'initial' param
//       if (params.initial) {
//         // jump to the tab (do not use router, use the tab navigator)
//         navigation.navigate(params.initial as never);
//       }
//     }, [params.initial])
//   );

//   // (Header title stuff here if needed...)

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Tab.Navigator
//         key={tabNavigatorKey} // <---- Here! use the key!
//         initialRouteName={initialRoute}
        
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarIndicatorStyle: { backgroundColor: 'orange' },
//           tabBarActiveTintColor: 'orange',
//           tabBarInactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen
//           name="Request Warranty"
//           component={WarrantyForm}
//           initialParams={params}
//         />
//         <Tab.Screen
//           name="Warranty Status"
//           component={ClaimStatusScreen}
//           initialParams={params}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }




// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useLocalSearchParams } from 'expo-router';
// import WarrantyForm from './claim-form';

// // If you have other warranty-related pages you want to use, import them here
// // import ClaimStatus from './claim-status';

// // 1. Declare TopTab navigator
// const Tab = createMaterialTopTabNavigator();

// export default function WarrantyTabs() {
//   // 2. Get all relevant params from the router (URL or navigation)
//   // This allows autofill on navigating from kit-details
//   const params = useLocalSearchParams();

//   // 3. Determine which tab to show initially
//   // If not provided, defaults to "Request Warranty"
//   const initialRoute = (
//     params.initial?.toString() === "Warranty Status"
//       ? "Warranty Status"
//       : "Request Warranty"
//   );

//   return (
//     <Tab.Navigator
//       initialRouteName={initialRoute}
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         tabBarIndicatorStyle: { backgroundColor: 'orange' },
//         tabBarActiveTintColor: 'orange',
//         tabBarInactiveTintColor: 'gray',
//       }}
//     >
//       {/* Pass params as initialParams to preserve autofill functionality */}
//       <Tab.Screen
//         name="Request Warranty"
//         component={WarrantyForm}
//         initialParams={params}
//         // The following is not strictly required, but ensures correct title on stack header if used
//         options={{ title: 'Request Warranty' }}
//         //  listeners={{
//         //   focus: () => navigation.setOptions({ title: 'Request Warranty' }),
//         // }}
//       />
//       <Tab.Screen
//         name="Warranty Status"
//         component={WarrantyForm} // Replace with your WarrantyStatus component if/when available
//         initialParams={params}
//         options={{ title: 'Warranty Status' }}
//       />
//     </Tab.Navigator>
//   );
// }


// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
// import { useEffect } from "react";
// import WarrantyForm from './claim-form';
// import ClaimStatusScreen from './claim-status';

// const Tab = createMaterialTopTabNavigator();

// const headerTitles: Record<string, string> = {
//   "Request Warranty": "Request Warranty",
//   "Warranty Status": "Warranty Status",
// };

// export default function WarrantyTabs() {
//   const params = useLocalSearchParams();
//   const initialRoute = (
//     params.initial?.toString() === "Warranty Status"
//       ? "Warranty Status"
//       : "Request Warranty"
//   );

//   const navigation = useNavigation();

//   // Set header title on mount and when tab changes
//   useEffect(() => {
//     const parent = navigation.getParent();
//     if (!parent) return;
//     // Listen for tab changes
//     const unsubscribe = parent.addListener('state', (e: any) => {
//       // Find active tab route name from state
//       const tabs = e.data?.state?.routes ?? [];
//       const index = e.data?.state?.index ?? 0;
//       const name = tabs[index]?.name ?? "Request Warranty";
//       parent.setOptions({
//         title: headerTitles[name] ?? "Warranty",
//       });
//     });
//     // Set initial title
//     parent.setOptions({
//       title: headerTitles[initialRoute] ?? "Warranty",
//     });
//     return unsubscribe;
//   }, [navigation, initialRoute]);

//   return (
//     <>
//       {/* Hide the default title */}
//       <Stack.Screen options={{ title: "" }} />
//       <Tab.Navigator
//         initialRouteName={initialRoute}
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//           tabBarIndicatorStyle: { backgroundColor: 'orange' },
//           tabBarActiveTintColor: 'orange',
//           tabBarInactiveTintColor: 'gray',
//         }}
//       >
//         <Tab.Screen
//           name="Request Warranty"
//           component={WarrantyForm}
//           initialParams={params}
//         />
//         <Tab.Screen
//           name="Warranty Status"
//           component={ClaimStatusScreen}
//           initialParams={params}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }




// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useLocalSearchParams, useNavigation } from 'expo-router'; // use expo-router's hook

// // import AssignTaskScreen from './assigned-tasks';
// // import Dashboard from './dashboard';
// // import MyTaskScreen from './my-tasks';

// // import HomeScreen from './home';
// // import MyOrdersScreen from './my-orders';

// import WarrantyForm from './claim-form';


// const Tab = createMaterialTopTabNavigator();

// export default function DashboardTabs() {
//   const params = useLocalSearchParams();
//   const initialRoute = params.initial || "Request Warranty";
//   const navigation = useNavigation();

//   return (
//     <Tab.Navigator 
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         tabBarIndicatorStyle: { backgroundColor: 'orange' },
//         tabBarActiveTintColor: 'orange',
//         tabBarInactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen
//         name="Request Warranty"
//         component={WarrantyForm}
//         listeners={{
//           focus: () => navigation.setOptions({ title: 'Request Warranty' }),
//         }}
//       />
//       <Tab.Screen
//         name="Warranty Status"
//         component={WarrantyForm}
//         listeners={{
//           focus: () => navigation.setOptions({ title: 'Warranty Status' }),
//         }}
//       />
//       {/* <Tab.Screen
//         name="Assign Tasks"
//         component={AssignTaskScreen}
//         listeners={{
//           focus: () => navigation.setOptions({ title: 'Assigned Tasks' }),
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// }


// import WarrantyForm from './claim-form';
// //import WarrantyStatus from './claim-status'; // Or whatever your status component is called

// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

// export default function WarrantyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         tabBarIndicatorStyle: { backgroundColor: 'orange' },
//         tabBarActiveTintColor: 'orange',
//         tabBarInactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="Request Warranty" component={WarrantyForm} />
//       <Tab.Screen name="Warranty Status" component={WarrantyForm} />
//     </Tab.Navigator>
//   );
// }
