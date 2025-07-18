import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import { COLORS } from '@/utils/color';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function KitDetailsScreen() {
  const { scan_id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  const { user } = useAuth();

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
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/kit-scan-details/${scan_id}/`);
        // console.log("kit-details................")
        setData(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch kit details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [scan_id]);

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
  //   console.log(data.order_id)
  const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;

  const client_id = project_id.split('/')[0].trim();
  //   console.log(client_id)

  const handleClaimWarranty = () => {
    router.push({
      pathname: '/warranty/claim-form',
      params: {
        order_id: order_id ?? '',
        scan_id: scan_id ?? '',
        kit_id: kit_id ?? '',
        kit_no: kit_no ?? '',
        project_id: project_id ?? '',
        purchase_date: date ?? '',
        client_id: client_id ?? ''
      },
    });
  };



  const isClientMatch = (projectId: string): boolean => {
    const prefix = projectId.split('/')[0].trim(); // Get "CUST0001" from "CUST0001/ 03"
    return user?.client_id === prefix;
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.text }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-4 py-6">
        {/* Title */}
        <Text className="text-2xl font-bold mb-5" style={{ color: COLORS.background }}>
          Scanned Kit Information
        </Text>

        {/* Purchase Info Card */}
        <View
          className="rounded-xl p-5 mb-5"
          style={{
            backgroundColor: COLORS.fieldBg,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 14,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="shield-checkmark" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Kit ID:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {kit_id}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="settings-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Kit No:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {kit_no}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="business" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Production Unit:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {prod_unit}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="cube-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Warehouse:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {warehouse}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="briefcase-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Project ID:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {project_id}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Purchase Date:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {date}
            </Text>
          </View>
        </View>

        {/* Kit Details Card */}
        <Text className="text-xl font-semibold mb-3" style={{ color: COLORS.background }}>
          Kit Configuration
        </Text>
        <View
          className="rounded-xl p-5"
          style={{
            backgroundColor: COLORS.fieldBg,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 14,
            elevation: 5,
            marginBottom: 20,
          }}
        >
          <View className="flex-row mb-2">
            <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
              Tilt Angle:
            </Text>
            <Text className="text-base font-bold" style={{ color: COLORS.text }}>
              {kit.tilt_angle}°
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
              Clearance:
            </Text>
            <Text className="text-base font-bold" style={{ color: COLORS.text }}>
              {kit.clearance} mm
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
              Configuration:
            </Text>
            <Text className="text-base font-bold" style={{ color: COLORS.text }}>
              {kit.configuration}
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
              No. of Panels:
            </Text>
            <Text className="text-base font-bold" style={{ color: COLORS.text }}>
              {kit.num_panels}
            </Text>
          </View>

          <View className="flex-row">
            <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
              Price:
            </Text>
            <Text className="text-base font-bold" style={{ color: COLORS.text }}>
              ₹{kit.price}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Claim Warranty Button */}
      {isClientMatch(project_id) && (
        <View
          className="left-0 right-0 py-9 border-t border-gray-700 bg-[${COLORS.background}] items-center"
          style={{ backgroundColor: COLORS.text, borderTopColor: '#262626' }}
        >
          <TouchableOpacity
            onPress={handleClaimWarranty}
            className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
            activeOpacity={0.8}
            style={{
              shadowColor: '#c0b100',
              shadowOpacity: 0.15,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 7,
            }}
          >
            <Ionicons name="medal-outline" size={24} color="#000" className="mr-2" />
            <Text className="text-black font-bold text-lg tracking-wide">Request Warranty</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>

  );
}
