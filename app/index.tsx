import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (user) {
    if (user.account_type === 'admin') {
      return <Redirect href="/(adminDashboard)" />;
    } else {
      return <Redirect href="/dashboard" />;
    }
  }

  return <Redirect href="/(auth)/login" />;
}
