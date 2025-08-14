
import { Kit } from '@/types/kit.types';
import api from '@/utils/api';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ManageKits() {
    const [editKit, setEditKit] = useState<Kit | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const queryClient = useQueryClient();

    // 🔥 Convert to React Query for automatic network recovery
    const {
        data: kits = [],
        isLoading: loading,
        isError,
        error,
        refetch,
        isRefetching
    } = useQuery<Kit[]>({
        queryKey: ['adminKits'],
        queryFn: async () => {
            const res = await api.get('/admin/kits/');
            return res.data.results;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // 🔥 Update kit mutation
    const updateKitMutation = useMutation({
        mutationFn: async (data: { kitId: string; kitData: any }) => {
            return api.put(`/admin/kits/${data.kitId}/update/`, {
                ...data.kitData,
                clearance: parseFloat(data.kitData.clearance),
                price: parseFloat(data.kitData.price),
            });
        },
        onSuccess: () => {
            setModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['adminKits'] });
            queryClient.invalidateQueries({ queryKey: ['productKits'] }); // Also refresh user-facing product info
        },
        onError: (err: any) => {
            Alert.alert('Error', err.response?.data?.error || 'Failed to update');
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isDirty, errors },
    } = useForm({
        defaultValues: {
            tilt_angle: '',
            clearance: '',
            configuration: '',
            num_panels: '',
            region: '',
            price: '',
            currency: 'INR',
            is_active: true,
        },
    });

    const openEditModal = (kit: Kit) => {
        setEditKit(kit);
        reset({
            tilt_angle: kit.tilt_angle.toString(),
            clearance: kit.clearance.toString(),
            configuration: kit.configuration,
            num_panels: kit.num_panels.toString(),
            region: kit.region || '',
            price: kit.price.toString(),
            currency: kit.currency,
            is_active: kit.is_active,
        });
        setModalVisible(true);
    };

    const onSubmit = async (data: any) => {
        if (!editKit) return;
        updateKitMutation.mutate({
            kitId: editKit.kit_id,
            kitData: data
        });
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#FAD90E" />
                <Text className="text-white mt-2">Loading kits...</Text>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView className="flex-1 bg-black justify-center items-center px-4">
                <Text className="text-white text-lg text-center mb-4">
                    Failed to load kits. Please check your connection.
                </Text>
                <TouchableOpacity
                    onPress={() => refetch()}
                    className="bg-yellow-400 px-6 py-2 rounded-full"
                >
                    <Text className="text-black font-semibold">Retry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView
                className="px-6 pt-10"
                contentContainerStyle={{ paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        colors={['#FAD90E']}
                        progressBackgroundColor="#000"
                    />
                }
            >
                <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">Manage Kits</Text>

                {kits.map((kit) => (
                    <TouchableOpacity
                        key={kit.kit_id}
                        onPress={() => openEditModal(kit)}
                        className="bg-white rounded-xl p-4 mb-4 flex-row justify-between items-center"
                    >
                        <View>
                            <Text className="font-bold text-lg">{kit.kit_id}</Text>
                            <Text className="text-gray-600">{kit.configuration}, {kit.clearance}m</Text>
                        </View>
                        <FontAwesome5 name="edit" size={20} color="#FAD90E" />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView className="flex-1 bg-black">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            className="px-6 pt-10"
                            contentContainerStyle={{ paddingBottom: 80 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">
                                Edit Kit – {editKit?.kit_id}
                            </Text>

                            {[
                                { name: 'configuration', label: 'Configuration' },
                                { name: 'tilt_angle', label: 'Tilt Angle (10 or 15)' },
                                { name: 'clearance', label: 'Clearance (m)' },
                                { name: 'num_panels', label: 'Number of Panels' },
                                { name: 'region', label: 'Region' },
                                { name: 'price', label: 'Price' },
                                { name: 'currency', label: 'Currency' },
                            ].map(({ name, label }) => (
                                <Controller
                                    key={name}
                                    control={control}
                                    name={name as any}
                                    rules={{ required: `${label} is required` }}
                                    render={({ field: { onChange, value } }) => (
                                        <View className="mb-4">
                                            <Text className="text-white mb-1">{label}</Text>
                                            <TextInput
                                                className="bg-white text-black p-3 rounded"
                                                value={value}
                                                onChangeText={onChange}
                                                keyboardType={name === 'clearance' || name === 'price' ? 'decimal-pad' : 'default'}
                                                placeholder={label}
                                            />
                                        </View>
                                    )}
                                />
                            ))}

                            <Controller
                                control={control}
                                name="is_active"
                                render={({ field: { onChange, value } }) => (
                                    <View className="mb-6 bg-white rounded p-3">
                                        <Text className="text-black mb-2">Active?</Text>
                                        <View className="flex-row space-x-4">
                                            {['Yes', 'No'].map((opt) => (
                                                <TouchableOpacity key={opt} onPress={() => onChange(opt === 'Yes')}>
                                                    <Text className={`py-2 px-4 rounded ${value === (opt === 'Yes') ? 'bg-yellow-300' : ''}`}>
                                                        {opt}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                )}
                            />

                            <TouchableOpacity
                                onPress={handleSubmit(onSubmit)}
                                disabled={!isDirty || updateKitMutation.isPending}
                                className={`p-4 rounded-xl mb-4 ${isDirty && !updateKitMutation.isPending ? 'bg-yellow-400' : 'bg-gray-400'}`}
                            >
                                {updateKitMutation.isPending ? (
                                    <ActivityIndicator color="black" />
                                ) : (
                                    <Text className="text-center font-bold text-black">
                                        Update Kit
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text className="text-center text-yellow-400 font-bold">Cancel</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}