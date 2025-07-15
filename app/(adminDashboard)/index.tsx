import { BACKGROUND_COLOR } from '@/utils/color';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function AdminDashboard() {
    const router = useRouter();

    const Card = ({
        icon,
        label,
        route,
        IconComponent,
    }: {
        icon: string;
        label: string;
        route: '/(adminDashboard)/manage-clients' | '/(adminDashboard)/manage-orders' | '/(adminDashboard)/manage-kits' | '/(adminDashboard)/review-claims';
        IconComponent: any;
    }) => (
        <TouchableOpacity
            onPress={() => router.push(route)}
            // className="bg-yellow-400 rounded-2xl p-5 flex-row items-center mb-4 shadow-md"
            style={{
            backgroundColor: BACKGROUND_COLOR,
            borderRadius: 16,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}
        >
            <IconComponent name={icon} size={28} color="black" />
            <Text className="ml-4 text-lg font-bold text-black">{label}</Text>
        </TouchableOpacity>
    );


    return (
        <ScrollView
            className="flex-1 bg-black px-6 pt-10"
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            <Text className="text-3xl font-bold text-yellow-400 text-center mb-8">
                Admin Panel
            </Text>

            <Card
                icon="users"
                label="Manage Clients"
                route="/(adminDashboard)/manage-clients"
                IconComponent={FontAwesome5}
            />

            <Card
                icon="clipboard-list"
                label="Manage Orders"
                route="/(adminDashboard)/manage-orders"
                IconComponent={FontAwesome5}
            />

            <Card
                icon="construction"
                label="Manage Kits"
                route="/(adminDashboard)/manage-kits"
                IconComponent={MaterialIcons}
            />

            <Card
                icon="shield-checkmark"
                label="Review Claims"
                route="/(adminDashboard)/review-claims"
                IconComponent={Ionicons}
            />
        </ScrollView>
    );
}
