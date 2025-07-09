import { BASE_URL } from '@/utils/constants';
import axios from 'axios';
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
        <View className="w-full border border-gray-300 rounded-md px-3  mb-4 bg-white">
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

export default function RegisterScreen() {
    const [customerId, setCustomerId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendOTP = async () => {
        try {
            console.log("Sending OTP to:", email);
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/send-otp/`, { email });
            setOtpSent(true);
            Alert.alert('OTP sent successfully');
            // console.log("Sending OTP success");
        } catch (err: any) {
            // setMessage(err.response?.data?.error || 'Failed to send OTP.');
            Alert.alert(err.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        if (password !== confirmPassword) {
            return setMessage('Passwords do not match');
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/register/`, {
                customer_id: customerId,
                username,
                email,
                password,
                otp,
            });

            setMessage('Registration successful. Please login.');
        } catch (err: any) {
            setMessage(err.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        // <View className="flex-1 bg-white px-6 justify-center">
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
                    <Text className="text-yellow-500 text-3xl font-bold mb-6 text-center">Register</Text>

                    <FloatingInput label="Customer ID" value={customerId} setValue={setCustomerId} />
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
                            className="bg-yellow-500 rounded-lg py-3 my-3"
                            onPress={sendOTP}
                            disabled={loading}
                        >
                            <Text className="text-black text-center font-bold">Send OTP</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <FloatingInput label="Enter OTP" value={otp} setValue={setOtp} />
                            <TouchableOpacity
                                className="bg-yellow-500 rounded-lg py-3 my-3"
                                onPress={register}
                                disabled={loading}
                            >
                                <Text className="text-black text-center font-bold">Register</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {message ? <Text className="text-center text-red-500 mt-2">{message}</Text> : null}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
