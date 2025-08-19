import api from '@/utils/api';
import { MaterialIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface User {
  id: number;
  username: string;
  email: string;
  client_id: string;
  account_type: 'admin' | 'client';
  is_active: boolean;
  company_name: string;
  date_joined: string;
  last_login?: string;
}

export default function DeleteUsersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    isError,
    refetch
  } = useQuery<User[]>({
    queryKey: ['developerUsers'],
    queryFn: async () => {
      const response = await api.get('/developer/users/');
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      return api.delete(`/developer/users/${userId}/delete/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developerUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      Alert.alert('Success', 'User deleted successfully');
    },
    onError: (error: any) => {
      Alert.alert(
        'Delete Failed', 
        error.response?.data?.error || 'Failed to delete user'
      );
    },
  });

  const handleDeleteUser = (user: User) => {
    Alert.alert(
      'Confirm Delete User',
      `Are you sure you want to DELETE user?\n\n` +
      `Username: ${user.username}\n` +
      `Email: ${user.email}\n` +
      `Company: ${user.company_name}\n` +
      `Account Type: ${user.account_type}\n\n` +
      `⚠️ This will permanently delete:\n` +
      `• The user account\n` +
      `• ALL user's warranty claims\n` +
      `• ALL user's uploaded files\n` +
      `• ALL associated data\n\n` +
      `This action CANNOT be undone!`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE USER',
          style: 'destructive',
          onPress: () => deleteUserMutation.mutate(user.id),
        },
      ]
    );
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.client_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#dc2626" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading users...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a', padding: 20 }}>
        <Text style={{ color: '#ef4444', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          Failed to load users
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          style={{ backgroundColor: '#dc2626', padding: 12, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const adminUsers = filteredUsers.filter(user => user.account_type === 'admin');
  const clientUsers = filteredUsers.filter(user => user.account_type === 'client');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View style={{ padding: 20 }}>
        {/* Warning Banner */}
        <View style={{
          backgroundColor: '#fecaca',
          borderColor: '#dc2626',
          borderWidth: 2,
          borderRadius: 8,
          padding: 16,
          marginBottom: 20
        }}>
          <Text style={{ color: '#7f1d1d', fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
            🚨 EXTREME DANGER ZONE
          </Text>
          <Text style={{ color: '#7f1d1d', fontSize: 14 }}>
            Deleting users will permanently remove ALL their data including warranty claims and uploads. This action cannot be undone.
          </Text>
        </View>

        {/* Search */}
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              backgroundColor: '#1e293b',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#374151'
            }}
            placeholder="Search by username, email, client ID, or company..."
            placeholderTextColor="#9ca3af"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        {/* Stats */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          marginBottom: 20,
          backgroundColor: '#1e293b',
          padding: 12,
          borderRadius: 8
        }}>
          <Text style={{ color: '#94a3b8' }}>
            Total: <Text style={{ color: '#fff', fontWeight: 'bold' }}>{users.length}</Text>
          </Text>
          <Text style={{ color: '#94a3b8' }}>
            Admins: <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>{adminUsers.length}</Text>
          </Text>
          <Text style={{ color: '#94a3b8' }}>
            Clients: <Text style={{ color: '#3b82f6', fontWeight: 'bold' }}>{clientUsers.length}</Text>
          </Text>
        </View>
      </View>

      {/* Users List */}
      <ScrollView style={{ flex: 1 }}>
        {/* Admin Users Section */}
        {adminUsers.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              color: '#ef4444', 
              fontSize: 18, 
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 10
            }}>
              🛡️ Admin Users ({adminUsers.length})
            </Text>
            {adminUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                isDeleting={deleteUserMutation.isPending}
              />
            ))}
          </View>
        )}

        {/* Client Users Section */}
        {clientUsers.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              color: '#3b82f6', 
              fontSize: 18, 
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 10
            }}>
              👤 Client Users ({clientUsers.length})
            </Text>
            {clientUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                isDeleting={deleteUserMutation.isPending}
              />
            ))}
          </View>
        )}

        {filteredUsers.length === 0 && (
          <View style={{ 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 40 
          }}>
            <MaterialIcons name="search-off" size={48} color="#64748b" />
            <Text style={{ color: '#94a3b8', fontSize: 16, marginTop: 12 }}>
              No users found
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function UserCard({ 
  user, 
  onDelete, 
  isDeleting 
}: { 
  user: User; 
  onDelete: (user: User) => void;
  isDeleting: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: '#1e293b',
        marginHorizontal: 20,
        marginBottom: 12,
        borderRadius: 12,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: user.account_type === 'admin' ? '#ef4444' : '#3b82f6',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>
              {user.username}
            </Text>
            <View style={{ 
              backgroundColor: user.account_type === 'admin' ? '#ef4444' : '#3b82f6', 
              paddingHorizontal: 6, 
              paddingVertical: 2, 
              borderRadius: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                {user.account_type.toUpperCase()}
              </Text>
            </View>
            {!user.is_active && (
              <View style={{ 
                backgroundColor: '#64748b', 
                paddingHorizontal: 6, 
                paddingVertical: 2, 
                borderRadius: 8,
                marginLeft: 4
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                  INACTIVE
                </Text>
              </View>
            )}
          </View>
          
          <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
            📧 {user.email}
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
            🏢 {user.company_name}
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
            🆔 Client ID: {user.client_id}
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>
            📅 Joined: {new Date(user.date_joined).toLocaleDateString()}
          </Text>
          {user.last_login && (
            <Text style={{ color: '#94a3b8', fontSize: 12 }}>
              🕒 Last Login: {new Date(user.last_login).toLocaleString()}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => onDelete(user)}
          disabled={isDeleting}
          style={{
            backgroundColor: '#dc2626',
            padding: 12,
            borderRadius: 8,
            opacity: isDeleting ? 0.5 : 1
          }}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <MaterialIcons name="delete-forever" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

