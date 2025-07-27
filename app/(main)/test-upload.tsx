import api from '@/utils/api'; // adjust path if needed
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Platform, Text, View } from 'react-native';

export default function TestUploadScreen() {
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setFileUri(asset.uri);
      setFileType(asset.type as 'image' | 'video');
    }
  };

  const uploadFile = async () => {
    if (!fileUri || !fileType) {
      Alert.alert('Select a file first');
      return;
    }

    const fileExt = fileUri.split('.').pop() || (fileType === 'image' ? 'jpg' : 'mp4');
    const fileName = `upload_test.${fileExt}`;
    const mimeType = fileType === 'image' ? 'image/jpeg' : 'video/mp4';

    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'ios' ? fileUri.replace('file://', '') : fileUri,
      name: fileName,
      type: mimeType,
    } as any);

    try {
      setUploading(true);
      setProgress(0);

      const res = await api.post('/test-upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000,
        onUploadProgress: progressEvent => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });

      Alert.alert('Upload Success', JSON.stringify(res.data));
    } catch (error: any) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', error.message || 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Button title="Pick Image or Video" onPress={pickMedia} />

      {fileUri && (
        <Text className="mt-4 text-center">{`Selected: ${fileUri.split('/').pop()}`}</Text>
      )}

      {uploading ? (
        <View className="mt-4 items-center">
          <ActivityIndicator size="large" color="#FAD90E" />
          <Text>{`Uploading: ${progress}%`}</Text>
        </View>
      ) : (
        fileUri && (
          <Button title="Upload File" onPress={uploadFile} color="#FAD90E" />
        )
      )}
    </View>
  );
}
