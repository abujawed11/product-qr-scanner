// import api from '@/utils/api'; // Adjust the import path as needed
// import { useRoute } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// type WarrantyClaim = {
//   war_req_id: string;
//   status: string;
//   status_updated_at: string;
//   project_id: string;
//   order: { id: number; order_number: string };
//   kit_number: string;
//   purchase_date: string | null;
//   company_name: string;
//   contact_name: string;
//   contact_phone: string;
//   email: string;
//   accepted_statement: boolean;
//   reviewed_by?: { username: string } | null;
//   review_comment?: string | null;
//   checklist_answers?: Record<string, any>;
//   pdf_url?: string | null;
//   created_at: string;
// };

// const WarrantyStatusPage: React.FC = () => {
//   const route = useRoute();
//   const { war_req_id } = route.params as { war_req_id: string };
//   const [data, setData] = useState<WarrantyClaim | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     api.get(`/warranty-claims-status-byid/${war_req_id}/`)
//       .then(res => {
//         if (isMounted) setData(res.data);
//       })
//       .catch(error => {
//         if (isMounted) {
//           console.error(error);
//           Alert.alert('Error', 'Warranty request not found or network error.');
//         }
//       })
//       .finally(() => {
//         if (isMounted) setLoading(false);
//       });

//     return () => { isMounted = false; };
//   }, [war_req_id]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!data) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-lg text-red-600">Warranty request not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="bg-white flex-1 px-4 pt-6">
//       <Text className="text-2xl font-bold mb-2">Warranty Status</Text>
//       <Text className="text-base text-gray-600 mb-4">Request ID: {data.war_req_id}</Text>

//       <View className="mb-4">
//         <Text className="text-lg font-semibold mb-1">Status:</Text>
//         <Text className="text-base text-blue-700">{data.status.replace('_', ' ').toUpperCase()}</Text>
//         <Text className="text-xs text-gray-500">Updated at: {new Date(data.status_updated_at).toLocaleString()}</Text>
//       </View>

//       <View className="mb-2">
//         <Text className="font-semibold">Project ID:</Text>
//         <Text>{data.project_id}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Order #:</Text>
//         <Text>{data.order?.order_number || '-'}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Kit Number:</Text>
//         <Text>{data.kit_number}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Purchase Date:</Text>
//         <Text>{data.purchase_date || '-'}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Company:</Text>
//         <Text>{data.company_name}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Contact:</Text>
//         <Text>{data.contact_name} - {data.contact_phone}</Text>
//         <Text>{data.email}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Accepted Statement:</Text>
//         <Text>{data.accepted_statement ? 'Yes' : 'No'}</Text>
//       </View>
//       {data.reviewed_by && (
//         <View className="mb-2">
//           <Text className="font-semibold">Reviewed By:</Text>
//           <Text>{data.reviewed_by.username}</Text>
//         </View>
//       )}
//       {data.review_comment && (
//         <View className="mb-2">
//           <Text className="font-semibold">Review Comment:</Text>
//           <Text>{data.review_comment}</Text>
//         </View>
//       )}
//       {data.pdf_url && (
//         <TouchableOpacity
//           className="my-4"
//           onPress={() => Linking.openURL(data.pdf_url!)}
//         >
//           <Text className="text-blue-600 underline">Download PDF Report</Text>
//         </TouchableOpacity>
//       )}
//       <View className="mb-4">
//         <Text className="font-semibold">Created At:</Text>
//         <Text>{new Date(data.created_at).toLocaleString()}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default WarrantyStatusPage;

// import api from '@/utils/api';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import React from 'react';
// import { ActivityIndicator, Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// type WarrantyRouteParam = {
//   params: {
//     war_req_id: string;
//   };
// };

// type WarrantyClaim = {
//   war_req_id: string;
//   status: string;
//   status_updated_at: string;
//   project_id: string;
//   order: { id: number; order_number: string } | null;
//   order_id: string;
//   kit_number: string;
//   purchase_date: string | null;
//   company_name: string;
//   contact_name: string;
//   contact_phone: string;
//   email: string;
//   accepted_statement: boolean;
//   reviewed_by?: { username: string } | null;
//   review_comment?: string | null;
//   checklist_answers?: Record<string, unknown>;
//   pdf_url?: string | null;
//   created_at: string;
// };

// const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
//   const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
//   return res.data;
// };

// const WarrantyStatusPage: React.FC = () => {
//   const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
//   const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;

//   const queryClient = useQueryClient();

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch,
//     isRefetching,
//   } = useQuery<WarrantyClaim, Error>({
//     queryKey: ['warrantyStatusById', war_req_id],
//     queryFn: () => {
//       if (!war_req_id) throw new Error('No war_req_id provided');
//       return fetchWarrantyClaim(war_req_id);
//     },
//     enabled: !!war_req_id,
//     retry: 1,
//     // onError: removed!
//   });

//   // ✅ Correct way to show error
//   React.useEffect(() => {
//     if (isError) {
//       Alert.alert('Error', 'Warranty request not found or network error.');
//     }
//   }, [isError]);

//   const onRefresh = () => {
//     void refetch();
//   };

//   if (isLoading || isRefetching) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-lg text-red-600">Warranty request not found.</Text>
//         <TouchableOpacity
//           className="mt-4 px-4 py-2 bg-blue-600 rounded"
//           onPress={onRefresh}
//         >
//           <Text className="text-white font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="bg-white flex-1 px-4 pt-6">
//       <Text className="text-2xl font-bold mb-2">Warranty Status</Text>
//       <Text className="text-base text-gray-600 mb-4">Request ID: {data.war_req_id}</Text>
//       <View className="mb-4">
//         <Text className="text-lg font-semibold mb-1">Status:</Text>
//         <Text className="text-base text-blue-700">
//           {data.status.replace('_', ' ').toUpperCase()}
//         </Text>
//         <Text className="text-xs text-gray-500">
//           Updated at: {new Date(data.status_updated_at).toLocaleString()}
//         </Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Project ID:</Text>
//         <Text>{data.project_id}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Order #:</Text>
//         <Text>{data.order_id || '-'}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Kit Number:</Text>
//         <Text>{data.kit_number}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Purchase Date:</Text>
//         <Text>{data.purchase_date ?? '-'}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Company:</Text>
//         <Text>{data.company_name}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Contact:</Text>
//         <Text>
//           {data.contact_name} - {data.contact_phone}
//         </Text>
//         <Text>{data.email}</Text>
//       </View>
//       <View className="mb-2">
//         <Text className="font-semibold">Accepted Statement:</Text>
//         <Text>{data.accepted_statement ? 'Yes' : 'No'}</Text>
//       </View>
//       {data.reviewed_by && data.reviewed_by.username && (
//         <View className="mb-2">
//           <Text className="font-semibold">Reviewed By:</Text>
//           <Text>{data.reviewed_by.username}</Text>
//         </View>
//       )}
//       {data.review_comment && (
//         <View className="mb-2">
//           <Text className="font-semibold">Review Comment:</Text>
//           <Text>{data.review_comment}</Text>
//         </View>
//       )}
//       {data.pdf_url && (
//         <TouchableOpacity
//           className="my-4"
//           onPress={() => {
//             if (data.pdf_url) Linking.openURL(data.pdf_url);
//           }}
//         >
//           <Text className="text-blue-600 underline">Download PDF Report</Text>
//         </TouchableOpacity>
//       )}
//       <View className="mb-4">
//         <Text className="font-semibold">Created At:</Text>
//         <Text>{new Date(data.created_at).toLocaleString()}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default WarrantyStatusPage;


// import api from '@/utils/api';
// import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import { router } from 'expo-router';
// import React from 'react';
// import { ActivityIndicator, Alert, BackHandler, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// type WarrantyRouteParam = {
//     params: {
//         war_req_id: string;
//     };
// };

// type WarrantyClaim = {
//     war_req_id: string;
//     status: string;
//     status_updated_at: string;
//     project_id: string;
//     order: { id: number; order_number: string } | null;
//     order_id: string;
//     kit_number: string;
//     kit_id: string;
//     purchase_date: string | null;
//     company_name: string;
//     contact_name: string;
//     contact_phone: string;
//     email: string;
//     accepted_statement: boolean;
//     reviewed_by?: { username: string } | null;
//     review_comment?: string | null;
//     checklist_answers?: Record<string, unknown>;
//     pdf_url?: string | null;
//     created_at: string;
// };

// const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
//     const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
//     return res.data;
// };

// const WarrantyStatusPage: React.FC = () => {
//     const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
//     const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;


//         useFocusEffect(
//             React.useCallback(() => {

    
//                 const onBackPress = () => {
//                     router.replace('/(main)/warranty/warranty-status');
//                     return true;
//                 };
//                 const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//                 return () => subscription.remove();
//             }, [])
//         );

//     const {
//         data,
//         isLoading,
//         isError,
//         refetch,
//         isRefetching,
//     } = useQuery<WarrantyClaim, Error>({
//         queryKey: ['warrantyStatusById', war_req_id],
//         queryFn: () => {
//             if (!war_req_id) throw new Error('No war_req_id provided');
//             return fetchWarrantyClaim(war_req_id);
//         },
//         enabled: !!war_req_id,
//         retry: 1,
//     });

//     // Show error alert once per mount if an error occurs
//     React.useEffect(() => {
//         if (isError) {
//             Alert.alert('Error', 'Warranty request not found or network error.');
//         }
//     }, [isError]);

//     const onRefresh = React.useCallback(() => {
//         void refetch();
//     }, [refetch]);

//     if (isLoading && !isRefetching) {
//         return (
//             <View className="flex-1 justify-center items-center">
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }

//     if (isError || !data) {
//         return (
//             <View className="flex-1 justify-center items-center">
//                 <Text className="text-lg text-red-600">Warranty request not found.</Text>
//                 <TouchableOpacity
//                     className="mt-4 px-4 py-2 bg-blue-600 rounded"
//                     onPress={onRefresh}
//                 >
//                     <Text className="text-white font-bold">Retry</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <ScrollView
//             className="bg-white flex-1 px-4 pt-6"
//             refreshControl={
//                 <RefreshControl
//                     refreshing={isRefetching}
//                     onRefresh={onRefresh}
//                     colors={['#3b82f6']}
//                     tintColor="#3b82f6"
//                 />
//             }
//         >
//             <Text className="text-2xl font-bold mb-2">Warranty Status</Text>
//             <Text className="text-base text-gray-600 mb-4">Request ID: {data.war_req_id}</Text>
//             <View className="mb-4">
//                 <Text className="text-lg font-semibold mb-1">Status:</Text>
//                 <Text className="text-base text-blue-700">
//                     {data.status.replace('_', ' ').toUpperCase()}
//                 </Text>
//                 <Text className="text-xs text-gray-500">
//                     Updated at: {new Date(data.status_updated_at).toLocaleString()}
//                 </Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Client ID:</Text>
//                 <Text>{data.project_id}</Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Project ID:</Text>
//                 <Text>{data.project_id}</Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Order #:</Text>
//                 <Text>{data.order_id || '-'}</Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Kit Id:</Text>
//                 <Text>{data.kit_id}</Text>
//             </View>

//             <View className="mb-2">
//                 <Text className="font-semibold">Kit Number:</Text>
//                 <Text>{data.kit_number}</Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Purchase Date:</Text>
//                 <Text>{data.purchase_date ?? '-'}</Text>
//             </View>
//             <View className="mb-2">
//                 <Text className="font-semibold">Company:</Text>
//                 <Text>{data.company_name}</Text>
//             </View>
//             {/* <View className="mb-2">
//         <Text className="font-semibold">Contact:</Text>
//         <Text>
//           {data.contact_name} - {data.contact_phone}
//         </Text>
//         <Text>{data.email}</Text>
//       </View> */}
//             <View className="mb-2">
//                 <Text className="font-semibold">Accepted Statement:</Text>
//                 <Text>{data.accepted_statement ? 'Yes' : 'No'}</Text>
//             </View>
//             {data.reviewed_by && data.reviewed_by.username && (
//                 <View className="mb-2">
//                     <Text className="font-semibold">Reviewed By:</Text>
//                     <Text>{data.reviewed_by.username}</Text>
//                 </View>
//             )}
//             {data.review_comment && (
//                 <View className="mb-2">
//                     <Text className="font-semibold">Review Comment:</Text>
//                     <Text>{data.review_comment}</Text>
//                 </View>
//             )}
//             {/* {data.pdf_url && (
//         <TouchableOpacity
//           className="my-4"
//           onPress={() => {
//             if (data.pdf_url) Linking.openURL(data.pdf_url);
//           }}
//         >
//           <Text className="text-blue-600 underline">Download PDF Report</Text>
//         </TouchableOpacity>
//       )} */}
//             <View className="mb-4">
//                 <Text className="font-semibold">Created At:</Text>
//                 <Text>{new Date(data.created_at).toLocaleString()}</Text>
//             </View>
//         </ScrollView>
//     );
// };

// export default WarrantyStatusPage;



// import api from '@/utils/api';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// type WarrantyRouteParam = {
//   params: {
//     war_req_id: string;
//   };
// };

// type WarrantyClaim = {
//   war_req_id: string;
//   status: string;
//   status_updated_at: string;
//   project_id: string;
//   order: { id: number; order_number: string } | null;
//   order_id: string;
//   kit_number: string;
//   kit_id: string;
//   purchase_date: string | null;
//   company_name: string;
//   contact_name: string;
//   contact_phone: string;
//   email: string;
//   accepted_statement: boolean;
//   reviewed_by?: { username: string } | null;
//   review_comment?: string | null;
//   checklist_answers?: Record<string, unknown>;
//   pdf_url?: string | null;
//   created_at: string;
// };

// // ✅ Status color helper
// const getStatusColorClass = (status: string) => {
//   const normalized = status.toLowerCase();
//   if (normalized.includes('approved')) return 'text-green-600';
//   if (normalized.includes('pending')) return 'text-yellow-600';
//   if (normalized.includes('rejected')) return 'text-red-600';
//   return 'text-gray-700';
// };

// const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
//   const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
//   return res.data;
// };

// const WarrantyStatusPage: React.FC = () => {
//   const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
//   const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;

//   // useFocusEffect(
//   //   React.useCallback(() => {
//   //     const onBackPress = () => {
//   //       router.replace('/(main)/warranty');
//   //       return true;
//   //     };
//   //     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//   //     return () => subscription.remove();
//   //   }, [])
//   // );

//   const {
//     data,
//     isLoading,
//     isError,
//     refetch,
//     isRefetching,
//   } = useQuery<WarrantyClaim, Error>({
//     queryKey: ['warrantyStatusById', war_req_id],
//     queryFn: () => {
//       if (!war_req_id) throw new Error('No war_req_id provided');
//       return fetchWarrantyClaim(war_req_id);
//     },
//     enabled: !!war_req_id,
//     retry: 1,
//   });

//   React.useEffect(() => {
//     if (isError) {
//       Alert.alert('Error', 'Warranty request not found or network error.');
//     }
//   }, [isError]);

//   const onRefresh = React.useCallback(() => {
//     void refetch();
//   }, [refetch]);

//   if (isLoading && !isRefetching) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#FAD90E]">
//         <ActivityIndicator size="large" color="black" />
//         <Text className="mt-2 text-black">Loading...</Text>
//       </View>
//     );
//   }

//   if (isError || !data) {
//     return (
//       <View className="flex-1 justify-center items-center bg-[#FAD90E] px-4">
//         <Text className="text-lg text-red-600 text-center">
//           Warranty request not found.
//         </Text>
//         <TouchableOpacity
//           className="mt-4 px-5 py-2 bg-black rounded-lg"
//           onPress={onRefresh}
//         >
//           <Text className="text-[#FAD90E] font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="bg-[#FAD90E] flex-1 px-4 pt-6"
//       refreshControl={
//         <RefreshControl
//           refreshing={isRefetching}
//           onRefresh={onRefresh}
//           colors={['#000000']}
//           progressBackgroundColor="#FAD90E"
//         />
//       }
//     >
//       <Text className="text-3xl font-extrabold text-black tracking-wide mb-4"></Text>

//       {/* ✅ Dynamic Status Color Badge */}
//       <View className="bg-black px-4 py-1 rounded-full self-start mb-4">
//         <Text className={`font-bold tracking-wider ${getStatusColorClass(data.status)}`}>
//           {data.status.replace('_', ' ').toUpperCase()}
//         </Text>
//       </View>

//       {/* Detail Cards */}
//       <View className="bg-white rounded-xl shadow-md p-4 mb-4">
//         <Text className="font-semibold text-black mb-1">Request ID:</Text>
//         <Text className="text-gray-700">{data.war_req_id}</Text>

//         <Text className="font-semibold text-black mt-2 mb-1">Updated At:</Text>
//         <Text className="text-gray-700">
//           {new Date(data.status_updated_at).toLocaleString()}
//         </Text>
//       </View>

//       <View className="bg-white rounded-xl shadow-md p-4 mb-4">
//         <Text className="font-semibold text-black mt-2 mb-1">Project ID:</Text>
//         <Text className="text-gray-700">{data.project_id}</Text>
//         <Text className="font-semibold text-black mb-1">Client ID:</Text>
//         <Text className="text-gray-700">{data.project_id}</Text>

//         <Text className="font-semibold text-black mt-2 mb-1">Kit ID:</Text>
//         <Text className="text-gray-700">{data.kit_id}</Text>

//         <Text className="font-semibold text-black mt-2 mb-1">Kit Number:</Text>
//         <Text className="text-gray-700">{data.kit_number}</Text>

//         <Text className="font-semibold text-black mt-2 mb-1">Purchase Date:</Text>
//         <Text className="text-gray-700">{data.purchase_date ?? '-'}</Text>
//       </View>

//       <View className="bg-white rounded-xl shadow-md p-4 mb-4">
//         <Text className="font-semibold text-black mb-1">Company:</Text>
//         <Text className="text-gray-700">{data.company_name}</Text>

//         <Text className="font-semibold text-black mt-2 mb-1">Accepted Statement:</Text>
//         <Text className="text-gray-700">
//           {data.accepted_statement ? 'Yes' : 'No'}
//         </Text>
//       </View>

//       {(data.reviewed_by?.username || data.review_comment) && (
//         <View className="bg-white rounded-xl shadow-md p-4 mb-4">
//           {data.reviewed_by?.username && (
//             <>
//               <Text className="font-semibold text-black mb-1">Reviewed By:</Text>
//               <Text className="text-gray-700">{data.reviewed_by.username}</Text>
//             </>
//           )}
//           {data.review_comment && (
//             <>
//               <Text className="font-semibold text-black mt-2 mb-1">Review Comment:</Text>
//               <Text className="text-gray-700">{data.review_comment}</Text>
//             </>
//           )}
//         </View>
//       )}

//       {/* PDF Download Option (Commented Out)
//       {data.pdf_url && (
//         <TouchableOpacity
//           className="bg-black py-3 px-5 rounded-lg mb-6"
//           onPress={() => Linking.openURL(data.pdf_url!)}
//         >
//           <Text className="text-[#FAD90E] font-semibold text-center">
//             📄 Download PDF Report
//           </Text>
//         </TouchableOpacity>
//       )}
//       */}

//       <View className="bg-white rounded-xl shadow-md p-4 mb-10">
//         <Text className="font-semibold text-black mb-1">Created At:</Text>
//         <Text className="text-gray-700">{new Date(data.created_at).toLocaleString()}</Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default WarrantyStatusPage;




import api from '@/utils/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type WarrantyRouteParam = {
  params: {
    war_req_id: string;
  };
};

type WarrantyClaim = {
  war_req_id: string;
  status: string;
  status_updated_at: string;
  project_id: string;
  order: { id: number; order_number: string } | null;
  order_id: string;
  kit_number: string;
  kit_id: string;
  purchase_date: string | null;
  company_name: string;
  contact_name: string;
  contact_phone: string;
  email: string;
  accepted_statement: boolean;
  reviewed_by?: { username: string } | null;
  review_comment?: string | null;
  checklist_answers?: Record<string, unknown>;
  pdf_url?: string | null;
  created_at: string;
};

// Helper for status color and icon
const statusBadge = (status: string) => {
  const lower = status.toLowerCase();
  if (lower.includes('approved'))
    return { color: '#22c55e', icon: '✅', label: 'Approved' };
  if (lower.includes('pending'))
    return { color: '#FFD600', icon: '⏳', label: 'Pending Review' };
  if (lower.includes('rejected'))
    return { color: '#ef4444', icon: '⛔', label: 'Rejected' };
  return { color: '#64748b', icon: 'ℹ️', label: status };
};

const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
  const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
  return res.data;
};

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', marginBottom: 6 }}>
    <Text style={{ color: '#222', fontWeight: 'bold', width: 140 }}>{label}</Text>
    <Text style={{ color: '#444', flex: 1 }}>{value}</Text>
  </View>
);

const SectionCard: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <View className="bg-white rounded-xl shadow-md p-5 mb-5" style={{ elevation: 2 }}>
    {title && <Text style={{ color: '#FAD90E', fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{title}</Text>}
    {children}
  </View>
);

const WarrantyStatusPage: React.FC = () => {
  const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
  const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<WarrantyClaim, Error>({
    queryKey: ['warrantyStatusById', war_req_id],
    queryFn: () => {
      if (!war_req_id) throw new Error('No war_req_id provided');
      return fetchWarrantyClaim(war_req_id);
    },
    enabled: !!war_req_id,
    retry: 1,
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Warranty request not found or network error.');
    }
  }, [isError]);

  const onRefresh = React.useCallback(() => {
    void refetch();
  }, [refetch]);

  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FAD90E]">
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-2 text-black">Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FAD90E] px-4">
        <Text className="text-lg text-red-600 text-center">
          Warranty request not found.
        </Text>
        <TouchableOpacity
          className="mt-4 px-5 py-2 bg-black rounded-lg"
          onPress={onRefresh}
        >
          <Text className="text-[#FAD90E] font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Status badge and label
  const { color: statusColor, icon: statusIcon, label: statusLabel } = statusBadge(data.status);

  return (
    <ScrollView
      className="bg-[#FAD90E] flex-1 px-4 pt-0"
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          colors={['#000000']}
          progressBackgroundColor="#FAD90E"
        />
      }
    >
      {/* --- HEADER --- */}
      <View style={{
        alignItems: 'center', marginTop: 25, marginBottom: 18
      }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: '#161616', letterSpacing: 1 }}>Warranty Status</Text>
        <View style={{
          backgroundColor: statusColor,
          borderRadius: 32,
          paddingHorizontal: 18,
          paddingVertical: 6,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#161616', marginRight: 8 }}>{statusIcon}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#161616', letterSpacing: 1 }}>
            {statusLabel}
          </Text>
        </View>
        <Text style={{ color: '#666', marginTop: 5, fontSize: 13 }}>
          Last updated: {new Date(data.status_updated_at).toLocaleString()}
        </Text>
      </View>

      {/* --- BASIC INFORMATION --- */}
      <SectionCard>
        <InfoRow label="Request ID:" value={data.war_req_id} />
        <InfoRow label="Requested On:" value={new Date(data.created_at).toLocaleString()} />
        {data.accepted_statement && (
          <InfoRow label="Accepted Statement:" value={<Text style={{ color: '#22c55e', fontWeight: 'bold' }}>Yes</Text>} />
        )}
      </SectionCard>

      {/* --- PRODUCT & ORDER --- */}
      <SectionCard title="Product & Order">
        {/* <InfoRow label="Order Number:" value={data.order?.order_number ?? '-'} /> */}
        <InfoRow label="Project ID:" value={data.project_id} />
        <InfoRow label="Kit ID / Number:" value={`${data.kit_id} / ${data.kit_number}`} />
        <InfoRow label="Purchase Date:" value={data.purchase_date ?? '-'} />
      </SectionCard>

      {/* --- CONTACT --- */}
      <SectionCard title="Contact">
        <InfoRow label="Company:" value={data.company_name} />
        <InfoRow label="Contact Person:" value={data.contact_name || '-'} />
        <InfoRow label="Phone:" value={data.contact_phone || '-'} />
        <InfoRow label="Email:" value={data.email || '-'} />
      </SectionCard>

      {/* --- REVIEW --- */}
      {(data.reviewed_by?.username || data.review_comment) && (
        <SectionCard title="Review">
          {data.reviewed_by?.username && <InfoRow label="Reviewed By:" value={data.reviewed_by.username} />}
          {data.review_comment && <InfoRow label="Review Comment:" value={data.review_comment} />}
        </SectionCard>
      )}

      {/* --- CHECKLIST --- */}
      {data.checklist_answers && Object.keys(data.checklist_answers).length > 0 && (
        <SectionCard title="Inspection Checklist">
          {Object.entries(data.checklist_answers).map(([q, a], idx) => (
            <InfoRow key={q + idx} label={q + ':'} value={String(a)} />
          ))}
        </SectionCard>
      )}

      {/* --- PDF --- */}
      {data.pdf_url && (
        <TouchableOpacity
          className="bg-black py-3 px-5 rounded-lg mb-6 mt-1"
          onPress={() => Linking.openURL(data.pdf_url!)}
          style={{ alignSelf: 'center' }}
        >
          <Text className="text-[#FAD90E] font-semibold text-center">
            📄 Download PDF Report
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ marginBottom: 25 }} />
    </ScrollView>
  );
};

export default WarrantyStatusPage;
