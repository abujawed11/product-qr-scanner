import { Feather, MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

// Extend or adjust this to match your actual API/type definitions
export type WarrantyCardProps = {
    certificate_no: string;
    war_card_id: string;
    warranty_type: "full" | "partial" | string;
    warranty_started_at: string; // YYYY-MM-DD
    expires_at: string; // YYYY-MM-DD
    warranty_duration_months: number;
    serial_number?: string | null;
    coverage_description?: string | null;
    is_transferable: boolean;
    issued_at: string; // ISO datetime
    terms_document_url?: string | null; // Certificate PDF URL
    claim?: {
        war_req_id?: string | null;
    };
};

const typeDisplay = (type: string) =>
    type === "full"
        ? "Full Coverage"
        : type === "partial"
            ? "Full Coverage*"
            : type.charAt(0).toUpperCase() + type.slice(1);

function getWarrantyStatus(card: WarrantyCardProps): { label: string; color: string } {
    const now = new Date();
    const start = new Date(card.warranty_started_at);
    const end = new Date(card.expires_at);

    if (now < start) {
        return { label: "Not Yet Active", color: "#77777aff" }; // yellow
    }
    if (now > end) {
        return { label: "Expired", color: "#ef4444" }; // red
    }
    return { label: "Active", color: "#22c55e" }; // green
}

export const WarrantyCard: FC<{ card: WarrantyCardProps }> = ({ card }) => {

    // Debug logs to understand PDF URL issue
    console.log('🔍 WARRANTY CARD DEBUG:', {
        war_card_id: card.war_card_id,
        certificate_no: card.certificate_no,
        terms_document_url: card.terms_document_url,
        terms_document_url_type: typeof card.terms_document_url,
        terms_document_url_length: card.terms_document_url?.length,
        claim_object: card.claim,
        full_card_data: JSON.stringify(card, null, 2)
    });

    const statusObj = getWarrantyStatus(card);


    return (
        <View className="rounded-2xl border-2 border-black bg-yellow-300 shadow-xl mx-4 my-4 p-0 overflow-hidden">
            {/* --- Card header --- */}
            <View className="flex-row items-center justify-between px-6 py-3 bg-black">
                <View className="flex-row items-center">
                    <Feather name="shield" size={20} color="#fde047" />
                    <Text className="ml-2 text-base font-semibold text-yellow-300 tracking-wider">
                        WARRANTY CARD
                    </Text>
                </View>
                <MaterialIcons name="verified-user" size={22} color="#fde047" />
            </View>

            {/* --- Main info --- */}
            <View className="px-6 py-5 space-y-2">
                <View className="flex-row items-center mb-1">
                    <Text className="text-sm text-black font-medium">Certificate No:</Text>
                    <Text
                        // className="ml-2 text-black font-semibold"
                        className="ml-2 text-black font-semibold flex-1"
                        // ellipsizeMode="middle"
                        numberOfLines={1}
                    // selectable

                    >{card.certificate_no}</Text>
                </View>
                {/* <View className="flex-row items-center">
                    <Text className="text-sm text-black font-medium">Card ID:</Text>
                    <Text className="ml-2 text-black">{card.war_card_id}</Text>
                </View> */}
                <View className="flex-row items-center gap-4 mt-1">
                    <Text className="text-sm text-black font-medium">Type:</Text>
                    <Text className="ml-1 px-2 py-0.5 text-xs bg-black text-yellow-300 rounded font-bold">
                        {typeDisplay(card.warranty_type)}
                    </Text>
                </View>
                {/* <View className="flex-row items-center gap-4 mt-2">
                    <Text className="text-sm text-black font-medium">Status:</Text>
                    <Text className="ml-2 font-bold text-green-700">Active</Text>
                </View> */}
                <View className="flex-row items-center gap-4 mt-2">
                    <Text className="text-sm text-black font-medium">Status:</Text>
                    <Text className="ml-2 font-bold" style={{ color: statusObj.color }}>
                        {statusObj.label}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-sm text-black font-medium">Coverage:</Text>
                    <Text className="ml-2 text-black">
                        {card.coverage_description || "Standard manufacturer warranty"}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-sm text-black font-medium">Serial Number:</Text>
                    <Text className="ml-2 text-black">{card.serial_number || "--"}</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-sm text-black font-medium">Transferable:</Text>
                    <Text className="ml-2 text-black">{card.is_transferable ? "Yes" : "No"}</Text>
                </View>
            </View>

            {/* --- Period block --- */}
            <View className="bg-black px-6 py-4 rounded-b-2xl">
                <View className="flex-row justify-between mb-1">
                    <Text className="text-xs text-yellow-200">WARRANTY PERIOD</Text>
                    <Text className="text-xs text-yellow-200">Duration:</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-base text-yellow-300">
                        {card.warranty_started_at}{" "}
                        <Text className="font-normal text-xs text-yellow-100">to</Text>{" "}
                        {card.expires_at}
                    </Text>
                    <Text className="font-medium text-yellow-100">
                        {card.warranty_duration_months} months
                    </Text>
                </View>
            </View>

            {/* --- Issued at & Links --- */}
            <View className="px-6 py-2 bg-yellow-200">
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-black/60">
                        Issued: {new Date(card.issued_at).toLocaleDateString()}
                    </Text>

                    {card.terms_document_url ? (
                        <Pressable onPress={() => Linking.openURL(card.terms_document_url!)}>
                            <Text className="text-xs font-semibold underline text-blue-700">
                                View Terms & Conditions
                            </Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* PDF Certificate Download */}
                {(() => {
                    console.log('📋 PDF DOWNLOAD SECTION DEBUG:', {
                        card_id: card.war_card_id,
                        has_terms_document_url: !!card.terms_document_url,
                        terms_document_url_value: card.terms_document_url,
                        condition_result: card.terms_document_url && true,
                        will_show_download: !!card.terms_document_url
                    });

                    if (card.terms_document_url) {
                        console.log('✅ SHOWING PDF DOWNLOAD BUTTON for card:', card.war_card_id);
                        return (
                            <View className="flex-row items-center justify-center mt-2 pt-2 border-t border-black/10">
                                <Pressable
                                    onPress={() => {
                                        console.log('📥 PDF DOWNLOAD PRESSED:', {
                                            card_id: card.war_card_id,
                                            url: card.terms_document_url
                                        });
                                        Linking.openURL(card.terms_document_url!);
                                    }}
                                    className="flex-row items-center px-3 py-1.5 bg-black rounded-lg"
                                >
                                    <Feather name="download" size={14} color="#fde047" />
                                    <Text className="ml-1.5 text-xs font-semibold text-yellow-300">
                                        Download Certificate PDF
                                    </Text>
                                </Pressable>
                            </View>
                        );
                    } else {
                        console.log('❌ NOT SHOWING PDF DOWNLOAD BUTTON for card:', card.war_card_id, 'because terms_document_url is:', card.terms_document_url);
                        return null;
                    }
                })()}
            </View>
        </View>
    );
};

// -- Usage Example --
// import { WarrantyCard } from "./WarrantyCard";
// <WarrantyCard card={cardDataFromApi} />
