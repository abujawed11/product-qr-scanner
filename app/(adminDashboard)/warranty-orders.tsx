// app/(adminDashboard)/warranty-orders.tsx
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

// --- Update according to your backend's values or serializer ---
type OrderRow = {
  order_id: string;
  project_id: string | null;
  status: string;
  kit_count?: number; // Optional, just in case!
  [key: string]: any;
};

export default function WarrantyOrdersScreen() {
  const router = useRouter();
  const { client_id, client_name } = useLocalSearchParams<{
    client_id: string;
    client_name?: string;
  }>();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all unique orders with warranty claims for this client
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<OrderRow[]>({
    queryKey: ["warrantyOrders", client_id],
    queryFn: async () => {
      // Adjust endpoint as per your backend
      const res = await api.get(`/warranty-claim-orders/?client_id=${client_id}`);
      return res.data;
    },
    enabled: !!client_id,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try { await refetch(); }
    finally { setRefreshing(false); }
  }, [refetch]);

  if (!client_id)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">No client selected.</Text>
      </View>
    );

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text>Loading orders...</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Failed to fetch orders:</Text>
        <Text className="text-xs">{String(error)}</Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
    );

  if (!data || !data.length)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No orders with warranty claims found for this client.</Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
    );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-bold mb-4 text-center">
        Orders with Warranty Claims{client_name ? ` for ${client_name}` : ""}
      </Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {data.map((order,index) => (
          <TouchableOpacity
            key={index}
            className="bg-white rounded-lg py-4 px-5 mb-3 shadow"
            onPress={() =>
              router.push({
                pathname: "/(adminDashboard)/warranty-requests",
                params: {
                  order_id: order.order_id,
                  client_id,
                  client_name,
                },
              })
            }
          >
            <Text className="font-semibold text-lg">
              Order #{order.order_id}
            </Text>
            <Text className="text-gray-600">Project: {order.project_id ?? "-"}</Text>
            {"status" in order && <Text className="text-gray-500">Status: {order.status}</Text>}
            {"kit_count" in order && <Text className="text-gray-400">Total Kits: {order.kit_count}</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
