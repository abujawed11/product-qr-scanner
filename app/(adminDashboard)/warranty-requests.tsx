

import api from "@/utils/api";
import { doc_url } from "@/utils/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    Alert,
    Linking,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
dayjs.extend(relativeTime);

type WarrantyReqRow = {
  war_req_id: string;
  status: string;
  created_at: string;
  kit_number?: string;
  pdf_url?: string;
  review_comment?: string;
  company_name?: string;
};

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function getAbsolutePdfUrl(pdf_url?: string): string | undefined {
  if (!pdf_url || pdf_url === "") return undefined;
  if (pdf_url.startsWith("http")) return pdf_url;
  if (pdf_url.startsWith("/media/")) return joinUrl(doc_url, pdf_url);
  if (pdf_url.startsWith("/")) return joinUrl(doc_url, "/media" + pdf_url);
  return joinUrl(doc_url, "/media/" + pdf_url);
}

export default function WarrantyRequestsScreen() {
  const router = useRouter();
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<WarrantyReqRow[]>({
    queryKey: ["warrantyRequests", order_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims-by-order/?order_id=${order_id}`);
      return res.data;
    },
    enabled: !!order_id,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  async function handleOpenPdf(pdf_url?: string) {
    const absUrl = getAbsolutePdfUrl(pdf_url);
    if (!absUrl) {
      Alert.alert("PDF not available");
      return;
    }
    const supported = await Linking.canOpenURL(absUrl);
    if (!supported) {
      Alert.alert("Cannot open PDF URL", absUrl);
      return;
    }
    Linking.openURL(absUrl);
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-600";
      case "rejected":
        return "bg-red-600";
      case "pending":
        return "bg-yellow-400";
      case "under review":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  if (!order_id)
    return (
      <View className="flex-1 items-center justify-center bg-[#FFFBE9]">
        <Text className="text-red-500 text-base">No order selected.</Text>
      </View>
    );

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-[#FFFBE9]">
        <ActivityIndicator />
        <Text className="text-base mt-2 text-gray-700">Loading warranty requests...</Text>
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 items-center justify-center bg-[#FFFBE9] px-4">
        <Text className="text-red-500 text-lg font-semibold">Failed to fetch warranty requests</Text>
        <Text className="text-sm text-gray-600 mt-2">{String(error)}</Text>
        <Button className="mt-4" mode="outlined" onPress={onRefresh}>
          Retry
        </Button>
      </View>
    );

  if (!data || !data.length)
    return (
      <View className="flex-1 items-center justify-center bg-[#FFFBE9] px-4">
        <Text className="text-gray-500 text-base text-center">
          No warranty requests found for this order.
        </Text>
        <Button className="mt-4" mode="outlined" onPress={onRefresh}>
          Refresh
        </Button>
      </View>
    );

  return (
    <View className="flex-1 bg-[#FFFBE9] px-4 pb-10">
      <Text className="text-xl font-bold mt-4 mb-4 text-center text-gray-900">
        Warranty Requests for Order #{order_id}
      </Text>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {data.map((req, index) => (
          <View
            key={req.war_req_id ?? index}
            className="bg-white rounded-xl py-5 px-6 mb-5 shadow-md border border-gray-300"
          >
            <Text className="font-bold text-lg text-gray-900 mb-2">
              Request #{req.war_req_id}
            </Text>

            <View className="flex-row items-center mb-2">
              <Text className="font-medium text-gray-800">Status:</Text>
              <Text
                className={`ml-2 px-3 py-1 rounded-full text-xs text-white ${getStatusStyle(
                  req.status
                )}`}
              >
                {req.status}
              </Text>
            </View>

            <Text className="text-sm text-gray-700 mb-1">
              ⏱ Created: {dayjs(req.created_at).fromNow()}
            </Text>

            {req.kit_number && (
              <Text className="text-sm text-gray-700 mb-1">
                🆔 Kit #: {req.kit_number}
              </Text>
            )}
            {req.company_name && (
              <Text className="text-sm text-gray-700 mb-1">
                🏢 Company: {req.company_name}
              </Text>
            )}

            {req.review_comment && (
              <Text className="text-sm text-gray-800 mt-2">
                📝 Admin Comment: {req.review_comment}
              </Text>
            )}

            {req.pdf_url && (
              <TouchableOpacity
                onPress={() => handleOpenPdf(req.pdf_url)}
                className="mt-3 flex-row items-center bg-yellow-100 px-4 py-2 rounded-md"
              >
                <Ionicons name="document-text-outline" size={18} color="#FAD90E" />
                <Text className="ml-2 text-sm font-medium text-yellow-500 underline">
                  View Scanned PDF
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(adminDashboard)/review-req-warranty",
                  params: { war_req_id: req.war_req_id },
                })
              }
              className="mt-5 w-full bg-black py-3 rounded-lg"
              activeOpacity={0.85}
            >
              <Text className="text-center text-base font-semibold" style={{ color: "#FAD90E" }}>
                Review Request
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Floating Refresh Button */}
      <TouchableOpacity
        onPress={onRefresh}
        className="absolute bottom-6 right-6 bg-yellow-400 p-4 rounded-full shadow-lg"
      >
        <Feather name="refresh-cw" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

