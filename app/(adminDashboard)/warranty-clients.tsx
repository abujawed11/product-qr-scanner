// // app/(adminDashboard)/warranty-clients.tsx
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import React from "react";
// import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { ActivityIndicator } from "react-native-paper";

// // ---- TYPE
// type ClientRow = {
//   client__client_id: string;
//   client__company_name: string;
// };

// export default function WarrantyClientsScreen() {
//   const router = useRouter();

//   const { data, isLoading, isError, error } = useQuery<ClientRow[]>({
//     queryKey: ["warrantyClients"],
//     queryFn: async () => {
//       // Adjust the endpoint in your backend
//       const res = await api.get("/warranty-claim-clients/");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator size="large" />
//         <Text>Loading clients...</Text>
//       </View>
//     );
//   }
//   if (isError) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-red-500">Failed to fetch clients:</Text>
//         <Text className="text-xs">{String(error)}</Text>
//       </View>
//     );
//   }
//   if (!data || !data.length) {
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-gray-500">No clients (with warranty claims) found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50 p-4">
//       <Text className="text-xl font-bold mb-4 text-center">Clients with Warranty Claims</Text>
//       <ScrollView>
//         {data.map((row,index) => (
//           <TouchableOpacity
//             key={index}
//             className="bg-white rounded-lg py-4 px-5 mb-3 shadow"
//             onPress={() =>
//               router.push({
//                 pathname: "/(adminDashboard)/warranty-orders",
//                 params: { client_id: row.client__client_id, client_name: row.client__company_name },
//               })
//             }
//           >
//             <Text className="font-semibold text-lg">{row.client__company_name}</Text>
//             <Text className="text-gray-600">{row.client__client_id}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }


import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type ClientRow = {
  client__client_id: string;
  client__company_name: string;
};

export default function WarrantyClientsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ClientRow[]>({
    queryKey: ["warrantyClients"],
    queryFn: async () => {
      const res = await api.get("/warranty-claim-clients/");
      return res.data;
    },
  });

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text>Loading clients...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Failed to fetch clients:</Text>
        <Text className="text-xs">{String(error)}</Text>
      </View>
    );
  }
  if (!data || !data.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No clients (with warranty claims) found.</Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-bold mb-4 text-center">Clients with Warranty Claims</Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {data.map((row, index) => (
          <TouchableOpacity
            key={row.client__client_id}
            className="bg-white rounded-lg py-4 px-5 mb-3 shadow"
            onPress={() =>
              router.push({
                pathname: "/(adminDashboard)/warranty-orders",
                params: { client_id: row.client__client_id, client_name: row.client__company_name },
              })
            }
          >
            <Text className="font-semibold text-lg">{row.client__company_name}</Text>
            <Text className="text-gray-600">{row.client__client_id}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
