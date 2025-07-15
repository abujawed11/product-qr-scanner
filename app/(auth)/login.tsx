// import { useAuth } from '@/context/AuthContext'; // Assuming you placed AuthContext in context/AuthContext.tsx
// import { router } from 'expo-router';
// import { useState } from 'react';
// import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { twMerge } from 'tailwind-merge';

// const FloatingInput = ({
//     label,
//     value,
//     setValue,
//     secureTextEntry = false,
// }: {
//     label: string;
//     value: string;
//     setValue: (val: string) => void;
//     secureTextEntry?: boolean;
// }) => {
//     const isFocused = value !== '';
//     const labelStyle = twMerge(
//         'absolute left-3 text-xs transition-all',
//         isFocused ? 'top-1 text-yellow-500' : 'top-3 text-gray-400'
//     );

//     return (
//         <View className="w-full border border-gray-300 rounded-md px-3 mb-4 bg-white">
//             <Text className={labelStyle}>{label}</Text>
//             <TextInput
//                 className="text-black mt-4"
//                 value={value}
//                 onChangeText={setValue}
//                 secureTextEntry={secureTextEntry}
//                 placeholder=""
//                 placeholderTextColor="#ccc"
//             />
//         </View>
//     );
// };

// export default function LoginScreen() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     // const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const { login } = useAuth();

//     const handleLogin = async () => {
//         try {
//             setLoading(true);
//             await login(username, password); // Calls AuthContext login
//             // If login throws or handles errors internally, you may not need to check res.success
//             // Optionally, you can set a message here if login returns nothing
//             router.replace("/dashboard");
//         } catch (err: any) {
//             console.error('Login error:', err);

//             Alert.alert('Login Failed', err.message || 'Invalid credentials');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={{ flex: 1 }} className="bg-yellow-100">
//             <KeyboardAvoidingView
//                 style={{ flex: 1 }}
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//             >
//                 <ScrollView
//                     contentContainerStyle={{
//                         padding: 20,
//                         paddingBottom: 40,
//                         flexGrow: 1,
//                         paddingTop: 80,
//                         justifyContent: 'flex-start',
//                     }}
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <Text className="text-yellow-500 text-3xl font-bold mb-6 text-center">Login</Text>

//                     <FloatingInput label="Username" value={username} setValue={setUsername} />
//                     <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />

//                     <TouchableOpacity
//                         className="bg-yellow-500 rounded-lg py-3 my-3"
//                         onPress={handleLogin}
//                         disabled={loading}
//                     >
//                         <Text className="text-black text-center font-bold">Login</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         className="mt-4"
//                         onPress={() => router.push('/register')} // Adjust this as per your router/navigation setup
//                     >
//                         <Text className="text-center text-sm text-gray-600">
//                             Don’t have an account? <Text className="text-yellow-600 font-semibold">Register</Text>
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => router.push('/forgot-password')}>
//                         <Text className="text-yellow-600 text-center font-semibold py-2">Forgot Password?</Text>
//                     </TouchableOpacity>



//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }


import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import { BACKGROUND_COLOR } from '@/utils/color'; // Adjust the import path as needed

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
        'absolute left-3 text-sm transition-all',
        isFocused ? `top-1 text-[${BACKGROUND_COLOR}] font-semibold` : 'top-3 text-gray-500'
    );

    // FIX: Start hidden if it's a password field
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full border border-gray-300 rounded-md px-3 mb-4 bg-white" style={{ position: 'relative' }}>
            <Text className={labelStyle}>{label}</Text>
            <TextInput
                className="text-black mt-3 pb-3 pt-3"
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry && !showPassword}
                placeholder=""
                placeholderTextColor="#ccc"
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -10 }] }}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, login } = useAuth();

    // ✅ Redirect based on updated user after login
    useEffect(() => {
        if (user) {
            if (user.account_type === 'admin') {
                console.log("Account Type",user.account_type)
                router.replace('/(adminDashboard)');
            } else {
                console.log("Account Type",user.account_type)
                router.replace('/dashboard');
            }
        }
    }, [user]);

    const handleLogin = async () => {
        try {
            setLoading(true);
            await login(username, password);
            // // router.replace('/dashboard');
            // if (user?.account_type === 'admin') {
            //     console.log(user.account_type)
            //     router.replace('/(adminDashboard)');
            // } else {
            //     router.replace('/dashboard');
            // }
        } catch (err: any) {
            console.error('Login error:', err);
            Alert.alert('Login Failed', err.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: 20,
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            marginBottom: 30,
                        }}
                    >
                        Login
                    </Text>

                    <FloatingInput label="Email" value={username} setValue={setUsername} />
                    <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'black',
                            paddingVertical: 14,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: BACKGROUND_COLOR,
                                fontSize: 16,
                            }}
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/register')} style={{ marginBottom: 10 }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: 14,
                            }}
                        >
                            Don’t have an account? <Text style={{ fontWeight: '900' }}>Register</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/forgot-password')}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontWeight: '900',
                                color: 'black',
                                fontSize: 14,
                            }}
                        >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}