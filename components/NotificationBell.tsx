
import { NotificationDot } from '@/components/NotificationBadge'; // 👈 Import the badge component
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

type BellProps = {
  target?: string;
};

const BellWithNotification = ({ target }: BellProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push((target ?? '/(main)/notifications') as any)}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
      accessibilityLabel="Notifications"
    >
      {/* 👇 Wrap the icon with NotificationDot */}
      <NotificationDot>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </NotificationDot>
    </TouchableOpacity>
  );
};

export default BellWithNotification;


