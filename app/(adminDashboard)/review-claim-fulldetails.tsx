import { doc_url } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { ResizeMode, Video } from "expo-av"; // expo-av for video preview
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { BackHandler, Image, ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { checklistItems, claimSteps } from "@/app/(main)/warranty/claim-steps"; // adjust for your actual import path
import api from "@/utils/api";
// import { useFocusEffect } from "@react-navigation/native";
// import { BackHandler } from "react-native";

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

function getMediaUrl(media_file: string) {
    if (media_file.startsWith("http")) return media_file;
    if (media_file.startsWith("/media/")) return doc_url + media_file;
    return doc_url + media_file.replace(/^\/+/, "");
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
                // Your back logic
                handleBack();
                return true;
            };
            const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () => subscription.remove();
        }, [from, status])
    );

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => {
    //             handleBack();
    //             return true; // prevent default back behavior
    //         };
    //         BackHandler.addEventListener("hardwareBackPress", onBackPress);
    //         return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    //     }, [from, status])
    // );




    if (isLoading)
        return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (isError || !data)
        return <View className="flex-1 items-center justify-center"><Text className="text-red-500">{String(error) || "No data"}</Text></View>;

    const checklistAnswers = data.checklist_answers || {};

    return (
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 18 }}>
            {/* Basic Info Card */}
            <View className="bg-white rounded-xl shadow px-4 py-5 mb-5">
                <Text className="text-lg font-extrabold">Request ID#{data.war_req_id}</Text>
                <Text>Status: <Text className="font-bold text-blue-700">{data.status}</Text></Text>
                <Text>Company: <Text className="font-bold">{data.company_name}</Text></Text>
                <Text>Client ID: <Text className="font-bold">{data.client_id}</Text></Text>
                <Text>Order ID: <Text className="font-bold">{data.order_id}</Text></Text>
                <Text>Kit ID: <Text className="font-bold">{data.kit_id}</Text></Text>
                <Text>Kit #: <Text className="font-bold">{data.kit_number}</Text></Text>
                <Text>Project ID: <Text className="font-bold">{data.project_id}</Text></Text>
                <Text>Purchase Date: <Text className="font-bold">{data.purchase_date ? new Date(data.purchase_date).toLocaleDateString() : "--"}</Text></Text>
                <Text>Location: <Text className="font-bold">{data.device_latitude && data.device_longitude ? `${data.device_latitude}, ${data.device_longitude}` : "--"}</Text></Text>
                <Text>Requested: <Text className="font-bold">{new Date(data.created_at).toLocaleString()}</Text></Text>
                <Text>Updated: <Text className="font-bold">{new Date(data.updated_at).toLocaleString()}</Text></Text>
                {data.review_comment ? (
                    <Text>
                        Admin Comment: <Text className="font-bold text-blue-700">{data.review_comment}</Text>
                    </Text>
                ) : null}
            </View>

            {/* Checklist */}
            <Text className="text-base font-semibold mb-2">Checklist Submitted by User:</Text>
            <View className="mb-6">
                {checklistItems.map(item => (
                    <View key={item.key} className="flex-row items-center mb-1">
                        <Text className="flex-1 text-[15px]">{item.question}</Text>
                        <Text className={`ml-2 font-bold ${checklistAnswers[item.key] ? "text-green-700" : "text-red-600"}`}>
                            {checklistAnswers[item.key] ? "✓" : "✗"}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Uploads By Step */}
            <Text className="text-base font-semibold mb-2">Uploads By Step:</Text>
            {claimSteps.map((step) => {
                const uploads = data.uploads?.filter(up => up.step_key === step.key) || [];
                if (uploads.length === 0) return null;
                return (
                    <View key={step.key} className="mb-6">
                        <Text className="font-bold text-lg mb-1">{step.title}</Text>
                        <Text className="mb-1 text-xs text-gray-600">{step.instruction}</Text>
                        {/* {step.demoVideo && (
              <Text className="text-xs text-blue-700 mb-2">[Sample/Demo Video: {step.demoVideo}]</Text>
            )} */}
                        <View className="flex-row flex-wrap">
                            {uploads.map(up =>
                                up.media_type === "image" ? (
                                    <Image
                                        key={up.id}
                                        source={{ uri: getMediaUrl(up.media_file) }}
                                        className="w-32 h-32 rounded-lg m-1 bg-gray-100"
                                        resizeMode="cover"
                                    />
                                ) : up.media_type === "video" ? (
                                    <View
                                        key={up.id}
                                        className="w-32 h-32 m-1 rounded-lg overflow-hidden bg-black/10 border border-gray-300 items-center justify-center"
                                    >
                                        <Video
                                            source={{ uri: getMediaUrl(up.media_file) }}
                                            style={{ width: 120, height: 120 }}
                                            useNativeControls
                                            resizeMode={ResizeMode.CONTAIN}
                                        />
                                    </View>
                                ) : null
                            )}
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}
