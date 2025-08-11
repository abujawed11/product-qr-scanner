
import { WarrantyCard } from "@/components/WarrantyCard";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

// Types
type WarrantyCardDetail = {
  war_card_id: string;
  certificate_no: string;
  warranty_type: string;
  expires_at: string;
  warranty_started_at: string;
  warranty_duration_months: number;
  serial_number?: string;
  coverage_description?: string;
  is_transferable: boolean;
  issued_at: string;
  terms_document_url?: string;
};

// Extracts the last dash segment as project_id from certificate_no
function extractProjectId(certificateNo: string): string {
  const parts = certificateNo.split("-");
  return parts[parts.length - 1];
}

// Groups cards by project_id and then kit_id
function groupByProjectAndKit(cards: WarrantyCardDetail[]): Record<string, Record<string, WarrantyCardDetail[]>> {
  return cards.reduce((acc, card) => {
    const projectId = extractProjectId(card.certificate_no);
    const kitId = card.serial_number || "Unknown";
    if (!acc[projectId]) acc[projectId] = {};
    if (!acc[projectId][kitId]) acc[projectId][kitId] = [];
    acc[projectId][kitId].push(card);
    return acc;
  }, {} as Record<string, Record<string, WarrantyCardDetail[]>>);
}

export default function MyWarrantyCardsScreen() {
  const { user } = useAuth();
  const { data: cards, isLoading, isError, error } = useQuery<WarrantyCardDetail[]>({
    queryKey: ["myWarrantyCards"],
    queryFn: async () => {
      const res = await api.get("/warranty-cards/my/");
      return res.data;
    },
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(main)/dashboard");
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const [expandedProj, setExpandedProj] = useState<Record<string, boolean>>({});
  const [expandedKit, setExpandedKit] = useState<Record<string, boolean>>({});

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="#FAD90E" />
        <Text style={{ color: "#FAD90E" }}>Loading warranty cards...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text style={{ color: "#FF4C4C" }}>Failed to load warranty cards</Text>
        <Text style={{ fontSize: 12, color: "#AAAAAA" }}>{String(error)}</Text>
      </View>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text style={{ fontSize: 18, color: "#FAD90E" }}>No warranty cards found.</Text>
      </View>
    );
  }

  const grouped = groupByProjectAndKit(cards);
  const projectIds = Object.keys(grouped);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 12, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {projectIds.map(projectId => (
            <View
              key={projectId}
              style={{
                marginBottom: 20,
                backgroundColor: "#1A1A1A",
                borderRadius: 16,
                borderWidth: 1,
                borderColor: "#333",
                overflow: "hidden",
              }}
            >
              {/* Project header */}
              <TouchableOpacity
                onPress={() => setExpandedProj(cur => ({ ...cur, [projectId]: !cur[projectId] }))}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#2B2B2B",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#FAD90E", fontSize: 16 }}>
                  🏗️ Project ID: {projectId}
                </Text>
                <Text style={{ fontSize: 19, color: "#FAD90E", fontWeight: "bold" }}>
                  {expandedProj[projectId] ? "−" : "+"}
                </Text>
              </TouchableOpacity>

              {expandedProj[projectId] && (
                <View style={{ paddingHorizontal: 8, paddingTop: 7, paddingBottom: 2 }}>
                  {Object.keys(grouped[projectId]).map(kitId => (
                    <View key={kitId} style={{ marginBottom: 9 }}>
                      {/* Kit sub-header */}
                      <TouchableOpacity
                        onPress={() => setExpandedKit(cur => ({ ...cur, [kitId]: !cur[kitId] }))}
                        style={{
                          paddingVertical: 6,
                          paddingHorizontal: 14,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#333",
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 15 }}>
                          🧩 Kit ID: {kitId}
                        </Text>
                        <Text style={{ color: "#FAD90E", fontSize: 16, fontWeight: "bold" }}>
                          {expandedKit[kitId] ? "▼" : "►"}
                        </Text>
                      </TouchableOpacity>

                      {/* Cards for this kit */}
                      {expandedKit[kitId] && (
                        <View style={{ paddingHorizontal: 2, paddingTop: 5 }}>
                          {grouped[projectId][kitId].map(card =>
                            <WarrantyCard key={card.war_card_id} card={card} />
                          )}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}