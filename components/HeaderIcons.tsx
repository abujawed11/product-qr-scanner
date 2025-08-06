// components/HeaderIcons.tsx

import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';

export const ICON_WIDTH = 44;

export const MenuButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ width: ICON_WIDTH, justifyContent: 'center', alignItems: 'center' }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityLabel="Open drawer"
    >
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
};

// Placeholder to reserve space in headerLeft
export const MenuPlaceholder = () => (
  <View style={{ width: ICON_WIDTH }} />
);
