// components/BellWithNotification.tsx

// import { NotificationContext } from '@/context/NotificationContext';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { TouchableOpacity } from 'react-native';

// const BellWithNotification = () => {
//     // const { unread } = useContext(NotificationContext);
//     const router = useRouter();

//     return (

//         <TouchableOpacity
//             onPress={() => router.push('/notifications')}
//             style={{ marginRight: 15 }}
//         >
//             <Ionicons name="notifications-outline" size={24} color="black" />
//             {/* {unread > 0 && (
//                 <View className="absolute top-0 right-0.5 w-2.5 h-2.5 rounded-full bg-red-500" />
//             )} */}
//         </TouchableOpacity>
//     );
// };

// export default BellWithNotification;



// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { TouchableOpacity } from 'react-native';

// type BellProps = {
//   target?: string;
// };

// const BellWithNotification = ({ target }: BellProps) => {
//   // const { unread } = useContext(NotificationContext);
//   const router = useRouter();

//   return (
//     <TouchableOpacity
//       onPress={() => router.push((target ?? '/(main)/notifications') as any)}
//       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} // fill container, no margin!
//       hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
//       accessibilityLabel="Notifications"
//     >
//       <Ionicons name="notifications-outline" size={24} color="black" />
//       {/* Example for badge (unread count > 0) */}
//       {/* {unread > 0 && (
//         <View style={{
//           position: 'absolute',
//           top: 1,
//           right: 1,
//           width: 10,
//           height: 10,
//           borderRadius: 5,
//           backgroundColor: 'red'
//         }} />
//       )} */}
//     </TouchableOpacity>
//   );
// };

// export default BellWithNotification;



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


