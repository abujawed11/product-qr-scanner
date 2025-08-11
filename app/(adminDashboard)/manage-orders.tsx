
import { AdminOrderCard } from "@/components/AdminOrderCard";
import { FilterSortBar } from "@/components/FilterSortBar";
import { AdminOrder } from "@/types/adminOrder.types";
import api from "@/utils/api";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const ACCENT = "#FAD90E";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default function ManageOrdersScreen() {
  const [paginated, setPaginated] = useState<PaginatedResponse<AdminOrder> | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const fetchOrders = useCallback(async (url?: string) => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      params.ordering = sort === "desc" ? "-created_at" : "created_at";
      const endpoint = url ?? "/admin/orders/";
      const response = await api.get<PaginatedResponse<AdminOrder>>(endpoint, { params });
      // console.log("Admin Order data: -->",response.data.results[0].order_id);
      setPaginated(response.data);
      setOrders(response.data.results);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, sort]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, [fetchOrders]);

  const goNext = () => paginated?.next && fetchOrders(paginated.next);
  const goPrev = () => paginated?.previous && fetchOrders(paginated.previous);

  return (
    <View className="flex-1 bg-[#0F1112] p-5">
      {/* Heading + Refresh Button */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#FAD90E] text-2xl font-bold tracking-widest text-left">
          Manage Orders
        </Text>
        <TouchableOpacity
          onPress={() => fetchOrders()}
          className="bg-[#fad90e] px-4 py-2 rounded-xl"
          accessibilityLabel="Refresh Orders"
          activeOpacity={0.8}
          style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text className="text-[#0f1112] text-base font-bold mr-1">🔄</Text>
          <Text className="text-[#0f1112] text-base font-bold">Refresh</Text>
        </TouchableOpacity>
      </View>

      <FilterSortBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onFilter={() => fetchOrders()}
      />

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={ACCENT} style={{ marginTop: 60 }} />
      ) : (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={ACCENT}
            />
          }
        >
          {orders.length === 0 ? (
            <View className="justify-center items-center mt-16">
              <Text className="text-6xl mb-3">📂</Text>
              <Text className="text-[#BFBFBF] text-lg">No orders found.</Text>
            </View>
          ) : (
            orders.map((order) => (
              <AdminOrderCard
                key={order.order_id}
                order={order}
                onViewDetails={() =>
                  router.push({
                    pathname: "/(adminDashboard)/admin-order-details",
                    params: { orderId: order.order_id },
                  })
                }
              />
            ))
          )}

          {paginated && (
            <View className="flex-row justify-between my-6">
              <TouchableOpacity
                disabled={!paginated.previous}
                onPress={goPrev}
                className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
                style={{ opacity: paginated.previous ? 1 : 0.4 }}
                accessibilityLabel="Previous Page"
              >
                <Text className="text-[#1c1c1c] font-bold text-base">⟵ Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!paginated.next}
                onPress={goNext}
                className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
                style={{ opacity: paginated.next ? 1 : 0.4 }}
                accessibilityLabel="Next Page"
              >
                <Text className="text-[#1c1c1c] font-bold text-base">Next ⟶</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
