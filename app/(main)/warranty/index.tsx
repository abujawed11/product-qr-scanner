import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from 'expo-router'; // key import!
import MyWarrantyCardsScreen from './my-cards';
import ClaimStatusScreen from './warranty-status';

const Tab = createMaterialTopTabNavigator();

export default function WarrantyTabs() {
    const navigation = useNavigation();

    // const params = useLocalSearchParams<{ initialTab?: string }>();
    // const TAB_KEYS = ['warranty-status', 'my-cards'];
    // const initialTabName =
    //     params && TAB_KEYS.includes(params.initialTab as string)
    //         ? (params.initialTab as string)
    //         : 'warranty-status'; // Default

    return (
        <Tab.Navigator
            // key={initialTabName}
            // initialRouteName={initialTabName}
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: 'orange' },
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
            }}
        // screenOptions={{
        //     tabBarLabelStyle: { fontWeight: 'bold', color: '#000' },
        //     tabBarIndicatorStyle: { backgroundColor: '#facc15', height: 4 },
        //     tabBarStyle: { backgroundColor: '#fff' },
        //     tabBarActiveTintColor: '#000',
        // }}
        >
            <Tab.Screen
                name="Warranty Status"
                component={ClaimStatusScreen}
                // options={{ tabBarLabel: "Warranty Status" }}
                listeners={{
                    // This sets the title when this tab is focused
                    focus: () => navigation.setOptions({ title: 'Warranty Status' }),
                }}
            />
            <Tab.Screen
                name="My Warranty Cards"
                component={MyWarrantyCardsScreen}
                // options={{ tabBarLabel: "My Warranty Cards" }}
                listeners={{
                    focus: () => navigation.setOptions({ title: 'My Warranty Cards' }),
                }}
            />
        </Tab.Navigator>
    );
}
