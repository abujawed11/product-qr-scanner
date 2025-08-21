import { THEME } from '@/utils/theme';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import {
    Alert,
    BackHandler,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const InstallationManualScreen = () => {
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  // Handle back button
  useFocusEffect(() => {
    const onBackPress = () => {
      router.back();
      return true;
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  });

  const downloadManual = async () => {
    // Show explanation first for Expo Go users
    Alert.alert(
      '📱 Download Manual',
      'Due to app store restrictions, the manual will be downloaded and then you can choose where to save it (Files app, Drive, etc.) or share it.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: async () => {
            try {
              setDownloading(true);
              
              const manualUrl = 'https://rcckitportal.sun-rack.com/media/demo-images/BlueBase_Installation_Manual.pdf';
              const fileUri = FileSystem.documentDirectory + 'SunRack_Installation_Manual.pdf';
              
              console.log('Downloading manual from:', manualUrl);
              
              const { uri } = await FileSystem.downloadAsync(manualUrl, fileUri);
              
              console.log('Downloaded to:', uri);
              
              if (await Sharing.isAvailableAsync()) {
                // Improved sharing with better options
                await Sharing.shareAsync(uri, {
                  mimeType: 'application/pdf',
                  dialogTitle: 'Save SunRack Installation Manual',
                  UTI: 'com.adobe.pdf' // iOS specific for better PDF handling
                });
                
                Alert.alert(
                  '✅ Success!', 
                  'Manual downloaded! You can now save it to Files, share via email, or open in PDF viewers.',
                  [{ text: 'OK' }]
                );
              } else {
                Alert.alert(
                  '⚠️ Limited Sharing', 
                  'Manual downloaded to app storage, but sharing is not available on this device.'
                );
              }
            } catch (error) {
              console.error('Download error:', error);
              Alert.alert(
                'Download Failed', 
                'Could not download the manual. Please check your internet connection and try again.\n\nAlternatively, you can access it directly from our website.',
                [
                  { text: 'OK' },
                  { 
                    text: 'Open Website', 
                    onPress: () => Linking.openURL('https://rcckitportal.sun-rack.com/media/demo-images/BlueBase_Installation_Manual.pdf')
                  }
                ]
              );
            } finally {
              setDownloading(false);
            }
          }
        }
      ]
    );
  };

  const openSupportLink = () => {
    Linking.openURL('https://sun-rack.com/support').catch(() => {
      Alert.alert('Error', 'Unable to open support link');
    });
  };

  const openVideoTutorials = () => {
    Linking.openURL('https://rcckitportal.sun-rack.com/media/demo-images/bluebase.mp4').catch(() => {
      Alert.alert('Error', 'Unable to open video tutorials');
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.black }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          paddingHorizontal: THEME.spacing[6], 
          paddingTop: THEME.spacing[6],
          paddingBottom: THEME.spacing[12] 
        }}
      >
        {/* Header */}
        <Text 
          style={{
            fontSize: THEME.typography.fontSizes['3xl'],
            fontWeight: THEME.typography.fontWeights.bold,
            textAlign: 'center',
            marginBottom: THEME.spacing[2],
            color: THEME.colors.primary,
          }}
        >
          📋 Installation Manual
        </Text>
        <Text 
          style={{
            color: THEME.colors.white,
            textAlign: 'center',
            marginBottom: THEME.spacing[8],
            fontSize: THEME.typography.fontSizes.lg,
          }}
        >
          Complete guide for SunRack BlueBase™ installation
        </Text>

        {/* Manual Info Card */}
        <View 
          style={{
            backgroundColor: THEME.colors.gray[800],
            borderRadius: THEME.borderRadius['2xl'],
            padding: THEME.spacing[6],
            marginBottom: THEME.spacing[6],
            ...THEME.shadows.md,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing[4] }}>
            <MaterialIcons name="description" size={32} color={THEME.colors.primary} />
            <Text 
              style={{
                color: THEME.colors.white,
                fontSize: THEME.typography.fontSizes.xl,
                fontWeight: THEME.typography.fontWeights.bold,
                marginLeft: THEME.spacing[3],
              }}
            >
              SunRack Installation Guide
            </Text>
          </View>
          
          <Text 
            style={{
              color: THEME.colors.gray[300],
              fontSize: THEME.typography.fontSizes.base,
              marginBottom: THEME.spacing[4],
              lineHeight: THEME.typography.lineHeights.relaxed * THEME.typography.fontSizes.base,
            }}
          >
            Comprehensive step-by-step installation instructions for all SunRack BlueBase™ mounting systems including tools required, safety guidelines, and troubleshooting tips.
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing[2] }}>
            <FontAwesome5 name="file-pdf" size={16} color={THEME.colors.primary} />
            <Text style={{ color: THEME.colors.gray[300], marginLeft: THEME.spacing[3] }}>Format: PDF</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing[2] }}>
            <MaterialIcons name="language" size={18} color={THEME.colors.primary} />
            <Text style={{ color: THEME.colors.gray[300], marginLeft: THEME.spacing[3] }}>Language: English</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="update" size={18} color={THEME.colors.primary} />
            <Text style={{ color: THEME.colors.gray[300], marginLeft: THEME.spacing[3] }}>Last Updated: March 2024</Text>
          </View>
        </View>

        {/* Download Button */}
        <TouchableOpacity
          onPress={downloadManual}
          disabled={downloading}
          style={{
            backgroundColor: downloading ? THEME.colors.gray[600] : THEME.colors.primary,
            borderRadius: THEME.borderRadius['2xl'],
            padding: THEME.spacing[5],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: THEME.spacing[3],
            ...THEME.shadows.lg,
          }}
        >
          {downloading ? (
            <ActivityIndicator color={THEME.colors.white} size="small" />
          ) : (
            <MaterialIcons name="download" size={28} color={THEME.colors.black} />
          )}
          <Text 
            style={{
              color: downloading ? THEME.colors.white : THEME.colors.black,
              fontSize: THEME.typography.fontSizes.xl,
              fontWeight: THEME.typography.fontWeights.bold,
              marginLeft: THEME.spacing[3],
            }}
          >
            {downloading ? 'Downloading...' : 'Download & Share'}
          </Text>
        </TouchableOpacity>

        {/* View Online Button */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://rcckitportal.sun-rack.com/media/demo-images/BlueBase_Installation_Manual.pdf')}
          style={{
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: THEME.colors.primary,
            borderRadius: THEME.borderRadius['2xl'],
            padding: THEME.spacing[5],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: THEME.spacing[4],
          }}
        >
          <MaterialIcons name="open-in-browser" size={24} color={THEME.colors.primary} />
          <Text 
            style={{
              color: THEME.colors.primary,
              fontSize: THEME.typography.fontSizes.lg,
              fontWeight: THEME.typography.fontWeights.bold,
              marginLeft: THEME.spacing[3],
            }}
          >
            View Online
          </Text>
        </TouchableOpacity>

        {/* Quick Access Links */}
        <View 
          style={{
            backgroundColor: THEME.colors.gray[800],
            borderRadius: THEME.borderRadius['2xl'],
            padding: THEME.spacing[4],
          }}
        >
          <Text 
            style={{
              color: THEME.colors.white,
              fontWeight: THEME.typography.fontWeights.bold,
              fontSize: THEME.typography.fontSizes.lg,
              marginBottom: THEME.spacing[3],
            }}
          >
            Quick Access
          </Text>
          
          <TouchableOpacity 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: THEME.spacing[3],
              borderBottomWidth: 1,
              borderBottomColor: THEME.colors.gray[700],
            }}
            onPress={openSupportLink}
          >
            <MaterialIcons name="support-agent" size={20} color={THEME.colors.primary} />
            <Text style={{ color: THEME.colors.gray[300], marginLeft: THEME.spacing[3] }}>Technical Support</Text>
            <MaterialIcons name="open-in-new" size={16} color={THEME.colors.gray[500]} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: THEME.spacing[3],
            }}
            onPress={openVideoTutorials}
          >
            <FontAwesome5 name="youtube" size={20} color={THEME.colors.primary} />
            <Text style={{ color: THEME.colors.gray[300], marginLeft: THEME.spacing[3] }}>Installation Videos</Text>
            <MaterialIcons name="open-in-new" size={16} color={THEME.colors.gray[500]} style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Installation Steps Preview */}
        <View 
          style={{
            backgroundColor: THEME.colors.gray[800],
            borderRadius: THEME.borderRadius['2xl'],
            padding: THEME.spacing[4],
            marginTop: THEME.spacing[4],
          }}
        >
          <Text 
            style={{
              color: THEME.colors.white,
              fontWeight: THEME.typography.fontWeights.bold,
              fontSize: THEME.typography.fontSizes.lg,
              marginBottom: THEME.spacing[3],
            }}
          >
            📋 What's Included
          </Text>
          
          <View style={{ marginLeft: THEME.spacing[2] }}>
            <Text style={{ color: THEME.colors.gray[300], marginBottom: THEME.spacing[1] }}>
              • Pre-installation checklist and tools required
            </Text>
            <Text style={{ color: THEME.colors.gray[300], marginBottom: THEME.spacing[1] }}>
              • Step-by-step mounting structure assembly
            </Text>
            <Text style={{ color: THEME.colors.gray[300], marginBottom: THEME.spacing[1] }}>
              • Solar panel installation procedures
            </Text>
            <Text style={{ color: THEME.colors.gray[300], marginBottom: THEME.spacing[1] }}>
              • Safety guidelines and best practices
            </Text>
            <Text style={{ color: THEME.colors.gray[300], marginBottom: THEME.spacing[1] }}>
              • Quality control and final checks
            </Text>
            <Text style={{ color: THEME.colors.gray[300] }}>
              • Troubleshooting common issues
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstallationManualScreen;
