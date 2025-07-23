import { checklistItems, claimSteps } from "@/app/(main)/warranty/claim-steps"; // adjust path
import api from "@/utils/api";
import { doc_url } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ResizeMode, Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type Upload = {
  id: number;
  step_key: string;
  media_type: "image" | "video";
  media_file: string;
};
type ClaimDetail = {
  war_req_id: string;
  checklist_answers?: Record<string, boolean>;
  uploads: Upload[];
};

export default function AdminReviewClaimScreen() {
  const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();
  const { data, isLoading, isError, error } = useQuery<ClaimDetail>({
    queryKey: ["claimDetail", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims/${war_req_id}/`);
      return res.data;
    },
    enabled: !!war_req_id,
  });

  // const base_url = "http://192.168.1.110";

  function getMediaUrl(media_file: string): string {
    if (media_file.startsWith("http")) return media_file;
    if (media_file.startsWith("/media/")) return (doc_url + media_file);
    return `${doc_url}/media/` + media_file.replace(/^\/+/, "");
  }


  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  if (isError)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{String(error)}</Text>
      </View>
    );
  if (!data)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No claim data.</Text>
      </View>
    );

  const checklistAnswers = data.checklist_answers || {};

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold text-center mb-4">
        Review Claim #{data.war_req_id}
      </Text>
      <Text className="text-base font-semibold mb-2">Checklist Submitted by User:</Text>
      <View className="mb-6">
        {checklistItems.map((item) => (
          <View key={item.key} className="flex-row items-center mb-1">
            <Text className="flex-1 text-[15px]">{item.question}</Text>
            <Text
              className={`ml-2 font-bold ${
                checklistAnswers[item.key] ? "text-green-700" : "text-red-600"
              }`}
            >
              {checklistAnswers[item.key] ? "✓" : "✗"}
            </Text>
          </View>
        ))}
      </View>
      <Text className="text-base font-semibold mb-2">Uploads By Step:</Text>
      {claimSteps.map((step) => {
        const uploads = data.uploads?.filter((up) => up.step_key === step.key) || [];
        if (uploads.length === 0) return null;
        return (
          <View key={step.key} className="mb-6">
            <Text className="font-bold text-lg mb-1">{step.title}</Text>
            <Text className="mb-2 text-xs text-gray-600">{step.instruction}</Text>
            <View className="flex-row flex-wrap">
              {uploads.map((up) =>
                up.media_type === "image" ? (
                  <Image
                    key={up.id}
                    source={{ uri: getMediaUrl(up.media_file) }}
                    className="w-32 h-32 rounded-lg m-1 bg-gray-100"
                    resizeMode="cover"
                  />
                ) : up.media_type === "video" ? (
                  <View
                    key={up.id}
                    className="w-32 h-32 m-1 rounded-lg overflow-hidden bg-black/10 border border-gray-300 items-center justify-center"
                  >
                    <Video
                      source={{ uri: getMediaUrl(up.media_file) }}
                      style={{ width: 120, height: 120 }}
                      useNativeControls
                      resizeMode={ResizeMode.CONTAIN}
                    />
                  </View>
                ) : null
              )}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
