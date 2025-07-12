import { BACKGROUND_COLOR } from '@/utils/color';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default function WarrantyForm() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [kitId, setKitId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [issue, setIssue] = useState('');
  const [image, setImage] = useState<string | null>(null);

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

    // TODO: Integrate API call here
    Alert.alert('Submitted', 'Warranty request submitted successfully.');
  };

  return (
    <ScrollView className="flex-1 bg-black px-4 py-6">
      <Text className="text-2xl font-bold text-center mb-6" style={{ color: BACKGROUND_COLOR }}>
        Warranty Claim Form
      </Text>

      {/* Customer Info */}
      <Text className="text-white mb-1">Customer Name *</Text>
      <TextInput
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Enter your name"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      <Text className="text-white mb-1">Phone Number *</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Enter your phone"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      <Text className="text-white mb-1">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      {/* Order & Product Info */}
      <Text className="text-white mb-1">Order ID *</Text>
      <TextInput
        value={orderId}
        onChangeText={setOrderId}
        placeholder="Order ID"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      <Text className="text-white mb-1">Kit ID *</Text>
      <TextInput
        value={kitId}
        onChangeText={setKitId}
        placeholder="KIT-XXXX"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      <Text className="text-white mb-1">Serial Number *</Text>
      <TextInput
        value={serialNumber}
        onChangeText={setSerialNumber}
        placeholder="SN-XXXXXX"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      <Text className="text-white mb-1">Purchase Date</Text>
      <TextInput
        value={purchaseDate}
        onChangeText={setPurchaseDate}
        placeholder="YYYY-MM-DD"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      {/* Issue */}
      <Text className="text-white mb-1">Issue Description *</Text>
      <TextInput
        value={issue}
        onChangeText={setIssue}
        placeholder="Describe the issue you're facing"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className="bg-white/90 rounded-xl px-4 py-3 mb-4 text-black"
      />

      {/* Attachment */}
      <Text className="text-white mb-1">Upload Photo (Optional)</Text>
      {image && (
        <Image
          source={{ uri: image }}
          className="w-full h-40 rounded-xl mb-4"
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        onPress={pickImage}
        className="bg-yellow-400 rounded-xl py-3 mb-6"
      >
        <Text className="text-center font-bold text-black">Upload Image</Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-yellow-400 rounded-xl py-4"
      >
        <Text className="text-center text-black text-lg font-bold">Submit Claim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
