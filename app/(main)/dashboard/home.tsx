// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';
// import { Text, TouchableOpacity, View } from 'react-native';

// export default function HomeScreen() {
//   const { user, logout } = useAuth();

//   return (
//     <View className="flex-1 bg-yellow-100 items-center justify-center px-4">
//       <Text className="text-2xl font-bold text-yellow-600 mb-2">Welcome!</Text>
      
//       {user ? (
//         <>
//           <Text className="text-lg text-gray-800 mb-4">
//             Logged in as: <Text className="font-semibold">{user.username}</Text>
//           </Text>
//           <Text className="text-sm text-gray-600 mb-8">{user.email}</Text>
//           <TouchableOpacity
//             className="bg-yellow-500 px-6 py-3 rounded-lg"
//             onPress={logout}
//           >
//             <Text className="text-black font-bold">Logout</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <Text className="text-gray-600 mb-6">You are not logged in</Text>
//           <TouchableOpacity
//             className="bg-yellow-500 px-6 py-3 rounded-lg"
//             onPress={() => router.push('/login')}
//           >
//             <Text className="text-black font-bold">Go to Login</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// }

import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, TouchableOpacity, View } from 'react-native';
 // Adjust the import path as needed

const HomeScreen = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  // const [username, setUsername] = useState('Abu');
  const [customerId, setCustomerId] = useState('CUST123');
  const [orders, setOrders] = useState({ total: 10, delivered: 7, pending: 3 });

    useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true; // prevent default behavior (going back)
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  });

  useEffect(() => {
    // fetch user/orders from context or backend here
  }, []);

  const openScanner = () => {
    router.push('/(main)/dashboard/qr-scanner');
  };
  console.log(user)

  return (
    <View className="flex-1 bg-black px-6 pt-14">
      {/* Header */}
      <Text className="text-white text-xl font-bold">Hi {user?.username}</Text>
      <Text className="text-white text-lg">Welcome to Sunrack Warranty Portal</Text>
      <Text className="text-yellow-400 text-base font-semibold mt-1">Cust ID: {user?.customer_id}</Text>

      {/* Order Summary */}
      <View className="mt-10 bg-yellow-400 rounded-2xl p-6">
        <Text className="text-black text-lg font-bold mb-2">Order Summary</Text>
        <View className="flex-row justify-between mt-4">
          <View className="items-center">
            <Text className="text-black font-semibold text-base">Total</Text>
            <Text className="text-black text-xl font-bold">{orders.total}</Text>
          </View>
          <View className="items-center">
            <Text className="text-black font-semibold text-base">Delivered</Text>
            <Text className="text-black text-xl font-bold">{orders.delivered}</Text>
          </View>
          <View className="items-center">
            <Text className="text-black font-semibold text-base">Pending</Text>
            <Text className="text-black text-xl font-bold">{orders.pending}</Text>
          </View>
        </View>
      </View>

      {/* Floating Scan Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={openScanner}
          className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-md"
        >
          <Ionicons name="qr-code-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

