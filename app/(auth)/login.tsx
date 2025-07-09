import { useAuth } from '@/context/AuthContext'; // Assuming you placed AuthContext in context/AuthContext.tsx
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

const FloatingInput = ({
    label,
    value,
    setValue,
    secureTextEntry = false,
}: {
    label: string;
    value: string;
    setValue: (val: string) => void;
    secureTextEntry?: boolean;
}) => {
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
            />
        </View>
    );
};

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            setLoading(true);
            await login(username, password); // Calls AuthContext login
            // If login throws or handles errors internally, you may not need to check res.success
            // Optionally, you can set a message here if login returns nothing
            router.replace("/dashboard");
        } catch (err: any) {
            console.error('Login error:', err);
      
            Alert.alert('Login Failed', err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }} className="bg-yellow-100">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        paddingBottom: 40,
                        flexGrow: 1,
                        paddingTop: 80,
                        justifyContent: 'flex-start',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="text-yellow-500 text-3xl font-bold mb-6 text-center">Login</Text>

                    <FloatingInput label="Username" value={username} setValue={setUsername} />
                    <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />

                    <TouchableOpacity
                        className="bg-yellow-500 rounded-lg py-3 my-3"
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text className="text-black text-center font-bold">Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mt-4"
                        onPress={() => router.push('/register')} // Adjust this as per your router/navigation setup
                    >
                        <Text className="text-center text-sm text-gray-600">
                            Don’t have an account? <Text className="text-yellow-600 font-semibold">Register</Text>
                        </Text>
                    </TouchableOpacity>

                    
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
