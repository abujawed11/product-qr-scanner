// components/ReviewStep.tsx
import { checklistItems, claimSteps } from "@/app/(main)/warranty/claim-steps";
import { StepMedia } from "@/types/StepMedia";
import { calculateTotalMediaSize, formatFileSize } from "@/utils/mediaUtils";
import { ResizeMode, Video } from "expo-av";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export type ReviewStepProps = {
    media: { [k: string]: StepMedia };
    checklistAnswers: { [k: string]: boolean };
    accepted: boolean;
    setAccepted: (v: boolean) => void;
    location: { latitude: number; longitude: number } | null;
    locationLoading: boolean;
    locError: string | null;
    onGrantLocation: () => void;
    onSubmit: () => void;
};

export function ReviewStep({
    media,
    checklistAnswers,
    accepted,
    setAccepted,
    location,
    locationLoading,
    locError,
    onGrantLocation,
    onSubmit
}: ReviewStepProps) {
    const [totalSizeInfo, setTotalSizeInfo] = useState<{
        totalSize: number;
        fileCount: number;
        breakdown: { stepKey: string; stepTitle: string; imageSize: number; videoSize: number; stepTotal: number }[];
    }>({ totalSize: 0, fileCount: 0, breakdown: [] });
    const [calculatingSize, setCalculatingSize] = useState<boolean>(true);

    // Calculate total size when media changes
    useEffect(() => {
        const calculateTotalSize = async () => {
            setCalculatingSize(true);
            try {
                console.log('🔄 Calculating total media size for review...');
                const sizeInfo = await calculateTotalMediaSize(media);
                setTotalSizeInfo(sizeInfo);
                console.log(`✅ Total calculated: ${sizeInfo.totalSize} bytes, ${sizeInfo.fileCount} files`);
            } catch (error) {
                console.warn('Error calculating total media size:', error);
                // Set fallback values
                setTotalSizeInfo({ 
                    totalSize: 0, 
                    fileCount: Object.values(media).filter(m => m.image || m.video).length, 
                    breakdown: [] 
                });
            } finally {
                setCalculatingSize(false);
            }
        };

        // Add small delay to ensure all sizes are properly calculated
        const timeoutId = setTimeout(calculateTotalSize, 1000);
        
        return () => clearTimeout(timeoutId);
    }, [media]);

    const canSubmit = accepted && !!location && !locationLoading;
    const isApproaching200MB = totalSizeInfo.totalSize > 150 * 1024 * 1024; // 150MB warning
    const isOver200MB = totalSizeInfo.totalSize > 200 * 1024 * 1024;

    return (
        <View style={{ flex: 1, backgroundColor: "#000", padding: 24 }}>
            <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 22, marginBottom: 16 }}>
                Review & Submit
            </Text>

            {/* Total Size Summary */}
            <View style={{ 
                backgroundColor: isOver200MB ? "#7F1D1D" : isApproaching200MB ? "#78350F" : "#065F46", 
                padding: 16, 
                borderRadius: 8, 
                marginBottom: 16,
                borderWidth: 2,
                borderColor: isOver200MB ? "#DC2626" : isApproaching200MB ? "#F59E0B" : "#10B981"
            }}>
                <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
                    📊 Upload Summary
                </Text>
                
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                        Total Size:
                    </Text>
                    <Text style={{ 
                        color: isOver200MB ? "#FCA5A5" : isApproaching200MB ? "#FCD34D" : "#6EE7B7",
                        fontWeight: "bold" 
                    }}>
                        {calculatingSize ? "Calculating..." : formatFileSize(totalSizeInfo.totalSize)}
                    </Text>
                </View>
                
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "white" }}>Total Files:</Text>
                    <Text style={{ color: "white" }}>{totalSizeInfo.fileCount}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text style={{ color: "white" }}>Server Limit:</Text>
                    <Text style={{ color: "white" }}>200 MB</Text>
                </View>

                {isOver200MB && (
                    <Text style={{ color: "#FCA5A5", fontSize: 12, fontStyle: "italic", marginTop: 4 }}>
                        ❌ Over 200MB limit! Remove some large videos before submitting.
                    </Text>
                )}
                
                {isApproaching200MB && !isOver200MB && (
                    <Text style={{ color: "#FCD34D", fontSize: 12, fontStyle: "italic", marginTop: 4 }}>
                        ⚠️ Approaching 200MB limit. Consider removing large files if upload fails.
                    </Text>
                )}

                {!isApproaching200MB && (
                    <Text style={{ color: "#6EE7B7", fontSize: 12, fontStyle: "italic", marginTop: 4 }}>
                        ✅ Size looks good for upload!
                    </Text>
                )}
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                {claimSteps.map(s => (
                    <View key={s.key} style={{ marginBottom: 10 }}>
                        <Text style={{ color: "#FAD90E" }}>{s.title}</Text>
                        {typeof media[s.key]?.image === "string" && (
                            <Image
                                source={{ uri: media[s.key]?.image as string }}
                                style={{
                                    height: 100,
                                    borderRadius: 8,
                                    marginVertical: 4
                                }}
                            />
                        )}
                        {typeof media[s.key]?.video === "string" && (
                            <Video
                                source={{ uri: media[s.key]?.video as string }}
                                useNativeControls
                                resizeMode={ResizeMode.CONTAIN}
                                style={{ width: "100%", height: 120, borderRadius: 8, marginVertical: 4 }}
                            />
                        )}
                        {!media[s.key]?.image && !media[s.key]?.video && (
                            <Text style={{ color: "#F87171", marginTop: 4 }}>No media uploaded</Text>
                        )}
                    </View>
                ))}
                <Text style={{ color: "#FAD90E", fontWeight: "bold", fontSize: 18, marginVertical: 6 }}>
                    Checklist Summary
                </Text>
                {checklistItems.map(item => (
                    <Text
                        key={item.key}
                        style={{
                            marginBottom: 3,
                            color: checklistAnswers[item.key] === true ? "#6EE7B7" : "#F87171",
                            fontWeight: "bold",
                            fontSize: 15
                        }}
                    >
                        {item.question}: {checklistAnswers[item.key] === true ? "YES" : "NO"}
                    </Text>
                ))}

                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 18 }}>
                    <Checkbox
                        value={accepted}
                        onValueChange={setAccepted}
                        color={accepted ? "#FAD90E" : "#888"}
                        style={{ marginRight: 10 }}
                    />
                    <Text style={{ color: "#FFF", flexShrink: 1 }}>
                        I confirm that all the details and documentation provided are correct.
                    </Text>
                </View>

                <View style={{ alignItems: "center", marginVertical: 18 }}>
                    <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>Location:</Text>
                    {locationLoading && (
                        <Text style={{ color: "#FAD90E", marginTop: 4, fontWeight: "bold" }}>Loading location…</Text>
                    )}
                    {!locationLoading && location && (
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                            {location.latitude}, {location.longitude}
                        </Text>
                    )}
                    {((locError || !location) && !locationLoading) && (
                        <>
                            <Text style={{ color: "#F87171", textAlign: "center", marginTop: 4, fontWeight: "bold" }}>
                                {locError || "Location not available"}
                            </Text>
                            <Text style={{ color: "#FDE68A", marginTop: 4, textAlign: "center" }}>
                                Location permission is required to submit warranty request!
                            </Text>
                            <TouchableOpacity
                                onPress={onGrantLocation}
                                style={{ backgroundColor: "#FAD90E", padding: 10, borderRadius: 8, marginTop: 12 }}
                            >
                                <Text style={{ color: "#000", fontWeight: "bold" }}>Grant Permission</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{
                    padding: 15,
                    borderRadius: 12,
                    backgroundColor: canSubmit ? "#FAD90E" : "#6B7280",
                    marginTop: 14
                }}
                onPress={onSubmit}
                disabled={!canSubmit}
            >
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}
