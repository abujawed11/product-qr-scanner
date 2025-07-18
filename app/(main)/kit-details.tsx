// // import api from '@/utils/api';
// // import { COLORS } from '@/utils/color';
// // import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// // import React, { useEffect, useState } from 'react';
// // import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';

// // export default function KitDetailsScreen() {
// //     const { scan_id } = useLocalSearchParams();
// //     const [loading, setLoading] = useState(true);
// //     const [data, setData] = useState<any>(null);
// //     const [error, setError] = useState('');


// //     useFocusEffect(
// //         React.useCallback(() => {
// //             const onBackPress = () => {
// //                 router.replace('/(main)/dashboard');
// //                 return true;
// //             };
// //             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
// //             return () => subscription.remove();
// //         }, [])
// //     );

// //     useEffect(() => {
// //         const fetchDetails = async () => {
// //             try {
// //                 const res = await api.get(`/kit-scan-details/${scan_id}/`);
// //                 setData(res.data);
// //             } catch (err: any) {
// //                 console.error(err);
// //                 setError('Failed to fetch kit details');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchDetails();
// //     }, [scan_id]);

// //     if (loading) {
// //         return (
// //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
// //                 <ActivityIndicator size="large" color={COLORS.text} />
// //             </View>
// //         );
// //     }

// //     if (error || !data) {
// //         return (
// //             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, padding: 16 }}>
// //                 <Text style={{ color: COLORS.text, fontSize: 16, textAlign: 'center' }}>{error || 'No data found.'}</Text>
// //             </View>
// //         );
// //     }

// //     const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit } = data;

// //     return (
// //         <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingVertical: 24 }}>
// //             <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Scanned Kit Info</Text>

// //             <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16, marginBottom: 20 }}>
// //                 <Text style={{ color: COLORS.text }}>Kit ID: <Text style={{ fontWeight: 'bold' }}>{kit_id}</Text></Text>
// //                 <Text style={{ color: COLORS.text }}>Production Unit: <Text style={{ fontWeight: 'bold' }}>{prod_unit}</Text></Text>
// //                 <Text style={{ color: COLORS.text }}>Warehouse: <Text style={{ fontWeight: 'bold' }}>{warehouse}</Text></Text>
// //                 <Text style={{ color: COLORS.text }}>Project ID: <Text style={{ fontWeight: 'bold' }}>{project_id}</Text></Text>
// //                 <Text style={{ color: COLORS.text }}>Kit No: <Text style={{ fontWeight: 'bold' }}>{kit_no}</Text></Text>
// //                 <Text style={{ color: COLORS.text }}>Date: <Text style={{ fontWeight: 'bold' }}>{date}</Text></Text>
// //             </View>

// //             <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>Kit Details</Text>

// //             <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16 }}>
// //                 <Text style={{ color: COLORS.text }}>Tilt Angle: {kit.tilt_angle}°</Text>
// //                 <Text style={{ color: COLORS.text }}>Clearance: {kit.clearance} mm</Text>
// //                 <Text style={{ color: COLORS.text }}>Configuration: {kit.configuration}</Text>
// //                 <Text style={{ color: COLORS.text }}>No of Panels: {kit.num_panels}</Text>
// //                 <Text style={{ color: COLORS.text }}>Price: ₹{kit.price}</Text>
// //             </View>
// //         </ScrollView>
// //     );
// // }

// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function KitDetailsScreen() {
//     const { scan_id } = useLocalSearchParams();
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState<any>(null);
//     const [error, setError] = useState('');

//     useFocusEffect(
//         React.useCallback(() => {
//             const onBackPress = () => {
//                 router.replace('/(main)/dashboard');
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//             return () => subscription.remove();
//         }, [])
//     );

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const res = await api.get(`/kit-scan-details/${scan_id}/`);
//                 setData(res.data);
//             } catch (err: any) {
//                 console.error(err);
//                 setError('Failed to fetch kit details');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, [scan_id]);

//     if (loading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
//                 <ActivityIndicator size="large" color={COLORS.text} />
//             </View>
//         );
//     }

//     if (error || !data) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, padding: 16 }}>
//                 <Text style={{ color: COLORS.text, fontSize: 16, textAlign: 'center' }}>{error || 'No data found.'}</Text>
//             </View>
//         );
//     }

//     const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;

//     // Will be used onPress to navigate and pass these as params
//     const handleClaimWarranty = () => {
//         router.push({
//             pathname: '/warranty/claim-form', // <-- Update path if yours is different!
//             params: {
//                 order_id: order_id ?? '', // Fallback to '' if not present
//                 scan_id: scan_id ?? '',
//                 kit_id: kit_id ?? '',
//                 kit_no: kit_no ?? '',
//                 project_id: project_id ?? '',
//                 purchase_date: date ?? '',
//             },
//         });
//     };

//     return (
//         <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingVertical: 24 }}>
//             <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Scanned Kit Info</Text>

//             <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16, marginBottom: 20 }}>
//                 <Text style={{ color: COLORS.text }}>Kit ID: <Text style={{ fontWeight: 'bold' }}>{kit_id}</Text></Text>
//                 <Text style={{ color: COLORS.text }}>Production Unit: <Text style={{ fontWeight: 'bold' }}>{prod_unit}</Text></Text>
//                 <Text style={{ color: COLORS.text }}>Warehouse: <Text style={{ fontWeight: 'bold' }}>{warehouse}</Text></Text>
//                 <Text style={{ color: COLORS.text }}>Project ID: <Text style={{ fontWeight: 'bold' }}>{project_id}</Text></Text>
//                 <Text style={{ color: COLORS.text }}>Kit No: <Text style={{ fontWeight: 'bold' }}>{kit_no}</Text></Text>
//                 <Text style={{ color: COLORS.text }}>Date: <Text style={{ fontWeight: 'bold' }}>{date}</Text></Text>
//             </View>

//             <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>Kit Details</Text>
//             <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16 }}>
//                 <Text style={{ color: COLORS.text }}>Tilt Angle: {kit.tilt_angle}°</Text>
//                 <Text style={{ color: COLORS.text }}>Clearance: {kit.clearance} mm</Text>
//                 <Text style={{ color: COLORS.text }}>Configuration: {kit.configuration}</Text>
//                 <Text style={{ color: COLORS.text }}>No of Panels: {kit.num_panels}</Text>
//                 <Text style={{ color: COLORS.text }}>Price: ₹{kit.price}</Text>
//             </View>

//             {/* --- CLAIM WARRANTY BUTTON ADDED HERE --- */}
//             <TouchableOpacity
//                 style={{
//                     marginTop: 32,
//                     marginBottom: 12,
//                     backgroundColor: '#FAD90E',
//                     borderRadius: 12,
//                     paddingVertical: 16,
//                     alignItems: 'center',
//                 }}
//                 onPress={handleClaimWarranty}
//             >
//                 <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Claim Warranty</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }


// import api from '@/utils/api';
// import { COLORS } from '@/utils/color';
// import { Ionicons } from '@expo/vector-icons';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function KitDetailsScreen() {
//   const { scan_id } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<any>(null);
//   const [error, setError] = useState('');

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
//       <View style={styles.centerFull}>
//         <ActivityIndicator size="large" color={COLORS.text} />
//       </View>
//     );
//   }

//   if (error || !data) {
//     return (
//       <View style={styles.centerFull}>
//         <Text style={styles.errorText}>
//           {error || 'No data found.'}
//         </Text>
//       </View>
//     );
//   }

//   const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit, order_id } = data;

//   // Will be used onPress to navigate and pass these as params
//   const handleClaimWarranty = () => {
//     router.push({
//       pathname: '/warranty/claim-form', // <-- Update path if yours is different!
//       params: {
//         order_id: order_id ?? '',
//         scan_id: scan_id ?? '',
//         kit_id: kit_id ?? '',
//         kit_no: kit_no ?? '',
//         project_id: project_id ?? '',
//         purchase_date: date ?? '',
//       },
//     });
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Title */}
//         <Text style={styles.heading}>Scanned Kit Information</Text>

//         {/* Purchase Info Card */}
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Ionicons name="shield-checkmark" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Kit ID:</Text>
//             <Text style={styles.cardValue}>{kit_id}</Text>
//           </View>
//           <View style={styles.row}>
//             <Ionicons name="settings-outline" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Kit No:</Text>
//             <Text style={styles.cardValue}>{kit_no}</Text>
//           </View>
//           <View style={styles.row}>
//             <Ionicons name="business" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Production Unit:</Text>
//             <Text style={styles.cardValue}>{prod_unit}</Text>
//           </View>
//           <View style={styles.row}>
//             <Ionicons name="cube-outline" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Warehouse:</Text>
//             <Text style={styles.cardValue}>{warehouse}</Text>
//           </View>
//           <View style={styles.row}>
//             <Ionicons name="briefcase-outline" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Project ID:</Text>
//             <Text style={styles.cardValue}>{project_id}</Text>
//           </View>
//           <View style={styles.row}>
//             <Ionicons name="calendar-outline" size={20} color={COLORS.primary || "#FAD90E"} style={styles.icon} />
//             <Text style={styles.cardLabel}>Purchase Date:</Text>
//             <Text style={styles.cardValue}>{date}</Text>
//           </View>
//         </View>

//         {/* Kit Details Card */}
//         <Text style={styles.subHeading}>Kit Configuration</Text>
//         <View style={styles.card}>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Tilt Angle: </Text>
//             <Text style={styles.detailValue}>{kit.tilt_angle}°</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Clearance: </Text>
//             <Text style={styles.detailValue}>{kit.clearance} mm</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Configuration: </Text>
//             <Text style={styles.detailValue}>{kit.configuration}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>No. of Panels: </Text>
//             <Text style={styles.detailValue}>{kit.num_panels}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.detailLabel}>Price: </Text>
//             <Text style={styles.detailValue}>₹{kit.price}</Text>
//           </View>
//         </View>
//         <View style={{ height: 32 }} />
//       </ScrollView>

//       {/* CLAIM WARRANTY BUTTON, sticky at bottom */}
//       <View style={styles.fixedBottom}>
//         <TouchableOpacity
//           onPress={handleClaimWarranty}
//           style={styles.claimButton}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="medal-outline" size={24} color="#000" style={{ marginRight: 8 }} />
//           <Text style={styles.claimButtonText}>Claim Warranty</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // --- Styles ---
// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//     paddingBottom: 60,
//   },
//   centerFull: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: COLORS.background,
//     padding: 16
//   },
//   heading: {
//     color: COLORS.text,
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 18,
//     textAlign: 'left',
//     letterSpacing: 0.5,
//   },
//   subHeading: {
//     color: COLORS.text,
//     fontSize: 20,
//     fontWeight: '600',
//     marginVertical: 14,
//     marginTop: 8,
//     letterSpacing: 0.3,
//   },
//   card: {
//     backgroundColor: COLORS.fieldBg || '#181A20',
//     borderRadius: 16,
//     marginBottom: 12,
//     padding: 18,
//     // Shadow/elevation
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOpacity: 0.10,
//         shadowOffset: { width: 0, height: 3 },
//         shadowRadius: 14,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: 24
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 7,
//   },
//   icon: {
//     marginRight: 8,
//     opacity: 0.75
//   },
//   cardLabel: {
//     color: COLORS.text,
//     fontWeight: '500',
//     fontSize: 16,
//     marginRight: 3,
//   },
//   cardValue: {
//     color: COLORS.text,
//     fontWeight: 'bold',
//     fontSize: 16,
//     flex: 1,
//     flexWrap: 'wrap'
//   },
//   detailRow: {
//     flexDirection: 'row',
//     marginBottom: 7,
//   },
//   detailLabel: {
//     color: COLORS.text,
//     fontWeight: '500',
//     fontSize: 16,
//     minWidth: 132,
//   },
//   detailValue: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   fixedBottom: {
//     position: 'absolute',
//     left: 0, right: 0, bottom: 0,
//     backgroundColor: COLORS.background,
//     borderTopWidth: 1,
//     borderColor: '#262626',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//     zIndex: 100,
//     // Add safe area padding for iOS if needed
//   },
//   claimButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FAD90E',
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 46,
//     shadowColor: "#c0b100",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 7,
//   },
//   claimButtonText: {
//     color: '#000',
//     fontWeight: 'bold',
//     fontSize: 19,
//     letterSpacing: 0.3,
//   },
// });



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
    </View>
  );
}
