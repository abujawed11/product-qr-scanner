

import api from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    BackHandler,
    Linking,
    NativeScrollEvent,
    NativeSyntheticEvent,
    RefreshControl,
    ScrollView,
    Text,
    View
} from "react-native";
import { Button } from "react-native-paper";

type WarrantyReqRow = {
  war_req_id: string;
  client_id: string;
  company_name: string;
  order: { order_id: string } | null;
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
  const [showFilter, setShowFilter] = useState(false);

  const [showFab, setShowFab] = useState(true);
  const lastOffsetY = useRef(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;

    if (currentOffsetY > lastOffsetY.current && currentOffsetY > 10) {
      if (showFab) setShowFab(false);
    } else if (currentOffsetY < lastOffsetY.current || currentOffsetY < 10) {
      if (!showFab) setShowFab(true);
    }

    lastOffsetY.current = currentOffsetY;
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(adminDashboard)/review-req-dashboard");
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
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
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes("pending")) return "bg-yellow-200 text-yellow-800";
    if (status.toLowerCase().includes("approved")) return "bg-green-200 text-green-800";
    if (status.toLowerCase().includes("rejected")) return "bg-red-200 text-red-800";
    return "bg-blue-200 text-blue-800";
  };

  const handleFilterSelect = (selected: string) => {
    setShowFilter(false);
    router.replace({
      pathname: "/(adminDashboard)/review-req-warranty",
      params: { status: selected || undefined },
    });
  };

  return (
    <View className="flex-1 bg-gray-50 relative">
      <View className="bg-white shadow p-4">
        <Text className="text-2xl font-bold text-center text-blue-900">
          {status ? status.replace("_", " ").toUpperCase() : "Warranty"} Requests
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center bg-gray-50 p-4">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-2 text-gray-600">Loading warranty requests...</Text>
        </View>
      ) : isError ? (
        <View className="flex-1 justify-center items-center bg-gray-50 p-4">
          <Text className="text-red-600 font-semibold">Failed to fetch requests</Text>
          <Text className="text-xs text-gray-500 mt-1">{String(error)}</Text>
        </View>
      ) : !data?.length ? (
        <View className="flex-1 justify-center items-center bg-gray-50">
          <Text className="text-gray-600 text-center">
            No warranty requests for <Text className="font-semibold">{status}</Text>
          </Text>
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View>
      ) : (
        <ScrollView
          className="p-4"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {data.map((req) => (
            <View
              key={req.war_req_id}
              className="bg-white rounded-2xl px-5 py-4 mb-5 shadow-lg border border-gray-100"
            >
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="confirmation-number" size={18} color="#0f172a" />
                <Text className="ml-2 text-lg font-extrabold">Request ID #{req.war_req_id}</Text>
              </View>
              <Text className="mb-0.5">
                Project ID: <Text className="font-bold">{req.project_id}</Text>
              </Text>
              <Text className="mb-0.5">
                Client ID: <Text className="font-bold">{req.client_id}</Text>
              </Text>
              <Text className="mb-0.5">
                Company: <Text className="font-bold">{req.company_name}</Text>
              </Text>
              <Text className="mb-0.5">
                Kit ID: <Text className="font-bold">{req.kit_id}</Text>
              </Text>
              <Text className="mb-0.5">
                Kit #: <Text className="font-bold">{req.kit_number}</Text>
              </Text>
              <Text className="mb-0.5">
                Purchase Date:{" "}
                <Text className="font-bold">
                  {req.purchase_date ? dayjs(req.purchase_date).format("DD MMM YYYY") : "--"}
                </Text>
              </Text>
              <Text className="mb-0.5">
                Location:{" "}
                {req.device_latitude && req.device_longitude ? (
                  <Text
                    className="text-blue-700 underline"
                    onPress={() =>
                      Linking.openURL(
                        `https://maps.google.com/?q=${req.device_latitude},${req.device_longitude}`
                      )
                    }
                  >
                    {req.device_latitude}, {req.device_longitude}
                  </Text>
                ) : (
                  <Text className="font-bold">--</Text>
                )}
              </Text>
              <Text className="mb-0.5">
                Status:{" "}
                <Text
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                    req.status
                  )}`}
                >
                  {req.status.toUpperCase()}
                </Text>
              </Text>
              <Text className="mb-0.5">
                Requested:{" "}
                <Text className="font-bold">
                  {dayjs(req.created_at).format("DD MMM YYYY, hh:mm A")}
                </Text>
              </Text>
              <Text className="mb-2">
                Updated:{" "}
                <Text className="font-bold">
                  {dayjs(req.updated_at).format("DD MMM YYYY, hh:mm A")}
                </Text>
              </Text>
              <View className="flex-row mt-2 space-x-4">
                <Button
                  mode="outlined"
                  style={{ flex: 1, borderRadius: 25 }}
                  contentStyle={{ height: 45 }}
                  onPress={() =>
                    router.push({
                      pathname: "/(adminDashboard)/review-claim-fulldetails",
                      params: {
                        war_req_id: req.war_req_id,
                        from: "review-req-warranty-status",
                        status,
                      },
                    })
                  }
                >
                  View Details
                </Button>
                <Button
                  mode="contained"
                  buttonColor="#facc15"
                  textColor="black"
                  style={{ flex: 1, borderRadius: 25 }}
                  contentStyle={{ height: 45 }}
                  onPress={() =>
                    router.push({
                      pathname: "/(adminDashboard)/review-claim-update",
                      params: {
                        war_req_id: req.war_req_id,
                        from: "review-req-warranty-status",
                        status,
                      },
                    })
                  }
                >
                  Update
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* {showFab && (
        <FAB
          icon="filter"
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#3b82f6",
          }}
          color="white"
          onPress={() => setShowFilter(true)}
        />
      )} */}

      {/* Filter Modal */}
      {/* <Modal visible={showFilter} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white p-5 rounded-t-3xl space-y-3">
            <Text className="text-lg font-semibold text-center">Filter by Status</Text>

            {["", "pending", "approved", "rejected"].map((opt) => (
              <Pressable
                key={opt}
                className={`py-2 px-4 rounded-full border ${
                  status === opt
                    ? "bg-blue-100 border-blue-400"
                    : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => handleFilterSelect(opt)}
              >
                <Text className="text-center capitalize">{opt === "" ? "All" : opt}</Text>
              </Pressable>
            ))}

            <Pressable className="mt-3 py-2 bg-gray-200 rounded-full" onPress={() => setShowFilter(false)}>
              <Text className="text-center font-semibold text-gray-600">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}