
import { doc_url } from "@/utils/constants";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import ImageView from "react-native-image-viewing";
import { ActivityIndicator } from "react-native-paper";

dayjs.extend(relativeTime);

import { checklistItems, claimSteps as importedClaimSteps } from "@/app/(main)/warranty/claim-steps";
import api from "@/utils/api";
import { getStatusBgClass } from "@/utils/statusColor";

type Upload = {
  id: number;
  step_key: string;
  media_type: "image" | "video";
  media_file: string;
};

type ClaimStep = {
  key: string;
  title: string;
  instruction?: string;
};

type ClaimDetail = {
  war_req_id: string;
  status: string;
  review_comment?: string;
  company_name: string;
  client_id: string;
  order_id: string;
  kit_id: string;
  kit_number: string;
  project_id: string;
  purchase_date: string | null;
  device_latitude?: number | null;
  device_longitude?: number | null;
  created_at: string;
  updated_at: string;
  checklist_answers: Record<string, boolean>;
  uploads: Upload[];
  pdf_url?: string;
};


function normalizeStatus(s: string) {
  const t = s.toLowerCase();
  if (t === 'approved') return 'delivered';
  if (t === 'rejected') return 'cancelled';
  return t;
}

function getMediaUrl(media_file: string): string {
  if (media_file.startsWith("http")) return media_file;
  if (media_file.startsWith("/media/")) return doc_url + media_file;
  return doc_url + media_file.replace(/^\/+/, "");
}


const getStatusColor = (status: string) => {
  if (status.toLowerCase().includes("pending")) return "bg-yellow-200 text-yellow-800";
  if (status.toLowerCase().includes("approved")) return "bg-green-200 text-green-800";
  if (status.toLowerCase().includes("rejected")) return "bg-red-200 text-red-800";
  return "bg-blue-200 text-blue-800";
};

function openInMaps(lat: number, lng: number) {
  let url: string;
  if (Platform.OS === "ios") {
    url = `maps://?ll=${lat},${lng}`;
  } else if (Platform.OS === "android") {
    url = `geo:${lat},${lng}?q=${lat},${lng}`;
  } else {
    url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`;
  }
  Linking.openURL(url).catch(() => {
    Linking.openURL(
      `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
    );
  });
}

// PDF Generator function: groups images by step, adds titles
async function generatePDFfromImages({
  uploads,
  claimSteps,
}: {
  uploads: Upload[];
  claimSteps: ClaimStep[];
}) {
  try {
    const uploadsByStep: Record<string, Upload[]> = {};
    for (const up of uploads) {
      if (!uploadsByStep[up.step_key]) uploadsByStep[up.step_key] = [];
      uploadsByStep[up.step_key].push(up);
    }

    let htmlParts: string[] = [];
    for (const step of claimSteps) {
      const imagesForStep = (uploadsByStep[step.key] || []).filter(
        (up) => up.media_type === "image"
      );

      if (imagesForStep.length > 0) {
        // Add step title explicitly - style to highlight
        htmlParts.push(`
          <h2 style="
            font-family: Arial, sans-serif; 
            font-weight: bold; 
            font-size: 24px; 
            color: #222; 
            margin-top: 30px; 
            margin-bottom: 10px;
          ">
            ${step.title}
          </h2>
        `);

        for (const up of imagesForStep) {
          let imgUri = up.media_file;
          // Download images if remote
          if (!imgUri.startsWith("file://")) {
            const url = getMediaUrl(imgUri);
            const fileName = url.split("/").pop()?.split("?")[0] ?? `img_${Math.random()}`;
            const localPath = FileSystem.cacheDirectory + fileName;
            const downloadRes = await FileSystem.downloadAsync(url, localPath);
            imgUri = downloadRes.uri;
          }
          htmlParts.push(`
            <img src="${imgUri}" style="width: 100%; margin-bottom: 25px;" />
          `);
        }
      }
    }

    const html = `
      <html>
        <head>
         <meta charset="utf-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body {font-family: Arial,sans-serif; padding: 10px; margin: 0;}
            h2 {margin: 0;}
            img {display: block;}
          </style>
        </head>
        <body>
          ${htmlParts.join("")}
        </body>
      </html>
    `;

    console.log("Generated PDF HTML content:", html); // <<== Check your console/log this to confirm titles exist

    const { uri } = await Print.printToFileAsync({ html });

    // Ask permission and save
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required.");
      return;
    }

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    alert("✅ PDF saved to Downloads folder.");
  } catch (err) {
    console.error("PDF generation error:", err);
    alert("❌ Failed to generate or save PDF. Please try again.");
  }
}

export default function ReviewClaimFullDetailsScreen() {
  const { war_req_id } = useLocalSearchParams<{ war_req_id: string }>();
  const { from, status } = useLocalSearchParams<{ from?: string; status?: string }>();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<ClaimDetail>({
    queryKey: ["claimDetail", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims/${war_req_id}/`);
      // console.log("Data fetched for claim:", res.data);
      return res.data;

    },
    enabled: !!war_req_id,
  });

  const scrollRef = useRef<ScrollView>(null);
  const [previewMedia, setPreviewMedia] = useState<{
    uri: string;
    type: "image" | "video";
  } | null>(null);

  const [downloading, setDownloading] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Download media function
  const downloadMedia = async (uri: string, type: 'image' | 'video') => {
    try {
      setDownloading(true);
      
      // Request permissions
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Permission to access media library is required to download.');
        return;
      }

      // Get file extension from URI
      const fileName = uri.split('/').pop()?.split('?')[0] || `${type}_${Date.now()}`;
      const localPath = FileSystem.cacheDirectory + fileName;

      // Download the file
      const downloadResult = await FileSystem.downloadAsync(uri, localPath);
      
      // Save to device
      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      await MediaLibrary.createAlbumAsync('Downloads', asset, false);
      
      Alert.alert('Success', `${type === 'image' ? 'Image' : 'Video'} saved to Downloads folder.`);
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  // Share media function
  const shareMedia = async (uri: string) => {
    try {
      setDownloading(true);
      
      if (await Sharing.isAvailableAsync()) {
        let shareUri = uri;
        
        // If it's a remote URL, download it first
        if (uri.startsWith('http')) {
          console.log('Downloading remote file for sharing...');
          const fileName = uri.split('/').pop()?.split('?')[0] || `shared_file_${Date.now()}`;
          const localPath = FileSystem.cacheDirectory + fileName;
          
          const downloadResult = await FileSystem.downloadAsync(uri, localPath);
          shareUri = downloadResult.uri;
          console.log('Downloaded to local path for sharing:', shareUri);
        }
        
        await Sharing.shareAsync(shareUri);
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert('Error', 'Failed to share file. Please try downloading instead.');
    } finally {
      setDownloading(false);
    }
  };

  // Professional Image Viewer with Zoom (Expo Go compatible)
  function EnhancedImagePreview({ uri, onClose }: { uri: string; onClose: () => void }) {
    const images = [{ uri }];

    const HeaderComponent = () => (
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16
      }}>
        <Pressable
          onPress={onClose}
          style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
        >
          <Ionicons name="close" size={24} color="white" />
        </Pressable>
        
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={() => shareMedia(uri)}
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
            disabled={downloading}
          >
            <Ionicons name="share-outline" size={20} color="white" />
          </Pressable>
          
          <Pressable
            onPress={() => downloadMedia(uri, 'image')}
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
            disabled={downloading}
          >
            {downloading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Ionicons name="download-outline" size={20} color="white" />
            )}
          </Pressable>
        </View>
      </View>
    );

    const FooterComponent = () => (
      <View style={{ 
        paddingHorizontal: 16,
        paddingBottom: 50,
        paddingTop: 16
      }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 8 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>
            Pinch to zoom • Double tap to reset • Swipe down to close
          </Text>
        </View>
      </View>
    );

    return (
      <ImageView
        images={images}
        imageIndex={0}
        visible={true}
        onRequestClose={onClose}
        HeaderComponent={HeaderComponent}
        FooterComponent={FooterComponent}
        backgroundColor="black"
        swipeToCloseEnabled={true}
        doubleTapToZoomEnabled={true}
        presentationStyle="fullScreen"
      />
    );
  }

  // Enhanced Video Preview Component with Better Controls
  function EnhancedVideoPreview({ uri, onClose }: { uri: string; onClose: () => void }) {
    const videoRef = useRef<Video>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [videoError, setVideoError] = useState<string | null>(null);
    const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('medium');

    useEffect(() => {
      const timer = setTimeout(() => {
        if (showControls && isPlaying) {
          setShowControls(false);
        }
      }, 5000); // Increased to 5 seconds

      return () => clearTimeout(timer);
    }, [showControls, isPlaying]);

    const togglePlayPause = async () => {
      try {
        if (videoRef.current) {
          if (isPlaying) {
            await videoRef.current.pauseAsync();
          } else {
            await videoRef.current.playAsync();
          }
          setIsPlaying(!isPlaying);
        }
      } catch (error) {
        console.warn('Video play/pause error:', error);
      }
    };

    const seekTo = async (seconds: number) => {
      try {
        if (videoRef.current) {
          await videoRef.current.setPositionAsync(seconds * 1000);
        }
      } catch (error) {
        console.warn('Video seek error:', error);
      }
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVideoError = (error: any) => {
      console.error('Video error:', error);
      setVideoError('Failed to load video. The file might be corrupted or too large.');
      setVideoLoaded(true);
      setBuffering(false);
    };

    const handleLoad = (status: any) => {
      setVideoLoaded(true);
      setBuffering(false);
      if (status.durationMillis) {
        setDuration(status.durationMillis / 1000);
      }
    };

    const handlePlaybackStatusUpdate = (status: any) => {
      if (status.isLoaded) {
        setPosition(status.positionMillis / 1000);
        setBuffering(status.isBuffering);
        setIsPlaying(status.isPlaying);
      }
    };

    return (
      <View className="absolute top-0 left-0 right-0 bottom-0 z-50 bg-black items-center justify-center">
        <Pressable
          onPress={() => {
            console.log('Video screen tapped, current showControls:', showControls);
            setShowControls(!showControls);
          }}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 1
          }}
        />

        {/* Loading/Error States */}
        {!videoLoaded && !videoError && (
          <View className="absolute z-10">
            <ActivityIndicator size="large" color="#FAD90E" />
            <Text className="text-white mt-2">Loading video...</Text>
          </View>
        )}

        {videoError && (
          <View className="absolute z-10 bg-red-600/90 p-4 rounded-lg mx-4">
            <Text className="text-white text-center font-bold mb-2">Video Error</Text>
            <Text className="text-white text-center text-sm mb-4">{videoError}</Text>
            <Pressable
              onPress={onClose}
              className="bg-white/20 p-2 rounded-lg"
            >
              <Text className="text-white text-center font-bold">Close</Text>
            </Pressable>
          </View>
        )}

        {/* Video Player */}
        {!videoError && (
          <Video
            ref={videoRef}
            source={{ uri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isPlaying}
            isLooping={false}
            onLoad={handleLoad}
            onError={handleVideoError}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            useNativeControls={false}
          />
        )}

        {/* Buffering Indicator */}
        {buffering && videoLoaded && (
          <View className="absolute">
            <ActivityIndicator size="large" color="#FAD90E" />
            <Text className="text-white mt-2">Buffering...</Text>
          </View>
        )}

        {/* Custom Controls */}
        {showControls && videoLoaded && !videoError && (
          <>
            {/* Top Controls */}
            <View style={{ 
              position: 'absolute', 
              top: 48, 
              left: 16, 
              right: 16, 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              zIndex: 10
            }}>
              <Pressable
                onPress={onClose}
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
              >
                <Ionicons name="close" size={24} color="white" />
              </Pressable>
              
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Pressable
                  onPress={() => shareMedia(uri)}
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
                  disabled={downloading}
                >
                  <Ionicons name="share-outline" size={18} color="white" />
                </Pressable>
                
                <Pressable
                  onPress={() => downloadMedia(uri, 'video')}
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, borderRadius: 50 }}
                  disabled={downloading}
                >
                  {downloading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Ionicons name="download-outline" size={18} color="white" />
                  )}
                </Pressable>
                
                <Pressable
                  onPress={() => setQuality(quality === 'high' ? 'medium' : quality === 'medium' ? 'low' : 'high')}
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 50 }}
                >
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{quality.toUpperCase()}</Text>
                </Pressable>
              </View>
            </View>

            {/* Center Play/Pause Button - Only show when paused */}
            {!isPlaying && (
              <Pressable
                onPress={togglePlayPause}
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  padding: 20, 
                  borderRadius: 50,
                  zIndex: 10
                }}
              >
                <Ionicons 
                  name="play" 
                  size={50} 
                  color="white" 
                />
              </Pressable>
            )}

            {/* Bottom Controls */}
            <View style={{ 
              position: 'absolute', 
              bottom: 48, 
              left: 16, 
              right: 16,
              zIndex: 10
            }}>
              <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 16, borderRadius: 8 }}>
                {/* Progress Bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ color: 'white', fontSize: 12, marginRight: 8 }}>
                    {formatTime(position)}
                  </Text>
                  <View style={{ flex: 1, height: 4, backgroundColor: '#666', borderRadius: 2, marginHorizontal: 8 }}>
                    <View 
                      style={{ 
                        height: 4, 
                        backgroundColor: '#FAD90E', 
                        borderRadius: 2,
                        width: `${duration > 0 ? (position / duration) * 100 : 0}%` 
                      }}
                    />
                  </View>
                  <Text style={{ color: 'white', fontSize: 12, marginLeft: 8 }}>
                    {formatTime(duration)}
                  </Text>
                </View>

                {/* Control Buttons */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
                  <Pressable
                    onPress={() => seekTo(Math.max(0, position - 10))}
                    style={{ padding: 8 }}
                  >
                    <Ionicons name="play-back" size={24} color="white" />
                  </Pressable>
                  
                  <Pressable
                    onPress={togglePlayPause}
                    style={{ padding: 8 }}
                  >
                    <Ionicons 
                      name={isPlaying ? "pause" : "play"} 
                      size={32} 
                      color="white" 
                    />
                  </Pressable>
                  
                  <Pressable
                    onPress={() => seekTo(Math.min(duration, position + 10))}
                    style={{ padding: 8 }}
                  >
                    <Ionicons name="play-forward" size={24} color="white" />
                  </Pressable>
                </View>

                {/* Instructions */}
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12, marginTop: 8, opacity: 0.7 }}>
                  Tap screen to {showControls ? 'hide' : 'show'} controls
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }

  function handleBack() {
    if (from === "review-req-warranty-status" && status) {
      router.replace({
        pathname: "/(adminDashboard)/review-req-warranty-status",
        params: { status },
      });
    } else {
      router.back();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (previewMedia) {
          setPreviewMedia(null);
          return true;
        }
        handleBack();
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [from, status, previewMedia])
  );

  const checklistAnswers = data?.checklist_answers || {};

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.setNativeProps({
        scrollEnabled: previewMedia === null,
      });
    }
  }, [previewMedia]);

  function DeviceLocationCard() {
    if (!data?.device_latitude || !data?.device_longitude) {
      return (
        <View className="mb-5 bg-white border border-gray-200 rounded-xl shadow-md p-4 items-center">
          <Text className="text-gray-400">No device location data available.</Text>
        </View>
      );
    }
    const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=450&height=200&center=lonlat:${data.device_longitude},${data.device_latitude}&zoom=15&marker=lonlat:${data.device_longitude},${data.device_latitude};type:material;color:%23ff2800;size:large&apiKey=1caddae337db490bae0c4e3464d5ac35`;

    return (
      <View className="mb-5 bg-white border border-gray-200 rounded-xl shadow-md p-4">
        <Image
          source={{ uri: staticMapUrl }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 10,
            marginBottom: 12,
            backgroundColor: "#eee",
          }}
          resizeMode="cover"
        />
        <Pressable
          onPress={() => openInMaps(data.device_latitude!, data.device_longitude!)}
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 7,
            backgroundColor: "#e0edff",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="open-outline" size={18} color="#2563eb" />
          <Text
            style={{
              marginLeft: 7,
              color: "#2563eb",
              fontWeight: "700",
              textDecorationLine: "underline",
            }}
          >
            Open in Maps
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  if (isError || !data)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{String(error) || "No data"}</Text>
      </View>
    );

  const claimSteps: ClaimStep[] = importedClaimSteps;

  const pillBg = getStatusBgClass(normalizeStatus(data.status));

  return (
    <>
      <ScrollView
        ref={scrollRef}
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ padding: 18 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <MaterialIcons name="info" size={20} color="#2563eb" />
          <Text className="ml-2 text-xl font-bold text-blue-700">Warranty Request Details</Text>
        </View>

        {/* Info Card */}
        <View className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-5 mb-6">
          <Text className="text-lg font-extrabold mb-1">Request ID#{data.war_req_id}</Text>

          {/* <Text className="mb-1">
            Status:
            <Text
              className={`ml-2 px-2 py-1 text-white rounded-full text-xs font-bold ${data.status === "Approved"
                ? "bg-green-600"
                : data.status === "Rejected"
                  ? "bg-red-600"
                  : "bg-blue-600"
                }`}
            >
              {data.status}
            </Text>
          </Text> */}
          {/* <Text>
            Status:
            <Text
              className={`ml-2 px-2 py-1 rounded-full text-xs font-bold text-white ${pillBg}`}
            >
              {data.status}
            </Text>
          </Text> */}

          <Text className="mb-0.5">
            Status:{" "}
            <Text
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                data.status
              )}`}
            >
              {data.status.toUpperCase()}
            </Text>
          </Text>




          <Text>
            Project ID: <Text className="font-bold">{data.project_id}</Text>
          </Text>
          <Text>
            Client ID: <Text className="font-bold">{data.client_id}</Text>
          </Text>
          <Text>
            Company: <Text className="font-bold">{data.company_name}</Text>
          </Text>

          {/* <Text>
            Order ID: <Text className="font-bold">{data.order_id}</Text>
          </Text> */}
          <Text>
            Kit ID: <Text className="font-bold">{data.kit_id}</Text>
          </Text>
          <Text>
            Kit #: <Text className="font-bold">{data.kit_number}</Text>
          </Text>
          {/* <Text>
            Project ID: <Text className="font-bold">{data.project_id}</Text>
          </Text> */}
          <Text>
            Purchase Date:{" "}
            <Text className="font-bold">
              {data.purchase_date ? new Date(data.purchase_date).toLocaleDateString() : "--"}
            </Text>
          </Text>
          <Text>
            Requested: <Text className="font-bold">{dayjs(data.created_at).fromNow()}</Text>
          </Text>
          <Text>
            Updated: <Text className="font-bold">{dayjs(data.updated_at).fromNow()}</Text>
          </Text>
          {data.review_comment && (
            <Text>
              Admin Comment: <Text className="font-bold text-blue-700">{data.review_comment}</Text>
            </Text>
          )}
        </View>

        {/* Device Location Section */}
        <View className="flex-row items-center mb-2">
          <Feather name="map-pin" size={18} color="green" />
          <Text className="ml-2 text-base font-semibold text-gray-700">Installation Location</Text>
        </View>
        <DeviceLocationCard />

        {/* Checklist */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Feather name="check-square" size={18} color="#2563eb" />
            <Text className="ml-2 text-base font-semibold">Checklist Submitted by User</Text>
          </View>
          <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {checklistItems.map((item, index) => {
              const isChecked = checklistAnswers[item.key];
              return (
                <View
                  key={item.key}
                  className={`flex-row justify-between items-center px-3 py-2 border-b border-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <Text className="flex-1 text-[15px] pr-2">{item.question}</Text>
                  <Text
                    className={`w-6 text-right font-bold text-lg ${isChecked ? "text-green-700" : "text-red-600"
                      }`}
                  >
                    {isChecked ? "✓" : "✗"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Uploads */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Feather name="upload-cloud" size={18} color="#2563eb" />
            <Text className="ml-2 text-base font-semibold">Uploads By Step</Text>
          </View>
          {claimSteps.map((step) => {
            const uploads = data.uploads?.filter((up: Upload) => up.step_key === step.key) || [];
            if (uploads.length === 0) return null;
            return (
              <View key={step.key} className="mb-5">
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-lg">{step.title}</Text>
                  <Text
                    className={`ml-2 font-bold ${uploads.length > 0 ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {uploads.length > 0 ? "✓ Done" : "✗ Missing"}
                  </Text>
                </View>
                <Text className="mb-1 text-xs text-gray-600">{step.instruction}</Text>
                <View className="flex-row flex-wrap">
                  {uploads.map((up: Upload) => {
                    const uri = getMediaUrl(up.media_file);
                    return (
                      <Pressable
                        key={up.id}
                        onPress={() => {
                          setMediaLoading(true);
                          setMediaError(null);
                          setPreviewMedia({ uri, type: up.media_type });
                        }}
                        className="relative"
                      >
                        {up.media_type === "image" ? (
                          <View className="relative">
                            <Image
                              source={{ uri }}
                              className="w-32 h-32 rounded-lg m-1 bg-gray-100"
                              resizeMode="cover"
                              onLoadStart={() => setMediaLoading(true)}
                              onLoad={() => setMediaLoading(false)}
                              onError={() => {
                                setMediaLoading(false);
                                setMediaError('Failed to load image');
                              }}
                            />
                            {/* Image overlay icon */}
                            <View className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                              <Ionicons name="image" size={12} color="white" />
                            </View>
                          </View>
                        ) : (
                          <View className="relative">
                            <Video
                              source={{ uri }}
                              style={{ width: 130, height: 130, margin: 4, borderRadius: 12 }}
                              useNativeControls={false}
                              isLooping={false}
                              isMuted={true}
                              resizeMode={ResizeMode.COVER}
                              onLoad={() => setMediaLoading(false)}
                              onError={() => {
                                setMediaLoading(false);
                                setMediaError('Failed to load video');
                              }}
                            />
                            {/* Video overlay icon */}
                            <View className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                              <Ionicons name="play" size={12} color="white" />
                            </View>
                            {/* Video duration overlay (if available) */}
                            <View className="absolute bottom-2 right-2 bg-black/70 rounded px-1">
                              <Text className="text-white text-xs">VIDEO</Text>
                            </View>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {/* The download button is removed as requested */}
          {/* You can add PDF generation back by adding your own UI / button that calls generatePDFfromImages */}

          {/* PDF View Button */}
          {data?.pdf_url && (
            <Pressable
              onPress={() => Linking.openURL(getMediaUrl(data.pdf_url!))}
              className="bg-yellow-400 px-4 py-3 rounded-lg flex-row items-center justify-center mt-4"
            >
              <Ionicons name="document-text-outline" size={18} color="black" />
              <Text className="ml-2 font-bold text-black">View Submitted PDF</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Enhanced Fullscreen Preview */}
      {previewMedia && (
        previewMedia.type === "image" ? (
          <EnhancedImagePreview 
            uri={previewMedia.uri} 
            onClose={() => setPreviewMedia(null)} 
          />
        ) : (
          <EnhancedVideoPreview 
            uri={previewMedia.uri} 
            onClose={() => setPreviewMedia(null)} 
          />
        )
      )}
    </>
  );
}