// // import { useAuth } from '@/context/AuthContext';
// // import api from '@/utils/api';
// // import { COLORS } from '@/utils/color';
// // import { useRouter } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

// // interface SavedOrder {
// //   scan_id: string;
// //   kit_id: string;
// //   prod_unit: string;
// //   warehouse: string;
// //   project_id: string;
// //   kit_no: number;
// //   date: string;
// //   scanned_at: string;
// // }

// // const MyScansScreen = () => {
// //   const { user } = useAuth();
// //   const router = useRouter();
// //   const [scans, setScans] = useState<SavedOrder[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchScans = async () => {
// //       try {
// //         const res = await api.get(`/saved-orders/`);
// //         console.log("Fetch Scans: ",res)
// //         setScans(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch scans:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchScans();
// //   }, []);

// //   return (
// //     <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
// //       <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 }}>
// //         My Scans
// //       </Text>

// //       {loading ? (
// //         <ActivityIndicator size="large" color={COLORS.text} />
// //       ) : scans.length === 0 ? (
// //         <Text style={{ color: COLORS.text }}>No scans found.</Text>
// //       ) : (
// //         <ScrollView showsVerticalScrollIndicator={false}>
// //           {scans.map((scan) => (
// //             <Pressable
// //               key={scan.scan_id}
// //               style={({ pressed }) => ({
// //                 backgroundColor: pressed ? '#f0c000' : COLORS.fieldBg,
// //                 padding: 16,
// //                 borderRadius: 12,
// //                 marginBottom: 12,
// //                 shadowColor: '#000',
// //                 shadowOpacity: 0.1,
// //                 shadowRadius: 4,
// //               })}
// //               onPress={() =>
// //                 router.push({
// //                   pathname: '/(main)/kit-details',
// //                   params: { scan_id: scan.scan_id }
// //                 })
// //               }
// //             >
// //               <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>
// //                 Scan ID: {scan.scan_id}
// //               </Text>
// //               <Text style={{ color: COLORS.text }}>Kit ID: {scan.kit_id}</Text>
// //               <Text style={{ color: COLORS.text }}>Kit No: {scan.kit_no}</Text>
// //               <Text style={{ color: COLORS.text }}>Project: {scan.project_id}</Text>
// //               <Text style={{ color: COLORS.text }}>
// //                 Scanned On: {new Date(scan.scanned_at).toLocaleString()}
// //               </Text>
// //             </Pressable>
// //           ))}
// //         </ScrollView>
// //       )}
// //     </View>
// //   );
// // };

// // export default MyScansScreen;

// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { useRouter } from 'expo-router';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Pressable,
//     RefreshControl,
//     ScrollView,
//     Text,
//     View,
// } from 'react-native';

// interface SavedOrder {
//     scan_id: string;
//     kit_id: string;
//     prod_unit: string;
//     warehouse: string;
//     project_id: string;
//     kit_no: number;
//     date: string;
//     scanned_at: string;
// }

// const MyScansScreen = () => {
//     const { user } = useAuth();
//     const router = useRouter();

//     const [scans, setScans] = useState<SavedOrder[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);

//     const fetchScans = async () => {
//         try {
//             const res = await api.get('/saved-orders/');
//             setScans(res.data);
//         } catch (err) {
//             console.error('Failed to fetch scans:', err);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         fetchScans();
//     }, []);

//     useEffect(() => {
//         fetchScans();
//     }, []);

//     return (
//         <View style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 }}>
//                 My Scans
//             </Text>

//             {loading ? (
//                 <ActivityIndicator size="large" color={COLORS.text} />
//             ) : (
//                 <ScrollView
//                     showsVerticalScrollIndicator={false}
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={refreshing}
//                             onRefresh={onRefresh}
//                             colors={[COLORS.text]}
//                             tintColor={COLORS.text}
//                         />
//                     }
//                 >
//                     {scans.length === 0 ? (
//                         <Text style={{ color: COLORS.text, textAlign: 'center', marginTop: 100 }}>
//                             No scans found.
//                         </Text>
//                     ) : (
//                         scans.map((scan) => (
//                             <Pressable
//                                 key={scan.scan_id}
//                                 style={({ pressed }) => ({
//                                     backgroundColor: pressed ? '#f0c000' : COLORS.fieldBg,
//                                     padding: 16,
//                                     borderRadius: 12,
//                                     marginBottom: 12,
//                                     shadowColor: '#000',
//                                     shadowOpacity: 0.1,
//                                     shadowRadius: 4,
//                                 })}
//                                 onPress={() =>
//                                     router.push({
//                                         pathname: '/(main)/kit-details',
//                                         params: { scan_id: scan.scan_id },
//                                     })
//                                 }
//                             >
//                                 <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>
//                                     Scan ID: {scan.scan_id}
//                                 </Text>
//                                 <Text style={{ color: COLORS.text }}>Kit ID: {scan.kit_id}</Text>
//                                 <Text style={{ color: COLORS.text }}>Kit No: {scan.kit_no}</Text>
//                                 <Text style={{ color: COLORS.text }}>Project: {scan.project_id}</Text>
//                                 <Text style={{ color: COLORS.text }}>
//                                     Scanned On: {new Date(scan.scanned_at).toLocaleString()}
//                                 </Text>
//                             </Pressable>
//                         ))
//                     )}
//                 </ScrollView>
//             )}


//             {/* {loading ? (
//         <ActivityIndicator size="large" color={COLORS.text} />
//       ) : scans.length === 0 ? (
//         <Text style={{ color: COLORS.text }}>No scans found.</Text>
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[COLORS.text]}
//               tintColor={COLORS.text}
//             />
//           }
//         >
//           {scans.map((scan) => (
//             <Pressable
//               key={scan.scan_id}
//               style={({ pressed }) => ({
//                 backgroundColor: pressed ? '#f0c000' : COLORS.fieldBg,
//                 padding: 16,
//                 borderRadius: 12,
//                 marginBottom: 12,
//                 shadowColor: '#000',
//                 shadowOpacity: 0.1,
//                 shadowRadius: 4,
//               })}
//               onPress={() =>
//                 router.push({
//                   pathname: '/(main)/kit-details',
//                   params: { scan_id: scan.scan_id },
//                 })
//               }
//             >
//               <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>
//                 Scan ID: {scan.scan_id}
//               </Text>
//               <Text style={{ color: COLORS.text }}>Kit ID: {scan.kit_id}</Text>
//               <Text style={{ color: COLORS.text }}>Kit No: {scan.kit_no}</Text>
//               <Text style={{ color: COLORS.text }}>Project: {scan.project_id}</Text>
//               <Text style={{ color: COLORS.text }}>
//                 Scanned On: {new Date(scan.scanned_at).toLocaleString()}
//               </Text>
//             </Pressable>
//           ))}
//         </ScrollView>
//       )} */}
//         </View>
//     );
// };

// export default MyScansScreen;

// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     RefreshControl,
//     ScrollView,
//     Text,
//     View
// } from 'react-native';

// interface SavedOrder {
//     scan_id: string;
//     kit_id: string;
//     prod_unit: string;
//     warehouse: string;
//     project_id: string;
//     kit_no: number;
//     date: string;
//     scanned_at: string;
//     order_id: string
// }

// const MyScansScreen = () => {
//     const { user } = useAuth();
//     const router = useRouter();
//     const [scans, setScans] = useState<SavedOrder[]>([]);
//     const [refreshing, setRefreshing] = useState(false);
//     const [loading, setLoading] = useState(true);

//     const fetchScans = async () => {
//         try {
//             const res = await api.get('/saved-orders/');
//             setScans(res.data);
//         } catch (err) {
//             console.error('Failed to fetch scans:', err);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     useEffect(() => {
//         fetchScans();
//     }, []);

//     const onRefresh = () => {
//         setRefreshing(true);
//         fetchScans();
//     };

//     const goToKitDetails = (scanId: string) => {
//         router.push({
//             pathname: '/(main)/kit-details',
//             params: { scan_id: scanId },
//         });
//     };

//     // const isClientMatch = (projectId: string): boolean => {
//     //     const prefix = projectId.split('/')[0].trim(); // Get "CUST0001" from "CUST0001/ 03"
//     //     return user?.client_id === prefix;
//     // };

//     // const latestScans = scans.slice().reverse();

//     return (
//         <ScrollView
//             className="flex-1 bg-black px-4 py-2"
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         >
//             {scans.length === 0 ? (
//                 <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//             ) : (
//                 scans.map((scan) => (
//                     <View key={scan.scan_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
//                         <Text className="text-black text-lg font-bold">🔍 Order ID: {scan.order_id}</Text>
//                         <Text className="text-gray-600 text-sm mt-1">
//                             🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                         </Text>

//                         {/* QR Details */}
//                         <View className="mt-3 mb-2">
//                             <Text className="text-black font-semibold text-sm mb-1">📦 Kit Info:</Text>
//                             <Text className="ml-2 text-sm text-black">• Kit ID: {scan.kit_id}</Text>
//                             <Text className="ml-2 text-sm text-black">• Kit No: {scan.kit_no}</Text>
//                             <Text className="ml-2 text-sm text-black">• Prod Unit: {scan.prod_unit}</Text>
//                             <Text className="ml-2 text-sm text-black">• Warehouse: {scan.warehouse}</Text>
//                             <Text className="ml-2 text-sm text-black">• Project ID: {scan.project_id}</Text>
//                             <Text className="ml-2 text-sm text-black">• Date: {scan.date}</Text>
//                         </View>

//                         {/* Request Warranty Button */}
//                         {/* <View className="mt-4">
//                             <Text
//                                 onPress={() => goToKitDetails(scan.scan_id)}
//                                 className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
//                             >
//                                 🛡️ Request Warranty
//                             </Text>
//                         </View> */}
//                         {/* Conditionally Render Button */}
//                         {/* {isClientMatch(scan.project_id) && ( */}
//                             <View className="mt-4">
//                                 <Text
//                                     onPress={() => goToKitDetails(scan.scan_id)}
//                                     className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
//                                 >
//                                     🛡️ Request Warranty
//                                 </Text>
//                             </View>
//                         {/* )} */}
//                     </View>
//                 ))
//             )}
//         </ScrollView>
//     );
// };

// export default MyScansScreen;

// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     BackHandler,
//     RefreshControl,
//     ScrollView,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// interface SavedOrder {
//   scan_id: string;
//   kit_id: string;
//   prod_unit: string;
//   warehouse: string;
//   project_id: string;
//   kit_no: number;
//   date: string;
//   scanned_at: string;
//   order_id: string;
// }

// function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
//   return array.reduce((result, item) => {
//     const key = getKey(item);
//     if (!result[key]) result[key] = [];
//     result[key].push(item);
//     return result;
//   }, {} as Record<K, T[]>);
// }

// const MyScansScreen = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [scans, setScans] = useState<SavedOrder[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState<{ [orderId: string]: boolean }>({});

//       useFocusEffect(() => {
//       const onBackPress = () => {
//         Alert.alert(
//           'Exit App',
//           'Are you sure you want to exit?',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Exit', onPress: () => BackHandler.exitApp() },
//           ],
//           { cancelable: true }
//         );
//         return true; // prevent default behavior (going back)
//       };

//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     });

//   const fetchScans = async () => {
//     try {
//       const res = await api.get('/saved-orders/');
//       setScans(res.data);
//     } catch (err) {
//       console.error('Failed to fetch scans:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchScans();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchScans();
//   };

//   const goToKitDetails = (scanId: string) => {
//     router.push({
//       pathname: '/(main)/kit-details',
//       params: { scan_id: scanId },
//     });
//   };

//   // --- Group scans by order_id
//   const grouped = groupBy(scans, scan => scan.order_id);
//   const orderIds = Object.keys(grouped);

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {scans.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//       ) : (
//         orderIds.map(orderId => (
//           <View key={orderId} className="bg-white rounded-2xl p-3 mb-4 shadow">
//             {/* Order Card Header */}
//             <TouchableOpacity
//               onPress={() =>
//                 setExpanded(current => ({ ...current, [orderId]: !current[orderId] }))
//               }
//               activeOpacity={0.7}
//               className="flex-row items-center justify-between"
//             >
//               <Text className="text-black text-lg font-bold">
//                 📦 Order ID: {orderId}
//               </Text>
//               <Text className="text-yellow-400 font-bold text-2xl">
//                 {expanded[orderId] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>

//             {/* Kits list (collapsed/expanded) */}
//             {expanded[orderId] && (
//               <View className="mt-2">
//                 {grouped[orderId].map(scan => (
//                   <View
//                     key={scan.scan_id}
//                     className="bg-gray-100 rounded-xl px-2 py-2 mb-3"
//                   >
//                     <Text className="text-black font-semibold">Kit ID: {scan.kit_id}</Text>
//                     <Text className="text-sm text-black ml-2">• Kit No: {scan.kit_no}</Text>
//                     <Text className="text-sm text-black ml-2">• Prod Unit: {scan.prod_unit}</Text>
//                     <Text className="text-sm text-black ml-2">• Warehouse: {scan.warehouse}</Text>
//                     <Text className="text-sm text-black ml-2">• Project ID: {scan.project_id}</Text>
//                     <Text className="text-sm text-black ml-2">• Date: {scan.date}</Text>
//                     <Text className="text-gray-700 text-xs ml-2 mt-1">
//                       🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => goToKitDetails(scan.scan_id)}
//                       className="bg-yellow-400 mt-3 rounded-xl"
//                     >
//                       <Text className="text-center text-black font-bold py-2">🛡️ Request Warranty</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyScansScreen;


// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface SavedOrder {
//   scan_id: string;
//   kit_id: string;
//   prod_unit: string;
//   warehouse: string;
//   project_id: string;
//   kit_no: number;
//   date: string;
//   scanned_at: string;
//   order_id: string;
// }

// function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
//   return array.reduce((result, item) => {
//     const key = getKey(item);
//     if (!result[key]) result[key] = [];
//     result[key].push(item);
//     return result;
//   }, {} as Record<K, T[]>);
// }

// const MyScansScreen: React.FC = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [scans, setScans] = useState<SavedOrder[]>([]);
//   const [claimedKitIds, setClaimedKitIds] = useState<string[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState<{ [orderId: string]: boolean }>({});

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         'Exit App',
//         'Are you sure you want to exit?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Exit', onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };
//     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => subscription.remove();
//   });

//   // Fetch both scans & claims and update claimedKitIds
//   const fetchScansAndClaims = async () => {
//     setLoading(true);
//     setRefreshing(true);
//     try {
//       const [scansRes, claimsRes] = await Promise.all([
//         api.get('/saved-orders/'),
//         api.get('/warranty-claims-status/')
//       ]);
//       const claimed = claimsRes.data.map((claim: { kit: string }) => claim.kit);
//       setScans(scansRes.data);
//       setClaimedKitIds(claimed);
//     } catch (err) {
//       console.error('Failed to fetch scans or claims:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchScansAndClaims();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchScansAndClaims();
//   };

//   const goToKitDetails = (scanId: string) => {
//     router.push({
//       pathname: '/(main)/kit-details',
//       params: { scan_id: scanId },
//     });
//   };

//   // --- Group scans by order_id for display
//   const grouped = groupBy(scans, scan => scan.order_id);
//   const orderIds = Object.keys(grouped);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-lg text-white">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {scans.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//       ) : (
//         orderIds.map(orderId => (
//           <View key={orderId} className="bg-white rounded-2xl p-3 mb-4 shadow">
//             {/* Order Card Header */}
//             <TouchableOpacity
//               onPress={() =>
//                 setExpanded(current => ({ ...current, [orderId]: !current[orderId] }))
//               }
//               activeOpacity={0.7}
//               className="flex-row items-center justify-between"
//             >
//               <Text className="text-black text-lg font-bold">
//                 📦 Order ID: {orderId}
//               </Text>
//               <Text className="text-yellow-400 font-bold text-2xl">
//                 {expanded[orderId] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>

//             {/* Kits list (collapsed/expanded) */}
//             {expanded[orderId] && (
//               <View className="mt-2">
//                 {grouped[orderId].map(scan => (
//                   <View
//                     key={scan.scan_id}
//                     className="bg-gray-100 rounded-xl px-2 py-2 mb-3"
//                   >
//                     <Text className="text-black font-semibold">Kit ID: {scan.kit_id}</Text>
//                     <Text className="text-sm text-black ml-2">• Kit No: {scan.kit_no}</Text>
//                     <Text className="text-sm text-black ml-2">• Prod Unit: {scan.prod_unit}</Text>
//                     <Text className="text-sm text-black ml-2">• Warehouse: {scan.warehouse}</Text>
//                     <Text className="text-sm text-black ml-2">• Project ID: {scan.project_id}</Text>
//                     <Text className="text-sm text-black ml-2">• Date: {scan.date}</Text>
//                     <Text className="text-gray-700 text-xs ml-2 mt-1">
//                       🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                     </Text>

//                     {claimedKitIds.includes(scan.kit_id) ? (
//                       <View className="bg-gray-400 mt-3 rounded-xl opacity-70">
//                         <Text className="text-center text-black font-bold py-2">
//                           ✅ Warranty Applied
//                         </Text>
//                       </View>
//                     ) : (
//                       <TouchableOpacity
//                         onPress={() => goToKitDetails(scan.scan_id)}
//                         className="bg-yellow-400 mt-3 rounded-xl"
//                       >
//                         <Text className="text-center text-black font-bold py-2">
//                           🛡️ Request Warranty
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyScansScreen;


// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Types
// interface SavedOrder {
//   scan_id: string;
//   kit_id: string;
//   prod_unit: string;
//   warehouse: string;
//   project_id: string;
//   kit_no: number;
//   date: string;
//   scanned_at: string;
//   order_id: string;
// }
// interface WarrantyClaim {
//   kit_id: string;
//   order: { order_id: string } | null;
//   // ...other fields but not needed for the button logic
// }

// function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
//   return array.reduce((result, item) => {
//     const key = getKey(item);
//     if (!result[key]) result[key] = [];
//     result[key].push(item);
//     return result;
//   }, {} as Record<K, T[]>);
// }

// const MyScansScreen: React.FC = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [scans, setScans] = useState<SavedOrder[]>([]);
//   const [claimedPairs, setClaimedPairs] = useState<Set<string>>(new Set());
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState<{ [orderId: string]: boolean }>({});

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         'Exit App',
//         'Are you sure you want to exit?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Exit', onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };
//     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => subscription.remove();
//   });

//   // Fetch saved orders and warranty claims, build Set for quick check

//   const fetchScansAndClaims = async () => {
//     setLoading(true);
//     setRefreshing(true);
//     try {
//       const [scansRes, claimsRes] = await Promise.all([
//         api.get('/saved-orders/'),
//         api.get('/warranty-claims-status/')
//       ]);

//       // --- DEBUG CLAIMS ---
//       (claimsRes.data as WarrantyClaim[]).forEach((claim, i) => {
//         console.log(
//           "Claim Pair",
//           i,
//           "|",
//           claim.order?.order_id,
//           "|",
//           claim.kit_id,
//           "|",
//           typeof claim.order?.order_id,
//           typeof claim.kit_id
//         );
//       });

//       // --- DEBUG SCANS ---
//       scansRes.data.forEach((scan: SavedOrder, i: number) => {
//         console.log(
//           "Scan",
//           i,
//           "|",
//           scan.order_id,
//           "|",
//           scan.kit_id,
//           "|",
//           typeof scan.order_id,
//           typeof scan.kit_id
//         );
//       });

//       setScans(scansRes.data);

//       const set = new Set<string>();
//       (claimsRes.data as WarrantyClaim[]).forEach(claim => {
//         if (claim.kit_id && claim.order && claim.order.order_id) {
//           set.add(`${claim.order.order_id}|${claim.kit_id}`);
//         }
//       });
//       setClaimedPairs(set);

//     } catch (err) {
//       console.error('Failed to fetch scans or claims:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };



//   useEffect(() => {
//     fetchScansAndClaims();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchScansAndClaims();
//   };

//   const goToKitDetails = (scanId: string) => {
//     router.push({
//       pathname: '/(main)/kit-details',
//       params: { scan_id: scanId },
//     });
//   };

//   // Group scans by order_id for display
//   const grouped = groupBy(scans, scan => scan.order_id);
//   const orderIds = Object.keys(grouped);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-lg text-white">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {scans.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//       ) : (
//         orderIds.map(orderId => (
//           <View key={orderId} className="bg-white rounded-2xl p-3 mb-4 shadow">
//             {/* Order Card Header */}
//             <TouchableOpacity
//               onPress={() =>
//                 setExpanded(current => ({ ...current, [orderId]: !current[orderId] }))
//               }
//               activeOpacity={0.7}
//               className="flex-row items-center justify-between"
//             >
//               <Text className="text-black text-lg font-bold">
//                 📦 Order ID: {orderId}
//               </Text>
//               <Text className="text-yellow-400 font-bold text-2xl">
//                 {expanded[orderId] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>

//             {/* Kits list (collapsed/expanded) */}
//             {expanded[orderId] && (
//               <View className="mt-2">
//                 {grouped[orderId].map(scan => {
//                   const isClaimed = claimedPairs.has(`${scan.order_id}|${scan.kit_id}`);
//                   return (
//                     <View
//                       key={scan.scan_id}
//                       className="bg-gray-100 rounded-xl px-2 py-2 mb-3"
//                     >
//                       <Text className="text-black font-semibold">Kit ID: {scan.kit_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Kit No: {scan.kit_no}</Text>
//                       <Text className="text-sm text-black ml-2">• Prod Unit: {scan.prod_unit}</Text>
//                       <Text className="text-sm text-black ml-2">• Warehouse: {scan.warehouse}</Text>
//                       <Text className="text-sm text-black ml-2">• Project ID: {scan.project_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Date: {scan.date}</Text>
//                       <Text className="text-gray-700 text-xs ml-2 mt-1">
//                         🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                       </Text>
//                       {isClaimed ? (
//                         <View className="bg-gray-400 mt-3 rounded-xl opacity-70">
//                           <Text className="text-center text-black font-bold py-2">
//                             ✅ Warranty Applied
//                           </Text>
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => goToKitDetails(scan.scan_id)}
//                           className="bg-yellow-400 mt-3 rounded-xl"
//                         >
//                           <Text className="text-center text-black font-bold py-2">
//                             🛡️ Request Warranty
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   );
//                 })}
//               </View>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyScansScreen;

//==================working======================
// import { useAuth } from '@/context/AuthContext';
// import { useRefresh } from '@/context/RefreshContext';
// import api from '@/utils/api';
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';


// // Types
// interface SavedOrder {
//   scan_id: string;
//   kit_id: string;
//   prod_unit: string;
//   warehouse: string;
//   project_id: string;
//   kit_no: number;
//   date: string;
//   scanned_at: string;
//   order_id: string;
// }
// interface WarrantyClaim {
//   kit_id: string;
//   kit_number: number;
//   order: { order_id: string } | null;
//   // ...other fields but not needed for the button logic
// }

// function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
//   return array.reduce((result, item) => {
//     const key = getKey(item);
//     if (!result[key]) result[key] = [];
//     result[key].push(item);
//     return result;
//   }, {} as Record<K, T[]>);
// }

// const MyScansScreen: React.FC = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [scans, setScans] = useState<SavedOrder[]>([]);
//   const [claimedTriples, setClaimedTriples] = useState<Set<string>>(new Set());
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState<{ [orderId: string]: boolean }>({});

//   const { refreshKey } = useRefresh();

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         'Exit App',
//         'Are you sure you want to exit?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Exit', onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };
//     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => subscription.remove();
//   });

//   // Fetch saved orders and warranty claims, build Set for quick check
//   const fetchScansAndClaims = async () => {
//     setLoading(true);
//     setRefreshing(true);
//     try {
//       const [scansRes, claimsRes] = await Promise.all([
//         api.get('/saved-orders/'),
//         api.get('/warranty-claims-status/')
//       ]);
//       setScans(scansRes.data);

//       const set = new Set<string>();
//       (claimsRes.data as WarrantyClaim[]).forEach(claim => {
//         if (
//           claim.kit_id &&
//           claim.kit_number !== undefined &&
//           claim.order &&
//           claim.order.order_id
//         ) {
//           // All as string for safety
//           const kitId = String(claim.kit_id).trim().toLowerCase();
//           const orderId = String(claim.order.order_id).trim().toLowerCase();
//           const kitNo = String(claim.kit_number).trim();
//           set.add(`${orderId}|${kitId}|${kitNo}`);
//         }
//       });
//       setClaimedTriples(set);
//     } catch (err) {
//       console.error('Failed to fetch scans or claims:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // useFocusEffect(
//   //   useCallback(() => {
//   //     fetchScansAndClaims();
//   //   }, [])
//   // );

//   useEffect(() => {
//     fetchScansAndClaims();
//   }, [refreshKey]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchScansAndClaims();
//   };

//   const goToKitDetails = (scanId: string) => {
//     router.push({
//       pathname: '/(main)/kit-details',
//       params: { scan_id: scanId },
//     });
//   };

//   // Group scans by order_id for display
//   const grouped = groupBy(scans, scan => scan.order_id);
//   const orderIds = Object.keys(grouped);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-lg text-white">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {scans.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//       ) : (
//         orderIds.map(orderId => (
//           <View key={orderId} className="bg-white rounded-2xl p-3 mb-4 shadow">
//             {/* Order Card Header */}
//             <TouchableOpacity
//               onPress={() =>
//                 setExpanded(current => ({ ...current, [orderId]: !current[orderId] }))
//               }
//               activeOpacity={0.7}
//               className="flex-row items-center justify-between"
//             >
//               <Text className="text-black text-lg font-bold">
//                 📦 Order ID: {orderId}
//               </Text>
//               <Text className="text-yellow-400 font-bold text-2xl">
//                 {expanded[orderId] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>

//             {/* Kits list (collapsed/expanded) */}
//             {expanded[orderId] && (
//               <View className="mt-2">
//                 {grouped[orderId].map(scan => {
//                   // Compare all as string for maximum safety
//                   const kitId = String(scan.kit_id).trim().toLowerCase();
//                   const orderIdStr = String(scan.order_id).trim().toLowerCase();
//                   const kitNo = String(scan.kit_no).trim();
//                   const isClaimed = claimedTriples.has(`${orderIdStr}|${kitId}|${kitNo}`);
//                   return (
//                     <View
//                       key={scan.scan_id}
//                       className="bg-gray-100 rounded-xl px-2 py-2 mb-3"
//                     >
//                       <Text className="text-black font-semibold">Kit ID: {scan.kit_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Kit No: {scan.kit_no}</Text>
//                       <Text className="text-sm text-black ml-2">• Prod Unit: {scan.prod_unit}</Text>
//                       <Text className="text-sm text-black ml-2">• Warehouse: {scan.warehouse}</Text>
//                       <Text className="text-sm text-black ml-2">• Project ID: {scan.project_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Date: {scan.date}</Text>
//                       <Text className="text-gray-700 text-xs ml-2 mt-1">
//                         🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                       </Text>
//                       {isClaimed ? (
//                         <View className="bg-gray-400 mt-3 rounded-xl opacity-70">
//                           <Text className="text-center text-black font-bold py-2">
//                             ✅ Warranty Applied
//                           </Text>
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => goToKitDetails(scan.scan_id)}
//                           className="bg-yellow-400 mt-3 rounded-xl"
//                         >
//                           <Text className="text-center text-black font-bold py-2">
//                             🛡️ Request Warranty
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   );
//                 })}
//               </View>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyScansScreen;


// import { useAuth } from '@/context/AuthContext';
// import api from '@/utils/api';
// import { mapCodeToCity } from '@/utils/mapCodeToCity';
// import { useQuery } from "@tanstack/react-query";
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// // Types
// interface SavedOrder {
//   scan_id: string;
//   kit_id: string;
//   prod_unit: string;
//   warehouse: string;
//   project_id: string;
//   kit_no: number;
//   date: string;
//   scanned_at: string;
//   order_id: string;
// }
// interface WarrantyClaim {
//   kit_id: string;
//   kit_number: number;
//   order: { order_id: string } | null;
//   // ...other fields but not needed for the button logic
// }

// function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K) {
//   return array.reduce((result, item) => {
//     const key = getKey(item);
//     if (!result[key]) result[key] = [];
//     result[key].push(item);
//     return result;
//   }, {} as Record<K, T[]>);
// }

// const MyScansScreen: React.FC = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [expanded, setExpanded] = useState<{ [orderId: string]: boolean }>({});


//     useFocusEffect(() => {
//       const onBackPress = () => {
//         Alert.alert(
//           "Exit App",
//           "Are you sure you want to exit?",
//           [
//             { text: "Cancel", style: "cancel" },
//             { text: "Exit", onPress: () => BackHandler.exitApp() },
//           ],
//           { cancelable: true }
//         );
//         return true;
//       };
  
//       const subscription = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );
//       return () => subscription.remove();
//     });

//   // React Query for "saved orders"
//   const {
//     data: scans = [],
//     isLoading: loadingScans,
//     isRefetching: refetchingScans,
//     refetch: refetchScans,
//   } = useQuery<SavedOrder[]>({
//     queryKey: ["myScans_savedOrders"],
//     queryFn: async () => {
//       const res = await api.get('/saved-orders/');
//       return res.data as SavedOrder[];
//     },
//   });

//   // React Query for "claims"
//   const {
//     data: claims = [],
//     isLoading: loadingClaims,
//     isRefetching: refetchingClaims,
//     refetch: refetchClaims,
//   } = useQuery<WarrantyClaim[]>({
//     queryKey: ["myScans_claims"],
//     queryFn: async () => {
//       const res = await api.get('/warranty-claims-status/');
//       return res.data as WarrantyClaim[];
//     },
//   });

//   const loading = loadingScans || loadingClaims;
//   const refreshing = refetchingScans || refetchingClaims;

//   // Instead of refresh context, use queryClient in your submit mutation elsewhere:
//   // const queryClient = useQueryClient();
//   // queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
//   // queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });

//   // Claims triple set for easy lookup
//   const claimedTriples = new Set<string>();
//   claims.forEach(claim => {
//     if (claim.kit_id && claim.kit_number !== undefined && claim.order && claim.order.order_id) {
//       const kitId = String(claim.kit_id).trim().toLowerCase();
//       const orderId = String(claim.order.order_id).trim().toLowerCase();
//       const kitNo = String(claim.kit_number).trim();
//       claimedTriples.add(`${orderId}|${kitId}|${kitNo}`);
//     }
//   });

//   // refresh scan + claims
//   const onRefresh = () => {
//     refetchScans();
//     refetchClaims();
//   };

//   const goToKitDetails = (scanId: string) => {
//     router.push({
//       pathname: '/(main)/kit-details',
//       params: { scan_id: scanId },
//     });
//   };

//   // Group scans by order_id for display
//   const grouped = groupBy(scans, scan => scan.order_id);
//   const orderIds = Object.keys(grouped);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-lg text-white">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     >
//       {scans.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
//       ) : (
//         orderIds.map(orderId => (
//           <View key={orderId} className="bg-white rounded-2xl p-3 mb-4 shadow">
//             {/* Order Card Header */}
//             <TouchableOpacity
//               onPress={() =>
//                 setExpanded(current => ({ ...current, [orderId]: !current[orderId] }))
//               }
//               activeOpacity={0.7}
//               className="flex-row items-center justify-between"
//             >
//               <Text className="text-black text-lg font-bold">
//                 📦 Order ID: {orderId}
//               </Text>
//               <Text className="text-yellow-400 font-bold text-2xl">
//                 {expanded[orderId] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>

//             {/* Kits list (collapsed/expanded) */}
//             {expanded[orderId] && (
//               <View className="mt-2">
//                 {grouped[orderId].map(scan => {
//                   const kitId = String(scan.kit_id).trim().toLowerCase();
//                   const orderIdStr = String(scan.order_id).trim().toLowerCase();
//                   const kitNo = String(scan.kit_no).trim();
//                   const isClaimed = claimedTriples.has(`${orderIdStr}|${kitId}|${kitNo}`);
//                   return (
//                     <View
//                       key={scan.scan_id}
//                       className="bg-gray-100 rounded-xl px-2 py-2 mb-3"
//                     >
//                       <Text className="text-black font-semibold">Kit ID: {scan.kit_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Kit No: {scan.kit_no}</Text>
//                       <Text className="text-sm text-black ml-2">• Prod Unit: {mapCodeToCity(scan.prod_unit)}</Text>
//                       <Text className="text-sm text-black ml-2">• Warehouse: {mapCodeToCity(scan.warehouse)}</Text>
//                       <Text className="text-sm text-black ml-2">• Project ID: {scan.project_id}</Text>
//                       <Text className="text-sm text-black ml-2">• Date: {scan.date}</Text>
//                       <Text className="text-gray-700 text-xs ml-2 mt-1">
//                         🗓️ {new Date(scan.scanned_at).toLocaleString()}
//                       </Text>
//                       {isClaimed ? (
//                         <View className="bg-gray-400 mt-3 rounded-xl opacity-70">
//                           <Text className="text-center text-black font-bold py-2">
//                             ✅ Warranty Applied
//                           </Text>
//                         </View>
//                       ) : (
//                         <TouchableOpacity
//                           onPress={() => goToKitDetails(scan.scan_id)}
//                           className="bg-yellow-400 mt-3 rounded-xl"
//                         >
//                           <Text className="text-center text-black font-bold py-2">
//                             🛡️ Request Warranty
//                           </Text>
//                         </TouchableOpacity>
//                       )}
//                     </View>
//                   );
//                 })}
//               </View>
//             )}
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyScansScreen;


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
                          <Text className="text-black font-medium text-base">
                            🧩 Kit ID: {kitId}
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
