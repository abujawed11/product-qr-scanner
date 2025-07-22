// utils/mediaUtils.ts
import * as ImageManipulator from "expo-image-manipulator";

export async function compressImage(imageUri: string): Promise<string> {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            imageUri,
            [{ resize: { width: 1280 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return manipResult.uri;
    } catch (err) {
        return imageUri;
    }
}
