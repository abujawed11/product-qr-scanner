// app/(main)/warranty/claim-status.tsx

import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

// Sample mock data; replace with your API logic!
const sampleClaims = [
  {
    id: "WC-00123",
    kit_id: "KIT_12345",
    date: "2024-06-05",
    status: "Pending",
    description: "Loose connection detected in Kit 12345.",
  },
  {
    id: "WC-00124",
    kit_id: "KIT_67890",
    date: "2024-05-21",
    status: "Approved",
    description: "Panel overheating in Kit 67890.",
  },
  {
    id: "WC-00125",
    kit_id: "KIT_676761",
    date: "2024-04-19",
    status: "Rejected",
    description: "No defect found.",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Pending": "#facc15",
  "Approved": "#22c55e",
  "Rejected": "#f87171",
};

export default function ClaimStatusScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState<typeof sampleClaims>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate API loading!
    setTimeout(() => {
      setClaims(sampleClaims);
      setIsLoading(false);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setClaims(sampleClaims);
      setRefreshing(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#facc15" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 14 }}>
      <FlatList
        data={claims}
        keyExtractor={(item) => item.id}
        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
        ListEmptyComponent={
          <Text style={{ color: "#fff", textAlign: "center", marginTop: 42, fontSize: 16 }}>No claims found.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#18181b",
              borderRadius: 16,
              padding: 18,
              marginBottom: 14,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              borderLeftWidth: 6,
              borderLeftColor: STATUS_COLORS[item.status] ?? "#fff",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
                {item.kit_id}
              </Text>
              <Text style={{ color: "#a1a1aa", fontWeight: "bold", fontSize: 13 }}>
                {item.date}
              </Text>
            </View>
            <Text style={{ color: "#d4d4d8", flexShrink: 1, marginBottom: 7 }}>{item.description}</Text>
            <Text
              style={{
                color: STATUS_COLORS[item.status] ?? "#fff",
                fontWeight: "bold",
                alignSelf: "flex-end",
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
