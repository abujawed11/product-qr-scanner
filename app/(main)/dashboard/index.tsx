import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-yellow-100 items-center justify-center px-4">
      <Text className="text-2xl font-bold text-yellow-600 mb-2">Welcome!</Text>
      
      {user ? (
        <>
          <Text className="text-lg text-gray-800 mb-4">
            Logged in as: <Text className="font-semibold">{user.username}</Text>
          </Text>
          <Text className="text-sm text-gray-600 mb-8">{user.email}</Text>
          <TouchableOpacity
            className="bg-yellow-500 px-6 py-3 rounded-lg"
            onPress={logout}
          >
            <Text className="text-black font-bold">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-gray-600 mb-6">You are not logged in</Text>
          <TouchableOpacity
            className="bg-yellow-500 px-6 py-3 rounded-lg"
            onPress={() => router.push('/login')}
          >
            <Text className="text-black font-bold">Go to Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
