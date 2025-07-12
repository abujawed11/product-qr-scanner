// components/FloatingInput.tsx
import React, { useEffect, useState } from 'react';
import {
    Animated,
    TextInput,
    TextInputProps,
    View
} from 'react-native';

interface FloatingInputProps extends TextInputProps {
  label: string;
}

export default function FloatingInput({ label, value, ...props }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: '#facc15',
    backgroundColor: '#000',
    paddingHorizontal: 4,
  };

  return (
    <View style={{ marginBottom: 20, paddingTop: 10 }}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TextInput
        {...props}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="text-black bg-white border border-yellow-400 rounded-xl px-4 py-3"
        placeholderTextColor="#000000ff"
      />
    </View>
  );
}
