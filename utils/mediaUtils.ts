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

// Get actual file size using multiple methods
export async function getFileSize(uri: string): Promise<number> {
    // Check cache first
    if (fileSizeCache.has(uri)) {
        const cachedSize = fileSizeCache.get(uri)!;
        console.log(`📋 Using cached size for ${uri.split('/').pop()}: ${formatFileSize(cachedSize)}`);
        return cachedSize;
    }

    console.log(`🔍 Getting file size for: ${uri}`);

    try {
        // Method 1: Try fetch blob method (works with local file:// URIs in Expo SDK 54)
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            if (blob.size > 0) {
                console.log(`✅ File size detected: ${formatFileSize(blob.size)}`);
                fileSizeCache.set(uri, blob.size);
                return blob.size;
            }
        } catch (fetchError) {
            console.log(`❌ Fetch blob method failed:`, fetchError);
        }

        // Method 2: Try new Expo SDK 54 File API as fallback
        try {
            const { File } = await import('expo-file-system');
            const file = new File(uri);
            const exists = await file.exists();

            if (exists) {
                const size = await file.size();
                if (size > 0) {
                    console.log(`✅ File API size detected: ${formatFileSize(size)}`);
                    fileSizeCache.set(uri, size);
                    return size;
                }
            }
        } catch (newApiError) {
            // File API not available or failed
        }

        // Method 3: Alternative - try XMLHttpRequest for local files
        if (!isVideoFile(uri)) {
            try {
                console.log(`📖 Trying XMLHttpRequest method for image...`);

                const size = await new Promise<number>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('HEAD', uri, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 || xhr.status === 0) { // 0 for local files
                                const contentLength = xhr.getResponseHeader('Content-Length');
                                if (contentLength) {
                                    resolve(parseInt(contentLength));
                                } else {
                                    // If no Content-Length, try to get the file via GET and measure
                                    const getXhr = new XMLHttpRequest();
                                    getXhr.open('GET', uri, true);
                                    getXhr.responseType = 'blob';
                                    getXhr.onload = function() {
                                        if (getXhr.response) {
                                            resolve(getXhr.response.size);
                                        } else {
                                            reject(new Error('No response blob'));
                                        }
                                    };
                                    getXhr.onerror = () => reject(new Error('GET request failed'));
                                    getXhr.send();
                                }
                            } else {
                                reject(new Error(`HTTP ${xhr.status}`));
                            }
                        }
                    };
                    xhr.onerror = () => reject(new Error('HEAD request failed'));
                    xhr.send();
                });

                if (size > 0) {
                    console.log(`✅ SUCCESS: XMLHttpRequest method gave us size: ${formatFileSize(size)}`);
                    fileSizeCache.set(uri, size);
                    return size;
                }
            } catch (xhrError) {
                console.log(`❌ XMLHttpRequest method failed:`, xhrError);
            }
        }

        // Method 3: Try fetch for remote URLs
        if (uri.startsWith('http://') || uri.startsWith('https://')) {
            try {
                console.log(`🌐 Trying fetch for remote URL...`);
                const response = await fetch(uri, { method: 'HEAD' });
                const contentLength = response.headers.get('content-length');

                if (contentLength) {
                    const size = parseInt(contentLength);
                    console.log(`✅ SUCCESS: Fetch HEAD method gave us size: ${formatFileSize(size)}`);
                    fileSizeCache.set(uri, size);
                    return size;
                }
            } catch (fetchError) {
                console.log(`❌ Fetch HEAD failed:`, fetchError);
            }
        }

        // If all else fails, return a reasonable estimate based on file type
        console.warn(`⚠️ All size detection methods failed for ${uri.split('/').pop()}`);
        console.warn(`URI details: starts with 'file://' = ${uri.startsWith('file://')}, starts with 'content://' = ${uri.startsWith('content://')}`);

        let fallbackSize;
        if (isVideoFile(uri)) {
            fallbackSize = 25 * 1024 * 1024; // 25MB for videos
            console.log(`📏 Using video fallback: ${formatFileSize(fallbackSize)}`);
        } else {
            fallbackSize = 800 * 1024; // 800KB for images (more conservative)
            console.log(`📏 Using image fallback: ${formatFileSize(fallbackSize)}`);
        }

        fileSizeCache.set(uri, fallbackSize);
        return fallbackSize;

    } catch (error) {
        console.error(`💥 Critical error in getFileSize:`, error);

        // Very conservative fallback
        const emergencySize = isVideoFile(uri) ? 20 * 1024 * 1024 : 500 * 1024;
        console.log(`🚨 Emergency fallback: ${formatFileSize(emergencySize)}`);
        fileSizeCache.set(uri, emergencySize);
        return emergencySize;
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

// Format file size for display with better precision
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);

    // Use more precise formatting for different size ranges
    let decimals = 2;
    if (i === 0) { // Bytes
        decimals = 0;
    } else if (i === 1 && value < 10) { // KB less than 10
        decimals = 1;
    } else if (i === 2 && value < 10) { // MB less than 10
        decimals = 1;
    } else if (value >= 100) { // Large values
        decimals = 0;
    }

    const formattedValue = value.toFixed(decimals);
    return `${formattedValue} ${sizes[i]}`;
}
