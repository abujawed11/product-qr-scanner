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



import { Order } from '@/types/order.types'; // Your Order TypeScript interface
import api from '@/utils/api'; // Axios instance for your API calls
import { BACKGROUND_COLOR } from '@/utils/color'; // Assuming this exists
import { formatDateTime } from '@/utils/formatDate'; // Date formatting helper
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface OrderCardProps {
  order: Order;
  onViewStatus: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
  return (
    <View
      className="bg-white rounded-lg p-4 mb-4 shadow-md"
      style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 }}
    >
      <Text className="text-lg font-bold mb-1">Order ID: {order.order_id}</Text>
      <Text className="text-gray-700 mb-1">Project ID: {order.project_id}</Text>
      <Text className="text-gray-700 mb-1">Status: {order.status || 'N/A'}</Text>
      <Text className="text-gray-700 mb-2">Order Date: {formatDateTime(order.order_date)}</Text>

      <TouchableOpacity
        onPress={() => onViewStatus(order)}
        className="bg-blue-600 px-3 py-2 rounded-md self-start"
      >
        <Text className="text-white font-semibold">View Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ManageOrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get<PaginatedResponse<Order>>('/admin/orders/'); // Adjust URL as needed
      setOrders(response.data.results);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrders().finally(() => setLoading(false));
  }, [fetchOrders]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders().finally(() => setRefreshing(false));
  }, [fetchOrders]);

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Manage Orders</Text>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={BACKGROUND_COLOR} />
          }
        >
          {orders.length === 0 && (
            <Text className="text-center text-gray-500 mt-8">No orders found.</Text>
          )}

          {orders.map(order => (
            <OrderCard key={order.order_id} order={order} onViewStatus={setSelectedOrder} />
          ))}
        </ScrollView>
      )}

      <Modal
        visible={!!selectedOrder}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-4">
          <View className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
            <Text className="text-xl font-bold mb-2">Order Status</Text>

            <Text>
              <Text className="font-semibold">Overall Status:</Text> {selectedOrder?.status || 'N/A'}
            </Text>
            <Text>
              <Text className="font-semibold">Production Status:</Text>{' '}
              {selectedOrder?.production_status || 'N/A'}
            </Text>
            <Text>
              <Text className="font-semibold">Dispatch Status:</Text>{' '}
              {selectedOrder?.dispatch_status || 'N/A'}
            </Text>
            <Text>
              <Text className="font-semibold">Delivery Status:</Text>{' '}
              {selectedOrder?.delivery_status || 'N/A'}
            </Text>

            <Pressable
              onPress={handleCloseModal}
              className="bg-blue-600 rounded-md py-2 mt-4"
            >
              <Text className="text-white text-center font-semibold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
