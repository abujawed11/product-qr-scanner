import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "#facc15" },       // Yellow
  under_review: { label: "Under Review", color: "#fde047" }, // Lighter yellow
  approved: { label: "Approved", color: "#22c55e" },     // Green
  rejected: { label: "Rejected", color: "#ef4444" },     // Red
  cancelled: { label: "Cancelled", color: "#374151" },   // Gray
};

type Status = keyof typeof STATUS_DISPLAY;

export default function ReviewReqDashboard() {
  const router = useRouter();

  // AXIOS version
  const { data, isLoading, isError, error } = useQuery<Record<Status, number>>({
    queryKey: ["warrantySummary"],
    queryFn: async () => {
      // Your backend endpoint must return {pending: n, ...}
      const res = await api.get("/warranty-claims-status-summary/");
      // console.log(res.data)
      return res.data;
    },
  });

  return (
    <ScrollView className="flex-1 bg-black" contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
      {/* HEADER */}
      <Text className="text-3xl font-extrabold text-yellow-400 text-center mb-8 tracking-wide">
        Warranty Review Dashboard
      </Text>

      {/* CARDS */}
      <View className="flex-row flex-wrap justify-center mb-12">
        {Object.entries(STATUS_DISPLAY).map(([statusKey, { label, color }]) => (
          <TouchableOpacity
            key={statusKey}
            className="mx-2 my-3 w-40 h-32 rounded-2xl shadow-lg justify-center items-center"
            style={{
              backgroundColor: color + "22", // translucent
              borderColor: color,
              borderWidth: 2,
              elevation: 6,
            }}
            onPress={() =>
              router.push({
                pathname: "/(adminDashboard)/review-req-warranty-status",
                params: { status: statusKey },
              })
            }
            disabled={isLoading || isError}
          >
            <Text className="text-[20px] font-bold mb-1" style={{ color }}>
              {label}
            </Text>
            {isLoading ? (
              <ActivityIndicator color={color} />
            ) : (
              <Text className="text-[36px] font-extrabold" style={{ color }}>
                {data?.[statusKey as Status] ?? 0}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Browse by ... buttons */}
      <Text className="text-center text-lg font-semibold text-yellow-400 mb-2">Browse Warranty By</Text>
      <View className="flex-row justify-center space-x-4">
        <TouchableOpacity
          className="bg-yellow-400 rounded-xl px-7 py-4 mr-2"
          onPress={() => router.push("/(adminDashboard)/warranty-clients")}
        >
          <Text className="text-black text-[17px] font-bold">Clients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-400 rounded-xl px-7 py-4"
          onPress={() => router.push("/(adminDashboard)/warranty-orders")}
        >
          <Text className="text-black text-[17px] font-bold">Orders</Text>
        </TouchableOpacity>
      </View>
      <View className="h-12" />
    </ScrollView>
  );
}
