// utils/mediaUtils.ts
import * as ImageManipulator from "expo-image-manipulator";

export async function compressImage(imageUri: string): Promise<string> {
    try {
        console.log('🗜️ Compressing image while preserving original dimensions...');
        
        // First, just compress without any resizing to preserve exact dimensions
        const manipResult = await ImageManipulator.manipulateAsync(
            imageUri,
            [], // No manipulations = keep original dimensions
            { 
                compress: 0.5, // Compress to reduce file size while maintaining quality
                format: ImageManipulator.SaveFormat.JPEG 
            }
        );
        
        console.log('✅ Image compressed successfully - original dimensions preserved');
        return manipResult.uri;
    } catch (err) {
        console.warn('⚠️ Image compression failed, using original:', err);
        return imageUri;
    }
}

// Alternative compression function that can resize extremely large images if needed
export async function compressImageWithOptionalResize(imageUri: string, maxFileSize: number = 5 * 1024 * 1024): Promise<string> {
    try {
        console.log('🗜️ Compressing image with optional resize if needed...');
        
        // First try compression without resizing
        let manipResult = await ImageManipulator.manipulateAsync(
            imageUri,
            [],
            { 
                compress: 0.7,
                format: ImageManipulator.SaveFormat.JPEG 
            }
        );
        
        // Check file size after compression
        const compressedSize = await getFileSize(manipResult.uri);
        console.log(`📏 Compressed size: ${formatFileSize(compressedSize)}`);
        
        // If still too large and over 4K resolution, then resize
        if (compressedSize > maxFileSize) {
            console.log('📐 File still large, trying with resize...');
            
            manipResult = await ImageManipulator.manipulateAsync(
                imageUri,
                [{ resize: { width: 2048, height: 2048 } }], // Max 2K if absolutely needed
                { 
                    compress: 0.6,
                    format: ImageManipulator.SaveFormat.JPEG 
                }
            );
            
            const finalSize = await getFileSize(manipResult.uri);
            console.log(`📏 Final size after resize: ${formatFileSize(finalSize)}`);
        }
        
        console.log('✅ Image compression completed');
        return manipResult.uri;
    } catch (err) {
        console.warn('⚠️ Image compression with resize failed, using original:', err);
        return imageUri;
    }
}

// Cache for file sizes to prevent repeated calculations
const fileSizeCache = new Map<string, number>();

// Helper function to detect file type from URI
function isVideoFile(uri: string): boolean {
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.m4v', '.3gp', '.webm'];
    const lowerUri = uri.toLowerCase();
    return videoExtensions.some(ext => lowerUri.includes(ext)) || lowerUri.includes('video');
}

// Helper function to check if URI is a local file
function isLocalFile(uri: string): boolean {
    return uri.startsWith('file://') || uri.startsWith('content://') || uri.startsWith('ph://');
}

// Get actual file size using FileSystem for better reliability
export async function getFileSize(uri: string): Promise<number> {
    // Check cache first
    if (fileSizeCache.has(uri)) {
        const cachedSize = fileSizeCache.get(uri)!;
        console.log(`📋 Using cached size for ${uri.split('/').pop()}: ${formatFileSize(cachedSize)}`);
        return cachedSize;
    }
    try {
        // Try FileSystem.getInfoAsync first (more reliable for local files)
        const FileSystem = await import('expo-file-system');
        
        console.log(`🔍 Attempting to get file info for: ${uri}`);
        const fileInfo = await FileSystem.getInfoAsync(uri);
        
        if (fileInfo.exists && 'size' in fileInfo && fileInfo.size !== undefined) {
            const size = fileInfo.size;
            console.log(`📏 FileSystem success - File size for ${uri.split('/').pop()}: ${formatFileSize(size)}`);
            fileSizeCache.set(uri, size); // Cache the result
            return size;
        }
        
        console.log(`⚠️ FileSystem method failed or returned no size. File exists: ${fileInfo.exists}`);
        
        // For mobile file URIs that might not work with fetch, try a different approach
        if (isLocalFile(uri)) {
            console.log('📏 Local file detected, trying alternative approach...');
            
            // Don't try to read large video files as base64 (memory intensive)
            if (isVideoFile(uri)) {
                console.log('📏 Video file detected, using conservative estimate...');
                const estimatedSize = 25 * 1024 * 1024; // 25MB estimate for videos
                fileSizeCache.set(uri, estimatedSize);
                return estimatedSize;
            }
            
            // Try reading the file to get its size (only for smaller files like images)
            try {
                const content = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                const sizeFromBase64 = Math.ceil(content.length * 0.75); // Approximate size from base64
                console.log(`📏 Base64 method - File size for ${uri.split('/').pop()}: ${formatFileSize(sizeFromBase64)}`);
                fileSizeCache.set(uri, sizeFromBase64);
                return sizeFromBase64;
            } catch (readError) {
                console.warn('📏 Base64 read failed:', readError);
                // Fall through to network methods
            }
        }
        
        // Fallback to fetch method for remote URLs
        console.log('📏 Trying fetch method as fallback...');
        const response = await fetch(uri, { method: 'HEAD' }); // Use HEAD to avoid downloading full file
        const contentLength = response.headers.get('content-length');
        
        if (contentLength) {
            const size = parseInt(contentLength);
            console.log(`📏 Fetch HEAD success - File size for ${uri.split('/').pop()}: ${formatFileSize(size)}`);
            fileSizeCache.set(uri, size);
            return size;
        }
        
        // Last resort - actually fetch the file
        console.log('📏 Trying full fetch as last resort...');
        const fullResponse = await fetch(uri);
        const blob = await fullResponse.blob();
        console.log(`📏 Full fetch success - File size for ${uri.split('/').pop()}: ${formatFileSize(blob.size)}`);
        fileSizeCache.set(uri, blob.size); // Cache the result
        return blob.size;
        
    } catch (error) {
        console.warn('Could not get file size:', error);
        
        // Return estimated size based on file type as last resort
        let estimatedSize;
        if (isVideoFile(uri)) {
            console.log('📏 Using estimated video size: 20MB (fallback)');
            estimatedSize = 20 * 1024 * 1024; // Estimate 20MB for videos (more conservative)
        } else {
            console.log('📏 Using estimated image size: 1MB (fallback)');
            estimatedSize = 1 * 1024 * 1024; // Estimate 1MB for images (compressed)
        }
        fileSizeCache.set(uri, estimatedSize); // Cache the estimated size
        return estimatedSize;
    }
}

// Clear the file size cache (useful when files are deleted)
export function clearFileSizeCache(uri?: string): void {
    if (uri) {
        fileSizeCache.delete(uri);
        console.log(`🗑️ Cleared cache for ${uri.split('/').pop()}`);
    } else {
        fileSizeCache.clear();
        console.log('🗑️ Cleared entire file size cache');
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
