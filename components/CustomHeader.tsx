import BellWithNotification from '@/components/NotificationBell';
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
        <View style={{ position: 'absolute', right: 10, top: -3 }}>
          {/* <BellWithNotification /> */}
          {!HIDE_BELL_ON.includes(route.name) && (
            <BellWithNotification />
          )}
        </View>
      </View>
    </View>
  );
}

type CustomMainHeaderProps = DrawerHeaderProps & { bellTarget?: string };

export function CustomMainHeader({ navigation, route, options, bellTarget }: CustomMainHeaderProps) {
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
        <View style={{ position: 'absolute', right: 10, top: -3 }}>
          <BellWithNotification target={bellTarget} />
        </View>
      </View>
    </View>
  );
}
