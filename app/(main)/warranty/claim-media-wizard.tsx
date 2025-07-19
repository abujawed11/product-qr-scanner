// import * as ImagePicker from 'expo-image-picker';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useState } from 'react';
// import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
// import { claimSteps } from './claim-steps';

// export default function ClaimMediaWizard() {
//   const params = useLocalSearchParams<any>(); // Receives details from claim-form
//   const [stepIdx, setStepIdx] = useState(0);
//   const [media, setMedia] = useState<{[k:string]: string}>({});

//   const step = claimSteps[stepIdx];

//   async function pickImage() {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: result.assets[0].uri }));
//     }
//   }

//   function goNext() {
//     if (!media[step.key]) {
//       Alert.alert("Please upload the required image before proceeding.");
//       return;
//     }
//     setStepIdx(i => i + 1);
//   }
//   function goBack() {
//     setStepIdx(i => Math.max(i - 1, 0));
//   }

//   function handleSubmit() {
//     // TODO: upload { ...params, ...media } to API
//     Alert.alert("Submitted!", "Your warranty claim has been submitted.");
//     router.replace('/(main)/warranty/claim-status');
//   }

//   if (stepIdx >= claimSteps.length) { // Review and submit
//     return (
//       <View className="flex-1 bg-black p-6">
//         <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//         {claimSteps.map((s,i) => (
//           <View key={s.key} className="mb-3">
//             <Text className="text-white">{s.title}</Text>
//             {media[s.key]
//               ? <Image source={{ uri: media[s.key] }} style={{ height: 100, marginVertical: 6, borderRadius:8 }} />
//               : <Text className="text-red-400 mt-2">No image uploaded</Text>}
//           </View>
//         ))}
//         <TouchableOpacity className="bg-yellow-400 py-4 rounded-xl mt-10" onPress={handleSubmit}>
//           <Text className="text-black text-lg font-bold text-center">Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-black p-6">
//       <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//       <Text className="text-white mb-3">{step.instruction}</Text>
//       {media[step.key] && (
//         <Image source={{ uri: media[step.key] }} style={{ width: '100%', height: 180, borderRadius:10, marginBottom:12 }} />
//       )}
//       <TouchableOpacity className="bg-yellow-400 py-4 mb-6 rounded-xl" onPress={pickImage}>
//         <Text className="text-black font-bold text-center text-lg">Upload Image</Text>
//       </TouchableOpacity>
//       <View className="flex-row justify-between mt-4">
//         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700" disabled={stepIdx === 0}>
//           <Text className="text-white">Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//           <Text className="text-black font-bold">Next</Text>
//         </TouchableOpacity>
//       </View>
//       <Text className="text-white text-center mt-6">Step {stepIdx+1} of {claimSteps.length}</Text>
//     </View>
//   );
// }


// import * as ImagePicker from 'expo-image-picker';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
// import { claimSteps } from './claim-steps';

// export default function ClaimMediaWizard() {
//   const params = useLocalSearchParams<any>();
//   const [stepIdx, setStepIdx] = useState(0);
//   const [media, setMedia] = useState<{ [k: string]: string }>({});

//   const step = claimSteps[stepIdx];

//   // Intercept hardware back button with confirmation on step 0
//   useEffect(() => {
//     const backAction = () => {
//       if (stepIdx === 0) {
//         Alert.alert(
//           'Cancel Warranty Claim?',
//           'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Leave',
//               style: 'destructive',
//               onPress: () => router.replace('/(main)/dashboard')
//             },
//           ]
//         );
//         return true;
//       } else {
//         setStepIdx(i => i - 1);
//         return true;
//       }
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//     return () => backHandler.remove();
//   }, [stepIdx]);

//   async function pickImage() {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: result.assets[0].uri }));
//     }
//   }

//   function goNext() {
//     if (!media[step.key]) {
//       Alert.alert('Please upload the required image before proceeding.');
//       return;
//     }
//     setStepIdx(i => i + 1);
//   }

//   function goBack() {
//     if (stepIdx === 0) {
//       Alert.alert(
//         'Cancel Warranty Claim?',
//         'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           {
//             text: 'Leave',
//             style: 'destructive',
//             onPress: () => router.replace('/(main)/dashboard')
//           },
//         ]
//       );
//     } else {
//       setStepIdx(i => i - 1);
//     }
//   }

//   function handleSubmit() {
//     // TODO: upload { ...params, ...media } to API
//     Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//     router.replace('/(main)/warranty/claim-status');
//   }

//   if (stepIdx >= claimSteps.length) {
//     return (
//       <View className="flex-1 bg-black p-6">
//         <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//         {claimSteps.map((s, i) => (
//           <View key={s.key} className="mb-3">
//             <Text className="text-white">{s.title}</Text>
//             {media[s.key]
//               ? <Image source={{ uri: media[s.key] }} style={{ height: 100, marginVertical: 6, borderRadius: 8 }} />
//               : <Text className="text-red-400 mt-2">No image uploaded</Text>}
//           </View>
//         ))}
//         <TouchableOpacity className="bg-yellow-400 py-4 rounded-xl mt-10" onPress={handleSubmit}>
//           <Text className="text-black text-lg font-bold text-center">Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-black p-6">
//       <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//       <Text className="text-white mb-3">{step.instruction}</Text>
//       {media[step.key] && (
//         <Image source={{ uri: media[step.key] }} style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 12 }} />
//       )}
//       <TouchableOpacity className="bg-yellow-400 py-4 mb-6 rounded-xl" onPress={pickImage}>
//         <Text className="text-black font-bold text-center text-lg">Upload Image</Text>
//       </TouchableOpacity>
//       <View className="flex-row justify-between mt-4">
//         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//           <Text className="text-white">Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//           <Text className="text-black font-bold">Next</Text>
//         </TouchableOpacity>
//       </View>
//       <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {claimSteps.length}</Text>
//     </View>
//   );
// }


// import * as ImagePicker from 'expo-image-picker';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
// import { claimSteps } from './claim-steps';

// export default function ClaimMediaWizard() {
//     const params = useLocalSearchParams<any>();

//     // All media step images are saved here
//     const [media, setMedia] = useState<{ [k: string]: string }>({});
//     const [stepIdx, setStepIdx] = useState(0);


//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace('/(main)/dashboard');
//     }


//     // --- RESET wizard state whenever component mounts or params change ---
//     useEffect(() => {
//         setStepIdx(0);
//         setMedia({});
//     }, []); // <-- Fires on navigation to this screen!

//     const step = claimSteps[stepIdx];

//     // --- Hardware back button confirmation ---
//     useEffect(() => {
//         const backAction = () => {
//             if (stepIdx === 0) {
//                 Alert.alert(
//                     'Cancel Warranty Claim?',
//                     'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                     [
//                         { text: 'Cancel', style: 'cancel' },
//                         {
//                             text: 'Leave',
//                             style: 'destructive',
//                             onPress: handleCancel
//                         },
//                     ]
//                 );
//                 return true;
//             } else {
//                 setStepIdx(i => i - 1);
//                 return true;
//             }
//         };

//         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//         return () => backHandler.remove();
//     }, [stepIdx]);

//     async function pickImage() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: result.assets[0].uri }));
//         }
//     }

//     function goNext() {
//         if (!media[step.key]) {
//             Alert.alert('Please upload the required image before proceeding.');
//             return;
//         }
//         setStepIdx(i => i + 1);
//     }

//     function goBack() {
//         if (stepIdx === 0) {
//             Alert.alert(
//                 'Cancel Warranty Claim?',
//                 'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                 [
//                     { text: 'Cancel', style: 'cancel' },
//                     {
//                         text: 'Leave',
//                         style: 'destructive',
//                         onPress: () => router.replace('/(main)/dashboard'),
//                     },
//                 ]
//             );
//         } else {
//             setStepIdx(i => i - 1);
//         }
//     }

//     function handleSubmit() {
//         // TODO: upload { ...params, ...media } to API
//         Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//         router.replace('/(main)/warranty/claim-status');
//     }

//     if (stepIdx >= claimSteps.length) {
//         return (
//             <View className="flex-1 bg-black p-6">
//                 <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                 {claimSteps.map((s, i) => (
//                     <View key={s.key} className="mb-3">
//                         <Text className="text-white">{s.title}</Text>
//                         {media[s.key]
//                             ? <Image source={{ uri: media[s.key] }} style={{ height: 100, marginVertical: 6, borderRadius: 8 }} />
//                             : <Text className="text-red-400 mt-2">No image uploaded</Text>}
//                     </View>
//                 ))}
//                 <TouchableOpacity className="bg-yellow-400 py-4 rounded-xl mt-10" onPress={handleSubmit}>
//                     <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-1 bg-black p-6">
//             <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//             <Text className="text-white mb-3">{step.instruction}</Text>
//             {media[step.key] && (
//                 <Image source={{ uri: media[step.key] }} style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 12 }} />
//             )}
//             <TouchableOpacity className="bg-yellow-400 py-4 mb-6 rounded-xl" onPress={pickImage}>
//                 <Text className="text-black font-bold text-center text-lg">Upload Image</Text>
//             </TouchableOpacity>
//             <View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                     <Text className="text-white">Back</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//                     <Text className="text-black font-bold">Next</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {claimSteps.length}</Text>
//         </View>
//     );
// }

// import CheckBox from '@react-native-community/checkbox';
// import Checkbox from 'expo-checkbox';
// import * as ImagePicker from 'expo-image-picker';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { claimSteps } from './claim-steps';

// export default function ClaimMediaWizard() {
//     const params = useLocalSearchParams<any>();

//     const [media, setMedia] = useState<{ [k: string]: string }>({});
//     const [stepIdx, setStepIdx] = useState(0);
//     const [accepted, setAccepted] = useState(false);

//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace('/(main)/dashboard');
//     }

//     useEffect(() => {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//     }, []);

//     const step = claimSteps[stepIdx];

//     useEffect(() => {
//         const backAction = () => {
//             if (stepIdx === 0) {
//                 Alert.alert(
//                     'Cancel Warranty Claim?',
//                     'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                     [
//                         { text: 'Cancel', style: 'cancel' },
//                         {
//                             text: 'Leave',
//                             style: 'destructive',
//                             onPress: handleCancel
//                         },
//                     ]
//                 );
//                 return true;
//             } else {
//                 setStepIdx(i => i - 1);
//                 return true;
//             }
//         };
//         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//         return () => backHandler.remove();
//     }, [stepIdx]);

//     async function pickImage() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: result.assets[0].uri }));
//         }
//     }

//     function goNext() {
//         if (!media[step.key]) {
//             Alert.alert('Please upload the required image before proceeding.');
//             return;
//         }
//         setStepIdx(i => i + 1);
//     }

//     function goBack() {
//         if (stepIdx === 0) {
//             Alert.alert(
//                 'Cancel Warranty Claim?',
//                 'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                 [
//                     { text: 'Cancel', style: 'cancel' },
//                     {
//                         text: 'Leave',
//                         style: 'destructive',
//                         onPress: handleCancel,
//                     },
//                 ]
//             );
//         } else {
//             setStepIdx(i => i - 1);
//         }
//     }

//     function handleSubmit() {
//         // TODO: upload { ...params, ...media } to API
//         resetWizard();
//         Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//         router.replace('/(main)/warranty/claim-status');
//     }

//     if (stepIdx >= claimSteps.length) {
//         return (
//             <View className="flex-1 bg-black p-6">
//                 <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                 <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//                     {claimSteps.map((s, i) => (
//                         <View key={s.key} className="mb-3">
//                             <Text className="text-white">{s.title}</Text>
//                             {media[s.key]
//                                 ? <Image source={{ uri: media[s.key] }} style={{ height: 100, marginVertical: 6, borderRadius: 8 }} />
//                                 : <Text className="text-red-400 mt-2">No image uploaded</Text>}
//                         </View>
//                     ))}
//                     <View className="flex-row items-center mb-5 mt-4">
//                         {/* <CheckBox
//                             value={accepted}
//                             onValueChange={setAccepted}
//                             tintColors={{ true: '#FAD90E', false: '#888' }}
//                         /> */}
//                         <Checkbox
//                             value={accepted}
//                             onValueChange={setAccepted}
//                             color={accepted ? '#FAD90E' : '#888'}
//                             style={{ marginRight: 8 }}
//                         />
//                         <Text className="text-white ml-2 flex-shrink">
//                             I confirm that all the details and documentation provided are correct.
//                         </Text>
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity
//                     className={`py-4 rounded-xl mt-4 ${accepted ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                     onPress={() => {
//                         if (!accepted) {
//                             Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//                             return;
//                         }
//                         handleSubmit();
//                     }}
//                     disabled={!accepted}
//                 >
//                     <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-1 bg-black p-6">
//             <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//             <Text className="text-white mb-3">{step.instruction}</Text>
//             {media[step.key] && (
//                 <Image source={{ uri: media[step.key] }} style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 12 }} />
//             )}
//             <TouchableOpacity className="bg-yellow-400 py-4 mb-6 rounded-xl" onPress={pickImage}>
//                 <Text className="text-black font-bold text-center text-lg">Upload Image</Text>
//             </TouchableOpacity>
//             <View className="flex-row justify-between mt-4">
//                 <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                     <Text className="text-white">Back</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//                     <Text className="text-black font-bold">Next</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {claimSteps.length}</Text>
//         </View>
//     );
// }

// import Checkbox from 'expo-checkbox';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { ResizeMode, Video } from 'expo-av';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View, Platform } from 'react-native';
// import { claimSteps } from './claim-steps';

// // Type for our step media
// type StepMedia = {
//     image?: string;
//     video?: string;
// };

// export default function ClaimMediaWizard() {
//     const params = useLocalSearchParams<any>();
//     const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
//     const [stepIdx, setStepIdx] = useState(0);
//     const [accepted, setAccepted] = useState(false);
//     const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//     const [locError, setLocError] = useState<string | null>(null);

//     // Device location fetch on mount!
//     useEffect(() => {
//         (async () => {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setLocError('Permission to access location was denied');
//                 return;
//             }
//             const loc = await Location.getCurrentPositionAsync({});
//             setLocation({
//                 latitude: loc.coords.latitude,
//                 longitude: loc.coords.longitude,
//             });
//         })();
//     }, []);

//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace('/(main)/dashboard');
//     }

//     useEffect(() => {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//     }, []);

//     const step = claimSteps[stepIdx];

//     useEffect(() => {
//         const backAction = () => {
//             if (stepIdx === 0) {
//                 Alert.alert(
//                     'Cancel Warranty Claim?',
//                     'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                     [
//                         { text: 'Cancel', style: 'cancel' },
//                         {
//                             text: 'Leave',
//                             style: 'destructive',
//                             onPress: handleCancel
//                         },
//                     ]
//                 );
//                 return true;
//             } else {
//                 setStepIdx(i => i - 1);
//                 return true;
//             }
//         };
//         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//         return () => backHandler.remove();
//     }, [stepIdx]);

//     // ---- Image Handlers
//     async function pickImageFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//         }
//     }
//     async function takeImageWithCamera() {
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//         }
//     }
//     // ---- Video Handlers
//     async function pickVideoFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//     }
//     async function recordVideoWithCamera() {
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//     }

//     function goNext() {
//         // Require at least one media
//         if (!media[step.key]?.image && !media[step.key]?.video) {
//             Alert.alert('Please upload at least an image or a video before proceeding.');
//             return;
//         }
//         setStepIdx(i => i + 1);
//     }
//     function goBack() {
//         if (stepIdx === 0) {
//             Alert.alert(
//                 'Cancel Warranty Claim?',
//                 'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                 [
//                     { text: 'Cancel', style: 'cancel' },
//                     {
//                         text: 'Leave',
//                         style: 'destructive',
//                         onPress: handleCancel,
//                     },
//                 ]
//             );
//         } else {
//             setStepIdx(i => i - 1);
//         }
//     }

//     function handleSubmit() {
//         // Compose full data
//         const payload = {
//             ...params,
//             media,
//             location,
//         };
//         // TODO: upload payload to API!
//         resetWizard();
//         Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//         router.replace('/(main)/warranty/claim-status');
//     }

//     // ---- Review & Submit step
//     if (stepIdx >= claimSteps.length) {
//         return (
//             <View className="flex-1 bg-black p-6">
//                 <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                 <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//                     {claimSteps.map(s => (
//                         <View key={s.key} className="mb-5">
//                             <Text className="text-yellow-400">{s.title}</Text>
//                             {media[s.key]?.image && (
//                                 <Image source={{ uri: media[s.key].image }} style={{ height: 100, borderRadius: 8, marginVertical: 4 }} />
//                             )}
//                             {/* {media[s.key]?.video && (
//                 <Video source={{ uri: media[s.key].video }}
//                   useNativeControls
//                   resizeMode={Video.RESIZE_MODE_CONTAIN}
//                   style={{ height: 120, borderRadius: 8, marginVertical: 4 }} />
//               )} */}
//                             {typeof media[step.key]?.video === 'string' && (
//                                 <Video
//                                     source={{ uri: media[step.key]!.video! }}
//                                     useNativeControls
//                                     resizeMode={ResizeMode.CONTAIN}
//                                     style={{ width: 320, height: 180 }}
//                                 // useNativeControls
//                                 // resizeMode={ResizeMode.CONTAIN}
//                                 // style={{ width: '100%', height: 120, borderRadius: 10 }}
//                                 />
//                             )}
//                             {!media[s.key]?.image && !media[s.key]?.video && (
//                                 <Text className="text-red-400 mt-2">No media uploaded</Text>
//                             )}
//                         </View>
//                     ))}
//                     <View className="flex-row items-center mb-5 mt-4">
//                         <Checkbox
//                             value={accepted}
//                             onValueChange={setAccepted}
//                             color={accepted ? '#FAD90E' : '#888'}
//                             style={{ marginRight: 8 }}
//                         />
//                         <Text className="text-white ml-2 flex-shrink">
//                             I confirm that all the details and documentation provided are correct.
//                         </Text>
//                     </View>
//                     <Text className="text-white text-xs mt-3 mb-4">
//                         Location: {location ? `${location.latitude}, ${location.longitude}` : locError || 'Location not available'}
//                     </Text>
//                 </ScrollView>
//                 <TouchableOpacity
//                     className={`py-4 rounded-xl mt-4 ${accepted ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                     onPress={() => {
//                         if (!accepted) {
//                             Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//                             return;
//                         }
//                         handleSubmit();
//                     }}
//                     disabled={!accepted}
//                 >
//                     <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     // ---- Main step UI
//     return (
//         <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//             <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//             <Text className="text-white mb-2">{step.instruction}</Text>

//             {/* Demo instructional video */}
//             {step.demoVideo && (
//                 <Video
//                     source={{ uri: step.demoVideo }}
//                     useNativeControls
//                     resizeMode={ResizeMode.CONTAIN}
//                     style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//                 />
//             )}

//             {/* ========== Image UPLOAD & PREVIEW ========== */}
//             <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
//             {media[step.key]?.image ? (
//                 <View className="mb-3">
//                     <Image source={{ uri: media[step.key].image }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
//                     <TouchableOpacity
//                         className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                         onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: undefined } }))}
//                     >
//                         <Text className="text-white text-center font-bold">Delete Image</Text>
//                     </TouchableOpacity>
//                 </View>
//             ) : (
//                 <View className="flex-row mb-4">
//                     <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickImageFromGallery}>
//                         <Text className="text-black font-bold">Pick Image</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
//                         <Text className="text-black font-bold">Take Photo</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             {/* ========== Video UPLOAD & PREVIEW ========== */}
//             <Text className="text-yellow-400 font-semibold mb-1">Upload Video</Text>
//             {media[step.key]?.video ? (
//                 <View className="mb-3">
//                     <Video
//                         source={{ uri: media[step.key].video }}
//                         useNativeControls
//                         resizeMode={ResizeMode.CONTAIN}
//                         style={{ width: '100%', height: 120, borderRadius: 10 }} />
//                     <TouchableOpacity
//                         className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                         onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: undefined } }))}
//                     >
//                         <Text className="text-white text-center font-bold">Delete Video</Text>
//                     </TouchableOpacity>
//                 </View>
//             ) : (
//                 <View className="flex-row mb-4">
//                     <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickVideoFromGallery}>
//                         <Text className="text-black font-bold">Pick Video</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={recordVideoWithCamera}>
//                         <Text className="text-black font-bold">Record Video</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}

//             <View className="flex-row justify-between mt-6">
//                 <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                     <Text className="text-white">Back</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//                     <Text className="text-black font-bold">Next</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {claimSteps.length}</Text>
//             <Text className="text-white text-xs mt-4">
//                 Location: {location ? `${location.latitude}, ${location.longitude}` : locError || 'Location not available'}
//             </Text>
//         </ScrollView>
//     );
// }


import { ResizeMode, Video } from 'expo-av';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { claimSteps } from './claim-steps';

// Type for our step media
type StepMedia = {
    image?: string;
    video?: string;
};

export default function ClaimMediaWizard() {
    const params = useLocalSearchParams<any>();
    const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
    const [stepIdx, setStepIdx] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locError, setLocError] = useState<string | null>(null);

    // Device location fetch on mount!
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocError('Permission to access location was denied');
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
        })();
    }, []);

    function resetWizard() {
        setStepIdx(0);
        setMedia({});
        setAccepted(false);
    }

    function handleCancel() {
        resetWizard();
        router.replace('/(main)/dashboard');
    }

    useEffect(() => {
        setStepIdx(0);
        setMedia({});
        setAccepted(false);
    }, []);

    const step = claimSteps[stepIdx];

    useEffect(() => {
        const backAction = () => {
            if (stepIdx === 0) {
                Alert.alert(
                    'Cancel Warranty Claim?',
                    'Are you sure you want to cancel the warranty claim and go back to dashboard?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Leave',
                            style: 'destructive',
                            onPress: handleCancel
                        },
                    ]
                );
                return true;
            } else {
                setStepIdx(i => i - 1);
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [stepIdx]);

    // ---- Image Handlers
    async function pickImageFromGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
        }
    }
    async function takeImageWithCamera() {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
        }
    }
    // ---- Video Handlers
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
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
        }
    }

    function goNext() {
        // Require at least one media
        if (!media[step.key]?.image && !media[step.key]?.video) {
            Alert.alert('Please upload at least an image or a video before proceeding.');
            return;
        }
        setStepIdx(i => i + 1);
    }
    function goBack() {
        if (stepIdx === 0) {
            Alert.alert(
                'Cancel Warranty Claim?',
                'Are you sure you want to cancel the warranty claim and go back to dashboard?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Leave',
                        style: 'destructive',
                        onPress: handleCancel,
                    },
                ]
            );
        } else {
            setStepIdx(i => i - 1);
        }
    }

    function handleSubmit() {
        // Compose full data
        const payload = {
            ...params,
            media,
            location,
        };
        // TODO: upload payload to API!
        resetWizard();
        Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
        router.replace('/(main)/warranty/claim-status');
    }

    // ---- Review & Submit step
    if (stepIdx >= claimSteps.length) {
        return (
            <View className="flex-1 bg-black p-6">
                <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                    {claimSteps.map(s => (
                        <View key={s.key} className="mb-5">
                            <Text className="text-yellow-400">{s.title}</Text>
                            {typeof media[s.key]?.image === 'string' && (
                                <Image
                                    source={{ uri: media[s.key]?.image as string }}
                                    style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
                                />
                            )}
                            {typeof media[s.key]?.video === 'string' && (
                                <Video
                                    source={{ uri: media[s.key]?.video as string }}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
                                />
                            )}
                            {!media[s.key]?.image && !media[s.key]?.video && (
                                <Text className="text-red-400 mt-2">No media uploaded</Text>
                            )}
                        </View>
                    ))}
                    <View className="flex-row items-center mb-5 mt-4">
                        <Checkbox
                            value={accepted}
                            onValueChange={setAccepted}
                            color={accepted ? '#FAD90E' : '#888'}
                            style={{ marginRight: 8 }}
                        />
                        <Text className="text-white ml-2 flex-shrink">
                            I confirm that all the details and documentation provided are correct.
                        </Text>
                    </View>
                    <Text className="text-white text-xs mt-3 mb-4">
                        Location: {location ? `${location.latitude}, ${location.longitude}` : locError || 'Location not available'}
                    </Text>
                </ScrollView>
                <TouchableOpacity
                    className={`py-4 rounded-xl mt-4 ${accepted ? 'bg-yellow-400' : 'bg-gray-500'}`}
                    onPress={() => {
                        if (!accepted) {
                            Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
                            return;
                        }
                        handleSubmit();
                    }}
                    disabled={!accepted}
                >
                    <Text className="text-black text-lg font-bold text-center">Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ---- Main step UI
    return (
        <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
            <Text className="text-white mb-2">{step.instruction}</Text>

            {/* Demo instructional video */}
            {step.demoVideo && (
                <Video
                    source={{ uri: step.demoVideo as string }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
                />
            )}

            {/* ========== Image UPLOAD & PREVIEW ========== */}
            <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
            {typeof media[step.key]?.image === 'string' ? (
                <View className="mb-3">
                    <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
                    <TouchableOpacity
                        className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
                        onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: undefined } }))}
                    >
                        <Text className="text-white text-center font-bold">Delete Image</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row mb-4">
                    <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickImageFromGallery}>
                        <Text className="text-black font-bold">Pick Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
                        <Text className="text-black font-bold">Take Photo</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* ========== Video UPLOAD & PREVIEW ========== */}
            <Text className="text-yellow-400 font-semibold mb-1">Upload Video</Text>
            {typeof media[step.key]?.video === 'string' ? (
                <View className="mb-3">
                    <Video
                        source={{ uri: media[step.key]?.video as string }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        style={{ width: '100%', height: 120, borderRadius: 10 }} />
                    <TouchableOpacity
                        className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
                        onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: undefined } }))}
                    >
                        <Text className="text-white text-center font-bold">Delete Video</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row mb-4">
                    <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickVideoFromGallery}>
                        <Text className="text-black font-bold">Pick Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={recordVideoWithCamera}>
                        <Text className="text-black font-bold">Record Video</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View className="flex-row justify-between mt-6">
                <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
                    <Text className="text-white">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
                    <Text className="text-black font-bold">Next</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {claimSteps.length}</Text>
            <Text className="text-white text-xs mt-4">
                Location: {location ? `${location.latitude}, ${location.longitude}` : locError || 'Location not available'}
            </Text>
        </ScrollView>
    );
}
