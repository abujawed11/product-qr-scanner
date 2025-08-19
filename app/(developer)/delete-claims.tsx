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

interface WarrantyClaim {
  war_req_id: string;
  status: string;
  project_id: string;
  kit_id: string;
  kit_number: string;
  company_name: string;
  contact_name: string;
  email: string;
  created_at: string;
  uploads_count?: number;
}

export default function DeleteClaimsScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  // Fetch all warranty claims
  const {
    data: claims = [],
    isLoading,
    isError,
    refetch
  } = useQuery<WarrantyClaim[]>({
    queryKey: ['developerClaims'],
    queryFn: async () => {
      const response = await api.get('/developer/warranty-claims/');
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  // Delete claim mutation
  const deleteClaimMutation = useMutation({
    mutationFn: async (claimId: string) => {
      return api.delete(`/developer/warranty-claims/${claimId}/delete/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['developerClaims'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['warrantyDashboardCounts'] });
      Alert.alert('Success', 'Warranty claim and all uploads deleted successfully');
    },
    onError: (error: any) => {
      Alert.alert(
        'Delete Failed', 
        error.response?.data?.error || 'Failed to delete claim'
      );
    },
  });

  const handleDeleteClaim = (claim: WarrantyClaim) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to DELETE warranty claim?\n\n` +
      `ID: ${claim.war_req_id}\n` +
      `Project: ${claim.project_id}\n` +
      `Company: ${claim.company_name}\n\n` +
      `⚠️ This will permanently delete:\n` +
      `• The warranty request\n` +
      `• ALL uploaded files/images/videos\n` +
      `• ALL associated data\n\n` +
      `This action CANNOT be undone!`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: () => deleteClaimMutation.mutate(claim.war_req_id),
        },
      ]
    );
  };

  const filteredClaims = claims.filter(claim =>
    claim.war_req_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.project_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#dc2626" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading warranty claims...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a', padding: 20 }}>
        <Text style={{ color: '#ef4444', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          Failed to load warranty claims
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
            🚨 DANGER ZONE
          </Text>
          <Text style={{ color: '#7f1d1d', fontSize: 14 }}>
            Deleting warranty claims will permanently remove ALL associated data including uploaded files. This action cannot be undone.
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
            placeholder="Search by ID, Project, Company, or Email..."
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
            Total Claims: <Text style={{ color: '#fff', fontWeight: 'bold' }}>{claims.length}</Text>
          </Text>
          <Text style={{ color: '#94a3b8' }}>
            Filtered: <Text style={{ color: '#fff', fontWeight: 'bold' }}>{filteredClaims.length}</Text>
          </Text>
        </View>
      </View>

      {/* Claims List */}
      <ScrollView style={{ flex: 1 }}>
        {filteredClaims.map((claim) => (
          <View
            key={claim.war_req_id}
            style={{
              backgroundColor: '#1e293b',
              marginHorizontal: 20,
              marginBottom: 12,
              borderRadius: 12,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: getStatusColor(claim.status),
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>
                  {claim.war_req_id}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
                  Project: {claim.project_id}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
                  Kit: {claim.kit_id} #{claim.kit_number}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
                  Company: {claim.company_name}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 14, marginBottom: 2 }}>
                  Contact: {claim.contact_name} ({claim.email})
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>
                  Created: {new Date(claim.created_at).toLocaleString()}
                </Text>
                
                <View style={{ 
                  backgroundColor: getStatusColor(claim.status), 
                  paddingHorizontal: 8, 
                  paddingVertical: 4, 
                  borderRadius: 12, 
                  alignSelf: 'flex-start',
                  marginTop: 8
                }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
                    {claim.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleDeleteClaim(claim)}
                disabled={deleteClaimMutation.isPending}
                style={{
                  backgroundColor: '#dc2626',
                  padding: 12,
                  borderRadius: 8,
                  opacity: deleteClaimMutation.isPending ? 0.5 : 1
                }}
              >
                {deleteClaimMutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialIcons name="delete-forever" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredClaims.length === 0 && (
          <View style={{ 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: 40 
          }}>
            <MaterialIcons name="search-off" size={48} color="#64748b" />
            <Text style={{ color: '#94a3b8', fontSize: 16, marginTop: 12 }}>
              No claims found
            </Text>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string): string {
  const lower = status.toLowerCase();
  if (lower.includes('approved')) return '#22c55e';
  if (lower.includes('pending')) return '#f59e0b';
  if (lower.includes('rejected')) return '#ef4444';
  return '#64748b';
}

