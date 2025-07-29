// import { BACKGROUND_COLOR } from '@/utils/color';
// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import {
//     Alert,
//     Image,
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity
// } from 'react-native';

// export default function WarrantyForm() {
//   const [customerName, setCustomerName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [issue, setIssue] = useState('');
//   const [image, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     if (!customerName || !phone || !orderId || !kitId || !serialNumber || !issue) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }

//     // TODO: Integrate API call here
//     Alert.alert('Submitted', 'Warranty request submitted successfully.');
//   };

//   return (
//     <ScrollView className="flex-1 bg-black px-4 py-6">
//       <Text className="text-2xl font-bold text-center mb-6" style={{ color: BACKGROUND_COLOR }}>
//         Warranty Claim Form
//       </Text>

//       {/* Customer Info */}
//       <Text className="text-white mb-1">Customer Name *</Text>
//       <TextInput
//         value={customerName}
//         onChangeText={setCustomerName}
//         placeholder="Enter your name"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       <Text className="text-white mb-1">Phone Number *</Text>
//       <TextInput
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//         placeholder="Enter your phone"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       <Text className="text-white mb-1">Email</Text>
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         placeholder="Enter your email"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       {/* Order & Product Info */}
//       <Text className="text-white mb-1">Order ID *</Text>
//       <TextInput
//         value={orderId}
//         onChangeText={setOrderId}
//         placeholder="Order ID"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       <Text className="text-white mb-1">Kit ID *</Text>
//       <TextInput
//         value={kitId}
//         onChangeText={setKitId}
//         placeholder="KIT-XXXX"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       <Text className="text-white mb-1">Serial Number *</Text>
//       <TextInput
//         value={serialNumber}
//         onChangeText={setSerialNumber}
//         placeholder="SN-XXXXXX"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       <Text className="text-white mb-1">Purchase Date</Text>
//       <TextInput
//         value={purchaseDate}
//         onChangeText={setPurchaseDate}
//         placeholder="YYYY-MM-DD"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       {/* Issue */}
//       <Text className="text-white mb-1">Issue Description *</Text>
//       <TextInput
//         value={issue}
//         onChangeText={setIssue}
//         placeholder="Describe the issue you're facing"
//         multiline
//         numberOfLines={4}
//         textAlignVertical="top"
//         className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//       />

//       {/* Attachment */}
//       <Text className="text-white mb-1">Upload Photo (Optional)</Text>
//       {image && (
//         <Image
//           source={{ uri: image }}
//           className="w-full h-40 rounded-xl mb-4"
//           resizeMode="cover"
//         />
//       )}
//       <TouchableOpacity
//         onPress={pickImage}
//         className="bg-yellow-400 rounded-xl py-3 mb-6"
//       >
//         <Text className="text-center font-bold text-black">Upload Image</Text>
//       </TouchableOpacity>

//       {/* Submit */}
//       <TouchableOpacity
//         onPress={handleSubmit}
//         className="bg-yellow-400 rounded-xl py-4"
//       >
//         <Text className="text-center text-black text-lg font-bold">Submit Claim</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }


// import FloatingInput from '@/components/FloatingInput';
// import FloatingPicker from '@/components/FloatingPicker';
// import api from '@/utils/api';
// import { BACKGROUND_COLOR } from '@/utils/color';
// import * as ImagePicker from 'expo-image-picker';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';


// export default function WarrantyForm() {
//   const [customerName, setCustomerName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [orderList, setOrderList] = useState<string[]>([]); // dropdown values

//   const [kitId, setKitId] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [issue, setIssue] = useState('');
//   const [image, setImage] = useState<string | null>(null);
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();


//   // const FloatingInput = ({
//   //   label,
//   //   value,
//   //   setValue,
//   //   secureTextEntry = false,
//   // }: {
//   //   label: string;
//   //   value: string;
//   //   setValue: (val: string) => void;
//   //   secureTextEntry?: boolean;
//   // }) => {
//   //   const isFocused = value !== '';
//   //   const labelStyle = twMerge(
//   //     'absolute left-3 text-xs transition-all',
//   //     isFocused ? 'top-1 text-yellow-500' : 'top-3 text-gray-400'
//   //   );

//   //   return (
//   //     <View className="w-full border border-gray-300 rounded-md px-3  mb-4 bg-white">
//   //       <Text className={labelStyle}>{label}</Text>
//   //       <TextInput
//   //         className="text-black mt-4"
//   //         value={value}
//   //         onChangeText={setValue}
//   //         secureTextEntry={secureTextEntry}
//   //         placeholder=""
//   //         placeholderTextColor="#ccc"
//   //       />
//   //     </View>
//   //   );
//   // };

//   useEffect(() => {
//     if (order_id) {
//       console.log("order_id from params:", order_id);
//       setOrderId(order_id);
//     }
//   }, [order_id]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);


//   useFocusEffect(
//     React.useCallback(() => {



//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         // router.back();
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/orders/');
//       const ids = res.data.map((order: any) => order.order_id);
//       setOrderList(ids);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     if (!customerName || !phone || !orderId || !kitId || !serialNumber || !issue) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }

//     Alert.alert('Submitted', 'Warranty request submitted successfully.');
//   };

//   return (
//     // <ScrollView className="flex-1 bg-black px-4 py-6">



//     <View style={{ flex: 1 }} className="bg-black">
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//       >
//         <ScrollView contentContainerStyle={{
//           padding: 20,
//           paddingBottom: 40,
//           flexGrow: 1,
//           paddingTop: 30,
//           justifyContent: 'flex-start',
//         }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}>
//           <Text className="text-2xl font-bold text-center mb-6" style={{ color: BACKGROUND_COLOR }}>
//             Warranty Claim Form
//           </Text>

//           {/* Customer Info */}
//           {/* <Text className="text-white mb-1">Customer Name *</Text> */}
//           {/* <FloatingInput
//               // value={customerName}
//               label="Customer Name *"
//               // onChangeText={setCustomerName}
//               value={customerName}
//               // className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//               setValue={setCustomerName}
//             /> */}

//           {/* <FloatingInput
//             label="Customer Name *"
//             value={customerName}
//             onChangeText={setCustomerName}
//           /> */}

//           <FloatingInput label="Customer Name *" value={customerName} setValue={setCustomerName} />
//           <FloatingInput label="Phone Number *" keyboardType="phone-pad" value={phone} setValue={setPhone} />
//           <FloatingInput label="Email *" value={email} setValue={setEmail} />

//           <FloatingPicker
//             label="Order ID *"
//             selectedValue={orderId}
//             onValueChange={setOrderId} items={[]}        
//             items={orderList.map((id) => ({ label: id, value: id }))}
//           />
//           <FloatingInput label="Customer Name *" value={customerName} setValue={setCustomerName} />
//           <FloatingInput label="Customer Name *" value={customerName} setValue={setCustomerName} />
//           {/* <FloatingInput label="Customer ID" value={customerName} setValue={setCustomerName} /> */}

//           {/* <Text className="text-white mb-1">Customer Name *</Text>
//           <TextInput
//             value={customerName}
//             onChangeText={setCustomerName}
//             // keyboardType=""
//             placeholder="Enter your Name"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           /> */}

//           {/* <Text className="text-white mb-1">Phone Number *</Text>
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             placeholder="Enter your phone"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           /> */}

//           {/* <Text className="text-white mb-1">Email</Text>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             placeholder="Enter your email"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           /> */}

//           {/* Dropdown for Order ID */}
//           {/* <Text className="text-white mb-1">Order ID *</Text>
//           <View className="bg-white/90 rounded-xl mb-4">
//             <Picker
//               selectedValue={orderId}
//               onValueChange={(value) => setOrderId(value)}
//               dropdownIconColor="#000"
//               style={{ color: 'black' }}
//             >
//               <Picker.Item label="Select Order ID" value="" />
//               {orderList.map((id) => (
//                 <Picker.Item key={id} label={id} value={id} />
//               ))}
//             </Picker>
//           </View>

//           <Text className="text-white mb-1">Kit ID *</Text>
//           <TextInput
//             value={kitId}
//             onChangeText={setKitId}
//             placeholder="KIT-XXXX"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text className="text-white mb-1">Serial Number *</Text>
//           <TextInput
//             value={serialNumber}
//             onChangeText={setSerialNumber}
//             placeholder="SN-XXXXXX"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text className="text-white mb-1">Purchase Date</Text>
//           <TextInput
//             value={purchaseDate}
//             onChangeText={setPurchaseDate}
//             placeholder="YYYY-MM-DD"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text className="text-white mb-1">Issue Description *</Text>
//           <TextInput
//             value={issue}
//             onChangeText={setIssue}
//             placeholder="Describe the issue"
//             multiline
//             numberOfLines={4}
//             textAlignVertical="top"
//             className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
//           /> */}

//           {/* <Text className="text-white mb-1">Upload Photo *</Text> */}
//           {image && (
//             <Image source={{ uri: image }} className="w-full h-40 rounded-xl mb-4" resizeMode="cover" />
//           )}
//           <TouchableOpacity onPress={pickImage} className="bg-yellow-400 rounded-xl py-3 mb-6">
//             <Text className="text-center font-bold text-black">Upload Image *</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleSubmit} className="bg-yellow-400 rounded-xl py-4">
//             <Text className="text-center text-black text-lg font-bold">Submit Claim</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }


// import api from '@/utils/api';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function WarrantyForm() {
//   const [customerName, setCustomerName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [orderList, setOrderList] = useState<string[]>([]);
//   const [kitId, setKitId] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [issue, setIssue] = useState('');
//   const [image, setImage] = useState<string | null>(null);
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   useEffect(() => {
//     if (order_id) setOrderId(order_id);
//   }, [order_id]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/orders/');
//       const ids = res.data.map((order: any) => order.order_id);
//       setOrderList(ids);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSubmit = () => {
//     if (!customerName || !phone || !orderId || !kitId || !serialNumber || !issue) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }
//     Alert.alert('Submitted', 'Warranty request submitted successfully.');
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#000' }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={{
//             padding: 20,
//             paddingBottom: 40,
//             flexGrow: 1,
//             paddingTop: 30,
//             justifyContent: 'flex-start',
//           }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text
//             className="text-2xl font-bold text-center mb-6"
//             style={{ color: '#FAD90E' }}
//           >
//             Warranty Claim Form
//           </Text>

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Customer Name *
//           </Text>
//           <TextInput
//             value={customerName}
//             onChangeText={setCustomerName}
//             placeholder="Enter your name"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Phone Number *
//           </Text>
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             placeholder="Enter your phone"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Email
//           </Text>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             placeholder="Enter your email"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Order ID *
//           </Text>
//           <View className="bg-white rounded-xl mb-4">
//             <Picker
//               selectedValue={orderId}
//               onValueChange={(value) => setOrderId(value)}
//               dropdownIconColor="#000"
//               style={{ color: 'black' }}
//             >
//               <Picker.Item label="Select Order ID" value="" />
//               {orderList.map((id) => (
//                 <Picker.Item key={id} label={id} value={id} />
//               ))}
//             </Picker>
//           </View>

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Kit ID *
//           </Text>
//           <TextInput
//             value={kitId}
//             onChangeText={setKitId}
//             placeholder="KIT-XXXX"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Serial Number *
//           </Text>
//           <TextInput
//             value={serialNumber}
//             onChangeText={setSerialNumber}
//             placeholder="SN-XXXXXX"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Purchase Date
//           </Text>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={{
//               backgroundColor: 'white',
//               borderRadius: 12,
//               paddingVertical: 12,
//               paddingHorizontal: 16,
//               marginBottom: 16,
//             }}
//           >
//             <Text style={{ color: selectedDate ? 'black' : '#888' }}>
//               {selectedDate
//                 ? selectedDate.toISOString().split('T')[0]
//                 : 'Select Purchase Date'}
//             </Text>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDate || new Date()}
//               mode="date"
//               display="default"
//               onChange={(event, date) => {
//                 setShowDatePicker(false);
//                 if (date) {
//                   setSelectedDate(date);
//                   setPurchaseDate(date.toISOString().split('T')[0]);
//                 }
//               }}
//             />
//           )}

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Issue Description *
//           </Text>
//           <TextInput
//             value={issue}
//             onChangeText={setIssue}
//             placeholder="Describe the issue"
//             placeholderTextColor="#888"
//             multiline
//             numberOfLines={4}
//             textAlignVertical="top"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           {image && (
//             <Image
//               source={{ uri: image }}
//               className="w-full h-40 rounded-xl mb-4"
//               resizeMode="cover"
//             />
//           )}

//           <TouchableOpacity
//             onPress={pickImage}
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 12,
//               marginBottom: 24,
//             }}
//           >
//             <Text className="text-center font-bold text-black">Upload Image *</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleSubmit}
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 16,
//             }}
//           >
//             <Text className="text-center text-black text-lg font-bold">Submit Claim</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

//-------------------------------------------------------
//Ayan Upload Code
//-----------------------------------------------------


// import api from '@/utils/api';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Picker } from '@react-native-picker/picker';
// import { ResizeMode, Video } from 'expo-av';
// import * as ImagePicker from 'expo-image-picker';
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   BackHandler,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function WarrantyForm() {
//   const [clientName, setClientName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [orderList, setOrderList] = useState<string[]>([]);
//   const [kitId, setKitId] = useState('');
//   const [serialNumber, setSerialNumber] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [issue, setIssue] = useState('');
//   const [multipleImages, setMultipleImages] = useState<string[]>([]);
//   const [multipleVideos, setMultipleVideos] = useState<string[]>([]); // Changed to array for multiple videos
//   const { order_id } = useLocalSearchParams<{ order_id: string }>();

//   useEffect(() => {
//     if (order_id) setOrderId(order_id);
//   }, [order_id]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get('/orders/');
//       const ids = res.data.map((order: any) => order.order_id);
//       setOrderList(ids);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const pickMultipleImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       quality: 0.7,
//       selectionLimit: 5,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       const newUris = result.assets.map((asset) => asset.uri);
//       setMultipleImages([...multipleImages, ...newUris]);
//     }
//   };

//   const deleteImage = (uri: string) => {
//     setMultipleImages(multipleImages.filter((img) => img !== uri));
//   };

//   const pickVideo = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsMultipleSelection: true, // Enable multiple video selection
//       quality: 0.7,
//       selectionLimit: 5, // Limit to 5 videos, similar to images
//     });

//     console.log('Uploaded video result:', result); // Debug

//     if (!result.canceled && result.assets.length > 0) {
//       const newVideoUris = result.assets.map((asset) => asset.uri);
//       setMultipleVideos([...multipleVideos, ...newVideoUris]); // Append new videos
//     }
//   };

//   const recordVideo = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled && result.assets.length > 0) {
//       setMultipleVideos([...multipleVideos, result.assets[0].uri]); // Append recorded video
//     }
//   };

//   const deleteVideo = (uri: string) => {
//     setMultipleVideos(multipleVideos.filter((vid) => vid !== uri)); // Delete specific video
//   };

//   const handleSubmit = () => {
//     if (!clientName || !phone || !orderId || !kitId || !serialNumber || !issue) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }

//     Alert.alert('Submitted', 'Warranty request submitted successfully.');
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#000' }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={{
//             padding: 20,
//             paddingBottom: 40,
//             flexGrow: 1,
//             paddingTop: 30,
//             justifyContent: 'flex-start',
//           }}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}
//         >
//           <Text className="text-2xl font-bold text-center mb-6" style={{ color: '#FAD90E' }}>
//             Warranty Request Form
//           </Text>

//           {/* Input fields */}
//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Client Name *</Text>
//           <TextInput
//             value={clientName}
//             onChangeText={setClientName}
//             placeholder="Enter your name"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Phone Number *</Text>
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             placeholder="Enter your phone"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Email</Text>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             placeholder="Enter your email"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Order ID *</Text>
//           <View className="bg-white rounded-xl mb-4">
//             <Picker
//               selectedValue={orderId}
//               onValueChange={(value) => setOrderId(value)}
//               dropdownIconColor="#000"
//               style={{ color: 'black' }}
//             >
//               <Picker.Item label="Select Order ID" value="" />
//               {orderList.map((id) => (
//                 <Picker.Item key={id} label={id} value={id} />
//               ))}
//             </Picker>
//           </View>

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Kit ID *</Text>
//           <TextInput
//             value={kitId}
//             onChangeText={setKitId}
//             placeholder="KIT-XXXX"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Serial Number *</Text>
//           <TextInput
//             value={serialNumber}
//             onChangeText={setSerialNumber}
//             placeholder="SN-XXXXXX"
//             placeholderTextColor="#888"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>Purchase Date</Text>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={{
//               backgroundColor: 'white',
//               borderRadius: 12,
//               paddingVertical: 12,
//               paddingHorizontal: 16,
//               marginBottom: 16,
//             }}
//           >
//             <Text style={{ color: selectedDate ? 'black' : '#888' }}>
//               {selectedDate ? selectedDate.toISOString().split('T')[0] : 'Select Purchase Date'}
//             </Text>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDate || new Date()}
//               mode="date"
//               display="default"
//               onChange={(event, date) => {
//                 setShowDatePicker(false);
//                 if (date) {
//                   setSelectedDate(date);
//                   setPurchaseDate(date.toISOString().split('T')[0]);
//                 }
//               }}
//             />
//           )}

//           <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
//             Issue Description *
//           </Text>
//           <TextInput
//             value={issue}
//             onChangeText={setIssue}
//             placeholder="Describe the issue"
//             placeholderTextColor="#888"
//             multiline
//             numberOfLines={4}
//             textAlignVertical="top"
//             className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//           />

//           {/* Multiple Images */}
//           {multipleImages.map((img, index) => (
//             <View key={index} style={{ marginBottom: 10 }}>
//               <Image source={{ uri: img }} className="w-full h-40 rounded-xl" resizeMode="cover" />
//               <TouchableOpacity onPress={() => deleteImage(img)}>
//                 <Text className="text-red-500 text-center font-bold mt-1">Delete</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           <TouchableOpacity
//             onPress={pickMultipleImages}
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 12,
//               marginBottom: 24,
//             }}
//           >
//             <Text className="text-center font-bold text-black">Upload Image *</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={pickVideo}
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 12,
//               marginBottom: 12,
//             }}
//           >
//             <Text className="text-center font-bold text-black">Upload Existing Videos</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={recordVideo}
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 12,
//               marginBottom: 16,
//             }}
//           >
//             <Text className="text-center font-bold text-black">Record Video</Text>
//           </TouchableOpacity>

//           {/* Multiple Videos */}
//           {multipleVideos.map((vid, index) => (
//             <View key={index} style={{ marginBottom: 16 }}>
//               <Video
//                 source={{ uri: vid }}
//                 style={{ width: '100%', height: 200, borderRadius: 12 }}
//                 useNativeControls
//                 resizeMode={ResizeMode.CONTAIN}
//                 key={vid} // Force re-render when new video is picked
//               />
//               <TouchableOpacity onPress={() => deleteVideo(vid)}>
//                 <Text className="text-center text-red-500 font-bold mt-2">Delete Video</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           {/* Submit Button */}
//           <TouchableOpacity
//             onPress={handleSubmit}
//             disabled={multipleImages.length === 0 || multipleVideos.length === 0} // Updated to check multipleVideos
//             style={{
//               backgroundColor: '#FAD90E',
//               borderRadius: 12,
//               paddingVertical: 16,
//               opacity: multipleImages.length === 0 || multipleVideos.length === 0 ? 0.5 : 1,
//             }}
//           >
//             <Text className="text-center text-black text-lg font-bold">Submit Request</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }


//-----------------------working------------------------------
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function WarrantyCustomerInfoPage() {
//   // --- Get params for autofill ---
//   const params = useLocalSearchParams<{
//     client_id?: string;
//     company_name?: string;
//     // phone?: string;
//     // email?: string;
//     order_id?: string;
//     kit_id?: string;
//     kit_no?: string;
//     project_id?: string;
//     purchase_date?: string;
//   }>();

//   const [clientId, setClientId] = useState('');
//   const [clientName, setClientName] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [kitNo, setKitNo] = useState('');
//   const [projectId, setProjectId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');

//   useFocusEffect(
//     React.useCallback(() => {

//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );


//   useEffect(() => {
//     if (params.client_id) setClientId(params.client_id);
//     // if (params.clientName) setClientName(params.clientName);
//     if (params.company_name) setCompanyName(params.company_name)
//     // if (params.phone) setPhone(params.phone);
//     // if (params.email) setEmail(params.email);
//     if (params.order_id) setOrderId(params.order_id);
//     if (params.kit_id) setKitId(params.kit_id);
//     if (params.kit_no) setKitNo(params.kit_no);
//     if (params.project_id) setProjectId(params.project_id);
//     if (params.purchase_date) setPurchaseDate(params.purchase_date);
//   }, [params]);

//   const handleNext = () => {
//     if (!clientId || !companyName || !clientName || !phone || !email || !orderId || !kitId || !kitNo || !projectId) {
//       Alert.alert('Validation Error', 'Please fill out all required fields.');
//       return;
//     }
//     router.replace({
//       pathname: '/(main)/warranty/claim-media-wizard',
//       params: {
//         clientId, clientName, phone, email, orderId, kitId, kitNo, projectId, purchaseDate,
//         stepIdx: 0,
//       }
//     });
//   };

//   return (
//     <>
//       {/* <Stack.Screen options={{ title: "Request Warranty" }} /> */}
//       <View className="flex-1 bg-black">
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//         >
//           <ScrollView
//             contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             {/* <Text className="text-2xl font-bold text-yellow-400 text-center mb-8">
//               Warranty Request Form
//             </Text> */}
//             <Text className="text-yellow-400 font-semibold mb-1">Client ID *</Text>
//             <TextInput
//               value={clientId}
//               onChangeText={setClientId}
//               placeholder="Client ID"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Client Company Name *</Text>
//             <TextInput
//               value={companyName}
//               onChangeText={setCompanyName}
//               placeholder="Client Name"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Contact Name *</Text>
//             <TextInput
//               value={clientName}
//               onChangeText={setClientName}
//               placeholder="Contact Name"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Contact Phone *</Text>
//             <TextInput
//               value={phone}
//               onChangeText={setPhone}
//               placeholder="Phone"
//               keyboardType="phone-pad"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Email *</Text>
//             <TextInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//               keyboardType="email-address"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Order ID *</Text>
//             <TextInput
//               value={orderId}
//               onChangeText={setOrderId}
//               placeholder="Order ID"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Kit ID *</Text>
//             <TextInput
//               value={kitId}
//               onChangeText={setKitId}
//               placeholder="Kit ID"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Kit Number *</Text>
//             <TextInput
//               value={kitNo}
//               onChangeText={setKitNo}
//               placeholder="Kit No"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Project ID *</Text>
//             <TextInput
//               value={projectId}
//               onChangeText={setProjectId}
//               placeholder="Project ID"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
//             />
//             <Text className="text-yellow-400 font-semibold mb-1">Purchase Date</Text>
//             <TextInput
//               value={purchaseDate}
//               onChangeText={setPurchaseDate}
//               placeholder="Purchase Date"
//               placeholderTextColor="#888"
//               className="bg-white rounded-xl px-4 py-3 mb-8 text-black"
//             />
//             <TouchableOpacity
//               className="bg-yellow-400 py-4 rounded-xl"
//               onPress={handleNext}
//             >
//               <Text className="text-black font-bold text-center text-lg">Next: Start Warranty Photo/Video Steps</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// }

//========= working =====================================
// import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// export default function WarrantyCustomerInfoPage() {
//   // --- Get params for autofill ---
//   const params = useLocalSearchParams<{
//     client_id?: string;
//     company_name?: string;
//     order_id?: string;
//     kit_id?: string;
//     kit_no?: string;
//     project_id?: string;
//     purchase_date?: string;
//   }>();

//   const [clientId, setClientId] = useState('');
//   const [clientName, setClientName] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [orderId, setOrderId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [kitNo, setKitNo] = useState('');
//   const [projectId, setProjectId] = useState('');
//   const [purchaseDate, setPurchaseDate] = useState('');

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );

//   useEffect(() => {
//     if (params.client_id) setClientId(params.client_id);
//     if (params.company_name) setCompanyName(params.company_name);
//     if (params.order_id) setOrderId(params.order_id);
//     if (params.kit_id) setKitId(params.kit_id);
//     if (params.kit_no) setKitNo(params.kit_no);
//     if (params.project_id) setProjectId(params.project_id);
//     if (params.purchase_date) setPurchaseDate(params.purchase_date);
//   }, [params]);

//   const handleNext = () => {
//     if (!clientId || !companyName || !clientName || !phone || !email || !orderId || !kitId || !kitNo || !projectId) {
//       Alert.alert('Validation Error', 'Please fill out all required fields.');
//       return;
//     }
//     router.replace({
//       pathname: '/(main)/warranty/claim-media-wizard',
//       params: {
//         clientId, companyName, clientName, phone, email, orderId, kitId, kitNo, projectId, purchaseDate,
//         stepIdx: 0,
//       }
//     });
//   };

//   return (
//     <>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: '#000',
//         }}
//       >
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={{ flex: 1 }}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//         >
//           <ScrollView
//             contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
//             keyboardShouldPersistTaps="handled"
//             showsVerticalScrollIndicator={false}
//           >
//             {/* <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 24, textAlign: 'center', marginBottom: 30 }}>
//               Warranty Request Form
//             </Text> */}

//             {/* Client ID */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client ID *</Text>
//             <TextInput
//               value={clientId}
//               onChangeText={setClientId}
//               placeholder="Client ID"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Client Company Name */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client Company Name *</Text>
//             <TextInput
//               value={companyName}
//               onChangeText={setCompanyName}
//               placeholder="Company Name"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Contact Name */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Name *</Text>
//             <TextInput
//               value={clientName}
//               onChangeText={setClientName}
//               placeholder="Contact Name"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Phone */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Phone *</Text>
//             <TextInput
//               value={phone}
//               onChangeText={setPhone}
//               placeholder="Phone"
//               placeholderTextColor="#BBB"
//               keyboardType="phone-pad"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Email */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Email *</Text>
//             <TextInput
//               value={email}
//               onChangeText={setEmail}
//               placeholder="Email"
//               placeholderTextColor="#BBB"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Order ID */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Order ID *</Text>
//             <TextInput
//               value={orderId}
//               onChangeText={setOrderId}
//               placeholder="Order ID"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Kit ID */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit ID *</Text>
//             <TextInput
//               value={kitId}
//               onChangeText={setKitId}
//               placeholder="Kit ID"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Kit Number */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit Number *</Text>
//             <TextInput
//               value={kitNo}
//               onChangeText={setKitNo}
//               placeholder="Kit No"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Project ID */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Project ID *</Text>
//             <TextInput
//               value={projectId}
//               onChangeText={setProjectId}
//               placeholder="Project ID"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 16,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             {/* Purchase Date */}
//             <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Purchase Date</Text>
//             <TextInput
//               value={purchaseDate}
//               onChangeText={setPurchaseDate}
//               placeholder="Purchase Date"
//               placeholderTextColor="#BBB"
//               style={{
//                 backgroundColor: '#FFF',
//                 borderRadius: 9,
//                 borderWidth: 2,
//                 borderColor: '#FACC15',
//                 paddingVertical: 12,
//                 paddingHorizontal: 16,
//                 marginBottom: 32,
//                 fontSize: 16,
//                 color: '#222',
//                 fontWeight: '500',
//                 shadowColor: '#FACC15',
//                 shadowOpacity: 0.08,
//                 shadowRadius: 6,
//                 shadowOffset: { width: 0, height: 2 },
//                 elevation: 2,
//               }}
//             />

//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#FACC15',
//                 paddingVertical: 18,
//                 borderRadius: 9,
//                 shadowColor: '#000',
//                 shadowOpacity: 0.18,
//                 shadowRadius: 8,
//                 shadowOffset: { width: 0, height: 4 },
//                 elevation: 3,
//                 marginTop: 8,
//               }}
//               onPress={handleNext}
//             >
//               <Text style={{
//                 color: "#111",
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 fontSize: 15,
//                 letterSpacing: 0.5
//               }}>
//                 Next: Start Warranty Photo/Video Steps
//               </Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </View>
//     </>
//   );
// }


import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Minimal country data
const COUNTRY_LIST = [
  { code: "+212", flag: "🇲🇦", label: "Morocco" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+86",  flag: "🇨🇳", label: "China" },
  { code: "+34",  flag: "🇪🇸", label: "Spain" },
  { code: "+91",  flag: "🇮🇳", label: "India" },
  { code: "+1",   flag: "🇺🇸", label: "USA" },
  { code: "+44",  flag: "🇬🇧", label: "UK" },
  { code: "+49",  flag: "🇩🇪", label: "Germany" },
  { code: "+33",  flag: "🇫🇷", label: "France" },
  { code: "+27",  flag: "🇿🇦", label: "South Africa" },
  { code: "+61",  flag: "🇦🇺", label: "Australia" },
];

  // add/remove as needed

function validateEmail(email: string) {
  return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

export default function WarrantyCustomerInfoPage() {
  // --- Get params for autofill ---
  const params = useLocalSearchParams<{
    client_id?: string;
    company_name?: string;
    order_id?: string;
    kit_id?: string;
    kit_no?: string;
    project_id?: string;
    purchase_date?: string;
  }>();

  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState(COUNTRY_LIST[4]); // Default India
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [kitId, setKitId] = useState('');
  const [kitNo, setKitNo] = useState('');
  const [projectId, setProjectId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [showCountrySelect, setShowCountrySelect] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace('/(main)/dashboard');
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    if (params.client_id) setClientId(params.client_id);
    if (params.company_name) setCompanyName(params.company_name);
    if (params.order_id) setOrderId(params.order_id);
    if (params.kit_id) setKitId(params.kit_id);
    if (params.kit_no) setKitNo(params.kit_no);
    if (params.project_id) setProjectId(params.project_id);
    if (params.purchase_date) setPurchaseDate(params.purchase_date);
  }, [params]);

  // Phone: only allow 0-9, max 10 digits
  const handlePhoneChange = (txt: string) => {
    let num = txt.replace(/[^\d]/g, '');
    if (num.length > 10) num = num.slice(0, 10);
    setPhone(num);
  };

  // Email: basic live validation
  const isEmailValid = email === '' || validateEmail(email);

  const handleNext = () => {
    if (
      !clientId || !companyName || !clientName || !phone || !email ||
      !orderId || !kitId || !kitNo || !projectId
    ) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }
    if (phone.length < 10) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    router.replace({
      pathname: '/(main)/warranty/claim-media-wizard',
      params: {
        clientId, companyName, clientName, phone: country.code + phone, email,
        orderId, kitId, kitNo, projectId, purchaseDate,
        stepIdx: 0,
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          {/* <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 24, textAlign: 'center', marginBottom: 30 }}>
            Warranty Request Form
          </Text> */}

          {/* Client ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client ID *</Text>
          <TextInput
            value={clientId}
            onChangeText={setClientId}
            placeholder="Client ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Client Company Name */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client Company Name *</Text>
          <TextInput
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Company Name"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Contact Name */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Name *</Text>
          <TextInput
            value={clientName}
            onChangeText={setClientName}
            placeholder="Contact Name"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Country/Flag picker and Phone */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Phone *</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity
              activeOpacity={0.77}
              onPress={() => setShowCountrySelect(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 9,
                borderWidth: 2,
                borderColor: '#FACC15',
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginRight: 7,
                shadowColor: '#FACC15',
                shadowOpacity: 0.08,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                minWidth: 68
              }}
            >
              <Text style={{ fontSize: 21, marginRight: 6 }}>{country.flag}</Text>
              <Text style={{ color: "#444", fontWeight: '700', fontSize: 15 }}>{country.code}</Text>
            </TouchableOpacity>
            <TextInput
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="Phone"
              placeholderTextColor="#BBB"
              keyboardType="numeric"
              style={[inputStyle, { flex: 1, marginBottom: 0, borderRadius: 9 }]}
              maxLength={10}
            />
          </View>
          {phone.length > 0 && phone.length < 10 &&
            <Text style={{ color: "tomato", fontSize: 13, marginBottom: 11, marginLeft: 3 }}>Enter 10 digits</Text>
          }

          {/* Country Selector Modal (simple in-list display) */}
          {showCountrySelect && (
            <View style={{
              position: 'absolute',
              top: 150,
              left: 24,
              right: 24,
              backgroundColor: '#18181b',
              borderRadius: 18,
              borderColor: '#FACC15',
              borderWidth: 2,
              zIndex: 10,
              elevation: 12,
              paddingVertical: 12
            }}>
              <Text style={{ color: '#FACC15', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
                Select Country
              </Text>
              {COUNTRY_LIST.map((cty) => (
                <TouchableOpacity
                  key={cty.code}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderBottomWidth: 1,
                    borderBottomColor: '#222',
                  }}
                  onPress={() => {
                    setCountry(cty);
                    setShowCountrySelect(false);
                  }}
                >
                  <Text style={{ fontSize: 20, marginRight: 10 }}>{cty.flag}</Text>
                  <Text style={{ color: '#FFF', fontSize: 15, fontWeight: country.code === cty.code ? 'bold' : '600' }}>
                    {cty.label} ({cty.code})
                  </Text>
                  {country.code === cty.code && (
                    <Text style={{ marginLeft: 8, color: "#FACC15", fontSize: 16 }}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{ paddingVertical: 8, alignItems: 'center' }}
                onPress={() => setShowCountrySelect(false)}
              >
                <Text style={{ color: "#BBB", fontWeight: '600', fontSize: 15 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6, marginTop: 1 }}>Email *</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#BBB"
            keyboardType="email-address"
            autoCapitalize="none"
            style={inputStyle}
          />
          {!isEmailValid &&
            <Text style={{ color: "tomato", fontSize: 13, marginBottom: 11, marginLeft: 3 }}>
              Please enter a valid email address.
            </Text>
          }

          {/* Order ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Order ID *</Text>
          <TextInput
            value={orderId}
            onChangeText={setOrderId}
            placeholder="Order ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Kit ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit ID *</Text>
          <TextInput
            value={kitId}
            onChangeText={setKitId}
            placeholder="Kit ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Kit Number */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit Number *</Text>
          <TextInput
            value={kitNo}
            onChangeText={setKitNo}
            placeholder="Kit No"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Project ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Project ID *</Text>
          <TextInput
            value={projectId}
            onChangeText={setProjectId}
            placeholder="Project ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Purchase Date */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Purchase Date</Text>
          <TextInput
            value={purchaseDate}
            onChangeText={setPurchaseDate}
            placeholder="Purchase Date"
            placeholderTextColor="#BBB"
            style={[inputStyle, { marginBottom: 32 }]}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#FACC15',
              paddingVertical: 18,
              borderRadius: 9,
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
              marginTop: 8,
            }}
            onPress={handleNext}
          >
            <Text style={{
              color: "#111",
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 15,
              letterSpacing: 0.5
            }}>
              Next: Start Warranty Photo/Video Steps
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Input style reused
const inputStyle = {
  backgroundColor: '#FFF',
  borderRadius: 9,
  borderWidth: 2,
  borderColor: '#FACC15',
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginBottom: 16,
  fontSize: 16,
  color: '#222',
  fontWeight: '600' as const,
  shadowColor: '#FACC15',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};