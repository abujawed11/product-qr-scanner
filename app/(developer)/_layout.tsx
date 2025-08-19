import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function DeveloperLayout() {
  const { user } = useAuth();

  // 🔒 Developer access check - only allow specific usernames
  const isDeveloper = user && (
    user.username === 'developer' || 
    user.username === 'dev_admin' || 
    user.username === 'abujawed11' || // Add your specific usernames here
    user.email === 'developer@company.com' // Or specific emails
  );

  if (!isDeveloper) {
    // Redirect to main app if not developer
    return <Redirect href="/dashboard" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#dc2626', // Red background for developer
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ 
          title: '🔧 Developer Dashboard',
          headerBackVisible: false
        }}
      />
      <Stack.Screen
        name="delete-claims"
        options={{ title: '🗑️ Delete Claims' }}
      />
      <Stack.Screen
        name="delete-users"
        options={{ title: '👤 Delete Users' }}
      />
    </Stack>
  );
}

