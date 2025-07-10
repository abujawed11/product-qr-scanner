import api from '@/utils/api';
import { BACKGROUND_COLOR } from '@/utils/color';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';

interface KitItem {
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

interface OrderDetailsResponse {
    customer: {
        customerId: string;
        name: string;
        phone: string;
        email: string;
        address: string;
    };
    order: {
        orderId: string;
        orderDate: string;
        status: string;
        manufacturingLocation: string;
        dispatchLocation: string;
        expectedDeliveryDate: string;
        deliveryDate: string | null;
        remarks: string;
    };
    kit: {
        kitId: string;
        tiltAngle: number;
        clearance: number;
        configuration: string;
        numPanels: number;
        region: string;
        price: number;
    };
    orderItem: KitItem[];
}

export default function OrderDetailsScreen() {
    const { customerId, orderId, kitId, locationId } = useLocalSearchParams<{
        customerId: string;
        orderId: string;
        kitId: string;
        locationId?: string;
    }>();

    const [data, setData] = useState<OrderDetailsResponse | null>(null);
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
                const res = await api.post<OrderDetailsResponse>(
                    '/order-details/',
                    {
                        customerId,
                        orderId,
                        kitId,
                        locationId,
                    }
                );
                setData(res.data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [customerId, orderId, kitId, locationId]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
                <Text className="text-white mt-4">Loading order details...</Text>
            </View>
        );
    }

    if (!data) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white">No order details found.</Text>
            </View>
        );
    }

    const { customer, order, kit, orderItem } = data;

    return (
        <ScrollView className="flex-1 bg-black px-4 py-6">
            <Text className="text-2xl font-bold text-center mb-6" style={{ color: BACKGROUND_COLOR }}>
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
                <Text className="text-white">Order ID: {order.orderId}</Text>
                <Text className="text-white">Status: {order.status}</Text>
                <Text className="text-white">Manufacturing: {order.manufacturingLocation}</Text>
                <Text className="text-white">Dispatch: {order.dispatchLocation}</Text>
                <Text className="text-white">Order Date: {order.orderDate}</Text>
                <Text className="text-white">Expected Delivery: {order.expectedDeliveryDate}</Text>
                {order.deliveryDate && (
                    <Text className="text-white">Delivered On: {order.deliveryDate}</Text>
                )}
                {order.remarks && <Text className="text-white">Remarks: {order.remarks}</Text>}
            </View>

            {/* Kit Info */}
            <View className="mb-6">
                <Text className="text-lg font-semibold text-white">Kit Details</Text>
                <Text className="text-white">Kit ID: {kit.kitId}</Text>
                <Text className="text-white">Configuration: {kit.configuration}</Text>
                <Text className="text-white">Tilt Angle: {kit.tiltAngle}°</Text>
                <Text className="text-white">Clearance: {kit.clearance}m</Text>
                <Text className="text-white">Panels: {kit.numPanels}</Text>
                <Text className="text-white">Region: {kit.region}</Text>
                <Text className="text-white">Price: ₹{kit.price}</Text>
            </View>

            {/* Order Item Info */}
            <View className="mb-10">
                <Text className="text-lg font-semibold text-white">Ordered Kits</Text>
                {orderItem.map((item, index) => (
                    <View key={index} className="mt-2 border border-white/20 p-3 rounded-md">
                        <Text className="text-white">Quantity: {item.quantity}</Text>
                        <Text className="text-white">Unit Price: ₹{item.unitPrice}</Text>
                        <Text className="text-white">Total Price: ₹{item.totalPrice}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
