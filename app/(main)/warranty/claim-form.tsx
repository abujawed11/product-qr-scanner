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


import api from '@/utils/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function WarrantyForm() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderList, setOrderList] = useState<string[]>([]);
  const [kitId, setKitId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [issue, setIssue] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const { order_id } = useLocalSearchParams<{ order_id: string }>();

  useEffect(() => {
    if (order_id) setOrderId(order_id);
  }, [order_id]);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/');
      const ids = res.data.map((order: any) => order.order_id);
      setOrderList(ids);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!customerName || !phone || !orderId || !kitId || !serialNumber || !issue) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    Alert.alert('Submitted', 'Warranty request submitted successfully.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
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
            paddingTop: 30,
            justifyContent: 'flex-start',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text
            className="text-2xl font-bold text-center mb-6"
            style={{ color: '#FAD90E' }}
          >
            Warranty Claim Form
          </Text>

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Customer Name *
          </Text>
          <TextInput
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Enter your name"
            placeholderTextColor="#888"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Phone Number *
          </Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter your phone"
            placeholderTextColor="#888"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#888"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Order ID *
          </Text>
          <View className="bg-white rounded-xl mb-4">
            <Picker
              selectedValue={orderId}
              onValueChange={(value) => setOrderId(value)}
              dropdownIconColor="#000"
              style={{ color: 'black' }}
            >
              <Picker.Item label="Select Order ID" value="" />
              {orderList.map((id) => (
                <Picker.Item key={id} label={id} value={id} />
              ))}
            </Picker>
          </View>

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Kit ID *
          </Text>
          <TextInput
            value={kitId}
            onChangeText={setKitId}
            placeholder="KIT-XXXX"
            placeholderTextColor="#888"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Serial Number *
          </Text>
          <TextInput
            value={serialNumber}
            onChangeText={setSerialNumber}
            placeholder="SN-XXXXXX"
            placeholderTextColor="#888"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Purchase Date
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginBottom: 16,
            }}
          >
            <Text style={{ color: selectedDate ? 'black' : '#888' }}>
              {selectedDate
                ? selectedDate.toISOString().split('T')[0]
                : 'Select Purchase Date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setSelectedDate(date);
                  setPurchaseDate(date.toISOString().split('T')[0]);
                }
              }}
            />
          )}

          <Text style={{ color: '#FAD90E', fontWeight: '600', marginBottom: 4 }}>
            Issue Description *
          </Text>
          <TextInput
            value={issue}
            onChangeText={setIssue}
            placeholder="Describe the issue"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-white rounded-xl px-4 py-3 mb-4 text-black"
          />

          {image && (
            <Image
              source={{ uri: image }}
              className="w-full h-40 rounded-xl mb-4"
              resizeMode="cover"
            />
          )}

          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: '#FAD90E',
              borderRadius: 12,
              paddingVertical: 12,
              marginBottom: 24,
            }}
          >
            <Text className="text-center font-bold text-black">Upload Image *</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: '#FAD90E',
              borderRadius: 12,
              paddingVertical: 16,
            }}
          >
            <Text className="text-center text-black text-lg font-bold">Submit Claim</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}