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

import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    ScrollView,
    Text,
    View,
} from 'react-native';

interface Kit {
    id: string;
    tilt_angle: number;
    clearance: number;
    configuration: string;
    num_panels: number;
    region: string;
    price: string; // returned as string
}

interface Order {
    id: string;
    status: string;
    order_date: string;
    expected_delivery: string;
    delivery_date: string | null;
    remarks: string;
    manufacturing_location: string;
    dispatch_location: string;
}

interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

interface SavedOrderItem {
    saved_order_id: number;
    scanned_at: string;
    location_id: string;
    customer: Customer;
    order: Order;
    kit: Kit;
    quantity: number;
    unit_price: string;   // string from API
    total_price: string;  // string from API
}

export default function OrderDetailsScreen() {
    const { customerId } = useLocalSearchParams<{ customerId: string }>();

    const [data, setData] = useState<SavedOrderItem[] | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(() => {
        const onBackPress = () => {
            router.replace('/(main)/dashboard');
            return true;
        };
        const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => sub.remove();
    });

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get<SavedOrderItem[]>(`/saved-orders/${customerId}/`);
                setData(res.data);
            } catch (error) {
                console.error('Failed to fetch saved orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [customerId]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
                <Text className="text-white mt-4">Loading order details...</Text>
            </View>
        );
    }

    if (!data || data.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white">No saved orders found.</Text>
            </View>
        );
    }

    const customer = data[0].customer;
    const order = data[0].order;

    const totalPrice = data.reduce(
        (sum, item) => sum + parseFloat(item.total_price),
        0
    );

    return (
        <ScrollView className="flex-1 bg-black px-4 py-6">
            <Text
                className="text-2xl font-bold text-center mb-6"
                style={{ color: BACKGROUND_COLOR }}
            >
                Order Details
            </Text>

            {/* Customer Info */}
            <View className="mb-6">
                <Text className="text-lg font-semibold text-white">Customer</Text>
                <Text className="text-white">Name: {customer.name}</Text>
                <Text className="text-white">Phone: {customer.phone}</Text>
                <Text className="text-white">Email: {customer.email}</Text>
                <Text className="text-white">Address: {customer.address}</Text>
            </View>

            {/* Order Info */}
            <View className="mb-6">
                <Text className="text-lg font-semibold text-white">Order</Text>
                <Text className="text-white">Order ID: {order.id}</Text>
                <Text className="text-white">Status: {order.status}</Text>
                <Text className="text-white">Manufacturing: {order.manufacturing_location}</Text>
                <Text className="text-white">Dispatch: {order.dispatch_location}</Text>
                <Text className="text-white">Order Date: {order.order_date}</Text>
                <Text className="text-white">Expected Delivery: {order.expected_delivery}</Text>
                {order.delivery_date && (
                    <Text className="text-white">Delivered On: {order.delivery_date}</Text>
                )}
                {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
            </View>

            {/* Kits Info */}
            <View className="mb-10">
                <Text className="text-lg font-semibold text-white mb-2">Ordered Kits</Text>

                {data.map((item, index) => (
                    <View key={index} className="mb-4 p-3 border border-white/20 rounded-md">
                        <Text className="text-white font-semibold mb-1">
                            Kit {index + 1}: {item.kit.configuration}
                        </Text>
                        <Text className="text-white">Kit ID: {item.kit.id}</Text>
                        <Text className="text-white">Tilt Angle: {item.kit.tilt_angle}°</Text>
                        <Text className="text-white">Clearance: {item.kit.clearance}m</Text>
                        <Text className="text-white">Panels: {item.kit.num_panels}</Text>
                        <Text className="text-white">Region: {item.kit.region}</Text>
                        <Text className="text-white">Unit Price: ₹{item.unit_price}</Text>
                        <Text className="text-white">Quantity: {item.quantity}</Text>
                        <Text className="text-white font-semibold">
                            Total for Kit {index + 1}: ₹{item.total_price}
                        </Text>
                    </View>
                ))}

                {/* Total price */}
                <View className="mt-4 border-t border-white/30 pt-3">
                    <Text className="text-white font-bold text-lg mt-4 text-right">
                        Total Price: ₹{totalPrice.toFixed(2)}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}


