// app/(main)/profile.tsx
// import React from 'react';
// import { Text, View } from 'react-native';

// export default function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>This is the Manage Order screen</Text>
//     </View>
//   );
// }


// import { Order } from '@/types/order.types'; // Your Order TypeScript interface
// import api from '@/utils/api'; // Axios instance for your API calls
// import { BACKGROUND_COLOR } from '@/utils/color'; // Assuming this exists
// import { formatDateTime } from '@/utils/formatDate'; // Date formatting helper
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
//   return (
//     <View
//       className="bg-white rounded-lg p-4 mb-4 shadow-md"
//       style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 }}
//     >
//       <Text className="text-lg font-bold mb-1">Order ID: {order.order_id}</Text>
//       <Text className="text-gray-700 mb-1">Project ID: {order.project_id}</Text>
//       <Text className="text-gray-700 mb-1">Status: {order.status || 'N/A'}</Text>
//       <Text className="text-gray-700 mb-2">
//         Order Date: {formatDateTime(order.order_date)}
//       </Text>

//       <TouchableOpacity
//         onPress={() => onViewStatus(order)}
//         className="bg-blue-600 px-3 py-2 rounded-md self-start"
//       >
//         <Text className="text-white font-semibold">View Status</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default function ManageOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   // Fetch orders on mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get<Order[]>('/admin/orders/'); // Adjust URL as needed
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Failed to fetch orders', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-2xl font-bold mb-4">Manage Orders</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//       ) : (
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {orders.length === 0 && (
//             <Text className="text-center text-gray-500 mt-8">No orders found.</Text>
//           )}

//           {orders.map(order => (
//             <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//           ))}
//         </ScrollView>
//       )}

//       {/* Status Modal */}
//       <Modal
//         visible={!!selectedOrder}
//         transparent
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-4">
//           <View className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
//             <Text className="text-xl font-bold mb-2">Order Status</Text>

//             <Text>
//               <Text className="font-semibold">Overall Status:</Text> {selectedOrder?.status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Production Status:</Text>{' '}
//               {selectedOrder?.production_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Dispatch Status:</Text>{' '}
//               {selectedOrder?.dispatch_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Delivery Status:</Text>{' '}
//               {selectedOrder?.delivery_status || 'N/A'}
//             </Text>

//             <Pressable
//               onPress={handleCloseModal}
//               className="bg-blue-600 rounded-md py-2 mt-4"
//             >
//               <Text className="text-white text-center font-semibold">Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }


// import { Order } from '@/types/order.types'; // Your Order TypeScript interface
// import api from '@/utils/api'; // Axios instance for your API calls
// import { BACKGROUND_COLOR } from '@/utils/color'; // Assuming this exists
// import { formatDateTime } from '@/utils/formatDate'; // Date formatting helper
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
//   return (
//     <View
//       className="bg-white rounded-lg p-4 mb-4 shadow-md"
//       style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 }}
//     >
//       <Text className="text-lg font-bold mb-1">Order ID: {order.order_id}</Text>
//       <Text className="text-gray-700 mb-1">Project ID: {order.project_id}</Text>
//       <Text className="text-gray-700 mb-1">Status: {order.status || 'N/A'}</Text>
//       <Text className="text-gray-700 mb-2">Order Date: {formatDateTime(order.order_date)}</Text>

//       <TouchableOpacity
//         onPress={() => onViewStatus(order)}
//         className="bg-blue-600 px-3 py-2 rounded-md self-start"
//       >
//         <Text className="text-white font-semibold">View Status</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default function ManageOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await api.get<PaginatedResponse<Order>>('/admin/orders/'); // Adjust URL as needed
//         setOrders(response.data.results); // Use results array from paginated response
//       } catch (error) {
//         console.error('Failed to fetch orders', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-2xl font-bold mb-4">Manage Orders</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//       ) : (
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {orders.length === 0 && (
//             <Text className="text-center text-gray-500 mt-8">No orders found.</Text>
//           )}

//           {orders.map(order => (
//             <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//           ))}
//         </ScrollView>
//       )}

//       <Modal
//         visible={!!selectedOrder}
//         transparent
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-4">
//           <View className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
//             <Text className="text-xl font-bold mb-2">Order Status</Text>

//             <Text>
//               <Text className="font-semibold">Overall Status:</Text> {selectedOrder?.status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Production Status:</Text>{' '}
//               {selectedOrder?.production_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Dispatch Status:</Text>{' '}
//               {selectedOrder?.dispatch_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Delivery Status:</Text>{' '}
//               {selectedOrder?.delivery_status || 'N/A'}
//             </Text>

//             <Pressable
//               onPress={handleCloseModal}
//               className="bg-blue-600 rounded-md py-2 mt-4"
//             >
//               <Text className="text-white text-center font-semibold">Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



// import { Order } from '@/types/order.types'; // Your Order TypeScript interface
// import api from '@/utils/api'; // Axios instance for your API calls
// import { BACKGROUND_COLOR } from '@/utils/color'; // Assuming this exists
// import { formatDateTime } from '@/utils/formatDate'; // Date formatting helper
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
//   return (
//     <View
//       className="bg-white rounded-lg p-4 mb-4 shadow-md"
//       style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 }}
//     >
//       <Text className="text-lg font-bold mb-1">Order ID: {order.order_id}</Text>
//       <Text className="text-gray-700 mb-1">Project ID: {order.project_id}</Text>
//       <Text className="text-gray-700 mb-1">Status: {order.status || 'N/A'}</Text>
//       <Text className="text-gray-700 mb-2">Order Date: {formatDateTime(order.order_date)}</Text>

//       <TouchableOpacity
//         onPress={() => onViewStatus(order)}
//         className="bg-blue-600 px-3 py-2 rounded-md self-start"
//       >
//         <Text className="text-white font-semibold">View Status</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default function ManageOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await api.get<PaginatedResponse<Order>>('/admin/orders/'); // Adjust URL as needed
//       setOrders(response.data.results);
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     fetchOrders().finally(() => setLoading(false));
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders().finally(() => setRefreshing(false));
//   }, [fetchOrders]);

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-2xl font-bold mb-4">Manage Orders</Text>

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={BACKGROUND_COLOR} />
//           }
//         >
//           {orders.length === 0 && (
//             <Text className="text-center text-gray-500 mt-8">No orders found.</Text>
//           )}

//           {orders.map(order => (
//             <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//           ))}
//         </ScrollView>
//       )}

//       <Modal
//         visible={!!selectedOrder}
//         transparent
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-4">
//           <View className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
//             <Text className="text-xl font-bold mb-2">Order Status</Text>

//             <Text>
//               <Text className="font-semibold">Overall Status:</Text> {selectedOrder?.status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Production Status:</Text>{' '}
//               {selectedOrder?.production_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Dispatch Status:</Text>{' '}
//               {selectedOrder?.dispatch_status || 'N/A'}
//             </Text>
//             <Text>
//               <Text className="font-semibold">Delivery Status:</Text>{' '}
//               {selectedOrder?.delivery_status || 'N/A'}
//             </Text>

//             <Pressable
//               onPress={handleCloseModal}
//               className="bg-blue-600 rounded-md py-2 mt-4"
//             >
//               <Text className="text-white text-center font-semibold">Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { formatDateTime } from '@/utils/formatDate';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Platform,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Color palette
// const BLACK = '#000000';
// const ACCENT = '#FAD90E';
// const TEXT_PRIMARY = '#F5F5F5'; // off-white for text
// const TEXT_SECONDARY = '#BFBFBF'; // lighter gray text

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => (
//   <View
//     style={{
//       backgroundColor: BLACK,
//       borderRadius: 16,
//       padding: 20,
//       marginVertical: 10,
//       borderWidth: 1,
//       borderColor: ACCENT,
//       shadowColor: ACCENT,
//       shadowOpacity: 0.4,
//       shadowRadius: 12,
//       shadowOffset: { width: 0, height: 5 },
//       elevation: Platform.OS === 'android' ? 6 : 0,
//     }}
//   >
//     <Text style={{ color: ACCENT, fontSize: 20, fontWeight: '700', marginBottom: 6 }}>
//       Order ID: {order.order_id}
//     </Text>
//     <Text style={{ color: TEXT_SECONDARY, fontSize: 16, marginBottom: 4 }}>
//       Project ID: {order.project_id}
//     </Text>
//     <Text style={{ color: TEXT_SECONDARY, fontSize: 16, marginBottom: 4 }}>
//       Status: <Text style={{ color: ACCENT }}>{order.status || 'N/A'}</Text>
//     </Text>
//     <Text style={{ color: TEXT_SECONDARY, fontSize: 14, marginBottom: 14 }}>
//       Order Date: <Text style={{ color: TEXT_PRIMARY }}>{formatDateTime(order.order_date)}</Text>
//     </Text>

//     <TouchableOpacity
//       onPress={() => onViewStatus(order)}
//       style={{
//         backgroundColor: ACCENT,
//         paddingVertical: 12,
//         paddingHorizontal: 28,
//         borderRadius: 24,
//         alignSelf: 'flex-start',
//         shadowColor: ACCENT,
//         shadowOpacity: 0.6,
//         shadowRadius: 10,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//       }}
//       activeOpacity={0.85}
//     >
//       <Text style={{ color: BLACK, fontWeight: '700', fontSize: 16, letterSpacing: 0.5 }}>
//         View Status
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// export default function ManageOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await api.get<PaginatedResponse<Order>>('/admin/orders/');
//       setOrders(response.data.results);
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     fetchOrders().finally(() => setLoading(false));
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders().finally(() => setRefreshing(false));
//   }, [fetchOrders]);

//   const handleCloseModal = () => setSelectedOrder(null);

//   return (
//     <View style={{ flex: 1, backgroundColor: BLACK, padding: 20 }}>
//       <Text
//         style={{
//           color: ACCENT,
//           fontSize: 28,
//           fontWeight: '900',
//           letterSpacing: 2,
//           marginBottom: 20,
//           textShadowColor: ACCENT,
//           textShadowOffset: { width: 0, height: 3 },
//           textShadowRadius: 15,
//         }}
//       >
//         Manage Orders
//       </Text>

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={ACCENT} />
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />}
//         >
//           {orders.length === 0 && (
//             <Text style={{ color: TEXT_SECONDARY, textAlign: 'center', fontSize: 16, marginTop: 48 }}>
//               No orders found.
//             </Text>
//           )}

//           {orders.map((order) => (
//             <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//           ))}
//         </ScrollView>
//       )}

//       <Modal visible={!!selectedOrder} transparent animationType="slide" onRequestClose={handleCloseModal}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0,0,0,0.85)',
//             paddingHorizontal: 20,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: BLACK,
//               borderRadius: 20,
//               width: '100%',
//               maxWidth: 400,
//               padding: 28,
//               borderWidth: 1,
//               borderColor: ACCENT,
//               shadowColor: ACCENT,
//               shadowOpacity: 0.75,
//               shadowRadius: 16,
//               shadowOffset: { width: 0, height: 8 },
//               elevation: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: '900',
//                 color: ACCENT,
//                 marginBottom: 16,
//                 letterSpacing: 1.3,
//               }}
//             >
//               Order Status
//             </Text>

//             <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//               <Text style={{ color: ACCENT, fontWeight: '700' }}>Overall Status: </Text>
//               {selectedOrder?.status || 'N/A'}
//             </Text>
//             <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//               <Text style={{ color: ACCENT, fontWeight: '700' }}>Production Status: </Text>
//               {selectedOrder?.production_status || 'N/A'}
//             </Text>
//             <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//               <Text style={{ color: ACCENT, fontWeight: '700' }}>Dispatch Status: </Text>
//               {selectedOrder?.dispatch_status || 'N/A'}
//             </Text>
//             <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 20 }}>
//               <Text style={{ color: ACCENT, fontWeight: '700' }}>Delivery Status: </Text>
//               {selectedOrder?.delivery_status || 'N/A'}
//             </Text>

//             <Pressable
//               onPress={handleCloseModal}
//               style={{
//                 backgroundColor: ACCENT,
//                 paddingVertical: 14,
//                 borderRadius: 28,
//                 shadowColor: ACCENT,
//                 shadowOpacity: 0.55,
//                 shadowRadius: 12,
//                 shadowOffset: { width: 0, height: 5 },
//                 elevation: 6,
//               }}
//             >
//               <Text
//                 style={{
//                   color: BLACK,
//                   fontWeight: '700',
//                   fontSize: 18,
//                   textAlign: 'center',
//                   letterSpacing: 1.1,
//                 }}
//               >
//                 Close
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { formatDateTime } from '@/utils/formatDate';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Platform,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Color palette constants
// const BLACK = '#000000';
// const ACCENT = '#FAD90E';
// const TEXT_PRIMARY = '#F5F5F5'; // off-white for text
// const TEXT_SECONDARY = '#BFBFBF'; // lighter gray text

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => (
//   <View
//     style={{
//       backgroundColor: BLACK,
//       borderRadius: 16,
//       padding: 20,
//       marginVertical: 10,
//       borderWidth: 1,
//       borderColor: ACCENT,
//       shadowColor: ACCENT,
//       shadowOpacity: 0.4,
//       shadowRadius: 12,
//       shadowOffset: { width: 0, height: 5 },
//       elevation: Platform.OS === 'android' ? 6 : 0,
//     }}
//   >
//     <Text style={{ color: ACCENT, fontSize: 20, fontWeight: '700', marginBottom: 6 }}>
//       Project ID: {order.project_id}
//     </Text>
//     {/* <Text style={{ color: TEXT_SECONDARY, fontSize: 16, marginBottom: 4 }}>
//       Project ID: {order.project_id}
//     </Text> */}
//     {/* <Text style={{ color: TEXT_SECONDARY, fontSize: 16, marginBottom: 4 }}>
//       Status: <Text style={{ color: ACCENT }}>{order.status || 'N/A'}</Text>
//     </Text> */}
//     <Text style={{ color: TEXT_SECONDARY, fontSize: 14, marginBottom: 14 }}>
//       Order Date: <Text style={{ color: TEXT_PRIMARY }}>{formatDateTime(order.order_date)}</Text>
//     </Text>

//     <TouchableOpacity
//       onPress={() => onViewStatus(order)}
//       style={{
//         backgroundColor: ACCENT,
//         paddingVertical: 12,
//         paddingHorizontal: 28,
//         borderRadius: 24,
//         alignSelf: 'flex-start',
//         shadowColor: ACCENT,
//         shadowOpacity: 0.6,
//         shadowRadius: 10,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//       }}
//       activeOpacity={0.85}
//     >
//       <Text style={{ color: BLACK, fontWeight: '700', fontSize: 16, letterSpacing: 0.5 }}>
//         View Status
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// export default function ManageOrdersScreen() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [modalOrderDetails, setModalOrderDetails] = useState<Order | null>(null);
//   const [modalLoading, setModalLoading] = useState(false);

//   // Fetch all orders (paginated)
//   const fetchOrders = useCallback(async () => {
//     try {
//       const response = await api.get<PaginatedResponse<Order>>('/admin/orders/');
//       setOrders(response.data.results);
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//     }
//   }, []);

//   // Initial and manual refresh fetch
//   useEffect(() => {
//     setLoading(true);
//     fetchOrders().finally(() => setLoading(false));
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders().finally(() => setRefreshing(false));
//   }, [fetchOrders]);

//   // Fetch detailed status for selected order when modal opens
//   useEffect(() => {
//     if (!selectedOrder) {
//       setModalOrderDetails(null);
//       setModalLoading(false);
//       return;
//     }
//     setModalLoading(true);
//     api
//       .get<Order>(`/admin/orders/${selectedOrder.order_id}/`)
//       .then(res => setModalOrderDetails(res.data))
//       .catch(error => {
//         console.error('Failed to fetch order details:', error);
//         setModalOrderDetails(null);
//       })
//       .finally(() => setModalLoading(false));
//   }, [selectedOrder]);

//   const handleCloseModal = () => setSelectedOrder(null);

//   return (
//     <View style={{ flex: 1, backgroundColor: BLACK, padding: 20 }}>
//       <Text
//         style={{
//           color: ACCENT,
//           fontSize: 28,
//           fontWeight: '900',
//           letterSpacing: 2,
//           marginBottom: 20,
//           textShadowColor: ACCENT,
//           textShadowOffset: { width: 0, height: 3 },
//           textShadowRadius: 15,
//         }}
//       >
//         Manage Orders
//       </Text>

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={ACCENT} />
//       ) : (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />}
//         >
//           {orders.length === 0 && (
//             <Text style={{ color: TEXT_SECONDARY, textAlign: 'center', fontSize: 16, marginTop: 48 }}>
//               No orders found.
//             </Text>
//           )}

//           {orders.map(order => (
//             <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//           ))}
//         </ScrollView>
//       )}

//       <Modal visible={!!selectedOrder} transparent animationType="slide" onRequestClose={handleCloseModal}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0,0,0,0.85)',
//             paddingHorizontal: 20,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: BLACK,
//               borderRadius: 20,
//               width: '100%',
//               maxWidth: 400,
//               padding: 28,
//               borderWidth: 1,
//               borderColor: ACCENT,
//               shadowColor: ACCENT,
//               shadowOpacity: 0.75,
//               shadowRadius: 16,
//               shadowOffset: { width: 0, height: 8 },
//               elevation: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: '900',
//                 color: ACCENT,
//                 marginBottom: 16,
//                 letterSpacing: 1.3,
//               }}
//             >
//               Order Status
//             </Text>

//             {modalLoading ? (
//               <ActivityIndicator size="large" color={ACCENT} />
//             ) : modalOrderDetails ? (
//               <>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Overall Status: </Text>
//                   {modalOrderDetails.status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Production Status: </Text>
//                   {modalOrderDetails.production_status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Dispatch Status: </Text>
//                   {modalOrderDetails.dispatch_status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 20 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Delivery Status: </Text>
//                   {modalOrderDetails.delivery_status || 'N/A'}
//                 </Text>
//               </>
//             ) : (
//               <Text style={{ color: 'tomato', marginBottom: 20 }}>Failed to load order details.</Text>
//             )}

//             <Pressable
//               onPress={handleCloseModal}
//               style={{
//                 backgroundColor: ACCENT,
//                 paddingVertical: 14,
//                 borderRadius: 28,
//                 shadowColor: ACCENT,
//                 shadowOpacity: 0.55,
//                 shadowRadius: 12,
//                 shadowOffset: { width: 0, height: 5 },
//                 elevation: 6,
//               }}
//             >
//               <Text
//                 style={{
//                   color: BLACK,
//                   fontWeight: '700',
//                   fontSize: 18,
//                   textAlign: 'center',
//                   letterSpacing: 1.1,
//                 }}
//               >
//                 Close
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



//===================Working ====================
// import { FilterSortBar } from '@/components/FilterSortBar'; // Assuming you have a FilterSortBar component
// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { formatDateTime } from '@/utils/formatDate';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const BLACK = '#000000';
// const ACCENT = '#FAD90E';
// const TEXT_PRIMARY = '#F5F5F5';
// const TEXT_SECONDARY = '#BFBFBF';

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => (
//   <View
//     style={{
//       backgroundColor: BLACK,
//       borderRadius: 16,
//       padding: 20,
//       marginVertical: 10,
//       borderWidth: 1,
//       borderColor: ACCENT,
//       shadowColor: ACCENT,
//       shadowOpacity: 0.4,
//       shadowRadius: 12,
//       shadowOffset: { width: 0, height: 5 },
//       elevation: 6,
//     }}
//   >
//     <Text style={{ color: ACCENT, fontSize: 20, fontWeight: '700', marginBottom: 6 }}>
//       Project ID: {order.project_id}
//     </Text>
//     <Text style={{ color: TEXT_SECONDARY, fontSize: 14, marginBottom: 12 }}>
//       Order Date: <Text style={{ color: TEXT_PRIMARY }}>{formatDateTime(order.order_date)}</Text>
//     </Text>
//     <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 2 }}>Status: <Text style={{ color: ACCENT }}>{order.status}</Text></Text>
//     <Text style={{ color: TEXT_PRIMARY, fontSize: 14 }}>
//       Client ID: <Text style={{ color: TEXT_SECONDARY }}>{order.client_id}</Text>
//     </Text>
//     <TouchableOpacity
//       onPress={() => onViewStatus(order)}
//       style={{
//         backgroundColor: ACCENT,
//         paddingVertical: 8,
//         paddingHorizontal: 24,
//         borderRadius: 24,
//         alignSelf: 'flex-start',
//         marginTop: 14,
//         elevation: 4,
//       }}
//       activeOpacity={0.85}
//     >
//       <Text style={{ color: BLACK, fontWeight: '700', fontSize: 15 }}>
//         View Status
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// export default function ManageOrdersScreen() {
//   const [paginated, setPaginated] = useState<PaginatedResponse<Order> | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState('');
//   // const [sort, setSort] = useState<string>('desc');
//   const [sort, setSort] = useState<'desc' | 'asc'>('desc');
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [modalOrderDetails, setModalOrderDetails] = useState<Order | null>(null);
//   const [modalLoading, setModalLoading] = useState(false);

//   const scrollRef = useRef<ScrollView>(null);

//   const fetchOrders = useCallback(async (url?: string) => {
//     setLoading(true);
//     try {
//       const params: any = {};
//       if (search) params.search = search;
//       params.ordering = sort === 'desc' ? '-created_at' : 'created_at';
//       const endpoint = url ?? '/admin/orders/';
//       const response = await api.get<PaginatedResponse<Order>>(endpoint, { params });
//       setPaginated(response.data);
//       setOrders(response.data.results);
//       // Optionally scroll to top on new page/filter
//       scrollRef.current?.scrollTo({ y: 0, animated: true });
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [search, sort]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders();
//   }, [fetchOrders]);

//   // Pagination actions
//   const goNext = () => paginated?.next && fetchOrders(paginated.next);
//   const goPrev = () => paginated?.previous && fetchOrders(paginated.previous);

//   // View status modal logic (unchanged)
//   useEffect(() => {
//     if (!selectedOrder) {
//       setModalOrderDetails(null);
//       setModalLoading(false);
//       return;
//     }
//     setModalLoading(true);
//     api
//       .get<Order>(`/admin/orders/${selectedOrder.order_id}/`)
//       .then(res => setModalOrderDetails(res.data))
//       .catch(error => {
//         console.error('Failed to fetch order details:', error);
//         setModalOrderDetails(null);
//       })
//       .finally(() => setModalLoading(false));
//   }, [selectedOrder]);

//   const handleCloseModal = () => setSelectedOrder(null);

//   return (
//     <View style={{ flex: 1, backgroundColor: BLACK, padding: 20 }}>
//       <Text
//         style={{
//           color: ACCENT,
//           fontSize: 28,
//           fontWeight: '900',
//           letterSpacing: 2,
//           marginBottom: 12,
//         }}
//       >
//         Manage Orders
//       </Text>

//       {/* Filter and Sort UI */}
//       <FilterSortBar
//         search={search}
//         setSearch={setSearch}
//         sort={sort}
//         setSort={setSort}
//         onFilter={() => fetchOrders()}
//       />

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={ACCENT} />
//       ) : (
//         <>
//           <ScrollView
//             ref={scrollRef}
//             showsVerticalScrollIndicator={false}
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT} />}
//           >
//             {orders.length === 0 && (
//               <Text style={{ color: TEXT_SECONDARY, textAlign: 'center', fontSize: 16, marginTop: 48 }}>
//                 No orders found.
//               </Text>
//             )}
//             {orders.map(order => (
//               <OrderCard key={order.project_id} order={order} onViewStatus={setSelectedOrder} />
//             ))}

//             {/* Pagination Buttons */}
//             {paginated && (
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
//                 <TouchableOpacity
//                   disabled={!paginated.previous}
//                   onPress={goPrev}
//                   style={{
//                     opacity: paginated.previous ? 1 : 0.4,
//                     backgroundColor: '#fffde6',
//                     paddingVertical: 8,
//                     paddingHorizontal: 24,
//                     borderRadius: 16,
//                   }}
//                 >
//                   <Text style={{ color: '#333', fontWeight: 'bold' }}>Previous</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   disabled={!paginated.next}
//                   onPress={goNext}
//                   style={{
//                     opacity: paginated.next ? 1 : 0.4,
//                     backgroundColor: '#fffde6',
//                     paddingVertical: 8,
//                     paddingHorizontal: 24,
//                     borderRadius: 16,
//                   }}
//                 >
//                   <Text style={{ color: '#333', fontWeight: 'bold' }}>Next</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </ScrollView>
//         </>
//       )}

//       {/* Modal logic unchanged (same as your version) */}
//       <Modal visible={!!selectedOrder} transparent animationType="slide" onRequestClose={handleCloseModal}>
//         {/* ...modal UI remains as in your code... */}
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0,0,0,0.85)',
//             paddingHorizontal: 20,
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: BLACK,
//               borderRadius: 20,
//               width: '100%',
//               maxWidth: 400,
//               padding: 28,
//               borderWidth: 1,
//               borderColor: ACCENT,
//               shadowColor: ACCENT,
//               shadowOpacity: 0.75,
//               shadowRadius: 16,
//               shadowOffset: { width: 0, height: 8 },
//               elevation: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: '900',
//                 color: ACCENT,
//                 marginBottom: 16,
//                 letterSpacing: 1.3,
//               }}
//             >
//               Order Status
//             </Text>

//             {modalLoading ? (
//               <ActivityIndicator size="large" color={ACCENT} />
//             ) : modalOrderDetails ? (
//               <>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Overall Status: </Text>
//                   {modalOrderDetails.status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Production Status: </Text>
//                   {modalOrderDetails.production_status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 8 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Dispatch Status: </Text>
//                   {modalOrderDetails.dispatch_status || 'N/A'}
//                 </Text>
//                 <Text style={{ color: TEXT_PRIMARY, fontSize: 16, marginBottom: 20 }}>
//                   <Text style={{ color: ACCENT, fontWeight: '700' }}>Delivery Status: </Text>
//                   {modalOrderDetails.delivery_status || 'N/A'}
//                 </Text>
//               </>
//             ) : (
//               <Text style={{ color: 'tomato', marginBottom: 20 }}>Failed to load order details.</Text>
//             )}

//             <Pressable
//               onPress={handleCloseModal}
//               style={{
//                 backgroundColor: ACCENT,
//                 paddingVertical: 14,
//                 borderRadius: 28,
//                 shadowColor: ACCENT,
//                 shadowOpacity: 0.55,
//                 shadowRadius: 12,
//                 shadowOffset: { width: 0, height: 5 },
//                 elevation: 6,
//               }}
//             >
//               <Text
//                 style={{
//                   color: BLACK,
//                   fontWeight: '700',
//                   fontSize: 18,
//                   textAlign: 'center',
//                   letterSpacing: 1.1,
//                 }}
//               >
//                 Close
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }




// import { FilterSortBar } from '@/components/FilterSortBar';
// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { formatDateTime } from '@/utils/formatDate';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Color palette for inline style refs if needed
// const BLACK = '#0F1112';
// const ACCENT = '#FAD90E';
// const TEXT_PRIMARY = '#F5F5F5';
// const TEXT_SECONDARY = '#BFBFBF';

// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// interface OrderCardProps {
//   order: Order;
//   onViewStatus: (order: Order) => void;
// }

// const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => (
//   <View className="bg-[#18181A] rounded-2xl p-6 my-3 border border-[#FAD90E] shadow-lg shadow-[#FAD90E]/20">
//     <Text className="text-[#F5F5F5] text-lg font-bold mb-0.5">
//       Project ID: <Text className="text-[#FAD90E] text-xl font-black">{order.project_id}</Text>
//     </Text>
//     <Text className="text-[#BFBFBF] text-xs mt-0.5 mb-2.5 font-medium">
//       <Text className="text-base">📆</Text> Order Date:{' '}
//       <Text className="text-[#F5F5F5]">{formatDateTime(order.order_date)}</Text>
//     </Text>

//     <View className="flex-row mb-4.5 items-center">
//       <View className="bg-[#FAD90E] rounded-full py-1.5 px-3.5 self-start mr-2">
//         <Text className="text-[#0F1112] font-bold text-xs">Status: {order.status}</Text>
//       </View>
//     </View>

//     <View className="gap-1.5 mt-1 mb-1.5">
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">👤 </Text>
//         Client ID: <Text className="text-[#BFBFBF]">{order.client}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">👤 </Text>
//         Client Name: <Text className="text-[#BFBFBF]">{order.client_name}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">🏭 </Text>
//         Manufacturing Location: <Text className="text-[#BFBFBF]">{order.manufacturing_location}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">🚚 </Text>
//         Dispatch Location: <Text className="text-[#BFBFBF]">{order.dispatch_location}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">📦 </Text>
//         Total Quantity: <Text className="text-[#BFBFBF]">{order.total_quantity}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">🧰 </Text>
//         Kit Count: <Text className="text-[#BFBFBF]">{order.kit_count}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">⏳ </Text>
//         Expected Delivery: <Text className="text-[#BFBFBF]">
//           {order.expected_delivery_date ? formatDateTime(order.expected_delivery_date) : 'N/A'}
//         </Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">📅 </Text>
//         Delivery Date: <Text className="text-[#BFBFBF]">
//           {order.delivery_date ? formatDateTime(order.delivery_date) : 'N/A'}
//         </Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">📝 </Text>
//         PO Date: <Text className="text-[#BFBFBF]">
//           {order.po_date ? formatDateTime(order.po_date) : 'N/A'}
//         </Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">💳 </Text>
//         Payment Received: <Text className="text-[#BFBFBF]">{order.payment_received || 'N/A'}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">💹 </Text>
//         Payment %: <Text className="text-[#BFBFBF]">{order.payment_percentage || 'N/A'}</Text>
//       </Text>
//       <Text className="text-[#F5F5F5] text-base leading-[21px] mr-4">
//         <Text className="text-base">💬 </Text>
//         Remarks: <Text className="text-[#BFBFBF]">{order.remarks || 'N/A'}</Text>
//       </Text>
//     </View>

//     <TouchableOpacity
//       onPress={() => onViewStatus(order)}
//       className="bg-[#FAD90E] py-2.5 px-7 rounded-full self-start mt-4.5 elevation-3"
//       activeOpacity={0.85}
//       accessibilityLabel="View Status"
//     >
//       <Text className="text-[#0F1112] font-bold text-lg tracking-tight">View Status</Text>
//     </TouchableOpacity>
//   </View>
// );

// export default function ManageOrdersScreen() {
//   const [paginated, setPaginated] = useState<PaginatedResponse<Order> | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState<'desc' | 'asc'>('desc');
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [modalOrderDetails, setModalOrderDetails] = useState<Order | null>(null);
//   const [modalLoading, setModalLoading] = useState(false);

//   const scrollRef = useRef<ScrollView>(null);

//   const fetchOrders = useCallback(async (url?: string) => {
//     setLoading(true);
//     try {
//       const params: any = {};
//       if (search) params.search = search;
//       params.ordering = sort === 'desc' ? '-created_at' : 'created_at';
//       const endpoint = url ?? '/admin/orders/';
//       const response = await api.get<PaginatedResponse<Order>>(endpoint, { params });
//       setPaginated(response.data);
//       setOrders(response.data.results);
//       scrollRef.current?.scrollTo({ y: 0, animated: true });
//     } catch (error) {
//       console.error('Failed to fetch orders', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [search, sort]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders();
//   }, [fetchOrders]);

//   const goNext = () => paginated?.next && fetchOrders(paginated.next);
//   const goPrev = () => paginated?.previous && fetchOrders(paginated.previous);

//   useEffect(() => {
//     if (!selectedOrder) {
//       setModalOrderDetails(null);
//       setModalLoading(false);
//       return;
//     }
//     setModalLoading(true);
//     api
//       .get<Order>(`/admin/orders/${selectedOrder.order_id}/`)
//       .then(res => setModalOrderDetails(res.data))
//       .catch(error => {
//         console.error('Failed to fetch order details:', error);
//         setModalOrderDetails(null);
//       })
//       .finally(() => setModalLoading(false));
//   }, [selectedOrder]);

//   const handleCloseModal = () => setSelectedOrder(null);

//   return (
//     <View className="flex-1 bg-[#0F1112] p-5">
//       <Text className="text-[#FAD90E] text-2xl font-bold tracking-widest mb-3.5 text-left">Manage Orders</Text>

//       <FilterSortBar
//         search={search}
//         setSearch={setSearch}
//         sort={sort}
//         setSort={setSort}
//         onFilter={() => fetchOrders()}
//       />

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={ACCENT} style={{ marginTop: 60 }} />
//       ) : (
//         <ScrollView
//           ref={scrollRef}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={ACCENT}
//             />
//           }
//         >
//           {orders.length === 0 ? (
//             <View className="justify-center items-center mt-16">
//               <Text className="text-6xl mb-3">📂</Text>
//               <Text className="text-[#BFBFBF] text-lg">No orders found.</Text>
//             </View>
//           ) : (
//             orders.map(order => (
//               <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
//             ))
//           )}

//           {paginated && (
//             <View className="flex-row justify-between my-6">
//               <TouchableOpacity
//                 disabled={!paginated.previous}
//                 onPress={goPrev}
//                 className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
//                 style={{ opacity: paginated.previous ? 1 : 0.4 }}
//                 accessibilityLabel="Previous Page"
//               >
//                 <Text className="text-[#1c1c1c] font-bold text-base">⟵ Previous</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 disabled={!paginated.next}
//                 onPress={goNext}
//                 className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
//                 style={{ opacity: paginated.next ? 1 : 0.4 }}
//                 accessibilityLabel="Next Page"
//               >
//                 <Text className="text-[#1c1c1c] font-bold text-base">Next ⟶</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </ScrollView>
//       )}

//       {/* Order Detail Modal */}
//       <Modal
//         visible={!!selectedOrder}
//         transparent
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center bg-[rgba(20,20,22,0.93)] px-3.5">
//           <View className="bg-[#0F1112] rounded-3xl w-full max-w-[420px] p-7 border border-[#FAD90E] shadow-2xl shadow-[#FAD90E]/25">
//             <Text className="text-2xl font-black text-[#FAD90E] mb-5 tracking-wide">Order Status</Text>
//             {modalLoading ? (
//               <ActivityIndicator size="large" color={ACCENT} />
//             ) : modalOrderDetails ? (
//               <>
//                 {[
//                   { label: 'Status', value: modalOrderDetails.status },
//                   { label: 'Production Status', value: modalOrderDetails.production_status },
//                   { label: 'Dispatch Status', value: modalOrderDetails.dispatch_status },
//                   { label: 'Delivery Status', value: modalOrderDetails.delivery_status },
//                 ].map(({ label, value }) => {
//                   let color = TEXT_SECONDARY;
//                   const lower = (value || '').toLowerCase();
//                   if (lower === 'pending') color = ACCENT;
//                   else if (['completed', 'delivered', 'shipped'].includes(lower)) color = 'lightgreen';
//                   return (
//                     <View key={label} className="flex-row items-center mb-2.5">
//                       <Text className="text-[#F5F5F5] text-lg font-medium min-w-[160px]">{label}: </Text>
//                       <Text className="text-lg font-semibold" style={{ color }}>{value || 'N/A'}</Text>
//                     </View>
//                   );
//                 })}
//               </>
//             ) : (
//               <Text style={{ color: 'tomato', marginBottom: 20 }}>
//                 Failed to load order details.
//               </Text>
//             )}
//             <Pressable onPress={handleCloseModal} className="bg-[#FAD90E] py-3.5 rounded-full mt-7 elevation-6" accessibilityLabel="Close Modal">
//               <Text className="text-[#0F1112] font-bold text-xl text-center tracking-tight">Close</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }





// import { AdminOrderCard } from "@/components/AdminOrderCard"; // Update import as needed
// import { FilterSortBar } from "@/components/FilterSortBar";
// import { AdminOrder } from "@/types/adminOrder.types";
// import api from "@/utils/api";
// import { useRouter } from "expo-router";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Modal,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const ACCENT = "#FAD90E";
// const TEXT_PRIMARY = "#F5F5F5";
// const TEXT_SECONDARY = "#BFBFBF";

// // Pagination response
// interface PaginatedResponse<T> {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// }

// export default function ManageOrdersScreen() {
//   const [paginated, setPaginated] = useState<PaginatedResponse<AdminOrder> | null>(null);
//   const [orders, setOrders] = useState<AdminOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState<"desc" | "asc">("desc");
//   const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
//   const [modalOrderDetails, setModalOrderDetails] = useState<AdminOrder | null>(null);
//   const [modalLoading, setModalLoading] = useState(false);

//   const router = useRouter();

//   const scrollRef = useRef<ScrollView>(null);

//   const fetchOrders = useCallback(async (url?: string) => {
//     setLoading(true);
//     try {
//       const params: any = {};
//       if (search) params.search = search;
//       params.ordering = sort === "desc" ? "-created_at" : "created_at";
//       const endpoint = url ?? "/admin/orders/";
//       const response = await api.get<PaginatedResponse<AdminOrder>>(endpoint, { params });
//       setPaginated(response.data);
//       setOrders(response.data.results);
//       scrollRef.current?.scrollTo({ y: 0, animated: true });
//     } catch (error) {
//       console.error("Failed to fetch orders", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [search, sort]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchOrders();
//   }, [fetchOrders]);

//   const goNext = () => paginated?.next && fetchOrders(paginated.next);
//   const goPrev = () => paginated?.previous && fetchOrders(paginated.previous);

//   useEffect(() => {
//     if (!selectedOrder) {
//       setModalOrderDetails(null);
//       setModalLoading(false);
//       return;
//     }
//     setModalLoading(true);
//     api
//       .get<AdminOrder>(`/admin/orders/${selectedOrder.order_id}/`)
//       .then((res) => setModalOrderDetails(res.data))
//       .catch((error) => {
//         console.error("Failed to fetch order details:", error);
//         setModalOrderDetails(null);
//       })
//       .finally(() => setModalLoading(false));
//   }, [selectedOrder]);

//   const handleCloseModal = () => setSelectedOrder(null);




//   return (
//     <View className="flex-1 bg-[#0F1112] p-5">
//       {/* Heading + Refresh Button */}
//       <View className="flex-row justify-between items-center mb-3">
//         <Text className="text-[#FAD90E] text-2xl font-bold tracking-widest text-left">
//           Manage Orders
//         </Text>
//         <TouchableOpacity
//           onPress={() => fetchOrders()}
//           className="bg-[#fad90e] px-4 py-2 rounded-xl"
//           accessibilityLabel="Refresh Orders"
//           activeOpacity={0.8}
//           style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}
//         >
//           <Text className="text-[#0f1112] text-base font-bold mr-1">🔄</Text>
//           <Text className="text-[#0f1112] text-base font-bold">Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       <FilterSortBar
//         search={search}
//         setSearch={setSearch}
//         sort={sort}
//         setSort={setSort}
//         onFilter={() => fetchOrders()}
//       />

//       {loading && !refreshing ? (
//         <ActivityIndicator size="large" color={ACCENT} style={{ marginTop: 60 }} />
//       ) : (
//         <ScrollView
//           ref={scrollRef}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={ACCENT}
//             />
//           }
//         >
//           {orders.length === 0 ? (
//             <View className="justify-center items-center mt-16">
//               <Text className="text-6xl mb-3">📂</Text>
//               <Text className="text-[#BFBFBF] text-lg">No orders found.</Text>
//             </View>
//           ) : (
//             orders.map((order) => (
//               <AdminOrderCard
//                 key={order.order_id}
//                 order={order}
//                 onViewDetails={() => router.push({
//                   pathname: "/(adminDashboard)/order-details",
//                   params: { orderId: order.order_id }
//                 })}
//               />
//             ))
//           )}

//           {paginated && (
//             <View className="flex-row justify-between my-6">
//               <TouchableOpacity
//                 disabled={!paginated.previous}
//                 onPress={goPrev}
//                 className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
//                 style={{ opacity: paginated.previous ? 1 : 0.4 }}
//                 accessibilityLabel="Previous Page"
//               >
//                 <Text className="text-[#1c1c1c] font-bold text-base">⟵ Previous</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 disabled={!paginated.next}
//                 onPress={goNext}
//                 className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
//                 style={{ opacity: paginated.next ? 1 : 0.4 }}
//                 accessibilityLabel="Next Page"
//               >
//                 <Text className="text-[#1c1c1c] font-bold text-base">Next ⟶</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </ScrollView>
//       )}

//       {/* Order Detail Modal Preview (Optional—you'll ask for full detail screen later) */}
//       <Modal
//         visible={!!selectedOrder}
//         transparent
//         animationType="slide"
//         onRequestClose={handleCloseModal}
//       >
//         <View className="flex-1 justify-center items-center bg-[rgba(20,20,22,0.93)] px-3.5">
//           <View className="bg-[#0F1112] rounded-3xl w-full max-w-[420px] p-7 border border-[#FAD90E] shadow-2xl shadow-[#FAD90E]/25">
//             <Text className="text-2xl font-black text-[#FAD90E] mb-5 tracking-wide">
//               Order Status
//             </Text>
//             {modalLoading ? (
//               <ActivityIndicator size="large" color={ACCENT} />
//             ) : modalOrderDetails ? (
//               <>
//                 {[
//                   { label: "Status", value: modalOrderDetails.status },
//                   { label: "Production Status", value: modalOrderDetails.production_status },
//                   { label: "Dispatch Status", value: modalOrderDetails.dispatch_status },
//                   { label: "Delivery Status", value: modalOrderDetails.delivery_status },
//                 ].map(({ label, value }) => {
//                   let color = TEXT_SECONDARY;
//                   const lower = (value || "").toLowerCase();
//                   if (lower === "pending") color = ACCENT;
//                   else if (["completed", "delivered", "shipped"].includes(lower)) color = "lightgreen";
//                   return (
//                     <View key={label} className="flex-row items-center mb-2.5">
//                       <Text className="text-[#F5F5F5] text-lg font-medium min-w-[160px]">
//                         {label}:
//                       </Text>
//                       <Text className="text-lg font-semibold" style={{ color }}>
//                         {value || "N/A"}
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </>
//             ) : (
//               <Text style={{ color: "tomato", marginBottom: 20 }}>
//                 Failed to load order details.
//               </Text>
//             )}
//             <Pressable
//               onPress={handleCloseModal}
//               className="bg-[#FAD90E] py-3.5 rounded-full mt-7 elevation-6"
//               accessibilityLabel="Close Modal"
//             >
//               <Text className="text-[#0F1112] font-bold text-xl text-center tracking-tight">
//                 Close
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }



import { AdminOrderCard } from "@/components/AdminOrderCard";
import { FilterSortBar } from "@/components/FilterSortBar";
import { AdminOrder } from "@/types/adminOrder.types";
import api from "@/utils/api";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ACCENT = "#FAD90E";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export default function ManageOrdersScreen() {
  const [paginated, setPaginated] = useState<PaginatedResponse<AdminOrder> | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");

  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const fetchOrders = useCallback(async (url?: string) => {
    setLoading(true);
    try {
      const params: any = {};
      if (search) params.search = search;
      params.ordering = sort === "desc" ? "-created_at" : "created_at";
      const endpoint = url ?? "/admin/orders/";
      const response = await api.get<PaginatedResponse<AdminOrder>>(endpoint, { params });
      setPaginated(response.data);
      setOrders(response.data.results);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, sort]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, [fetchOrders]);

  const goNext = () => paginated?.next && fetchOrders(paginated.next);
  const goPrev = () => paginated?.previous && fetchOrders(paginated.previous);

  return (
    <View className="flex-1 bg-[#0F1112] p-5">
      {/* Heading + Refresh Button */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#FAD90E] text-2xl font-bold tracking-widest text-left">
          Manage Orders
        </Text>
        <TouchableOpacity
          onPress={() => fetchOrders()}
          className="bg-[#fad90e] px-4 py-2 rounded-xl"
          accessibilityLabel="Refresh Orders"
          activeOpacity={0.8}
          style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}
        >
          <Text className="text-[#0f1112] text-base font-bold mr-1">🔄</Text>
          <Text className="text-[#0f1112] text-base font-bold">Refresh</Text>
        </TouchableOpacity>
      </View>

      <FilterSortBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        onFilter={() => fetchOrders()}
      />

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={ACCENT} style={{ marginTop: 60 }} />
      ) : (
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={ACCENT}
            />
          }
        >
          {orders.length === 0 ? (
            <View className="justify-center items-center mt-16">
              <Text className="text-6xl mb-3">📂</Text>
              <Text className="text-[#BFBFBF] text-lg">No orders found.</Text>
            </View>
          ) : (
            orders.map((order) => (
              <AdminOrderCard
                key={order.order_id}
                order={order}
                onViewDetails={() =>
                  router.push({
                    pathname: "/(adminDashboard)/order-details",
                    params: { orderId: order.order_id },
                  })
                }
              />
            ))
          )}

          {paginated && (
            <View className="flex-row justify-between my-6">
              <TouchableOpacity
                disabled={!paginated.previous}
                onPress={goPrev}
                className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
                style={{ opacity: paginated.previous ? 1 : 0.4 }}
                accessibilityLabel="Previous Page"
              >
                <Text className="text-[#1c1c1c] font-bold text-base">⟵ Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!paginated.next}
                onPress={goNext}
                className="bg-[#fffde6] py-2.5 px-7 rounded-xl mx-1.5"
                style={{ opacity: paginated.next ? 1 : 0.4 }}
                accessibilityLabel="Next Page"
              >
                <Text className="text-[#1c1c1c] font-bold text-base">Next ⟶</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
