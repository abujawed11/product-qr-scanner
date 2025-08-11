
import api from '@/utils/api';
import { BASE_URL } from '@/utils/constants';
import { THEME } from '@/utils/theme';
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

const FloatingInput = ({
    label,
    value,
    setValue,
    secureTextEntry = false,
    editable = true,
}: {
    label: string;
    value: string;
    setValue: (val: string) => void;
    secureTextEntry?: boolean;
    editable?: boolean;
}) => {
    const isFocused = value !== '';
    const labelStyle = twMerge(
        'absolute left-3 text-sm transition-all',
        isFocused ? `top-1 font-semibold` : 'top-3 text-gray-500',
        isFocused ? 'text-yellow-500' : 'text-gray-500'
    );

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View 
            className={`w-full border border-gray-300 rounded-md px-3 mb-4 ${editable ? 'bg-white' : 'bg-gray-100'}`} 
            style={{ position: 'relative' }}
        >
            <Text className={labelStyle}>{label}</Text>
            <TextInput
                className={`mt-3 pb-3 pt-3 ${editable ? 'text-black' : 'text-gray-500'}`}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry && !showPassword}
                placeholder=""
                placeholderTextColor={THEME.colors.placeholder}
                editable={editable}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -10 }] }}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color={THEME.colors.gray[500]}
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
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }
        
        try {
            setLoading(true);
            await api.post('/send-otp/', {
                email: email,
                purpose: 'register',
            });
            setOtpSent(true);
            Alert.alert('OTP Sent', 'Please check your email for the verification code');
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };

    const changeEmail = () => {
        setOtpSent(false);
        setOtp('');
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
        <View style={{ flex: 1, backgroundColor: THEME.colors.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <ScrollView
                    contentContainerStyle={{
                        padding: THEME.spacing[5],
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
                            fontSize: THEME.typography.fontSizes['2xl'],
                            fontWeight: THEME.typography.fontWeights.bold,
                            color: THEME.colors.text.primary,
                            textAlign: 'center',
                            marginBottom: 30,
                        }}
                    >
                        Register
                    </Text>

                    <FloatingInput label="Client ID" value={clientId} setValue={setClientId} />
                    <FloatingInput label="Username" value={username} setValue={setUsername} />
                    <FloatingInput 
                        label="Email" 
                        value={email} 
                        setValue={setEmail} 
                        editable={!otpSent}
                    />
                    <FloatingInput label="Password" value={password} setValue={setPassword} secureTextEntry />
                    <FloatingInput
                        label="Confirm Password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        secureTextEntry
                    />

                    {otpSent && (
                        <View style={{ 
                            marginBottom: 16, 
                            padding: 12, 
                            backgroundColor: THEME.colors.primary + '30', 
                            borderRadius: THEME.borderRadius.lg, 
                            borderColor: THEME.colors.black, 
                            borderWidth: 1 
                        }}>
                            <Text style={{ 
                                color: THEME.colors.black, 
                                fontSize: THEME.typography.fontSizes.sm, 
                                fontWeight: THEME.typography.fontWeights.semibold 
                            }}>
                                ✅ OTP sent to {email}
                            </Text>
                            <TouchableOpacity onPress={changeEmail} style={{ marginTop: 6 }}>
                                <Text style={{ 
                                    color: THEME.colors.black, 
                                    fontSize: THEME.typography.fontSizes.sm, 
                                    fontWeight: THEME.typography.fontWeights.bold, 
                                    textDecorationLine: 'underline' 
                                }}>
                                    Change email address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!otpSent ? (
                        <TouchableOpacity
                            style={{
                                backgroundColor: THEME.colors.black,
                                paddingVertical: THEME.spacing[3] + 2,
                                borderRadius: THEME.borderRadius.lg + 2,
                                marginBottom: THEME.spacing[5],
                            }}
                            onPress={sendOTP}
                            disabled={loading}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: THEME.typography.fontWeights.bold,
                                    color: THEME.colors.background,
                                    fontSize: THEME.typography.fontSizes.base,
                                }}
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <FloatingInput label="Enter OTP" value={otp} setValue={setOtp} />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: THEME.colors.black,
                                    paddingVertical: THEME.spacing[3] + 2,
                                    borderRadius: THEME.borderRadius.lg + 2,
                                    marginBottom: THEME.spacing[5],
                                }}
                                onPress={register}
                                disabled={loading}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontWeight: THEME.typography.fontWeights.bold,
                                        color: THEME.colors.background,
                                        fontSize: THEME.typography.fontSizes.base,
                                    }}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}

                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => router.push('/login')}
                    >
                        <Text style={{ 
                            textAlign: 'center', 
                            fontSize: THEME.typography.fontSizes.sm, 
                            color: THEME.colors.text.primary,
                            fontWeight: THEME.typography.fontWeights.bold
                        }}>
                            Already have an account?{' '}
                            <Text style={{ fontWeight: THEME.typography.fontWeights.extrabold }}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}