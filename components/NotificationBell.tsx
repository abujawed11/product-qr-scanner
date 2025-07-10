// components/BellWithNotification.tsx

// import { NotificationContext } from '@/context/NotificationContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const BellWithNotification = () => {
    // const { unread } = useContext(NotificationContext);
    const router = useRouter();

    return (

        <TouchableOpacity
            onPress={() => router.push('/notifications')}
            style={{ marginRight: 15 }}
        >
            <Ionicons name="notifications-outline" size={24} color="black" />
            {/* {unread > 0 && (
                <View className="absolute top-0 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500" />
            )} */}
        </TouchableOpacity>
    );
};

export default BellWithNotification;
