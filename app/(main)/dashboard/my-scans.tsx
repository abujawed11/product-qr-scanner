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

import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    View
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
}

const MyScansScreen = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [scans, setScans] = useState<SavedOrder[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchScans = async () => {
        try {
            const res = await api.get('/saved-orders/');
            setScans(res.data);
        } catch (err) {
            console.error('Failed to fetch scans:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchScans();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchScans();
    };

    const goToKitDetails = (scanId: string) => {
        router.push({
            pathname: '/(main)/kit-details',
            params: { scan_id: scanId },
        });
    };

    // const isClientMatch = (projectId: string): boolean => {
    //     const prefix = projectId.split('/')[0].trim(); // Get "CUST0001" from "CUST0001/ 03"
    //     return user?.client_id === prefix;
    // };

    // const latestScans = scans.slice().reverse();

    return (
        <ScrollView
            className="flex-1 bg-black px-4 py-2"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {scans.length === 0 ? (
                <Text className="text-white text-center mt-8 text-lg">No scans found.</Text>
            ) : (
                scans.map((scan) => (
                    <View key={scan.scan_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
                        <Text className="text-black text-lg font-bold">🔍 Scan ID: {scan.scan_id}</Text>
                        <Text className="text-gray-600 text-sm mt-1">
                            🗓️ {new Date(scan.scanned_at).toLocaleString()}
                        </Text>

                        {/* QR Details */}
                        <View className="mt-3 mb-2">
                            <Text className="text-black font-semibold text-sm mb-1">📦 Kit Info:</Text>
                            <Text className="ml-2 text-sm text-black">• Kit ID: {scan.kit_id}</Text>
                            <Text className="ml-2 text-sm text-black">• Kit No: {scan.kit_no}</Text>
                            <Text className="ml-2 text-sm text-black">• Prod Unit: {scan.prod_unit}</Text>
                            <Text className="ml-2 text-sm text-black">• Warehouse: {scan.warehouse}</Text>
                            <Text className="ml-2 text-sm text-black">• Project ID: {scan.project_id}</Text>
                            <Text className="ml-2 text-sm text-black">• Date: {scan.date}</Text>
                        </View>

                        {/* Request Warranty Button */}
                        {/* <View className="mt-4">
                            <Text
                                onPress={() => goToKitDetails(scan.scan_id)}
                                className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
                            >
                                🛡️ Request Warranty
                            </Text>
                        </View> */}
                        {/* Conditionally Render Button */}
                        {/* {isClientMatch(scan.project_id) && ( */}
                            <View className="mt-4">
                                <Text
                                    onPress={() => goToKitDetails(scan.scan_id)}
                                    className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
                                >
                                    🛡️ Request Warranty
                                </Text>
                            </View>
                        {/* )} */}
                    </View>
                ))
            )}
        </ScrollView>
    );
};

export default MyScansScreen;

