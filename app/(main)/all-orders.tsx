// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { getStatusColor } from '@/utils/statusColor';
// import { router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';

// export default function AllOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get<Order[]>('/orders/');
//       setOrders(res.data);
//     } catch (err) {
//       console.error('Failed to fetch orders:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };


//    const goToOrderDetails = (customerId: string) => {
//       router.push(`/(main)/order-details?customerId=${customerId}`);
//     };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchOrders();
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-2">Loading orders...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-4"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {orders.length === 0 ? (
//         <Text className="text-white text-center mt-6">No orders found.</Text>
//       ) : (
//         orders.map((order) => (
//           <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
//             <Text className="text-black text-lg font-bold mb-1">📦 Order ID: {order.order_id}</Text>
//             <Text className="text-gray-600 text-sm">🗓️ Ordered: {new Date(order.order_date).toDateString()}</Text>
//             {order.expected_delivery_date && (
//               <Text className="text-gray-600 text-sm">🚚 Expected: {new Date(order.expected_delivery_date).toDateString()}</Text>
//             )}
//             {order.delivery_date && (
//               <Text className="text-gray-600 text-sm">✅ Delivered: {new Date(order.delivery_date).toDateString()}</Text>
//             )}
//             {order.remarks && (
//               <Text className="text-gray-600 text-sm">📝 Remarks: {order.remarks}</Text>
//             )}

//             {/* Items */}
//             <View className="mt-4">
//               <Text className="text-black font-semibold mb-1">🛠️ Items</Text>
//               {order.items.map((item, idx) => (
//                 <View key={idx} className="ml-2 mb-2 border border-gray-200 rounded-md p-2">
//                   <Text className="text-black text-sm font-semibold">
//                     {item.kit.configuration} × {item.quantity}
//                   </Text>
//                   <Text className="text-gray-700 text-sm ml-1">
//                     Panels: {item.kit.num_panels}, Tilt: {item.kit.tilt_angle}°, Clearance: {item.kit.clearance}m
//                   </Text>
//                   <Text className="text-gray-700 text-sm ml-1">
//                     Region: {item.kit.region}, Price: ₹{item.unit_price} × {item.quantity}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             {/* Summary */}
//             <View className="mt-2">
//               <Text className="text-black text-sm">🔢 Unique Kits: {order.kit_count}</Text>
//               <Text className="text-black text-sm">📦 Total Kits: {order.total_quantity}</Text>
//               <Text className={`mt-1 font-bold ${getStatusColor(order.status)}`}>
//                 📌 Status: {order.status.toUpperCase()}
//               </Text>
//             </View>
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// }


// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { router, useFocusEffect } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// export default function AllOrdersScreen() {
//     const [orders, setOrders] = useState<Order[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [refreshing, setRefreshing] = useState(false);

//     const fetchOrders = async () => {
//         try {
//             const res = await api.get<Order[]>('/orders/');
//             setOrders(res.data);
//         } catch (err) {
//             console.error('Failed to fetch orders:', err);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     };

//     useFocusEffect(() => {
//         const onBackPress = () => {
//             router.replace('/(main)/dashboard');
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//         return () => sub.remove();
//     });

//     useEffect(() => {
//         fetchOrders();
//     }, []);

//     const onRefresh = () => {
//         setRefreshing(true);
//         fetchOrders();
//     };


//     if (loading) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//                 <Text className="text-white mt-2">Loading orders...</Text>
//             </View>
//         );
//     }

//     return (
//         <ScrollView
//             className="flex-1 bg-black px-4 py-4"
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         >
//             {orders.length === 0 ? (
//                 <Text className="text-white text-center mt-6">No orders found.</Text>
//             ) : (
//                 orders.map((order) => (
//                     <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow relative">

//                         {/* View Details Button */}
//                         {/* <TouchableOpacity
//                             onPress={() => router.push(`/order-details?orderId=${order.order_id}`)}
//                             className="top-3 right-3 bg-yellow-400 px-3 py-3 rounded-full"
//                         >
//                             <Text className="text-black text-xs font-semibold">View Details</Text>
//                         </TouchableOpacity>

//                         <Text className="text-black text-lg font-bold mb-1">📦 Order ID: {order.order_id}</Text> */}

//                         <View className="flex-row justify-between items-center mb-2">
//                             <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>

//                             <TouchableOpacity
//                                 onPress={() => router.push(`/order-details?orderId=${order.order_id}`)}
//                                 className="bg-yellow-400 px-4 py-2 rounded-full active:opacity-80"
//                             // style={{ minHeight: 44, minWidth: 44 }}
//                             >
//                                 <Text className="text-black text-xs font-semibold text-center">View Details</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <Text className="text-gray-600 text-sm">🗓️ Ordered: {new Date(order.order_date).toDateString()}</Text>
//                         {order.expected_delivery_date && (
//                             <Text className="text-gray-600 text-sm">🚚 Expected: {new Date(order.expected_delivery_date).toDateString()}</Text>
//                         )}
//                         {order.delivery_date && (
//                             <Text className="text-gray-600 text-sm">✅ Delivered: {new Date(order.delivery_date).toDateString()}</Text>
//                         )}
//                         {order.remarks && (
//                             <Text className="text-gray-600 text-sm">📝 Remarks: {order.remarks}</Text>
//                         )}

//                         {/* Items */}
//                         <View className="mt-4">
//                             <Text className="text-black font-semibold mb-1">🛠️ Items</Text>
//                             {order.items.map((item, idx) => (
//                                 <View key={idx} className="ml-2 mb-2 border border-gray-200 rounded-md p-2">
//                                     <Text className="text-black text-sm font-semibold">
//                                         {item.kit.configuration} × {item.quantity}
//                                     </Text>
//                                     <Text className="text-gray-700 text-sm ml-1">
//                                         Panels: {item.kit.num_panels}, Tilt: {item.kit.tilt_angle}°, Clearance: {item.kit.clearance}m
//                                     </Text>
//                                     <Text className="text-gray-700 text-sm ml-1">
//                                         Region: {item.kit.region}, Price: ₹{item.unit_price} × {item.quantity}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>

//                         {/* Summary */}
//                         <View className="mt-2">
//                             <Text className="text-black text-sm">🔢 Unique Kits: {order.kit_count}</Text>
//                             <Text className="text-black text-sm">📦 Total Kits: {order.total_quantity}</Text>
//                             {/* <Text className={`mt-1 font-bold ${getStatusColor(order.status)}`}>
//                                 📌 Status: {order.status.toUpperCase()}
//                             </Text> */}
//                         </View>
//                     </View>
//                 ))
//             )}
//         </ScrollView>
//     );
// }




import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// You can add/update this type in your types file as shown earlier:
// export interface Order {
//   project_id: string;          // Use as unique key / main ID
//   client_id: string;
//   manufacturing_location: string;
//   dispatch_location: string;
//   order_date: string;
//   status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
//   expected_delivery_date?: string | null;
//   delivery_date?: string | null;
//   remarks?: string | null;
//   total_quantity: number;
//   kit_count: number;
//   delivery_address?: string | null;
//   billing_address?: string | null;
//   po_date?: string | null;
//   payment_received?: string | null;
//   payment_percentage?: string | null;
//   total_kits?: string | null;
//   partial_delivery_allowed?: string | null;
//   production_status?: string | null;
//   dispatch_status?: string | null;
//   delivery_status?: string | null;
//   production_unit?: string | null;
//   // Items intentionally omitted for summary
// }

export default function AllOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get<Order[]>('/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(() => {
    const onBackPress = () => {
      router.replace('/(main)/dashboard');
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        <Text className="text-white mt-2">Loading orders...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-4"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {orders.length === 0 ? (
        <Text className="text-white text-center mt-6">No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.project_id} className="bg-white rounded-2xl p-4 mb-4 shadow relative">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-black text-lg font-bold">
                🏗️ Project ID: {order.project_id}
              </Text>
              <TouchableOpacity
                onPress={() =>
                //   router.push(`/order-details?projectId=${order.order_id}`)
                router.push(`/order-details?orderId=${order.order_id}`)
                
                }
                className="bg-yellow-400 px-4 py-2 rounded-full active:opacity-80"
              >
                <Text className="text-black text-xs font-semibold text-center">View Details</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600 text-sm">👤 Client: {order.client_id}</Text>
            <Text className="text-gray-600 text-sm">
              🗓️ Ordered: {order.order_date ? new Date(order.order_date).toDateString() : '-'}
            </Text>
            {order.expected_delivery_date && (
              <Text className="text-gray-600 text-sm">
                🚚 Expected: {new Date(order.expected_delivery_date).toDateString()}
              </Text>
            )}
            {order.delivery_date && (
              <Text className="text-gray-600 text-sm">
                ✅ Delivered: {new Date(order.delivery_date).toDateString()}
              </Text>
            )}
            {order.po_date && (
              <Text className="text-gray-600 text-sm">
                📄 PO Date: {order.po_date ? new Date(order.po_date).toDateString() : '-'}
              </Text>
            )}

            {/* <Text className="text-gray-700 text-sm">
              🏭 Manufacturing Unit: {order.manufacturing_location}
            </Text>
            <Text className="text-gray-700 text-sm">
              🚚 Dispatch From: {order.dispatch_location}
            </Text> */}

            <Text className="text-sm mt-2 font-bold text-blue-700">
              📌 Status: {order.status.toUpperCase()}
            </Text>

            <Text className="text-black text-sm mt-2">
              🔢 Unique Kits: {order.kit_count}
            </Text>
            <Text className="text-black text-sm">
              📦 Total Kits: {order.total_quantity}
            </Text>

            {order.production_status && (
              <Text className="text-gray-700 text-sm">
                ⚙️ Production Status: {order.production_status}
              </Text>
            )}
            {order.dispatch_status && (
              <Text className="text-gray-700 text-sm">
                🚚 Dispatch Status: {order.dispatch_status}
              </Text>
            )}
            {order.delivery_status && (
              <Text className="text-gray-700 text-sm">
                📦 Delivery Status: {order.delivery_status}
              </Text>
            )}

            {order.payment_received && (
              <Text className="text-gray-700 text-sm">
                💰 Payment: {order.payment_received}
              </Text>
            )}
            {order.payment_percentage && (
              <Text className="text-gray-700 text-sm">
                💵 Payment %: {order.payment_percentage}
              </Text>
            )}

            {order.delivery_address && (
              <Text className="text-gray-700 text-xs mt-1">
                🏠 Delivery Address: {order.delivery_address}
              </Text>
            )}
            {order.billing_address && (
              <Text className="text-gray-700 text-xs">
                🏠 Billing Address: {order.billing_address}
              </Text>
            )}
            {order.partial_delivery_allowed && (
              <Text className="text-gray-700 text-xs">
                🪫 Partial Delivery Allowed: {order.partial_delivery_allowed}
              </Text>
            )}
            {order.remarks && (
              <Text className="text-gray-600 text-sm">📝 Remarks: {order.remarks}</Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
