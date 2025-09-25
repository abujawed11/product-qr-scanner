import { Feather, MaterialIcons } from "@expo/vector-icons";
import type { FC } from "react";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

// Certificate-aligned warranty card type matching official certificate fields
export type WarrantyCardProps = {
    // Core Certificate Fields
    certificate_no: string;           // SR/WC/<Year>/<Serial>
    war_card_id: string;             // Internal ID
    issued_at: string;               // Date of Issue - ISO datetime

    // Invoice Information
    invoice_no?: string | null;      // Invoice No.
    invoice_date?: string | null;    // Invoice Date - YYYY-MM-DD

    // Customer & Product Information
    company_name?: string | null;    // Customer Name
    client_id?: string | null;       // Client ID
    kit_id?: string | null;          // Product Name / Model No.
    project_id?: string | null;      // Project ID

    // Installation Information
    installation_latitude?: number | string | null;   // Installation Location (GPS)
    installation_longitude?: number | string | null;  // Installation Location (GPS)

    // Warranty Period Information
    warranty_started_at: string;     // Warranty Start Date - YYYY-MM-DD
    expires_at: string;              // Warranty End Date (auto-calculated)
    warranty_duration_months: number; // Duration in months (fixed 300 = 25 years)

    // Coverage & Status
    warranty_type: "full" | "partial" | string; // Coverage type
    is_transferable: boolean;        // Transferable (default: No)
    terms_document_url?: string | null; // Certificate PDF URL

    // Legacy/Internal Fields (for compatibility)
    serial_number?: string | null;   // Mapped to kit_id for display
    coverage_description?: string | null; // Now uses standard coverage points
    claim?: {
        war_req_id?: string | null;
    };
};

// Standard warranty coverage points (matching official certificate)
const STANDARD_COVERAGE_POINTS = [
    "Structural Integrity & Strength",
    "Manufacturing & Workmanship",
    "Corrosion Resistance"
];

// Helper functions for certificate data formatting
function formatDate(dateStr?: string | null): string {
    if (!dateStr || dateStr === '') return "N/A";
    try {
        const date = new Date(dateStr);
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return "N/A";
        }
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return "N/A";
    }
}

function formatInstallationLocation(lat?: number | string | null, lng?: number | string | null): string {
    if (lat != null && lng != null) {
        try {
            // Convert to numbers if they're strings
            const latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
            const lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;

            // Check if conversion was successful and values are valid numbers
            if (!isNaN(latNum) && !isNaN(lngNum) && isFinite(latNum) && isFinite(lngNum)) {
                return `${latNum.toFixed(6)}, ${lngNum.toFixed(6)}`;
            }
        } catch (error) {
            console.log('Error formatting installation location:', error);
        }
    }
    return "N/A";
}

function getWarrantyPeriodDisplay(durationMonths: number): string {
    const years = Math.floor(durationMonths / 12);
    return years > 0 ? `${years} Year${years > 1 ? 's' : ''}` : `${durationMonths} Month${durationMonths > 1 ? 's' : ''}`;
}

function getWarrantyStatus(card: WarrantyCardProps): { label: string; color: string } {
    const now = new Date();
    const start = new Date(card.warranty_started_at);
    const end = new Date(card.expires_at);

    if (now < start) {
        return { label: "Not Yet Active", color: "#f59e0b" }; // amber
    }
    if (now > end) {
        return { label: "Expired", color: "#ef4444" }; // red
    }
    return { label: "Active", color: "#22c55e" }; // green
}

// Certificate Table Row Component
const CertificateRow: FC<{ label: string; value: string; labelCol?: string; valueCol?: string }> = ({
    label, value, labelCol = "#000", valueCol = "#333"
}) => (
    <View className="flex-row border-b border-gray-300">
        <View className="flex-1 px-3 py-2 bg-gray-50 border-r border-gray-300">
            <Text className="text-xs font-medium" style={{ color: labelCol }}>
                {label}
            </Text>
        </View>
        <View className="flex-[2] px-3 py-2 bg-white">
            <Text className="text-xs font-normal" style={{ color: valueCol }} numberOfLines={2}>
                {value || "N/A"}
            </Text>
        </View>
    </View>
);

export const WarrantyCard: FC<{ card: WarrantyCardProps }> = ({ card }) => {
    const statusObj = getWarrantyStatus(card);

    // Debug installation location data
    console.log('🔍 INSTALLATION LOCATION DEBUG for card', card.war_card_id, ':', {
        installation_latitude: card.installation_latitude,
        installation_latitude_type: typeof card.installation_latitude,
        installation_longitude: card.installation_longitude,
        installation_longitude_type: typeof card.installation_longitude,
        raw_card_data: {
            installation_latitude: card.installation_latitude,
            installation_longitude: card.installation_longitude,
            // Check if data might be under different field names
            device_latitude: (card as any).device_latitude,
            device_longitude: (card as any).device_longitude,
            latitude: (card as any).latitude,
            longitude: (card as any).longitude,
        }
    });

    const installationLocation = formatInstallationLocation(card.installation_latitude, card.installation_longitude);
    const warrantyPeriod = getWarrantyPeriodDisplay(card.warranty_duration_months);

    console.log('🏠 FORMATTED INSTALLATION LOCATION:', installationLocation);

    return (
        <View className="rounded-xl border border-gray-300 bg-white shadow-lg mx-4 my-3 overflow-hidden">
            {/* Certificate Header */}
            <View className="bg-blue-900 px-4 py-3">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Feather name="shield" size={18} color="#fbbf24" />
                        <Text className="ml-2 text-base font-bold text-white tracking-wide">
                            WARRANTY CERTIFICATE
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className={`px-2 py-1 rounded-full ${
                            statusObj.color === "#22c55e" ? "bg-green-100" :
                            statusObj.color === "#ef4444" ? "bg-red-100" : "bg-yellow-100"
                        }`}>
                            <Text className={`text-xs font-medium ${
                                statusObj.color === "#22c55e" ? "text-green-800" :
                                statusObj.color === "#ef4444" ? "text-red-800" : "text-yellow-800"
                            }`}>
                                {statusObj.label}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Certificate Information Table */}
            <View className="border border-gray-300 mx-4 mt-4 rounded-lg overflow-hidden">
                <CertificateRow
                    label="Certificate No."
                    value={card.certificate_no}
                />
                <CertificateRow
                    label="Date of Issue"
                    value={formatDate(card.issued_at)}
                />
                <CertificateRow
                    label="Invoice No."
                    value={card.invoice_no || "N/A"}
                />
                <CertificateRow
                    label="Invoice Date"
                    value={formatDate(card.invoice_date)}
                />
                <CertificateRow
                    label="Customer Name"
                    value={card.company_name || "N/A"}
                />
                <CertificateRow
                    label="Client ID"
                    value={card.client_id || "N/A"}
                />
                <CertificateRow
                    label="Product Name / Model No."
                    value={card.kit_id || card.serial_number || "N/A"}
                />
                <CertificateRow
                    label="Project ID"
                    value={card.project_id || "N/A"}
                />
                <CertificateRow
                    label="Installation Location"
                    value={installationLocation}
                />
                <CertificateRow
                    label="Warranty Start Date"
                    value={formatDate(card.warranty_started_at)}
                />
                <View className="flex-row border-b-0">
                    <View className="flex-1 px-3 py-2 bg-gray-50 border-r border-gray-300">
                        <Text className="text-xs font-medium text-black">
                            Warranty Period
                        </Text>
                    </View>
                    <View className="flex-[2] px-3 py-2 bg-white">
                        <Text className="text-xs font-semibold text-blue-900">
                            {warrantyPeriod} (Until {formatDate(card.expires_at)})
                        </Text>
                    </View>
                </View>
            </View>

            {/* Coverage Scope */}
            <View className="mx-4 mt-4">
                <Text className="text-sm font-semibold text-gray-800 mb-2">Coverage Scope:</Text>
                <View className="bg-blue-50 rounded-lg p-3">
                    {STANDARD_COVERAGE_POINTS.map((point, index) => (
                        <View key={index} className="flex-row items-start mb-1">
                            <Text className="text-blue-600 mr-2">•</Text>
                            <Text className="text-xs text-blue-800 flex-1">{point}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Transferable Status */}
            <View className="mx-4 mt-3">
                <View className="flex-row items-center">
                    <Text className="text-xs text-gray-600 mr-2">Transferable:</Text>
                    <Text className={`text-xs font-medium ${card.is_transferable ? 'text-green-600' : 'text-gray-800'}`}>
                        {card.is_transferable ? "Yes" : "No"}
                    </Text>
                </View>
            </View>

            {/* PDF Download Section */}
            {card.terms_document_url && (
                <View className="mx-4 mt-4 mb-4">
                    <Pressable
                        onPress={() => Linking.openURL(card.terms_document_url!)}
                        className="bg-blue-900 rounded-lg py-3 px-4 flex-row items-center justify-center"
                    >
                        <Feather name="download" size={16} color="#fbbf24" />
                        <Text className="ml-2 text-sm font-semibold text-white">
                            Download Official Certificate
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

// -- Usage Example --
// import { WarrantyCard } from "./WarrantyCard";
// <WarrantyCard card={cardDataFromApi} />
