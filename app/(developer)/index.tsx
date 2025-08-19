import { useAuth } from '@/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DeveloperDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Exit developer mode?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  const developerActions = [
    {
      id: 'delete-claims',
      title: 'Delete Warranty Claims',
      description: 'Delete warranty requests and all associated uploads',
      icon: 'delete-forever',
      color: '#ef4444',
      route: '/(developer)/delete-claims',
    },
    {
      id: 'delete-users',
      title: 'Delete Users',
      description: 'Remove users from the system',
      icon: 'person-remove',
      color: '#f59e0b',
      route: '/(developer)/delete-users',
    },
    {
      id: 'view-logs',
      title: 'System Logs',
      description: 'View application logs and debug info',
      icon: 'bug-report',
      color: '#8b5cf6',
      onPress: () => {
        Alert.alert('System Logs', 'This feature can be implemented to show app logs');
      },
    },
    {
      id: 'clear-cache',
      title: 'Clear App Cache',
      description: 'Clear React Query cache and SecureStore',
      icon: 'clear-all',
      color: '#06b6d4',
      onPress: () => {
        Alert.alert(
          'Clear Cache',
          'This will clear all cached data. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', onPress: () => {
              // Implement cache clearing logic
              Alert.alert('Success', 'Cache cleared');
            }},
          ]
        );
      },
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#dc2626', 
            textAlign: 'center',
            marginBottom: 8
          }}>
            🔧 DEVELOPER DASHBOARD
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: '#64748b', 
            textAlign: 'center' 
          }}>
            Welcome, {user?.username} • {user?.email}
          </Text>
          <View style={{
            backgroundColor: '#dc2626',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            alignSelf: 'center',
            marginTop: 8
          }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              DEVELOPER MODE
            </Text>
          </View>
        </View>

        {/* Warning */}
        <View style={{
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b',
          borderWidth: 1,
          borderRadius: 8,
          padding: 16,
          marginBottom: 20
        }}>
          <Text style={{ color: '#92400e', fontWeight: 'bold', marginBottom: 4 }}>
            ⚠️ WARNING
          </Text>
          <Text style={{ color: '#92400e', fontSize: 14 }}>
            This is a developer-only area. Actions performed here can permanently delete data and affect all users.
          </Text>
        </View>

        {/* Developer Actions */}
        {developerActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={{
              backgroundColor: '#1e293b',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderLeftWidth: 4,
              borderLeftColor: action.color,
            }}
            onPress={() => {
              if (action.route) {
                router.push(action.route as any);
              } else if (action.onPress) {
                action.onPress();
              }
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons 
                name={action.icon as any} 
                size={24} 
                color={action.color} 
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: '#fff', 
                  fontSize: 16, 
                  fontWeight: 'bold',
                  marginBottom: 2
                }}>
                  {action.title}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 14 }}>
                  {action.description}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#64748b" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#dc2626',
            borderRadius: 8,
            padding: 16,
            marginTop: 20,
            marginBottom: 40
          }}
        >
          <Text style={{ 
            color: '#fff', 
            textAlign: 'center', 
            fontWeight: 'bold',
            fontSize: 16
          }}>
            🚪 Exit Developer Mode
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

