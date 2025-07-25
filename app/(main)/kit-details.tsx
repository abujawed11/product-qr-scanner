// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { Ionicons } from '@expo/vector-icons';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function KitDetailsScreen() {
//   const { scan_id } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState('');

//   const { user } = useAuth();

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await api.get(`/kit-scan-details/${scan_id}/`);
//         console.log("kit-details................",res.data)
//         setData(res.data);
//       } catch (err: any) {
//         console.error(err);
//         setError('Failed to fetch kit details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [scan_id]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center" style={{ backgroundColor: COLORS.background }}>
//         <ActivityIndicator size="large" color={COLORS.text} />
//       </View>
//     );
//   }

//   if (error || !data) {
//     return (
//       <View className="flex-1 justify-center items-center px-4" style={{ backgroundColor: COLORS.background }}>
//         <Text className="text-center text-lg" style={{ color: COLORS.text }}>
//           {error || 'No data found.'}
//         </Text>
//       </View>
//     );
//   }
//   //   console.log(data.order_id)
//   const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;

//   const client_id = project_id.split('/')[0].trim();
//   const comapny_name = user?.company_name;
//   //   console.log(client_id)

//   const handleClaimWarranty = () => {
//     router.push({
//       pathname: '/warranty/claim-form',
//       params: {
//         order_id: order_id ?? '',
//         scan_id: scan_id ?? '',
//         kit_id: kit_id ?? '',
//         kit_no: kit_no ?? '',
//         project_id: project_id ?? '',
//         purchase_date: date ?? '',
//         client_id: client_id ?? '',
//         company_name: comapny_name
//       },
//     });
//   };



//   const isClientMatch = (projectId: string): boolean => {
//     const prefix = projectId.split('/')[0].trim(); // Get "CUST0001" from "CUST0001/ 03"
//     return user?.client_id === prefix;
//   };

//   return (
//     <View className="flex-1" style={{ backgroundColor: COLORS.text }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="px-4 py-6">
//         {/* Title */}
//         <Text className="text-2xl font-bold mb-5" style={{ color: COLORS.background }}>
//           Scanned Kit Information
//         </Text>

//         {/* Purchase Info Card */}
//         <View
//           className="rounded-xl p-5 mb-5"
//           style={{
//             backgroundColor: COLORS.fieldBg,
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 3 },
//             shadowRadius: 14,
//             elevation: 5,
//           }}
//         >
//           <View className="flex-row items-center mb-3">
//             <Ionicons name="shield-checkmark" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Kit ID:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {kit_id}
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <Ionicons name="settings-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Kit No:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {kit_no}
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <Ionicons name="business" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Production Unit:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {prod_unit}
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <Ionicons name="cube-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Warehouse:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {warehouse}
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <Ionicons name="briefcase-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Project ID:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {project_id}
//             </Text>
//           </View>

//           <View className="flex-row items-center">
//             <Ionicons name="calendar-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Purchase Date:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {date}
//             </Text>
//           </View>
//         </View>

//         {/* Kit Details Card */}
//         <Text className="text-xl font-semibold mb-3" style={{ color: COLORS.background }}>
//           Kit Configuration
//         </Text>
//         <View
//           className="rounded-xl p-5"
//           style={{
//             backgroundColor: COLORS.fieldBg,
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 3 },
//             shadowRadius: 14,
//             elevation: 5,
//             marginBottom: 20,
//           }}
//         >
//           <View className="flex-row mb-2">
//             <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
//               Tilt Angle:
//             </Text>
//             <Text className="text-base font-bold" style={{ color: COLORS.text }}>
//               {kit.tilt_angle}°
//             </Text>
//           </View>

//           <View className="flex-row mb-2">
//             <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
//               Clearance:
//             </Text>
//             <Text className="text-base font-bold" style={{ color: COLORS.text }}>
//               {kit.clearance} mm
//             </Text>
//           </View>

//           <View className="flex-row mb-2">
//             <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
//               Configuration:
//             </Text>
//             <Text className="text-base font-bold" style={{ color: COLORS.text }}>
//               {kit.configuration}
//             </Text>
//           </View>

//           <View className="flex-row mb-2">
//             <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
//               No. of Panels:
//             </Text>
//             <Text className="text-base font-bold" style={{ color: COLORS.text }}>
//               {kit.num_panels}
//             </Text>
//           </View>

//           {/* <View className="flex-row">
//             <Text className="text-base font-medium" style={{ color: COLORS.text, minWidth: 140 }}>
//               Price:
//             </Text>
//             <Text className="text-base font-bold" style={{ color: COLORS.text }}>
//               ₹{kit.price}
//             </Text>
//           </View> */}
//         </View>
//       </ScrollView>

//       {/* Sticky Claim Warranty Button */}
//       {isClientMatch(project_id) && (
//         <View
//           className="left-0 right-0 py-9 border-t border-gray-700 bg-[${COLORS.background}] items-center"
//           style={{ backgroundColor: COLORS.text, borderTopColor: '#262626' }}
//         >
//           <TouchableOpacity
//             onPress={handleClaimWarranty}
//             className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//             activeOpacity={0.8}
//             style={{
//               shadowColor: '#c0b100',
//               shadowOpacity: 0.15,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 7,
//             }}
//           >
//             <Ionicons name="medal-outline" size={24} color="#000" className="mr-2" />
//             <Text className="text-black font-bold text-lg tracking-wide">Request Warranty</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>

//   );
// }



import { useAuth } from '@/context/AuthContext';
import { useRefresh } from '@/context/RefreshContext';
import api from '@/utils/api';
import { COLORS } from '@/utils/color';
import { mapCodeToCity } from '@/utils/mapCodeToCity';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface WarrantyClaim {
  kit_id: string;
  kit_number: number; // important for triple match!
  order: { order_id: string } | null;
}

export default function KitDetailsScreen() {
  const { scan_id } = useLocalSearchParams();
  const { user } = useAuth();
  const { refreshKey } = useRefresh();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [claimedTriples, setClaimedTriples] = useState<Set<string>>(new Set());

  // For handling Android back button
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

  // Fetch kit details info (for this scan)
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/kit-scan-details/${scan_id}/`);
        setData(res.data);
      } catch (err: any) {
        setError('Failed to fetch kit details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [scan_id]);

  // Fetch claims for this user on mount/refreshKey change
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const claimsRes = await api.get('/warranty-claims-status/');
        const set = new Set<string>();
        (claimsRes.data as WarrantyClaim[]).forEach(claim => {
          if (
            claim.kit_id &&
            claim.kit_number !== undefined &&
            claim.order &&
            claim.order.order_id
          ) {
            const kitId = String(claim.kit_id).trim().toLowerCase();
            const orderId = String(claim.order.order_id).trim().toLowerCase();
            const kitNo = String(claim.kit_number).trim();
            set.add(`${orderId}|${kitId}|${kitNo}`);
          }
        });
        setClaimedTriples(set);
      } catch {
        // ignore claim fetch error for UI speed
      }
    };
    fetchClaims();
  }, [refreshKey]);

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

  // Destructure what you need from data
  const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;
  // `kit` contains kit-config (tilt, panels, etc.)

  // Compute if this kit is "claimed"
  const kitIdStr = String(kit_id).trim().toLowerCase();
  const kitNoStr = String(kit_no).trim();
  const orderIdStr = String(order_id).trim().toLowerCase();
  const isClaimed = claimedTriples.has(`${orderIdStr}|${kitIdStr}|${kitNoStr}`);

  const client_id = project_id.split('/')[0].trim();
  const company_name = user?.company_name;

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
        client_id: client_id ?? '',
        company_name: company_name
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
              {mapCodeToCity(prod_unit)}
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Ionicons name="cube-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
            <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
              Warehouse:
            </Text>
            <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
              {mapCodeToCity(warehouse)}
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
              {kit.tilt_angle}
              °
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


        </View>
        {isClaimed && (
          <View className="mb-4 px-2 py-3 rounded-xl bg-yellow-100 border border-yellow-400">
            <Text className="text-yellow-700 text-base font-semibold text-center">
              You have already applied for Warranty for this Kit.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Sticky Claim Warranty Button */}
      {isClientMatch(project_id) && (
        <View
          className="left-0 right-0 py-9 border-t border-gray-700 bg-[${COLORS.background}] items-center"
          style={{ backgroundColor: COLORS.text, borderTopColor: '#262626' }}
        >
          {isClaimed ? (
            <>
              {/* <Text className="text-center text-black font-bold text-lg">
                ✅ Warranty Applied
              </Text> */}
              <TouchableOpacity
                className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
                activeOpacity={0.85}
                onPress={() => {
                  const url = '/(main)/warranty?initialTab=warranty-status';
                  // console.log('[WarrantyNav] Navigating to warranty with:', url);
                  router.push(url);
                }}
                style={{
                  shadowColor: '#c0b100',
                  shadowOpacity: 0.15,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 7,
                }}
              >
                <Ionicons name="eye" size={22} color="#000" className="mr-2" />
                <Text className="text-black font-bold text-lg tracking-wide">
                  Show Warranty Status
                </Text>
              </TouchableOpacity>


              {/* <TouchableOpacity
                className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
                activeOpacity={0.85}
                onPress={() =>
                  
                  router.push({
                    pathname: '/(main)/warranty',
                    params: { initialTab: 'warranty-status' }
                    // Optionally pass kit_id or war_req_id as param if status page supports search/filter
                    // params: { kit_id: kit_id, kit_no: kit_no, ... }
                  })
                }
                style={{
                  shadowColor: '#c0b100',
                  shadowOpacity: 0.15,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 7,
                }}
              >
                <Ionicons name="eye" size={22} color="#000" className="mr-2" />

                <Text className="text-black font-bold text-lg tracking-wide">
                  Show Warranty Status
                </Text>
              </TouchableOpacity> */}
            </>
            // <View className="bg-gray-400 rounded-xl opacity-70 px-12 py-4">
            //   <Text className="text-center text-black font-bold text-lg">
            //     ✅ Warranty Applied
            //   </Text>
            // </View>
          ) : (
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
          )}
        </View>
      )}
    </View>
  );
}
