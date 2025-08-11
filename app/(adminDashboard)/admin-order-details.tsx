
import { AdminOrder } from "@/types/adminOrder.types";
import api from "@/utils/api";
import { formatDateTime } from "@/utils/formatDate";
import { getOrderStatusColor } from "@/utils/statusColor";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    BackHandler,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Kit {
  kit: {
    kit_id: string;
    name: string;
  };
  quantity: number;
  unit_price: string;
  total_price: string;
}

const StatusBadge: React.FC<{ label: string; value: string; color: string }> = ({
  label,
  value,
  color,
}) => (
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

const AdminOrderDetailsScreen: React.FC = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [kits, setKits] = useState<Kit[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  function isPaymentReceived(received?: string | null): boolean {
    if (!received) return false;
    const value = received.trim().toLowerCase();
    return value === "yes" || value === "paid" || value === "completed";
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(adminDashboard)/manage-orders");
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const [orderRes, kitsRes] = await Promise.all([
          api.get<AdminOrder>(`/admin/orders/${orderId}/`),
          api.get<Kit[]>(`/admin/orders/${orderId}/kits/`),
        ]);
        setOrder(orderRes.data);
        setKits(kitsRes.data);
      } catch (e) {
        // Optionally handle the error
      }
      setLoading(false);
    }
    fetchDetails();
  }, [orderId]);

  if (loading || !order) {
    return (
      <View className="flex-1 bg-[#18181A] justify-center items-center">
        <ActivityIndicator size="large" color="#FAD90E" />
      </View>
    );
  }

  const deliveryStatus = order.delivery_status?.trim().toLowerCase();
  const showDelivery = deliveryStatus === "delivered" && order.delivery_date;
  const showExpected = !showDelivery && order.expected_delivery_date;

  const totalKitPrice = kits.reduce((sum, kit) => sum + parseFloat(kit.total_price), 0);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#18181A",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 32,
          paddingHorizontal: 16,
          paddingTop: 24,
        }}
      >
        <Text className="text-[#FAD90E] text-2xl font-black mb-3">{order.project_id}</Text>
        <Text className="text-lg font-semibold text-[#F5F5F5] mb-2">{order.client_name}</Text>
        <Text className="text-xs text-[#BFBFBF] mb-4">{formatDateTime(order.order_date)}</Text>

        <View className="flex-row flex-wrap mb-2">
          <StatusBadge
            label="Payment"
            value={isPaymentReceived(order.payment_received) ? "Yes" : "No"}
            color={isPaymentReceived(order.payment_received) ? "#22c55e" : "#ef4444"}
          />
          <StatusBadge
            label="Production"
            value={order.production_status || "—"}
            color={getOrderStatusColor(order.production_status ?? undefined)}
          />
          <StatusBadge
            label="Dispatch"
            value={order.dispatch_status || "—"}
            color={getOrderStatusColor(order.dispatch_status ?? undefined)}
          />
          <StatusBadge
            label="Delivery"
            value={order.delivery_status || "—"}
            color={getOrderStatusColor(order.delivery_status ?? undefined)}
          />
        </View>

        {showDelivery ? (
          <Text className="text-xs text-[#BFBFBF] mb-1">
            Delivery: <Text className="font-semibold">{order.delivery_date!}</Text>
          </Text>
        ) : showExpected ? (
          <Text className="text-xs text-[#BFBFBF] mb-1">
            Expected: <Text className="font-semibold">{order.expected_delivery_date!}</Text>
          </Text>
        ) : null}

        <Text className="text-xs text-[#BFBFBF] mb-4">
          Kits: <Text className="font-semibold">{order.total_kits ?? "—"}</Text>
        </Text>

        {/* Kits List */}
        <View className="mb-6">
          <Text className="text-base font-bold text-[#FAD90E] mb-2">Kits Ordered</Text>
          {kits.length === 0 ? (
            <Text className="text-sm text-[#BFBFBF]">No kits found for this order.</Text>
          ) : (
            kits.map((item) => (
              <View
                key={item.kit.kit_id}
                className="flex-row items-center mb-2 p-3 bg-[#191A1D] rounded-lg"
              >
                <View className="flex-1">
                  <Text className="font-semibold text-[#F5F5F5]">
                    {item.kit.name || item.kit.kit_id}
                  </Text>
                  <Text className="text-xs text-[#BFBFBF]">Qty: {item.quantity}</Text>
                  <Text className="text-xs text-[#BFBFBF]">
                    Unit Price: ₹{item.unit_price}   |   Total: ₹{item.total_price}
                  </Text>
                </View>
              </View>
            ))
          )}
          {kits.length > 0 && (
            <Text className="text-sm text-[#FAD90E] font-semibold mt-2">
              Total Kit Price: ₹{totalKitPrice.toFixed(2)}
            </Text>
          )}
        </View>

        {/* Addresses */}
        <View className="mb-6">
          <Text className="text-base font-bold text-[#FAD90E] mb-2">Addresses</Text>
          <Text className="text-xs text-[#BFBFBF] font-semibold">Delivery Address:</Text>
          <Text className="text-sm text-[#F5F5F5] mb-2">
            {order.delivery_address || "N/A"}
          </Text>
          <Text className="text-xs text-[#BFBFBF] font-semibold">Billing Address:</Text>
          <Text className="text-sm text-[#F5F5F5]">{order.billing_address || "N/A"}</Text>
        </View>

        {/* Order Info */}
        <View className="mb-6">
          <Text className="text-base font-bold text-[#FAD90E] mb-2">Order Info</Text>
          <Text className="text-xs text-[#BFBFBF]">
            PO Date: <Text className="text-[#F5F5F5]">{order.po_date || "N/A"}</Text>
          </Text>
          <Text className="text-xs text-[#BFBFBF]">
            Production Unit:{" "}
            <Text className="text-[#F5F5F5]">{order.production_unit || "N/A"}</Text>
          </Text>
          <Text className="text-xs text-[#BFBFBF]">
            Remarks: <Text className="text-[#F5F5F5]">{order.remarks || "N/A"}</Text>
          </Text>
          <Text className="text-xs text-[#BFBFBF]">
            Payment %:{" "}
            <Text className="text-[#F5F5F5]">{order.payment_percentage || "N/A"}</Text>
          </Text>
        </View>

        {/* Docs and Lots Buttons */}
        <View className="mb-6 flex-row flex-wrap gap-3 justify-center">
          <TouchableOpacity
            onPress={() => {
              // navigate to QC Docs
            }}
            className="bg-[#007aff] rounded-lg px-6 py-2"
          >
            <Text className="text-white font-bold">QC Docs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigate to Dispatch Docs
            }}
            className="bg-[#7c3aed] rounded-lg px-6 py-2"
          >
            <Text className="text-white font-bold">Dispatch Docs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // navigate to Dispatch Lots
            }}
            className="bg-[#10b981] rounded-lg px-6 py-2"
          >
            <Text className="text-white font-bold">Dispatch Lots</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminOrderDetailsScreen;
