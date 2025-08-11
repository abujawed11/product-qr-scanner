
import { useAuth } from '@/context/AuthContext';
import { useRefresh } from '@/context/RefreshContext';
import api from '@/utils/api';
import { COLORS } from '@/utils/color';
import { mapCodeToCity } from '@/utils/mapCodeToCity';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface WarrantyClaim {
  kit_id: string;
  kit_number: number;
  order: { order_id: string } | null;
  war_req_id: string;
}

export default function KitDetailsScreen() {
  // const { scan_id, kit_id } = useLocalSearchParams();
  const { scan_id, kit_id, all_scanned, total_kits } = useLocalSearchParams();
  const { user } = useAuth();
  const { refreshKey } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');


  const allScanned = all_scanned === "true";

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace('/(main)/dashboard');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (scan_id) {
          const res = await api.get(`/kit-scan-details/${scan_id}/`);
          setData(res.data);
          console.log(res.data)
        } else if (kit_id) {
          const res = await api.get(`/kit/${kit_id}/`);
          setData({ kit: res.data, kit_id: kit_id });
        } else {
          throw new Error('Missing scan_id or kit_id');
        }
      } catch (err) {
        setError('Failed to fetch kit details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [scan_id, kit_id]);

  const {
    data: claims = [],
  } = useQuery<WarrantyClaim[]>({
    queryKey: ['kitDetails'],
    queryFn: async () => {
      const res = await api.get('/warranty-claims-status/');
      return res.data as WarrantyClaim[];
    },
    staleTime: 0,
  });

  const claimedTripleToWarReqId = React.useMemo(() => {
    const map: Record<string, string> = {};
    claims.forEach(claim => {
      if (
        claim.kit_id &&
        claim.kit_number !== undefined &&
        claim.order &&
        claim.order.order_id &&
        claim.war_req_id
      ) {
        const kitId = String(claim.kit_id).trim().toLowerCase();
        const orderId = String(claim.order.order_id).trim().toLowerCase();
        const kitNo = String(claim.kit_number).trim();
        const triple = `${orderId}|${kitId}|${kitNo}`;
        map[triple] = claim.war_req_id;
      }
    });
    return map;
  }, [claims]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.text} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: COLORS.background }}>
        <Text className="text-center text-lg" style={{ color: COLORS.text }}>
          {error || 'No data found.'}
        </Text>
      </View>
    );
  }

  const {
    kit_id: kitId = '',
    prod_unit = '',
    warehouse = '',
    project_id = '',
    kit_no = '',
    date = '',
    order_id = '',
    kit,
  } = data;

  const kitIdStr = String(kitId).trim().toLowerCase();
  const kitNoStr = String(kit_no).trim();
  const orderIdStr = String(order_id).trim().toLowerCase();
  const tripleKey = `${orderIdStr}|${kitIdStr}|${kitNoStr}`;
  const war_req_id = claimedTripleToWarReqId[tripleKey];
  const isClaimed = !!war_req_id;

  const client_id = project_id?.split('/')[0]?.trim() || '';
  const company_name = user?.company_name;

  const handleClaimWarranty = () => {
    router.push({
      pathname: '/warranty/claim-form',
      params: {
        order_id: order_id ?? '',
        scan_id: scan_id ?? '',
        kit_id: kitId ?? '',
        kit_no: kit_no ?? '',
        project_id: project_id ?? '',
        purchase_date: date ?? '',
        client_id: client_id ?? '',
        company_name: company_name,
        email: user?.email || '',
      },
    });
  };

  const isClientMatch = (projectId: string): boolean => {
    const prefix = projectId.split('/')[0].trim();
    return user?.client_id === prefix;
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.text }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-4 py-6">
        <Text className="text-2xl font-bold mb-5" style={{ color: COLORS.background }}>
          Kit Details
        </Text>

        {prod_unit ? (
          <View className="rounded-xl p-5 mb-5" style={{ backgroundColor: COLORS.fieldBg }}>
            {[
              { icon: 'shield-checkmark', label: 'Kit ID', value: kitId },
              allScanned
                ? { icon: 'settings-outline', label: 'Total Kits', value: total_kits }
                : { icon: 'settings-outline', label: 'Kit No', value: kit_no },
              // { icon: 'settings-outline', label: 'Kit No', value: kit_no },
              { icon: 'business', label: 'Production Unit', value: mapCodeToCity(prod_unit) },
              { icon: 'cube-outline', label: 'Warehouse', value: mapCodeToCity(warehouse) },
              { icon: 'briefcase-outline', label: 'Project ID', value: project_id },
              { icon: 'calendar-outline', label: 'Purchase Date', value: date },
            ].map(info => (
              <View key={info.label} className="flex-row items-center mb-3">
                <Ionicons name={info.icon as any} size={20} color={COLORS.text} className="mr-3 opacity-75" />
                <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
                  {info.label}:
                </Text>
                <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
                  {info.value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View className="rounded-xl p-5 mb-5" style={{ backgroundColor: COLORS.fieldBg }}>
            <View className="flex-row items-center mb-3">
              <Ionicons name="shield-checkmark" size={20} color={COLORS.text} className="mr-3 opacity-75" />
              <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
                Kit ID:
              </Text>
              <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
                {kitId}
              </Text>
            </View>
            <Text className="text-sm italic mt-2" style={{ color: COLORS.text }}>
              This is a read-only preview. You are not authorized to view order information.
            </Text>
          </View>
        )}

        {/* Kit Configuration */}
        <Text className="text-xl font-semibold mb-3" style={{ color: COLORS.background }}>
          Kit Configuration
        </Text>
        <View className="rounded-xl p-5 mb-6" style={{ backgroundColor: COLORS.fieldBg }}>
          {/* {[
            { label: 'Tilt Angle', value: `${kit?.tilt_angle}°` },
            { label: 'Clearance', value: `${kit?.clearance} mm` },
            { label: 'Configuration', value: kit?.configuration },
            { label: 'No. of Panels', value: kit?.num_panels },
            { label: 'Region', value: kit?.region || '-' },
            // { label: 'Price', value: `${kit?.price} ${kit?.currency}` },
          ].map(info => (
            <View key={info.label} className="flex-row mb-2">
              <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
                {info.label}:
              </Text>
              <Text className="text-base font-bold" style={{ color: COLORS.text }}>
                {info.value}
              </Text>
            </View>
          ))} */}
          {[
            { label: 'Tilt Angle', value: `${kit?.tilt_angle}°` },
            { label: 'Clearance', value: `${kit?.clearance} mm` },
            { label: 'Configuration', value: kit?.configuration },
            { label: 'No. of Panels', value: kit?.num_panels },
            { label: 'Region', value: kit?.region || '-' },
          ].map(info => (
            <View key={info.label} className="flex-row mb-2 flex-wrap">
              <Text
                className="text-base font-medium"
                style={{ color: COLORS.text, minWidth: 140 }}
              >
                {info.label}:
              </Text>
              <Text
                className="text-base font-bold flex-1"
                style={{ color: COLORS.text }}
                numberOfLines={0} // allow unlimited lines
              >
                {info.value}
              </Text>
            </View>
          ))}
        </View>

        {allScanned && (
          <View style={{
            marginBottom: 16,
            padding: 12,
            backgroundColor: '#FFF8E1',
            borderColor: '#FFD700',
            borderWidth: 1.5,
            borderRadius: 10,
          }}>
            <Text style={{ color: '#b28900', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
              All kits ({total_kits}) already scanned under this project.
            </Text>
          </View>
        )}

        {isClaimed && (
          <View className="mb-4 px-2 py-3 rounded-xl bg-yellow-100 border border-yellow-400">
            <Text className="text-yellow-700 text-base font-semibold text-center">
              You have already applied for Warranty for this Kit.
            </Text>
          </View>
        )}


      </ScrollView>

      {scan_id && project_id && isClientMatch(project_id) && !allScanned && (
        <View className="left-0 right-0 py-9 border-t border-gray-700 items-center" style={{ backgroundColor: COLORS.text }}>
          {isClaimed ? (
            <TouchableOpacity
              className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
              activeOpacity={0.85}
              onPress={() => {
                if (war_req_id) {
                  router.push({
                    pathname: '/(main)/warranty/warranty-status-page',
                    params: { war_req_id },
                  });
                } else {
                  Alert.alert("Not Found", "Warranty claim record not found for this kit.");
                }
              }}
            >
              <Ionicons name="eye" size={22} color="#000" className="mr-2" />
              <Text className="text-black font-bold text-lg tracking-wide">
                Show Warranty Status
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleClaimWarranty}
              className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
              activeOpacity={0.8}
            >
              <Ionicons name="medal-outline" size={24} color="#000" className="mr-2" />
              <Text className="text-black font-bold text-lg tracking-wide">Request Warranty</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
