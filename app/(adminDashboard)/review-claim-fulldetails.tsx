// import { doc_url } from "@/utils/constants";
// import { useQuery } from "@tanstack/react-query";
// import { ResizeMode, Video } from "expo-av"; // expo-av for video preview
// import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
// import React from "react";
// import { BackHandler, Image, ScrollView, Text, View } from "react-native";
// import { ActivityIndicator } from "react-native-paper";

// import { checklistItems, claimSteps } from "@/app/(main)/warranty/claim-steps"; // adjust for your actual import path
// import api from "@/utils/api";
// // import { useFocusEffect } from "@react-navigation/native";
// // import { BackHandler } from "react-native";

// type Upload = {
//     id: number;
//     step_key: string;
//     media_type: "image" | "video";
//     media_file: string;
// };

// type ClaimDetail = {
//     war_req_id: string;
//     status: string;
//     review_comment?: string;
//     company_name: string;
//     client_id: string;
//     order_id: string;
//     kit_id: string;
//     kit_number: string;
//     project_id: string;
//     purchase_date: string | null;
//     device_latitude?: number | null;
//     device_longitude?: number | null;
//     created_at: string;
//     updated_at: string;
//     checklist_answers: Record<string, boolean>;
//     uploads: Upload[];
// };

// function getMediaUrl(media_file: string) {
//     if (media_file.startsWith("http")) return media_file;
//     if (media_file.startsWith("/media/")) return doc_url + media_file;
//     return doc_url + media_file.replace(/^\/+/, "");
// }

// export default function ReviewClaimFullDetailsScreen() {
//     const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();
//     const { from, status } = useLocalSearchParams<{ from?: string; status?: string }>();
//     const router = useRouter();

//     const { data, isLoading, isError, error } = useQuery<ClaimDetail>({
//         queryKey: ["claimDetail", war_req_id],
//         queryFn: async () => {
//             const res = await api.get(`/warranty-claims/${war_req_id}/`);
//             return res.data;
//         },
//         enabled: !!war_req_id,
//     });


//     function handleBack() {
//         if (from === "review-req-warranty-status" && status) {
//             router.replace({
//                 pathname: "/(adminDashboard)/review-req-warranty-status",
//                 params: { status },
//             });
//         } else {
//             router.back();
//         }
//     }

//     useFocusEffect(
//         React.useCallback(() => {
//             const onBackPress = () => {
//                 // Your back logic
//                 handleBack();
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
//             return () => subscription.remove();
//         }, [from, status])
//     );

//     // useFocusEffect(
//     //     React.useCallback(() => {
//     //         const onBackPress = () => {
//     //             handleBack();
//     //             return true; // prevent default back behavior
//     //         };
//     //         BackHandler.addEventListener("hardwareBackPress", onBackPress);
//     //         return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
//     //     }, [from, status])
//     // );




//     if (isLoading)
//         return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
//     if (isError || !data)
//         return <View className="flex-1 items-center justify-center"><Text className="text-red-500">{String(error) || "No data"}</Text></View>;

//     const checklistAnswers = data.checklist_answers || {};

//     return (
//         <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 18 }}>
//             {/* Basic Info Card */}
//             <View className="bg-white rounded-xl shadow px-4 py-5 mb-5">
//                 <Text className="text-lg font-extrabold">Request ID#{data.war_req_id}</Text>
//                 <Text>Status: <Text className="font-bold text-blue-700">{data.status}</Text></Text>
//                 <Text>Company: <Text className="font-bold">{data.company_name}</Text></Text>
//                 <Text>Client ID: <Text className="font-bold">{data.client_id}</Text></Text>
//                 <Text>Order ID: <Text className="font-bold">{data.order_id}</Text></Text>
//                 <Text>Kit ID: <Text className="font-bold">{data.kit_id}</Text></Text>
//                 <Text>Kit #: <Text className="font-bold">{data.kit_number}</Text></Text>
//                 <Text>Project ID: <Text className="font-bold">{data.project_id}</Text></Text>
//                 <Text>Purchase Date: <Text className="font-bold">{data.purchase_date ? new Date(data.purchase_date).toLocaleDateString() : "--"}</Text></Text>
//                 <Text>Location: <Text className="font-bold">{data.device_latitude && data.device_longitude ? `${data.device_latitude}, ${data.device_longitude}` : "--"}</Text></Text>
//                 <Text>Requested: <Text className="font-bold">{new Date(data.created_at).toLocaleString()}</Text></Text>
//                 <Text>Updated: <Text className="font-bold">{new Date(data.updated_at).toLocaleString()}</Text></Text>
//                 {data.review_comment ? (
//                     <Text>
//                         Admin Comment: <Text className="font-bold text-blue-700">{data.review_comment}</Text>
//                     </Text>
//                 ) : null}
//             </View>

//             {/* Checklist */}
//             <Text className="text-base font-semibold mb-2">Checklist Submitted by User:</Text>
//             <View className="mb-6">
//                 {checklistItems.map(item => (
//                     <View key={item.key} className="flex-row items-center mb-1">
//                         <Text className="flex-1 text-[15px]">{item.question}</Text>
//                         <Text className={`ml-2 font-bold ${checklistAnswers[item.key] ? "text-green-700" : "text-red-600"}`}>
//                             {checklistAnswers[item.key] ? "✓" : "✗"}
//                         </Text>
//                     </View>
//                 ))}
//             </View>

//             {/* Uploads By Step */}
//             <Text className="text-base font-semibold mb-2">Uploads By Step:</Text>
//             {claimSteps.map((step) => {
//                 const uploads = data.uploads?.filter(up => up.step_key === step.key) || [];
//                 if (uploads.length === 0) return null;
//                 return (
//                     <View key={step.key} className="mb-6">
//                         <Text className="font-bold text-lg mb-1">{step.title}</Text>
//                         <Text className="mb-1 text-xs text-gray-600">{step.instruction}</Text>
//                         {/* {step.demoVideo && (
//               <Text className="text-xs text-blue-700 mb-2">[Sample/Demo Video: {step.demoVideo}]</Text>
//             )} */}
//                         <View className="flex-row flex-wrap">
//                             {uploads.map(up =>
//                                 up.media_type === "image" ? (
//                                     <Image
//                                         key={up.id}
//                                         source={{ uri: getMediaUrl(up.media_file) }}
//                                         className="w-32 h-32 rounded-lg m-1 bg-gray-100"
//                                         resizeMode="cover"
//                                     />
//                                 ) : up.media_type === "video" ? (
//                                     <View
//                                         key={up.id}
//                                         className="w-32 h-32 m-1 rounded-lg overflow-hidden bg-black/10 border border-gray-300 items-center justify-center"
//                                     >
//                                         <Video
//                                             source={{ uri: getMediaUrl(up.media_file) }}
//                                             style={{ width: 120, height: 120 }}
//                                             useNativeControls
//                                             resizeMode={ResizeMode.CONTAIN}
//                                         />
//                                     </View>
//                                 ) : null
//                             )}
//                         </View>
//                     </View>
//                 );
//             })}
//         </ScrollView>
//     );
// }

import { doc_url } from "@/utils/constants";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    BackHandler,
    Image,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

dayjs.extend(relativeTime);

import { checklistItems, claimSteps } from "@/app/(main)/warranty/claim-steps";
import api from "@/utils/api";

type Upload = {
  id: number;
  step_key: string;
  media_type: "image" | "video";
  media_file: string;
};

type ClaimDetail = {
  war_req_id: string;
  status: string;
  review_comment?: string;
  company_name: string;
  client_id: string;
  order_id: string;
  kit_id: string;
  kit_number: string;
  project_id: string;
  purchase_date: string | null;
  device_latitude?: number | null;
  device_longitude?: number | null;
  created_at: string;
  updated_at: string;
  checklist_answers: Record<string, boolean>;
  uploads: Upload[];
};

// Helper to get media url
function getMediaUrl(media_file: string) {
  if (media_file.startsWith("http")) return media_file;
  if (media_file.startsWith("/media/")) return doc_url + media_file;
  return doc_url + media_file.replace(/^\/+/, "");
}

// Open native maps or fallback to OSM Web
function openInMaps(lat: number, lng: number) {
  let url: string;
  if (Platform.OS === "ios") {
    url = `maps://?ll=${lat},${lng}`;
  } else if (Platform.OS === "android") {
    url = `geo:${lat},${lng}?q=${lat},${lng}`;
  } else {
    url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
  }
  Linking.openURL(url).catch(() => {
    Linking.openURL(
      `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
    );
  });
}

export default function ReviewClaimFullDetailsScreen() {
  const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();
  const { from, status } = useLocalSearchParams<{ from?: string; status?: string }>();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<ClaimDetail>({
    queryKey: ["claimDetail", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims/${war_req_id}/`);
      return res.data;
    },
    enabled: !!war_req_id,
  });

  const scrollRef = useRef<ScrollView>(null);
  const [previewMedia, setPreviewMedia] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);

  function handleBack() {
    if (from === "review-req-warranty-status" && status) {
      router.replace({
        pathname: "/(adminDashboard)/review-req-warranty-status",
        params: { status },
      });
    } else {
      router.back();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (previewMedia) {
          setPreviewMedia(null);
          return true;
        }
        handleBack();
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [from, status, previewMedia])
  );

  const checklistAnswers = data?.checklist_answers || {};

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.setNativeProps({
        scrollEnabled: previewMedia === null,
      });
    }
  }, [previewMedia]);

  // DeviceLocationCard: Map only, with Open in Maps button, using Geoapify
  function DeviceLocationCard() {
    if (!data?.device_latitude || !data?.device_longitude) {
      return (
        <View className="mb-5 bg-white border border-gray-200 rounded-xl shadow-md p-4 items-center">
          <Text className="text-gray-400">No device location data available.</Text>
        </View>
      );
    }
    const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=450&height=200&center=lonlat:${data.device_longitude},${data.device_latitude}&zoom=15&marker=lonlat:${data.device_longitude},${data.device_latitude};type:material;color:%23ff2800;size:large&apiKey=1caddae337db490bae0c4e3464d5ac35`;

    return (
      <View
        className="mb-5 bg-white border border-gray-200 rounded-xl shadow-md"
        style={{ padding: 12, overflow: "hidden", elevation: 2 }}
      >
        <Image
          source={{ uri: staticMapUrl }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 10,
            marginBottom: 12,
            backgroundColor: "#eee",
          }}
          resizeMode="cover"
        />
        <Pressable
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor: "#e0edff",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => openInMaps(data.device_latitude!, data.device_longitude!)}
        >
          <Ionicons name="open-outline" size={18} color="#2563eb" />
          <Text
            style={{
              marginLeft: 7,
              color: "#2563eb",
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            Open in Maps
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  if (isError || !data)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{String(error) || "No data"}</Text>
      </View>
    );

  return (
    <>
      <ScrollView
        ref={scrollRef}
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ padding: 18 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="info" size={20} color="#2563eb" />
          <Text className="ml-2 text-xl font-bold text-blue-700">Warranty Request Details</Text>
        </View>

        {/* Info Card */}
        <View className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-5 mb-6">
          <Text className="text-lg font-extrabold mb-1">Request ID#{data.war_req_id}</Text>
          <Text className="mb-1">
            Status:
            <Text
              className={`ml-2 px-2 py-1 text-white rounded-full text-xs font-bold ${
                data.status === "Approved"
                  ? "bg-green-600"
                  : data.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
            >
              {data.status}
            </Text>
          </Text>
          <Text>
            Company: <Text className="font-bold">{data.company_name}</Text>
          </Text>
          <Text>
            Client ID: <Text className="font-bold">{data.client_id}</Text>
          </Text>
          <Text>
            Order ID: <Text className="font-bold">{data.order_id}</Text>
          </Text>
          <Text>
            Kit ID: <Text className="font-bold">{data.kit_id}</Text>
          </Text>
          <Text>
            Kit #: <Text className="font-bold">{data.kit_number}</Text>
          </Text>
          <Text>
            Project ID: <Text className="font-bold">{data.project_id}</Text>
          </Text>
          <Text>
            Purchase Date:{" "}
            <Text className="font-bold">
              {data.purchase_date ? new Date(data.purchase_date).toLocaleDateString() : "--"}
            </Text>
          </Text>
          <Text>
            Requested: <Text className="font-bold">{dayjs(data.created_at).fromNow()}</Text>
          </Text>
          <Text>
            Updated: <Text className="font-bold">{dayjs(data.updated_at).fromNow()}</Text>
          </Text>
          {data.review_comment && (
            <Text>
              Admin Comment:{" "}
              <Text className="font-bold text-blue-700">{data.review_comment}</Text>
            </Text>
          )}
        </View>

        {/* Device Location Section */}
        <View className="flex-row items-center mb-2">
          <Feather name="map-pin" size={18} color="green" />
          <Text className="ml-2 text-base font-semibold text-gray-700">Client Location</Text>
        </View>
        <DeviceLocationCard />

        {/* Checklist */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Feather name="check-square" size={18} color="#2563eb" />
            <Text className="ml-2 text-base font-semibold">Checklist Submitted by User</Text>
          </View>
          <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {checklistItems.map((item, index) => {
              const isChecked = checklistAnswers[item.key];
              return (
                <View
                  key={item.key}
                  className={`flex-row justify-between items-center px-3 py-2 border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <Text className="flex-1 text-[15px] pr-2">{item.question}</Text>
                  <Text
                    className={`w-6 text-right font-bold text-lg ${
                      isChecked ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {isChecked ? "✓" : "✗"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Uploads */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Feather name="upload-cloud" size={18} color="#2563eb" />
            <Text className="ml-2 text-base font-semibold">Uploads By Step</Text>
          </View>
          {claimSteps.map((step) => {
            const uploads = data.uploads?.filter((up) => up.step_key === step.key) || [];
            if (uploads.length === 0) return null;
            return (
              <View key={step.key} className="mb-5">
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-lg">{step.title}</Text>
                  <Text
                    className={`ml-2 font-bold ${
                      uploads.length > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {uploads.length > 0 ? "✓ Done" : "✗ Missing"}
                  </Text>
                </View>
                <Text className="mb-1 text-xs text-gray-600">{step.instruction}</Text>
                <View className="flex-row flex-wrap">
                  {uploads.map((up) => {
                    const uri = getMediaUrl(up.media_file);
                    return (
                      <Pressable
                        key={up.id}
                        onPress={() =>
                          setPreviewMedia({
                            uri,
                            type: up.media_type === "video" ? "video" : "image",
                          })
                        }
                      >
                        {up.media_type === "image" ? (
                          <Image
                            source={{ uri }}
                            className="w-32 h-32 rounded-lg m-1 bg-gray-100"
                            resizeMode="cover"
                          />
                        ) : (
                          <Video
                            source={{ uri }}
                            style={{
                              width: 130,
                              height: 130,
                              margin: 4,
                              borderRadius: 12,
                            }}
                            useNativeControls={false}
                            isLooping
                            resizeMode={ResizeMode.COVER}
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Fullscreen Media Preview */}
      {previewMedia && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black/90 items-center justify-center">
          <Pressable
            onPress={() => setPreviewMedia(null)}
            className="absolute top-0 left-0 right-0 bottom-0"
          />
          {previewMedia.type === "image" ? (
            <Image source={{ uri: previewMedia.uri }} className="w-full h-full" resizeMode="contain" />
          ) : (
            <Video
              source={{ uri: previewMedia.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
            />
          )}
          <Pressable
            onPress={() => setPreviewMedia(null)}
            className="absolute top-5 left-5 bg-white/90 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>
      )}
    </>
  );
}