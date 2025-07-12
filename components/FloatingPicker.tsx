import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';
import { twMerge } from 'tailwind-merge';


type FloatingPickerProps = {
  label: string;
  selectedValue: string;
  onValueChange: (val: string) => void;
  items: { label: string; value: string }[];
};

const FloatingPicker = ({
  label,
  selectedValue,
  onValueChange,
  items,
}: FloatingPickerProps) => {
  const isFocused = selectedValue !== '';
  const labelStyle = twMerge(
    'absolute left-3 text-xs transition-all bg-white px-1',
    isFocused ? 'top-1 text-yellow-500' : 'top-3 text-gray-400'
  );

  return (
    <View className="relative border border-gray-300 rounded-md px-2 mb-4 bg-white">
      <Text className={labelStyle}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: 'black', marginTop: 8 }}
        dropdownIconColor="black"
      >
        <Picker.Item label="Select an option" value="" />
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default FloatingPicker;
