import { AdminOrder } from "@/types/adminOrder.types";
import { formatDateTime } from "@/utils/formatDate";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Utility to interpret payment_received string
function isPaymentReceived(received?: string | null): boolean {
    if (!received) return false;
    const value = received.trim().toLowerCase();
    // Add other "truthy" variants if needed
    return value === "yes" || value === "paid" || value === "completed";
}


// StatusBadge subcomponent types
interface StatusBadgeProps {
    label: string;
    value: string;
    color: string;
}

const getStatusColor = (status?: string) => {
    if (!status) return "#9ca3af";
    const s = status.toLowerCase();
    if (s === "completed" || s === "delivered" || s === "done") return "#22c55e";
    if (s === "partial" || s === "processing" || s === "planned") return "#fde047";
    if (s === "pending") return "#facc15";
    if (s === "cancelled" || s === "no" || s === "rejected") return "#ef4444";
    return "#5e8bc9ff";
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, value, color }) => (
    <View
        style={{
            backgroundColor: color,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginRight: 6,
            marginBottom: 4,
            alignItems: "center",
        }}
    >
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#0f1112" }}>
            {label}: {value}
        </Text>
    </View>
);

interface OrderCardProps {
    order: AdminOrder;
    onViewDetails: (order: AdminOrder) => void;
}





export const AdminOrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {


    // DEBUG: inspect delivery-related values
    const deliveryStatus = order.delivery_status ? order.delivery_status.trim().toLowerCase() : "";
    const hasDeliveryDate = !!order.delivery_date;
    const hasExpectedDate = !!order.expected_delivery_date;

    // Console log for debugging
    // console.log("----ORDER DEBUG----");
    // console.log("delivery_status (raw):", order.delivery_status);
    // console.log("delivery_status (normalized):", deliveryStatus);
    // console.log("delivery_date:", order.delivery_date);
    // console.log("expected_delivery_date:", order.expected_delivery_date);

    return (
        <View className="bg-[#18181A] rounded-2xl p-5 my-3 border border-[#FAD90E] shadow-lg">
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-xl font-black text-[#FAD90E]">{order.project_id}</Text>
                <Text className="text-xs text-[#BFBFBF]">{formatDateTime(order.order_date)}</Text>
            </View>

            <Text className="font-semibold mb-1 text-[#F5F5F5]">{order.client_name}</Text>

            <View className="flex-row flex-wrap items-center mb-1 mt-1">
                <StatusBadge
                    label="Payment"
                    value={isPaymentReceived(order.payment_received) ? "Yes" : "No"}
                    color={isPaymentReceived(order.payment_received) ? "#22c55e" : "#ef4444"}
                />
                <StatusBadge
                    label="Production"
                    value={order.production_status || "–"}
                    color={getStatusColor(order.production_status ?? undefined)}
                />
                <StatusBadge
                    label="Dispatch"
                    value={order.dispatch_status || "–"}
                    color={getStatusColor(order.dispatch_status ?? undefined)}
                />
                <StatusBadge
                    label="Delivery"
                    value={order.delivery_status || "–"}
                    color={getStatusColor(order.delivery_status ?? undefined)}
                />
            </View>

            <Text className="text-xs text-[#BFBFBF] mb-1">
                Kits: <Text className="font-semibold">{order.total_kits ?? "–"}</Text>
            </Text>

            {/* Show Actual Delivery Date if order delivered */}
            {/* {order.delivery_status &&
            ["delivered", "completed"].includes(order.delivery_status.toLowerCase()) &&
            order.delivery_date && (
                <Text className="text-xs text-[#BFBFBF] mb-1">
                    Delivery:{" "}
                    <Text className="font-semibold">{formatDateTime(order.delivery_date)}</Text>
                </Text>
            )}

        {order.expected_delivery_date && (
            <Text className="text-xs text-[#BFBFBF] mb-1">
                Expected:{" "}
                <Text className="font-semibold">{formatDateTime(order.expected_delivery_date)}</Text>
            </Text>
        )} */}



            {order.delivery_status?.trim().toLowerCase() === "delivered" && order.delivery_date ? (
                <Text className="text-xs text-[#BFBFBF] mb-1">
                    Delivery:{" "}
                    <Text className="font-semibold">{order.delivery_date}</Text>
                </Text>
            ) : order.expected_delivery_date ? (
                <Text className="text-xs text-[#BFBFBF] mb-1">
                    Expected:{" "}
                    <Text className="font-semibold">{order.expected_delivery_date}</Text>
                </Text>
            ) : null}

            <TouchableOpacity
                onPress={() => onViewDetails(order)}
                className="bg-[#FAD90E] py-2 rounded-lg self-start px-4 mt-2"
                activeOpacity={0.85}
            >
                <Text className="text-[#0F1112] font-bold text-base">View Details</Text>
            </TouchableOpacity>
        </View>
    )
};
