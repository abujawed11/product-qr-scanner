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


import api from '@/utils/api';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, BackHandler, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
    const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
    return res.data;
};

const WarrantyStatusPage: React.FC = () => {
    const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
    const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;


        useFocusEffect(
            React.useCallback(() => {

    
                const onBackPress = () => {
                    router.replace('/(main)/warranty/warranty-status');
                    return true;
                };
                const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
                return () => subscription.remove();
            }, [])
        );

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

    // Show error alert once per mount if an error occurs
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
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (isError || !data) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-red-600">Warranty request not found.</Text>
                <TouchableOpacity
                    className="mt-4 px-4 py-2 bg-blue-600 rounded"
                    onPress={onRefresh}
                >
                    <Text className="text-white font-bold">Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView
            className="bg-white flex-1 px-4 pt-6"
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={onRefresh}
                    colors={['#3b82f6']}
                    tintColor="#3b82f6"
                />
            }
        >
            <Text className="text-2xl font-bold mb-2">Warranty Status</Text>
            <Text className="text-base text-gray-600 mb-4">Request ID: {data.war_req_id}</Text>
            <View className="mb-4">
                <Text className="text-lg font-semibold mb-1">Status:</Text>
                <Text className="text-base text-blue-700">
                    {data.status.replace('_', ' ').toUpperCase()}
                </Text>
                <Text className="text-xs text-gray-500">
                    Updated at: {new Date(data.status_updated_at).toLocaleString()}
                </Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Client ID:</Text>
                <Text>{data.project_id}</Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Project ID:</Text>
                <Text>{data.project_id}</Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Order #:</Text>
                <Text>{data.order_id || '-'}</Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Kit Id:</Text>
                <Text>{data.kit_id}</Text>
            </View>

            <View className="mb-2">
                <Text className="font-semibold">Kit Number:</Text>
                <Text>{data.kit_number}</Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Purchase Date:</Text>
                <Text>{data.purchase_date ?? '-'}</Text>
            </View>
            <View className="mb-2">
                <Text className="font-semibold">Company:</Text>
                <Text>{data.company_name}</Text>
            </View>
            {/* <View className="mb-2">
        <Text className="font-semibold">Contact:</Text>
        <Text>
          {data.contact_name} - {data.contact_phone}
        </Text>
        <Text>{data.email}</Text>
      </View> */}
            <View className="mb-2">
                <Text className="font-semibold">Accepted Statement:</Text>
                <Text>{data.accepted_statement ? 'Yes' : 'No'}</Text>
            </View>
            {data.reviewed_by && data.reviewed_by.username && (
                <View className="mb-2">
                    <Text className="font-semibold">Reviewed By:</Text>
                    <Text>{data.reviewed_by.username}</Text>
                </View>
            )}
            {data.review_comment && (
                <View className="mb-2">
                    <Text className="font-semibold">Review Comment:</Text>
                    <Text>{data.review_comment}</Text>
                </View>
            )}
            {/* {data.pdf_url && (
        <TouchableOpacity
          className="my-4"
          onPress={() => {
            if (data.pdf_url) Linking.openURL(data.pdf_url);
          }}
        >
          <Text className="text-blue-600 underline">Download PDF Report</Text>
        </TouchableOpacity>
      )} */}
            <View className="mb-4">
                <Text className="font-semibold">Created At:</Text>
                <Text>{new Date(data.created_at).toLocaleString()}</Text>
            </View>
        </ScrollView>
    );
};

export default WarrantyStatusPage;




