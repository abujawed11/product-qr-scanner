// utils/locationUtils.ts
import * as Location from "expo-location";

export async function getLocationWithPermission(): Promise<
    | { latitude: number; longitude: number }
    | { error: string }
> {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return { error: "Location permission denied" };
        }
        const loc = await Location.getCurrentPositionAsync({});
        return {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        };
    } catch {
        return { error: "Failed to get device location" };
    }
}
