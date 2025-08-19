import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type WarrantyStatusCounts = {
  pending: number;
  under_review: number;
  approved: number;
  rejected: number;
  cancelled: number;
  applied: number;
};

const HomeScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tapCount, setTapCount] = useState(0);

  const {
    data: counts = {
      pending: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
      applied: 0,
    },
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["warrantyDashboardCounts"],
    queryFn: async () => {
      const res = await api.get("/warranty-dashboard-counts/");
      return res.data;
    },
    staleTime: 60_000,
  });

  const openScanner = () => {
    router.push("/(main)/dashboard/qr-scanner");
  };

  // 🔧 Secret developer access (tap logo 7 times)
  const handleSecretTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);
    
    if (newTapCount === 7) {
      // Check if user has developer credentials
      const isDeveloper = user?.username === 'developer' || 
                         user?.username === 'dev_admin' || 
                         user?.username === 'abujawed11' ||
                         user?.email === 'developer@company.com';
      
      if (isDeveloper) {
        Alert.alert(
          '🔧 Developer Mode',
          'Access developer dashboard?',
          [
            { text: 'Cancel', onPress: () => setTapCount(0) },
            { text: 'Enter', onPress: () => router.push('/(developer)') },
          ]
        );
      } else {
        Alert.alert('Access Denied', 'You do not have developer privileges.');
      }
      setTapCount(0);
    }
    
    // Reset tap count after 3 seconds
    setTimeout(() => {
      setTapCount(0);
    }, 3000);
  };

  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  });

  return (
    <View className="flex-1 bg-black px-6 pt-14 relative">
      {/* Header */}
      <Text className="text-white text-2xl font-extrabold mb-1">Hi, {user?.username}</Text>
      <TouchableOpacity onPress={handleSecretTap} activeOpacity={0.8}>
        <Text className="text-white text-2xl font-extrabold mb-1">
          Welcome to Sunrack Warranty App
        </Text>
        {tapCount > 0 && (
          <Text className="text-yellow-400 text-xs">
            Developer access: {tapCount}/7
          </Text>
        )}
      </TouchableOpacity>
      <Text className="text-yellow-400 text-sm font-medium">
        Client ID: {user?.client_id}
      </Text>
      <Text className="text-yellow-400 text-sm font-medium">
        Company: {user?.company_name}
      </Text>

      {/* Warranty Status Dashboard */}
      <View className="mt-10 bg-yellow-400 rounded-2xl p-6 shadow-lg min-h-[180px]">
        <View className="flex-row items-center mb-3">
          <Ionicons name="shield-checkmark" size={22} color="black" />
          <Text className="text-black text-xl font-bold ml-2">
            Warranty Status
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#000" size="large" className="mt-6 self-center" />
        ) : isError ? (
          <Text className="text-red-600 text-center mt-6">
            {error?.message || "Failed to load warranty data"}
          </Text>
        ) : (
          <>
            {/* Applied */}
            <View className="flex-row justify-center mb-4">
              <View className="items-center">
                <Text className="text-black font-bold text-lg">Applied</Text>
                <Text className="text-black text-4xl font-extrabold mt-2">{counts.applied}</Text>
              </View>
            </View>

            <View className="border-t border-black/30 my-2" />

            {/* Status counts row */}
            <View className="flex-row justify-between pt-2">
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Pending</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.pending}</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Review</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.under_review}</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Approved</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.approved}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Floating Scan Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={openScanner}
          className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-xl border border-yellow-200"
        >
          <Ionicons name="qr-code-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;