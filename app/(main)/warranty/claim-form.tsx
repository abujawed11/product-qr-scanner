
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Minimal country data
const COUNTRY_LIST = [
  { code: "+212", flag: "🇲🇦", label: "Morocco" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+86", flag: "🇨🇳", label: "China" },
  { code: "+34", flag: "🇪🇸", label: "Spain" },
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+1", flag: "🇺🇸", label: "USA" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+49", flag: "🇩🇪", label: "Germany" },
  { code: "+33", flag: "🇫🇷", label: "France" },
  { code: "+27", flag: "🇿🇦", label: "South Africa" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
];

// add/remove as needed

function validateEmail(email: string) {
  return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

export default function WarrantyCustomerInfoPage() {
  // --- Get params for autofill ---
  const params = useLocalSearchParams<{
    client_id?: string;
    company_name?: string;
    order_id?: string;
    kit_id?: string;
    kit_no?: string;
    project_id?: string;
    purchase_date?: string;
    email?: string;
  }>();

  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState(COUNTRY_LIST[4]); // Default India
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [kitId, setKitId] = useState('');
  const [kitNo, setKitNo] = useState('');
  const [projectId, setProjectId] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const [showCountrySelect, setShowCountrySelect] = useState(false);


  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

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
    if (params.client_id) setClientId(params.client_id);
    if (params.company_name) setCompanyName(params.company_name);
    if (params.order_id) setOrderId(params.order_id);
    if (params.kit_id) setKitId(params.kit_id);
    if (params.kit_no) setKitNo(params.kit_no);
    if (params.project_id) setProjectId(params.project_id);
    if (params.purchase_date) setPurchaseDate(params.purchase_date);
    if (params.email) setEmail(String(params.email));
  }, [params]);

  // Phone: only allow 0-9, max 10 digits
  const handlePhoneChange = (txt: string) => {
    let num = txt.replace(/[^\d]/g, '');
    if (num.length > 10) num = num.slice(0, 10);
    setPhone(num);
  };

  // Email: basic live validation
  const isEmailValid = email === '' || validateEmail(email);

  const handleNext = () => {
    setSubmitAttempted(true);
    if (
      !clientId || !companyName || !clientName || !phone || !email ||
      !orderId || !kitId || !kitNo || !projectId
    ) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }
    if (phone.length < 10) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    router.replace({
      pathname: '/(main)/warranty/claim-media-wizard',
      params: {
        clientId, companyName, clientName, phone: country.code + phone, email,
        orderId, kitId, kitNo, projectId, purchaseDate,
        stepIdx: 0,
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          {/* <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 24, textAlign: 'center', marginBottom: 30 }}>
            Warranty Request Form
          </Text> */}

          {/* Client ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client ID *</Text>
          <TextInput
            value={clientId}
            onChangeText={setClientId}
            placeholder="Client ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
            editable={false}
          />

          {/* Client Company Name */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Client Company Name *</Text>
          <TextInput
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Company Name"
            placeholderTextColor="#BBB"
            style={inputStyle}
            editable={false}
          />

          {/* Contact Name */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Name *</Text>
          <TextInput
            value={clientName}
            onChangeText={setClientName}
            placeholder="Contact Name"
            placeholderTextColor="#BBB"
            style={inputStyle}
          />

          {/* Country/Flag picker and Phone */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Contact Phone *</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity
              activeOpacity={0.77}
              onPress={() => setShowCountrySelect(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 9,
                borderWidth: 2,
                borderColor: '#FACC15',
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginRight: 7,
                shadowColor: '#FACC15',
                shadowOpacity: 0.08,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
                minWidth: 68
              }}
            >
              <Text style={{ fontSize: 21, marginRight: 6 }}>{country.flag}</Text>
              <Text style={{ color: "#444", fontWeight: '700', fontSize: 15 }}>{country.code}</Text>
            </TouchableOpacity>
            <TextInput
              value={phone}
              onChangeText={handlePhoneChange}
              onBlur={() => setPhoneTouched(true)}     // <-- Add this line here
              placeholder="Phone"
              placeholderTextColor="#BBB"
              keyboardType="numeric"
              style={[inputStyle, { flex: 1, marginBottom: 0, borderRadius: 9 }]}
              maxLength={10}
            />
          </View>
          {(phone.length > 0 && phone.length < 10 && (phoneTouched || submitAttempted)) &&
            <Text style={{ color: "tomato", fontSize: 13, marginBottom: 11, marginLeft: 3 }}>Enter 10 digits</Text>
          }

          {/* Country Selector Modal (simple in-list display) */}
          {showCountrySelect && (
            <View style={{
              position: 'absolute',
              top: 150,
              left: 24,
              right: 24,
              backgroundColor: '#18181b',
              borderRadius: 18,
              borderColor: '#FACC15',
              borderWidth: 2,
              zIndex: 10,
              elevation: 12,
              paddingVertical: 12
            }}>
              <Text style={{ color: '#FACC15', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
                Select Country
              </Text>
              {COUNTRY_LIST.map((cty) => (
                <TouchableOpacity
                  key={cty.code}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 18,
                    borderBottomWidth: 1,
                    borderBottomColor: '#222',
                  }}
                  onPress={() => {
                    setCountry(cty);
                    setShowCountrySelect(false);
                  }}
                >
                  <Text style={{ fontSize: 20, marginRight: 10 }}>{cty.flag}</Text>
                  <Text style={{ color: '#FFF', fontSize: 15, fontWeight: country.code === cty.code ? 'bold' : '600' }}>
                    {cty.label} ({cty.code})
                  </Text>
                  {country.code === cty.code && (
                    <Text style={{ marginLeft: 8, color: "#FACC15", fontSize: 16 }}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{ paddingVertical: 8, alignItems: 'center' }}
                onPress={() => setShowCountrySelect(false)}
              >
                <Text style={{ color: "#BBB", fontWeight: '600', fontSize: 15 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6, marginTop: 1 }}>Email *</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#BBB"
            keyboardType="email-address"
            autoCapitalize="none"
            style={inputStyle}
            onBlur={() => setEmailTouched(true)}
            editable={false}
          />
          {(!isEmailValid && (emailTouched || submitAttempted)) &&
            <Text style={{ color: "tomato", fontSize: 13, marginBottom: 11, marginLeft: 3 }}>
              Please enter a valid email address.
            </Text>
          }

          {/* Order ID */}
          {/* <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Order ID *</Text>
          <TextInput
            value={orderId}
            onChangeText={setOrderId}
            placeholder="Order ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
          /> */}

          {/* Kit ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit ID *</Text>
          <TextInput
            value={kitId}
            onChangeText={setKitId}
            placeholder="Kit ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
            editable={false}
          />

          {/* Kit Number */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Kit Number *</Text>
          <TextInput
            value={kitNo}
            onChangeText={setKitNo}
            placeholder="Kit No"
            placeholderTextColor="#BBB"
            style={inputStyle}
            editable={false}
          />

          {/* Project ID */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Project ID *</Text>
          <TextInput
            value={projectId}
            onChangeText={setProjectId}
            placeholder="Project ID"
            placeholderTextColor="#BBB"
            style={inputStyle}
            editable={false}
          />

          {/* Purchase Date */}
          <Text style={{ color: '#FACC15', fontWeight: '600', marginBottom: 6 }}>Purchase Date</Text>
          <TextInput
            value={purchaseDate}
            onChangeText={setPurchaseDate}
            placeholder="Purchase Date"
            placeholderTextColor="#BBB"
            style={[inputStyle, { marginBottom: 32 }]}
            editable={false}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#FACC15',
              paddingVertical: 18,
              borderRadius: 9,
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
              marginTop: 8,
            }}
            onPress={handleNext}
          >
            <Text style={{
              color: "#111",
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 15,
              letterSpacing: 0.5
            }}>
              Next: Start Warranty Photo/Video Steps
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Input style reused
const inputStyle = {
  backgroundColor: '#FFF',
  borderRadius: 9,
  borderWidth: 2,
  borderColor: '#FACC15',
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginBottom: 16,
  fontSize: 16,
  color: '#222',
  fontWeight: '600' as const,
  shadowColor: '#FACC15',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};