// utils/mediaUtils.ts
import * as ImageManipulator from "expo-image-manipulator";

export async function compressImage(imageUri: string): Promise<string> {
    try {
        console.log('🗜️ Compressing image for warranty claim...');
        const manipResult = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 1280, height: 720 } }], // Reduced resolution for smaller files
            { 
                compress: 0.5, // More aggressive compression to reduce file size
                format: ImageManipulator.SaveFormat.JPEG 
            }
        );
        console.log('✅ Image compressed successfully');
        return manipResult.uri;
    } catch (err) {
        console.warn('⚠️ Image compression failed, using original:', err);
        return imageUri;
    }
}

// Get actual file size
export async function getFileSize(uri: string): Promise<number> {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        console.log(`📏 File size for ${uri.split('/').pop()}: ${formatFileSize(blob.size)}`);
        return blob.size;
    } catch (error) {
        console.warn('Could not get file size:', error);
        return 0;
    }
}

// Calculate total size of all media files
export async function calculateTotalMediaSize(media: { [k: string]: { image?: string; video?: string } }): Promise<{
    totalSize: number;
    fileCount: number;
    breakdown: { stepKey: string; stepTitle: string; imageSize: number; videoSize: number; stepTotal: number }[];
}> {
    let totalSize = 0;
    let fileCount = 0;
    const breakdown: { stepKey: string; stepTitle: string; imageSize: number; videoSize: number; stepTotal: number }[] = [];

    for (const [stepKey, mediaObj] of Object.entries(media)) {
        let imageSize = 0;
        let videoSize = 0;

        if (mediaObj.image) {
            imageSize = await getFileSize(mediaObj.image);
            if (imageSize > 0) fileCount++;
        }

        if (mediaObj.video) {
            videoSize = await getFileSize(mediaObj.video);
            if (videoSize > 0) fileCount++;
        }

        const stepTotal = imageSize + videoSize;
        if (stepTotal > 0) {
            breakdown.push({
                stepKey,
                stepTitle: stepKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                imageSize,
                videoSize,
                stepTotal
            });
        }

        totalSize += stepTotal;
    }

    return { totalSize, fileCount, breakdown };
}

// Format file size for display
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
