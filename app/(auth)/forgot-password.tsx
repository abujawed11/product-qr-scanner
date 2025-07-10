import api from '@/utils/api';
import axios from 'axios';
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

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
    const [loading, setLoading] = useState(false);

    const handleSendOTP = async () => {
        try {
            setLoading(true);
            // await api.post('/send-otp/', { email });
            await api.post('/send-otp/', {
                email: email,
                purpose: 'reset', // or 'register'
            });
            Alert.alert('OTP Sent', 'Please check your email for the OTP.');
            setStep('otp');
        } catch (err) {
            // Alert.alert(String(err), 'Failed to send OTP.');
            // console.log('OTP send error:', err.response?.data);
            // const errorMessage =
            //     err.response?.data?.error || 'Failed to send OTP. Please try again.';
            // Alert.alert('Error', errorMessage);
            let errorMessage = 'Failed to send OTP. Please try again.';

            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            }

            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setLoading(true);
            await api.post('/verify-otp/', { email, otp });
            setStep('reset');
        } catch (err) {
            Alert.alert('Error', 'Invalid or expired OTP.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            await api.post('/reset-password/', {
                email,
                password: newPassword,
            });
            Alert.alert('Success', 'Password has been reset.');
            router.replace('/'); // Navigate to login screen
        } catch (err) {
            Alert.alert('Error', 'Failed to reset password.');
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
                    <Text className="text-yellow-500 text-3xl font-bold mb-6 text-center">
                        Forgot Password
                    </Text>

                    {step === 'email' && (
                        <>
                            <FloatingInput label="Email" value={email} setValue={setEmail} />
                            <TouchableOpacity
                                className="bg-yellow-500 rounded-lg py-3 my-3"
                                onPress={handleSendOTP}
                                disabled={loading}
                            >
                                <Text className="text-black text-center font-bold">Send OTP</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 'otp' && (
                        <>
                            <FloatingInput label="OTP" value={otp} setValue={setOtp} />
                            <TouchableOpacity
                                className="bg-yellow-500 rounded-lg py-3 my-3"
                                onPress={handleVerifyOTP}
                                disabled={loading}
                            >
                                <Text className="text-black text-center font-bold">Verify OTP</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 'reset' && (
                        <>
                            <FloatingInput
                                label="New Password"
                                value={newPassword}
                                setValue={setNewPassword}
                                secureTextEntry
                            />
                            <FloatingInput
                                label="Confirm Password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity
                                className="bg-yellow-500 rounded-lg py-3 my-3"
                                onPress={handleResetPassword}
                                disabled={loading}
                            >
                                <Text className="text-black text-center font-bold">Reset Password</Text>
                            </TouchableOpacity>

                        </>
                    )}
                    <TouchableOpacity
                        className="mt-4"
                        onPress={() => router.push('/login')} // Adjust this as per your router/navigation setup
                    >
                        <Text className="text-center text-sm text-gray-600">
                            Go Back to <Text className="text-yellow-600 font-bold">Login</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
