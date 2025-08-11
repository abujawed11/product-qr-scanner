
// File: app/(main)/warranty/_layout.tsx

import CustomHeader from '@/components/CustomHeader';
import { Stack } from 'expo-router';
import React from 'react';

export default function WarrantyLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="warranty-status-page"
        options={{ title: 'Warranty Details' }}
      />
      <Stack.Screen
        name="claim-form"
        options={{ title: 'Warranty Request Form' }}
      />
      <Stack.Screen
        name="claim-media-wizard"
        options={{ title: 'Upload Files' }}
      />
      <Stack.Screen
        name="warranty-card"
        options={{ title: 'Warranty Card' }}
      />
    </Stack>
  );
}

