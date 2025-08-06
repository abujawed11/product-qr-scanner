// // components/CustomHeader.tsx
// import { UNIFORM_HEADER_HEIGHT } from '@/utils/headerHight'; // Import the uniform header height
// import { Ionicons } from '@expo/vector-icons';
// import { DrawerHeaderProps } from '@react-navigation/drawer';
// import { DrawerActions } from '@react-navigation/native';
// import { NativeStackHeaderProps } from '@react-navigation/native-stack';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// export default function CustomHeader({ navigation, route, options }: NativeStackHeaderProps) {
//   const title = options.title ?? route.name;

//   return (
//     <View
//       style={{
//         height: UNIFORM_HEADER_HEIGHT,
//         backgroundColor: '#facc15',
//         paddingHorizontal: 16,
//         elevation: 4,
//         justifyContent: 'flex-start',
//         paddingTop: 45, // 👈 shifts icon + text down
//       }}
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TouchableOpacity
//           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           style={{ paddingRight: 10 }}
//         >
//           <Ionicons name="menu" size={24} color="black" />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 20,
//             fontWeight: '600',
//             color: 'black',
//             marginLeft: 8,
//           }}
//         >
//           {title}
//         </Text>
//       </View>
//     </View>
//   );
// }


// export function CustomMainHeader({ navigation, route, options }: DrawerHeaderProps) {
//   const title = options.title ?? route.name;

//   return (
//     <View
//       style={{
//         height: UNIFORM_HEADER_HEIGHT,
//         backgroundColor: '#facc15',
//         paddingHorizontal: 16,
//         elevation: 4,
//         justifyContent: 'flex-start',
//         paddingTop: 45, // ✅ Push title downward
//       }}
//     >
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         <TouchableOpacity
//           onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//           style={{ paddingRight: 10 }}
//         >
//           <Ionicons name="menu" size={24} color="black" />
//         </TouchableOpacity>
//         <Text
//           style={{
//             fontSize: 20,
//             fontWeight: '600',
//             color: 'black',
//             marginLeft: 8,
//           }}
//         >
//           {title}
//         </Text>
//       </View>
//     </View>
//   );
// }




// components/CustomHeader.tsx
import BellWithNotification from '@/components/NotificationBell'; // ✅ Import your bell component
import { UNIFORM_HEADER_HEIGHT } from '@/utils/headerHight';
import { Ionicons } from '@expo/vector-icons';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const HIDE_BELL_ON = [
  'claim-form',
  'claim-media-wizard',
  'claim-steps',
];

export default function CustomHeader({ navigation, route, options }: NativeStackHeaderProps) {
  const title = options.title ?? route.name;

  return (
    <View
      style={{
        height: UNIFORM_HEADER_HEIGHT,
        backgroundColor: '#facc15',
        paddingHorizontal: 16,
        elevation: 4,
        justifyContent: 'flex-start',
        paddingTop: 45,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left section: Menu + Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ paddingRight: 10 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'black',
              marginLeft: 8,
            }}
          >
            {title}
          </Text>
        </View>

        {/* Right section: Bell */}
        {/* <BellWithNotification /> */}
        {/* Right section: Bell - absolutely positioned */}
        <View style={{ position: 'absolute', right: 16, top: -3 }}>
          {/* <BellWithNotification /> */}
          {!HIDE_BELL_ON.includes(route.name) && (
            <BellWithNotification />
          )}
        </View>
      </View>
    </View>
  );
}

export function CustomMainHeader({ navigation, route, options }: DrawerHeaderProps) {
  const title = options.title ?? route.name;

  return (
    <View
      style={{
        height: UNIFORM_HEADER_HEIGHT,
        backgroundColor: '#facc15',
        paddingHorizontal: 16,
        elevation: 4,
        justifyContent: 'flex-start',
        paddingTop: 45,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left section: Menu + Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ paddingRight: 10 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: 'black',
              marginLeft: 8,
            }}
          >
            {title}
          </Text>
        </View>

        {/* Right section: Bell */}
        {/* <BellWithNotification /> */}
        <View style={{ position: 'absolute', right: 16, top: -3 }}>
          <BellWithNotification />
        </View>
      </View>
    </View>
  );
}
