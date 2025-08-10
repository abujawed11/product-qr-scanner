import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

interface UnreadCountResponse {
  unread_count: number;
}

const fetchUnreadCount = async (): Promise<number> => {
  const response = await api.get('/notifications/unread_count/');
  return response.data.unread_count;
};

export const useNotificationBadge = () => {
  return useQuery<number>({
    queryKey: ['notifications', 'unread_count'],
    queryFn: fetchUnreadCount,
    staleTime: 0, // Always fresh for real-time feel
    //refetchInterval: 10000, // Check every 10 seconds
    refetchOnWindowFocus: true,
  });
};
