// app/(adminDashboard)/review-req-warranty.tsx
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { BackHandler, RefreshControl, ScrollView, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

type WarrantyReqRow = {
  war_req_id: string;
  client_id: string;
  company_name: string;
  order_id: string;
  kit_id: string;
  kit_number: string;
  project_id: string;
  purchase_date: string | null;
  device_latitude?: number | null;
  device_longitude?: number | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function ReviewReqWarrantyList() {
  const { status } = useLocalSearchParams<{ status?: string }>();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(adminDashboard)/review-req-dashboard");
        return true; // prevent default back behavior
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Clean up the subscription when the screen loses focus
      return () => subscription.remove();
    }, [])
  );

  const { data, isLoading, isError, error, refetch } = useQuery<WarrantyReqRow[]>({
    queryKey: ["warrantyRequests", status],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims-by-status/?status=${status}`);
      return res.data;
    },
    enabled: !!status,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try { await refetch(); } finally { setRefreshing(false); }
  }, [refetch]);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator />
        <Text>Loading warranty requests...</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Failed to fetch requests</Text>
        <Text className="text-xs">{String(error)}</Text>
      </View>
    );

  if (!data || !data.length)
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500">No requests found for status: {status}</Text>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
      </View>
    );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-bold mb-4 text-center">
        {status ? status.replace("_", " ").toUpperCase() : "Warranty"} Requests
      </Text>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {data.map((req) => (
          <View key={req.war_req_id} className="bg-white rounded-xl px-5 py-5 mb-5 shadow">
            <Text className="text-lg font-extrabold mb-1">Request ID #{req.war_req_id}</Text>
            <Text className="mb-0.5">Client ID: <Text className="font-bold">{req.client_id}</Text></Text>
            <Text className="mb-0.5">Company: <Text className="font-bold">{req.company_name}</Text></Text>
            <Text className="mb-0.5">Order ID: <Text className="font-bold">{req.order_id}</Text></Text>
            <Text className="mb-0.5">Kit ID: <Text className="font-bold">{req.kit_id}</Text></Text>
            <Text className="mb-0.5">Kit #: <Text className="font-bold">{req.kit_number}</Text></Text>
            <Text className="mb-0.5">Project ID: <Text className="font-bold">{req.project_id}</Text></Text>
            <Text className="mb-0.5">
              Purchase Date: <Text className="font-bold">{req.purchase_date ? new Date(req.purchase_date).toLocaleDateString() : "--"}</Text>
            </Text>
            <Text className="mb-0.5">
              Location: <Text className="font-bold">
                {req.device_latitude && req.device_longitude
                  ? `${req.device_latitude}, ${req.device_longitude}`
                  : "--"}
              </Text>
            </Text>
            <Text className="mb-0.5">
              Status: <Text className="font-bold text-blue-700">{req.status}</Text>
            </Text>
            <Text className="mb-0.5">
              Requested: <Text className="font-bold">{new Date(req.created_at).toLocaleString()}</Text>
            </Text>
            <Text className="mb-2">
              Updated: <Text className="font-bold">{new Date(req.updated_at).toLocaleString()}</Text>
            </Text>

            {/* Button Row */}
            <View className="flex-row mt-2 space-x-4">
              <Button
                mode="outlined"
                onPress={() =>
                  // router.push({
                  //   pathname: "/(adminDashboard)/review-claim-fulldetails",
                  //   params: { war_req_id: req.war_req_id },
                  // })
                  router.push({
                    pathname: "/(adminDashboard)/review-claim-fulldetails",
                    params: {
                      war_req_id: req.war_req_id,
                      from: "review-req-warranty-status", // Or whatever filename
                      status, // add any additional context needed for correct back
                    },
                  })
                }
                style={{ flex: 1 }}
              >
                View Details
              </Button>
              <Button
                mode="contained"
                buttonColor="#facc15"
                textColor="black"
                onPress={() =>
                  // router.push({
                  //   pathname: "/(adminDashboard)/review-claim-update",
                  //   params: { war_req_id: req.war_req_id },
                  // })
                  router.push({
                    pathname: "/(adminDashboard)/review-claim-update",
                    params: {
                      war_req_id: req.war_req_id,
                      from: "review-req-warranty-status", // Or whatever filename
                      status, // add any additional context needed for correct back
                    },
                  })
                }
                style={{ flex: 1 }}
              >
                Update
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
