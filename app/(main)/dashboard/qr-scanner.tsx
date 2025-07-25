// import { useIsFocused } from '@react-navigation/native';
// import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, StyleSheet, Text, View } from 'react-native';

// const QRScanner: React.FC = () => {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const router = useRouter();
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   if (!permission) return <Text style={styles.message}>Requesting camera permissions...</Text>;
//   if (!permission.granted) return (
//     <View style={styles.messageContainer}>
//       <Text>Please grant camera permissions.</Text>
//       <Text onPress={requestPermission} style={styles.grant}>Tap to Grant</Text>
//     </View>
//   );

//   const handleBarCodeScanned = (result: BarcodeScanningResult) => {
//     if (scanned) return;
//     setScanned(true);
//     Alert.alert('QR Scanned', result.data);
//     router.back();
//   };

//   return (
//     <View style={StyleSheet.absoluteFill}>
//       {isFocused && (
//         <CameraView
//           style={StyleSheet.absoluteFill}
//           onBarcodeScanned={handleBarCodeScanned}
//           barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   message: { flex: 1, textAlign: 'center', marginTop: 50 },
//   messageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   grant: { marginTop: 10, color: 'blue' },
// });

// export default QRScanner;


// import { useIsFocused } from '@react-navigation/native';
// import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const scanBoxSize = width * 0.7;

// const QRScanner: React.FC = () => {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const isFocused = useIsFocused();
//   const router = useRouter();

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const handleBarcodeScanned = (result: BarcodeScanningResult) => {
//     if (scanned) return;
//     setScanned(true);
//     Alert.alert('QR Scanned', result.data);
//     router.back();
//   };

//   if (!permission?.granted) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.text}>Camera permission not granted.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {isFocused && (
//         <CameraView
//           style={StyleSheet.absoluteFill}
//           onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//           barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
//         />
//       )}

//       {/* Overlay Mask */}
//       <View style={styles.overlay}>
//         <View style={styles.topMask} />
//         <View style={styles.middleRow}>
//           <View style={styles.sideMask} />
//           <View style={styles.scanBox} />
//           <View style={styles.sideMask} />
//         </View>
//         <View style={styles.bottomMask} />
//       </View>

//       <Text style={styles.instruction}>Align QR code inside the square</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: { color: 'white', fontSize: 16 },

//   // Overlay styles
//   overlay: {
//     position: 'absolute',
//     top: 0, left: 0, right: 0, bottom: 0,
//   },
//   topMask: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   middleRow: {
//     flexDirection: 'row',
//     height: scanBoxSize,
//   },
//   sideMask: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },
//   scanBox: {
//     width: scanBoxSize,
//     height: scanBoxSize,
//     borderColor: '#FAD90E',
//     borderWidth: 3,
//     backgroundColor: 'transparent',
//   },
//   bottomMask: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//   },

//   instruction: {
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//     color: 'white',
//     fontSize: 16,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
// });

// export default QRScanner;



// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Dimensions, Text, View } from 'react-native';

// const { width } = Dimensions.get('window');
// const SCAN_BOX_SIZE = width * 0.7;

// const QRScanner = () => {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [scanned, setScanned] = useState(false);
//     const isFocused = useIsFocused();
//     const router = useRouter();


//     // useFocusEffect(
//     //     React.useCallback(() => {
//     //         const onBackPress = () => {
//     //             router.replace('/(main)/dashboard');
//     //             return true; // Prevent default back behavior
//     //         };
//     //         const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     //         return () => subscription.remove();
//     //         // BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     //         // return () => {
//     //         //   BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//     //         // };
//     //     }, [])
//     // );

//     useFocusEffect(
//         React.useCallback(() => {
//             // Reset scanned so QR scanner works every time
//             setScanned(false);

//             const onBackPress = () => {
//                 router.replace('/(main)/dashboard');
//                 return true;
//             };

//             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

//             return () => {
//                 subscription.remove();
//             };
//         }, [])
//     );



//     useEffect(() => {
//         requestPermission();
//     }, []);

//     // const handleBarcodeScanned = (result: BarcodeScanningResult) => {
//     //     if (scanned) return;
//     //     setScanned(true);
//     //     Alert.alert('QR Scanned', result.data);
//     //     // router.back();
//     //     router.replace('/(main)/dashboard');
//     // };
//     const handleBarcodeScanned = (result: BarcodeScanningResult) => {
//         if (scanned) return;
//         setScanned(true);

//         try {
//             const parsed = JSON.parse(result.data);
//             router.push({
//                 pathname: '/(main)/order-details',
//                 params: {
//                     customerId: parsed.customerId,
//                     orderId: parsed.orderId,
//                     kitId: parsed.kitId,
//                 },
//             });
//         } catch (e) {
//             Alert.alert('Invalid QR code', 'The QR data is not valid JSON.');
//             setScanned(false);
//         }
//     };

//     if (!permission?.granted) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white text-base">Camera permission not granted.</Text>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-1 relative bg-black">
//             {isFocused && (
//                 <CameraView
//                     style={{ flex: 1 }}
//                     onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//                     barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
//                 />
//             )}

//             {/* Dimmed Overlay with Transparent Scan Box */}
//             <View className="absolute inset-0">
//                 {/* Top */}
//                 <View className="flex-1 bg-black/60" />

//                 {/* Middle (Scan Box Row) */}
//                 <View className="flex-row justify-center items-center">
//                     <View className="flex-1 bg-black/60" />

//                     <View
//                         className="border-4 border-yellow-400 bg-transparent"
//                         style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}
//                     />

//                     <View className="flex-1 bg-black/60" />
//                 </View>

//                 {/* Bottom */}
//                 <View className="flex-1 bg-black/60" />
//             </View>

//             {/* Instruction Text */}
//             <Text className="absolute bottom-16 self-center text-white bg-black/60 px-4 py-2 rounded-lg text-base">
//                 Align QR code inside the square
//             </Text>
//         </View>
//     );
// };

// export default QRScanner;

// import api from '@/utils/api';
// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Dimensions, Text, View } from 'react-native';

// const { width } = Dimensions.get('window');
// const SCAN_BOX_SIZE = width * 0.7;

// const QRScanner = () => {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const isFocused = useIsFocused();
//   const router = useRouter();

//   useFocusEffect(
//     React.useCallback(() => {
//       setScanned(false); // Reset scanner on focus

//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };

//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
//     if (scanned) return;
//     setScanned(true);

//     try {
//       const parsed = JSON.parse(result.data);
//       const { customerId, orderId, locationId } = parsed;

//       if (!customerId || !orderId || !locationId) {
//         throw new Error('Missing required fields');
//       }

//       console.log(`Scanned data: ${JSON.stringify(parsed)}`);

//       // ✅ Call backend API to save scanned order
//       await api.post('/save-order/', {
//         customerId,
//         orderId,
//         locationId
//       });

//       // ✅ Navigate to details page
//       router.push({
//         pathname: '/(main)/order-details',
//         params: { customerId, orderId }
//       });

//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Invalid QR code or server error.');
//       setScanned(false);
//     }
//   };

//   if (!permission?.granted) {
//     return (
//       <View className="flex-1 justify-center items-center bg-black">
//         <Text className="text-white text-base">Camera permission not granted.</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 relative bg-black">
//       {isFocused && (
//         <CameraView
//           style={{ flex: 1 }}
//           onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//           barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
//         />
//       )}

//       {/* Dimmed Overlay */}
//       <View className="absolute inset-0">
//         <View className="flex-1 bg-black/60" />
//         <View className="flex-row justify-center items-center">
//           <View className="flex-1 bg-black/60" />
//           <View
//             className="border-4 border-yellow-400 bg-transparent"
//             style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}
//           />
//           <View className="flex-1 bg-black/60" />
//         </View>
//         <View className="flex-1 bg-black/60" />
//       </View>

//       <Text className="absolute bottom-16 self-center text-white bg-black/60 px-4 py-2 rounded-lg text-base">
//         Align QR code inside the square
//       </Text>
//     </View>
//   );
// };

// export default QRScanner;

// import api from '@/utils/api';
// import { Entypo, Feather } from '@expo/vector-icons';
// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import axios from 'axios';
// import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     BackHandler,
//     Dimensions,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');
// const SCAN_BOX_SIZE = width * 0.7;
// const SCAN_BOX_TOP = (height - SCAN_BOX_SIZE) / 4;
// const YELLOW = '#FAD90E';
// const OVERLAY_COLOR = 'rgba(0,0,0,0.6)';

// const QRScanner = () => {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [scanned, setScanned] = useState(false);
//     const isFocused = useIsFocused();
//     const router = useRouter();

//     useFocusEffect(
//         React.useCallback(() => {

//             setScanned(false); // Reset scanner on focus

//             const onBackPress = () => {
//                 router.replace('/(main)/dashboard');
//                 return true;
//             };
//             const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//             return () => subscription.remove();
//         }, [])
//     );

//     useEffect(() => {
//         requestPermission();
//     }, []);

//     const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
//         if (scanned) return;
//         setScanned(true);

//         try {
//             const parsed = JSON.parse(result.data);
//             const { customerId, orderId, locationId } = parsed;

//             if (!customerId || !orderId || !locationId) {
//                 throw new Error('Missing required fields');
//             }

//             console.log(`Scanned data: ${JSON.stringify(parsed)}`);

//             // ✅ Call backend API to save scanned order
//             await api.post('/save-order/', {
//                 customerId,
//                 orderId,
//                 locationId
//             });

//             // ✅ Navigate to details page
//             router.push({
//                 pathname: '/(main)/order-details',
//                 params: { customerId, orderId }
//             });

//         } catch (err) {
//             console.error(err);
//             //   Alert.alert('Error', 'Invalid QR code or server error.');
//             let errorMessage = 'Invalid QR code or server error.';
//             if (axios.isAxiosError(err) && err.response?.data?.error) {
//                 errorMessage = err.response.data.error;
//             }
//             Alert.alert('Error', errorMessage);
//             setScanned(false);
//         }
//     };

//     if (!permission?.granted) {
//         return (
//             <View className="flex-1 justify-center items-center bg-black">
//                 <Text className="text-white text-base">Camera permission not granted.</Text>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-1 bg-black">
//             {isFocused && (
//                 <CameraView
//                     style={{ flex: 1 }}
//                     onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//                     barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
//                 />
//             )}

//             {/* Title - "Scan BlueBase" */}
//             <View className="absolute top-12 w-full items-center">
//                 <Text style={{ color: YELLOW, fontWeight: '900', fontSize: 20 }}>
//                     Scan BlueBase
//                 </Text>
//             </View>

//             {/* Dark overlay blur simulation */}
//             <View className="absolute inset-0">
//                 {/* Top */}
//                 <View style={{ height: SCAN_BOX_TOP, backgroundColor: OVERLAY_COLOR }} />

//                 {/* Middle */}
//                 <View style={{ flexDirection: 'row' }}>
//                     <View style={{ width: (width - SCAN_BOX_SIZE) / 2, backgroundColor: OVERLAY_COLOR }} />

//                     {/* Scan Box with Corners */}
//                     <View style={{ width: SCAN_BOX_SIZE, height: SCAN_BOX_SIZE }}>
//                         <View
//                             className="absolute top-0 left-0 w-6 h-6 rounded-tl-lg"
//                             style={{ borderTopWidth: 4, borderLeftWidth: 4, borderColor: YELLOW }}
//                         />
//                         <View
//                             className="absolute top-0 right-0 w-6 h-6 rounded-tr-lg"
//                             style={{ borderTopWidth: 4, borderRightWidth: 4, borderColor: YELLOW }}
//                         />
//                         <View
//                             className="absolute bottom-0 left-0 w-6 h-6 rounded-bl-lg"
//                             style={{ borderBottomWidth: 4, borderLeftWidth: 4, borderColor: YELLOW }}
//                         />
//                         <View
//                             className="absolute bottom-0 right-0 w-6 h-6 rounded-br-lg"
//                             style={{ borderBottomWidth: 4, borderRightWidth: 4, borderColor: YELLOW }}
//                         />
//                     </View>

//                     <View style={{ width: (width - SCAN_BOX_SIZE) / 2, backgroundColor: OVERLAY_COLOR }} />
//                 </View>

//                 {/* Bottom */}
//                 <View style={{ flex: 1, backgroundColor: OVERLAY_COLOR }} />
//             </View>

//             {/* Upload QR and Torch */}
//             <View className="absolute bottom-28 w-full flex-row justify-center gap-x-12">
//                 <TouchableOpacity className="items-center">
//                     <Feather name="image" size={24} color={YELLOW} />
//                     <Text style={{ color: YELLOW, marginTop: 4, fontSize: 14 }}>Upload QR</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity className="items-center">
//                     <Entypo name="flashlight" size={24} color={YELLOW} />
//                     <Text style={{ color: YELLOW, marginTop: 4, fontSize: 14 }}>Torch</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* SUN-RACK Branding */}
//             <View className="absolute bottom-10 w-full items-center">
//                 <Text style={{
//                     color: YELLOW,
//                     fontWeight: 'bold',
//                     fontSize: 16,
//                     letterSpacing: 1.5,
//                 }}>
//                     SUN-RACK
//                 </Text>
//             </View>
//         </View>
//     );
// };

// export default QRScanner;

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
            const { kit_id, prod_unit, warehouse, project_id, kit_no, date } = parsed;

            if (!kit_id || !prod_unit || !warehouse || !project_id || !kit_no || !date) {
                throw new Error('Missing required fields in QR code.');
            }

            // console.log(`Scanned QR Data: ${JSON.stringify(parsed)}`);

            // Send to backend
            const res = await api.post('/save-order/', {
                kit_id,
                prod_unit,
                warehouse,
                project_id,
                kit_no,
                date
            });

            const { scan_id } = res.data;

            if (!scan_id) {
                throw new Error('Scan ID not returned from server.');
            }

            // triggerRefresh();
            // Invalidate React Query caches for the my-scans page
            queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
            queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });

            // Navigate to kit-details page with scan_id
            router.push({
                pathname: '/(main)/kit-details',
                params: { scan_id }
            });

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

    // const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    //     if (scanned) return;
    //     setScanned(true);

    //     try {
    //         const parsed = JSON.parse(result.data);
    //         const { kit_id, prod_unit, warehouse, project_id, kit_no, date } = parsed;

    //         if (!kit_id || !prod_unit || !warehouse || !project_id || !kit_no || !date) {
    //             throw new Error('Missing required fields in QR code.');
    //         }

    //         console.log(`Scanned QR Data: ${JSON.stringify(parsed)}`);

    //         // Send to backend
    //         const res = await api.post('/save-order/', {
    //             kit_id,
    //             prod_unit,
    //             warehouse,
    //             project_id,
    //             kit_no,
    //             date
    //         });

    //         const { scan_id } = res.data;

    //         if (!scan_id) {
    //             throw new Error('Scan ID not returned from server.');
    //         }
    //         triggerRefresh();
    //         // Navigate to kit-details page with scan_id
    //         router.push({
    //             pathname: '/(main)/kit-details',
    //             params: { scan_id }
    //         });

    //     } catch (err) {
    //         console.error(err);
    //         let errorMessage = 'Invalid QR code or server error.';
    //         if (axios.isAxiosError(err) && err.response?.data?.error) {
    //             errorMessage = err.response.data.error;
    //         }
    //         Alert.alert('Error', errorMessage);
    //         setScanned(false);
    //     }
    // };



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
            });

            // const { kit_id, prod_unit, warehouse, project_id, kit_no, date } = response.data;

            const { scan_id } = response.data;

            if (!scan_id) {
                throw new Error('Scan ID not returned from server.');
            }

            // triggerRefresh();
            queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] });
            queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });


            // ✅ Navigate to kit-details page with scan_id
            router.push({
                pathname: '/(main)/kit-details',
                params: { scan_id }
            });

            // if (!customerId || !orderId || !locationId) {
            //   throw new Error('Missing required fields');
            // }

            // console.log(`Uploaded data: ${JSON.stringify({ clientId, orderId, locationId })}`);

            // Try saving
            // const saveRes = await api.post('/save-order/', {
            //     customerId,
            //     orderId,
            //     locationId,
            // });

            // const { message } = saveRes.data;

            // if (message === 'Order already scanned and saved' || saveRes.status === 200 || saveRes.status === 201) {
            // router.push({
            //     pathname: '/(main)/order-details',
            //     params: { clientId, orderId },
            // });
        }

        catch (err) {
            // console.error(error);
            // Alert.alert('Error', 'Failed to upload or process QR code.');
            console.error(err);
            //   Alert.alert('Error', 'Invalid QR code or server error.');
            let errorMessage = 'Invalid QR code or server error.';
            if (axios.isAxiosError(err) && err.response?.data?.error) {
                errorMessage = err.response.data.error;
            }
            Alert.alert('Error', errorMessage);
            setScanned(false);
        }
    };

    //   const handleUploadQR = async () => {
    //     try {
    //       const result = await DocumentPicker.getDocumentAsync({
    //         type: 'image/*', // Allow image files only
    //         copyToCacheDirectory: true,
    //       });

    //       if (result.canceled) {
    //         return;
    //       }

    //       const { uri, mimeType } = result.assets[0];

    //       if (!mimeType?.startsWith('image/')) {
    //         Alert.alert('Error', 'Please select an image file.');
    //         return;
    //       }

    //       // Here, you would typically use a library like 'expo-barcode-scanner' or send the image to your backend
    //       // For simplicity, we'll assume the backend can process the image and return QR data
    //       const formData = new FormData();
    //       formData.append('file', {
    //         uri,
    //         name: uri.split('/').pop() || 'qr_image.jpg',
    //         type: mimeType,
    //       } as any);

    //       const response = await api.post('/upload-qr/', formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //       });

    //       const { customerId, orderId, locationId } = response.data;
    //       console.log(response.data);

    //       if (!customerId || !orderId || !locationId) {
    //         throw new Error('Missing required fields');
    //       }

    //       console.log(`Uploaded data: ${JSON.stringify({ customerId, orderId, locationId })}`);

    //       // ✅ Call backend API to save uploaded order (if not already handled by /upload-qr/)
    //       await api.post('/save-order/', {
    //         customerId,
    //         orderId,
    //         locationId,
    //       });

    //       // ✅ Navigate to details page
    //       router.push({
    //         pathname: '/(main)/order-details',
    //         params: { customerId, orderId },
    //       });

    //     } catch (error) {
    //       console.error(error);
    //       Alert.alert('Error', 'Failed to upload or process QR code.');
    //     }
    //   };

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