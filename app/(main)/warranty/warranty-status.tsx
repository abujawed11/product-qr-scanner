
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// --- TYPES ---
type WarrantyClaim = {
  war_req_id: string;
  order: { order_id: string } | null;
  project_id?: string;
  kit_id: string;
  status: string;
  status_updated_at: string;
  review_comment?: string | null;
  created_at: string;
  kit_number: string;
};

// --- STATUS COLORS/labels ---
const STATUS_DISPLAY: Record<
  string,
  { label: string; color: string; faded: string }
> = {
  pending: { label: "Pending", color: "#FAD90E", faded: "#0a0a0a" },
  under_review: { label: "Under Review", color: "#FAD90E", faded: "#0a0a0a" },
  approved: { label: "Approved", color: "#FAD90E", faded: "#0a0a0a" },
  rejected: { label: "Rejected", color: "#FAD90E", faded: "#0a0a0a" },
  cancelled: { label: "Cancelled", color: "#FAD90E", faded: "#0a0a0a" },
};

// --- GROUPING ---
function groupBy<T, K extends string>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ClaimStatusScreen() {
  const [expandedProject, setExpandedProject] = useState<Record<string, boolean>>({});
  const [expandedKit, setExpandedKit] = useState<Record<string, boolean>>({});

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(main)/dashboard");
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const {
    data: claims = [],
    isLoading,
    isRefetching: refreshing,
    isError,
    refetch,
  } = useQuery<WarrantyClaim[]>({
    queryKey: ["myWarrantyClaims"],
    queryFn: async () => {
      const res = await api.get<WarrantyClaim[]>("/warranty-claims-status/");
      return res.data;
    },
  });

  const groupedByProject = groupBy(
    claims,
    (claim) => claim.project_id || claim.order?.order_id || "Unknown"
  );
  const projectIds = Object.keys(groupedByProject);

  const onRefresh = () => refetch();

  const toggleProject = (projectId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedProject((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const toggleKit = (projectId: string, kitId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const key = `${projectId}|${kitId}`;
    setExpandedKit((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FAD90E" />
        <Text style={{ color: "#FAD90E", marginTop: 16, fontWeight: "bold" }}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
        <Text style={{ color: "#F87171", fontSize: 16, marginBottom: 16, fontWeight: "bold" }}>
          Could not load warranty requests.
        </Text>
        <TouchableOpacity
          onPress={onRefresh}
          style={{ backgroundColor: "#FAD90E", borderRadius: 16, paddingHorizontal: 24, paddingVertical: 12 }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "black", padding: 16 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {projectIds.length === 0 ? (
        <Text style={{ color: "#999", textAlign: "center", marginTop: 64, fontSize: 18, fontWeight: "600" }}>
          No warranty Request found.
        </Text>
      ) : (
        projectIds.map((projectId) => {
          const claimsForProject = groupedByProject[projectId] || [];
          const groupedByKit = groupBy(claimsForProject, (claim) => claim.kit_id ?? "Unknown");
          const kitIds = Object.keys(groupedByKit);

          return (
            <View
              key={projectId}
              style={{
                marginBottom: 24,
                backgroundColor: "#111",
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#222",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleProject(projectId)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#111",
                }}
              >
                <View>
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                    Project ID: <Text style={{ fontWeight: "bold" }}>{projectId}</Text>
                  </Text>
                  <Text style={{ color: "#bbb", fontSize: 14 }}>
                    Warranty Requests: <Text style={{ fontWeight: "bold" }}>{claimsForProject.length}</Text>
                  </Text>
                </View>
                <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
                  {expandedProject[projectId] ? "▾" : "▸"}
                </Text>
              </TouchableOpacity>

              {expandedProject[projectId] && (
                <View style={{ backgroundColor: "#1a1a1a", paddingTop: 8, paddingBottom: 8, paddingHorizontal: 8 }}>
                  {kitIds.map((kitId) => {
                    const kitKey = `${projectId}|${kitId}`;
                    const claimsForKit = groupedByKit[kitId] || [];
                    return (
                      <View key={kitKey} style={{ marginBottom: 18 }}>
                        <TouchableOpacity
                          onPress={() => toggleKit(projectId, kitId)}
                          activeOpacity={0.8}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                          }}
                        >
                          <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 16 }}>
                            🧩 Kit ID: <Text style={{ color: "#fff", fontWeight: "bold" }}>{kitId}</Text>
                          </Text>
                          <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 18 }}>
                            {expandedKit[kitKey] ? "▼" : "►"}
                          </Text>
                        </TouchableOpacity>

                        {expandedKit[kitKey] && (
                          <View>
                            {claimsForKit.map((claim, idx) => {
                              const statusObj = STATUS_DISPLAY[claim.status] ?? {
                                label: claim.status,
                                color: "#FAD90E",
                                faded: "#111",
                              };
                              return (
                                <View
                                  key={claim.war_req_id}
                                  style={{
                                    marginBottom: 12,
                                    borderLeftWidth: 5,
                                    borderLeftColor: statusObj.color,
                                    borderRadius: 8,
                                    backgroundColor: "#1e1e1e",
                                    paddingVertical: 12,
                                    paddingHorizontal: 16,
                                  }}
                                >
                                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                                      Request: <Text style={{ fontWeight: "bold", color: "#FAD90E" }}>{claim.war_req_id}</Text>
                                    </Text>
                                    <View
                                      style={{
                                        borderRadius: 12,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        backgroundColor: "#111",
                                        borderWidth: 1,
                                        borderColor: statusObj.color,
                                      }}
                                    >
                                      <Text style={{ fontWeight: "bold", fontSize: 12, color: statusObj.color }}>
                                        {statusObj.label}
                                      </Text>
                                    </View>
                                  </View>
                                  <Text style={{ color: "#ddd", marginBottom: 2 }}>
                                    Kit Number:
                                    <Text style={{ color: "#FAD90E", fontWeight: "600" }}> {claim.kit_number}</Text>
                                  </Text>
                                  <Text style={{ color: "#aaa", fontSize: 12, marginBottom: 2 }}>
                                    Last Updated: {new Date(claim.status_updated_at).toLocaleString()}
                                  </Text>
                                  {claim.review_comment ? (
                                    <View style={{ backgroundColor: "#111", borderColor: "#F87171", borderWidth: 1, borderRadius: 8, marginTop: 8, marginBottom: 4, paddingHorizontal: 10, paddingVertical: 6 }}>
                                      <Text style={{ color: "#F87171", fontWeight: "bold", fontSize: 12, marginBottom: 2 }}>
                                        Reviewer Comment
                                      </Text>
                                      <Text style={{ color: "#F87171", fontStyle: "italic", fontSize: 13 }}>
                                        {claim.review_comment}
                                      </Text>
                                    </View>
                                  ) : null}
                                  <Text style={{ color: "#aaa", fontSize: 12 }}>
                                    Submitted: {new Date(claim.created_at).toLocaleString()}
                                  </Text>
                                  <View style={{ flexDirection: "row", marginTop: 10, gap: 20 }}>
                                    <TouchableOpacity
                                      style={{ backgroundColor: "#FAD90E", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignItems: "center" }}
                                      activeOpacity={0.9}
                                      onPress={() => {
                                        router.push({
                                          pathname: "/(main)/warranty/warranty-status-page",
                                          params: { war_req_id: claim.war_req_id },
                                        });
                                      }}
                                    >
                                      <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
                                        View Details
                                      </Text>
                                    </TouchableOpacity>
                                    {claim.status === "approved" && (
                                      <TouchableOpacity
                                        style={{ backgroundColor: "#fff", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignItems: "center" }}
                                        activeOpacity={0.9}
                                        onPress={() => {
                                          router.push({
                                            pathname: "/(main)/warranty/warranty-card",
                                            params: { war_req_id: claim.war_req_id },
                                          });
                                        }}
                                      >
                                        <Text style={{ fontWeight: "bold", color: "black", fontSize: 15 }}>
                                          View Card
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                  {idx !== claimsForKit.length - 1 && (
                                    <View style={{ height: 1, backgroundColor: "#333", opacity: 0.4, marginTop: 12 }} />
                                  )}
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}