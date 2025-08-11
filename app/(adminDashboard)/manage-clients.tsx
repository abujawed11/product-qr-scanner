
import { FilterSortBar } from '@/components/FilterSortBar';
import { User } from '@/types/user.types';
import api from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
    ActivityIndicator,
    Alert,
    Modal,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export default function ManageClients() {
    const [paginated, setPaginated] = useState<PaginatedResponse<User> | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'desc' | 'asc'>('desc');

    // Fetch paginated users
    const fetchUsers = async (url?: string) => {
        setLoading(true);
        try {
            const params: any = {};
            if (search) params.search = search;
            params.ordering = sort === 'desc' ? '-id' : 'id';
            const endpoint = url ?? '/admin/users/';
            const res = await api.get<PaginatedResponse<User>>(endpoint, { params });
            setPaginated(res.data);
            setUsers(res.data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // CRUD Form logic unchanged
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            account_type: 'client',
            is_active: true,
            password: '',
        },
    });

    const watchedFields = useWatch({ control });

    const isUnchanged = () => {
        if (!editUser) return false;
        return (
            watchedFields.username === editUser.username &&
            watchedFields.email === editUser.email &&
            watchedFields.account_type === editUser.account_type &&
            watchedFields.is_active === editUser.is_active
        );
    };

    const onInvalid = (errors: any) => {
        const firstErrorKey = Object.keys(errors)[0];
        const message = errors[firstErrorKey]?.message || 'Invalid input';
        Alert.alert('Validation Error', message);
    };

    const onSubmit = async (data: any) => {
        try {
            if (editUser) {
                await api.put(`/admin/users/${editUser.id}/update/`, data);
            } else {
                await api.post('/admin/users/create/', data);
            }
            setModalVisible(false);
            reset();
            setEditUser(null);
            fetchUsers();
        } catch (err: any) {
            let errorMessage = 'Something went wrong. Please try again.';
            if (err.response?.status === 400) {
                const resData = err.response.data;
                const firstKey = Object.keys(resData)[0];
                const messages = resData[firstKey];
                if (Array.isArray(messages)) {
                    errorMessage = messages[0];
                } else if (typeof messages === 'string') {
                    errorMessage = messages;
                }
            }
            Alert.alert('Error', errorMessage);
        }
    };

    const handleDelete = (userId: number) => {
        Alert.alert('Confirm Delete', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.delete(`/admin/users/${userId}/delete/`);
                        fetchUsers();
                    } catch (err) {
                        console.error(err);
                    }
                },
            },
        ]);
    };

    const openEditModal = (user: User) => {
        setEditUser(user);
        setValue('username', user.username);
        setValue('email', user.email);
        setValue('account_type', user.account_type ?? 'client');
        setValue('is_active', user.is_active ?? true);
        setModalVisible(true);
    };

    useEffect(() => {
        fetchUsers();
    }, [search, sort]);

    return (
        <ScrollView className="flex-1 bg-black px-6 pt-10" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">Manage Clients</Text>

            {/* Search & Sort UI */}
            {/* <View style={{ flexDirection: 'row', marginBottom: 16, alignItems: 'center' }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search username or email"
          style={{
            backgroundColor: '#fffde6',
            color: '#212121',
            borderRadius: 8,
            paddingHorizontal: 8,
            flex: 1,
            marginRight: 8,
            height: 36,
          }}
          onSubmitEditing={() => fetchUsers()}
          returnKeyType="search"
        />
        <TouchableOpacity
          onPress={() => setSort(s => (s === 'desc' ? 'asc' : 'desc'))}
          style={{
            marginLeft: 4,
            paddingHorizontal: 8,
            backgroundColor: '#fffde6',
            borderRadius: 8,
            height: 36,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#212121', fontSize: 13 }}>
            {sort === 'desc' ? '⬇️ Newest' : '⬆️ Oldest'}
          </Text>
        </TouchableOpacity>
      </View> */}


            <FilterSortBar
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                onFilter={() => fetchUsers()}
            />

            <TouchableOpacity
                onPress={() => {
                    setEditUser(null);
                    reset();
                    setModalVisible(true);
                }}
                className="bg-yellow-400 p-3 rounded-xl mb-6"
            >
                <Text className="text-black font-bold text-center">+ Add New User</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#FAD90E" style={{ marginTop: 20 }} />
            ) : (
                users.map((user) => (
                    <View key={user.id} className="bg-white rounded-xl p-4 mb-4">
                        <Text className="font-bold">{user.username} ({user.account_type})</Text>
                        <Text>{user.email}</Text>
                        <Text>ID: {user.client_id}</Text>
                        <View className="flex-row justify-between mt-3">
                            <TouchableOpacity
                                onPress={() => openEditModal(user)}
                                className="bg-yellow-400 px-4 py-2 rounded"
                            >
                                <Text className="text-black font-bold">Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(user.id)}
                                className="bg-red-500 px-4 py-2 rounded"
                            >
                                <Text className="text-white font-bold">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}

            {/* Pagination Buttons */}
            {paginated && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                    <TouchableOpacity
                        disabled={!paginated.previous}
                        onPress={() => paginated.previous && fetchUsers(paginated.previous)}
                        style={{
                            opacity: paginated.previous ? 1 : 0.4,
                            backgroundColor: '#fffde6',
                            paddingVertical: 8,
                            paddingHorizontal: 24,
                            borderRadius: 16,
                        }}
                    >
                        <Text style={{ color: '#333', fontWeight: 'bold' }}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!paginated.next}
                        onPress={() => paginated.next && fetchUsers(paginated.next)}
                        style={{
                            opacity: paginated.next ? 1 : 0.4,
                            backgroundColor: '#fffde6',
                            paddingVertical: 8,
                            paddingHorizontal: 24,
                            borderRadius: 16,
                        }}
                    >
                        <Text style={{ color: '#333', fontWeight: 'bold' }}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Modal logic unchanged (same as your version) */}
            {/* <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <ScrollView className="flex-1 bg-black px-6 pt-10">
                    <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">
                        {editUser ? 'Edit User' : 'Add User'}
                    </Text>

                    {editUser?.client_id && (
                        <Text className="text-white text-sm mb-2">Client ID: {editUser.client_id}</Text>
                    )}

                    {/* ...rest of your existing modal form code... */}
            {/* Copy all Controller/TextInput fields, handleSubmit, and Cancel/Save buttons as in your original code */}
            {/* ... */}
            {/* Form code unchanged, see previous blocks */}
            {/* </ScrollView> */}
            {/* </Modal> */}

            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <ScrollView className="flex-1 bg-black px-6 pt-10">
                    <Text className="text-2xl font-bold text-yellow-400 text-center mb-6">
                        {editUser ? 'Edit User' : 'Add User'}
                    </Text>

                    {editUser?.client_id && (
                        <Text className="text-white text-sm mb-2">Client ID: {editUser.client_id}</Text>
                    )}

                    <Controller
                        control={control}
                        name="account_type"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-white rounded mb-4 px-3">
                                <Text className="text-black mb-1 mt-2">Account Type</Text>
                                <TouchableOpacity onPress={() => onChange('client')}>
                                    <Text className={`p-2 ${value === 'client' ? 'bg-yellow-300' : ''}`}>Client</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onChange('admin')}>
                                    <Text className={`p-2 ${value === 'admin' ? 'bg-yellow-300' : ''}`}>Admin</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="is_active"
                        render={({ field: { onChange, value } }) => (
                            <View className="bg-white rounded mb-4 px-3 py-2">
                                <Text className="text-black mb-2">Status</Text>
                                <TouchableOpacity onPress={() => onChange(true)}>
                                    <Text className={`p-2 ${value === true ? 'bg-green-300' : ''}`}>Active</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onChange(false)}>
                                    <Text className={`p-2 ${value === false ? 'bg-red-300' : ''}`}>Inactive</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="username"
                        rules={{ required: 'Username is required' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Username"
                                className="bg-white text-black p-3 rounded mb-4"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: 'Enter a valid email address',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Email"
                                className="bg-white text-black p-3 rounded mb-4"
                                keyboardType="email-address"
                            />
                        )}
                    />

                    {!editUser && (
                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: 'Password is required' }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Password"
                                    secureTextEntry
                                    className="bg-white text-black p-3 rounded mb-4"
                                />
                            )}
                        />
                    )}

                    {/* <TouchableOpacity
                        onPress={handleSubmit(onSubmit, onInvalid)}
                        className={`p-4 rounded-xl ${editUser && isUnchanged()
                            ? 'bg-gray-400'
                            : 'bg-yellow-400'
                            }`}
                        disabled={editUser && isUnchanged()}
                    >
                        <Text className="text-center font-bold text-black">
                            {editUser ? 'Update' : 'Create'}
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit, onInvalid)}
                        className={`p-4 rounded-xl ${!!editUser && isUnchanged() ? 'bg-gray-400' : 'bg-yellow-400'
                            }`}
                        disabled={!!editUser && isUnchanged()}
                    >
                        <Text className="text-center font-bold text-black">
                            {editUser ? 'Update' : 'Create'}
                        </Text>
                    </TouchableOpacity>

                    {editUser && isUnchanged() && (
                        <Text className="text-yellow-200 text-center mt-2 text-xs">
                            No changes made
                        </Text>
                    )}

                    <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4">
                        <Text className="text-center text-yellow-400 font-bold">Cancel</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>



        </ScrollView>
    );
}
