// // app/(adminDashboard)/warranty-requests.tsx
// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { ActivityIndicator } from "react-native-paper";

// type WarrantyReqRow = {
//   war_req_id: string;
//   status: string;
//   created_at: string;
//   kit_number?: string;
//   pdf_url?: string;
//   review_comment?: string;
//   company_name?: string;
//   // add other fields as needed
// };

// export default function WarrantyRequestsScreen() {
//   const { order_id, client_id, client_name } = useLocalSearchParams<{
//     order_id: string;
//     client_id?: string;
//     client_name?: string;
//   }>();
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch
//   } = useQuery<WarrantyReqRow[]>({
//     queryKey: ["warrantyRequests", order_id],
//     queryFn: async () => {
//       const res = await api.get(`/warranty-claims-by-order/?order_id=${order_id}`);
//       return res.data;
//     },
//     enabled: !!order_id,
//   });

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try { await refetch(); }
//     finally { setRefreshing(false); }
//   }, [refetch]);

//   if (!order_id)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-red-500">No order selected.</Text>
//       </View>
//     );

//   if (isLoading)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator />
//         <Text>Loading warranty requests...</Text>
//       </View>
//     );

//   if (isError)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-red-500">Failed to fetch warranty requests:</Text>
//         <Text className="text-xs">{String(error)}</Text>
//       </View>
//     );

//   if (!data || !data.length)
//     return (
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-gray-500">No warranty requests found for this order.</Text>
//         <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
//       </View>
//     );

//   return (
//     <View className="flex-1 bg-gray-50 p-4">
//       <Text className="text-xl font-bold mb-4 text-center">
//         Warranty Requests for Order {order_id}
//       </Text>
//       <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
//         {data.map((req,index) => (
//           <View key={index} className="bg-white rounded-lg py-4 px-5 mb-3 shadow">
//             <Text className="font-bold text-lg">Claim #{req.war_req_id}</Text>
//             <Text>
//               Status: <Text className="text-blue-700">{req.status}</Text>
//             </Text>
//             <Text>
//               Created:{" "}
//               <Text className="text-gray-500">
//                 {new Date(req.created_at).toLocaleString()}
//               </Text>
//             </Text>
//             {req.kit_number && (
//               <Text>
//                 Kit #: <Text>{req.kit_number}</Text>
//               </Text>
//             )}
//             {req.company_name && (
//               <Text>
//                 Company: <Text>{req.company_name}</Text>
//               </Text>
//             )}
//             {req.pdf_url && (
//               <TouchableOpacity onPress={() => req.pdf_url && Linking.openURL(req.pdf_url)}>
//                 <Text className="text-blue-600 underline mt-2">Open Claim PDF</Text>
//               </TouchableOpacity>
//             )}
//             {req.review_comment && (
//               <Text className="text-gray-700 mt-2">Admin Comment: {req.review_comment}</Text>
//             )}
//             {/* You can add a button for details, approve, etc. */}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }


// import api from "@/utils/api";
// import { doc_url } from "@/utils/constants";
// import { useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { Alert, Linking, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { ActivityIndicator, Button } from "react-native-paper";

// type WarrantyReqRow = {
//     war_req_id: string;
//     status: string;
//     created_at: string;
//     kit_number?: string;
//     pdf_url?: string;
//     review_comment?: string;
//     company_name?: string;
// };

// // function getAbsolutePdfUrl(pdf_url?: string): string | undefined {
// //   if (!pdf_url) return undefined;
// //   // If already absolute, return as is
// //   if (pdf_url.startsWith("http")) return pdf_url;
// //   // If starts with /, treat as media path
// //   // Prefer using process.env.BASE_URL, your api.defaults.baseURL, or hardcoded for dev
// //   const API_BASE = api.defaults.baseURL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";
// //   if (pdf_url.startsWith("/")) return `${API_BASE}${pdf_url}`;
// //   return `${API_BASE}/media/${pdf_url}`;
// // }

// // function getAbsolutePdfUrl(pdf_url?: string): string | undefined {
// //     if (!pdf_url) return undefined;
// //     if (pdf_url.startsWith("http")) return pdf_url;
// //     // Always use your site ROOT, not the API prefix!
// //     // Use window.location.origin (in web) or manually set the root (in Expo)
// //     // Remove "/api" if baseURL includes it.
// //     // For local/test: use the host and port directly!
// //     const SITE_BASE = "http://10.20.2.78:8000";
// //     if (pdf_url.startsWith("/")) return `${SITE_BASE}${pdf_url}`;
// //     return `${SITE_BASE}/media/${pdf_url}`;
// // }


// // function getAbsolutePdfUrl(pdf_url?: string): string | undefined {
// //     if (!pdf_url) return undefined;
// //     if (pdf_url.startsWith("http")) return pdf_url;
// //     // If the pdf_url already starts with /media/, just add SITE_BASE
// //     // const SITE_BASE = "http://10.20.2.78:8000";
// //     const SITE_BASE = doc_url;
// //     if (pdf_url.startsWith("/media/")) return SITE_BASE + pdf_url;
// //     // If it starts with / and NOT /media/, prefix /media
// //     if (pdf_url.startsWith("/")) return SITE_BASE + "/media" + pdf_url;
// //     // If it does not start with /, add /media/ at the front.
// //     return `${SITE_BASE}/media/${pdf_url}`;
// // }

// function joinUrl(base: string, path: string): string {
//     return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
// }

// function getAbsolutePdfUrl(pdf_url?: string): string | undefined {
//     if (!pdf_url || pdf_url === "") return undefined;
//     if (pdf_url.startsWith("http")) return pdf_url;
//     if (pdf_url.startsWith("/media/")) return joinUrl(doc_url, pdf_url);
//     if (pdf_url.startsWith("/")) return joinUrl(doc_url, "/media" + pdf_url);
//     return joinUrl(doc_url, "/media/" + pdf_url);
// }



// export default function WarrantyRequestsScreen() {
//     const router = useRouter();
//     const { order_id, client_id, client_name } = useLocalSearchParams<{
//         order_id: string;
//         client_id?: string;
//         client_name?: string;
//     }>();
//     const [refreshing, setRefreshing] = useState(false);

//     const {
//         data,
//         isLoading,
//         isError,
//         error,
//         refetch
//     } = useQuery<WarrantyReqRow[]>({
//         queryKey: ["warrantyRequests", order_id],
//         queryFn: async () => {
//             const res = await api.get(`/warranty-claims-by-order/?order_id=${order_id}`);
//             return res.data;
//         },
//         enabled: !!order_id,
//     });

//     const onRefresh = useCallback(async () => {
//         setRefreshing(true);
//         try { await refetch(); }
//         finally { setRefreshing(false); }
//     }, [refetch]);

//     // --- Debug logging ---
//     console.log("WarrantyRequestsScreen params:", { order_id, client_id, client_name });
//     console.log("WarrantyRequestsScreen data:", data);
//     console.log("WarrantyRequestsScreen error:", isError, error);

//     if (!order_id)
//         return (
//             <View className="flex-1 items-center justify-center">
//                 <Text className="text-red-500">No order selected.</Text>
//             </View>
//         );

//     if (isLoading)
//         return (
//             <View className="flex-1 items-center justify-center">
//                 <ActivityIndicator />
//                 <Text>Loading warranty requests...</Text>
//             </View>
//         );

//     if (isError)
//         return (
//             <View className="flex-1 items-center justify-center">
//                 <Text className="text-red-500">Failed to fetch warranty requests:</Text>
//                 <Text className="text-xs">{String(error)}</Text>
//             </View>
//         );

//     if (!data || !data.length)
//         return (
//             <View className="flex-1 items-center justify-center">
//                 <Text className="text-gray-500">No warranty requests found for this order.</Text>
//                 <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
//             </View>
//         );

//     // Helper to handle PDF open + debug
//     async function handleOpenPdf(pdf_url?: string) {
//         const absUrl = getAbsolutePdfUrl(pdf_url);
//         console.log("PDF link to open:", pdf_url, "Absolute:", absUrl);

//         if (!absUrl) {
//             Alert.alert("PDF not available");
//             return;
//         }
//         const supported = await Linking.canOpenURL(absUrl);
//         if (!supported) {
//             Alert.alert("Cannot open PDF URL", absUrl);
//             return;
//         }
//         Linking.openURL(absUrl);
//     }

//     return (
//         <View className="flex-1 bg-gray-50 p-4">
//             <Text className="text-xl font-bold mb-4 text-center">
//                 Warranty Requests for Order {order_id}
//             </Text>
//             <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
//                 {data.map((req, index) => (
//                     <View key={req.war_req_id ?? index} className="bg-white rounded-lg py-4 px-5 mb-3 shadow">
//                         <Text className="font-bold text-lg">Claim #{req.war_req_id}</Text>
//                         <Text>
//                             Status: <Text className="text-blue-700">{req.status}</Text>
//                         </Text>
//                         <Text>
//                             Created:{" "}
//                             <Text className="text-gray-500">
//                                 {new Date(req.created_at).toLocaleString()}
//                             </Text>
//                         </Text>
//                         {req.kit_number && (
//                             <Text>
//                                 Kit #: <Text>{req.kit_number}</Text>
//                             </Text>
//                         )}
//                         {req.company_name && (
//                             <Text>
//                                 Company: <Text>{req.company_name}</Text>
//                             </Text>
//                         )}
//                         {req.pdf_url && (
//                             <TouchableOpacity onPress={() => handleOpenPdf(req.pdf_url)}>
//                                 <Text className="text-blue-600 underline mt-2">Open Claim PDF</Text>
//                             </TouchableOpacity>
//                         )}
//                         {req.review_comment && (
//                             <Text className="text-gray-700 mt-2">Admin Comment: {req.review_comment}</Text>
//                         )}
//                         <Button
//                             className="mt-4"
//                             mode="contained"
//                             onPress={() =>
//                                 router.push({
//                                     pathname: "/(adminDashboard)/review-req-warranty",
//                                     params: { war_req_id: req.war_req_id },
//                                 })
//                             }
//                         >
//                             Review Claim
//                         </Button>
//                     </View>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// }


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

