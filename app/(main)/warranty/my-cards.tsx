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


import { WarrantyCard } from "@/components/WarrantyCard"; // Adjust import if different location
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import { BackHandler, ScrollView, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

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
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(main)/dashboard");
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

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

  return (
    <ScrollView className="flex-1 bg-yellow-100 px-2 py-4">
      {cards.map((card) => (
        <WarrantyCard key={card.war_card_id} card={card} />
      ))}
    </ScrollView>
  );
}