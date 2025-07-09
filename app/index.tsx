// import "../global.css";
// import RegisterScreen from "./(auth)/register";
 
// export default function App() {
//   return (
//     <RegisterScreen />
//   );
// }

import { Redirect } from "expo-router";
// import { useAuth } from "@/hooks/useAuth";
import { useAuth } from "@/context/AuthContext"; // Adjust the import path as necessary
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
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/(auth)/login" />;
}