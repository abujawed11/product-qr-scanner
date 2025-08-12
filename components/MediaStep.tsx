

//==================Working========================
// components/MediaStep.tsx
import { StepMedia } from "@/types/StepMedia";
import { compressImage, formatFileSize, getFileSize } from "@/utils/mediaUtils";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type MediaStepProps = {
    step: {
        key: string;
        title: string;
        instruction: string;
        demoVideo?: string;
    };
    media: { [k: string]: StepMedia };
    setMedia: React.Dispatch<React.SetStateAction<{ [k: string]: StepMedia }>>;
    goBack: () => void;
    goNext: () => void;
};

export function MediaStep({ step, media, setMedia, goBack, goNext }: MediaStepProps) {
    const [imageSizeBytes, setImageSizeBytes] = useState<number>(0);
    const [videoSizeBytes, setVideoSizeBytes] = useState<number>(0);
    const [loadingSizes, setLoadingSizes] = useState<boolean>(false);

    // Calculate file sizes when media changes
    useEffect(() => {
        const calculateSizes = async () => {
            setLoadingSizes(true);
            let imageSize = 0;
            let videoSize = 0;

            if (media[step.key]?.image) {
                imageSize = await getFileSize(media[step.key].image!);
            }

            if (media[step.key]?.video) {
                videoSize = await getFileSize(media[step.key].video!);
            }

            setImageSizeBytes(imageSize);
            setVideoSizeBytes(videoSize);
            setLoadingSizes(false);
        };

        calculateSizes();
    }, [media[step.key]?.image, media[step.key]?.video, step.key]);

    async function pickImageFromGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            const originalUri = result.assets[0].uri;
            const compressedUri = await compressImage(originalUri);
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: compressedUri } }));
        }
        
    }

    async function takeImageWithCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permission is required to take a picture.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled && result.assets?.length) {
            const originalUri = result.assets[0].uri;
            const compressedUri = await compressImage(originalUri);
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: compressedUri } }));
        }
        
    }

    async function pickVideoFromGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
        }
        
    }

    async function recordVideoWithCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("Camera permission is required to record a video.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
        }
        
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <ScrollView
                style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>{step.title}</Text>
                <Text style={{ color: "#FFF", marginBottom: 8 }}>{step.instruction}</Text>
                {step.demoVideo && (
                    <Video
                        source={{ uri: step.demoVideo }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        style={{ width: "100%", height: 180, borderRadius: 10, marginBottom: 16 }}
                    />
                )}

                {/* Image Upload Section */}
                <Text style={{ color: "#FAD90E", fontWeight: "bold", marginTop: 10 }}>Upload Image</Text>
                {typeof media[step.key]?.image === "string" ? (
                    <View style={{ marginBottom: 12 }}>
                        <Image
                            source={{ uri: media[step.key]?.image! }}
                            style={{ width: "100%", height: 100, borderRadius: 10 }}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                            <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
                                📷 Size: {loadingSizes ? "Calculating..." : formatFileSize(imageSizeBytes)}
                            </Text>
                            <View style={{ 
                                paddingHorizontal: 6, 
                                paddingVertical: 2, 
                                backgroundColor: imageSizeBytes > 5 * 1024 * 1024 ? "#DC2626" : imageSizeBytes > 2 * 1024 * 1024 ? "#F59E0B" : "#10B981",
                                borderRadius: 4 
                            }}>
                                <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                                    {imageSizeBytes > 5 * 1024 * 1024 ? "LARGE" : imageSizeBytes > 2 * 1024 * 1024 ? "MEDIUM" : "OK"}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: 8, backgroundColor: "#374151", padding: 8, borderRadius: 8 }}
                            onPress={() => setMedia(m => ({
                                ...m, [step.key]: { ...m[step.key], image: undefined }
                            }))}
                        >
                            <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
                                Delete Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8, marginRight: 8 }}
                            onPress={pickImageFromGallery}
                        >
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Pick Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8 }}
                            onPress={takeImageWithCamera}
                        >
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Take Photo</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Video Upload Section */}
                <Text style={{ color: "#FAD90E", fontWeight: "bold" }}>Upload Video</Text>
                {typeof media[step.key]?.video === "string" ? (
                    <View style={{ marginBottom: 12 }}>
                        <Video
                            source={{ uri: media[step.key]?.video! }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            style={{ width: "100%", height: 120, borderRadius: 10 }}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                            <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
                                🎥 Size: {loadingSizes ? "Calculating..." : formatFileSize(videoSizeBytes)}
                            </Text>
                            <View style={{ 
                                paddingHorizontal: 6, 
                                paddingVertical: 2, 
                                backgroundColor: videoSizeBytes > 20 * 1024 * 1024 ? "#DC2626" : videoSizeBytes > 10 * 1024 * 1024 ? "#F59E0B" : "#10B981",
                                borderRadius: 4 
                            }}>
                                <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                                    {videoSizeBytes > 20 * 1024 * 1024 ? "LARGE" : videoSizeBytes > 10 * 1024 * 1024 ? "MEDIUM" : "OK"}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{ marginTop: 8, backgroundColor: "#374151", padding: 8, borderRadius: 8 }}
                            onPress={() => setMedia(m => ({
                                ...m, [step.key]: { ...m[step.key], video: undefined }
                            }))}
                        >
                            <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
                                Delete Video
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8, marginRight: 8 }}
                            onPress={pickVideoFromGallery}
                        >
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Pick Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8 }}
                            onPress={recordVideoWithCamera}
                        >
                            <Text style={{ color: "#000", fontWeight: "bold" }}>Record Video</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Step Size Summary */}
            {(imageSizeBytes > 0 || videoSizeBytes > 0) && (
                <View style={{ 
                    backgroundColor: "#1F2937", 
                    marginHorizontal: 24, 
                    padding: 12, 
                    borderRadius: 8,
                    marginBottom: 8 
                }}>
                    <Text style={{ color: "#FAD90E", fontWeight: "bold", marginBottom: 4 }}>
                        Step Total:
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
                            📁 Size: {formatFileSize(imageSizeBytes + videoSizeBytes)}
                        </Text>
                        <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
                            Files: {(imageSizeBytes > 0 ? 1 : 0) + (videoSizeBytes > 0 ? 1 : 0)}
                        </Text>
                    </View>
                    {(imageSizeBytes + videoSizeBytes) > 50 * 1024 * 1024 && (
                        <Text style={{ color: "#DC2626", fontSize: 11, fontStyle: "italic", marginTop: 4 }}>
                            ⚠️ This step has large files that may cause upload issues
                        </Text>
                    )}
                </View>
            )}

            {/* Fixed Buttons Row */}
            <SafeAreaView
                edges={['bottom']}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 24,
                    paddingTop: 12,
                    paddingBottom: 25,
                    backgroundColor: "#000"
                }}
           
            >
                <TouchableOpacity
                    onPress={goBack}
                    style={{ padding: 12, borderRadius: 8, backgroundColor: "#374151" }}
                >
                    <Text style={{ color: "#FFF" }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={goNext}
                    style={{ padding: 12, borderRadius: 8, backgroundColor: "#FAD90E" }}
                >
                    <Text style={{ color: "#000", fontWeight: "bold" }}>Next</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}



// import { StepMedia } from "@/types/StepMedia";
// import { compressImage } from "@/utils/mediaUtils";
// import { ResizeMode, Video } from "expo-av";
// import * as ImagePicker from "expo-image-picker";
// import * as Location from "expo-location";
// import * as NavigationBar from 'expo-navigation-bar';
// import React from "react";
// import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";


// export type MediaStepProps = {
//     step: {
//         key: string;
//         title: string;
//         instruction: string;
//         demoVideo?: string;
//     };
//     media: { [k: string]: StepMedia };
//     setMedia: React.Dispatch<React.SetStateAction<{ [k: string]: StepMedia }>>;
//     goBack: () => void;
//     goNext: () => void;
// };

// export function MediaStep({ step, media, setMedia, goBack, goNext }: MediaStepProps) {
//     async function pickImageFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });
//         if (!result.canceled && result.assets?.length) {
//             const originalUri = result.assets[0].uri;
//             const compressedUri = await compressImage(originalUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: compressedUri } }));
//         }
//         if (Platform.OS === 'android') {
//             // **FORCE navigation bar VISIBLE**
//             await NavigationBar.setVisibilityAsync('visible');
//         }
//     }



// // Inside your MediaStep component
// async function takeImageWithCamera() {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//         alert("Camera permission is required to take a picture.");
//         return;
//     }

//     // Request location permission
//     const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
//     if (locStatus !== "granted") {
//         alert("Location permission is required to tag the photo.");
//         return;
//     }

//     const location = await Location.getCurrentPositionAsync({});
//     const timestamp = new Date().toISOString();

//     const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         quality: 1,
//     });

//     if (!result.canceled && result.assets?.length) {
//         const originalUri = result.assets[0].uri;
//         const compressedUri = await compressImage(originalUri);

//         setMedia(m => ({
//             ...m,
//             [step.key]: {
//                 ...m[step.key],
//                 image: compressedUri,
//                 timestamp,
//                 location: {
//                     latitude: location.coords.latitude,
//                     longitude: location.coords.longitude
//                 }
//             }
//         }));
//     }

//     if (Platform.OS === 'android') {
//         await NavigationBar.setVisibilityAsync('visible');
//     }
// }


//     async function pickVideoFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//          if (Platform.OS === 'android') {
//             // **FORCE navigation bar VISIBLE**
//             await NavigationBar.setVisibilityAsync('visible');
//         }
//     }

//     async function recordVideoWithCamera() {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== "granted") {
//             alert("Camera permission is required to record a video.");
//             return;
//         }
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//          if (Platform.OS === 'android') {
//             // **FORCE navigation bar VISIBLE**
//             await NavigationBar.setVisibilityAsync('visible');
//         }
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: "#000" }}>
//             <ScrollView
//                 style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}
//                 contentContainerStyle={{ paddingBottom: 40 }}
//                 keyboardShouldPersistTaps="handled"
//                 showsVerticalScrollIndicator={false}
//             >
//                 <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>{step.title}</Text>
//                 <Text style={{ color: "#FFF", marginBottom: 8 }}>{step.instruction}</Text>
//                 {step.demoVideo && (
//                     <Video
//                         source={{ uri: step.demoVideo }}
//                         useNativeControls
//                         resizeMode={ResizeMode.CONTAIN}
//                         style={{ width: "100%", height: 180, borderRadius: 10, marginBottom: 16 }}
//                     />
//                 )}

//                 {/* Image Upload Section */}
//                 <Text style={{ color: "#FAD90E", fontWeight: "bold", marginTop: 10 }}>Upload Image</Text>
//                 {typeof media[step.key]?.image === "string" ? (
//                     <View style={{ marginBottom: 12 }}>
//                         <Image
//                             source={{ uri: media[step.key]?.image! }}
//                             style={{ width: "100%", height: 100, borderRadius: 10 }}
//                         />
//                         <TouchableOpacity
//                             style={{ marginTop: 8, backgroundColor: "#374151", padding: 8, borderRadius: 8 }}
//                             onPress={() => setMedia(m => ({
//                                 ...m, [step.key]: { ...m[step.key], image: undefined }
//                             }))}
//                         >
//                             <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
//                                 Delete Image
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 ) : (
//                     <View style={{ flexDirection: "row", marginBottom: 16 }}>
//                         <TouchableOpacity
//                             style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8, marginRight: 8 }}
//                             onPress={pickImageFromGallery}
//                         >
//                             <Text style={{ color: "#000", fontWeight: "bold" }}>Pick Image</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8 }}
//                             onPress={takeImageWithCamera}
//                         >
//                             <Text style={{ color: "#000", fontWeight: "bold" }}>Take Photo</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}

//                 {/* Video Upload Section */}
//                 <Text style={{ color: "#FAD90E", fontWeight: "bold" }}>Upload Video</Text>
//                 {typeof media[step.key]?.video === "string" ? (
//                     <View style={{ marginBottom: 12 }}>
//                         <Video
//                             source={{ uri: media[step.key]?.video! }}
//                             useNativeControls
//                             resizeMode={ResizeMode.CONTAIN}
//                             style={{ width: "100%", height: 120, borderRadius: 10 }}
//                         />
//                         <TouchableOpacity
//                             style={{ marginTop: 8, backgroundColor: "#374151", padding: 8, borderRadius: 8 }}
//                             onPress={() => setMedia(m => ({
//                                 ...m, [step.key]: { ...m[step.key], video: undefined }
//                             }))}
//                         >
//                             <Text style={{ color: "#FFF", textAlign: "center", fontWeight: "bold" }}>
//                                 Delete Video
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 ) : (
//                     <View style={{ flexDirection: "row", marginBottom: 16 }}>
//                         <TouchableOpacity
//                             style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8, marginRight: 8 }}
//                             onPress={pickVideoFromGallery}
//                         >
//                             <Text style={{ color: "#000", fontWeight: "bold" }}>Pick Video</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={{ backgroundColor: "#FAD90E", padding: 12, borderRadius: 8 }}
//                             onPress={recordVideoWithCamera}
//                         >
//                             <Text style={{ color: "#000", fontWeight: "bold" }}>Record Video</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </ScrollView>

//             {/* Fixed Buttons Row */}
//             <SafeAreaView
//                 edges={['bottom']}
//                 style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     paddingHorizontal: 24,
//                     paddingTop: 12,
//                     paddingBottom: 25,
//                     backgroundColor: "#000"
//                 }}
           
//             >
//                 <TouchableOpacity
//                     onPress={goBack}
//                     style={{ padding: 12, borderRadius: 8, backgroundColor: "#374151" }}
//                 >
//                     <Text style={{ color: "#FFF" }}>Back</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={goNext}
//                     style={{ padding: 12, borderRadius: 8, backgroundColor: "#FAD90E" }}
//                 >
//                     <Text style={{ color: "#000", fontWeight: "bold" }}>Next</Text>
//                 </TouchableOpacity>
//             </SafeAreaView>
//         </View>
//     );
// }

