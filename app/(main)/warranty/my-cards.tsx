
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
  // New direct fields from model
  project_id?: string;
  kit_id?: string;
  client_id?: string;
  company_name?: string;
  installation_latitude?: number;
  installation_longitude?: number;
  kit_no?: string;
};

// Groups cards by project_id and then kit_id using direct model fields
function groupByProjectAndKit(cards: WarrantyCardDetail[]): Record<string, Record<string, WarrantyCardDetail[]>> {
  // console.log('📊 GROUPING WARRANTY CARDS:', cards.length, 'cards');

  return cards.reduce((acc, card) => {
    // Use direct project_id from model, fallback to "Unknown" if not available
    const projectId = card.project_id || "Unknown Project";
    // Use direct kit_id from model, fallback to serial_number, then "Unknown"
    const kitId = card.kit_id || card.serial_number || "Unknown Kit";

    // console.log(`🏗️ Card ${card.war_card_id}: project_id="${card.project_id}" → "${projectId}", kit_id="${card.kit_id}" → "${kitId}"`);

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
      // console.log('🔍 WARRANTY CARDS API RESPONSE:', JSON.stringify(res.data, null, 2));
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
                <View>
                  <Text style={{ fontWeight: "bold", color: "#FAD90E", fontSize: 16 }}>
                    🏗️ Project: {projectId}
                  </Text>
                  {/* Show company name if available */}
                  {grouped[projectId] && Object.values(grouped[projectId])[0]?.[0]?.company_name && (
                    <Text style={{ color: "#CCC", fontSize: 12, marginTop: 2 }}>
                      📍 {Object.values(grouped[projectId])[0][0].company_name}
                    </Text>
                  )}
                </View>
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
                          {grouped[projectId][kitId].map((card, index) => (
                            <View key={card.war_card_id} style={{ marginBottom: 8 }}>
                              {/* Kit Number Header - Sequential numbering like my-scans */}
                              <View style={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 6,
                                marginBottom: 4,
                                borderLeftWidth: 4,
                                borderLeftColor: "#FAD90E"
                              }}>
                                <Text style={{
                                  color: "#333",
                                  fontWeight: "bold",
                                  fontSize: 14
                                }}>
                                  📦 Kit No: {card.kit_no || "N/A"}
                                </Text>
                                <Text style={{
                                  color: "#666",
                                  fontSize: 12,
                                  marginTop: 2
                                }}>
                                  🏗️ Project: {card.project_id || "N/A"} • 🔧 Model: {card.kit_id || "N/A"}
                                </Text>
                              </View>
                              {/* Warranty Card */}
                              <WarrantyCard card={card} />
                            </View>
                          ))}
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