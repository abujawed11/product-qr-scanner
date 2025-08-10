// import { FilterSortBar } from '@/components/FilterSortBar';
// import { formatDateTime } from '@/utils/formatDate';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import {
//   Alert,
//   Pressable,
//   SectionList,
//   SectionListData,
//   SectionListRenderItemInfo,
//   Text,
//   View,
// } from 'react-native';
// // import { Swipeable } from 'react-native-gesture-handler';
// import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';


// dayjs.extend(relativeTime);

// type NotificationKind = 'order' | 'warranty' | 'system';

// type AppNotification = {
//   id: string;
//   title: string;
//   body: string;
//   createdAt: string; // ISO string
//   kind: NotificationKind;
//   read: boolean;
// };

// type NotificationSection = {
//   title: string;
//   data: AppNotification[];
// };

// const YELLOW = '#facc15';
// const PALE_YELLOW = '#fffde6';

// const seedNotifications: AppNotification[] = [
//   {
//     id: 'n1',
//     title: 'Order #SR-1034 confirmed',
//     body: 'Your order has been confirmed. We will notify you on dispatch.',
//     createdAt: dayjs().subtract(2, 'hour').toISOString(),
//     kind: 'order',
//     read: false,
//   },
//   {
//     id: 'n2',
//     title: 'Warranty request approved',
//     body: 'Your warranty claim for Kit RCC-24 is approved. View details.',
//     createdAt: dayjs().subtract(1, 'day').toISOString(),
//     kind: 'warranty',
//     read: false,
//   },
//   {
//     id: 'n3',
//     title: 'System maintenance',
//     body: 'Scheduled maintenance on Saturday, 2:00–3:00 AM UTC.',
//     createdAt: dayjs().subtract(5, 'day').toISOString(),
//     kind: 'system',
//     read: true,
//   },
//   {
//     id: 'n4',
//     title: 'Shipment out for delivery',
//     body: 'Order #SR-1027 is out for delivery. Track in My Orders.',
//     createdAt: dayjs().subtract(4, 'hour').toISOString(),
//     kind: 'order',
//     read: false,
//   },
// ];

// function getKindIcon(kind: NotificationKind) {
//   switch (kind) {
//     case 'order':
//       return (
//         <MaterialCommunityIcons name="package-variant-closed" size={20} color="#000" />
//       );
//     case 'warranty':
//       return <MaterialCommunityIcons name="shield-check" size={20} color="#000" />;
//     default:
//       return <Ionicons name="information-circle" size={20} color="#000" />;
//   }
// }

// export default function NotificationsScreen() {
//   const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState<'desc' | 'asc'>('desc');
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     // In a real app, refetch from API here and merge read states locally.
//     // Simulate a short refresh delay.
//     setTimeout(() => setRefreshing(false), 600);
//   }, []);

//   const filteredSorted = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     const base = q
//       ? notifications.filter((n) =>
//           n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
//         )
//       : notifications.slice();

//     base.sort((a, b) =>
//       sort === 'desc'
//         ? +new Date(b.createdAt) - +new Date(a.createdAt)
//         : +new Date(a.createdAt) - +new Date(b.createdAt)
//     );
//     return base;
//   }, [notifications, search, sort]);

//   const sections: NotificationSection[] = useMemo(() => {
//     const today: AppNotification[] = [];
//     const thisWeek: AppNotification[] = [];
//     const earlier: AppNotification[] = [];

//     filteredSorted.forEach((n) => {
//       const created = dayjs(n.createdAt);
//       if (created.isAfter(dayjs().startOf('day'))) {
//         today.push(n);
//       } else if (created.isAfter(dayjs().subtract(7, 'day').startOf('day'))) {
//         thisWeek.push(n);
//       } else {
//         earlier.push(n);
//       }
//     });

//     const s: NotificationSection[] = [];
//     if (today.length) s.push({ title: 'Today', data: today });
//     if (thisWeek.length) s.push({ title: 'This Week', data: thisWeek });
//     if (earlier.length) s.push({ title: 'Earlier', data: earlier });
//     return s;
//   }, [filteredSorted]);

//   const markRead = useCallback((id: string, value = true) => {
//     setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: value } : n)));
//   }, []);

//   const deleteOne = useCallback((id: string) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   }, []);

//   const markAllRead = useCallback(() => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   }, []);

//   const clearAll = useCallback(() => {
//     Alert.alert('Clear all notifications?', 'This cannot be undone.', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Clear',
//         style: 'destructive',
//         onPress: () => setNotifications([]),
//       },
//     ]);
//   }, []);

//   const renderRightActions = (item: AppNotification) => (
//     <View className="flex-row h-full">
//       <Pressable
//         onPress={() => markRead(item.id, !item.read)}
//         className="w-24 items-center justify-center bg-yellow-400"
//       >
//         <Ionicons name={item.read ? 'mail-unread-outline' : 'checkmark-done-outline'} size={20} color="#000" />
//         <Text className="mt-1 text-xs text-black font-semibold">{item.read ? 'Unread' : 'Read'}</Text>
//       </Pressable>
//       <Pressable onPress={() => deleteOne(item.id)} className="w-20 items-center justify-center bg-red-500">
//         <Ionicons name="trash-outline" size={20} color="#fff" />
//         <Text className="mt-1 text-xs text-white font-semibold">Delete</Text>
//       </Pressable>
//     </View>
//   );

//   const keyExtractor = (item: AppNotification) => item.id;

//   const renderItem = ({ item }: SectionListRenderItemInfo<AppNotification, NotificationSection>) => {
//     const swipeRef = useRef<React.ComponentRef<typeof Swipeable> | null>(null);
//     return (
//       <Swipeable ref={swipeRef} renderRightActions={() => renderRightActions(item)} overshootRight={false}>
//         <Pressable
//           onPress={() => markRead(item.id, true)}
//           className="mx-4 my-2 rounded-2xl border-2 border-black bg-white shadow-md overflow-hidden"
//           style={{ backgroundColor: item.read ? 'white' : PALE_YELLOW }}
//         >
//           <View className="flex-row items-start p-4">
//             <View className="h-9 w-9 rounded-full items-center justify-center border border-black" style={{ backgroundColor: YELLOW }}>
//               {getKindIcon(item.kind)}
//             </View>
//             <View className="flex-1 ml-3">
//               <View className="flex-row items-center">
//                 {!item.read && <View className="h-2 w-2 rounded-full bg-red-500 mr-2" />}
//                 <Text className="flex-1 text-base font-semibold text-black">{item.title}</Text>
//               </View>
//               <Text className="mt-1 text-sm text-black/80">{item.body}</Text>
//               <View className="mt-2 flex-row items-center justify-between">
//                 <Text className="text-xs text-black/60">{formatDateTime(item.createdAt)}</Text>
//                 <Text className="text-xs text-black/60">{dayjs(item.createdAt).fromNow()}</Text>
//               </View>
//             </View>
//           </View>
//         </Pressable>
//       </Swipeable>
//     );
//   };

//   const renderSectionHeader = ({ section }: { section: SectionListData<AppNotification, NotificationSection> }) => (
//     <View className="px-4 pt-4 pb-2 bg-white">
//       <Text className="text-xs font-semibold tracking-wider text-black/60">{section.title.toUpperCase()}</Text>
//     </View>
//   );

//   return (
//     <View className="flex-1 bg-white">
//       <View className="px-4 pt-3">
//         <FilterSortBar search={search} setSearch={setSearch} onFilter={() => {}} sort={sort} setSort={setSort} />
//         <View className="flex-row items-center justify-between mt-1">
//           <Pressable
//             onPress={markAllRead}
//             className="flex-row items-center px-3 py-2 rounded-xl border-2 border-black bg-yellow-300"
//           >
//             <Ionicons name="checkmark-done" size={16} color="#000" />
//             <Text className="ml-2 text-xs font-semibold text-black">Mark all as read</Text>
//           </Pressable>
//           <Pressable onPress={clearAll} className="flex-row items-center px-3 py-2 rounded-xl border-2 border-black bg-white">
//             <Ionicons name="trash-outline" size={16} color="#000" />
//             <Text className="ml-2 text-xs font-semibold text-black">Clear all</Text>
//           </Pressable>
//         </View>
//       </View>

//       <SectionList
//         sections={sections}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         renderSectionHeader={renderSectionHeader}
//         stickySectionHeadersEnabled
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//         ListEmptyComponent={() => (
//           <View className="flex-1 items-center justify-center py-24">
//             <View className="h-16 w-16 rounded-full items-center justify-center border-2 border-black bg-yellow-300">
//               <Ionicons name="notifications-outline" size={28} color="#000" />
//             </View>
//             <Text className="mt-4 text-base font-semibold text-black">No notifications yet</Text>
//             <Text className="mt-1 text-sm text-black/60">We'll show updates about orders and warranties here.</Text>
//           </View>
//         )}
//         contentContainerStyle={{ paddingBottom: 24 }}
//       />
//     </View>
//   );
// }



import api from '@/utils/api'; // Your API utility
import { formatDateTime } from '@/utils/formatDate';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

dayjs.extend(relativeTime);

type NotificationKind = 'order' | 'warranty' | 'system';

type AppNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  kind: NotificationKind;
  read: boolean;
};

type NotificationSection = {
  title: string;
  data: AppNotification[];
};

const YELLOW = '#facc15';
const PALE_YELLOW = '#fffde6';

// API functions
const fetchNotifications = async (): Promise<AppNotification[]> => {
  const response = await api.get('/notifications/');
  return response.data.results || response.data;
};

const markNotificationRead = async ({ id, read }: { id: string; read: boolean }): Promise<void> => {
  const endpoint = read ? 'mark_read' : 'mark_unread';
  await api.patch(`/notifications/${id}/${endpoint}/`);
};

const deleteNotification = async (id: string): Promise<void> => {
  await api.delete(`/notifications/${id}/`);
};

const markAllNotificationsRead = async (): Promise<void> => {
  await api.patch('/notifications/mark_all_read/');
};

const clearAllNotifications = async (): Promise<void> => {
  await api.delete('/notifications/clear_all/');
};

function getKindIcon(kind: NotificationKind) {
  switch (kind) {
    case 'order':
      return (
        <MaterialCommunityIcons name="package-variant-closed" size={20} color="#000" />
      );
    case 'warranty':
      return <MaterialCommunityIcons name="shield-check" size={20} color="#000" />;
    default:
      return <Ionicons name="information-circle" size={20} color="#000" />;
  }
}

export default function NotificationsScreen() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');
  const queryClient = useQueryClient();

  // Query for notifications using useQuery
  const {
    data: notifications = [],
    isLoading,
    isRefetching,
    refetch,
    error,
  } = useQuery<AppNotification[]>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 1000, // Consider data fresh for 1 seconds
    refetchOnWindowFocus: true, // Refetch when app comes to foreground
  });

  // Mutations for notification actions
  const markReadMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread_count'] }); // 👈 Add this
    },
    onError: () => {
      Alert.alert('Error', 'Failed to update notification');
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread_count'] }); // 👈 Add this
    },
    onError: () => {
      Alert.alert('Error', 'Failed to delete notification');
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread_count'] }); // 👈 Add this
    },
    onError: () => {
      Alert.alert('Error', 'Failed to mark all as read');
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: clearAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread_count'] }); // 👈 Add this
    },
    onError: () => {
      Alert.alert('Error', 'Failed to clear all notifications');
    },
  });

  // Refresh function (pull to refresh)
  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = q
      ? notifications.filter((n) =>
          n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
        )
      : notifications.slice();

    base.sort((a, b) =>
      sort === 'desc'
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt)
    );
    return base;
  }, [notifications, search, sort]);

  const sections: NotificationSection[] = useMemo(() => {
    const today: AppNotification[] = [];
    const thisWeek: AppNotification[] = [];
    const earlier: AppNotification[] = [];

    filteredSorted.forEach((n) => {
      const created = dayjs(n.createdAt);
      if (created.isAfter(dayjs().startOf('day'))) {
        today.push(n);
      } else if (created.isAfter(dayjs().subtract(7, 'day').startOf('day'))) {
        thisWeek.push(n);
      } else {
        earlier.push(n);
      }
    });

    const s: NotificationSection[] = [];
    if (today.length) s.push({ title: 'Today', data: today });
    if (thisWeek.length) s.push({ title: 'This Week', data: thisWeek });
    if (earlier.length) s.push({ title: 'Earlier', data: earlier });
    return s;
  }, [filteredSorted]);

  const markRead = useCallback((id: string, value = true) => {
    markReadMutation.mutate({ id, read: value });
  }, [markReadMutation]);

  const deleteOne = useCallback((id: string) => {
    deleteNotificationMutation.mutate(id);
  }, [deleteNotificationMutation]);

  const markAllRead = useCallback(() => {
    markAllReadMutation.mutate();
  }, [markAllReadMutation]);

  const clearAll = useCallback(() => {
    Alert.alert('Clear all notifications?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => clearAllMutation.mutate(),
      },
    ]);
  }, [clearAllMutation]);

  const renderRightActions = (item: AppNotification) => (
    <View className="flex-row h-full">
      <Pressable
        onPress={() => markRead(item.id, !item.read)}
        className="w-24 items-center justify-center bg-yellow-400"
        disabled={markReadMutation.isPending}
      >
        <Ionicons name={item.read ? 'mail-unread-outline' : 'checkmark-done-outline'} size={20} color="#000" />
        <Text className="mt-1 text-xs text-black font-semibold">{item.read ? 'Unread' : 'Read'}</Text>
      </Pressable>
      <Pressable 
        onPress={() => deleteOne(item.id)} 
        className="w-20 items-center justify-center bg-red-500"
        disabled={deleteNotificationMutation.isPending}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text className="mt-1 text-xs text-white font-semibold">Delete</Text>
      </Pressable>
    </View>
  );

  const keyExtractor = (item: AppNotification) => item.id;

  const renderItem = ({ item }: SectionListRenderItemInfo<AppNotification, NotificationSection>) => {
    const swipeRef = useRef<React.ComponentRef<typeof Swipeable> | null>(null);
    return (
      <Swipeable ref={swipeRef} renderRightActions={() => renderRightActions(item)} overshootRight={false}>
        <Pressable
          onPress={() => markRead(item.id, true)}
          className="mx-4 my-2 rounded-2xl border-2 border-black bg-white shadow-md overflow-hidden"
          style={{ backgroundColor: item.read ? 'white' : PALE_YELLOW }}
        >
          <View className="flex-row items-start p-4">
            <View className="h-9 w-9 rounded-full items-center justify-center border border-black" style={{ backgroundColor: YELLOW }}>
              {getKindIcon(item.kind)}
            </View>
            <View className="flex-1 ml-3">
              <View className="flex-row items-center">
                {!item.read && <View className="h-2 w-2 rounded-full bg-red-500 mr-2" />}
                <Text className="flex-1 text-base font-semibold text-black">{item.title}</Text>
              </View>
              <Text className="mt-1 text-sm text-black/80">{item.body}</Text>
              <View className="mt-2 flex-row items-center justify-between">
                <Text className="text-xs text-black/60">{formatDateTime(item.createdAt)}</Text>
                <Text className="text-xs text-black/60">{dayjs(item.createdAt).fromNow()}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionListData<AppNotification, NotificationSection> }) => (
    <View className="px-4 pt-4 pb-2 bg-white">
      <Text className="text-xs font-semibold tracking-wider text-black/60">{section.title.toUpperCase()}</Text>
    </View>
  );

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color={YELLOW} />
        <Text className="mt-4 text-base font-semibold text-black">Loading notifications...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-4">
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text className="mt-4 text-base font-semibold text-black text-center">Failed to load notifications</Text>
        <Text className="mt-2 text-sm text-black/60 text-center">Please check your connection and try again</Text>
        <Pressable
          onPress={() => refetch()}
          className="mt-4 px-6 py-3 bg-yellow-400 rounded-xl border-2 border-black"
        >
          <Text className="text-black font-semibold">Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-3">
        {/* <FilterSortBar search={search} setSearch={setSearch} onFilter={() => {}} sort={sort} setSort={setSort} /> */}
        <View className="flex-row items-center justify-between mt-1">
          <Pressable
            onPress={markAllRead}
            className="flex-row items-center px-3 py-2 rounded-xl border-2 border-black bg-yellow-300"
            disabled={markAllReadMutation.isPending}
          >
            <Ionicons name="checkmark-done" size={16} color="#000" />
            <Text className="ml-2 text-xs font-semibold text-black">
              {markAllReadMutation.isPending ? 'Marking...' : 'Mark all as read'}
            </Text>
          </Pressable>
          <Pressable 
            onPress={clearAll} 
            className="flex-row items-center px-3 py-2 rounded-xl border-2 border-black bg-white"
            disabled={clearAllMutation.isPending}
          >
            <Ionicons name="trash-outline" size={16} color="#000" />
            <Text className="ml-2 text-xs font-semibold text-black">
              {clearAllMutation.isPending ? 'Clearing...' : 'Clear all'}
            </Text>
          </Pressable>
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        refreshing={isRefetching}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-24">
            <View className="h-16 w-16 rounded-full items-center justify-center border-2 border-black bg-yellow-300">
              <Ionicons name="notifications-outline" size={28} color="#000" />
            </View>
            <Text className="mt-4 text-base font-semibold text-black">No notifications yet</Text>
            <Text className="mt-1 text-sm text-black/60">We'll show updates about orders and warranties here.</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
