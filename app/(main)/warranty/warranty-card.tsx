// import { WarrantyCard } from "@/components/WarrantyCard";
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
// import React from "react";
// import { BackHandler, Text } from "react-native";

// export default function WarrantyCardDetailScreen() {


//     useFocusEffect(
//         React.useCallback(() => {
//             const onBackPress = () => {
//                 router.replace("/(main)/warranty");
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener(
//                 "hardwareBackPress",
//                 onBackPress
//             );
//             return () => subscription.remove();
//         }, [])
//     );

//     const { war_req_id } = useLocalSearchParams();

//     const { data: card, isLoading, isError } = useQuery({
//         queryKey: ["warrantyCard", war_req_id],
//         queryFn: async () => {
//             const res = await api.get(`/warranty-cards/by-claim/${war_req_id}/`);
//             return res.data;
//         },
//         enabled: !!war_req_id,
//     });

//     if (isLoading) return <Text>Loading...</Text>;
//     if (isError || !card)
//         return <Text className="text-red-400">Card not found or not available.</Text>;

//     return <WarrantyCard card={card} />;
// }


import { WarrantyCard } from "@/components/WarrantyCard";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React from "react";
import { BackHandler, Text, View } from "react-native";

export default function WarrantyCardDetailScreen() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(main)/warranty");
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const { war_req_id } = useLocalSearchParams();

  const { data: card, isLoading, isError } = useQuery({
    queryKey: ["warrantyCard", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-cards/by-claim/${war_req_id}/`);
      return res.data;
    },
    enabled: !!war_req_id,
  });

  return (
    <View className="flex-1 bg-yellow-100 px-4 py-4">
      {isLoading && <Text>Loading...</Text>}
      {(isError || !card) && (
        <Text className="text-red-400">Card not found or not available.</Text>
      )}
      {card && <WarrantyCard card={card} />}
    </View>
  );
}