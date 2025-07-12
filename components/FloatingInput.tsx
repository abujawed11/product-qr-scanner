// // components/FloatingInput.tsx
// import React, { useEffect, useState } from 'react';
// import {
//     Animated,
//     TextInput,
//     TextInputProps,
//     View
// } from 'react-native';

// interface FloatingInputProps extends TextInputProps {
//   label: string;
// }


// export default function FloatingInput({ label, value, ...props }: FloatingInputProps) {
//   const [isFocused, setIsFocused] = useState(false);
//   const animatedIsFocused = new Animated.Value(value ? 1 : 0);

//   useEffect(() => {
//     Animated.timing(animatedIsFocused, {
//       toValue: isFocused || value ? 1 : 0,
//       duration: 150,
//       useNativeDriver: false,
//     }).start();
//   }, [isFocused, value]);

//   const labelStyle = {
//     position: 'absolute' as const,
//     left: 12,
//     top: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: [18, -10],
//     }),
//     fontSize: animatedIsFocused.interpolate({
//       inputRange: [0, 1],
//       outputRange: [16, 12],
//     }),
//     color: '#facc15',
//     backgroundColor: '#000',
//     paddingHorizontal: 4,
//   };

//   return (
//     <View style={{ marginBottom: 20, paddingTop: 10 }}>
//       <Animated.Text style={labelStyle}>{label}</Animated.Text>
//       <TextInput
//         {...props}
//         value={value}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         className="text-black bg-white border border-yellow-400 rounded-xl px-4 py-3"
//         placeholderTextColor="#000000ff"
//       />
//     </View>
//   );
// }

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
