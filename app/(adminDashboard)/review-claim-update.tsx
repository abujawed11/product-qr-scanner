// import api from "@/utils/api";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//     Alert, KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     Text,
//     TouchableOpacity,
//     View
// } from "react-native";
// import { ActivityIndicator, Button, TextInput } from "react-native-paper";

// const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
//   pending: { label: "Pending", color: "#facc15" },
//   under_review: { label: "Under Review", color: "#fde047" },
//   approved: { label: "Approved", color: "#22c55e" },
//   rejected: { label: "Rejected", color: "#ef4444" },
//   cancelled: { label: "Cancelled", color: "#374151" },
// };

// type Status = keyof typeof STATUS_DISPLAY;

// type ClaimDetail = {
//   war_req_id: string;
//   status: Status;
//   review_comment?: string;
//   company_name: string;
//   client_id: string;
//   order_id: string;
//   kit_id: string;
//   kit_number: string;
//   project_id: string;
//   purchase_date: string | null;
//   device_latitude?: number | null;
//   device_longitude?: number | null;
//   created_at: string;
//   updated_at: string;
// };

// export default function ReviewClaimUpdateScreen() {
//   const router = useRouter();
//   const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();

//   // Fetch claim detail
//   const { data, isLoading, isError, error, refetch: refetchDetail } = useQuery<ClaimDetail>({
//     queryKey: ["claimDetail", war_req_id],
//     queryFn: async () => {
//       const res = await api.get(`/warranty-claims/${war_req_id}/`);
//       return res.data;
//     },
//     enabled: !!war_req_id,
//   });

//   const [status, setStatus] = useState<Status | "">(data?.status ?? "");
//   const [comment, setComment] = useState<string>(data?.review_comment ?? "");
//   const [loading, setLoading] = useState(false);

//   // PATCH mutation
//   const mutation = useMutation({
//     mutationFn: async (values: { status: Status; review_comment: string }) => {
//       setLoading(true);
//       const res = await api.patch(`/warranty-claims/${war_req_id}/`, values);
//       return res.data;
//     },
//     onSuccess: () => {
//       Alert.alert("Success", "Claim updated.");
//       refetchDetail();
//       setLoading(false);
//       router.back();
//     },
//     onError: (e: any) => {
//       Alert.alert("Error", "Failed to update claim.\n" + (e?.message ?? String(e)));
//       setLoading(false);
//     },
//   });

//   // Initialize new value states when data loads
//   React.useEffect(() => {
//     if (data) {
//       setStatus(data.status);
//       setComment(data.review_comment ?? "");
//     }
//   }, [data?.status, data?.review_comment]);

//   if (isLoading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <ActivityIndicator />
//         <Text>Loading claim...</Text>
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <Text className="text-red-500">Failed to load claim</Text>
//         <Text className="text-xs">{String(error)}</Text>
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-gray-50"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView className="flex-1 p-5">
//         <Text className="text-2xl font-bold mb-4 text-black">Review & Update Claim</Text>
//         <View className="mb-5">
//           <Text className="mb-1"><Text className="font-bold">Claim: </Text>{data?.war_req_id}</Text>
//           <Text className="mb-1"><Text className="font-bold">Company: </Text>{data?.company_name}</Text>
//           <Text className="mb-1"><Text className="font-bold">Client ID: </Text>{data?.client_id}</Text>
//           <Text className="mb-1"><Text className="font-bold">Order ID: </Text>{data?.order_id}</Text>
//           <Text className="mb-1"><Text className="font-bold">Kit ID: </Text>{data?.kit_id}</Text>
//           <Text className="mb-1"><Text className="font-bold">Kit #: </Text>{data?.kit_number}</Text>
//           <Text className="mb-1"><Text className="font-bold">Project: </Text>{data?.project_id}</Text>
//           <Text className="mb-1">
//             <Text className="font-bold">Location:</Text>{" "}
//             {(!!data.device_latitude && !!data.device_longitude)
//               ? `${data.device_latitude}, ${data.device_longitude}` : "--"}
//           </Text>
//           <Text className="mb-1"><Text className="font-bold">Status: </Text>{data.status}</Text>
//           <Text className="mb-1"><Text className="font-bold">Requested:</Text> {new Date(data.created_at).toLocaleString()}</Text>
//           <Text className="mb-1"><Text className="font-bold">Last Updated:</Text> {new Date(data.updated_at).toLocaleString()}</Text>
//         </View>

//         <Text className="text-lg font-semibold mb-2">Change Status</Text>
//         <View className="flex-row flex-wrap mb-4">
//           {Object.entries(STATUS_DISPLAY).map(([key, { label, color }]) => (
//             <TouchableOpacity
//               key={key}
//               className={`bg-gray-100 px-3 py-2 rounded-lg mr-3 mb-3 ${status === key ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}
//               onPress={() => setStatus(key as Status)}
//               disabled={loading}
//               style={{ opacity: loading ? 0.6 : 1 }}
//             >
//               <Text style={{ color: color, fontWeight: "bold" }}>{label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text className="text-lg font-semibold mb-2">Admin Review Comment</Text>
//         <TextInput
//           mode="outlined"
//           value={comment}
//           onChangeText={setComment}
//           placeholder="Add review/approval notes for this claim..."
//           multiline
//           numberOfLines={4}
//           style={{ marginBottom: 24, backgroundColor: "#fff" }}
//           editable={!loading}
//         />

//         <Button
//           mode="contained"
//           buttonColor="#facc15"
//           textColor="black"
//           loading={loading}
//           disabled={!status || loading}
//           className="mb-10 rounded-lg"
//           onPress={() => mutation.mutate({ status: status as Status, review_comment: comment })}
//         >
//           Update Claim
//         </Button>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }


import api from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert, KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";

const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "#facc15" },
  under_review: { label: "Under Review", color: "#fde047" },
  approved: { label: "Approved", color: "#22c55e" },
  rejected: { label: "Rejected", color: "#ef4444" },
  cancelled: { label: "Cancelled", color: "#374151" },
};

type Status = keyof typeof STATUS_DISPLAY;

type ClaimDetail = {
  war_req_id: string;
  status: Status;
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
};

export default function ReviewClaimUpdateScreen() {
  const router = useRouter();
  const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();

  // Fetch claim detail
  const { data, isLoading, isError, error, refetch: refetchDetail } = useQuery<ClaimDetail>({
    queryKey: ["claimDetail", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims/${war_req_id}/`);
      return res.data;
    },
    enabled: !!war_req_id,
  });

  // Always initialize as empty, then fill in useEffect ONLY when data present
  const [status, setStatus] = useState<Status | "">("");
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Initialize or update value states when new data loads (safe for undefined)
  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setComment(data.review_comment ?? "");
    }
  }, [data]);

  // PATCH mutation
  const mutation = useMutation({
    mutationFn: async (values: { status: Status; review_comment: string }) => {
      setLoading(true);
      const res = await api.patch(`/warranty-claims/${war_req_id}/`, values);
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Claim updated.");
      refetchDetail();
      setLoading(false);
      router.back();
    },
    onError: (e: any) => {
      Alert.alert("Error", "Failed to update claim.\n" + (e?.message ?? String(e)));
      setLoading(false);
    },
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator />
        <Text>Loading claim...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Failed to load claim</Text>
        <Text className="text-xs">{String(error)}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView className="flex-1 p-5">
        <Text className="text-2xl font-bold mb-4 text-black">Review & Update Claim</Text>
        <View className="mb-5">
          <Text className="mb-1"><Text className="font-bold">Claim: </Text>{data.war_req_id}</Text>
          <Text className="mb-1"><Text className="font-bold">Company: </Text>{data.company_name}</Text>
          <Text className="mb-1"><Text className="font-bold">Client ID: </Text>{data.client_id}</Text>
          <Text className="mb-1"><Text className="font-bold">Order ID: </Text>{data.order_id}</Text>
          <Text className="mb-1"><Text className="font-bold">Kit ID: </Text>{data.kit_id}</Text>
          <Text className="mb-1"><Text className="font-bold">Kit #: </Text>{data.kit_number}</Text>
          <Text className="mb-1"><Text className="font-bold">Project: </Text>{data.project_id}</Text>
          <Text className="mb-1">
            <Text className="font-bold">Location:</Text>{" "}
            {(!!data.device_latitude && !!data.device_longitude)
              ? `${data.device_latitude}, ${data.device_longitude}` : "--"}
          </Text>
          <Text className="mb-1"><Text className="font-bold">Status: </Text>{data.status}</Text>
          <Text className="mb-1"><Text className="font-bold">Requested:</Text> {new Date(data.created_at).toLocaleString()}</Text>
          <Text className="mb-1"><Text className="font-bold">Last Updated:</Text> {new Date(data.updated_at).toLocaleString()}</Text>
        </View>

        <Text className="text-lg font-semibold mb-2">Change Status</Text>
        <View className="flex-row flex-wrap mb-4">
          {Object.entries(STATUS_DISPLAY).map(([key, { label, color }]) => (
            <TouchableOpacity
              key={key}
              className={`bg-gray-100 px-3 py-2 rounded-lg mr-3 mb-3 ${status === key ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}
              onPress={() => setStatus(key as Status)}
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              <Text style={{ color: color, fontWeight: "bold" }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-semibold mb-2">Admin Review Comment</Text>
        <TextInput
          mode="outlined"
          value={comment}
          onChangeText={setComment}
          placeholder="Add review/approval notes for this claim..."
          multiline
          numberOfLines={4}
          style={{ marginBottom: 24, backgroundColor: "#fff" }}
          editable={!loading}
        />

        <Button
          mode="contained"
          buttonColor="#facc15"
          textColor="black"
          loading={loading}
          disabled={!status || loading}
          className="mb-10 rounded-lg"
          onPress={() => mutation.mutate({ status: status as Status, review_comment: comment })}
        >
          Update Claim
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

