
import api from '@/utils/api'; // Your API utility
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// -- Types reflecting your Kit model --
interface Kit {
    matrix: string;
    region: string;
    clearance: number | string;
    configuration: string;
    num_panels: number;
    price: string;
    currency: string;
    tilt_angle: number; // 10 or 15
}

// -- Grouped for display like before --
interface KitGroup {
    matrix: string;
    region: string;
    data: {
        clearance: string;
        config: string;
        panels: string;
        price: string;
    }[];
}

export default function ProductInfo() {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                router.replace('/(main)/dashboard');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    // 🔥 Convert to React Query for automatic network recovery
    const {
        data: kitGroups = [],
        isLoading: loading,
        isError,
        error,
        refetch
    } = useQuery<KitGroup[]>({
        queryKey: ['productKits'],
        queryFn: async () => {
            const res = await api.get('/kits/');
            const flatKits: Kit[] = res.data || [];

            // Group by matrix (tilt) and region
            const groups: KitGroup[] = [];
            flatKits.forEach((kit: Kit) => {
                const matrix = kit.tilt_angle === 10
                    ? "Matrix A – 10° Tilt"
                    : kit.tilt_angle === 15
                    ? "Matrix B – 15° Tilt"
                    : `Matrix – ${kit.tilt_angle}° Tilt`;
                const region = kit.region || 'Other Regions';
                // Format clearance for display
                const clearanceStr = parseFloat(kit.clearance.toString()) + ' ft';
                // Format panels string for display
                const panelsStr = kit.num_panels + (kit.num_panels > 1 ? ' Panels' : ' Panel');
                let group = groups.find(g => g.matrix === matrix && g.region === region);
                if (!group) {
                    group = { matrix, region, data: [] };
                    groups.push(group);
                }
                group.data.push({
                    clearance: clearanceStr,
                    config: kit.configuration,
                    panels: panelsStr,
                    price: (kit.currency === "INR" ? "₹" : "") + parseFloat(kit.price as string),
                });
            });
            return groups;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes - product data doesn't change often
    });

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator color="#FAD90E" size="large" />
                <Text style={{ color: "white", marginTop: 10 }}>Loading kits...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 bg-black justify-center items-center px-4">
                <Text style={{ color: "white", fontSize: 18, textAlign: 'center', marginBottom: 16 }}>
                    Failed to load product information
                </Text>
                <TouchableOpacity
                    onPress={() => refetch()}
                    style={{ backgroundColor: "#FAD90E", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
                >
                    <Text style={{ color: "black", fontWeight: 'bold' }}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-black px-4 pt-6 pb-12">
            <Text className="text-3xl font-bold text-center mb-4" style={{ color: '#FAD90E' }}>
                SunRack BlueBase™ Kits
            </Text>

            {kitGroups.map((kitGroup, index) => (
                <View key={index} className="mb-8">
                    <Text className="text-xl font-semibold text-white mb-1">
                        {kitGroup.matrix}
                    </Text>
                    <Text className="text-sm text-gray-400 mb-3">
                        Ideal for: {kitGroup.region}
                    </Text>
                    {kitGroup.data.map((kit, idx) => (
                        <View
                            key={idx}
                            className="bg-white rounded-2xl p-4 mb-4 shadow-md"
                        >
                            <View className="flex-row items-center mb-2">
                                <MaterialIcons name="straighten" size={18} color="black" />
                                <Text className="ml-2 text-black font-medium">Clearance: {kit.clearance}</Text>
                            </View>
                            <View className="flex-row items-center mb-2">
                                <FontAwesome5 name="project-diagram" size={16} color="black" />
                                <Text className="ml-2 text-black font-medium">Configuration: {kit.config}</Text>
                            </View>
                            <View className="flex-row items-center mb-2">
                                <FontAwesome5 name="solar-panel" size={15} color="#FAD90E" />
                                <Text className="ml-2 text-black font-medium">Panels: {kit.panels}</Text>
                            </View>
                            {/* <View className="flex-row items-center">
                                <MaterialIcons name="currency-rupee" size={20} color="#FAD90E" />
                                <Text className="ml-2 text-black font-semibold text-lg">{kit.price}</Text>
                            </View> */}
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}


