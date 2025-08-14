// export default WarrantyStatusPage;

import api from '@/utils/api';
import { doc_url } from '@/utils/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type WarrantyRouteParam = {
  params: {
    war_req_id: string;
  };
};

type WarrantyClaim = {
  war_req_id: string;
  status: string;
  status_updated_at: string;
  project_id: string;
  order: { id: number; order_number: string } | null;
  order_id: string;
  kit_number: string;
  kit_id: string;
  purchase_date: string | null;
  company_name: string;
  contact_name: string;
  contact_phone: string;
  email: string;
  accepted_statement: boolean;
  reviewed_by?: { username: string } | null;
  review_comment?: string | null;
  checklist_answers?: Record<string, unknown>;
  pdf_url?: string | null;
  created_at: string;
};

// Build absolute media URL
// function getMediaUrl(media_file: string): string {
//   if (!media_file) return '';
//   if (media_file.startsWith('http')) return media_file;
//   if (media_file.startsWith('/media/')) return doc_url + media_file;
//   return doc_url + media_file.replace("/^/ +/", '');
// }

function getMediaUrl(media_file: string): string {
  if (media_file.startsWith("http")) return media_file;
  if (media_file.startsWith("/media/")) return doc_url + media_file;
  return doc_url + media_file.replace(/^\/+/, "");
}

// Status badge meta
const statusBadge = (status: string) => {
  const lower = status.toLowerCase();
  if (lower.includes('approved')) return { color: '#22c55e', icon: '✅', label: 'Approved' };
  if (lower.includes('pending')) return { color: '#FFD600', icon: '⏳', label: 'Pending Review' };
  if (lower.includes('rejected')) return { color: '#ef4444', icon: '⛔', label: 'Rejected' };
  return { color: '#64748b', icon: 'ℹ️', label: status };
};

// const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
//   const res = await api.get<WarrantyClaim>(/warranty-claims-status-byid/${ war_req_id } /);
//   return res.data;
// };

const fetchWarrantyClaim = async (war_req_id: string): Promise<WarrantyClaim> => {
  const res = await api.get<WarrantyClaim>(`/warranty-claims-status-byid/${war_req_id}/`);
  return res.data;
};
const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <View style={{ flexDirection: 'row', marginBottom: 6 }}>
    <Text style={{ color: '#222', fontWeight: 'bold', width: 140 }}>{label}</Text>
    <Text style={{ color: '#444', flex: 1 }}>{value}</Text>
  </View>
);

const SectionCard: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <View className="bg-white rounded-xl shadow-md p-5 mb-5" style={{ elevation: 2 }}>
    {title && <Text style={{ color: '#FAD90E', fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>{title}</Text>}
    {children}
  </View>
);

const WarrantyStatusPage: React.FC = () => {
  const route = useRoute<RouteProp<WarrantyRouteParam, 'params'>>();
  const war_req_id = (route.params as { war_req_id: string } | undefined)?.war_req_id;

  // Declare hooks unconditionally and in fixed order
  const { data, isLoading, isError, refetch, isRefetching } = useQuery<WarrantyClaim, Error>({
    queryKey: ['warrantyStatusById', war_req_id],
    // Do NOT throw here; rely on enabled flag
    queryFn: () => fetchWarrantyClaim(war_req_id as string),
    enabled: !!war_req_id,
    retry: 1,
  });

  React.useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Warranty request not found or network error.');
    }
  }, [isError]);

  const onRefresh = React.useCallback(() => {
    void refetch();
  }, [refetch]);

  // Define callbacks before any returns so hook order never changes
  const handleOpenPdf = React.useCallback(() => {
    if (!data?.pdf_url) return;
    const url = getMediaUrl(data.pdf_url);
    if (!url) return;
    Linking.openURL(url).catch(() => {
      Alert.alert('Unable to open PDF', 'Please try again later.');
    });
  }, [data?.pdf_url]);

  // Helper to normalize checklist answers to boolean
  const normalizeToBool = React.useCallback((raw: unknown): boolean => {
    if (typeof raw === 'boolean') return raw;
    if (raw == null) return false;
    const valStr = String(raw).trim().toLowerCase();
    if (['true', 'yes', 'y', '1'].includes(valStr)) return true;
    if (['false', 'no', 'n', '0'].includes(valStr)) return false;
    return Boolean(raw);
  }, []);

  // Now it’s safe to conditionally return UI
  if (isLoading && !isRefetching) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-100">
        <ActivityIndicator size="large" color="black" />
        <Text className="mt-2 text-black">Loading...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View className="flex-1 justify-center items-center bg-yellow-100 px-4">
        <Text className="text-lg text-red-600 text-center">Warranty request not found.</Text>
        <TouchableOpacity className="mt-4 px-5 py-2 bg-black rounded-lg" onPress={onRefresh}>
          <Text className="text-[#FAD90E] font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { color: statusColor, icon: statusIcon, label: statusLabel } = statusBadge(data.status);

  return (
    <ScrollView
      className="bg-yellow-100 flex-1 px-4 pt-0"
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={onRefresh}
          colors={['#000000']}
          progressBackgroundColor="#fef3c7"
        />
      }
    >
      {/* --- HEADER --- */}
      <View style={{ alignItems: 'center', marginTop: 25, marginBottom: 18 }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: '#161616', letterSpacing: 1 }}>
          Warranty Status
        </Text>
        <View
          style={{
            backgroundColor: statusColor,
            borderRadius: 32,
            paddingHorizontal: 18,
            paddingVertical: 6,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#161616', marginRight: 8 }}>{statusIcon}</Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#161616', letterSpacing: 1 }}>{statusLabel}</Text>
        </View>
        <Text style={{ color: '#666', marginTop: 5, fontSize: 13 }}>
          Last updated: {new Date(data.status_updated_at).toLocaleString()}
        </Text>
      </View>

      {/* --- BASIC INFORMATION --- */}
      <SectionCard>
        <InfoRow label="Request ID:" value={data.war_req_id} />
        <InfoRow label="Requested On:" value={new Date(data.created_at).toLocaleString()} />
        {data.accepted_statement && (
          <InfoRow
            label="Accepted Statement:"
            value={<Text style={{ color: '#22c55e', fontWeight: 'bold' }}>Yes</Text>}
          />
        )}
      </SectionCard>

      {/* --- PRODUCT & ORDER --- */}
      <SectionCard title="Product & Order">
        <InfoRow label="Project ID:" value={data.project_id} />
        <InfoRow label="Kit ID / Number:" value={`${data.kit_id} / ${data.kit_number}`} />
        <InfoRow label="Purchase Date:" value={data.purchase_date ?? '-'} />
      </SectionCard>

      {/* --- CONTACT --- */}
      <SectionCard title="Contact">
        <InfoRow label="Company:" value={data.company_name} />
        <InfoRow label="Contact Person:" value={data.contact_name || '-'} />
        <InfoRow label="Phone:" value={data.contact_phone || '-'} />
        <InfoRow label="Email:" value={data.email || '-'} />
      </SectionCard>

      {/* --- REVIEW --- */}
      {(data.reviewed_by?.username || data.review_comment) && (
        <SectionCard title="Review">
          {data.reviewed_by?.username && <InfoRow label="Reviewed By:" value={data.reviewed_by.username} />}
          {data.review_comment && <InfoRow label="Review Comment:" value={data.review_comment} />}
        </SectionCard>
      )}

      {/* --- CHECKLIST (tick/cross) --- */}
      {data.checklist_answers && Object.keys(data.checklist_answers).length > 0 && (
        <SectionCard title="Inspection Checklist">
          {Object.entries(data.checklist_answers).map(([q, raw], idx) => {
            const isChecked = normalizeToBool(raw);
            return (
              <View
                key={q + idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 8,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#eee',
                }}
              >
                <Text style={{ color: '#222', fontWeight: 'bold', flex: 1, paddingRight: 12 }}>{q}</Text>
                <View style={{ minWidth: 28, alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: isChecked ? '#16a34a' : '#ef4444' }}>
                    {isChecked ? '✓' : '✗'}
                  </Text>
                </View>
              </View>
            );
          })}
        </SectionCard>
      )}

      {/* --- PDF --- */}
      {!!data.pdf_url && (
        <TouchableOpacity className="bg-black py-3 px-5 rounded-lg mb-6 mt-1" onPress={handleOpenPdf} style={{ alignSelf: 'center' }}>
          <Text className="text-[#FAD90E] font-semibold text-center">📄 View PDF Report</Text>
        </TouchableOpacity>
      )}

      <View style={{ marginBottom: 25 }} />
    </ScrollView>
  );
};


export default WarrantyStatusPage;