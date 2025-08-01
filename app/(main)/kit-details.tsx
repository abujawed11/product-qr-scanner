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


//==================working===================
// import { useAuth } from '@/context/AuthContext';
// import { useRefresh } from '@/context/RefreshContext';
// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { mapCodeToCity } from '@/utils/mapCodeToCity';
// import { Ionicons } from '@expo/vector-icons';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// interface WarrantyClaim {
//   kit_id: string;
//   kit_number: number; // important for triple match!
//   order: { order_id: string } | null;
// }

// export default function KitDetailsScreen() {
//   const { scan_id } = useLocalSearchParams();
//   const { user } = useAuth();
//   const { refreshKey } = useRefresh();

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState('');
//   const [claimedTriples, setClaimedTriples] = useState<Set<string>>(new Set());

//   // For handling Android back button
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

//   // Fetch kit details info (for this scan)
//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(`/kit-scan-details/${scan_id}/`);
//         setData(res.data);
//       } catch (err: any) {
//         setError('Failed to fetch kit details');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [scan_id]);

//   // Fetch claims for this user on mount/refreshKey change
//   useEffect(() => {
//     const fetchClaims = async () => {
//       try {
//         const claimsRes = await api.get('/warranty-claims-status/');
//         const set = new Set<string>();
//         (claimsRes.data as WarrantyClaim[]).forEach(claim => {
//           if (
//             claim.kit_id &&
//             claim.kit_number !== undefined &&
//             claim.order &&
//             claim.order.order_id
//           ) {
//             const kitId = String(claim.kit_id).trim().toLowerCase();
//             const orderId = String(claim.order.order_id).trim().toLowerCase();
//             const kitNo = String(claim.kit_number).trim();
//             set.add(`${orderId}|${kitId}|${kitNo}`);
//           }
//         });
//         setClaimedTriples(set);
//       } catch {
//         // ignore claim fetch error for UI speed
//       }
//     };
//     fetchClaims();
//   }, [refreshKey]);

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

//   // Destructure what you need from data
//   const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;
//   // `kit` contains kit-config (tilt, panels, etc.)

//   // Compute if this kit is "claimed"
//   const kitIdStr = String(kit_id).trim().toLowerCase();
//   const kitNoStr = String(kit_no).trim();
//   const orderIdStr = String(order_id).trim().toLowerCase();
//   const isClaimed = claimedTriples.has(`${orderIdStr}|${kitIdStr}|${kitNoStr}`);

//   const client_id = project_id.split('/')[0].trim();
//   const company_name = user?.company_name;

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
//         company_name: company_name
//       },
//     });
//   };

//   const isClientMatch = (projectId: string): boolean => {
//     const prefix = projectId.split('/')[0].trim();
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
//               {mapCodeToCity(prod_unit)}
//             </Text>
//           </View>

//           <View className="flex-row items-center mb-3">
//             <Ionicons name="cube-outline" size={20} color={COLORS.text} className="mr-3 opacity-75" />
//             <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//               Warehouse:
//             </Text>
//             <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//               {mapCodeToCity(warehouse)}
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
//               {kit.tilt_angle}
//               °
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


//         </View>
//         {isClaimed && (
//           <View className="mb-4 px-2 py-3 rounded-xl bg-yellow-100 border border-yellow-400">
//             <Text className="text-yellow-700 text-base font-semibold text-center">
//               You have already applied for Warranty for this Kit.
//             </Text>
//           </View>
//         )}
//       </ScrollView>

//       {/* Sticky Claim Warranty Button */}
//       {isClientMatch(project_id) && (
//         <View
//           className="left-0 right-0 py-9 border-t border-gray-700 bg-[${COLORS.background}] items-center"
//           style={{ backgroundColor: COLORS.text, borderTopColor: '#262626' }}
//         >
//           {isClaimed ? (
//             <>
//               {/* <Text className="text-center text-black font-bold text-lg">
//                 ✅ Warranty Applied
//               </Text> */}
//               <TouchableOpacity
//                 className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//                 activeOpacity={0.85}
//                 onPress={() => {
//                   const url = '/(main)/warranty?initialTab=warranty-status';
//                   // console.log('[WarrantyNav] Navigating to warranty with:', url);
//                   router.push(url);
//                 }}
//                 style={{
//                   shadowColor: '#c0b100',
//                   shadowOpacity: 0.15,
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowRadius: 7,
//                 }}
//               >
//                 <Ionicons name="eye" size={22} color="#000" className="mr-2" />
//                 <Text className="text-black font-bold text-lg tracking-wide">
//                   Show Warranty Status
//                 </Text>
//               </TouchableOpacity>


//               {/* <TouchableOpacity
//                 className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//                 activeOpacity={0.85}
//                 onPress={() =>

//                   router.push({
//                     pathname: '/(main)/warranty',
//                     params: { initialTab: 'warranty-status' }
//                     // Optionally pass kit_id or war_req_id as param if status page supports search/filter
//                     // params: { kit_id: kit_id, kit_no: kit_no, ... }
//                   })
//                 }
//                 style={{
//                   shadowColor: '#c0b100',
//                   shadowOpacity: 0.15,
//                   shadowOffset: { width: 0, height: 2 },
//                   shadowRadius: 7,
//                 }}
//               >
//                 <Ionicons name="eye" size={22} color="#000" className="mr-2" />

//                 <Text className="text-black font-bold text-lg tracking-wide">
//                   Show Warranty Status
//                 </Text>
//               </TouchableOpacity> */}
//             </>
//             // <View className="bg-gray-400 rounded-xl opacity-70 px-12 py-4">
//             //   <Text className="text-center text-black font-bold text-lg">
//             //     ✅ Warranty Applied
//             //   </Text>
//             // </View>
//           ) : (
//             <TouchableOpacity
//               onPress={handleClaimWarranty}
//               className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//               activeOpacity={0.8}
//               style={{
//                 shadowColor: '#c0b100',
//                 shadowOpacity: 0.15,
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowRadius: 7,
//               }}
//             >
//               <Ionicons name="medal-outline" size={24} color="#000" className="mr-2" />
//               <Text className="text-black font-bold text-lg tracking-wide">Request Warranty</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }



// import { useAuth } from '@/context/AuthContext';
// import { useRefresh } from '@/context/RefreshContext';
// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { mapCodeToCity } from '@/utils/mapCodeToCity';
// import { Ionicons } from '@expo/vector-icons';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   BackHandler,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface WarrantyClaim {
//   kit_id: string;
//   kit_number: number;
//   order: { order_id: string } | null;
//   war_req_id: string; // ensure this is in your API!
// }

// export default function KitDetailsScreen() {
//   // const { scan_id } = useLocalSearchParams();
//   const params = useLocalSearchParams();
//   const { scan_id, readonly, ...readonlyData } = params;
//   // const { scan_id, readonly, kit_data, ...rest } = params;
//   const { user } = useAuth();
//   const { refreshKey } = useRefresh();
//   const queryClient = useQueryClient();

//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState('');

//   // Handle Android back, as before
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

//   // Fetch kit details info (for this scan)
//   // useEffect(() => {
//   //   const fetchDetails = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const res = await api.get(`/kit-scan-details/${scan_id}/`);
//   //       setData(res.data);
//   //     } catch (err: any) {
//   //       setError('Failed to fetch kit details');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchDetails();
//   // }, [scan_id]);

//   useEffect(() => {
//     // Only fetch if scan_id exists and not readonly
//     if (scan_id && !readonly) {
//       const fetchDetails = async () => {
//         setLoading(true);
//         try {
//           const res = await api.get(`/kit-scan-details/${scan_id}/`);
//           setData(res.data);
//           console.log("Auth: ", res.data)
//         } catch (err: any) {
//           setError('Failed to fetch kit details');
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchDetails();
//     } else if (readonly) {
//       // console.log("Not Auth", readonly)

//       // For details from scan (not saved), set directly
//       setData(readonlyData);
//       setLoading(false);

//       console.log('Full details:', readonly);
//       console.log('kit as object:', readonly);
//     }
//   }, [scan_id, readonly]);

//   // ⭐️ React Query for warranty claims mapped by triple
//   const {
//     data: claims = [],
//     refetch: refetchClaims,
//     isLoading: claimsLoading,
//   } = useQuery<WarrantyClaim[]>({
//     queryKey: ['kitDetails'],
//     queryFn: async () => {
//       const res = await api.get('/warranty-claims-status/');
//       return res.data as WarrantyClaim[];
//     },
//     // Optionally, add enabled: user != null if needed
//     staleTime: 0, // optional: always fresh
//   });

//   // Map triples to their war_req_id (for navigation)
//   const claimedTripleToWarReqId = React.useMemo(() => {
//     const map: Record<string, string> = {};
//     claims.forEach(claim => {
//       if (
//         claim.kit_id &&
//         claim.kit_number !== undefined &&
//         claim.order &&
//         claim.order.order_id &&
//         claim.war_req_id
//       ) {
//         const kitId = String(claim.kit_id).trim().toLowerCase();
//         const orderId = String(claim.order.order_id).trim().toLowerCase();
//         const kitNo = String(claim.kit_number).trim();
//         const triple = `${orderId}|${kitId}|${kitNo}`;
//         map[triple] = claim.war_req_id;
//       }
//     });
//     return map;
//   }, [claims]);

//   // Destructure what you need from data
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

//   // Add here:
//   // console.log('KitDetailsScreen data:', data);
//   // console.log('KitDetailsScreen data.kit:', data?.kit);

//   const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;
//   // Compute isClaimed and get this kit's war_req_id
//   const kitIdStr = String(kit_id).trim().toLowerCase();
//   const kitNoStr = String(kit_no).trim();
//   const orderIdStr = String(order_id).trim().toLowerCase();
//   const tripleKey = `${orderIdStr}|${kitIdStr}|${kitNoStr}`;
//   const war_req_id = claimedTripleToWarReqId[tripleKey];
//   const isClaimed = !!war_req_id;

//   const client_id = project_id.split('/')[0].trim();
//   const company_name = user?.company_name;

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
//         company_name: company_name,
//       },
//     });
//   };

//   // After a successful claim submission elsewhere in app, call:
//   // queryClient.invalidateQueries({ queryKey: ['myWarrantyClaims'] });
//   // Or, in your claim form, run refetchClaims() if you wish

//   const isClientMatch = (projectId: string): boolean => {
//     const prefix = projectId.split('/')[0].trim();
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
//           {[
//             { icon: 'shield-checkmark', label: 'Kit ID', value: kit_id },
//             { icon: 'settings-outline', label: 'Kit No', value: kit_no },
//             { icon: 'business', label: 'Production Unit', value: mapCodeToCity(prod_unit) },
//             { icon: 'cube-outline', label: 'Warehouse', value: mapCodeToCity(warehouse) },
//             { icon: 'briefcase-outline', label: 'Project ID', value: project_id },
//             { icon: 'calendar-outline', label: 'Purchase Date', value: date },
//           ].map((info, idx) => (
//             <View key={info.label} className={`flex-row items-center mb-3${idx === 5 ? '' : ''}`}>
//               <Ionicons name={info.icon as any} size={20} color={COLORS.text} className="mr-3 opacity-75" />
//               <Text className="text-base font-medium mr-1" style={{ color: COLORS.text }}>
//                 {info.label}:
//               </Text>
//               <Text className="text-base font-bold flex-shrink" style={{ color: COLORS.text }}>
//                 {info.value}
//               </Text>
//             </View>
//           ))}
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
//               {kit.tilt_angle}
//               °
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
//         </View>

//         {isClaimed && (
//           <View className="mb-4 px-2 py-3 rounded-xl bg-yellow-100 border border-yellow-400">
//             <Text className="text-yellow-700 text-base font-semibold text-center">
//               You have already applied for Warranty for this Kit.
//             </Text>
//           </View>
//         )}
//       </ScrollView>

//       {isClientMatch(project_id) && (
//         <View
//           className="left-0 right-0 py-9 border-t border-gray-700 items-center"
//           style={{ backgroundColor: COLORS.text, borderTopColor: '#262626' }}
//         >
//           {isClaimed ? (
//             <TouchableOpacity
//               className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//               activeOpacity={0.85}
//               onPress={() => {
//                 if (war_req_id) {
//                   router.push({
//                     pathname: '/(main)/warranty/warranty-status-page',
//                     params: { war_req_id },
//                   });
//                 } else {
//                   Alert.alert("Not Found", "Warranty claim record not found for this kit.");
//                 }
//               }}
//               style={{
//                 shadowColor: '#c0b100',
//                 shadowOpacity: 0.15,
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowRadius: 7,
//               }}
//             >
//               <Ionicons name="eye" size={22} color="#000" className="mr-2" />
//               <Text className="text-black font-bold text-lg tracking-wide">
//                 Show Warranty Status
//               </Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               onPress={handleClaimWarranty}
//               className="flex-row items-center bg-yellow-400 rounded-xl px-12 py-4 shadow-md"
//               activeOpacity={0.8}
//               style={{
//                 shadowColor: '#c0b100',
//                 shadowOpacity: 0.15,
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowRadius: 7,
//               }}
//             >
//               <Ionicons name="medal-outline" size={24} color="#000" className="mr-2" />
//               <Text className="text-black font-bold text-lg tracking-wide">Request Warranty</Text>
//             </TouchableOpacity>
//           )}
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
