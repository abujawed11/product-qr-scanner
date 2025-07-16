// import api from '@/utils/api';
// import { BASE_URL } from '@/utils/constants';
// import axios from 'axios';
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
//         <View className="w-full border border-gray-300 rounded-md px-3  mb-4 bg-white">
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

// export default function RegisterScreen() {
//     const [customerId, setCustomerId] = useState('');
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [otpSent, setOtpSent] = useState(false);
//     const [loading, setLoading] = useState(false);
//     // const [message, setMessage] = useState('');

//     const sendOTP = async () => {
//         try {
//             console.log("Sending OTP to:", email);
//             setLoading(true);

//             // const res = await axios.post(`${BASE_URL}/send-otp/`, { email });
//             await api.post('/send-otp/', {
//                 email: email,
//                 purpose: 'register', // or 'reset'
//             });
//             setOtpSent(true);
//             // console.log(res)
//             Alert.alert('OTP sent successfully');
//             // console.log("Sending OTP success");
//         } catch (err: any) {
//             // setMessage(err.response?.data?.error || 'Failed to send OTP.');
//             Alert.alert(err.response?.data?.error || 'Failed to send OTP.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const register = async () => {
//         if (password !== confirmPassword) {
//             // return setMessage('Passwords do not match');
//             Alert.alert('Passwords do not match');
//         }

//         try {
//             setLoading(true);
//             const res = await axios.post(`${BASE_URL}/register/`, {
//                 customer_id: customerId,
//                 username,
//                 email,
//                 password,
//                 otp,
//             });

//             Alert.alert("Success", "Registration successful!", [
//                 { text: "Login Now", onPress: () => router.replace("/(auth)/login") },
//             ]);

//             // setMessage('Registration successful. Please login.');
//         } catch (err: any) {
//             // setMessage(err.response?.data?.error || 'Registration failed.');
//             Alert.alert(err.response?.data?.error || 'Registration failed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         // <View className="flex-1 bg-white px-6 justify-center">
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
//                     <Text className="text-yellow-500 text-3xl font-bold mb-6 text-center">Register</Text>

//                     <FloatingInput label="Customer ID" value={customerId} setValue={setCustomerId} />
//                     <FloatingInput label="Username" value={username} setValue={setUsername} />
//                     <FloatingInput label="Email" value={email} setValue={setEmail} />
//                     <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />
//                     <FloatingInput
//                         label="Confirm Password"
//                         value={confirmPassword}
//                         setValue={setConfirmPassword}
//                         secureTextEntry
//                     />

//                     {!otpSent ? (
//                         <TouchableOpacity
//                             className="bg-yellow-500 rounded-lg py-3 my-3"
//                             onPress={sendOTP}
//                             disabled={loading}
//                         >
//                             <Text className="text-black text-center font-bold">Send OTP</Text>
//                         </TouchableOpacity>
//                     ) : (
//                         <>
//                             <FloatingInput label="Enter OTP" value={otp} setValue={setOtp} />
//                             <TouchableOpacity
//                                 className="bg-yellow-500 rounded-lg py-3 my-3"
//                                 onPress={register}
//                                 disabled={loading}
//                             >
//                                 <Text className="text-black text-center font-bold">Register</Text>
//                             </TouchableOpacity>

//                         </>
//                     )}
//                     <TouchableOpacity
//                         className="mt-4"
//                         onPress={() => router.push('/login')} // Adjust this as per your router/navigation setup
//                     >
//                         <Text className="text-center text-sm text-gray-600">
//                             Already have an account? <Text className="text-yellow-600 font-semibold">Login</Text>
//                         </Text>
//                     </TouchableOpacity>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }


import api from '@/utils/api';
import { BASE_URL } from '@/utils/constants';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
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

const BACKGROUND_COLOR = '#FAD90E';

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

export default function RegisterScreen() {
    const [clientId, setClientId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOTP = async () => {
        try {
            setLoading(true);
            await api.post('/send-otp/', {
                email: email,
                purpose: 'register',
            });
            setOtpSent(true);
            Alert.alert('OTP sent successfully');
        } catch (err: any) {
            Alert.alert(err.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${BASE_URL}/register/`, {
                client_id: clientId,
                username,
                email,
                password,
                otp,
            });

            Alert.alert('Success', 'Registration successful!', [
                { text: 'Login Now', onPress: () => router.replace('/(auth)/login') },
            ]);
        } catch (err: any) {
            Alert.alert(err.response?.data?.error || 'Registration failed.');
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
                        paddingBottom: 40,
                        flexGrow: 1,
                        paddingTop: 80,
                        justifyContent: 'flex-start',
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
                        Register
                    </Text>

                    <FloatingInput label="Client ID" value={clientId} setValue={setClientId} />
                    <FloatingInput label="Username" value={username} setValue={setUsername} />
                    <FloatingInput label="Email" value={email} setValue={setEmail} />
                    <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />
                    <FloatingInput
                        label="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        secureTextEntry
                    />

                    {!otpSent ? (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'black',
                                paddingVertical: 14,
                                borderRadius: 10,
                                marginBottom: 20,
                            }}
                            onPress={sendOTP}
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
                                Send OTP
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <FloatingInput label="Enter OTP" value={otp} setValue={setOtp} />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'black',
                                    paddingVertical: 14,
                                    borderRadius: 10,
                                    marginBottom: 20,
                                }}
                                onPress={register}
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
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>
                            Already have an account?{' '}
                            <Text style={{ fontWeight: 'bold' }}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}