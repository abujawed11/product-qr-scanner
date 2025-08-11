import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import { mapCodeToCity } from '@/utils/mapCodeToCity';
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  BackHandler,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SavedOrder {
  scan_id: string;
  kit_id: string;
  prod_unit: string;
  warehouse: string;
  project_id: string;
  kit_no: number;
  date: string;
  scanned_at: string;
  order_id: string;
}
interface WarrantyClaim {
  kit_id: string;
  kit_number: number;
  order: { order_id: string } | null;
  war_req_id: string;
}

// Helper: Group by key
function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

const MyScansScreen: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [expandedProject, setExpandedProject] = useState<{ [projectId: string]: boolean }>({});
  const [expandedKit, setExpandedKit] = useState<{ [projectKit: string]: boolean }>({});

  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: true }
      );
      return true;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  });

  // Query for user's saved scans
  const {
    data: scans = [],
    isLoading: loadingScans,
    isRefetching: refetchingScans,
    refetch: refetchScans,
  } = useQuery<SavedOrder[]>({
    queryKey: ["myScans_savedOrders"],
    queryFn: async () => {
      const res = await api.get('/saved-orders/');
      return res.data as SavedOrder[];
    }
  });

  // Query for user's warranty claims
  const {
    data: claims = [],
    isLoading: loadingClaims,
    isRefetching: refetchingClaims,
    refetch: refetchClaims,
  } = useQuery<WarrantyClaim[]>({
    queryKey: ["myScans_claims"],
    queryFn: async () => {
      const res = await api.get('/warranty-claims-status/');
      return res.data as WarrantyClaim[];
    }
  });

  const loading = loadingScans || loadingClaims;
  const refreshing = refetchingScans || refetchingClaims;
  const onRefresh = () => {
    refetchScans();
    refetchClaims();
  };

  // Utility for claims lookup
  const claimedTriples = new Set<string>();
  claims.forEach(claim => {
    if (claim.kit_id && claim.kit_number !== undefined && claim.order && claim.order.order_id) {
      const kitId = String(claim.kit_id).trim().toLowerCase();
      const orderId = String(claim.order.order_id).trim().toLowerCase();
      const kitNo = String(claim.kit_number).trim();
      claimedTriples.add(`${orderId}|${kitId}|${kitNo}`);
    }
  });

  // Group by project_id, then kit_id inside each
  const groupedByProject = groupBy(scans, scan => scan.project_id);
  const projectIds = Object.keys(groupedByProject);

  const goToKitDetails = (scanId: string) => {
    router.push({
      pathname: '/(main)/kit-details',
      params: { scan_id: scanId }
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-lg text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-2"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {scans.length === 0 ? (
        <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
      ) : (
        projectIds.map(projectId => {
          // For each project, group by kit_id
          const kitsInProject = groupBy(groupedByProject[projectId], scan => scan.kit_id);
          const kitIds = Object.keys(kitsInProject);
          return (
            <View key={projectId} className="bg-white rounded-2xl p-2 mb-4 shadow">
              {/* Project accordion header */}
              <TouchableOpacity
                onPress={() =>
                  setExpandedProject(cur => ({ ...cur, [projectId]: !cur[projectId] }))
                }
                activeOpacity={0.7}
                className="flex-row items-center justify-between px-3 py-1"
              >
                <Text className="text-black text-lg font-bold">
                  🏗️ Project ID: {projectId}
                </Text>
                <Text className="text-yellow-400 font-bold text-2xl">
                  {expandedProject[projectId] ? '−' : '+'}
                </Text>
              </TouchableOpacity>
              {expandedProject[projectId] && (
                <View style={{ marginTop: 10 }}>
                  {kitIds.map(kitId => {
                    const kitKey = `${projectId}|${kitId}`;
                    return (
                      <View key={kitKey} className="mb-2">
                        {/* Kit accordion header */}
                        <TouchableOpacity
                          onPress={() =>
                            setExpandedKit(cur => ({ ...cur, [kitKey]: !cur[kitKey] }))
                          }
                          className="flex-row items-center justify-between px-3 py-1"
                        >
                          {/* <Text className="text-black font-medium text-base">
                            🧩 Kit ID: {kitId}
                          </Text> */}
                          <Text className="text-black text-base font-extrabold">
                            🧩 <Text className="font-extrabold">KIT ID:</Text> <Text className="font-extrabold">{kitId}</Text>
                          </Text>

                          <Text className="text-yellow-600 font-bold text-xl">
                            {expandedKit[kitKey] ? '−' : '+'}
                          </Text>
                        </TouchableOpacity>
                        {expandedKit[kitKey] && (
                          <View style={{ paddingLeft: 16, paddingTop: 2 }}>
                            {kitsInProject[kitId].map(scan => {
                              const kitNo = String(scan.kit_no).trim();
                              const orderIdStr = String(scan.order_id).trim().toLowerCase();
                              const kitIdStr = kitId.trim().toLowerCase();
                              const isClaimed = claimedTriples.has(`${orderIdStr}|${kitIdStr}|${kitNo}`);
                              return (
                                <View key={scan.scan_id} className="bg-gray-100 rounded-xl px-2 py-2 mb-2">
                                  <Text className="text-black font-semibold">Kit No: {scan.kit_no}</Text>
                                  <Text className="text-sm text-black">• Prod Unit: {mapCodeToCity(scan.prod_unit)}</Text>
                                  <Text className="text-sm text-black">• Warehouse: {mapCodeToCity(scan.warehouse)}</Text>
                                  {/* <Text className="text-sm text-black">• Date: {scan.date}</Text> */}
                                  <Text className="text-gray-700 text-xs mt-1">
                                    🗓️ {new Date(scan.scanned_at).toLocaleString()}
                                  </Text>
                                  {isClaimed ? (
                                    <View className="bg-gray-400 mt-3 rounded-xl opacity-70">
                                      <Text className="text-center text-black font-bold py-2">
                                        ✅ Warranty Applied
                                      </Text>
                                    </View>
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() => goToKitDetails(scan.scan_id)}
                                      className="bg-yellow-400 mt-3 rounded-xl"
                                    >
                                      <Text className="text-center text-black font-bold py-2">
                                        🛡️ Request Warranty
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default MyScansScreen;
