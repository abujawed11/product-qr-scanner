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


// import { ResizeMode, Video } from 'expo-av';
// import Checkbox from 'expo-checkbox';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
//                             {typeof media[s.key]?.image === 'string' && (
//                                 <Image
//                                     source={{ uri: media[s.key]?.image as string }}
//                                     style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                                 />
//                             )}
//                             {typeof media[s.key]?.video === 'string' && (
//                                 <Video
//                                     source={{ uri: media[s.key]?.video as string }}
//                                     useNativeControls
//                                     resizeMode={ResizeMode.CONTAIN}
//                                     style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
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
//                     source={{ uri: step.demoVideo as string }}
//                     useNativeControls
//                     resizeMode={ResizeMode.CONTAIN}
//                     style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//                 />
//             )}

//             {/* ========== Image UPLOAD & PREVIEW ========== */}
//             <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
//             {typeof media[step.key]?.image === 'string' ? (
//                 <View className="mb-3">
//                     <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
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
//             {typeof media[step.key]?.video === 'string' ? (
//                 <View className="mb-3">
//                     <Video
//                         source={{ uri: media[step.key]?.video as string }}
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


// import { ResizeMode, Video } from 'expo-av';
// import Checkbox from 'expo-checkbox';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { checklistItems, claimSteps } from './claim-steps'; // <-- Import your array of steps

// // You can also import checklistItems from claim-steps.tsx for reusability
// // const checklistItems = [
// //   { key: 'materials_tools_prepared', question: 'Materials & Tools Prepared' },
// //   { key: 'layout_marked', question: 'Layout Marked Correctly' },
// //   { key: 'columns_installed', question: 'Columns Installed & Aligned' },
// //   { key: 'rcc_cured', question: 'RCC Pedestals Cured' },
// //   { key: 'rafters_fixed', question: 'Rafters Fixed & Tilt Verified' },
// //   { key: 'bracing_installed', question: 'All Bracing Installed' },
// //   { key: 'purlins_secured', question: 'Purlins Secured with Washers' },
// //   { key: 'pv_installed', question: 'PV Modules Installed & Torqued' },
// //   { key: 'qa_done', question: 'Final QA & Safety Checks Done' },
// // ];

// // Type for our step media
// type StepMedia = {
//   image?: string;
//   video?: string;
// };

// export default function ClaimMediaWizard() {
//   const params = useLocalSearchParams<any>();
//   const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
//   const [stepIdx, setStepIdx] = useState(0);
//   const [accepted, setAccepted] = useState(false);

//   // Checklist state
//   const [checklistAnswers, setChecklistAnswers] = useState<{ [k: string]: boolean }>({});

//   // Location states (for last screen only)
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [locError, setLocError] = useState<string | null>(null);
//   const [locationLoading, setLocationLoading] = useState(false);

//   // Helper step logic
//   const lastStepIdx = claimSteps.length + 1; // Steps + checklist + review
//   const checklistStepIdx = claimSteps.length;
//   const reviewStepIdx = claimSteps.length + 1;

//   // Reset logic
//   function resetWizard() {
//     setStepIdx(0);
//     setMedia({});
//     setAccepted(false);
//     setChecklistAnswers({});
//     setLocation(null);
//     setLocError(null);
//     setLocationLoading(false);
//   }

//   function handleCancel() {
//     resetWizard();
//     router.replace('/(main)/dashboard');
//   }

//   useEffect(() => {
//     setStepIdx(0);
//     setMedia({});
//     setAccepted(false);
//     setChecklistAnswers({});
//     setLocation(null);
//     setLocError(null);
//     setLocationLoading(false);
//   }, []);

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
//               onPress: handleCancel
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

//   // ---- Image/Video Pickers (same as yours) ----

//   async function pickImageFromGallery() {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//     }
//   }
//   async function takeImageWithCamera() {
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//     }
//   }
//   async function pickVideoFromGallery() {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//     }
//   }
//   async function recordVideoWithCamera() {
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       quality: 0.7,
//     });
//     if (!result.canceled && result.assets?.length) {
//       setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//     }
//   }

//   // Navigation
//   const step = claimSteps[stepIdx];

//   function goNext() {
//     // Media steps validation (at least one media)
//     if (stepIdx < claimSteps.length) {
//       if (!media[step.key]?.image && !media[step.key]?.video) {
//         Alert.alert('Please upload at least an image or a video before proceeding.');
//         return;
//       }
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
//             onPress: handleCancel,
//           },
//         ]
//       );
//     } else {
//       setStepIdx(i => i - 1);
//     }
//   }

//   // ---- Checklist step ----
//   if (stepIdx === checklistStepIdx) {
//     const allAnswered = checklistItems.every(item => {
//       return checklistAnswers[item.key] !== undefined;
//     });

//     return (
//       <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">
//           Installation Checklist
//         </Text>
//         {checklistItems.map(item => (
//           <View key={item.key} className="mb-4 flex-row items-center justify-between">
//             <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
//             <TouchableOpacity
//               className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
//               onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
//             >
//               <Text className="font-bold text-black">YES</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
//               onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
//             >
//               <Text className="font-bold text-black">NO</Text>
//             </TouchableOpacity>
//           </View>
//         ))}

//         <View className="flex-row justify-between mt-10">
//           <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//             <Text className="text-white">Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             disabled={!allAnswered}
//             className={`px-8 py-2 rounded-xl ${allAnswered ? 'bg-yellow-400' : 'bg-gray-500'}`}
//             onPress={() => setStepIdx(i => i + 1)}
//           >
//             <Text className="text-black font-bold">Next</Text>
//           </TouchableOpacity>
//         </View>
//         <Text className="text-white text-center mt-6">
//           Step {stepIdx + 1} of {lastStepIdx + 1}
//         </Text>
//       </ScrollView>
//     );
//   }

//   // ---- Review & Submit step
//   if (stepIdx === reviewStepIdx) {
//     // Fetch location permission **only when arriving at this step**
//     useEffect(() => {
//       if (location || locationLoading) return;
//       getLocationWithPermission();
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     async function getLocationWithPermission() {
//       setLocationLoading(true);
//       setLocError(null);
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//           setLocError('Location permission denied');
//           setLocation(null);
//           return;
//         }
//         const loc = await Location.getCurrentPositionAsync({});
//         setLocation({
//           latitude: loc.coords.latitude,
//           longitude: loc.coords.longitude,
//         });
//       } catch (err) {
//         setLocError('Failed to get device location');
//         setLocation(null);
//       } finally {
//         setLocationLoading(false);
//       }
//     }

//     const canSubmit = accepted && !!location && !locationLoading;

//     return (
//       <View className="flex-1 bg-black p-6">
//         <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//         <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//           {claimSteps.map(s => (
//             <View key={s.key} className="mb-5">
//               <Text className="text-yellow-400">{s.title}</Text>
//               {typeof media[s.key]?.image === 'string' && (
//                 <Image
//                   source={{ uri: media[s.key]?.image as string }}
//                   style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                 />
//               )}
//               {typeof media[s.key]?.video === 'string' && (
//                 <Video
//                   source={{ uri: media[s.key]?.video as string }}
//                   useNativeControls
//                   resizeMode={ResizeMode.CONTAIN}
//                   style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
//                 />
//               )}
//               {!media[s.key]?.image && !media[s.key]?.video && (
//                 <Text className="text-red-400 mt-2">No media uploaded</Text>
//               )}
//             </View>
//           ))}

//           {/* Checklist Summary */}
//           <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
//           {checklistItems.map(item => (
//             <Text
//               key={item.key}
//               className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
//               style={{ fontWeight: 'bold', fontSize: 15 }}
//             >
//               {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
//             </Text>
//           ))}

//           <View className="flex-row items-center mb-5 mt-4">
//             <Checkbox
//               value={accepted}
//               onValueChange={setAccepted}
//               color={accepted ? '#FAD90E' : '#888'}
//               style={{ marginRight: 8 }}
//             />
//             <Text className="text-white ml-2 flex-shrink">
//               I confirm that all the details and documentation provided are correct.
//             </Text>
//           </View>

//           {/* LOCATION UI */}
//           <View style={{ alignItems: 'center', marginVertical: 16 }}>
//             <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//               Location:
//             </Text>
//             {locationLoading && (
//               <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                 Loading location...
//               </Text>
//             )}
//             {!locationLoading && location && (
//               <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                 {location.latitude}, {location.longitude}
//               </Text>
//             )}
//             {((locError || !location) && !locationLoading) && (
//               <>
//                 <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                   {locError || 'Location not available'}
//                 </Text>
//                 <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
//                   Location permission is required to submit warranty request!
//                 </Text>
//                 <TouchableOpacity
//                   onPress={getLocationWithPermission}
//                   className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
//                 >
//                   <Text className="text-black text-base font-bold">Grant Permission</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </ScrollView>

//         <TouchableOpacity
//           className={`py-4 rounded-xl mt-4 ${canSubmit ? 'bg-yellow-400' : 'bg-gray-500'}`}
//           onPress={() => {
//             if (!accepted) {
//               Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//               return;
//             }
//             if (!location) {
//               Alert.alert('Location Required', 'Grant location permission to proceed.');
//               return;
//             }
//             handleSubmit();
//           }}
//           disabled={!canSubmit}
//         >
//           <Text className="text-black text-lg font-bold text-center">Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ---- Main Step UI (media) ----
//   return (
//     <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//       <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//       <Text className="text-white mb-2">{step.instruction}</Text>

//       {/* Demo instructional video */}
//       {step.demoVideo && (
//         <Video
//           source={{ uri: step.demoVideo as string }}
//           useNativeControls
//           resizeMode={ResizeMode.CONTAIN}
//           style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//         />
//       )}

//       {/* Image */}
//       <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
//       {typeof media[step.key]?.image === 'string' ? (
//         <View className="mb-3">
//           <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
//           <TouchableOpacity
//             className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//             onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: undefined } }))}
//           >
//             <Text className="text-white text-center font-bold">Delete Image</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View className="flex-row mb-4">
//           <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickImageFromGallery}>
//             <Text className="text-black font-bold">Pick Image</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
//             <Text className="text-black font-bold">Take Photo</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Video */}
//       <Text className="text-yellow-400 font-semibold mb-1">Upload Video</Text>
//       {typeof media[step.key]?.video === 'string' ? (
//         <View className="mb-3">
//           <Video
//             source={{ uri: media[step.key]?.video as string }}
//             useNativeControls
//             resizeMode={ResizeMode.CONTAIN}
//             style={{ width: '100%', height: 120, borderRadius: 10 }} />
//           <TouchableOpacity
//             className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//             onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: undefined } }))}
//           >
//             <Text className="text-white text-center font-bold">Delete Video</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <View className="flex-row mb-4">
//           <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickVideoFromGallery}>
//             <Text className="text-black font-bold">Pick Video</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={recordVideoWithCamera}>
//             <Text className="text-black font-bold">Record Video</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <View className="flex-row justify-between mt-6">
//         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//           <Text className="text-white">Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//           <Text className="text-black font-bold">Next</Text>
//         </TouchableOpacity>
//       </View>
//       <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {lastStepIdx + 1}</Text>
//     </ScrollView>
//   );

//   function handleSubmit() {
//     // Compose full data -- you can store checklist etc. as needed!
//     const payload = {
//       ...params,
//       media,
//       location,
//       checklist: checklistAnswers,
//     };
//     // TODO: upload payload to API!
//     resetWizard();
//     Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//     router.replace('/(main)/warranty/claim-status');
//   }
// }


// import { ResizeMode, Video } from 'expo-av';
// import Checkbox from 'expo-checkbox';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import { goBack } from 'expo-router/build/global-state/routing';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { checklistItems, claimSteps } from './claim-steps';

// type StepMedia = {
//   image?: string;
//   video?: string;
// };

// export default function ClaimMediaWizard() {
//   const params = useLocalSearchParams<any>();
//   const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
//   const [stepIdx, setStepIdx] = useState(0);
//   const [accepted, setAccepted] = useState(false);

//   // Checklist state
//   const [checklistAnswers, setChecklistAnswers] = useState<{ [k: string]: boolean }>({});

//   // Location
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [locError, setLocError] = useState<string | null>(null);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

//   // Helper step logic
//   const lastStepIdx = claimSteps.length + 1;
//   const checklistStepIdx = claimSteps.length;
//   const reviewStepIdx = claimSteps.length + 1;

//   function resetWizard() {
//     setStepIdx(0);
//     setMedia({});
//     setAccepted(false);
//     setChecklistAnswers({});
//     setLocation(null);
//     setLocError(null);
//     setLocationLoading(false);
//     setHasRequestedLocation(false);
//   }

//   function handleCancel() {
//     resetWizard();
//     router.replace('/(main)/dashboard');
//   }

//   useEffect(() => {
//     setStepIdx(0);
//     setMedia({});
//     setAccepted(false);
//     setChecklistAnswers({});
//     setLocation(null);
//     setLocError(null);
//     setLocationLoading(false);
//     setHasRequestedLocation(false);
//   }, []);

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
//               onPress: handleCancel
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

//   // =========================
//   // Fix: move this OUTSIDE render-if block!
//   // Only run this when entering the review step, not before, so trigger when stepIdx changes.
//   useEffect(() => {
//     if (
//       stepIdx === reviewStepIdx &&
//       !hasRequestedLocation
//     ) {
//       setHasRequestedLocation(true);
//       getLocationWithPermission();
//     }
//     // If user goes back to checklist and then again to review, re-request is allowed.
//     else if (
//       stepIdx !== reviewStepIdx && hasRequestedLocation
//     ) {
//       setHasRequestedLocation(false);
//       setLocation(null);
//       setLocError(null);
//       setLocationLoading(false);
//     }
//     // eslint-disable-next-line
//   }, [stepIdx]);

//   async function getLocationWithPermission() {
//     setLocationLoading(true);
//     setLocError(null);
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setLocError('Location permission denied');
//         setLocation(null);
//         return;
//       }
//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation({
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//       });
//     } catch (err) {
//       setLocError('Failed to get device location');
//       setLocation(null);
//     } finally {
//       setLocationLoading(false);
//     }
//   }

//   // ------ Media pickers, goNext, goBack, handleSubmit... remain unchanged
//   // They are fine where you have them now.

//   const step = claimSteps[stepIdx];

//   // ============= Checklist step unchanged...

//   if (stepIdx === checklistStepIdx) {
//     const allAnswered = checklistItems.every(item => checklistAnswers[item.key] !== undefined);

//     return (
//       <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">
//           Installation Checklist
//         </Text>
//         {checklistItems.map(item => (
//           <View key={item.key} className="mb-4 flex-row items-center justify-between">
//             <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
//             <TouchableOpacity
//               className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
//               onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
//             >
//               <Text className="font-bold text-black">YES</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
//               onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
//             >
//               <Text className="font-bold text-black">NO</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//         <View className="flex-row justify-between mt-10">
//           <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//             <Text className="text-white">Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             disabled={!allAnswered}
//             className={`px-8 py-2 rounded-xl ${allAnswered ? 'bg-yellow-400' : 'bg-gray-500'}`}
//             onPress={() => setStepIdx(i => i + 1)}
//           >
//             <Text className="text-black font-bold">Next</Text>
//           </TouchableOpacity>
//         </View>
//         <Text className="text-white text-center mt-6">
//           Step {stepIdx + 1} of {lastStepIdx + 1}
//         </Text>
//       </ScrollView>
//     );
//   }

//   // ============= Review & Submit step =============

//   if (stepIdx === reviewStepIdx) {
//     const canSubmit = accepted && !!location && !locationLoading;

//     return (
//       <View className="flex-1 bg-black p-6">
//         <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//         <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//           {claimSteps.map(s => (
//             <View key={s.key} className="mb-5">
//               <Text className="text-yellow-400">{s.title}</Text>
//               {typeof media[s.key]?.image === 'string' && (
//                 <Image
//                   source={{ uri: media[s.key]?.image as string }}
//                   style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                 />
//               )}
//               {typeof media[s.key]?.video === 'string' && (
//                 <Video
//                   source={{ uri: media[s.key]?.video as string }}
//                   useNativeControls
//                   resizeMode={ResizeMode.CONTAIN}
//                   style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
//                 />
//               )}
//               {!media[s.key]?.image && !media[s.key]?.video && (
//                 <Text className="text-red-400 mt-2">No media uploaded</Text>
//               )}
//             </View>
//           ))}
//           {/* Checklist Summary */}
//           <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
//           {checklistItems.map(item => (
//             <Text
//               key={item.key}
//               className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
//               style={{ fontWeight: 'bold', fontSize: 15 }}
//             >
//               {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
//             </Text>
//           ))}
//           <View className="flex-row items-center mb-5 mt-4">
//             <Checkbox
//               value={accepted}
//               onValueChange={setAccepted}
//               color={accepted ? '#FAD90E' : '#888'}
//               style={{ marginRight: 8 }}
//             />
//             <Text className="text-white ml-2 flex-shrink">
//               I confirm that all the details and documentation provided are correct.
//             </Text>
//           </View>
//           {/* LOCATION UI */}
//           <View style={{ alignItems: 'center', marginVertical: 16 }}>
//             <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//               Location:
//             </Text>
//             {locationLoading && (
//               <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                 Loading location...
//               </Text>
//             )}
//             {!locationLoading && location && (
//               <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                 {location.latitude}, {location.longitude}
//               </Text>
//             )}
//             {((locError || !location) && !locationLoading) && (
//               <>
//                 <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                   {locError || 'Location not available'}
//                 </Text>
//                 <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
//                   Location permission is required to submit warranty request!
//                 </Text>
//                 <TouchableOpacity
//                   onPress={getLocationWithPermission}
//                   className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
//                 >
//                   <Text className="text-black text-base font-bold">Grant Permission</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </ScrollView>
//         <TouchableOpacity
//           className={`py-4 rounded-xl mt-4 ${canSubmit ? 'bg-yellow-400' : 'bg-gray-500'}`}
//           onPress={() => {
//             if (!accepted) {
//               Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//               return;
//             }
//             if (!location) {
//               Alert.alert('Location Required', 'Grant location permission to proceed.');
//               return;
//             }
//             handleSubmit();
//           }}
//           disabled={!canSubmit}
//         >
//           <Text className="text-black text-lg font-bold text-center">Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }


//   // ============= Step UI (media) unchanged...
//   return (
//     <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//       {/* ... copy the previous code from your version ... */}
//       {/* (Your step media upload code stays the same!) */}
//     </ScrollView>
//   );


//   function handleSubmit() {
//     const payload = {
//       ...params,
//       media,
//       location,
//       checklist: checklistAnswers,
//     };
//     // TODO: upload payload to API!
//     resetWizard();
//     Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//     router.replace('/(main)/warranty/claim-status');
//   }
// }

//==============working 12:22================
// import api from '@/utils/api';
// import { AxiosError } from 'axios';
// import { ResizeMode, Video } from 'expo-av';
// import Checkbox from 'expo-checkbox';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import { sha256 } from 'js-sha256';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Alert, BackHandler, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { checklistItems, claimSteps } from './claim-steps';


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
//     const [checklistAnswers, setChecklistAnswers] = useState<{ [k: string]: boolean }>({});

//     // Location (only for last step)
//     const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//     const [locError, setLocError] = useState<string | null>(null);
//     const [locationLoading, setLocationLoading] = useState(false);
//     const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

//     // Helper indices
//     const checklistStepIdx = claimSteps.length;
//     const reviewStepIdx = claimSteps.length + 1;
//     const lastStepIdx = reviewStepIdx;

//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);


//     async function compressImage(imageUri: string): Promise<string> {
//         try {
//             const manipResult = await ImageManipulator.manipulateAsync(
//                 imageUri,
//                 [{ resize: { width: 1280 } }],
//                 { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//             );
//             return manipResult.uri;
//         } catch (err) {
//             return imageUri;
//         }
//     }

//     function getDateTimeLocationStamp(location: { latitude: number; longitude: number } | null) {
//         const now = new Date();
//         let str = now.toLocaleString();
//         if (location) {
//             str += ` | Lat: ${location.latitude.toFixed(5)}, Lon: ${location.longitude.toFixed(5)}`;
//         }
//         return str;
//     }

//     // --- Image Hash helper
//     async function computeImageHash(uri: string): Promise<string> {
//         // Should use fetch arrayBuffer; fallback to reading binary if needed
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         const buffer = await blob.arrayBuffer();
//         const hash = sha256(new Uint8Array(buffer));
//         return hash;
//     }

//     // --- Video Hash helper
//     async function computeVideoHash(uri: string): Promise<string> {
//         // Same as for image, but for videos
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         const buffer = await blob.arrayBuffer();
//         const hash = sha256(new Uint8Array(buffer));
//         return hash;
//     }

//     // --- Camera image (stamped)


//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//         setChecklistAnswers({});
//         setLocation(null);
//         setLocError(null);
//         setLocationLoading(false);
//         setHasRequestedLocation(false);
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace('/(main)/dashboard');
//     }

//     // Reset all data when wizard first mounts/relaunches
//     useEffect(() => {
//         resetWizard();
//         // eslint-disable-next-line
//     }, []);

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
//                             onPress: handleCancel,
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

//     // Location logic - only at review step, clean up if leaving
//     useEffect(() => {
//         if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
//             setHasRequestedLocation(true);
//             getLocationWithPermission();
//         } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
//             setHasRequestedLocation(false);
//             setLocation(null);
//             setLocError(null);
//             setLocationLoading(false);
//         }
//         // eslint-disable-next-line
//     }, [stepIdx]);

//     //   async function getLocationWithPermission() {
//     //     setLocationLoading(true);
//     //     setLocError(null);
//     //     try {
//     //       const { status } = await Location.requestForegroundPermissionsAsync();
//     //       if (status !== 'granted') {
//     //         setLocError('Location permission denied');
//     //         setLocation(null);
//     //         return;
//     //       }
//     //       const loc = await Location.getCurrentPositionAsync({});
//     //       setLocation({
//     //         latitude: loc.coords.latitude,
//     //         longitude: loc.coords.longitude,
//     //       });
//     //     } catch (err) {
//     //       setLocError('Failed to get device location');
//     //       setLocation(null);
//     //     } finally {
//     //       setLocationLoading(false);
//     //     }
//     //   }

//     async function getLocationWithPermission() {
//         setLocationLoading(true);
//         setLocError(null);
//         try {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setLocError('Location permission denied');
//                 setLocation(null);
//             } else {
//                 const loc = await Location.getCurrentPositionAsync({});
//                 setLocation({
//                     latitude: loc.coords.latitude,
//                     longitude: loc.coords.longitude,
//                 });
//             }
//         } catch (err) {
//             setLocError('Failed to get device location');
//             setLocation(null);
//         } finally {
//             setLocationLoading(false);
//         }
//     }


//     // Media step logic
//     const step = claimSteps[stepIdx];

//     // async function pickImageFromGallery() {
//     //     const result = await ImagePicker.launchImageLibraryAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //         allowsEditing: true,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//     //     }
//     // }
//     async function pickImageFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1, // Get highest quality, then compress later
//         });
//         if (!result.canceled && result.assets?.length) {
//             const originalUri = result.assets[0].uri;
//             const compressedUri = await compressImage(originalUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: compressedUri } }));
//         }
//     }
//     // async function takeImageWithCamera() {
//     //     const result = await ImagePicker.launchCameraAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //         allowsEditing: true,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//     //     }
//     // }

//     // async function takeImageWithCamera() {
//     //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     //     if (status !== 'granted') {
//     //         Alert.alert('Camera permission is required to take a picture.');
//     //         return;
//     //     }
//     //     const result = await ImagePicker.launchCameraAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //         allowsEditing: true,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
//     //     }
//     // }

//     async function takeImageWithCamera() {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Camera permission is required to take a picture.');
//             return;
//         }
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });
//         if (!result.canceled && result.assets?.length) {
//             const originalUri = result.assets[0].uri;
//             const compressedUri = await compressImage(originalUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: compressedUri } }));
//         }
//     }



//     async function pickVideoFromGallery() {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//     }
//     // async function recordVideoWithCamera() {
//     //     const result = await ImagePicker.launchCameraAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//     //     }
//     // }

//     async function recordVideoWithCamera() {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Camera permission is required to record a video.');
//             return;
//         }
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//             quality: 0.7,
//         });
//         if (!result.canceled && result.assets?.length) {
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
//         }
//     }

//     function goNext() {
//         // For media steps: require at least one upload
//         if (stepIdx < checklistStepIdx) {
//             if (!media[step.key]?.image && !media[step.key]?.video) {
//                 Alert.alert('Please upload at least an image or a video before proceeding.');
//                 return;
//             }
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


//     async function handleSubmit() {
//         // Build FormData for fields
//         setIsSubmitting(true);
//         setUploadProgress(0);
//         const formData = new FormData();

//         // Add all text fields (from params)
//         formData.append('clientId', params.clientId || '');
//         formData.append('companyName', params.companyName || '');
//         formData.append('clientName', params.clientName || '');
//         formData.append('phone', params.phone || '');
//         formData.append('email', params.email || '');
//         formData.append('orderId', params.orderId || '');
//         formData.append('kitId', params.kitId || '');
//         formData.append('kitNo', params.kitNo || '');
//         formData.append('projectId', params.projectId || '');
//         formData.append('purchaseDate', params.purchaseDate || '');
//         formData.append('accepted_statement', accepted ? 'true' : 'false');

//         // Add location
//         if (location) {
//             formData.append('latitude', String(location.latitude));
//             formData.append('longitude', String(location.longitude));
//         }

//         // Checklist (must be stringified for backend JSONField)
//         formData.append('checklist', JSON.stringify(checklistAnswers || {}));

//         // --- Flatten and append all media ---
//         // media: { stepKey: { image, video } }
//         Object.entries(media).forEach(([stepKey, mediaObject]) => {
//             Object.entries(mediaObject).forEach(([mediaType, uri]) => {
//                 if (!uri) return;
//                 const fileExt = mediaType === 'image'
//                     ? uri.split('.').pop() || 'jpg'
//                     : uri.split('.').pop() || 'mp4';
//                 const mime =
//                     mediaType === 'image'
//                         ? 'image/jpeg' // You could try guessing from ext, but jpeg is safest for mobile/Expo.
//                         : 'video/mp4';
//                 formData.append('files', {
//                     uri,
//                     name: `step_${stepKey}_${mediaType}.${fileExt}`,
//                     type: mime,
//                 } as any);
//                 formData.append('step_key', stepKey);
//                 formData.append('media_type', mediaType);
//             });
//         });

//         // ---- API SUBMIT ----
//         try {
//             const response = await api.post(
//                 '/warranty-claims/', // <--- CHANGE to your backend!
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         // 'Authorization': `Bearer ${token}`      // If you need auth
//                     },
//                     timeout: 120000 // Optional, long timeout for big uploads
//                 }
//             );

//             if (response.status === 201 || response.status === 200) {
//                 resetWizard();
//                 Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//                 router.replace('/warranty-status');
//             } else {
//                 Alert.alert('Error', 'Unexpected server response. Please try again.');
//             }
//         } catch (error) {
//             const err = error as AxiosError;
//             if (err.response && err.response.data && typeof err.response.data === "object") {
//                 const data = err.response.data as any;
//                 Alert.alert('Submission Error', data.detail || JSON.stringify(data));
//             } else {
//                 Alert.alert('Submission Error', 'Could not submit your claim. Please check your network or try again.');
//             }
//         }
//         finally {
//             setIsSubmitting(false);
//             setUploadProgress(0);
//         }
//     }

//     // function handleSubmit() {
//     //     const payload = {
//     //         ...params,
//     //         media,
//     //         location,
//     //         checklist: checklistAnswers,
//     //     };
//     //     // TODO: upload payload to API if needed
//     //     resetWizard();
//     //     Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//     //     router.replace('/warranty-status');
//     // }

//     // ======= Media Upload Steps =======
//     if (stepIdx < checklistStepIdx) {
//         return (
//             <>
//                 <Modal visible={isSubmitting} transparent animationType="fade">
//                     <View style={{
//                         flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
//                     }}>
//                         <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
//                             <ActivityIndicator size="large" color="#FACC15" />
//                             <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
//                                 Uploading... {Math.round(Math.max(0, Math.min(uploadProgress, 100)))}%
//                             </Text>
//                         </View>
//                     </View>
//                 </Modal>
//                 <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//                     <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//                     <Text className="text-white mb-2">{step.instruction}</Text>
//                     {/* Demo Video (optional) */}
//                     {step.demoVideo && (
//                         <Video
//                             source={{ uri: step.demoVideo as string }}
//                             useNativeControls
//                             resizeMode={ResizeMode.CONTAIN}
//                             style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//                         />
//                     )}

//                     {/* Image */}
//                     <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
//                     {typeof media[step.key]?.image === 'string' ? (
//                         <View className="mb-3">
//                             <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
//                             <TouchableOpacity
//                                 className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                                 onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: undefined } }))}
//                             >
//                                 <Text className="text-white text-center font-bold">Delete Image</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View className="flex-row mb-4">
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickImageFromGallery}>
//                                 <Text className="text-black font-bold">Pick Image</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
//                                 <Text className="text-black font-bold">Take Photo</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}

//                     {/* Video */}
//                     <Text className="text-yellow-400 font-semibold mb-1">Upload Video</Text>
//                     {typeof media[step.key]?.video === 'string' ? (
//                         <View className="mb-3">
//                             <Video
//                                 source={{ uri: media[step.key]?.video as string }}
//                                 useNativeControls
//                                 resizeMode={ResizeMode.CONTAIN}
//                                 style={{ width: '100%', height: 120, borderRadius: 10 }} />
//                             <TouchableOpacity
//                                 className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                                 onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: undefined } }))}
//                             >
//                                 <Text className="text-white text-center font-bold">Delete Video</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View className="flex-row mb-4">
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickVideoFromGallery}>
//                                 <Text className="text-black font-bold">Pick Video</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={recordVideoWithCamera}>
//                                 <Text className="text-black font-bold">Record Video</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}

//                     {/* Navigation */}
//                     <View className="flex-row justify-between mt-6">
//                         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                             <Text className="text-white">Back</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//                             <Text className="text-black font-bold">Next</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {lastStepIdx + 1}</Text>
//                 </ScrollView>
//             </>
//         );
//     }

//     // ======= Checklist Step =======
//     if (stepIdx === checklistStepIdx) {
//         const allAnswered = checklistItems.every(item => checklistAnswers[item.key] !== undefined);
//         return (
//             <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//                 <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">
//                     Installation Checklist
//                 </Text>
//                 {checklistItems.map(item => (
//                     <View key={item.key} className="mb-4 flex-row items-center justify-between">
//                         <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
//                         <TouchableOpacity
//                             className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
//                             onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
//                         >
//                             <Text className="font-bold text-black">YES</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
//                             onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
//                         >
//                             <Text className="font-bold text-black">NO</Text>
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//                 <View className="flex-row justify-between mt-10">
//                     <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                         <Text className="text-white">Back</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         disabled={!allAnswered}
//                         className={`px-8 py-2 rounded-xl ${allAnswered ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                         onPress={() => setStepIdx(i => i + 1)}
//                     >
//                         <Text className="text-black font-bold">Next</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Text className="text-white text-center mt-6">
//                     Step {stepIdx + 1} of {lastStepIdx + 1}
//                 </Text>
//                 {/* <Modal visible={isSubmitting} transparent animationType="fade">
//                     <View style={{
//                         flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
//                     }}>
//                         <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
//                             <ActivityIndicator size="large" color="#FACC15" />
//                             <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
//                                 Uploading... {Math.round(uploadProgress)}%
//                             </Text>
//                         </View>
//                     </View>
//                 </Modal> */}
//             </ScrollView>

//         );
//     }

//     // ======= Review & Submit Step =======
//     if (stepIdx === reviewStepIdx) {
//         const canSubmit = accepted && !!location && !locationLoading;

//         return (
//             <View className="flex-1 bg-black p-6">
//                 <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                 <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//                     {claimSteps.map(s => (
//                         <View key={s.key} className="mb-5">
//                             <Text className="text-yellow-400">{s.title}</Text>
//                             {typeof media[s.key]?.image === 'string' && (
//                                 <Image
//                                     source={{ uri: media[s.key]?.image as string }}
//                                     style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                                 />
//                             )}
//                             {typeof media[s.key]?.video === 'string' && (
//                                 <Video
//                                     source={{ uri: media[s.key]?.video as string }}
//                                     useNativeControls
//                                     resizeMode={ResizeMode.CONTAIN}
//                                     style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
//                                 />
//                             )}
//                             {!media[s.key]?.image && !media[s.key]?.video && (
//                                 <Text className="text-red-400 mt-2">No media uploaded</Text>
//                             )}
//                         </View>
//                     ))}
//                     {/* Checklist Summary */}
//                     <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
//                     {checklistItems.map(item => (
//                         <Text
//                             key={item.key}
//                             className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
//                             style={{ fontWeight: 'bold', fontSize: 15 }}
//                         >
//                             {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
//                         </Text>
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
//                     {/* LOCATION UI */}
//                     <View style={{ alignItems: 'center', marginVertical: 16 }}>
//                         <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                             Location:
//                         </Text>
//                         {locationLoading && (
//                             <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                 Loading location...
//                             </Text>
//                         )}
//                         {!locationLoading && location && (
//                             <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                                 {location.latitude}, {location.longitude}
//                             </Text>
//                         )}
//                         {((locError || !location) && !locationLoading) && (
//                             <>
//                                 <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                     {locError || 'Location not available'}
//                                 </Text>
//                                 <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
//                                     Location permission is required to submit warranty request!
//                                 </Text>
//                                 <TouchableOpacity
//                                     onPress={getLocationWithPermission}
//                                     className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
//                                 >
//                                     <Text className="text-black text-base font-bold">Grant Permission</Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity
//                     className={`py-4 rounded-xl mt-4 ${canSubmit ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                     onPress={() => {
//                         if (!accepted) {
//                             Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//                             return;
//                         }
//                         if (!location) {
//                             Alert.alert('Location Required', 'Grant location permission to proceed.');
//                             return;
//                         }
//                         handleSubmit();
//                     }}
//                     disabled={!canSubmit}
//                 >
//                     <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                 </TouchableOpacity>
//             </View>

//         );
//     }

//     return null; // Should never reach here
// }







// import api from '@/utils/api';
// import type { AxiosProgressEvent } from 'axios';
// import { AxiosError } from 'axios';
// import { ResizeMode, Video } from 'expo-av';
// import { requestPermissionsAsync } from 'expo-av/build/Audio';
// import Checkbox from 'expo-checkbox';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import { sha256 } from 'js-sha256';
// import React, { JSX, useEffect, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert, BackHandler, Image,
//     Modal,
//     ScrollView, Text, TouchableOpacity, View,
// } from 'react-native';
// import { checklistItems, claimSteps } from './claim-steps';

// type StepMedia = {
//     image?: string;
//     imageHash?: string;
//     video?: string;
//     videoHash?: string;
// };
// type MediaState = Record<string, StepMedia>;
// type LocationType = { latitude: number; longitude: number } | null;
// type DuplicateApiResponse = { step_key: string; type: string }[];

// export default function ClaimMediaWizard(): JSX.Element | null {
//     const params = useLocalSearchParams<any>();
//     const [media, setMedia] = useState<MediaState>({});
//     const [stepIdx, setStepIdx] = useState<number>(0);
//     const [accepted, setAccepted] = useState<boolean>(false);
//     const [checklistAnswers, setChecklistAnswers] = useState<Record<string, boolean>>({});
//     const [location, setLocation] = useState<LocationType>(null);
//     const [locError, setLocError] = useState<string | null>(null);
//     const [locationLoading, setLocationLoading] = useState<boolean>(false);
//     const [hasRequestedLocation, setHasRequestedLocation] = useState<boolean>(false);
//     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//     const [uploadProgress, setUploadProgress] = useState<number>(0);

//     const checklistStepIdx = claimSteps.length;
//     const reviewStepIdx = claimSteps.length + 1;
//     const lastStepIdx = reviewStepIdx;

//     function getDateTimeLocationStamp(loc: LocationType): string {
//         const now = new Date();
//         let str = now.toLocaleString();
//         if (loc) {
//             str += ` | Lat: ${loc.latitude.toFixed(5)}, Lon: ${loc.longitude.toFixed(5)}`;
//         }
//         return str;
//     }

//     async function compressImage(imageUri: string): Promise<string> {
//         try {
//             const manipResult = await ImageManipulator.manipulateAsync(
//                 imageUri,
//                 [{ resize: { width: 1280 } }],
//                 { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//             );
//             return manipResult.uri;
//         } catch {
//             return imageUri;
//         }
//     }

//     //   async function stampImage(originalUri: string, loc: LocationType): Promise<string> {
//     //     try {
//     //       const dateString = getDateTimeLocationStamp(loc);
//     //       const manipResult = await ImageManipulator.manipulateAsync(
//     //         originalUri,[]
//     //         { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
//     //       );
//     //       return manipResult.uri;
//     //     } catch {
//     //       return originalUri;
//     //     }
//     //   }

//     async function stampImage(uri: string, _loc: LocationType): Promise<string> {
//         const manipResult = await ImageManipulator.manipulateAsync(
//             uri,
//             [{ resize: { width: 1280 } }],
//             { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//         );
//         return manipResult.uri;
//     }


//     // async function computeFileHash(uri: string): Promise<string> {
//     //     const response = await fetch(uri);
//     //     const blob = await response.blob();
//     //     const buffer = await blob.arrayBuffer();
//     //     return sha256(new Uint8Array(buffer));
//     // }

//     async function computeFileHash(uri: string): Promise<string> {
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         // Polyfill for `blob.arrayBuffer()` in React Native (Expo):
//         const toArrayBuffer = (blob: Blob): Promise<ArrayBuffer> =>
//             new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     // @ts-ignore
//                     resolve(reader.result as ArrayBuffer);
//                 };
//                 reader.onerror = reject;
//                 reader.readAsArrayBuffer(blob as any);
//             });
//         const buffer = await toArrayBuffer(blob);
//         return sha256(new Uint8Array(buffer));
//     }


//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//         setChecklistAnswers({});
//         setLocation(null);
//         setLocError(null);
//         setLocationLoading(false);
//         setHasRequestedLocation(false);
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace('/(main)/dashboard');
//     }

//     useEffect(() => { resetWizard(); }, []);
//     useEffect(() => {
//         const backAction = () => {
//             if (stepIdx === 0) {
//                 Alert.alert(
//                     'Cancel Warranty Claim?',
//                     'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//                     [
//                         { text: 'Cancel', style: 'cancel' },
//                         { text: 'Leave', style: 'destructive', onPress: handleCancel },
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
//     useEffect(() => {
//         if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
//             setHasRequestedLocation(true);
//             getLocationWithPermission();
//         } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
//             setHasRequestedLocation(false);
//             setLocation(null);
//             setLocError(null);
//             setLocationLoading(false);
//         }
//     }, [stepIdx]);

//     async function getLocationWithPermission(): Promise<void> {
//         setLocationLoading(true);
//         setLocError(null);
//         try {
//             const { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 setLocError('Location permission denied');
//                 setLocation(null);
//             } else {
//                 const loc = await Location.getCurrentPositionAsync({});
//                 setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
//             }
//         } catch {
//             setLocError('Failed to get device location');
//             setLocation(null);
//         } finally {
//             setLocationLoading(false);
//         }
//     }

//     // --- Camera: stamp and store (NO hash, always unique)
//     async function takeImageWithCamera(): Promise<void> {
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Camera permission is required to take a picture.');
//             return;
//         }
//         const result = await ImagePicker.launchCameraAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             quality: 1,
//         });
//         if (!result.canceled && result.assets?.length) {
//             const stamped = await stampImage(result.assets[0].uri, location);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: stamped } }));
//         }
//     }

//     // --- Gallery: compress & hash
//     // async function pickImageFromGallery(): Promise<void> {
//     //     const result = await ImagePicker.launchImageLibraryAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     //         allowsEditing: true,
//     //         quality: 1,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         const imageUri = await compressImage(result.assets[0].uri);
//     //         const hash = await computeFileHash(imageUri);
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: imageUri, imageHash: hash } }));
//     //     }
//     // }

//     async function pickImageFromGallery(): Promise<void> {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Gallery permission is required to select a photo.');
//             return;
//         }
//         try {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,   // updated for SDK 50+
//                 allowsEditing: true,
//                 quality: 1,
//             });
//             console.log('ImagePicker result:', result);

//             if (result.canceled) {
//                 Alert.alert('Pick Cancelled', 'No image was selected.');
//                 return;
//             }
//             if (!result.assets || !result.assets.length || !result.assets[0]?.uri) {
//                 Alert.alert('Picker Error', 'No valid image found. Try another one.');
//                 return;
//             }
//             const imageUri = await compressImage(result.assets[0].uri);
//             const hash = await computeFileHash(imageUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: imageUri, imageHash: hash } }));
//         } catch (e) {
//             console.log('ImagePicker Error:', e);
//             Alert.alert('Image Selection Error', 'Unable to pick image. Please try again.\n' + (e instanceof Error ? e.message : String(e)));
//         }
//     }

//     // Re-define computeFileHash as shown above!





//     // async function pickVideoFromGallery(): Promise<void> {
//     //     const result = await ImagePicker.launchImageLibraryAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         const videoUri = result.assets[0].uri;
//     //         const hash = await computeFileHash(videoUri);
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: videoUri, videoHash: hash } }));
//     //     }
//     // }

//     // async function recordVideoWithCamera(): Promise<void> {
//     //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     //     if (status !== 'granted') {
//     //         Alert.alert('Camera permission is required to record a video.');
//     //         return;
//     //     }
//     //     const result = await ImagePicker.launchCameraAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//     //         quality: 0.7,
//     //     });
//     //     if (!result.canceled && result.assets?.length) {
//     //         const videoUri = result.assets[0].uri;
//     //         const hash = await computeFileHash(videoUri);
//     //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: videoUri, videoHash: hash } }));
//     //     }
//     // }

//     async function recordVideoWithCamera(): Promise<void> {
//         const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
//         if (cameraStatus !== 'granted') {
//             Alert.alert('Camera permission is required to record a video.');
//             return;
//         }
//         // Audio permission
//         const { status: micStatus } = await requestPermissionsAsync();
//         if (micStatus !== 'granted') {
//             Alert.alert('Microphone permission is required for audio.');
//             return;
//         }
//         try {
//             const result = await ImagePicker.launchCameraAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Videos, // <- CORRECT usage for expo-image-picker
//                 quality: 0.7,
//             });
//             console.log('Camera Video result:', result);

//             if (result.canceled) {
//                 Alert.alert('Record Cancelled', 'No video was recorded.');
//                 return;
//             }
//             if (!result.assets || !result.assets.length || !result.assets[0]?.uri) {
//                 Alert.alert('Recording Error', 'No valid video recorded.');
//                 return;
//             }
//             const videoUri = result.assets[0].uri;
//             const hash = await computeFileHash(videoUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: videoUri, videoHash: hash } }));
//         } catch (e) {
//             console.log('Camera Error:', e);
//             Alert.alert('Video Recording Error', 'Unable to record video. Please try again.\n' + (e instanceof Error ? e.message : String(e)));
//         }
//     }


//     async function pickVideoFromGallery(): Promise<void> {
//         // Request gallery/media permission
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== 'granted') {
//             Alert.alert('Gallery permission is required to select a video.');
//             return;
//         }
//         try {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Videos, // <- CORRECT usage for expo-image-picker
//                 quality: 0.7,
//             });
//             console.log('VideoPicker result:', result);

//             if (result.canceled) {
//                 Alert.alert('Pick Cancelled', 'No video was selected.');
//                 return;
//             }
//             if (!result.assets || !result.assets.length || !result.assets[0]?.uri) {
//                 Alert.alert('Picker Error', 'No valid video found. Try another one.');
//                 return;
//             }

//             const videoUri = result.assets[0].uri;
//             const hash = await computeFileHash(videoUri);
//             setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: videoUri, videoHash: hash } }));
//         } catch (e) {
//             console.log('VideoPicker Error:', e);
//             Alert.alert('Video Selection Error', 'Unable to pick video. Please try again.\n' + (e instanceof Error ? e.message : String(e)));
//         }
//     }


//     function goNext() {
//         if (stepIdx < checklistStepIdx) {
//             if (!media[step.key]?.image && !media[step.key]?.video) {
//                 Alert.alert('Please upload at least an image or a video before proceeding.');
//                 return;
//             }
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
//                     { text: 'Leave', style: 'destructive', onPress: handleCancel },
//                 ]
//             );
//         } else {
//             setStepIdx(i => i - 1);
//         }
//     }

//     async function handleSubmit(): Promise<void> {
//         setIsSubmitting(true);
//         setUploadProgress(0);
//         const formData = new FormData();
//         formData.append('clientId', params.clientId || '');
//         formData.append('companyName', params.companyName || '');
//         formData.append('clientName', params.clientName || '');
//         formData.append('phone', params.phone || '');
//         formData.append('email', params.email || '');
//         formData.append('orderId', params.orderId || '');
//         formData.append('kitId', params.kitId || '');
//         formData.append('kitNo', params.kitNo || '');
//         formData.append('projectId', params.projectId || '');
//         formData.append('purchaseDate', params.purchaseDate || '');
//         formData.append('accepted_statement', accepted ? 'true' : 'false');
//         if (location) {
//             formData.append('latitude', String(location.latitude));
//             formData.append('longitude', String(location.longitude));
//         }
//         formData.append('checklist', JSON.stringify(checklistAnswers || {}));
//         let fileStepKeyArr: string[] = [];
//         Object.entries(media).forEach(([stepKey, mediaObject]) => {
//             Object.entries(mediaObject).forEach(([mediaType, uriOrVal]) => {
//                 if (!uriOrVal || mediaType.endsWith('Hash')) return;
//                 const fileExt = mediaType === 'image'
//                     ? (uriOrVal as string).split('.').pop() || 'jpg'
//                     : (uriOrVal as string).split('.').pop() || 'mp4';
//                 const mime = mediaType === 'image' ? 'image/jpeg' : 'video/mp4';
//                 formData.append('files', {
//                     uri: uriOrVal as string,
//                     name: `step_${stepKey}_${mediaType}.${fileExt}`,
//                     type: mime,
//                 } as any);
//                 formData.append('step_key', stepKey);
//                 formData.append('media_type', mediaType);
//                 const hashField = mediaType + 'Hash';
//                 if (mediaObject[hashField as keyof StepMedia]) {
//                     formData.append('file_hash', mediaObject[hashField as keyof StepMedia] as string);
//                     fileStepKeyArr.push(`${stepKey}:${mediaType}`);
//                 } else {
//                     formData.append('file_hash', 'camera');
//                     fileStepKeyArr.push(`${stepKey}:${mediaType}`);
//                 }
//             });
//         });
//         formData.append('file_hash_map', JSON.stringify(fileStepKeyArr));
//         try {
//             const response = await api.post('/warranty-claims/', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 timeout: 180000,
//                 onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//                     if (progressEvent.total) {
//                         const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                         setUploadProgress(percent);
//                     }
//                 }
//             });
//             if (response.status === 201 || response.status === 200) {
//                 if (response.data.duplicates && response.data.duplicates.length > 0) {
//                     const msg = response.data.message || 'Some uploads are duplicates:';
//                     const duplicates = (response.data.duplicates as DuplicateApiResponse)
//                         .map(({ step_key, type }) => `${step_key} (${type})`)
//                         .join('\n');
//                     Alert.alert('Duplicate Upload', msg + '\n\n' + duplicates);
//                 } else {
//                     resetWizard();
//                     Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//                     router.replace('/warranty-status');
//                 }
//             } else {
//                 Alert.alert('Error', 'Unexpected server response. Please try again.');
//             }
//         } catch (error: any) {
//             const err = error as AxiosError;
//             if (err.response && err.response.data && typeof err.response.data === "object") {
//                 const data = err.response.data as any;
//                 if (data.duplicates && data.duplicates.length > 0) {
//                     const msg = data.message || 'Some uploads are duplicates:';
//                     const duplicates = (data.duplicates as DuplicateApiResponse)
//                         .map(({ step_key, type }) => `${step_key} (${type})`).join('\n');
//                     Alert.alert('Duplicate Upload', msg + '\n\n' + duplicates);
//                 } else {
//                     Alert.alert('Submission Error', data.detail || JSON.stringify(data));
//                 }
//             } else {
//                 Alert.alert('Submission Error', 'Could not submit your claim. Please check your network or try again.');
//             }
//         } finally {
//             setIsSubmitting(false);
//             setUploadProgress(0);
//         }
//     }

//     // ========== UI/JSX ==========

//     const step = claimSteps[stepIdx];

//     return (
//         <>
//             <Modal visible={isSubmitting} transparent animationType="fade">
//                 <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)' }}>
//                     <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
//                         <ActivityIndicator size="large" color="#FACC15" />
//                         <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
//                             Uploading... {uploadProgress}%
//                         </Text>
//                     </View>
//                 </View>
//             </Modal>
//             {stepIdx < checklistStepIdx ? (
//                 <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//                     <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//                     <Text className="text-white mb-2">{step.instruction}</Text>
//                     {step.demoVideo && (
//                         <Video
//                             source={{ uri: step.demoVideo as string }}
//                             useNativeControls
//                             resizeMode={ResizeMode.CONTAIN}
//                             style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//                         />
//                     )}
//                     <Text className="text-yellow-400 font-semibold mb-1">Upload Image</Text>
//                     {typeof media[step.key]?.image === 'string' ? (
//                         <View className="mb-3">
//                             <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
//                             <TouchableOpacity
//                                 className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                                 onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: undefined, imageHash: undefined } }))}
//                             >
//                                 <Text className="text-white text-center font-bold">Delete Image</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View className="flex-row mb-4">
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickImageFromGallery}>
//                                 <Text className="text-black font-bold">Pick Image</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
//                                 <Text className="text-black font-bold">Take Photo</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                     <Text className="text-yellow-400 font-semibold mb-1">Upload Video</Text>
//                     {typeof media[step.key]?.video === 'string' ? (
//                         <View className="mb-3">
//                             <Video
//                                 source={{ uri: media[step.key]?.video as string }}
//                                 useNativeControls
//                                 resizeMode={ResizeMode.CONTAIN}
//                                 style={{ width: '100%', height: 120, borderRadius: 10 }} />
//                             <TouchableOpacity
//                                 className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//                                 onPress={() => setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: undefined, videoHash: undefined } }))}
//                             >
//                                 <Text className="text-white text-center font-bold">Delete Video</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View className="flex-row mb-4">
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl mr-3" onPress={pickVideoFromGallery}>
//                                 <Text className="text-black font-bold">Pick Video</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={recordVideoWithCamera}>
//                                 <Text className="text-black font-bold">Record Video</Text>
//                             </TouchableOpacity>
//                         </View>
//                     )}
//                     <View className="flex-row justify-between mt-6">
//                         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                             <Text className="text-white">Back</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//                             <Text className="text-black font-bold">Next</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {lastStepIdx + 1}</Text>
//                 </ScrollView>
//             ) : stepIdx === checklistStepIdx ? (
//                 <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//                     <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">Installation Checklist</Text>
//                     {checklistItems.map(item => (
//                         <View key={item.key} className="mb-4 flex-row items-center justify-between">
//                             <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
//                             <TouchableOpacity
//                                 className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
//                                 onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
//                             >
//                                 <Text className="font-bold text-black">YES</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
//                                 onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
//                             >
//                                 <Text className="font-bold text-black">NO</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                     <View className="flex-row justify-between mt-10">
//                         <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                             <Text className="text-white">Back</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             disabled={!checklistItems.every(item => checklistAnswers[item.key] !== undefined)}
//                             className={`px-8 py-2 rounded-xl ${checklistItems.every(item => checklistAnswers[item.key] !== undefined) ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                             onPress={() => setStepIdx(i => i + 1)}
//                         >
//                             <Text className="text-black font-bold">Next</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <Text className="text-white text-center mt-6">
//                         Step {stepIdx + 1} of {lastStepIdx + 1}
//                     </Text>
//                 </ScrollView>
//             ) : (
//                 // Review & Submit Step
//                 <View className="flex-1 bg-black p-6">
//                     <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                     <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//                         {claimSteps.map(s => (
//                             <View key={s.key} className="mb-5">
//                                 <Text className="text-yellow-400">{s.title}</Text>
//                                 {typeof media[s.key]?.image === 'string' && (
//                                     <Image
//                                         source={{ uri: media[s.key]?.image as string }}
//                                         style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                                     />
//                                 )}
//                                 {typeof media[s.key]?.video === 'string' && (
//                                     <Video
//                                         source={{ uri: media[s.key]?.video as string }}
//                                         useNativeControls
//                                         resizeMode={ResizeMode.CONTAIN}
//                                         style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
//                                     />
//                                 )}
//                                 {!media[s.key]?.image && !media[s.key]?.video && (
//                                     <Text className="text-red-400 mt-2">No media uploaded</Text>
//                                 )}
//                             </View>
//                         ))}
//                         <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
//                         {checklistItems.map(item => (
//                             <Text
//                                 key={item.key}
//                                 className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
//                                 style={{ fontWeight: 'bold', fontSize: 15 }}
//                             >
//                                 {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
//                             </Text>
//                         ))}
//                         <View className="flex-row items-center mb-5 mt-4">
//                             <Checkbox
//                                 value={accepted}
//                                 onValueChange={setAccepted}
//                                 color={accepted ? '#FAD90E' : '#888'}
//                                 style={{ marginRight: 8 }}
//                             />
//                             <Text className="text-white ml-2 flex-shrink">
//                                 I confirm that all the details and documentation provided are correct.
//                             </Text>
//                         </View>
//                         <View style={{ alignItems: 'center', marginVertical: 16 }}>
//                             <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>Location:</Text>
//                             {locationLoading && (
//                                 <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                     Loading location...
//                                 </Text>
//                             )}
//                             {!locationLoading && location && (
//                                 <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                                     {location.latitude}, {location.longitude}
//                                 </Text>
//                             )}
//                             {((locError || !location) && !locationLoading) && (
//                                 <>
//                                     <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                         {locError || 'Location not available'}
//                                     </Text>
//                                     <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
//                                         Location permission is required to submit warranty request!
//                                     </Text>
//                                     <TouchableOpacity
//                                         onPress={getLocationWithPermission}
//                                         className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
//                                     >
//                                         <Text className="text-black text-base font-bold">Grant Permission</Text>
//                                     </TouchableOpacity>
//                                 </>
//                             )}
//                         </View>
//                     </ScrollView>
//                     <TouchableOpacity
//                         className={`py-4 rounded-xl mt-4 ${accepted && !!location && !locationLoading ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                         onPress={() => {
//                             if (!accepted) {
//                                 Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//                                 return;
//                             }
//                             if (!location) {
//                                 Alert.alert('Location Required', 'Grant location permission to proceed.');
//                                 return;
//                             }
//                             handleSubmit();
//                         }}
//                         disabled={!accepted || !location || locationLoading}
//                     >
//                         <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </>
//     );
// }




// import api from '@/utils/api';
// import { AxiosError } from 'axios';
// import { ResizeMode, Video } from 'expo-av';
// import Checkbox from 'expo-checkbox';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { router, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert, BackHandler, Image,
//   Modal,
//   ScrollView, Text, TouchableOpacity, View,
// } from 'react-native';
// import { checklistItems, claimSteps } from './claim-steps';


// // Type for our step media
// type StepMedia = {
//   image?: string;
// };

// export default function ClaimMediaWizard() {
//   const params = useLocalSearchParams<any>();
//   const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
//   const [stepIdx, setStepIdx] = useState(0);
//   const [accepted, setAccepted] = useState(false);
//   const [checklistAnswers, setChecklistAnswers] = useState<{ [k: string]: boolean }>({});
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [locError, setLocError] = useState<string | null>(null);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [hasRequestedLocation, setHasRequestedLocation] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const checklistStepIdx = claimSteps.length;
//   const reviewStepIdx = claimSteps.length + 1;
//   const lastStepIdx = reviewStepIdx;

//   function getDateTimeLocationStamp(loc: { latitude: number; longitude: number } | null): string {
//     const now = new Date();
//     let str = now.toLocaleString();
//     if (loc) {
//       str += ` | Lat: ${loc.latitude.toFixed(5)}, Lon: ${loc.longitude.toFixed(5)}`;
//     }
//     return str;
//   }

// //   async function takeImageWithCamera() {
// //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
// //     if (status !== 'granted') {
// //       Alert.alert('Camera permission is required to take a picture.');
// //       return;
// //     }
// //     const result = await ImagePicker.launchCameraAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       quality: 1,
// //     });
// //     if (!result.canceled && result.assets?.length) {
// //       // Overlay timestamp before saving
// //       const dateString = getDateTimeLocationStamp(location);
// //       const stampHeight = 90; // pick based on image size for better placement
// //       const manipResult = await ImageManipulator.manipulateAsync(
// //         result.assets[0].uri,
// //         [
// //           {
// //             drawText: {
// //               text: dateString,
// //               position: { x: 20, y: result.assets[0].height ? result.assets[0].height - stampHeight : 1100 },
// //               color: '#FFFF00',
// //               fontSize: 36,
// //               outlineColor: '#000',
// //               outlineWidth: 4,
// //               anchor: 'bottomLeft',
// //             },
// //           },
// //         ],
// //         { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
// //       );
// //       setMedia(m => ({ ...m, [step.key]: { image: manipResult.uri } }));
// //     }
// //   }

// // Camera-only photo, overlays timestamp/location text, updates media state
// async function takeImageWithCamera(
//   setMedia: React.Dispatch<React.SetStateAction<{ [k: string]: { image?: string } }>>,
//   stepKey: string,
//   location: Location
// ): Promise<void> {
//   const { status } = await ImagePicker.requestCameraPermissionsAsync();
//   if (status !== 'granted') {
//     Alert.alert('Camera permission is required to take a picture.');
//     return;
//   }
//   try {
//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (result.canceled) {
//       Alert.alert('Cancelled', 'No photo was taken.');
//       return;
//     }
//     if (!result.assets || !result.assets.length || !result.assets[0]?.uri) {
//       Alert.alert('Camera Error', 'No valid image captured.');
//       return;
//     }
//     const uri = result.assets[0].uri;
//     // Overlay timestamp/location with image manipulator
//     const dateString = getDateTimeLocationStamp(location);
//     const manipResult = await ImageManipulator.manipulateAsync(
//       uri,
//       [
//         // Note: If your Expo version supports drawText (SDK 49+), use it here.
//         // Otherwise, just resize as below:
//         { resize: { width: 1280 } },
//       ],
//       { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//     );
//     // If you have Expo SDK 49+, you can use:
//     // [
//     //   {
//     //     drawText: {
//     //       text: dateString,
//     //       position: { x: 20, y: 1200 },
//     //       color: '#FFF',
//     //       fontSize: 26,
//     //       anchor: ImageManipulator.TextAnchor.BottomLeft,
//     //     }
//     //   }
//     // ]

//     // Save to state for this step
//     setMedia(m => ({ ...m, [stepKey]: { ...m[stepKey], image: manipResult.uri } }));
//   } catch (e) {
//     console.log('Camera Error:', e);
//     Alert.alert(
//       'Camera Error',
//       'There was a problem taking the photo. Please try again.\n' + (e instanceof Error ? e.message : String(e))
//     );
//   }
// }

//   function resetWizard() {
//     setStepIdx(0);
//     setMedia({});
//     setAccepted(false);
//     setChecklistAnswers({});
//     setLocation(null);
//     setLocError(null);
//     setLocationLoading(false);
//     setHasRequestedLocation(false);
//   }

//   function handleCancel() {
//     resetWizard();
//     router.replace('/(main)/dashboard');
//   }

//   useEffect(() => { resetWizard(); }, []);
//   useEffect(() => {
//     const backAction = () => {
//       if (stepIdx === 0) {
//         Alert.alert(
//           'Cancel Warranty Claim?',
//           'Are you sure you want to cancel the warranty claim and go back to dashboard?',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Leave', style: 'destructive', onPress: handleCancel },
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
//   useEffect(() => {
//     if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
//       setHasRequestedLocation(true);
//       getLocationWithPermission();
//     } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
//       setHasRequestedLocation(false);
//       setLocation(null);
//       setLocError(null);
//       setLocationLoading(false);
//     }
//   }, [stepIdx]);

//   async function getLocationWithPermission() {
//     setLocationLoading(true);
//     setLocError(null);
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setLocError('Location permission denied');
//         setLocation(null);
//       } else {
//         const loc = await Location.getCurrentPositionAsync({});
//         setLocation({
//           latitude: loc.coords.latitude,
//           longitude: loc.coords.longitude,
//         });
//       }
//     } catch {
//       setLocError('Failed to get device location');
//       setLocation(null);
//     } finally {
//       setLocationLoading(false);
//     }
//   }

//   function goNext() {
//     if (stepIdx < checklistStepIdx) {
//       if (!media[step.key]?.image) {
//         Alert.alert('Please upload a photo before proceeding.');
//         return;
//       }
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
//           { text: 'Leave', style: 'destructive', onPress: handleCancel },
//         ]
//       );
//     } else {
//       setStepIdx(i => i - 1);
//     }
//   }

//   async function handleSubmit() {
//     setIsSubmitting(true);
//     setUploadProgress(0);
//     const formData = new FormData();
//     // Add fields...
//     formData.append('clientId', params.clientId || '');
//     formData.append('companyName', params.companyName || '');
//     formData.append('clientName', params.clientName || '');
//     formData.append('phone', params.phone || '');
//     formData.append('email', params.email || '');
//     formData.append('orderId', params.orderId || '');
//     formData.append('kitId', params.kitId || '');
//     formData.append('kitNo', params.kitNo || '');
//     formData.append('projectId', params.projectId || '');
//     formData.append('purchaseDate', params.purchaseDate || '');
//     formData.append('accepted_statement', accepted ? 'true' : 'false');
//     if (location) {
//       formData.append('latitude', String(location.latitude));
//       formData.append('longitude', String(location.longitude));
//     }
//     formData.append('checklist', JSON.stringify(checklistAnswers || {}));
//     // Upload only stamped images
//     Object.entries(media).forEach(([stepKey, mediaObject]) => {
//       if (mediaObject.image) {
//         const ext = mediaObject.image.split('.').pop() || 'jpg';
//         formData.append('files', {
//           uri: mediaObject.image,
//           name: `step_${stepKey}_image.${ext}`,
//           type: 'image/jpeg',
//         } as any);
//         formData.append('step_key', stepKey);
//         formData.append('media_type', 'image');
//       }
//     });
//     try {
//       const response = await api.post(
//         '/warranty-claims/',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           timeout: 120000,
//           onUploadProgress: (progressEvent: any) => {
//             const percent = progressEvent.total
//               ? Math.min(100, Math.round((progressEvent.loaded * 100) / progressEvent.total))
//               : 0;
//             setUploadProgress(percent);
//           }
//         }
//       );
//       if (response.status === 201 || response.status === 200) {
//         resetWizard();
//         Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
//         router.replace('/warranty-status');
//       } else {
//         Alert.alert('Error', 'Unexpected server response. Please try again.');
//       }
//     } catch (err: any) {
//       const error = err as AxiosError;
//       if (error.response && error.response.data && typeof error.response.data === "object") {
//         const data = error.response.data as any;
//         Alert.alert('Submission Error', data.detail || JSON.stringify(data));
//       } else {
//         Alert.alert('Submission Error', 'Could not submit your claim. Please check your network or try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//       setUploadProgress(0);
//     }
//   }

//   // ======= Media Upload Step UI =======
//   if (stepIdx < checklistStepIdx) {
//     return (
//       <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//         <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
//         <Text className="text-white mb-2">{step.instruction}</Text>
//         {step.demoVideo && (
//           <Video
//             source={{ uri: step.demoVideo as string }}
//             useNativeControls
//             resizeMode={ResizeMode.CONTAIN}
//             style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
//           />
//         )}

//         <Text className="text-yellow-400 font-semibold mb-1">Upload Photo (Required - Live Photo)</Text>
//         {typeof media[step.key]?.image === 'string' ? (
//           <View className="mb-3">
//             <Image source={{ uri: media[step.key]?.image as string }} style={{ width: '100%', height: 100, borderRadius: 10 }} />
//             <TouchableOpacity
//               className="mt-2 bg-gray-700 py-2 px-4 rounded-xl"
//               onPress={() => setMedia(m => ({ ...m, [step.key]: { image: undefined } }))}
//             >
//               <Text className="text-white text-center font-bold">Delete Photo</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View className="flex-row mb-4">
//             <TouchableOpacity className="bg-yellow-400 py-3 px-4 rounded-xl" onPress={takeImageWithCamera}>
//               <Text className="text-black font-bold">Take Photo</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <View className="flex-row justify-between mt-6">
//           <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//             <Text className="text-white">Back</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
//             <Text className="text-black font-bold">Next</Text>
//           </TouchableOpacity>
//         </View>
//         <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {lastStepIdx + 1}</Text>

//         <Modal visible={isSubmitting} transparent animationType="fade">
//           <View style={{
//             flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
//           }}>
//             <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
//               <ActivityIndicator size="large" color="#FACC15" />
//               <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
//                 Uploading... {Math.round(uploadProgress)}%
//               </Text>
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     );
//   }

//   // ... (retain your Checklist, Review & Submit steps exactly as before, including the progress modal in handleSubmit)
//   // No video upload allowed, no gallery/image picking. Only live photo input per step.
// // ======= Checklist Step =======
//     if (stepIdx === checklistStepIdx) {
//         const allAnswered = checklistItems.every(item => checklistAnswers[item.key] !== undefined);
//         return (
//             <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
//                 <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">
//                     Installation Checklist
//                 </Text>
//                 {checklistItems.map(item => (
//                     <View key={item.key} className="mb-4 flex-row items-center justify-between">
//                         <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
//                         <TouchableOpacity
//                             className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
//                             onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
//                         >
//                             <Text className="font-bold text-black">YES</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
//                             onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
//                         >
//                             <Text className="font-bold text-black">NO</Text>
//                         </TouchableOpacity>
//                     </View>
//                 ))}
//                 <View className="flex-row justify-between mt-10">
//                     <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
//                         <Text className="text-white">Back</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         disabled={!allAnswered}
//                         className={`px-8 py-2 rounded-xl ${allAnswered ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                         onPress={() => setStepIdx(i => i + 1)}
//                     >
//                         <Text className="text-black font-bold">Next</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Text className="text-white text-center mt-6">
//                     Step {stepIdx + 1} of {lastStepIdx + 1}
//                 </Text>
//             </ScrollView>
//         );
//     }

//     // ======= Review & Submit Step =======
//     if (stepIdx === reviewStepIdx) {
//         const canSubmit = accepted && !!location && !locationLoading;

//         return (
//             <View className="flex-1 bg-black p-6">
//                 <Text className="text-yellow-400 font-bold text-xl mb-4">Review & Submit</Text>
//                 <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
//                     {claimSteps.map(s => (
//                         <View key={s.key} className="mb-5">
//                             <Text className="text-yellow-400">{s.title}</Text>
//                             {typeof media[s.key]?.image === 'string' && (
//                                 <Image
//                                     source={{ uri: media[s.key]?.image as string }}
//                                     style={{ height: 100, borderRadius: 8, marginVertical: 4 }}
//                                 />
//                             )}
//                             {typeof media[s.key]?.video === 'string' && (
//                                 <Video
//                                     source={{ uri: media[s.key]?.video as string }}
//                                     useNativeControls
//                                     resizeMode={ResizeMode.CONTAIN}
//                                     style={{ width: '100%', height: 120, borderRadius: 8, marginVertical: 4 }}
//                                 />
//                             )}
//                             {!media[s.key]?.image && !media[s.key]?.video && (
//                                 <Text className="text-red-400 mt-2">No media uploaded</Text>
//                             )}
//                         </View>
//                     ))}
//                     {/* Checklist Summary */}
//                     <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
//                     {checklistItems.map(item => (
//                         <Text
//                             key={item.key}
//                             className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
//                             style={{ fontWeight: 'bold', fontSize: 15 }}
//                         >
//                             {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
//                         </Text>
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
//                     {/* LOCATION UI */}
//                     <View style={{ alignItems: 'center', marginVertical: 16 }}>
//                         <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                             Location:
//                         </Text>
//                         {locationLoading && (
//                             <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                 Loading location...
//                             </Text>
//                         )}
//                         {!locationLoading && location && (
//                             <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                                 {location.latitude}, {location.longitude}
//                             </Text>
//                         )}
//                         {((locError || !location) && !locationLoading) && (
//                             <>
//                                 <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                     {locError || 'Location not available'}
//                                 </Text>
//                                 <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
//                                     Location permission is required to submit warranty request!
//                                 </Text>
//                                 <TouchableOpacity
//                                     onPress={getLocationWithPermission}
//                                     className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
//                                 >
//                                     <Text className="text-black text-base font-bold">Grant Permission</Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity
//                     className={`py-4 rounded-xl mt-4 ${canSubmit ? 'bg-yellow-400' : 'bg-gray-500'}`}
//                     onPress={() => {
//                         if (!accepted) {
//                             Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
//                             return;
//                         }
//                         if (!location) {
//                             Alert.alert('Location Required', 'Grant location permission to proceed.');
//                             return;
//                         }
//                         handleSubmit();
//                     }}
//                     disabled={!canSubmit}
//                 >
//                     <Text className="text-black text-lg font-bold text-center">Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }


//   return null;
// }



//=======Modular Code====================

// components/ClaimMediaWizard.tsx

// import { claimSteps } from "@/app/(main)/warranty/claim-steps";
// import { ChecklistStep } from "@/components/ChecklistStep";
// import { MediaStep } from "@/components/MediaStep";
// import { ReviewStep } from "@/components/ReviewStep";
// import { UploadModal } from "@/components/UploadModal"; // <-- this!
// import { useRefresh } from "@/context/RefreshContext";
// import { StepMedia } from "@/types/StepMedia";
// import api from "@/utils/api";
// import { getLocationWithPermission } from "@/utils/locationUtils";
// import { AxiosError, AxiosProgressEvent } from "axios";
// import { router, useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { Alert, BackHandler } from "react-native";

// export default function ClaimMediaWizard() {
//     const params = useLocalSearchParams<any>();
//     const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});
//     const [stepIdx, setStepIdx] = useState(0);
//     const [accepted, setAccepted] = useState(false);
//     const [checklistAnswers, setChecklistAnswers] = useState<{ [key: string]: boolean }>({});
//     const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//     const [locError, setLocError] = useState<string | null>(null);
//     const [locationLoading, setLocationLoading] = useState(false);
//     const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

//     // ------ NEW FOR MODAL ------
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);

//     // Step indices
//     const checklistStepIdx = claimSteps.length;
//     const reviewStepIdx = claimSteps.length + 1;
//     const lastStepIdx = reviewStepIdx;

//     //Refresh
//     const { triggerRefresh } = useRefresh();

//     function resetWizard() {
//         setStepIdx(0);
//         setMedia({});
//         setAccepted(false);
//         setChecklistAnswers({});
//         setLocation(null);
//         setLocError(null);
//         setLocationLoading(false);
//         setHasRequestedLocation(false);
//     }

//     function handleCancel() {
//         resetWizard();
//         router.replace("/(main)/dashboard");
//     }

//     useEffect(() => {
//         resetWizard();
//         // eslint-disable-next-line
//     }, []);

//     useEffect(() => {
//         const backAction = () => {
//             if (stepIdx === 0) {
//                 Alert.alert(
//                     "Cancel Warranty Claim?",
//                     "Are you sure you want to cancel the warranty claim and go back to dashboard?",
//                     [
//                         { text: "Cancel", style: "cancel" },
//                         {
//                             text: "Leave",
//                             style: "destructive",
//                             onPress: handleCancel,
//                         },
//                     ]
//                 );
//                 return true;
//             } else {
//                 setStepIdx(i => i - 1);
//                 return true;
//             }
//         };
//         const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
//         return () => backHandler.remove();
//     }, [stepIdx]);

//     useEffect(() => {
//         if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
//             setHasRequestedLocation(true);
//             grantLocation();
//         } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
//             setHasRequestedLocation(false);
//             setLocation(null);
//             setLocError(null);
//             setLocationLoading(false);
//         }
//     }, [stepIdx]);

//     function grantLocation() {
//         setLocationLoading(true);
//         setLocError(null);
//         getLocationWithPermission()
//             .then(res => {
//                 if ("error" in res) {
//                     setLocError(res.error);
//                     setLocation(null);
//                 } else {
//                     setLocation(res);
//                     setLocError(null);
//                 }
//             })
//             .finally(() => setLocationLoading(false));
//     }

//     function goBack() {
//         if (stepIdx === 0) {
//             Alert.alert(
//                 "Cancel Warranty Claim?",
//                 "Are you sure you want to cancel the warranty claim and go back to dashboard?",
//                 [
//                     { text: "Cancel", style: "cancel" },
//                     {
//                         text: "Leave",
//                         style: "destructive",
//                         onPress: handleCancel,
//                     },
//                 ]
//             );
//         } else {
//             setStepIdx(i => i - 1);
//         }
//     }

//     function goNext() {
//         if (stepIdx < checklistStepIdx) {
//             const step = claimSteps[stepIdx];
//             if (!media[step.key]?.image && !media[step.key]?.video) {
//                 Alert.alert("Please upload at least an image or a video before proceeding.");
//                 return;
//             }
//         }
//         setStepIdx(i => i + 1);
//     }

//     async function handleSubmit() {
//         const formData = new FormData();
//         for (const key of [
//             "clientId", "companyName", "clientName", "phone", "email", "orderId", "kitId", "kitNo", "projectId", "purchaseDate"
//         ]) {
//             formData.append(key, params[key] || "");
//         }
//         formData.append("accepted_statement", accepted ? "true" : "false");
//         if (location) {
//             formData.append("latitude", String(location.latitude));
//             formData.append("longitude", String(location.longitude));
//         }
//         formData.append("checklist", JSON.stringify(checklistAnswers));

//         Object.entries(media).forEach(([stepKey, mediaObj]) => {
//             Object.entries(mediaObj).forEach(([mediaType, uri]) => {
//                 if (!uri) return;
//                 const fileExt = uri.split(".").pop() || (mediaType === "image" ? "jpg" : "mp4");
//                 const mime = mediaType === "image" ? "image/jpeg" : "video/mp4";
//                 formData.append("files", {
//                     uri,
//                     name: `step_${stepKey}_${mediaType}.${fileExt}`,
//                     type: mime,
//                 } as any);
//                 formData.append("step_key", stepKey);
//                 formData.append("media_type", mediaType);
//             });
//         });

//         try {
//             setIsSubmitting(true);
//             setUploadProgress(0);

//             const response = await api.post("/warranty-claims/", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//                 timeout: 120_000,
//                 onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//                     if (progressEvent.total) {
//                         setUploadProgress(100 * progressEvent.loaded / progressEvent.total);
//                     }
//                 }
//             });

//             setIsSubmitting(false);
//             setUploadProgress(0);
//             triggerRefresh();

//             if (response.status === 201 || response.status === 200) {
//                 resetWizard();
//                 Alert.alert("Submitted!", "Your warranty claim has been submitted.");
//                 router.replace("/warranty-status");
//             } else {
//                 Alert.alert("Error", "Unexpected server response. Please try again.");
//             }
//         } catch (error) {
//             setIsSubmitting(false);
//             setUploadProgress(0);

//             const err = error as AxiosError;
//             if (err.response && err.response.data && typeof err.response.data === "object") {
//                 const data = err.response.data as any;
//                 Alert.alert("Submission Error", data.detail || JSON.stringify(data));
//             } else {
//                 Alert.alert(
//                     "Submission Error",
//                     "Could not submit your claim. Please check your network or try again."
//                 );
//             }
//         }
//     }

//     // --------- UI --------------
//     return (
//         <>
//             {/* PROGRESS MODAL */}
//             <UploadModal visible={isSubmitting} progress={uploadProgress} />

//             {/* STEPS */}
//             {stepIdx < checklistStepIdx && (
//                 <MediaStep
//                     step={claimSteps[stepIdx]}
//                     media={media}
//                     setMedia={setMedia}
//                     goBack={goBack}
//                     goNext={goNext}
//                 />
//             )}
//             {stepIdx === checklistStepIdx && (
//                 <ChecklistStep
//                     checklistAnswers={checklistAnswers}
//                     setChecklistAnswers={setChecklistAnswers}
//                     goBack={goBack}
//                     goNext={() => setStepIdx(i => i + 1)}
//                 />
//             )}
//             {stepIdx === reviewStepIdx && (
//                 <ReviewStep
//                     media={media}
//                     checklistAnswers={checklistAnswers}
//                     accepted={accepted}
//                     setAccepted={setAccepted}
//                     location={location}
//                     locationLoading={locationLoading}
//                     locError={locError}
//                     onGrantLocation={grantLocation}
//                     onSubmit={() => {
//                         if (!accepted) {
//                             Alert.alert("Acceptance Required", "Please confirm all details are correct to submit.");
//                             return;
//                         }
//                         if (!location) {
//                             Alert.alert("Location Required", "Grant location permission to proceed.");
//                             return;
//                         }
//                         handleSubmit();
//                     }}
//                 />
//             )}
//         </>
//     );
// }



import { claimSteps } from "@/app/(main)/warranty/claim-steps";
import { ChecklistStep } from "@/components/ChecklistStep";
import { MediaStep } from "@/components/MediaStep";
import { ReviewStep } from "@/components/ReviewStep";
import { UploadModal } from "@/components/UploadModal"; // <-- this!
import api from "@/utils/api";
import { getLocationWithPermission } from "@/utils/locationUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // --- IMPORTANT
import { AxiosError, AxiosProgressEvent } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";


type StepMedia = {
    image?: string;
    video?: string;
};

export default function ClaimMediaWizard() {
    const params = useLocalSearchParams<any>();
    //   const [media, setMedia] = useState<{ [k: string]: any }>({});
    const [stepIdx, setStepIdx] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [checklistAnswers, setChecklistAnswers] = useState<{ [key: string]: boolean }>({});
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locError, setLocError] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

    const [media, setMedia] = useState<{ [k: string]: StepMedia }>({});

    // For progress/modal
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Step indices
    const checklistStepIdx = claimSteps.length;
    const reviewStepIdx = claimSteps.length + 1;
    const lastStepIdx = reviewStepIdx;

    // QueryClient for cache invalidation
    const queryClient = useQueryClient();

    // ---- Mutation for claim submission ----
    const submitClaimMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post("/warranty-claims/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 120_000,
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        setUploadProgress(100 * progressEvent.loaded / progressEvent.total);
                    }
                }
            });
            return response;
        },
        onSuccess: (response, variables, context) => {
            setIsSubmitting(false);
            setUploadProgress(0);
            // 🔥 Invalidate queries so dashboard and other places auto-refresh!
            queryClient.invalidateQueries({ queryKey: ["warrantyDashboardCounts"] });
            queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] }); // adjust keys as your listing components use
            queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
            queryClient.invalidateQueries({ queryKey: ["myWarrantyClaims"] });
            resetWizard();
            Alert.alert("Submitted!", "Your warranty claim has been submitted.");
            router.replace("/warranty-status");
        },
        onError: (error: AxiosError) => {
            setIsSubmitting(false);
            setUploadProgress(0);
            if (error.response && error.response.data && typeof error.response.data === "object") {
                const data = error.response.data as any;
                Alert.alert("Submission Error", data.detail || JSON.stringify(data));
            } else {
                Alert.alert(
                    "Submission Error",
                    "Could not submit your claim. Please check your network or try again."
                );
            }
        }
    });

    function resetWizard() {
        setStepIdx(0);
        setMedia({});
        setAccepted(false);
        setChecklistAnswers({});
        setLocation(null);
        setLocError(null);
        setLocationLoading(false);
        setHasRequestedLocation(false);
    }

    function handleCancel() {
        resetWizard();
        router.replace("/(main)/dashboard");
    }

    useEffect(() => {
        resetWizard();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (stepIdx === 0) {
                Alert.alert(
                    "Cancel Warranty Claim?",
                    "Are you sure you want to cancel the warranty claim and go back to dashboard?",
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Leave",
                            style: "destructive",
                            onPress: handleCancel,
                        },
                    ]
                );
                return true;
            } else {
                setStepIdx(i => i - 1);
                return true;
            }
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [stepIdx]);

    useEffect(() => {
        if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
            setHasRequestedLocation(true);
            grantLocation();
        } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
            setHasRequestedLocation(false);
            setLocation(null);
            setLocError(null);
            setLocationLoading(false);
        }
    }, [stepIdx]);

    function grantLocation() {
        setLocationLoading(true);
        setLocError(null);
        getLocationWithPermission()
            .then(res => {
                if ("error" in res) {
                    setLocError(res.error);
                    setLocation(null);
                } else {
                    setLocation(res);
                    setLocError(null);
                }
            })
            .finally(() => setLocationLoading(false));
    }

    function goBack() {
        if (stepIdx === 0) {
            Alert.alert(
                "Cancel Warranty Claim?",
                "Are you sure you want to cancel the warranty claim and go back to dashboard?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Leave",
                        style: "destructive",
                        onPress: handleCancel,
                    },
                ]
            );
        } else {
            setStepIdx(i => i - 1);
        }
    }

    function goNext() {
        if (stepIdx < checklistStepIdx) {
            const step = claimSteps[stepIdx];
            if (!media[step.key]?.image && !media[step.key]?.video) {
                Alert.alert("Please upload at least an image or a video before proceeding.");
                return;
            }
        }
        setStepIdx(i => i + 1);
    }

    // ----- MUTATION-BASED SUBMIT -----
    async function handleSubmit() {
        const formData = new FormData();
        for (const key of [
            "clientId", "companyName", "clientName", "phone", "email", "orderId", "kitId", "kitNo", "projectId", "purchaseDate"
        ]) {
            formData.append(key, params[key] || "");
        }
        formData.append("accepted_statement", accepted ? "true" : "false");
        if (location) {
            formData.append("latitude", String(location.latitude));
            formData.append("longitude", String(location.longitude));
        }
        formData.append("checklist", JSON.stringify(checklistAnswers));

        Object.entries(media).forEach(([stepKey, mediaObj]) => {
            (["image", "video"] as const).forEach((mediaType) => {
                const uri = mediaObj[mediaType];
                if (typeof uri !== "string" || !uri) return;
                const fileExt = uri.split(".").pop() || (mediaType === "image" ? "jpg" : "mp4");
                const mime = mediaType === "image" ? "image/jpeg" : "video/mp4";
                formData.append("files", {
                    uri,
                    name: `step_${stepKey}_${mediaType}.${fileExt}`,
                    type: mime,
                } as any);
                formData.append("step_key", stepKey);
                formData.append("media_type", mediaType);
            });
        });

        setIsSubmitting(true);
        setUploadProgress(0);

        submitClaimMutation.mutate(formData);
    }

    // --------- UI --------------
    return (
        <>
            {/* PROGRESS MODAL */}
            <UploadModal visible={isSubmitting} progress={uploadProgress} />

            {/* STEPS */}
            {stepIdx < checklistStepIdx && (
                <MediaStep
                    step={claimSteps[stepIdx]}
                    media={media}
                    setMedia={setMedia}
                    goBack={goBack}
                    goNext={goNext}
                />
            )}
            {stepIdx === checklistStepIdx && (
                <ChecklistStep
                    checklistAnswers={checklistAnswers}
                    setChecklistAnswers={setChecklistAnswers}
                    goBack={goBack}
                    goNext={() => setStepIdx(i => i + 1)}
                />
            )}
            {stepIdx === reviewStepIdx && (
                <ReviewStep
                    media={media}
                    checklistAnswers={checklistAnswers}
                    accepted={accepted}
                    setAccepted={setAccepted}
                    location={location}
                    locationLoading={locationLoading}
                    locError={locError}
                    onGrantLocation={grantLocation}
                    onSubmit={() => {
                        if (!accepted) {
                            Alert.alert("Acceptance Required", "Please confirm all details are correct to submit.");
                            return;
                        }
                        if (!location) {
                            Alert.alert("Location Required", "Grant location permission to proceed.");
                            return;
                        }
                        handleSubmit();
                    }}
                />
            )}
        </>
    );
}
