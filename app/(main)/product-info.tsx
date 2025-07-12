import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { BackHandler, ScrollView, Text, View } from 'react-native';

const kits = [
    {
        matrix: 'Matrix A – 10° Tilt',
        region: 'Southern India, Coastal Areas',
        data: [
            { clearance: '6.5 ft', config: '2P × 3', panels: '6 Panels', price: '₹16,800' },
            { clearance: '8.2 ft', config: '2P × 3', panels: '6 Panels', price: '₹18,000' },
            { clearance: '6.5 ft', config: '2P × 5', panels: '10 Panels', price: '₹24,900' },
            { clearance: '8.2 ft', config: '2P × 5', panels: '10 Panels', price: '₹26,700' },
        ],
    },
    {
        matrix: 'Matrix B – 15° Tilt',
        region: 'Northern & Eastern India',
        data: [
            { clearance: '6.5 ft', config: '2P × 3', panels: '6 Panels', price: '₹17,200' },
            { clearance: '8.2 ft', config: '2P × 3', panels: '6 Panels', price: '₹18,300' },
            { clearance: '6.5 ft', config: '2P × 5', panels: '10 Panels', price: '₹26,000' },
            { clearance: '8.2 ft', config: '2P × 5', panels: '10 Panels', price: '₹27,100' },
        ],
    },
];

export default function ProductInfo() {




    useFocusEffect(
        React.useCallback(() => {


            const onBackPress = () => {
                router.replace('/(main)/dashboard');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );
    return (
        <ScrollView className="flex-1 bg-black px-4 pt-6 pb-12">
            <Text className="text-3xl font-bold text-center mb-4" style={{ color: '#FAD90E' }}>
                SunRack BlueBase™ Kits
            </Text>

            {kits.map((kitGroup, index) => (
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
                                {/* <MaterialIcons name="grid-view" size={18} color="black" /> */}
                                <FontAwesome5 name="solar-panel" size={15} color="#FAD90E" />
                                <Text className="ml-2 text-black font-medium">Panels: {kit.panels}</Text>
                            </View>

                            <View className="flex-row items-center">
                                <MaterialIcons name="currency-rupee" size={20} color="#FAD90E" />
                                <Text className="ml-2 text-black font-semibold text-lg">{kit.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
