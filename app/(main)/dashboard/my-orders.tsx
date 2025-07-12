// // import { useAuth } from '@/context/AuthContext';
// // import { Text, View } from 'react-native';

// // export default function MyOrdersScreen() {
// //   const { user, logout } = useAuth();

// //   return (
// //     <View className="flex-1 bg-yellow-100 items-center justify-center px-4">
// //       <Text className="text-2xl font-bold text-yellow-600 mb-2">Welcome!</Text>
// //         <Text>My Orders</Text>

// //     </View>
// //   );
// // }

// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

// interface OrderItem {
//   kit: string;
//   quantity: number;
// }

// interface Order {
//   order_id: string;
//   order_date: string;
//   customer: string;
//   status: string;
//   manufacturing_location: string;
//   dispatch_location: string;
//   expected_delivery_date: string;
//   items: OrderItem[];
// }

// const MyOrdersScreen = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   // const { token } = useAuth();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get('/orders/');
//         setOrders(response.data);
//       } catch (err) {
//         console.error('Failed to fetch orders:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-2">Loading orders...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-black p-4">
//       {orders.length === 0 && (
//         <Text className="text-white text-center mt-10 text-lg">No orders found.</Text>
//       )}

//       {orders.map((order) => {
//         const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);

//         return (
//           <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
//             <Text className="text-lg font-bold text-black">📦 Order ID: {order.order_id}</Text>
//             <Text className="text-sm text-gray-600 mt-1">🗓️ {new Date(order.order_date).toDateString()}</Text>
//             <Text className="text-sm text-gray-700 mt-1">🏭 From: {order.manufacturing_location}</Text>
//             <Text className="text-sm text-gray-700">📦 To: {order.dispatch_location}</Text>

//             <Text className="text-sm font-semibold mt-2 text-black">🛠️ Items:</Text>
//             {order.items.map((item, idx) => (
//               <Text key={idx} className="ml-2 text-sm text-gray-700">
//                 • Kit: {item.kit} × {item.quantity}
//               </Text>
//             ))}

//             <Text className="text-sm mt-2 text-black">📦 Total Qty: {totalQty}</Text>
//             {order.expected_delivery_date && (
//               <Text className="text-sm text-black">🚚 Expected: {new Date(order.expected_delivery_date).toDateString()}</Text>
//             )}

//             <Text className="text-sm text-yellow-600 mt-1">📌 Status: {order.status.toUpperCase()}</Text>
//           </View>
//         );
//       })}
//     </ScrollView>
//   );
// };

// export default MyOrdersScreen;


// import { Order } from '@/types/order.types';
// import api from '@/utils/api'; // axios instance with interceptors
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { getStatusColor } from '@/utils/statusColor';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, RefreshControl, ScrollView, Text, View } from 'react-native';


// const MyOrdersScreen = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       console.log("Fetching orders...");
//       const res = await api.get('/orders/');
//       setOrders(res.data);
//     } catch (err) {
//       console.error('Failed to fetch orders:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

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
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {orders.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No orders found.</Text>
//       ) : (
//         orders.map((order) => (
//           <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
//             <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>
//             <Text className="text-gray-600 text-sm mt-1">🗓️ {new Date(order.order_date).toDateString()}</Text>
//             <Text className="text-sm text-gray-700 mt-1">🏭 From: {order.manufacturing_location}</Text>
//             <Text className="text-sm text-gray-700">📦 To: {order.dispatch_location}</Text>

//             <View className="mt-2">
//               <Text className="text-black font-semibold text-sm mb-1">🛠️ Items:</Text>
//               {order.items.map((item, index) => (
//                 <View key={item.order_item_id} className="ml-2 mb-1">
//                   <Text className="text-sm text-black">
//                     • {item.kit.configuration} ({item.kit.num_panels} Panels) × {item.quantity}
//                   </Text>
//                   <Text className="text-xs text-gray-600 ml-2">
//                     Tilt: {item.kit.tilt_angle}°, Region: {item.kit.region}, ₹{item.unit_price} per kit
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             <View className="mt-2">
//               <Text className="text-black text-sm">🔢 Unique Kits: {order.kit_count}</Text>
//               <Text className="text-black text-sm">📦 Total Kits Ordered: {order.total_quantity}</Text>
//               {order.expected_delivery_date && (
//                 <Text className="text-black text-sm">🚚 Expected: {new Date(order.expected_delivery_date).toDateString()}</Text>
//               )}
//               {order.delivery_date && (
//                 <Text className="text-black text-sm">✅ Delivered: {new Date(order.delivery_date).toDateString()}</Text>
//               )}
//               {order.remarks && (
//                 <Text className="text-black text-sm">📝 Remarks: {order.remarks}</Text>
//               )}
//               <Text className={`mt-1 font-semibold ${getStatusColor(order.status)}`}>
//                 📌 Status: {order.status.toUpperCase()}
//               </Text>
//             </View>
//           </View>
//         ))
//       )}
//     </ScrollView>
//   );
// };


// export default MyOrdersScreen;


// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { getStatusColor } from '@/utils/statusColor';
// import { router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   Text,
//   View
// } from 'react-native';

// const MyOrdersScreen = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/orders/');
//       setOrders(res.data);
//     } catch (err) {
//       console.error('Failed to fetch orders:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchOrders();
//   };

//   const goToOrderDetails = (customerId: string) => {
//     router.push(`/(main)/order-details?customerId=${customerId}`);
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-2">Loading orders...</Text>
//       </View>
//     );
//   }

//   // console.log(order.customer_id)

//   return (
//     <ScrollView
//       className="flex-1 bg-black px-4 py-2"
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {orders.length === 0 ? (
//         <Text className="text-white text-center mt-8 text-lg">No orders found.</Text>
//       ) : (
//         orders.map((order) => (
//           // <TouchableOpacity
//           //   key={order.order_id}
//           //   className="bg-white rounded-2xl p-4 mb-4 shadow"
//           //   onPress={() => goToOrderDetails(order.customer_id)}
//           // >
//           // <View className='bg-white rounded-2xl p-4 mb-4 shadow'>
//           //   <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>
//           //   <Text className="text-gray-600 text-sm mt-1">
//           //     🗓️ {new Date(order.order_date).toDateString()}
//           //   </Text>

//           //   {/* Product Summary */}
//           //   <View className="mt-3 mb-2">
//           //     <Text className="text-black font-semibold text-sm mb-1">🛠️ Kits Ordered:</Text>
//           //     {order.items.slice(0, 2).map((item, index) => (
//           //       <View key={index} className="ml-2 mb-1">
//           //         <Text className="text-sm text-black">
//           //           • {item.kit.configuration} × {item.quantity}
//           //         </Text>
//           //       </View>
//           //     ))}
//           //     {order.items.length > 2 && (
//           //       <Text className="ml-2 text-xs text-gray-500">+ {order.items.length - 2} more kits</Text>
//           //     )}
//           //   </View>


//           //   {/* Status */}
//           //   <Text className={`mt-2 font-semibold ${getStatusColor(order.status)}`}>
//           //     📌 Status: {order.status.toUpperCase()}
//           //   </Text>
//           // </View>
//           <View key={order.order_id} className='bg-white rounded-2xl p-4 mb-4 shadow'>
//             <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>
//             <Text className="text-gray-600 text-sm mt-1">
//               🗓️ {new Date(order.order_date).toDateString()}
//             </Text>

//             <View className="mt-3 mb-2">
//               <Text className="text-black font-semibold text-sm mb-1">🛠️ Kits Ordered:</Text>
//               {order.items.slice(0, 2).map((item, index) => (
//                 <View key={index} className="ml-2 mb-1">
//                   <Text className="text-sm text-black">
//                     • {item.kit.configuration} × {item.quantity}
//                   </Text>
//                 </View>
//               ))}
//               {order.items.length > 2 && (
//                 <Text className="ml-2 text-xs text-gray-500">+ {order.items.length - 2} more kits</Text>
//               )}
//             </View>

//             {/* Status */}
//             <Text className={`mt-2 font-semibold ${getStatusColor(order.status)}`}>
//               📌 Status: {order.status.toUpperCase()}
//             </Text>

//             {/* Claim Warranty Button */}
//             <View className="mt-4">
//               <Text
//                 onPress={() =>
//                   router.push({
//                     pathname: '/(main)/warranty/claim-form',
//                     params: { order_id: order.order_id },
//                   })
//                 }
//                 className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
//               >
//                 🛡️ Claim Warranty
//               </Text>
//             </View>
//           </View>

//         ))
//       )}
//     </ScrollView>
//   );
// };

// export default MyOrdersScreen;


import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { getStatusColor } from '@/utils/statusColor';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const goToOrderDetails = (customerId: string) => {
    router.push(`/(main)/order-details?customerId=${customerId}`);
  };

  const getPanelCount = (configuration: string): number => {
    const configMap: Record<string, number> = {
      '2P×3': 6,
      '2P×5': 10,
    };
    return configMap[configuration] || 0;
  };

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-2"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {orders.length === 0 ? (
        <Text className="text-white text-center mt-8 text-lg">No orders found.</Text>
      ) : (
        orders.map((order) => (
          <View key={order.order_id} className="bg-white rounded-2xl p-4 mb-4 shadow">
            <Text className="text-black text-lg font-bold">📦 Order ID: {order.order_id}</Text>
            <Text className="text-gray-600 text-sm mt-1">
              🗓️ {new Date(order.order_date).toDateString()}
            </Text>

            {/* Kits Ordered */}
            <View className="mt-3 mb-2">
              <Text className="text-black font-semibold text-sm mb-1">🛠️ Kits Ordered:</Text>
              {order.items.slice(0, 2).map((item, index) => {
                const config = item.kit.configuration;
                const panels = getPanelCount(config);
                return (
                  <View key={index} className="ml-2 mb-1">
                    <Text className="text-sm text-black">
                      • {config} ({panels} Panels) – Qty: {item.quantity}
                    </Text>
                  </View>
                );
              })}
              {order.items.length > 2 && (
                <Text className="ml-2 text-xs text-gray-500">
                  + {order.items.length - 2} more kits
                </Text>
              )}
            </View>

            {/* Status */}
            <Text className={`mt-2 font-semibold ${getStatusColor(order.status)}`}>
              📌 Status: {order.status.toUpperCase()}
            </Text>

            {/* Claim Warranty Button */}
            <View className="mt-4">
              <Text
                onPress={() =>
                  router.push({
                    pathname: '/(main)/warranty/claim-form',
                    params: { order_id: order.order_id },
                  })
                }
                className="text-center bg-yellow-400 text-black font-bold py-2 rounded-xl"
              >
                🛡️ Claim Warranty
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default MyOrdersScreen;