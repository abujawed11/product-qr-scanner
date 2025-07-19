// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import { router, useFocusEffect } from 'expo-router';
// import React from 'react';
// import { BackHandler, ScrollView, Text, View } from 'react-native';

// const kits = [
//     {
//         matrix: 'Matrix A – 10° Tilt',
//         region: 'Southern India, Coastal Areas',
//         data: [
//             { clearance: '6.5 ft', config: '2P × 3', panels: '6 Panels', price: '₹16,800' },
//             { clearance: '8.2 ft', config: '2P × 3', panels: '6 Panels', price: '₹18,000' },
//             { clearance: '6.5 ft', config: '2P × 5', panels: '10 Panels', price: '₹24,900' },
//             { clearance: '8.2 ft', config: '2P × 5', panels: '10 Panels', price: '₹26,700' },
//         ],
//     },
//     {
//         matrix: 'Matrix B – 15° Tilt',
//         region: 'Northern & Eastern India',
//         data: [
//             { clearance: '6.5 ft', config: '2P × 3', panels: '6 Panels', price: '₹17,200' },
//             { clearance: '8.2 ft', config: '2P × 3', panels: '6 Panels', price: '₹18,300' },
//             { clearance: '6.5 ft', config: '2P × 5', panels: '10 Panels', price: '₹26,000' },
//             { clearance: '8.2 ft', config: '2P × 5', panels: '10 Panels', price: '₹27,100' },
//         ],
//     },
// ];

// export default function ProductInfo() {




//     useFocusEffect(
//         React.useCallback(() => {


//             const onBackPress = () => {
//                 router.replace('/(main)/dashboard');
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//             return () => subscription.remove();
//         }, [])
//     );
//     return (
//         <ScrollView className="flex-1 bg-black px-4 pt-6 pb-12">
//             <Text className="text-3xl font-bold text-center mb-4" style={{ color: '#FAD90E' }}>
//                 SunRack BlueBase™ Kits
//             </Text>

//             {kits.map((kitGroup, index) => (
//                 <View key={index} className="mb-8">
//                     <Text className="text-xl font-semibold text-white mb-1">
//                         {kitGroup.matrix}
//                     </Text>
//                     <Text className="text-sm text-gray-400 mb-3">
//                         Ideal for: {kitGroup.region}
//                     </Text>

//                     {kitGroup.data.map((kit, idx) => (
//                         <View
//                             key={idx}
//                             className="bg-white rounded-2xl p-4 mb-4 shadow-md"
//                         >
//                             <View className="flex-row items-center mb-2">
//                                 <MaterialIcons name="straighten" size={18} color="black" />
//                                 <Text className="ml-2 text-black font-medium">Clearance: {kit.clearance}</Text>
//                             </View>

//                             <View className="flex-row items-center mb-2">
//                                 <FontAwesome5 name="project-diagram" size={16} color="black" />
//                                 <Text className="ml-2 text-black font-medium">Configuration: {kit.config}</Text>
//                             </View>

//                             <View className="flex-row items-center mb-2">
//                                 {/* <MaterialIcons name="grid-view" size={18} color="black" /> */}
//                                 <FontAwesome5 name="solar-panel" size={15} color="#FAD90E" />
//                                 <Text className="ml-2 text-black font-medium">Panels: {kit.panels}</Text>
//                             </View>

//                             <View className="flex-row items-center">
//                                 <MaterialIcons name="currency-rupee" size={20} color="#FAD90E" />
//                                 <Text className="ml-2 text-black font-semibold text-lg">{kit.price}</Text>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             ))}
//         </ScrollView>
//     );
// }



import api from '@/utils/api'; // Your API utility
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    ScrollView,
    Text,
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
    const [kitGroups, setKitGroups] = useState<KitGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        (async () => {
            try {
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
                setKitGroups(groups);
            } catch (err) {
                console.error("Failed to load kits", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator color="#FAD90E" size="large" />
                <Text style={{ color: "white", marginTop: 10 }}>Loading kits...</Text>
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



// import { router, useFocusEffect } from 'expo-router';
// import React, { useCallback, useEffect, useState } from 'react';
// import {
//     BackHandler, ScrollView, Text, View, ActivityIndicator
// } from 'react-native';
// import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import api from "@/utils/api"; // replace with your API util

// export default function ProductInfo() {
//     const [kits, setKits] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     interface Kit {
//         matrix: string;
//         region: string;
//         clearance: string;
//         configuration: string;
//         num_panels: number | string;
//         price: string;
//     }

//     interface KitGroup {
//         matrix: string;
//         region: string;
//         data: Kit[];
//     }

//     useFocusEffect(
//         useCallback(() => {
//             const onBackPress = () => {
//                 router.replace('/(main)/dashboard');
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//             return () => subscription.remove();
//         }, [])
//     );

//     useEffect(() => {
//         // Fetch kits from API
//         (async () => {
//             try {
//                 const res = await api.get('/kits/');
//                 // Optionally, transform structure if grouped by matrix/region
//                 setKits(res.data);
//             } catch (err) {
//                 console.error("Failed to load kits", err);
//             } finally {
//                 setLoading(false);
//             }
//         })();
//     }, []);

//     if (loading) {
//         return (
//             <View className="flex-1 bg-black justify-center items-center">
//                 <ActivityIndicator color="#FAD90E" size="large" />
//                 <Text style={{ color: "white", marginTop: 10 }}>Loading kits...</Text>
//             </View>
//         );
//     }

//     // If your API returns all kits flat, you may want to group by matrix and region:
//     // Example grouping function:
//     const kitGroups = kits.reduce((groups, kit) => {
//         const matrix = kit.matrix || 'Unknown Matrix';
//         const region = kit.region || 'Unknown Region';
//         let group = groups.find(g => g.matrix === matrix && g.region === region);
//         if (!group) {
//             group = { matrix, region, data: [] };
//             groups.push(group);
//         }
//         group.data.push(kit);
//         return groups;
//     }, [] as { matrix: string, region: string, data: any[] }[]);

//     return (
//         <ScrollView className="flex-1 bg-black px-4 pt-6 pb-12">
//             <Text className="text-3xl font-bold text-center mb-4" style={{ color: '#FAD90E' }}>
//                 SunRack BlueBase™ Kits
//             </Text>
//             {kitGroups.map((kitGroup, index) => (
//                 <View key={index} className="mb-8">
//                     <Text className="text-xl font-semibold text-white mb-1">{kitGroup.matrix}</Text>
//                     <Text className="text-sm text-gray-400 mb-3">Ideal for: {kitGroup.region}</Text>
//                     {kitGroup.data.map((kit, idx) => (
//                         <View key={idx} className="bg-white rounded-2xl p-4 mb-4 shadow-md">
//                             <View className="flex-row items-center mb-2">
//                                 <MaterialIcons name="straighten" size={18} color="black" />
//                                 <Text className="ml-2 text-black font-medium">Clearance: {kit.clearance}</Text>
//                             </View>
//                             <View className="flex-row items-center mb-2">
//                                 <FontAwesome5 name="project-diagram" size={16} color="black" />
//                                 <Text className="ml-2 text-black font-medium">Configuration: {kit.configuration}</Text>
//                             </View>
//                             <View className="flex-row items-center mb-2">
//                                 <FontAwesome5 name="solar-panel" size={15} color="#FAD90E" />
//                                 <Text className="ml-2 text-black font-medium">Panels: {kit.num_panels}</Text>
//                             </View>
//                             <View className="flex-row items-center">
//                                 <MaterialIcons name="currency-rupee" size={20} color="#FAD90E" />
//                                 <Text className="ml-2 text-black font-semibold text-lg">{kit.price}</Text>
//                             </View>
//                         </View>
//                     ))}
//                 </View>
//             ))}
//         </ScrollView>
//     );
// }

