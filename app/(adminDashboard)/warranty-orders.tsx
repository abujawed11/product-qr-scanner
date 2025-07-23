// app/(adminDashboard)/warranty-orders.tsx
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { ActivityIndicator } from "react-native-paper";

// // --- Update according to your backend's values or serializer ---
// type OrderRow = {
//   order_id: string;
//   project_id: string | null;
//   status: string;
//   kit_count?: number; // Optional, just in case!
//   [key: string]: any;
// };

// export default function WarrantyOrdersScreen() {
//   const router = useRouter();
//   const { client_id, client_name } = useLocalSearchParams<{
//     client_id: string;
//     client_name?: string;
//   }>();
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch all unique orders with warranty claims for this client
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery<OrderRow[]>({
//     queryKey: ["warrantyOrders", client_id],
//     queryFn: async () => {
//       // Adjust endpoint as per your backend
//       const res = await api.get(`/warranty-claim-orders/?client_id=${client_id}`);
//       return res.data;
//     },
//     enabled: !!client_id,
//   });

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try { await refetch(); }
//     finally { setRefreshing(false); }
//   }, [refetch]);

//   if (!client_id)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-red-500">No client selected.</Text>
//       </View>
//     );

//   if (isLoading)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator />
//         <Text>Loading orders...</Text>
//       </View>
//     );

//   if (isError)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-red-500">Failed to fetch orders:</Text>
//         <Text className="text-xs">{String(error)}</Text>
//         <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
//       </View>
//     );

//   if (!data || !data.length)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-gray-500">No orders with warranty claims found for this client.</Text>
//         <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
//       </View>
//     );

//   return (
//     <View className="flex-1 bg-gray-50 p-4">
//       <Text className="text-xl font-bold mb-4 text-center">
//         Orders with Warranty Claims{client_name ? ` for ${client_name}` : ""}
//       </Text>
//       <ScrollView
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {data.map((order,index) => (
//           <TouchableOpacity
//             key={index}
//             className="bg-white rounded-lg py-4 px-5 mb-3 shadow"
//             onPress={() =>
//               router.push({
//                 pathname: "/(adminDashboard)/warranty-requests",
//                 params: {
//                   order_id: order.order_id,
//                   client_id,
//                   client_name,
//                 },
//               })
//             }
//           >
//             <Text className="font-semibold text-lg">
//               Order #{order.order_id}
//             </Text>
//             <Text className="text-gray-600">Project: {order.project_id ?? "-"}</Text>
//             {"status" in order && <Text className="text-gray-500">Status: {order.status}</Text>}
//             {"kit_count" in order && <Text className="text-gray-400">Total Kits: {order.kit_count}</Text>}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { BackHandler, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type OrderRow = {
  order_id: string;
  project_id: string | null;
  status: string;
  kit_count?: number;
  [key: string]: any;
};

export default function WarrantyOrdersScreen() {
  const router = useRouter();
  const { client_id, client_name } = useLocalSearchParams<{
    client_id: string;
    client_name?: string;
  }>();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<OrderRow[]>({
    queryKey: ["warrantyOrders", client_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claim-orders/?client_id=${client_id}`);
      return res.data;
    },
    enabled: !!client_id,
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(adminDashboard)/warranty-clients");
        return true; // prevent default back behavior
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up the subscription when the screen loses focus
      return () => subscription.remove();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (!client_id)
    return (
      <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ color: "#B91C1C", fontWeight: "bold", fontSize: 16 }}>No client selected.</Text>
      </View>
    );

  if (isLoading)
    return (
      <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FAD90E" />
        <Text style={{ marginTop: 12, fontSize: 14, color: "#FAD90E" }}>Loading orders...</Text>
      </View>
    );

  if (isError)
    return (
      <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ color: "#B91C1C", fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>
          Failed to fetch orders:
        </Text>
        <Text style={{ fontSize: 12, color: "#7c2d12", textAlign: "center" }}>{String(error)}</Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
    );

  if (!data || !data.length)
    return (
      <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ color: "#FAD90E", fontSize: 17, textAlign: "center", fontWeight: "bold" }}>
          No orders with warranty claims found for this client.
        </Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header in FAD90E pill, smaller and subtle */}
      <View
        style={{
          backgroundColor: "#FAD90E",
          borderRadius: 18,
          marginTop: 18,
          marginBottom: 14,
          paddingHorizontal: 16,
          paddingVertical: 3,
          alignItems: "center",
          alignSelf: "center",
          minWidth: 180,
          maxWidth: 400,
        }}>
        <Text
          style={{
            color: "#111",
            fontSize: 15,
            fontWeight: "bold",
            textAlign: "center",
            letterSpacing: 0.3
          }}
        >
          Orders with Warranty Claims{client_name ? ` for ${client_name}` : ""}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyboardShouldPersistTaps="handled"
      >
        {data.map(order => (
          <TouchableOpacity
            key={order.order_id}
            activeOpacity={0.85}
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
            style={{
              backgroundColor: "#111",
              borderRadius: 18,
              padding: 18,
              marginBottom: 16,
              shadowColor: "#FAD90E",
              shadowOpacity: 0.13,
              shadowRadius: 7,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              borderLeftWidth: 8,
              borderLeftColor: "#FAD90E",
            }}
          >
            <View style={{
              marginRight: 12,
              backgroundColor: "#272315",
              borderRadius: 10,
              width: 46,
              height: 46,
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{
                color: "#FAD90E",
                fontWeight: "900",
                fontSize: 19,
              }}>
                {order.order_id.slice(-3)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "700", fontSize: 16, color: "#fff" }}>
                Order #{order.order_id}
              </Text>
              <Text style={{ color: "#FAD90E", marginTop: 2 }}>
                Project: <Text style={{ color: "#fff" }}>{order.project_id ?? "-"}</Text>
              </Text>
              {"status" in order && (
                <Text style={{ color: "#E5E7EB", marginTop: 1 }}>Status: {order.status}</Text>
              )}
              {"kit_count" in order && (
                <Text style={{ color: "#D1D5DB", marginTop: 1 }}>Total Kits: {order.kit_count}</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}