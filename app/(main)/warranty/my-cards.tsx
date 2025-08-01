// import { WarrantyCard } from "@/components/WarrantyCard"; // Adjust import if different location
// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { router, useFocusEffect } from "expo-router";
// import React from "react";
// import { BackHandler, ScrollView, View } from "react-native";
// import { ActivityIndicator, Text } from "react-native-paper";

// type WarrantyCardDetail = {
//   war_card_id: string;
//   certificate_no: string;
//   warranty_type: string;
//   expires_at: string;
//   warranty_started_at: string;
//   warranty_duration_months: number;
//   serial_number?: string;
//   coverage_description?: string;
//   is_transferable: boolean;
//   issued_at: string;
//   terms_document_url?: string;
//   // ...add other fields as per your WarrantyCard component
// };

// export default function MyWarrantyCardsScreen() {
//   const { user } = useAuth()

//   const { data: cards, isLoading, isError, error } = useQuery<WarrantyCardDetail[]>({
//     queryKey: ["myWarrantyCards"],
//     queryFn: async () => {
//       // Backend already uses request.user, so no need to pass client_id
//       const res = await api.get("/warranty-cards/my/");
//       return res.data;
//     },
//   });

//     useFocusEffect(
//       React.useCallback(() => {
//         const onBackPress = () => {
//           router.replace("/(main)/dashboard");
//           return true;
//         };
//         const subscription = BackHandler.addEventListener(
//           "hardwareBackPress",
//           onBackPress
//         );
//         return () => subscription.remove();
//       }, [])
//     );

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <ActivityIndicator />
//         <Text>Loading warranty cards...</Text>
//       </View>
//     );
//   }
//   if (isError) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <Text className="text-red-500">Failed to load warranty cards</Text>
//         <Text className="text-xs">{String(error)}</Text>
//       </View>
//     );
//   }
//   if (!cards || cards.length === 0) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <Text className="text-lg text-black">No warranty cards found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-gray-50 px-2 py-4">
//       {/* <Text className="text-xl font-bold text-black mb-4 text-center tracking-wide">
//         My Warranty Cards
//       </Text> */}
//       {cards.map((card) => (
//         <WarrantyCard key={card.war_card_id} card={card} />
//       ))}
//     </ScrollView>
//   );
// }


// import { WarrantyCard } from "@/components/WarrantyCard"; // Adjust import if different location
// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { router, useFocusEffect } from "expo-router";
// import React from "react";
// import { BackHandler, ScrollView, View } from "react-native";
// import { ActivityIndicator, Text } from "react-native-paper";

// type WarrantyCardDetail = {
//   war_card_id: string;
//   certificate_no: string;
//   warranty_type: string;
//   expires_at: string;
//   warranty_started_at: string;
//   warranty_duration_months: number;
//   serial_number?: string;
//   coverage_description?: string;
//   is_transferable: boolean;
//   issued_at: string;
//   terms_document_url?: string;
// };

// export default function MyWarrantyCardsScreen() {
//   const { user } = useAuth();

//   const { data: cards, isLoading, isError, error } = useQuery<WarrantyCardDetail[]>({
//     queryKey: ["myWarrantyCards"],
//     queryFn: async () => {
//       const res = await api.get("/warranty-cards/my/");
//       return res.data;
//     },
//   });

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace("/(main)/dashboard");
//         return true;
//       };
//       const subscription = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );
//       return () => subscription.remove();
//     }, [])
//   );

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100">
//         <ActivityIndicator />
//         <Text className="text-black">Loading warranty cards...</Text>
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100 px-4">
//         <Text className="text-red-500">Failed to load warranty cards</Text>
//         <Text className="text-xs text-black">{String(error)}</Text>
//       </View>
//     );
//   }

//   if (!cards || cards.length === 0) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100">
//         <Text className="text-lg text-black">No warranty cards found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-yellow-100 px-2 py-4">
//       {cards.map((card) => (
//         <WarrantyCard key={card.war_card_id} card={card} />
//       ))}
//     </ScrollView>
//   );
// }



// import { WarrantyCard } from "@/components/WarrantyCard";
// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { router, useFocusEffect } from "expo-router";
// import React, { useCallback, useState } from "react";
// import {
//   BackHandler,
//   ScrollView,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { ActivityIndicator, Text } from "react-native-paper";

// // Types
// type WarrantyCardDetail = {
//   war_card_id: string;
//   certificate_no: string;
//   warranty_type: string;
//   expires_at: string;
//   warranty_started_at: string;
//   warranty_duration_months: number;
//   serial_number?: string;
//   coverage_description?: string;
//   is_transferable: boolean;
//   issued_at: string;
//   terms_document_url?: string;
// };

// // Extracts the last dash segment as project_id
// function extractProjectId(certificateNo: string): string {
//   const parts = certificateNo.split("-");
//   return parts[parts.length - 1];
// }

// // Groups cards by project_id
// function groupByProjectId(cards: WarrantyCardDetail[]): Record<string, WarrantyCardDetail[]> {
//   return cards.reduce((acc, card) => {
//     const projectId = extractProjectId(card.certificate_no);
//     if (!acc[projectId]) acc[projectId] = [];
//     acc[projectId].push(card);
//     return acc;
//   }, {} as Record<string, WarrantyCardDetail[]>);
// }

// export default function MyWarrantyCardsScreen() {
//   const { user } = useAuth();
//   const { data: cards, isLoading, isError, error } = useQuery<WarrantyCardDetail[]>({
//     queryKey: ["myWarrantyCards"],
//     queryFn: async () => {
//       const res = await api.get("/warranty-cards/my/");
//       return res.data;
//     },
//   });

//   useFocusEffect(
//     useCallback(() => {
//       const onBackPress = () => {
//         router.replace("/(main)/dashboard");
//         return true;
//       };
//       const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100">
//         <ActivityIndicator />
//         <Text className="text-black">Loading warranty cards...</Text>
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100 px-4">
//         <Text className="text-red-500">Failed to load warranty cards</Text>
//         <Text className="text-xs text-black">{String(error)}</Text>
//       </View>
//     );
//   }

//   if (!cards || cards.length === 0) {
//     return (
//       <View className="flex-1 items-center justify-center bg-yellow-100">
//         <Text className="text-lg text-black">No warranty cards found.</Text>
//       </View>
//     );
//   }

//   // Group cards by project
//   const grouped = groupByProjectId(cards);
//   const projectIds = Object.keys(grouped);

//   return (
//     <ScrollView className="flex-1 bg-yellow-100 px-2 py-4">
//       {projectIds.map((projectId) => (
//         <View
//           key={projectId}
//           style={{
//             marginBottom: 22,
//             backgroundColor: "#FFFDEB",
//             borderRadius: 16,
//             borderWidth: 1,
//             borderColor: "#ffe9a1",
//             overflow: "hidden",
//           }}
//         >
//           {/* Project group header */}
//           <TouchableOpacity
//             onPress={() => setExpanded((cur) => ({ ...cur, [projectId]: !cur[projectId] }))}
//             style={{
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               backgroundColor: "#ffe370",
//             }}
//           >
//             <Text style={{ fontWeight: "bold", color: "#946100", fontSize: 17 }}>
//               🏗️ Project ID: {projectId}
//             </Text>
//             <Text style={{ fontSize: 20, color: "#D1A700", fontWeight: "bold" }}>
//               {expanded[projectId] ? "−" : "+"}
//             </Text>
//           </TouchableOpacity>
//           {expanded[projectId] && (
//             <View style={{ paddingHorizontal: 8, paddingTop: 7, paddingBottom: 2 }}>
//               {grouped[projectId].map((card) => (
//                 <WarrantyCard key={card.war_card_id} card={card} />
//               ))}
//             </View>
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }


import { WarrantyCard } from "@/components/WarrantyCard";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  BackHandler,
  ScrollView,
  TouchableOpacity,
  View,
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

// Groups cards by project_id and then kit_id (here, kit_id = serial_number)
function groupByProjectAndKit(cards: WarrantyCardDetail[]): Record<string, Record<string, WarrantyCardDetail[]>> {
  return cards.reduce((acc, card) => {
    const projectId = extractProjectId(card.certificate_no);
    const kitId = card.serial_number || "Unknown"; // serial_number as kit_id
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
      <View className="flex-1 items-center justify-center bg-yellow-100">
        <ActivityIndicator />
        <Text className="text-black">Loading warranty cards...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-yellow-100 px-4">
        <Text className="text-red-500">Failed to load warranty cards</Text>
        <Text className="text-xs text-black">{String(error)}</Text>
      </View>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-yellow-100">
        <Text className="text-lg text-black">No warranty cards found.</Text>
      </View>
    );
  }

  // Group cards: { [projectId]: { [kitId]: WarrantyCardDetail[] } }
  const grouped = groupByProjectAndKit(cards);
  const projectIds = Object.keys(grouped);

  return (
    <ScrollView className="flex-1 bg-yellow-100 px-2 py-4">
      {projectIds.map(projectId => (
        <View
          key={projectId}
          style={{
            marginBottom: 20,
            backgroundColor: "#FFFDEB",
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "#ffe9a1",
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
              backgroundColor: "#ffe370",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#946100", fontSize: 16 }}>
              🏗️ Project ID: {projectId}
            </Text>
            <Text style={{ fontSize: 19, color: "#D1A700", fontWeight: "bold" }}>
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
                      backgroundColor: "#fff5ca",
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ color: "#bf9000", fontWeight: "bold", fontSize: 15 }}>
                      🧩 Kit ID: {kitId}
                    </Text>
                    <Text style={{ color: "#ab9100", fontSize: 16, fontWeight: "bold" }}>
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
  );
}
