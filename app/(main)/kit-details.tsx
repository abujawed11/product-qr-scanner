import api from '@/utils/api';
import { COLORS } from '@/utils/color';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, ScrollView, Text, View } from 'react-native';

export default function KitDetailsScreen() {
    const { scan_id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState('');


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                router.replace('/(main)/dashboard');
                return true;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await api.get(`/kit-scan-details/${scan_id}/`);
                setData(res.data);
            } catch (err: any) {
                console.error(err);
                setError('Failed to fetch kit details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [scan_id]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
                <ActivityIndicator size="large" color={COLORS.text} />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background, padding: 16 }}>
                <Text style={{ color: COLORS.text, fontSize: 16, textAlign: 'center' }}>{error || 'No data found.'}</Text>
            </View>
        );
    }

    const { kit_id, prod_unit, warehouse, project_id, kit_no, date, kit } = data;

    return (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Scanned Kit Info</Text>

            <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <Text style={{ color: COLORS.text }}>Kit ID: <Text style={{ fontWeight: 'bold' }}>{kit_id}</Text></Text>
                <Text style={{ color: COLORS.text }}>Production Unit: <Text style={{ fontWeight: 'bold' }}>{prod_unit}</Text></Text>
                <Text style={{ color: COLORS.text }}>Warehouse: <Text style={{ fontWeight: 'bold' }}>{warehouse}</Text></Text>
                <Text style={{ color: COLORS.text }}>Project ID: <Text style={{ fontWeight: 'bold' }}>{project_id}</Text></Text>
                <Text style={{ color: COLORS.text }}>Kit No: <Text style={{ fontWeight: 'bold' }}>{kit_no}</Text></Text>
                <Text style={{ color: COLORS.text }}>Date: <Text style={{ fontWeight: 'bold' }}>{date}</Text></Text>
            </View>

            <Text style={{ color: COLORS.text, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>Kit Details</Text>

            <View style={{ backgroundColor: COLORS.fieldBg, borderRadius: 12, padding: 16 }}>
                <Text style={{ color: COLORS.text }}>Tilt Angle: {kit.tilt_angle}°</Text>
                <Text style={{ color: COLORS.text }}>Clearance: {kit.clearance} mm</Text>
                <Text style={{ color: COLORS.text }}>Configuration: {kit.configuration}</Text>
                <Text style={{ color: COLORS.text }}>No of Panels: {kit.num_panels}</Text>
                <Text style={{ color: COLORS.text }}>Price: ₹{kit.price}</Text>
            </View>
        </ScrollView>
    );
}
