import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';


type FloatingInputProps = {
  label: string;
  value: string;
  setValue: (val: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType']; // <- ADD THIS
};

const FloatingInput = ({
  label,
  value,
  setValue,
  secureTextEntry = false,
  keyboardType = 'default', // <- ADD DEFAULT
}: FloatingInputProps) => {
  const isFocused = value !== '';
  const labelStyle = twMerge(
    'absolute left-3 text-xs transition-all',
    isFocused ? 'top-1 text-yellow-500' : 'top-3 text-gray-400'
  );

  return (
    <View className="w-full border border-gray-300 rounded-md px-3 mb-4 bg-white">
      <Text className={labelStyle}>{label}</Text>
      <TextInput
        className="text-black mt-4"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        placeholder=""
        placeholderTextColor="#ccc"
        keyboardType={keyboardType} // <- PASS IT HERE
      />
    </View>
  );
};

export default FloatingInput;
