
import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { formatDateTime } from '@/utils/formatDate';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Interfaces
interface OrderItem {
  id: string;
  quantity: number;
  kit: {
    kit_id: string;
    configuration: string;
    num_panels: number;
    tilt_angle: number;
    region: string;
    clearance: number;
  };
}

export default function OrderDetailsScreen() {
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const [expandedGroups, setExpandedGroups] = useState<{ [kitId: string]: boolean }>({});

  useFocusEffect(() => {
    const onBackPress = () => {
      router.replace('/(main)/all-orders');
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get<Order>(`/orders/${order_id}/`);
        setOrder(res.data);
      } catch (error) {
        console.error('Failed to fetch order by ID:', error);
      } finally {
        setLoading(false);
      }
    };
    if (order_id) {
      fetchDetails();
    }
  }, [order_id]);

  let groupedKitsArray: {
    kit: OrderItem['kit'];
    kit_id: string;
    totalQuantity: number;
    rows: OrderItem[];
  }[] = [];

  if (order) {
    const groupedKits: {
      [kitId: string]: {
        kit: OrderItem['kit'];
        totalQuantity: number;
        rows: OrderItem[];
      };
    } = {};
    order.items.forEach(item => {
      const kitId = item.kit.kit_id;
      if (!groupedKits[kitId]) {
        groupedKits[kitId] = {
          kit: item.kit,
          totalQuantity: 0,
          rows: [],
        };
      }
      groupedKits[kitId].totalQuantity += item.quantity;
      groupedKits[kitId].rows.push(item);
    });
    groupedKitsArray = Object.entries(groupedKits).map(([kit_id, group]) => ({
      ...group,
      kit_id,
    }));
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        <Text className="text-white mt-4">Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">No order found.</Text>
      </View>
    );
  }

  const handleToggleGroup = (kit_id: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [kit_id]: !prev[kit_id],
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <Text
          className="text-2xl font-bold text-center mb-6"
          style={{ color: BACKGROUND_COLOR }}
        >
          Order Details
        </Text>

        {/* Order Info */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-white mb-2">Order Info</Text>
          <Text className="text-white">Project ID: {order.project_id}</Text>
          <Text className="text-white">Status: {order.status}</Text>
          <Text className="text-white">Order Date: {formatDateTime(order.order_date)}</Text>
          <Text className="text-white">Billing Address: {order.billing_address}</Text>
          <Text className="text-white">Delivery Address: {order.delivery_address}</Text>
          {order.delivery_date && (
            <Text className="text-white">
              Delivered On: {new Date(order.delivery_date).toDateString()}
            </Text>
          )}
          {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
        </View>

        {/* Ordered Kits */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-white mb-2">
            Ordered Kits (Grouped by Kit)
          </Text>
          {groupedKitsArray.map((group, idx) => (
            <View
              key={group.kit.kit_id}
              style={{
                backgroundColor: expandedGroups[group.kit.kit_id] ? "#23262b" : "#191c20",
                borderColor: expandedGroups[group.kit.kit_id] ? BACKGROUND_COLOR : "#333",
                borderWidth: 1,
                borderRadius: 16,
                marginBottom: 16,
                shadowColor: "#000",
                shadowOpacity: 0.5,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 16,
                  paddingHorizontal: 18,
                }}
                onPress={() => handleToggleGroup(group.kit.kit_id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      letterSpacing: 0.5,
                      fontSize: 16,
                    }}
                  >
                    {group.kit.kit_id}
                  </Text>
                  <Text
                    style={{
                      color: "#adc2dd",
                      fontSize: 13,
                      marginTop: 2,
                      fontWeight: "600",
                    }}
                  >
                    Quantity: {group.totalQuantity}
                  </Text>
                </View>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: BACKGROUND_COLOR,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#ccc",
                    shadowOpacity: 0.35,
                    shadowOffset: { width: 0, height: 2 },
                  }}
                >
                  <Text
                    style={{
                      color: "#14181d",
                      fontSize: 22,
                      fontWeight: "bold",
                      textAlign: "center",
                      lineHeight: 24,
                    }}
                  >
                    {expandedGroups[group.kit.kit_id] ? "−" : "+"}
                  </Text>
                </View>
              </TouchableOpacity>

              {expandedGroups[group.kit.kit_id] && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 6 }}>
                  <View style={{ marginBottom: 6 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                      <Text style={{ fontSize: 20, color: "#8BC34A", marginRight: 10 }}>•</Text>
                      <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                        <Text style={{ fontWeight: "700" }}>Tilt Angle</Text>: {group.kit.tilt_angle}°
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                      <Text style={{ fontSize: 20, color: "#8BC34A", marginRight: 10 }}>•</Text>
                      <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                        <Text style={{ fontWeight: "700" }}>Clearance</Text>: {group.kit.clearance} ft
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                      <Text style={{ fontSize: 20, color: "#6AC5F7", marginRight: 10 }}>•</Text>
                      <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                        <Text style={{ fontWeight: "700" }}>Panels</Text>: {group.kit.num_panels}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                      <Text style={{ fontSize: 20, color: "#FFA500", marginRight: 10 }}>•</Text>
                      <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                        <Text style={{ fontWeight: "700" }}>Region</Text>: {group.kit.region}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 14,
                      borderTopColor: "#444",
                      borderTopWidth: 1,
                      paddingTop: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#6EBB73",
                        fontWeight: "bold",
                        fontSize: 16,
                        letterSpacing: 0.5,
                      }}
                    >
                      Total Quantity: {group.totalQuantity}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Total Kits Ordered */}
          <View
            style={{
              marginTop: 10,
              paddingVertical: 12,
              borderTopWidth: 1,
              borderTopColor: '#555',
              backgroundColor: '#1a1a1a',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOpacity: 0.6,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 3 },
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: BACKGROUND_COLOR,
                fontWeight: 'bold',
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              Total Kits Ordered: {order.total_kits}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}