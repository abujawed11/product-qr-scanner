// app/(main)/dashboard/qr-scanner.tsx


import { useRefresh } from '@/context/RefreshContext';
import api from '@/utils/api';
import { Entypo, Feather } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker'; // Import document picker
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    BackHandler,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SCAN_BOX_SIZE = width * 0.7;
const SCAN_BOX_TOP = (height - SCAN_BOX_SIZE) / 4;
const YELLOW = '#FAD90E';
const OVERLAY_COLOR = 'rgba(0,0,0,0.6)';

const QRScanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torchEnabled, setTorchEnabled] = useState(false); // State for torch
    const isFocused = useIsFocused();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { triggerRefresh } = useRefresh();

    useFocusEffect(
        React.useCallback(() => {
            setScanned(false); // Reset scanner on focus
            setTorchEnabled(false); // Reset torch on focus

            const onBackPress = () => {
                router.replace('/(main)/dashboard');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        requestPermission();
    }, []);


    const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
        if (scanned) return;
        setScanned(true);

        // Simulate that QR is only valid when inside the yellow box
        setTimeout(() => {
            processScannedData(result);
        }, 900); // Wait 700ms for user to center QR
    };


    const processScannedData = async (result: BarcodeScanningResult) => {
        try {
            const parsed = JSON.parse(result.data);
            const { kit_id, prod_unit, warehouse, project_id, date } = parsed;

            if (!kit_id || !prod_unit || !warehouse || !project_id || !date) {
                throw new Error('Missing required fields in QR code.');
            }

            const res = await api.post('/save-order/', {
                kit_id,
                prod_unit,
                warehouse,
                project_id,
                date
            });

            // Normal scan
            if (res.data.scan_id && !res.data.all_scanned) {
                queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
                queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
                queryClient.invalidateQueries({ queryKey: ["myOrders"] });

                router.push({
                    pathname: '/(main)/kit-details',
                    params: { scan_id: res.data.scan_id, all_scanned: "false" }
                });
            }
            // All scanned case: route to kit-details, but with all_scanned info
            else if (res.data.scan_id && res.data.all_scanned) {
                router.push({
                    pathname: '/(main)/kit-details',
                    params: {
                        scan_id: res.data.scan_id,
                        all_scanned: "true",
                        total_kits: res.data.total_kits || "" // for display
                    }
                });
            }
            // Handle unauthorized as before
            else if (res.data.kit_id) {
                router.push({
                    pathname: '/(main)/kit-details',
                    params: { kit_id: res.data.kit_id }
                });
            }
            else {
                throw new Error('Unexpected server response.');
            }
        } catch (err) {
            console.error(err);
            let errorMessage = 'Invalid QR code or server error.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            }
            Alert.alert('Error', errorMessage);
            setScanned(false);
        }
    };




    // Function to toggle torch
    const toggleTorch = () => {
        setTorchEnabled(prev => !prev);
    };

    // Function to handle file upload

    const handleUploadQR = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
            });

            if (result.canceled) return;

            const { uri, mimeType } = result.assets[0];

            if (!mimeType?.startsWith('image/')) {
                Alert.alert('Error', 'Please select an image file.');
                return;
            }

            const formData = new FormData();
            formData.append('file', {
                uri,
                name: uri.split('/').pop() || 'qr_image.jpg',
                type: mimeType,
            } as any);

            const response = await api.post('/upload-qr/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 300000, // 5 minutes for file upload
            });

            // For normal scan
            if (response.data.scan_id && !response.data.all_scanned) {
                queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
                queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
                queryClient.invalidateQueries({ queryKey: ["myOrders"] });


                router.push({
                    pathname: '/(main)/kit-details',
                    params: { scan_id: response.data.scan_id, all_scanned: "false" }
                });
            }
            // All kits already scanned
            else if (response.data.scan_id && response.data.all_scanned) {
                router.push({
                    pathname: '/(main)/kit-details',
                    params: {
                        scan_id: response.data.scan_id,
                        all_scanned: "true",
                        total_kits: response.data.total_kits || ""
                    }
                });
            }
            // Unauthorized or other handled server condition
            else if (response.data.kit_id) {
                router.push({
                    pathname: '/(main)/kit-details',
                    params: { kit_id: response.data.kit_id }
                });
            }
            // Unexpected
            else {
                throw new Error('Unexpected server response.');
            }
        } catch (err) {
            console.error(err);
            let errorMessage = 'Invalid QR code or server error.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            }
            Alert.alert('Error', errorMessage);
            setScanned(false);
        }
    };


    if (!permission?.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-base">Camera permission not granted.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            {isFocused && (
                <CameraView
                    style={{ flex: 1 }}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    enableTorch={torchEnabled} // Use enableTorch prop
                />
            )}

            {/* Title - "Scan BlueBase" */}
            <View className="absolute top-12 w-full items-center">
                <Text style={{ color: YELLOW, fontWeight: '900', fontSize: 20 }}>
                    Scan BlueBase
                </Text>
            </View>

            {/* Dark overlay blur simulation */}
            <View className="absolute inset-0">
                {/* Top */}
                <View style={{ height: SCAN_BOX_TOP, backgroundColor: OVERLAY_COLOR }} />

                {/* Middle */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: (width - SCAN_BOX_SIZE) / 2, backgroundColor: OVERLAY_COLOR }} />

                    {/* Scan Box with Corners */}
                    <View style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}>
                        <View
                            className="absolute top-0 left-0 w-6 h-6 rounded-tl-lg"
                            style={{ borderTopWidth: 4, borderLeftWidth: 4, borderColor: YELLOW }}
                        />
                        <View
                            className="absolute top-0 right-0 w-6 h-6 rounded-tr-lg"
                            style={{ borderTopWidth: 4, borderRightWidth: 4, borderColor: YELLOW }}
                        />
                        <View
                            className="absolute bottom-0 left-0 w-6 h-6 rounded-bl-lg"
                            style={{ borderBottomWidth: 4, borderLeftWidth: 4, borderColor: YELLOW }}
                        />
                        <View
                            className="absolute bottom-0 right-0 w-6 h-6 rounded-br-lg"
                            style={{ borderBottomWidth: 4, borderRightWidth: 4, borderColor: YELLOW }}
                        />
                    </View>

                    <View style={{ width: (width - SCAN_BOX_SIZE) / 2, backgroundColor: OVERLAY_COLOR }} />
                </View>

                {/* Bottom */}
                <View style={{ flex: 1, backgroundColor: OVERLAY_COLOR }} />
            </View>

            {/* Upload QR and Torch */}
            <View className="absolute bottom-28 w-full flex-row justify-center gap-x-12">
                <TouchableOpacity className="items-center" onPress={handleUploadQR}>
                    <Feather name="image" size={24} color={YELLOW} />
                    <Text style={{ color: YELLOW, marginTop: 4, fontSize: 14 }}>Upload QR</Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center" onPress={toggleTorch}>
                    <Entypo name="flashlight" size={24} color={torchEnabled ? 'white' : YELLOW} />
                    <Text style={{ color: torchEnabled ? 'white' : YELLOW, marginTop: 4, fontSize: 14 }}>
                        Torch {torchEnabled ? 'On' : 'Off'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* SUN-RACK Branding */}
            <View className="absolute bottom-10 w-full items-center">
                <Text style={{
                    color: YELLOW,
                    fontWeight: 'bold',
                    fontSize: 16,
                    letterSpacing: 1.5,
                }}>
                    SUN-RACK
                </Text>
            </View>
        </View>
    );
};

export default QRScanner;