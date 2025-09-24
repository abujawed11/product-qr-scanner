import api from "@/utils/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert, BackHandler, Keyboard, KeyboardAvoidingView, Platform, ScrollView,
  TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";

// type Status = "pending" | "under_review" | "approved" | "rejected" | "cancelled" | "";
type Status = "under_review" | "approved" | "rejected";

type WarrantyCardDetail = {
  warranty_type: string;
  warranty_duration_months: string;
  warranty_started_at: string;
  expires_at: string;
  coverage_description?: string;
  invoice_no?: string;
  invoice_date?: string;
  // You can add more card fields if needed.
};

type ClaimDetail = {
  war_req_id: string;
  status: Status;
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
  warranty_card?: WarrantyCardDetail;
};

type UpdateClaimPayload = {
  status: Status;
  review_comment: string;
  warranty_type?: string;
  warranty_duration_months?: string;
  warranty_started_at?: string;
  expires_at?: string;
  coverage_description?: string;
  invoice_no?: string;
  invoice_date?: string;
};

const STATUS_DISPLAY: Record<Status, { label: string; color: string }> = {
  // pending: { label: "Pending", color: "#facc15" },
  under_review: { label: "Under Review", color: "#fde047" },
  approved: { label: "Approved", color: "#22c55e" },
  rejected: { label: "Rejected", color: "#ef4444" },
  // cancelled: { label: "Cancelled", color: "#374151" },
  // "": { label: "", color: "#000" }
};
const WARRANTY_TYPE_CHOICES = [
  { label: "Full", value: "full" },
  { label: "Partial", value: "partial" }
  // Add more as needed.
];

// Date input with calendar icon, as required
function WarrantyStartDateInput({
  value, onChange, disabled
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  disabled?: boolean;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  function formatDate(date: Date | null) {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  }
  return (
    <TouchableWithoutFeedback onPress={() => { if (!disabled) setShowDatePicker(true); Keyboard.dismiss(); }}>
      <View pointerEvents="box-only">
        <TextInput
          mode="outlined"
          label="Warranty Start Date *"
          value={formatDate(value)}
          placeholder="YYYY-MM-DD"
          editable={false}
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          right={<TextInput.Icon icon="calendar" onPress={() => { if (!disabled) setShowDatePicker(true); }} />}
        />
        {showDatePicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              if (Platform.OS === "android") setShowDatePicker(false);
              if (selectedDate) { onChange(selectedDate); }
            }}
            maximumDate={new Date(2100, 11, 31)}
            minimumDate={new Date(2000, 0, 1)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

// Invoice Date input with calendar icon
function InvoiceDateInput({
  value, onChange, disabled
}: {
  value: Date | null;
  onChange: (date: Date) => void;
  disabled?: boolean;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  function formatDate(date: Date | null) {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  }
  return (
    <TouchableWithoutFeedback onPress={() => { if (!disabled) setShowDatePicker(true); Keyboard.dismiss(); }}>
      <View pointerEvents="box-only">
        <TextInput
          mode="outlined"
          label="Invoice Date"
          value={formatDate(value)}
          placeholder="YYYY-MM-DD"
          editable={false}
          style={{ marginBottom: 16, backgroundColor: "#fff" }}
          right={<TextInput.Icon icon="calendar" onPress={() => { if (!disabled) setShowDatePicker(true); }} />}
        />
        {showDatePicker && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              if (Platform.OS === "android") setShowDatePicker(false);
              if (selectedDate) { onChange(selectedDate); }
            }}
            maximumDate={new Date(2100, 11, 31)}
            minimumDate={new Date(2000, 0, 1)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function ReviewClaimUpdateScreen() {
  const router = useRouter();
  const { war_req_id, from, status: statusParam } = useLocalSearchParams<{
    war_req_id: string;
    from?: string;
    status?: string;
  }>();
  const queryClient = useQueryClient();

  // --- Fetch claim detail --- //
  const { data, isLoading, isError, error, refetch: refetchDetail } = useQuery<ClaimDetail>({
    queryKey: ["claimDetail", war_req_id],
    queryFn: async () => {
      const res = await api.get(`/warranty-claims/${war_req_id}/`);
      return res.data;
    },
    enabled: !!war_req_id,
  });

  function handleBack() {
    if (from === "review-req-warranty-status" && statusParam) {
      router.replace({
        pathname: "/(adminDashboard)/review-req-warranty-status",
        params: { status: statusParam },
      });
    } else {
      router.back();
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleBack();
        return true;
      };
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => subscription.remove();
    }, [from, statusParam])
  );

  // --- State for form --- //
  const [status, setStatus] = useState<Status>("under_review");
  const [originalStatus, setOriginalStatus] = useState<Status>("under_review");

  const [comment, setComment] = useState(""); // Always blank

  const [loading, setLoading] = useState(false);

  // --- WarrantyCard fields --- //
  const [warrantyType, setWarrantyType] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [coverageDescription, setCoverageDescription] = useState<string>("");
  const [invoiceNo, setInvoiceNo] = useState<string>("");
  const [invoiceDate, setInvoiceDate] = useState<Date | null>(null);

  // Store warranty card "originals" for change detection (edit support)
  const [originalWarrantyType, setOriginalWarrantyType] = useState<string>("");
  const [originalDurationMonths, setOriginalDurationMonths] = useState<string>("");
  const [originalStartDate, setOriginalStartDate] = useState<Date | null>(null);
  const [originalExpiresAt, setOriginalExpiresAt] = useState<string>("");
  const [originalCoverageDescription, setOriginalCoverageDescription] = useState<string>("");
  const [originalInvoiceNo, setOriginalInvoiceNo] = useState<string>("");
  const [originalInvoiceDate, setOriginalInvoiceDate] = useState<Date | null>(null);

  // --- Prefill/edit support ---
  useEffect(() => {
    if (data) {
      setStatus(data.status as Status);
      setOriginalStatus(data.status as Status);

      setComment(""); // always blank as per your requirement

      // Only prefill card fields if card exists
      // console.log(data.warranty_card)
      if (data.warranty_card) {
        setWarrantyType(data.warranty_card.warranty_type ?? "");
        setDurationMonths(data.warranty_card.warranty_duration_months ?? "");
        setStartDate(
          data.warranty_card.warranty_started_at
            ? new Date(data.warranty_card.warranty_started_at)
            : null
        );
        setExpiresAt(data.warranty_card.expires_at ?? "");
        setCoverageDescription(data.warranty_card.coverage_description ?? "");
        setInvoiceNo(data.warranty_card.invoice_no ?? "");
        setInvoiceDate(
          data.warranty_card.invoice_date
            ? new Date(data.warranty_card.invoice_date)
            : null
        );

        // For change detection:
        setOriginalWarrantyType(data.warranty_card.warranty_type ?? "");
        setOriginalDurationMonths(data.warranty_card.warranty_duration_months ?? "");
        setOriginalStartDate(
          data.warranty_card.warranty_started_at
            ? new Date(data.warranty_card.warranty_started_at)
            : null
        );
        setOriginalExpiresAt(data.warranty_card.expires_at ?? "");
        setOriginalCoverageDescription(data.warranty_card.coverage_description ?? "");
        setOriginalInvoiceNo(data.warranty_card.invoice_no ?? "");
        setOriginalInvoiceDate(
          data.warranty_card.invoice_date
            ? new Date(data.warranty_card.invoice_date)
            : null
        );
      } else {
        setWarrantyType("");
        setDurationMonths("");
        setStartDate(null);
        setExpiresAt("");
        setCoverageDescription("");
        setInvoiceNo("");
        setInvoiceDate(null);

        setOriginalWarrantyType("");
        setOriginalDurationMonths("");
        setOriginalStartDate(null);
        setOriginalExpiresAt("");
        setOriginalCoverageDescription("");
        setOriginalInvoiceNo("");
        setOriginalInvoiceDate(null);
      }
    }
  }, [data]);

  // -- Calculate expiresAt whenever startDate or durationMonths changes --
  useEffect(() => {
    if (startDate && durationMonths) {
      const d = new Date(startDate);
      d.setMonth(d.getMonth() + parseInt(durationMonths, 10));
      setExpiresAt(d.toISOString().split("T")[0]);
    } else {
      setExpiresAt("");
    }
  }, [startDate, durationMonths]);

  // --- Card form is shown if status is "approved" ---
  const showCardForm = status === "approved";

  // --- Required for button; all card fields present for approved ---
  const canSubmitWarrantyCard =
    warrantyType && durationMonths && startDate && expiresAt;

  // ---------- Change detection ---------- //
  function hasFormChanged() {
    if (status !== originalStatus) return true;
    if (comment.trim().length > 0) return true;

    if (showCardForm) {
      // Accept change if *any* card field is changed or filled when originally empty
      if (warrantyType !== originalWarrantyType) return true;
      if (durationMonths !== originalDurationMonths) return true;
      if (
        (startDate && (!originalStartDate || startDate.getTime() !== originalStartDate.getTime())) ||
        (!startDate && originalStartDate)
      ) return true;
      if (expiresAt !== originalExpiresAt) return true;
      if ((coverageDescription ?? "") !== (originalCoverageDescription ?? "")) return true;
      if ((invoiceNo ?? "") !== (originalInvoiceNo ?? "")) return true;
      if (
        (invoiceDate && (!originalInvoiceDate || invoiceDate.getTime() !== originalInvoiceDate.getTime())) ||
        (!invoiceDate && originalInvoiceDate)
      ) return true;
    }
    return false;
  }

  // --- PATCH Mutation ---
  const mutation = useMutation<any, any, UpdateClaimPayload>({
    mutationFn: async (values) => {
      setLoading(true);
      const res = await api.patch(`/warranty-claims/${war_req_id}/update/`, values);
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Claim updated.");
      refetchDetail();
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["warrantySummary"] });
      queryClient.invalidateQueries({ queryKey: ["warrantyDashboardCounts"] });
      queryClient.invalidateQueries({ queryKey: ["myScans_savedOrders"] }); // adjust keys as your listing components use
      queryClient.invalidateQueries({ queryKey: ["myScans_claims"] });
      queryClient.invalidateQueries({ queryKey: ["myWarrantyClaims"] });
      queryClient.invalidateQueries({ queryKey: ["myWarrantyCards"] });
      queryClient.invalidateQueries({ queryKey: ["warrantyRequests"] });
      // router.back();
      router.replace("/(adminDashboard)/review-req-dashboard")
    },
    onError: (e: any) => {
      Alert.alert("Error", "Failed to update claim.\n" + (e?.message ?? String(e)));
      setLoading(false);
    }
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator />
        <Text>Loading claim...</Text>
      </View>
    );
  }
  if (isError || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-red-500">Failed to load claim</Text>
        <Text className="text-xs">{String(error)}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            paddingBottom: 40,
            flexGrow: 1,
            paddingTop: 40,
            justifyContent: 'flex-start',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-bold mb-4 text-black">Review & Update Claim</Text>
          <View className="mb-5">
            <Text className="mb-1"><Text className="font-bold">Claim: </Text>{data.war_req_id}</Text>
            <Text className="mb-1"><Text className="font-bold">Company: </Text>{data.company_name}</Text>
            <Text className="mb-1"><Text className="font-bold">Client ID: </Text>{data.client_id}</Text>
            <Text className="mb-1"><Text className="font-bold">Order ID: </Text>{data.order_id}</Text>
            <Text className="mb-1"><Text className="font-bold">Kit ID: </Text>{data.kit_id}</Text>
            <Text className="mb-1"><Text className="font-bold">Kit #: </Text>{data.kit_number}</Text>
            <Text className="mb-1"><Text className="font-bold">Project: </Text>{data.project_id}</Text>
            <Text className="mb-1">
              <Text className="font-bold">Location:</Text>{" "}
              {(!!data.device_latitude && !!data.device_longitude)
                ? `${data.device_latitude}, ${data.device_longitude}` : "--"}
            </Text>
            <Text className="mb-1"><Text className="font-bold">Status: </Text>{data.status}</Text>
            <Text className="mb-1"><Text className="font-bold">Requested:</Text> {new Date(data.created_at).toLocaleString()}</Text>
            <Text className="mb-1"><Text className="font-bold">Last Updated:</Text> {new Date(data.updated_at).toLocaleString()}</Text>
          </View>

          <Text className="text-lg font-semibold mb-2">Change Status</Text>
          <View className="flex-row flex-wrap mb-4">
            {Object.entries(STATUS_DISPLAY).map(([key, { label, color }]) => (
              <TouchableOpacity
                key={key}
                className={`bg-gray-100 px-3 py-2 rounded-lg mr-3 mb-3 ${status === key ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}
                onPress={() => setStatus(key as Status)}
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                <Text style={{ color: color, fontWeight: "bold" }}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text className="text-lg font-semibold mb-2">Admin Review Comment</Text>
          <TextInput
            mode="outlined"
            value={comment}
            onChangeText={setComment}
            placeholder="Add review/approval notes for this claim..."
            multiline
            numberOfLines={4}
            style={{ marginBottom: 24, backgroundColor: "#fff" }}
            editable={!loading}
          />

          {showCardForm && (
            <View style={{ marginTop: 32, marginBottom: 16, padding: 16, backgroundColor: "#f9fafb", borderRadius: 12 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>Warranty Card Information</Text>

              {/* Invoice Information */}
              <Text style={{ marginBottom: 4 }}>Invoice No</Text>
              <TextInput
                mode="outlined"
                value={invoiceNo}
                onChangeText={setInvoiceNo}
                placeholder="Enter invoice number"
                style={{ marginBottom: 16, backgroundColor: "#fff" }}
                editable={!loading}
              />

              {/* Invoice Date */}
              <InvoiceDateInput
                value={invoiceDate}
                onChange={setInvoiceDate}
                disabled={loading}
              />

              {/* Warranty Type Dropdown */}
              <Text style={{ marginBottom: 4 }}>Warranty Type *</Text>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {WARRANTY_TYPE_CHOICES.map(({ label, value }) => (
                  <Button
                    key={value}
                    onPress={() => setWarrantyType(value)}
                    mode={warrantyType === value ? "contained" : "outlined"}
                    style={{ marginRight: 8 }}
                  >{label}</Button>
                ))}
              </View>

              {/* Warranty Duration */}
              <Text style={{ marginBottom: 4 }}>Warranty Duration (months) *</Text>
              <TextInput
                mode="outlined"
                value={durationMonths}
                onChangeText={setDurationMonths}
                placeholder="e.g. 12"
                keyboardType="numeric"
                style={{ marginBottom: 16, backgroundColor: "#fff" }}
                editable={!loading}
              />

              {/* Warranty Start Date */}
              <WarrantyStartDateInput
                value={startDate}
                onChange={setStartDate}
                disabled={loading}
              />

              {/* Expires At */}
              <Text style={{ marginBottom: 4 }}>Expires At</Text>
              <TextInput
                mode="outlined"
                value={expiresAt}
                style={{ marginBottom: 16, backgroundColor: "#f3f4f6" }}
                editable={false}
              />

              {/* Coverage Description */}
              <Text style={{ marginBottom: 4 }}>Coverage Description (optional)</Text>
              <TextInput
                mode="outlined"
                value={coverageDescription}
                onChangeText={setCoverageDescription}
                placeholder="Enter specific coverage details if any"
                multiline
                numberOfLines={3}
                style={{ marginBottom: 24, backgroundColor: "#fff" }}
                editable={!loading}
              />
            </View>
          )}

          <Button
            mode="contained"
            buttonColor="#facc15"
            textColor="black"
            loading={loading}
            disabled={
              loading ||
              (status === "approved" && !canSubmitWarrantyCard) ||
              !hasFormChanged()
            }
            className="mb-10 rounded-lg"
            onPress={() => mutation.mutate({
              status,
              review_comment: comment,
              ...(status === "approved"
                ? {
                  warranty_type: warrantyType,
                  warranty_duration_months: durationMonths,
                  warranty_started_at: startDate ? startDate.toISOString().split("T")[0] : undefined,
                  expires_at: expiresAt,
                  coverage_description: coverageDescription,
                  invoice_no: invoiceNo,
                  invoice_date: invoiceDate ? invoiceDate.toISOString().split("T")[0] : undefined,
                }
                : {})
            })}
          >
            Update Warranty Status
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
