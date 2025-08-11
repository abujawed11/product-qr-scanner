
import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { getStatusColor } from '@/utils/statusColor';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const goToOrderDetails = (customerId: string) => {
    router.push(`/(main)/order-details?customerId=${customerId}`);
  };

  const getPanelCount = (configuration: string): number => {
    const configMap: Record<string, number> = {
      '2P×3': 6,
      '2P×5': 10,
    };
    return configMap[configuration] || 0;
  };

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-2"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {orders.length === 0 ? (
        <Text className="text-white text-center mt-8 text-lg">No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
            <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>
            <Text className="text-gray-600 text-sm mt-1">
              🗓️ {new Date(order.order_date).toDateString()}
            </Text>

            {/* Kits Ordered */}
            <View className="mt-3 mb-2">
              <Text className="text-black font-semibold text-sm mb-1">🛠️ Kits Ordered:</Text>
              {order.items.slice(0, 2).map((item, index) => {
                const config = item.kit.configuration;
                const panels = getPanelCount(config);
                return (
                  <View key={index} className="ml-2 mb-1">
                    <Text className="text-sm text-black">
                      • {config} ({panels} Panels) – Qty: {item.quantity}
                    </Text>
                  </View>
                );
              })}
              {order.items.length > 2 && (
                <Text className="ml-2 text-xs text-gray-500">
                  + {order.items.length - 2} more kits
                </Text>
              )}
            </View>

            {/* Status */}
            <Text className={`mt-2 font-semibold ${getStatusColor(order.status)}`}>
              📌 Status: {order.status.toUpperCase()}
            </Text>

            {/* Claim Warranty Button */}
            <View className="mt-4">
              <Text
                onPress={() =>
                  router.push({
                    pathname: '/(main)/warranty/claim-form',
                    params: { order_id: order.order_id },
                  })
                }
                className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
              >
                🛡️ Request Warranty
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MyOrdersScreen;