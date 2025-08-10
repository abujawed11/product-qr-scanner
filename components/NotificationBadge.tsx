import { useNotificationBadge } from '@/utils/useNotificationBadge';
import React from 'react';
import { Text, View } from 'react-native';

interface NotificationBadgeProps {
  children: React.ReactNode;
  showBadge?: boolean;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  children, 
  showBadge = true 
}) => {
  const { data: unreadCount = 0 } = useNotificationBadge();

  return (
    <View style={{ position: 'relative' }}>
      {children}
      {showBadge && unreadCount > 0 && (
        <View 
          className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center border-2 border-white"
          style={{
            minWidth: 18,
            height: 18,
          }}
        >
          <Text className="text-white text-xs font-bold" style={{ fontSize: 10 }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </Text>
        </View>
      )}
    </View>
  );
};

// Simple red dot version (no count)
export const NotificationDot: React.FC<NotificationBadgeProps> = ({ 
  children, 
  showBadge = true 
}) => {
  const { data: unreadCount = 0 } = useNotificationBadge();

  return (
    <View style={{ position: 'relative' }}>
      {children}
      {showBadge && unreadCount > 0 && (
        <View 
          className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 border-2 border-white"
        />
      )}
    </View>
  );
};
