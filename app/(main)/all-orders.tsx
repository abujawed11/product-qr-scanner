
import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { useQuery } from '@tanstack/react-query';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Fetch orders function for useQuery
async function fetchOrders(): Promise<Order[]> {
  const res = await api.get<Order[]>('/orders/');
  return res.data;
}

export default function AllOrdersScreen() {
  // React Query fetch (no custom refetchOnMount/etc!)
  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ['myOrders'],
    queryFn: fetchOrders,
    // No extra options needed: defaults will work as with MyScansScreen!
  });

  // Handle hardware back button for navigation (expo-router)
  useFocusEffect(() => {
    const onBackPress = () => {
      router.replace('/(main)/dashboard');
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  });

  // Pull to refresh
  const onRefresh = () => {
    refetch();
  };

  // UI: Loading
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        <Text className="text-white mt-2">Loading orders...</Text>
      </View>
    );
  }

  // UI: Error
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white mt-2">Failed to load orders. Please try again.</Text>
        <TouchableOpacity
          onPress={onRefresh}
          className="bg-yellow-400 px-6 py-2 rounded-full mt-4"
        >
          <Text className="text-black text-xs font-semibold text-center">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-4"
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
        />
      }
    >
      {orders.length === 0 ? (
        <Text className="text-white text-center mt-6">No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.project_id} className="bg-white rounded-2xl p-4 mb-4 shadow relative">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-black text-lg font-bold">
                🏗️ Project ID: {order.project_id}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/(main)/order-details',
                    params: { order_id: order.order_id },
                  })
                }
                className="bg-yellow-400 px-4 py-2 rounded-full active:opacity-80"
              >
                <Text className="text-black text-xs font-semibold text-center">View Details</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600 text-sm">👤 Client ID: {order.client_id}</Text>
            <Text className="text-gray-600 text-sm">
              🗓️ Ordered: {order.order_date ? new Date(order.order_date).toDateString() : '-'}
            </Text>
            {order.delivery_date && (
              <Text className="text-gray-600 text-sm">
                ✅ Delivered: {new Date(order.delivery_date).toDateString()}
              </Text>
            )}
            {order.po_date && (
              <Text className="text-gray-600 text-sm">
                📄 PO Date: {order.po_date ? new Date(order.po_date).toDateString() : '-'}
              </Text>
            )}
            <Text className="text-black text-sm mt-2">
              🔢 Unique Kits: {order.kit_count}
            </Text>
            <Text className="text-black text-sm">
              📦 Total Kits: {order.total_quantity}
            </Text>
            {order.delivery_status && (
              <Text className="text-gray-700 text-sm">
                📦 Delivery Status: {order.delivery_status}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
