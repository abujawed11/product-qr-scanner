// app/(adminDashboard)/manage-kits.tsx
// import { Kit } from '@/types/kit.types'; // define interface accordingly
// import api from '@/utils/api';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import {
//     Alert,
//     BackHandler,
//     Modal,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function ManageKits() {
//     const [kits, setKits] = useState<Kit[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [editKit, setEditKit] = useState<Kit | null>(null);
//     const [modalVisible, setModalVisible] = useState(false);

//     const fetchKits = async () => {
//         setLoading(true);
//         try {
//             const res = await api.get('/admin/kits/');
//             setKits(res.data.results);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const {
//         control,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { isDirty, errors },
//     } = useForm({
//         defaultValues: {
//             tilt_angle: '',
//             clearance: '',
//             configuration: '',
//             num_panels: '',
//             region: '',
//             price: '',
//             currency: 'INR',
//             is_active: true,
//         },
//     });

//     const openEditModal = (kit: Kit) => {
//         setEditKit(kit);
//         // reset({ ...kit, clearance: kit.clearance.toString(), price: kit.price.toString() });
//         reset({
//             tilt_angle: kit.tilt_angle.toString(),
//             clearance: kit.clearance.toString(),
//             configuration: kit.configuration,
//             num_panels: kit.num_panels.toString(),
//             region: kit.region || '',
//             price: kit.price.toString(),
//             currency: kit.currency,
//             is_active: kit.is_active,
//         });

//         setModalVisible(true);
//     };

//     const onSubmit = async (data: any) => {
//         try {
//             await api.put(`/admin/kits/${editKit!.kit_id}/update/`, {
//                 ...data,
//                 clearance: parseFloat(data.clearance),
//                 price: parseFloat(data.price),
//             });
//             setModalVisible(false);
//             fetchKits();
//         } catch (err: any) {
//             Alert.alert('Error', err.response?.data?.error || 'Failed to update');
//         }
//     };

//     useEffect(() => {
//         fetchKits();
//     }, []);

//     useEffect(() => {
//         if (!modalVisible) return;
//         const handleBack = () => {
//             setModalVisible(false);
//             return true;
//         };
//         const sub = BackHandler.addEventListener('hardwareBackPress', handleBack);
//         return () => sub.remove();
//     }, [modalVisible]);

//     return (
//         <ScrollView className="flex-1 bg-black px-6 pt-10" contentContainerStyle={{ paddingBottom: 40 }}>
//             <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">Manage Kits</Text>

//             {kits.map((kit) => (
//                 <TouchableOpacity
//                     key={kit.kit_id}
//                     onPress={() => openEditModal(kit)}
//                     className="bg-white rounded-xl p-4 mb-4 flex-row justify-between items-center"
//                 >
//                     <View>
//                         <Text className="font-bold text-lg">{kit.kit_id}</Text>
//                         <Text className="text-gray-600">{kit.configuration}, {kit.clearance}m</Text>
//                     </View>
//                     <FontAwesome5 name="edit" size={20} color="#FAD90E" />
//                 </TouchableOpacity>
//             ))}

//             <Modal visible={modalVisible} animationType="slide">
//                 <ScrollView className="flex-1 bg-black px-6 pt-10">
//                     <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">
//                         Edit Kit – {editKit?.kit_id}
//                     </Text>

//                     {/* Form fields */}
//                     {[
//                         { name: 'configuration', label: 'Configuration' },
//                         { name: 'tilt_angle', label: 'Tilt Angle (10 or 15)' },
//                         { name: 'clearance', label: 'Clearance (m)' },
//                         { name: 'num_panels', label: 'Number of Panels' },
//                         { name: 'region', label: 'Region' },
//                         { name: 'price', label: 'Price' },
//                         { name: 'currency', label: 'Currency' },
//                     ].map(({ name, label }) => (
//                         <Controller
//                             key={name}
//                             control={control}
//                             name={name as any}
//                             rules={{ required: `${label} is required` }}
//                             render={({ field: { onChange, value } }) => (
//                                 <View className="mb-4">
//                                     <Text className="text-white mb-1">{label}</Text>
//                                     <TextInput
//                                         className="bg-white text-black p-3 rounded"
//                                         value={value}
//                                         onChangeText={onChange}
//                                         keyboardType={name === 'clearance' || name === 'price' ? 'decimal-pad' : 'default'}
//                                         placeholder={label}
//                                     />
//                                 </View>
//                             )}
//                         />
//                     ))}

//                     <Controller
//                         control={control}
//                         name="is_active"
//                         render={({ field: { onChange, value } }) => (
//                             <View className="mb-6 bg-white rounded p-3">
//                                 <Text className="text-black mb-2">Active?</Text>
//                                 <View className="flex-row space-x-4">
//                                     {['Yes', 'No'].map((opt) => (
//                                         <TouchableOpacity key={opt} onPress={() => onChange(opt === 'Yes')}>
//                                             <Text className={`py-2 px-4 rounded ${value === (opt === 'Yes') ? 'bg-yellow-300' : ''}`}>
//                                                 {opt}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>
//                             </View>
//                         )}
//                     />

//                     <TouchableOpacity
//                         onPress={handleSubmit(onSubmit)}
//                         disabled={!isDirty}
//                         className={`p-4 rounded-xl mb-4 ${isDirty ? 'bg-yellow-400' : 'bg-gray-400'}`}
//                     >
//                         <Text className="text-center font-bold text-black">
//                             Update Kit
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => setModalVisible(false)}>
//                         <Text className="text-center text-yellow-400 font-bold">Cancel</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </Modal>
//         </ScrollView>
//     );
// }


// import { Kit } from '@/types/kit.types'; // define interface accordingly
// import api from '@/utils/api';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import {
//     Alert,
//     Modal,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// export default function ManageKits() {
//     const [kits, setKits] = useState<Kit[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [editKit, setEditKit] = useState<Kit | null>(null);
//     const [modalVisible, setModalVisible] = useState(false);

//     const fetchKits = async () => {
//         setLoading(true);
//         try {
//             const res = await api.get('/admin/kits/');
//             setKits(res.data.results);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const {
//         control,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { isDirty, errors },
//     } = useForm({
//         defaultValues: {
//             tilt_angle: '',
//             clearance: '',
//             configuration: '',
//             num_panels: '',
//             region: '',
//             price: '',
//             currency: 'INR',
//             is_active: true,
//         },
//     });

//     const openEditModal = (kit: Kit) => {
//         setEditKit(kit);
//         reset({
//             tilt_angle: kit.tilt_angle.toString(),
//             clearance: kit.clearance.toString(),
//             configuration: kit.configuration,
//             num_panels: kit.num_panels.toString(),
//             region: kit.region || '',
//             price: kit.price.toString(),
//             currency: kit.currency,
//             is_active: kit.is_active,
//         });
//         setModalVisible(true);
//     };

//     const onSubmit = async (data: any) => {
//         try {
//             await api.put(`/admin/kits/${editKit!.kit_id}/update/`, {
//                 ...data,
//                 clearance: parseFloat(data.clearance),
//                 price: parseFloat(data.price),
//             });
//             setModalVisible(false);
//             fetchKits();
//         } catch (err: any) {
//             Alert.alert('Error', err.response?.data?.error || 'Failed to update');
//         }
//     };

//     useEffect(() => {
//         fetchKits();
//     }, []);

//     // ----------- Removed BackHandler useEffect -----------

//     return (
//         <ScrollView className="flex-1 bg-black px-6 pt-10" contentContainerStyle={{ paddingBottom: 40 }}>
//             <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">Manage Kits</Text>

//             {kits.map((kit) => (
//                 <TouchableOpacity
//                     key={kit.kit_id}
//                     onPress={() => openEditModal(kit)}
//                     className="bg-white rounded-xl p-4 mb-4 flex-row justify-between items-center"
//                 >
//                     <View>
//                         <Text className="font-bold text-lg">{kit.kit_id}</Text>
//                         <Text className="text-gray-600">{kit.configuration}, {kit.clearance}m</Text>
//                     </View>
//                     <FontAwesome5 name="edit" size={20} color="#FAD90E" />
//                 </TouchableOpacity>
//             ))}

//             <Modal
//                 visible={modalVisible}
//                 animationType="slide"
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <ScrollView className="flex-1 bg-black px-6 pt-10">
//                     <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">
//                         Edit Kit – {editKit?.kit_id}
//                     </Text>
//                     {/* Form fields */}
//                     {[
//                         { name: 'configuration', label: 'Configuration' },
//                         { name: 'tilt_angle', label: 'Tilt Angle (10 or 15)' },
//                         { name: 'clearance', label: 'Clearance (m)' },
//                         { name: 'num_panels', label: 'Number of Panels' },
//                         { name: 'region', label: 'Region' },
//                         { name: 'price', label: 'Price' },
//                         { name: 'currency', label: 'Currency' },
//                     ].map(({ name, label }) => (
//                         <Controller
//                             key={name}
//                             control={control}
//                             name={name as any}
//                             rules={{ required: `${label} is required` }}
//                             render={({ field: { onChange, value } }) => (
//                                 <View className="mb-4">
//                                     <Text className="text-white mb-1">{label}</Text>
//                                     <TextInput
//                                         className="bg-white text-black p-3 rounded"
//                                         value={value}
//                                         onChangeText={onChange}
//                                         keyboardType={name === 'clearance' || name === 'price' ? 'decimal-pad' : 'default'}
//                                         placeholder={label}
//                                     />
//                                 </View>
//                             )}
//                         />
//                     ))}

//                     <Controller
//                         control={control}
//                         name="is_active"
//                         render={({ field: { onChange, value } }) => (
//                             <View className="mb-6 bg-white rounded p-3">
//                                 <Text className="text-black mb-2">Active?</Text>
//                                 <View className="flex-row space-x-4">
//                                     {['Yes', 'No'].map((opt) => (
//                                         <TouchableOpacity key={opt} onPress={() => onChange(opt === 'Yes')}>
//                                             <Text className={`py-2 px-4 rounded ${value === (opt === 'Yes') ? 'bg-yellow-300' : ''}`}>
//                                                 {opt}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     ))}
//                                 </View>
//                             </View>
//                         )}
//                     />

//                     <TouchableOpacity
//                         onPress={handleSubmit(onSubmit)}
//                         disabled={!isDirty}
//                         className={`p-4 rounded-xl mb-4 ${isDirty ? 'bg-yellow-400' : 'bg-gray-400'}`}
//                     >
//                         <Text className="text-center font-bold text-black">
//                             Update Kit
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => setModalVisible(false)}>
//                         <Text className="text-center text-yellow-400 font-bold">Cancel</Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </Modal>
//         </ScrollView>
//     );
// }




import { Kit } from '@/types/kit.types';
import api from '@/utils/api';
import { FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ManageKits() {
    const [kits, setKits] = useState<Kit[]>([]);
    const [loading, setLoading] = useState(false);
    const [editKit, setEditKit] = useState<Kit | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchKits = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/kits/');
            setKits(res.data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
        try {
            await api.put(`/admin/kits/${editKit!.kit_id}/update/`, {
                ...data,
                clearance: parseFloat(data.clearance),
                price: parseFloat(data.price),
            });
            setModalVisible(false);
            fetchKits();
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.error || 'Failed to update');
        }
    };

    useEffect(() => {
        fetchKits();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView
                className="px-6 pt-10"
                contentContainerStyle={{ paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled"
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
                                disabled={!isDirty}
                                className={`p-4 rounded-xl mb-4 ${isDirty ? 'bg-yellow-400' : 'bg-gray-400'}`}
                            >
                                <Text className="text-center font-bold text-black">
                                    Update Kit
                                </Text>
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