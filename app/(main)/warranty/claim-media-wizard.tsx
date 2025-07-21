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


import { ResizeMode, Video } from 'expo-av';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { checklistItems, claimSteps } from './claim-steps';

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
    const [checklistAnswers, setChecklistAnswers] = useState<{ [k: string]: boolean }>({});

    // Location (only for last step)
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [locError, setLocError] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

    // Helper indices
    const checklistStepIdx = claimSteps.length;
    const reviewStepIdx = claimSteps.length + 1;
    const lastStepIdx = reviewStepIdx;

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
        router.replace('/(main)/dashboard');
    }

    // Reset all data when wizard first mounts/relaunches
    useEffect(() => {
        resetWizard();
        // eslint-disable-next-line
    }, []);

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
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [stepIdx]);

    // Location logic - only at review step, clean up if leaving
    useEffect(() => {
        if (stepIdx === reviewStepIdx && !hasRequestedLocation) {
            setHasRequestedLocation(true);
            getLocationWithPermission();
        } else if (stepIdx !== reviewStepIdx && hasRequestedLocation) {
            setHasRequestedLocation(false);
            setLocation(null);
            setLocError(null);
            setLocationLoading(false);
        }
        // eslint-disable-next-line
    }, [stepIdx]);

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

    async function getLocationWithPermission() {
        setLocationLoading(true);
        setLocError(null);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocError('Location permission denied');
                setLocation(null);
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });
            }
        } catch (err) {
            setLocError('Failed to get device location');
            setLocation(null);
        } finally {
            setLocationLoading(false);
        }
    }


    // Media step logic
    const step = claimSteps[stepIdx];

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
    // async function takeImageWithCamera() {
    //     const result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         quality: 0.7,
    //     });
    //     if (!result.canceled && result.assets?.length) {
    //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
    //     }
    // }

    async function takeImageWithCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Camera permission is required to take a picture.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length) {
            setMedia(m => ({ ...m, [step.key]: { ...m[step.key], image: result.assets[0].uri } }));
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
    // async function recordVideoWithCamera() {
    //     const result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    //         quality: 0.7,
    //     });
    //     if (!result.canceled && result.assets?.length) {
    //         setMedia(m => ({ ...m, [step.key]: { ...m[step.key], video: result.assets[0].uri } }));
    //     }
    // }

    async function recordVideoWithCamera() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Camera permission is required to record a video.');
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

    function goNext() {
        // For media steps: require at least one upload
        if (stepIdx < checklistStepIdx) {
            if (!media[step.key]?.image && !media[step.key]?.video) {
                Alert.alert('Please upload at least an image or a video before proceeding.');
                return;
            }
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
        const payload = {
            ...params,
            media,
            location,
            checklist: checklistAnswers,
        };
        // TODO: upload payload to API if needed
        resetWizard();
        Alert.alert('Submitted!', 'Your warranty claim has been submitted.');
        router.replace('/(main)/warranty/claim-status');
    }

    // ======= Media Upload Steps =======
    if (stepIdx < checklistStepIdx) {
        return (
            <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-yellow-400 font-bold text-lg mb-1">{step.title}</Text>
                <Text className="text-white mb-2">{step.instruction}</Text>
                {/* Demo Video (optional) */}
                {step.demoVideo && (
                    <Video
                        source={{ uri: step.demoVideo as string }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        style={{ width: '100%', height: 180, borderRadius: 10, marginBottom: 16 }}
                    />
                )}

                {/* Image */}
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

                {/* Video */}
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

                {/* Navigation */}
                <View className="flex-row justify-between mt-6">
                    <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
                        <Text className="text-white">Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goNext} className="px-8 py-2 rounded-xl bg-yellow-400">
                        <Text className="text-black font-bold">Next</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-white text-center mt-6">Step {stepIdx + 1} of {lastStepIdx + 1}</Text>
            </ScrollView>
        );
    }

    // ======= Checklist Step =======
    if (stepIdx === checklistStepIdx) {
        const allAnswered = checklistItems.every(item => checklistAnswers[item.key] !== undefined);
        return (
            <ScrollView className="flex-1 bg-black p-6" contentContainerStyle={{ paddingBottom: 40 }}>
                <Text className="text-yellow-400 font-bold text-xl mb-6 text-center">
                    Installation Checklist
                </Text>
                {checklistItems.map(item => (
                    <View key={item.key} className="mb-4 flex-row items-center justify-between">
                        <Text className="text-white flex-1 font-semibold" style={{ fontSize: 16 }}>{item.question}</Text>
                        <TouchableOpacity
                            className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === true ? 'bg-green-400' : 'bg-gray-700'}`}
                            onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: true }))}
                        >
                            <Text className="font-bold text-black">YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`px-4 py-2 mx-1 rounded-xl ${checklistAnswers[item.key] === false ? 'bg-red-400' : 'bg-gray-700'}`}
                            onPress={() => setChecklistAnswers(ans => ({ ...ans, [item.key]: false }))}
                        >
                            <Text className="font-bold text-black">NO</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View className="flex-row justify-between mt-10">
                    <TouchableOpacity onPress={goBack} className="px-6 py-2 rounded-xl bg-gray-700">
                        <Text className="text-white">Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!allAnswered}
                        className={`px-8 py-2 rounded-xl ${allAnswered ? 'bg-yellow-400' : 'bg-gray-500'}`}
                        onPress={() => setStepIdx(i => i + 1)}
                    >
                        <Text className="text-black font-bold">Next</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-white text-center mt-6">
                    Step {stepIdx + 1} of {lastStepIdx + 1}
                </Text>
            </ScrollView>
        );
    }

    // ======= Review & Submit Step =======
    if (stepIdx === reviewStepIdx) {
        const canSubmit = accepted && !!location && !locationLoading;

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
                    {/* Checklist Summary */}
                    <Text className="text-yellow-400 font-bold text-lg mt-6 mb-2">Checklist Summary</Text>
                    {checklistItems.map(item => (
                        <Text
                            key={item.key}
                            className={`mb-1 ${checklistAnswers[item.key] === true ? 'text-green-300' : 'text-red-400'}`}
                            style={{ fontWeight: 'bold', fontSize: 15 }}
                        >
                            {item.question}: {checklistAnswers[item.key] === true ? 'YES' : 'NO'}
                        </Text>
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
                    {/* LOCATION UI */}
                    <View style={{ alignItems: 'center', marginVertical: 16 }}>
                        <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
                            Location:
                        </Text>
                        {locationLoading && (
                            <Text className="text-yellow-400 mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Loading location...
                            </Text>
                        )}
                        {!locationLoading && location && (
                            <Text className="text-white" style={{ fontWeight: 'bold', fontSize: 18 }}>
                                {location.latitude}, {location.longitude}
                            </Text>
                        )}
                        {((locError || !location) && !locationLoading) && (
                            <>
                                <Text className="text-red-400 text-center mt-2" style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {locError || 'Location not available'}
                                </Text>
                                <Text className="text-yellow-200 mt-2 text-center" style={{ fontSize: 15 }}>
                                    Location permission is required to submit warranty request!
                                </Text>
                                <TouchableOpacity
                                    onPress={getLocationWithPermission}
                                    className="bg-yellow-400 px-5 py-2 rounded-xl mt-4"
                                >
                                    <Text className="text-black text-base font-bold">Grant Permission</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    className={`py-4 rounded-xl mt-4 ${canSubmit ? 'bg-yellow-400' : 'bg-gray-500'}`}
                    onPress={() => {
                        if (!accepted) {
                            Alert.alert('Acceptance Required', 'Please confirm all details are correct to submit.');
                            return;
                        }
                        if (!location) {
                            Alert.alert('Location Required', 'Grant location permission to proceed.');
                            return;
                        }
                        handleSubmit();
                    }}
                    disabled={!canSubmit}
                >
                    <Text className="text-black text-lg font-bold text-center">Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return null; // Should never reach here
}
