

import CustomHeader from '@/components/CustomHeader';
import { Stack } from 'expo-router';

export default function WarrantyLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Stack.Screen
        name="qr-scanner"
        options={{ title: 'QR Scanner' }}
      />
    </Stack>
  );
}


