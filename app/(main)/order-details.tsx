// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';

// interface KitItem {
//     quantity: number;
//     unitPrice: number;
//     totalPrice: number;
// }

// interface OrderDetailsResponse {
//     customer: {
//         customerId: string;
//         name: string;
//         phone: string;
//         email: string;
//         address: string;
//     };
//     order: {
//         orderId: string;
//         orderDate: string;
//         status: string;
//         manufacturingLocation: string;
//         dispatchLocation: string;
//         expectedDeliveryDate: string;
//         deliveryDate: string | null;
//         remarks: string;
//     };
//     kit: {
//         kitId: string;
//         tiltAngle: number;
//         clearance: number;
//         configuration: string;
//         numPanels: number;
//         region: string;
//         price: number;
//     };
//     orderItem: KitItem[];
// }

// export default function OrderDetailsScreen() {
//     const { customerId, orderId, kitId, locationId } = useLocalSearchParams<{
//         customerId: string;
//         orderId: string;
//         kitId: string;
//         locationId?: string;
//     }>();

//     const [data, setData] = useState<OrderDetailsResponse | null>(null);
//     const [loading, setLoading] = useState(true);


//     useFocusEffect(() => {
//         const onBackPress = () => {
//             router.replace('/(main)/dashboard');
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//         return () => sub.remove();
//     });

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const res = await api.post<OrderDetailsResponse>(
//                     '/order-details/',
//                     {
//                         customerId,
//                         orderId,
//                         kitId,
//                         locationId,
//                     }
//                 );
//                 setData(res.data);
//             } catch (error) {
//                 console.error('Failed to fetch order details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, [customerId, orderId, kitId, locationId]);

//     if (loading) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//                 <Text className="text-white mt-4">Loading order details...</Text>
//             </View>
//         );
//     }

//     if (!data) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white">No order details found.</Text>
//             </View>
//         );
//     }

//     const { customer, order, kit, orderItem } = data;

//     return (
//         <ScrollView className="flex-1 bg-black px-4 py-6">
//             <Text className="text-2xl font-bold text-center mb-6" style={{ color: BACKGROUND_COLOR }}>
//                 Order Details
//             </Text>

//             {/* Customer Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Customer</Text>
//                 <Text className="text-white">Name: {customer.name}</Text>
//                 <Text className="text-white">Phone: {customer.phone}</Text>
//                 <Text className="text-white">Email: {customer.email}</Text>
//                 <Text className="text-white">Address: {customer.address}</Text>
//             </View>

//             {/* Order Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Order</Text>
//                 <Text className="text-white">Order ID: {order.orderId}</Text>
//                 <Text className="text-white">Status: {order.status}</Text>
//                 <Text className="text-white">Manufacturing: {order.manufacturingLocation}</Text>
//                 <Text className="text-white">Dispatch: {order.dispatchLocation}</Text>
//                 <Text className="text-white">Order Date: {order.orderDate}</Text>
//                 <Text className="text-white">Expected Delivery: {order.expectedDeliveryDate}</Text>
//                 {order.deliveryDate && (
//                     <Text className="text-white">Delivered On: {order.deliveryDate}</Text>
//                 )}
//                 {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//             </View>

//             {/* Kit Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Kit Details</Text>
//                 <Text className="text-white">Kit ID: {kit.kitId}</Text>
//                 <Text className="text-white">Configuration: {kit.configuration}</Text>
//                 <Text className="text-white">Tilt Angle: {kit.tiltAngle}°</Text>
//                 <Text className="text-white">Clearance: {kit.clearance}m</Text>
//                 <Text className="text-white">Panels: {kit.numPanels}</Text>
//                 <Text className="text-white">Region: {kit.region}</Text>
//                 <Text className="text-white">Price: ₹{kit.price}</Text>
//             </View>

//             {/* Order Item Info */}
//             <View className="mb-10">
//                 <Text className="text-lg font-semibold text-white">Ordered Kits</Text>
//                 {orderItem.map((item, index) => (
//                     <View key={index} className="mt-2 border border-white/20 p-3 rounded-md">
//                         <Text className="text-white">Quantity: {item.quantity}</Text>
//                         <Text className="text-white">Unit Price: ₹{item.unitPrice}</Text>
//                         <Text className="text-white">Total Price: ₹{item.totalPrice}</Text>
//                     </View>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// }


// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     BackHandler,
//     ScrollView,
//     Text,
//     View,
// } from 'react-native';

// interface Kit {
//     kitId: string;
//     tiltAngle: number;
//     clearance: number;
//     configuration: string;
//     numPanels: number;
//     region: string;
//     price: number;
// }

// interface OrderItem {
//     quantity: number;
//     unitPrice: number;
//     totalPrice: number;
//     kit: Kit;
// }

// interface OrderDetailsResponse {
//     customer: {
//         customerId: string;
//         name: string;
//         phone: string;
//         email: string;
//         address: string;
//     };
//     order: {
//         orderId: string;
//         orderDate: string;
//         status: string;
//         manufacturingLocation: string;
//         dispatchLocation: string;
//         expectedDeliveryDate: string;
//         deliveryDate: string | null;
//         remarks: string;
//     };
//     orderItem: OrderItem[];
// }

// export default function OrderDetailsScreen() {
//     const { customerId, orderId, locationId } = useLocalSearchParams<{
//         customerId: string;
//         orderId: string;
//         locationId?: string;
//     }>();

//     const [data, setData] = useState<OrderDetailsResponse | null>(null);
//     const [loading, setLoading] = useState(true);

//     useFocusEffect(() => {
//         const onBackPress = () => {
//             router.replace('/(main)/dashboard');
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//         return () => sub.remove();
//     });

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 console.log(`jFetching order details for customerId: ${customerId}, orderId: ${orderId}, locationId: ${locationId}`);
//                 // const res = await api.get<OrderDetailsResponse>(`/saved-orders/${customerId}/`, {
//                 //   customerId,
//                 //   orderId,
//                 //   locationId,
//                 // });
//                 const response = await api.get(`/saved-orders/${customerId}/`);

//                 setData(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch order details:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, [customerId, orderId, locationId]);

//     if (loading) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//                 <Text className="text-white mt-4">Loading order details...</Text>
//             </View>
//         );
//     }

//     if (!data) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white">No order details found.</Text>
//             </View>
//         );
//     }

//     const { customer, order, orderItem } = data;
//     const orderItemList = data?.orderItem ?? [];
//     // const totalPrice = orderItemList.reduce((sum, item) => sum + item.totalPrice, 0);

//     const totalPrice = orderItem.reduce((sum, item) => sum + item.totalPrice, 0);

//     return (
//         <ScrollView className="flex-1 bg-black px-4 py-6">
//             <Text
//                 className="text-2xl font-bold text-center mb-6"
//                 style={{ color: BACKGROUND_COLOR }}
//             >
//                 Order Details
//             </Text>

//             {/* Customer Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Customer</Text>
//                 <Text className="text-white">Name: {customer.name}</Text>
//                 <Text className="text-white">Phone: {customer.phone}</Text>
//                 <Text className="text-white">Email: {customer.email}</Text>
//                 <Text className="text-white">Address: {customer.address}</Text>
//             </View>

//             {/* Order Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Order</Text>
//                 <Text className="text-white">Order ID: {order.orderId}</Text>
//                 <Text className="text-white">Status: {order.status}</Text>
//                 <Text className="text-white">Manufacturing: {order.manufacturingLocation}</Text>
//                 <Text className="text-white">Dispatch: {order.dispatchLocation}</Text>
//                 <Text className="text-white">Order Date: {order.orderDate}</Text>
//                 <Text className="text-white">Expected Delivery: {order.expectedDeliveryDate}</Text>
//                 {order.deliveryDate && (
//                     <Text className="text-white">Delivered On: {order.deliveryDate}</Text>
//                 )}
//                 {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//             </View>

//             {/* Ordered Kits Info */}
//             <View className="mb-10">
//                 <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>
//                 {/* //{orderItem.map((item, index) => (
//                     // <View key={index} className="mb-4 p-3 border border-white/20 rounded-md">
//                     //     <Text className="text-white font-semibold mb-1">
//                     //         Kit {index + 1}: {item.kit.configuration}
//                     //     </Text>
//                     //     <Text className="text-white">Kit ID: {item.kit.kitId}</Text>
//                     //     <Text className="text-white">Tilt Angle: {item.kit.tiltAngle}°</Text>
//                     //     <Text className="text-white">Clearance: {item.kit.clearance}m</Text>
//                     //     <Text className="text-white">Panels: {item.kit.numPanels}</Text>
//                     //     <Text className="text-white">Region: {item.kit.region}</Text>
//                     //     <Text className="text-white">Unit Price: ₹{item.unitPrice}</Text>
//                     //     <Text className="text-white">Quantity: {item.quantity}</Text>
//                     //     <Text className="text-white font-semibold">
//                     //         Total for Kit {index + 1}: ₹{item.totalPrice}
//                     //     </Text>
//                     // </View>
//                 // ))} */}

//                 {orderItemList.map((item, index) => (
//                     <View key={index} className="mt-2 border border-white/20 p-3 rounded-md">
//                         <Text className="text-white">Quantity: {item.quantity}</Text>
//                         <Text className="text-white">Unit Price: ₹{item.unitPrice}</Text>
//                         <Text className="text-white">Total Price: ₹{item.totalPrice}</Text>
//                     </View>
//                 ))}

//                 {/* Total price */}
//                 <View className="mt-4 border-t border-white/30 pt-3">
//                     {/* <Text className="text-xl font-bold text-white text-center">
//                         Grand Total: ₹{totalPrice}
//                     </Text> */}
//                     <Text className="text-white font-bold text-lg mt-4 text-right">
//                         Total Price: ₹{totalPrice.toFixed(2)}
//                     </Text>

//                 </View>
//             </View>
//         </ScrollView>
//     );
// }

// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     BackHandler,
//     ScrollView,
//     Text,
//     View,
// } from 'react-native';

// interface Kit {
//     id: string;
//     tilt_angle: number;
//     clearance: number;
//     configuration: string;
//     num_panels: number;
//     region: string;
//     price: string; // returned as string
// }

// interface Order {
//     id: string;
//     status: string;
//     order_date: string;
//     expected_delivery: string;
//     delivery_date: string | null;
//     remarks: string;
//     manufacturing_location: string;
//     dispatch_location: string;
// }

// interface Customer {
//     id: string;
//     name: string;
//     phone: string;
//     email: string;
//     address: string;
// }

// interface SavedOrderItem {
//     saved_order_id: number;
//     scanned_at: string;
//     location_id: string;
//     customer: Customer;
//     order: Order;
//     kit: Kit;
//     quantity: number;
//     unit_price: string;   // string from API
//     total_price: string;  // string from API
// }

// export default function OrderDetailsScreen() {
//     const { customerId } = useLocalSearchParams<{ customerId: string }>();

//     const [data, setData] = useState<SavedOrderItem[] | null>(null);
//     const [loading, setLoading] = useState(true);

//     useFocusEffect(() => {
//         const onBackPress = () => {
//             router.replace('/(main)/dashboard');
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//         return () => sub.remove();
//     });

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const res = await api.get<SavedOrderItem[]>(`/saved-orders/${customerId}/`);
//                 setData(res.data);
//             } catch (error) {
//                 console.error('Failed to fetch saved orders:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDetails();
//     }, [customerId]);

//     if (loading) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//                 <Text className="text-white mt-4">Loading order details...</Text>
//             </View>
//         );
//     }

//     if (!data || data.length === 0) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white">No saved orders found.</Text>
//             </View>
//         );
//     }

//     const customer = data[0].customer;
//     const order = data[0].order;

//     const totalPrice = data.reduce(
//         (sum, item) => sum + parseFloat(item.total_price),
//         0
//     );

//     return (
//         <ScrollView className="flex-1 bg-black px-4 py-6">
//             <Text
//                 className="text-2xl font-bold text-center mb-6"
//                 style={{ color: BACKGROUND_COLOR }}
//             >
//                 Order Details
//             </Text>

//             {/* Customer Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Customer</Text>
//                 <Text className="text-white">Name: {customer.name}</Text>
//                 <Text className="text-white">Phone: {customer.phone}</Text>
//                 <Text className="text-white">Email: {customer.email}</Text>
//                 <Text className="text-white">Address: {customer.address}</Text>
//             </View>

//             {/* Order Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Order</Text>
//                 <Text className="text-white">Order ID: {order.id}</Text>
//                 <Text className="text-white">Status: {order.status}</Text>
//                 <Text className="text-white">Manufacturing: {order.manufacturing_location}</Text>
//                 <Text className="text-white">Dispatch: {order.dispatch_location}</Text>
//                 <Text className="text-white">Order Date: {order.order_date}</Text>
//                 <Text className="text-white">Expected Delivery: {order.expected_delivery}</Text>
//                 {order.delivery_date && (
//                     <Text className="text-white">Delivered On: {order.delivery_date}</Text>
//                 )}
//                 {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//             </View>

//             {/* Kits Info */}
//             <View className="mb-10">
//                 <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>

//                 {data.map((item, index) => (
//                     <View key={index} className="mb-4 p-3 border border-white/20 rounded-md">
//                         <Text className="text-white font-semibold mb-1">
//                             Kit {index + 1}: {item.kit.configuration}
//                         </Text>
//                         <Text className="text-white">Kit ID: {item.kit.id}</Text>
//                         <Text className="text-white">Tilt Angle: {item.kit.tilt_angle}°</Text>
//                         <Text className="text-white">Clearance: {item.kit.clearance}m</Text>
//                         <Text className="text-white">Panels: {item.kit.num_panels}</Text>
//                         <Text className="text-white">Region: {item.kit.region}</Text>
//                         <Text className="text-white">Unit Price: ₹{item.unit_price}</Text>
//                         <Text className="text-white">Quantity: {item.quantity}</Text>
//                         <Text className="text-white font-semibold">
//                             Total for Kit {index + 1}: ₹{item.total_price}
//                         </Text>
//                     </View>
//                 ))}

//                 {/* Total price */}
//                 <View className="mt-4 border-t border-white/30 pt-3">
//                     <Text className="text-white font-bold text-lg mt-4 text-right">
//                         Total Price: ₹{totalPrice.toFixed(2)}
//                     </Text>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }


// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     BackHandler,
//     ScrollView,
//     Text,
//     View,
// } from 'react-native';

// interface KitSummaryItem {
//     kit_id: string;
//     quantity: number;
//     unit_price: string;
//     total_price: string;
// }

// interface Order {
//     id: string;
//     status: string;
//     order_date: string;
//     expected_delivery: string;
//     delivery_date: string | null;
//     remarks: string;
//     manufacturing_location: string;
//     dispatch_location: string;
// }

// interface Customer {
//     id: string;
//     name: string;
//     phone: string;
//     email: string;
//     address: string;
// }

// interface SavedOrderItem {
//     saved_order_id: string; // this is qr_id
//     scanned_at: string;
//     location_id: string;
//     customer: Customer;
//     order: Order;
//     kit_summary: KitSummaryItem[];
// }

// export default function OrderDetailsScreen() {
//     const { customerId } = useLocalSearchParams<{ customerId: string }>();

//     const [data, setData] = useState<SavedOrderItem[] | null>(null);
//     const [loading, setLoading] = useState(true);
//     const { orderId } = useLocalSearchParams<{ orderId: string }>();

//     useFocusEffect(() => {
//         const onBackPress = () => {
//             router.replace('/(main)/dashboard');
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//         return () => sub.remove();
//     });

//     // useEffect(() => {
//     //     const fetchDetails = async () => {
//     //         try {
//     //             const res = await api.get<SavedOrderItem[]>(`/saved-orders/${customerId}/`);
//     //             setData(res.data);
//     //         } catch (error) {
//     //             console.error('Failed to fetch saved orders:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchDetails();
//     // }, [customerId]);

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 console.log(`Fetching order details for orderId: ${orderId}`);
//                 const res = await api.get<SavedOrderItem>(`/orders/${orderId}/`);
//                 console.log('API response:', res.data);
//                 setData([res.data]); // assuming response is single object
//             } catch (error) {
//                 console.error('Failed to fetch order by ID:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (orderId) {
//             fetchDetails();
//         }
//     }, [orderId]);


//     if (loading) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//                 <Text className="text-white mt-4">Loading order details...</Text>
//             </View>
//         );
//     }

//     if (!data || data.length === 0) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white">No saved orders found.</Text>
//             </View>
//         );
//     }

//     const saved = data[0]; // Only one row per order now
//     const { customer, order, kit_summary } = saved;

//     const totalPrice = kit_summary.reduce(
//         (sum, kit) => sum + parseFloat(kit.total_price),
//         0
//     );

//     return (
//         <ScrollView className="flex-1 bg-black px-4 py-6">
//             <Text
//                 className="text-2xl font-bold text-center mb-6"
//                 style={{ color: BACKGROUND_COLOR }}
//             >
//                 Order Details
//             </Text>

//             {/* Customer Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Customer</Text>
//                 <Text className="text-white">Name: {customer.name}</Text>
//                 <Text className="text-white">Phone: {customer.phone}</Text>
//                 <Text className="text-white">Email: {customer.email}</Text>
//                 <Text className="text-white">Address: {customer.address}</Text>
//             </View>

//             {/* Order Info */}
//             <View className="mb-6">
//                 <Text className="text-lg font-semibold text-white">Order</Text>
//                 <Text className="text-white">Order ID: {order.id}</Text>
//                 <Text className="text-white">Status: {order.status}</Text>
//                 <Text className="text-white">Manufacturing: {order.manufacturing_location}</Text>
//                 <Text className="text-white">Dispatch: {order.dispatch_location}</Text>
//                 <Text className="text-white">Order Date: {order.order_date}</Text>
//                 <Text className="text-white">Expected Delivery: {order.expected_delivery}</Text>
//                 {order.delivery_date && (
//                     <Text className="text-white">Delivered On: {order.delivery_date}</Text>
//                 )}
//                 {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//             </View>

//             {/* Kits Info */}
//             <View className="mb-10">
//                 <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>

//                 {kit_summary.map((kit, index) => (
//                     <View key={index} className="mb-4 p-3 border border-white/20 rounded-md">
//                         <Text className="text-white font-semibold mb-1">Kit {index + 1}</Text>
//                         <Text className="text-white">Kit ID: {kit.kit_id}</Text>
//                         <Text className="text-white">Quantity: {kit.quantity}</Text>
//                         <Text className="text-white">Unit Price: ₹{kit.unit_price}</Text>
//                         <Text className="text-white font-semibold">
//                             Total for Kit {index + 1}: ₹{kit.total_price}
//                         </Text>
//                     </View>
//                 ))}

//                 {/* Total price */}
//                 <View className="mt-4 border-t border-white/30 pt-3">
//                     <Text className="text-white font-bold text-lg mt-4 text-right">
//                         Total Price: ₹{totalPrice.toFixed(2)}
//                     </Text>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }


// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { formatDateTime } from '@/utils/formatDate';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   BackHandler,
//   ScrollView,
//   Text,
//   View,
// } from 'react-native';

// // Interfaces
// interface OrderItem {
//   id: string;
//   quantity: number;
//   unit_price: string;
//   total_price: string;
//   kit: {
//     kit_id: string;
//     configuration: string;
//     num_panels: number;
//     tilt_angle: number;
//     region: string;
//   };
// }

// interface OrderDetail {
//   order_id: string;
//   customer: string; // Only ID is returned
//   order_date: string;
//   status: string;
//   manufacturing_location: string;
//   dispatch_location: string;
//   expected_delivery_date: string | null;
//   delivery_date: string | null;
//   remarks: string | null;
//   items: OrderItem[];
//   total_quantity: number;
//   kit_count: number;
// }

// export default function OrderDetailsScreen() {
//   const { orderId } = useLocalSearchParams<{ orderId: string }>();

//   const [order, setOrder] = useState<OrderDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       router.replace('/(main)/all-orders');
//       return true;
//     };
//     const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => sub.remove();
//   });

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await api.get<OrderDetail>(`/orders/${orderId}/`);
//         setOrder(res.data);
//       } catch (error) {
//         console.error('Failed to fetch order by ID:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchDetails();
//     }
//   }, [orderId]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-4">Loading order details...</Text>
//       </View>
//     );
//   }

//   if (!order) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-white">No order found.</Text>
//       </View>
//     );
//   }

//   const totalPrice = order.items.reduce(
//     (sum, item) => sum + parseFloat(item.total_price),
//     0
//   );

//   return (
//     <ScrollView className="flex-1 bg-black px-4 py-6">
//       <Text
//         className="text-2xl font-bold text-center mb-6"
//         style={{ color: BACKGROUND_COLOR }}
//       >
//         Order Details
//       </Text>

//       {/* Order Info */}
//       <View className="mb-6">
//         <Text className="text-lg font-semibold text-white mb-2">Order Info</Text>
//         <Text className="text-white">Order ID: {order.order_id}</Text>
//         {/* <Text className="text-white">Client ID: {order}</Text> */}
//         <Text className="text-white">Status: {order.status}</Text>
//         {/* <Text className="text-white">Order Date: {new Date(order.order_date).toDateString()}</Text> */}
//          <Text className="text-white">Order Date: {formatDateTime(order.order_date)}</Text>
//         <Text className="text-white">Manufacturing: {order.manufacturing_location}</Text>
//         <Text className="text-white">Dispatch: {order.dispatch_location}</Text>
//         {order.expected_delivery_date && (
//           <Text className="text-white">Expected Delivery: {new Date(order.expected_delivery_date).toDateString()}</Text>
//         )}
//         {order.delivery_date && (
//           <Text className="text-white">Delivered On: {new Date(order.delivery_date).toDateString()}</Text>
//         )}
//         {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//       </View>

//       {/* Items Info */}
//       <View className="mb-10">
//         <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>

//         {order.items.map((item, index) => (
//           <View key={item.id} className="mb-4 p-3 border border-white/20 rounded-md">
//             <Text className="text-white font-semibold mb-1">Kit {index + 1}</Text>
//             <Text className="text-white">Kit ID: {item.kit.kit_id}</Text>
//             <Text className="text-white">Config: {item.kit.configuration}</Text>
//             <Text className="text-white">Panels: {item.kit.num_panels}</Text>
//             <Text className="text-white">Tilt: {item.kit.tilt_angle}°</Text>
//             <Text className="text-white">Region: {item.kit.region}</Text>
//             <Text className="text-white">Quantity: {item.quantity}</Text>
//             <Text className="text-white">Unit Price: ₹{item.unit_price}</Text>
//             <Text className="text-white font-semibold">
//               Total: ₹{item.total_price}
//             </Text>
//           </View>
//         ))}

//         {/* Total Price */}
//         <View className="mt-4 border-t border-white/30 pt-3">
//           <Text className="text-white font-bold text-lg text-right">
//             Total Price: ₹{totalPrice.toFixed(2)}
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }



// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { formatDateTime } from '@/utils/formatDate';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   BackHandler,
//   ScrollView,
//   Text,
//   View,
// } from 'react-native';

// // Interfaces
// interface OrderItem {
//   id: string;
//   quantity: number;
//   kit: {
//     kit_id: string;
//     configuration: string;
//     num_panels: number;
//     tilt_angle: number;
//     region: string;
//   };
// }

// export default function OrderDetailsScreen() {
//   // Accept order_id as param
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       router.replace('/(main)/all-orders');
//       return true;
//     };
//     const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => sub.remove();
//   });

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await api.get<Order>(`/orders/${order_id}/`);
//         setOrder(res.data);
//       } catch (error) {
//         console.error('Failed to fetch order by ID:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (order_id) {
//       fetchDetails();
//     }
//   }, [order_id]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-4">Loading order details...</Text>
//       </View>
//     );
//   }

//   if (!order) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-white">No order found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-black px-4 py-6">
//       <Text
//         className="text-2xl font-bold text-center mb-6"
//         style={{ color: BACKGROUND_COLOR }}
//       >
//         Order Details
//       </Text>

//       {/* Order Info */}
//       <View className="mb-6">
//         <Text className="text-lg font-semibold text-white mb-2">Order Info</Text>
//         <Text className="text-white">Project ID: {order.project_id}</Text>
//         {/* <Text className="text-white">Client ID: {order.customer}</Text> */}
//         <Text className="text-white">Status: {order.status}</Text>
//         <Text className="text-white">Order Date: {formatDateTime(order.order_date)}</Text>
//         {order.expected_delivery_date && (
//           <Text className="text-white">Expected Delivery: {new Date(order.expected_delivery_date).toDateString()}</Text>
//         )}
//         {order.delivery_date && (
//           <Text className="text-white">Delivered On: {new Date(order.delivery_date).toDateString()}</Text>
//         )}
//         {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//       </View>

//       {/* Items Info */}
//       <View className="mb-10">
//         <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>
//         {order.items.map((item, index) => (
//           <View key={item.id} className="mb-4 p-3 border border-white/20 rounded-md">
//             <Text className="text-white font-semibold mb-1">Kit {index + 1}</Text>
//             <Text className="text-white">Kit ID: {item.kit.kit_id}</Text>
//             <Text className="text-white">Config: {item.kit.configuration}</Text>
//             <Text className="text-white">Panels: {item.kit.num_panels}</Text>
//             <Text className="text-white">Tilt: {item.kit.tilt_angle}°</Text>
//             <Text className="text-white">Region: {item.kit.region}</Text>
//             <Text className="text-white">Quantity: {item.quantity}</Text>
//             {/* Unit Price and Total Price removed */}
//           </View>
//         ))}

//         {/* Pricing/Total Price section removed */}
//       </View>
//     </ScrollView>
//   );
// }


// import { Order } from '@/types/order.types';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import { formatDateTime } from '@/utils/formatDate';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   BackHandler,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Interfaces
// interface OrderItem {
//   id: string;
//   quantity: number;
//   kit: {
//     kit_id: string;
//     configuration: string;
//     num_panels: number;
//     tilt_angle: number;
//     region: string;
//   };
// }

// export default function OrderDetailsScreen() {
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Track which group is expanded (kit_id => bool)
//   const [expandedGroups, setExpandedGroups] = useState<{ [kitId: string]: boolean }>({});

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       router.replace('/(main)/all-orders');
//       return true;
//     };
//     const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => sub.remove();
//   });

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await api.get<Order>(`/orders/${order_id}/`);
//         setOrder(res.data);
//       } catch (error) {
//         console.error('Failed to fetch order by ID:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (order_id) {
//       fetchDetails();
//     }
//   }, [order_id]);

//   // Group order items by kit_id
//   let groupedKitsArray: {
//     kit: OrderItem['kit'];
//     kit_id: string;
//     totalQuantity: number;
//     rows: OrderItem[];
//   }[] = [];

//   if (order) {
//     const groupedKits: {
//       [kitId: string]: {
//         kit: OrderItem['kit'];
//         totalQuantity: number;
//         rows: OrderItem[];
//       };
//     } = {};
//     order.items.forEach(item => {
//       const kitId = item.kit.kit_id;
//       if (!groupedKits[kitId]) {
//         groupedKits[kitId] = {
//           kit: item.kit,
//           totalQuantity: 0,
//           rows: [],
//         };
//       }
//       groupedKits[kitId].totalQuantity += item.quantity;
//       groupedKits[kitId].rows.push(item);
//     });
//     groupedKitsArray = Object.entries(groupedKits).map(([kit_id, group]) => ({
//       ...group,
//       kit_id,
//     }));
//   }

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
//         <Text className="text-white mt-4">Loading order details...</Text>
//       </View>
//     );
//   }

//   if (!order) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-white">No order found.</Text>
//       </View>
//     );
//   }

//   const handleToggleGroup = (kit_id: string) => {
//     setExpandedGroups(prev => ({
//       ...prev,
//       [kit_id]: !prev[kit_id],
//     }));
//   };

//   return (
//     <ScrollView className="flex-1 bg-black px-4 py-6">
//       <Text
//         className="text-2xl font-bold text-center mb-6"
//         style={{ color: BACKGROUND_COLOR }}
//       >
//         Order Details
//       </Text>

//       {/* Order Info */}
//       <View className="mb-6">
//         <Text className="text-lg font-semibold text-white mb-2">Order Info</Text>
//         <Text className="text-white">Project ID: {order.project_id}</Text>
//         <Text className="text-white">Status: {order.status}</Text>
//         <Text className="text-white">Order Date: {formatDateTime(order.order_date)}</Text>
//         {order.expected_delivery_date && (
//           <Text className="text-white">Expected Delivery: {new Date(order.expected_delivery_date).toDateString()}</Text>
//         )}
//         {order.delivery_date && (
//           <Text className="text-white">Delivered On: {new Date(order.delivery_date).toDateString()}</Text>
//         )}
//         {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
//       </View>

//       {/* Ordered Kits - Expandable Groups */}
//       <View className="mb-10">
//         <Text className="text-lg font-semibold text-white mb-2">
//           Ordered Kits (Grouped by Kit)
//         </Text>
//         {groupedKitsArray.map((group, idx) => (
//           <View key={group.kit.kit_id} className="mb-4 border border-white/20 rounded-md">
//             {/* Summary Row with expand/collapse */}
//             <TouchableOpacity
//               className="flex-row justify-between items-center p-3"
//               onPress={() => handleToggleGroup(group.kit.kit_id)}
//               activeOpacity={0.8}
//             >
//               <View>
//                 <Text className="text-white font-semibold">
//                   Kit {idx + 1} (Kit ID: {group.kit.kit_id})
//                 </Text>
//                 <Text className="text-white text-sm">
//                   Config: {group.kit.configuration}
//                 </Text>
//                 <Text className="text-white text-sm">
//                   Panels: {group.kit.num_panels} | Tilt: {group.kit.tilt_angle}° | Region: {group.kit.region}
//                 </Text>
//                 <Text className="text-white font-bold mt-1">Total Quantity: {group.totalQuantity}</Text>
//               </View>
//               <Text className="text-2xl text-white pl-2">
//                 {expandedGroups[group.kit.kit_id] ? '−' : '+'}
//               </Text>
//             </TouchableOpacity>
//             {/* Expanded details */}
//             {expandedGroups[group.kit.kit_id] && (
//               <View className="bg-white/5 px-4 pb-3">
//                 {group.rows.map((item, subIdx) => (
//                   <View key={item.id} className="border-t border-white/10 py-2">
//                     <Text className="text-white text-sm">
//                       Kit Line {subIdx + 1}
//                     </Text>
//                     <Text className="text-white text-xs">
//                       Quantity: {item.quantity}
//                     </Text>
//                     {/* Any additional per-line details go here */}
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }



import { Order } from '@/types/order.types';
import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { formatDateTime } from '@/utils/formatDate';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Interfaces
interface OrderItem {
  id: string;
  quantity: number;
  kit: {
    kit_id: string;
    configuration: string;
    num_panels: number;
    tilt_angle: number;
    region: string;
    clearance: number; // Added clearance
  };
}

export default function OrderDetailsScreen() {
  const { order_id } = useLocalSearchParams<{ order_id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Track which group is expanded (kit_id => bool)
  const [expandedGroups, setExpandedGroups] = useState<{ [kitId: string]: boolean }>({});

  useFocusEffect(() => {
    const onBackPress = () => {
      router.replace('/(main)/all-orders');
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get<Order>(`/orders/${order_id}/`);
        setOrder(res.data);
      } catch (error) {
        console.error('Failed to fetch order by ID:', error);
      } finally {
        setLoading(false);
      }
    };
    if (order_id) {
      fetchDetails();
    }
  }, [order_id]);

  // -- Group by kit_id --
  let groupedKitsArray: {
    kit: OrderItem['kit'];
    kit_id: string;
    totalQuantity: number;
    rows: OrderItem[];
  }[] = [];

  if (order) {
    const groupedKits: {
      [kitId: string]: {
        kit: OrderItem['kit'];
        totalQuantity: number;
        rows: OrderItem[];
      };
    } = {};
    order.items.forEach(item => {
      const kitId = item.kit.kit_id;
      if (!groupedKits[kitId]) {
        groupedKits[kitId] = {
          kit: item.kit,
          totalQuantity: 0,
          rows: [],
        };
      }
      groupedKits[kitId].totalQuantity += item.quantity;
      groupedKits[kitId].rows.push(item);
    });
    groupedKitsArray = Object.entries(groupedKits).map(([kit_id, group]) => ({
      ...group,
      kit_id,
    }));
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        <Text className="text-white mt-4">Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">No order found.</Text>
      </View>
    );
  }

  const handleToggleGroup = (kit_id: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [kit_id]: !prev[kit_id],
    }));
  };

  return (
    <ScrollView className="flex-1 bg-black px-4 py-6">
      <Text
        className="text-2xl font-bold text-center mb-6"
        style={{ color: BACKGROUND_COLOR }}
      >
        Order Details
      </Text>

      {/* Order Info */}
      <View className="mb-6">
        <Text className="text-lg font-semibold text-white mb-2">Order Info</Text>
        <Text className="text-white">Project ID: {order.project_id}</Text>
        <Text className="text-white">Status: {order.status}</Text>
        <Text className="text-white">Order Date: {formatDateTime(order.order_date)}</Text>
        <Text className="text-white">Billing Address: {order.billing_address}</Text>
        <Text className="text-white">Delivery Address: {order.delivery_address}</Text>
        {/* {order.expected_delivery_date && (
          <Text className="text-white">Expected Delivery: {new Date(order.expected_delivery_date).toDateString()}</Text>
        )} */}
        {order.delivery_date && (
          <Text className="text-white">Delivered On: {new Date(order.delivery_date).toDateString()}</Text>
        )}
        {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
      </View>

      {/* Ordered Kits - Designer Expandable Groups */}
      <View className="mb-10">
        <Text className="text-lg font-semibold text-white mb-2">
          Ordered Kits (Grouped by Kit)
        </Text>
        {groupedKitsArray.map((group, idx) => (
          <View
            key={group.kit.kit_id}
            style={{
              backgroundColor: expandedGroups[group.kit.kit_id] ? "#23262b" : "#191c20",
              borderColor: expandedGroups[group.kit.kit_id] ? BACKGROUND_COLOR : "#333",
              borderWidth: 1,
              borderRadius: 16,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }}
          >
            {/* Summary Row with expand/collapse */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 16,
                paddingHorizontal: 18,
              }}
              onPress={() => handleToggleGroup(group.kit.kit_id)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={{
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                  fontSize: 16,
                }}>
                  {group.kit.kit_id}
                </Text>
                <Text style={{
                  color: "#adc2dd",
                  fontSize: 13,
                  marginTop: 2,
                  fontWeight: "600",
                }}>
                  {/* {group.kit.configuration} */}
                  Quantity: {group.totalQuantity}
                </Text>
              </View>
              <View style={{
                width: 36,
                height: 36,
                backgroundColor: BACKGROUND_COLOR,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#ccc",
                shadowOpacity: 0.35, shadowOffset: { width: 0, height: 2 }
              }}>
                <Text style={{
                  color: "#14181d",
                  fontSize: 22,
                  fontWeight: "bold",
                  textAlign: "center",
                  lineHeight: 24,
                }}>
                  {expandedGroups[group.kit.kit_id] ? "−" : "+"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Expanded details: beautiful bullets and total quantity */}
            {expandedGroups[group.kit.kit_id] && (
              <View style={{ paddingHorizontal: 20, paddingBottom: 14, paddingTop: 6 }}>
                <View style={{ marginBottom: 6 }}>

                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                    <Text style={{ fontSize: 20, color: "#8BC34A", marginRight: 10 }}>•</Text>
                    <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                      <Text style={{ fontWeight: "700" }}>Tilt Angle</Text>: {group.kit.tilt_angle}°
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                    <Text style={{ fontSize: 20, color: "#8BC34A", marginRight: 10 }}>•</Text>
                    <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                      <Text style={{ fontWeight: "700" }}>Clearance</Text>: {group.kit.clearance} ft
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                    <Text style={{ fontSize: 20, color: "#6AC5F7", marginRight: 10 }}>•</Text>
                    <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                      <Text style={{ fontWeight: "700" }}>Panels</Text>: {group.kit.num_panels}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
                    <Text style={{ fontSize: 20, color: "#FFA500", marginRight: 10 }}>•</Text>
                    <Text style={{ color: "#e0e0e0", fontSize: 15 }}>
                      <Text style={{ fontWeight: "700" }}>Region</Text>: {group.kit.region}
                    </Text>
                  </View>
                </View>
                <View style={{
                  marginTop: 14,
                  borderTopColor: "#444",
                  borderTopWidth: 1,
                  paddingTop: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <Text style={{
                    color: "#6EBB73",
                    fontWeight: "bold",
                    fontSize: 16,
                    letterSpacing: 0.5
                  }}>
                    Total Quantity: {group.totalQuantity}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Total Kits Ordered message */}
        <View style={{
          marginTop: 10,
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: '#555',
          backgroundColor: '#1a1a1a',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOpacity: 0.6,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          alignItems: 'center',
        }}>
          <Text style={{
            color: BACKGROUND_COLOR,
            fontWeight: 'bold',
            fontSize: 18,
            letterSpacing: 1,
          }}>
            Total Kits Ordered: {order.total_kits}
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
