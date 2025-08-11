
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

type ClientRow = {
  client__client_id: string;
  client__company_name: string;
};

export default function WarrantyClientsScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredData = useMemo(() => {
    if (!data) return [];
    const term = search.toLowerCase().trim();
    if (!term) return data;
    return data.filter(
      row =>
        row.client__company_name.toLowerCase().includes(term) ||
        row.client__client_id.toLowerCase().includes(term)
    );
  }, [data, search]);

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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading clients...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#EF4444", fontWeight: "bold" }}>
          Failed to fetch clients:
        </Text>
        <Text style={{ fontSize: 12, color: "#666" }}>{String(error)}</Text>
      </View>
    );
  }

  if (!data || !data.length) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBE9" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 16 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <Text style={{ fontSize: 56 }}>🗃️</Text>
              <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 20, marginTop: 8 }}>
                No clients found
              </Text>
              <Text style={{ color: "#866", marginTop: 6, fontSize: 15 }}>
                No warranty claims yet.
              </Text>
              <Text style={{ color: "#FAD90E", fontSize: 12, fontStyle: "italic", marginTop: 10 }}>
                ↓ Pull down to refresh
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBE9" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyboardShouldPersistTaps="handled"
        >
          {/* Banner Header */}
          <View style={{
            backgroundColor: "#FAD90E",
            borderRadius: 18,
            marginBottom: 12,
            paddingHorizontal: 14,
            paddingVertical: 2,
            alignItems: "center",
            alignSelf: "center",
            minWidth: 160,
            maxWidth: 300,
          }}>
            <Text style={{
              color: "#222",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: 0.3
            }}>
              Clients with Warranty Request
            </Text>
          </View>

          {/* Search Bar */}
          <View style={{
            backgroundColor: "#fff",
            borderColor: "#FAD90E",
            borderWidth: 2,
            borderRadius: 12,
            marginBottom: 14,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 4,
          }}>
            <Text style={{ fontSize: 18, color: "#FAD90E" }}>🔎</Text>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by name or ID"
              placeholderTextColor="#AFAA79"
              style={{
                flex: 1,
                marginLeft: 8,
                color: "#222",
                fontSize: 16,
                paddingVertical: 6,
              }}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")} style={{ padding: 4, marginLeft: 6 }}>
                <Text style={{ fontSize: 16, color: "#FAD90E" }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Badge */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
            <Text style={{
              backgroundColor: "#FAD90E",
              borderRadius: 11,
              paddingHorizontal: 12,
              paddingVertical: 3,
              color: "#333",
              fontWeight: "bold",
              fontSize: 13,
              overflow: "hidden",
              shadowColor: "#FAD90E",
              shadowRadius: 2,
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 1 },
            }}>
              {filteredData.length} {filteredData.length === 1 ? "client" : "clients"}
            </Text>
          </View>

          {/* Client List */}
          {filteredData.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ fontSize: 44, color: "#FAD90E" }}>😕</Text>
              <Text style={{ fontSize: 18, color: "#222", fontWeight: "bold", marginTop: 8 }}>No matching clients</Text>
              <Text style={{ color: "#AFAA79", marginTop: 4, fontSize: 15 }}>Try a different search.</Text>
            </View>
          ) : (
            filteredData.map((row) => (
              <TouchableOpacity
                key={row.client__client_id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFF",
                  borderLeftWidth: 6,
                  borderLeftColor: "#FAD90E",
                  borderRadius: 12,
                  marginBottom: 14,
                  paddingVertical: 15,
                  paddingHorizontal: 18,
                  shadowColor: "#FAD90E",
                  shadowOpacity: 0.08,
                  shadowRadius: 6,
                  elevation: 2,
                }}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "/(adminDashboard)/warranty-orders",
                    params: {
                      client_id: row.client__client_id,
                      client_name: row.client__company_name,
                    },
                  })
                }
              >
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "#FAD90E",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 13,
                  elevation: 1,
                }}>
                  <Text style={{
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: 23,
                    textTransform: "uppercase",
                  }}>
                    {row.client__company_name ? row.client__company_name.charAt(0) : "?"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16, color: "#222" }}>
                    {row.client__company_name}
                  </Text>
                  <Text style={{
                    color: "#AFAA79",
                    fontSize: 12,
                    marginTop: 2,
                    letterSpacing: 0.3,
                  }}>
                    ID: {row.client__client_id}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}

          <Text style={{
            color: "#FAD90E",
            fontSize: 12,
            fontStyle: "italic",
            textAlign: 'center',
            marginTop: 20
          }}>
            ↓ Pull down to refresh list
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}