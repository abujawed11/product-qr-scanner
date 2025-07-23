// import { useAuth } from '@/context/AuthContext';
// import { router } from 'expo-router';
// import { Text, TouchableOpacity, View } from 'react-native';

// export default function HomeScreen() {
//   const { user, logout } = useAuth();

//   return (
//     <View className="flex-1 bg-yellow-100 items-center justify-center px-4">
//       <Text className="text-2xl font-bold text-yellow-600 mb-2">Welcome!</Text>

//       {user ? (
//         <>
//           <Text className="text-lg text-gray-800 mb-4">
//             Logged in as: <Text className="font-semibold">{user.username}</Text>
//           </Text>
//           <Text className="text-sm text-gray-600 mb-8">{user.email}</Text>
//           <TouchableOpacity
//             className="bg-yellow-500 px-6 py-3 rounded-lg"
//             onPress={logout}
//           >
//             <Text className="text-black font-bold">Logout</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <Text className="text-gray-600 mb-6">You are not logged in</Text>
//           <TouchableOpacity
//             className="bg-yellow-500 px-6 py-3 rounded-lg"
//             onPress={() => router.push('/login')}
//           >
//             <Text className="text-black font-bold">Go to Login</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// }

// import { useAuth } from '@/context/AuthContext';
// import { Ionicons } from '@expo/vector-icons';
// import { useFocusEffect, useRouter } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Text, TouchableOpacity, View } from 'react-native';
//  // Adjust the import path as needed

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user, logout } = useAuth();

//   // const [username, setUsername] = useState('Abu');
//   const [customerId, setCustomerId] = useState('CUST123');
//   const [orders, setOrders] = useState({ total: 10, delivered: 7, pending: 3 });

//     useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         'Exit App',
//         'Are you sure you want to exit?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Exit', onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true; // prevent default behavior (going back)
//     };

//     const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//     return () => subscription.remove();
//   });

//   useEffect(() => {
//     // fetch user/orders from context or backend here
//   }, []);

//   const openScanner = () => {
//     router.push('/(main)/dashboard/qr-scanner');
//   };
//   // console.log(user)

//   return (
//     <View className="flex-1 bg-black px-6 pt-14">
//       {/* Header */}
//       <Text className="text-white text-xl font-bold">Hi {user?.username}</Text>
//       <Text className="text-white text-lg">Welcome to Sunrack Warranty Portal</Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">Client ID: {user?.client_id}</Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">Client Company: {user?.company_name}</Text>

//       {/* Order Summary */}
//       <View className="mt-10 bg-yellow-400 rounded-2xl p-6">
//         <Text className="text-black text-lg font-bold mb-2">Order Summary</Text>
//         <View className="flex-row justify-between mt-4">
//           <View className="items-center">
//             <Text className="text-black font-semibold text-base">Total</Text>
//             <Text className="text-black text-xl font-bold">{orders.total}</Text>
//           </View>
//           <View className="items-center">
//             <Text className="text-black font-semibold text-base">Delivered</Text>
//             <Text className="text-black text-xl font-bold">{orders.delivered}</Text>
//           </View>
//           <View className="items-center">
//             <Text className="text-black font-semibold text-base">Pending</Text>
//             <Text className="text-black text-xl font-bold">{orders.pending}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Floating Scan Button */}
//       <View className="absolute bottom-10 left-0 right-0 items-center">
//         <TouchableOpacity
//           onPress={openScanner}
//           className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-md"
//         >
//           <Ionicons name="qr-code-outline" size={40} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;


// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api";
// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
// // make sure this path is correct!

// type WarrantyStatusCounts = {
//   pending: number;
//   under_review: number;
//   approved: number;
//   rejected: number;
//   cancelled: number;
//   applied: number;
// };

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [counts, setCounts] = useState<WarrantyStatusCounts>({
//     pending: 0,
//     under_review: 0,
//     approved: 0,
//     rejected: 0,
//     cancelled: 0,
//     applied: 0,
//   });
//   const [loading, setLoading] = useState(false);

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         "Exit App",
//         "Are you sure you want to exit?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Exit", onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };

//     const subscription = BackHandler.addEventListener(
//       "hardwareBackPress",
//       onBackPress
//     );
//     return () => subscription.remove();
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       setLoading(true);
//       try {
//         // Your API path (do not repeat your BASE_URL here)
//         const res = await api.get("/warranty-dashboard-counts/");
//         setCounts(res.data);
//       } catch (e) {
//         // console.error("Failed to fetch dashboard counts:", e);
//         // Alert.alert("Could not load warranty dashboard data.");
//         if (e.response) {
//           console.log(e.response.status);
//           console.log(e.response.data);
//           Alert.alert("API Error", JSON.stringify(e.response.data));
//         } else {
//           console.log(e);
//           Alert.alert("Network Error", e.message);
//         }


//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCounts();
//   }, []);

//   const openScanner = () => {
//     router.push("/(main)/dashboard/qr-scanner");
//   };

//   return (
//     <View className="flex-1 bg-black px-6 pt-14">
//       {/* Header */}
//       <Text className="text-white text-xl font-bold">Hi {user?.username}</Text>
//       <Text className="text-white text-lg">
//         Welcome to Sunrack Warranty Portal
//       </Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">
//         Client ID: {user?.client_id}
//       </Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">
//         Client Company: {user?.company_name}
//       </Text>

//       {/* Warranty Status Dashboard */}
//       <View className="mt-10 bg-yellow-400 rounded-2xl p-6 shadow-lg min-h-[140px]">
//         <Text className="text-black text-xl font-bold mb-4">
//           Warranty Status
//         </Text>
//         {loading ? (
//           <ActivityIndicator color="#000" size="large" style={{ marginTop: 24 }} />
//         ) : (
//           <View className="flex-row justify-between">
//             <View className="items-center flex-1">
//               <Text className="text-black font-medium text-base">Pending</Text>
//               <Text className="text-black text-3xl font-bold mt-2">
//                 {counts.pending}
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text className="text-black font-medium text-base">Review</Text>
//               <Text className="text-black text-3xl font-bold mt-2">
//                 {counts.under_review}
//               </Text>
//             </View>
//             <View className="items-center flex-1">
//               <Text className="text-black font-medium text-base">Approved</Text>
//               <Text className="text-black text-3xl font-bold mt-2">
//                 {counts.approved}
//               </Text>
//             </View>
//           </View>
//         )}
//       </View>

//       {/* Floating Scan Button */}
//       <View className="absolute bottom-10 left-0 right-0 items-center">
//         <TouchableOpacity
//           onPress={openScanner}
//           className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-md"
//         >
//           <Ionicons name="qr-code-outline" size={40} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;


// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api"; // your axios instance, with interceptors set
// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";

// type WarrantyStatusCounts = {
//   pending: number;
//   under_review: number;
//   approved: number;
//   rejected: number;
//   cancelled: number;
//   applied: number;
// };

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const [counts, setCounts] = useState<WarrantyStatusCounts>({
//     pending: 0,
//     under_review: 0,
//     approved: 0,
//     rejected: 0,
//     cancelled: 0,
//     applied: 0,
//   });

//   const [loading, setLoading] = useState(false);

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         "Exit App",
//         "Are you sure you want to exit?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Exit", onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };

//     const subscription = BackHandler.addEventListener(
//       "hardwareBackPress",
//       onBackPress
//     );
//     return () => subscription.remove();
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/warranty-dashboard-counts/");
//         setCounts(res.data);
//       } catch (e: any) {
//         if (e.response) {
//           console.log("API error:", e.response.status, e.response.data);
//           Alert.alert("API Error", JSON.stringify(e.response.data));
//         } else {
//           console.log("Network or unexpected error:", e.message || e.toString());
//           Alert.alert("Network Error", e.message || "Unknown error");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   const openScanner = () => {
//     router.push("/(main)/dashboard/qr-scanner");
//   };

//   return (
//     <View className="flex-1 bg-black px-6 pt-14">
//       {/* Header */}
//       <Text className="text-white text-xl font-bold">Hi {user?.username}</Text>
//       <Text className="text-white text-lg">Welcome to Sunrack Warranty Portal</Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">
//         Client ID: {user?.client_id}
//       </Text>
//       <Text className="text-yellow-400 text-base font-semibold mt-1">
//         Client Company: {user?.company_name}
//       </Text>

//       {/* Warranty Status Dashboard */}
//       <View className="mt-10 bg-yellow-400 rounded-2xl p-6 shadow-lg min-h-[160px]">
//         <Text className="text-black text-xl font-bold mb-4">Warranty Status</Text>

//         {loading ? (
//           <ActivityIndicator color="#000" size="large" style={{ marginTop: 24 }} />
//         ) : (
//           <>
//             {/* Applied */}
//             <View className="flex-row justify-center mb-4">
//               <View className="items-center">
//                 <Text className="text-black font-bold text-lg">Applied</Text>
//                 <Text className="text-black text-4xl font-extrabold mt-2">{counts.applied}</Text>
//               </View>
//             </View>

//             {/* Status counts row */}
//             <View className="flex-row justify-between">
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Pending</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.pending}</Text>
//               </View>
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Review</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.under_review}</Text>
//               </View>
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Approved</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.approved}</Text>
//               </View>
//             </View>
//           </>
//         )}
//       </View>

//       {/* Floating Scan Button */}
//       <View className="absolute bottom-10 left-0 right-0 items-center">
//         <TouchableOpacity
//           onPress={openScanner}
//           className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-md"
//         >
//           <Ionicons name="qr-code-outline" size={40} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;


// import { useAuth } from "@/context/AuthContext";
// import api from "@/utils/api";
// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect, useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   BackHandler,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type WarrantyStatusCounts = {
//   pending: number;
//   under_review: number;
//   approved: number;
//   rejected: number;
//   cancelled: number;
//   applied: number;
// };

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user } = useAuth();

//   const [counts, setCounts] = useState<WarrantyStatusCounts>({
//     pending: 0,
//     under_review: 0,
//     approved: 0,
//     rejected: 0,
//     cancelled: 0,
//     applied: 0,
//   });

//   const [loading, setLoading] = useState(false);

//   useFocusEffect(() => {
//     const onBackPress = () => {
//       Alert.alert(
//         "Exit App",
//         "Are you sure you want to exit?",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Exit", onPress: () => BackHandler.exitApp() },
//         ],
//         { cancelable: true }
//       );
//       return true;
//     };

//     const subscription = BackHandler.addEventListener(
//       "hardwareBackPress",
//       onBackPress
//     );
//     return () => subscription.remove();
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/warranty-dashboard-counts/");
//         setCounts(res.data);
//       } catch (e: any) {
//         if (e.response) {
//           console.log("API error:", e.response.status, e.response.data);
//           Alert.alert("API Error", JSON.stringify(e.response.data));
//         } else {
//           console.log("Network or unexpected error:", e.message || e.toString());
//           Alert.alert("Network Error", e.message || "Unknown error");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounts();
//   }, []);

//   const openScanner = () => {
//     router.push("/(main)/dashboard/qr-scanner");
//   };

//   return (
//     <View className="flex-1 bg-black px-6 pt-14 relative">
//       {/* Header */}
//       <Text className="text-white text-2xl font-extrabold mb-1">Hi, {user?.username}</Text>
//       <Text className="text-white text-2xl font-extrabold mb-1">Welcome to Sunrack Warranty Portal !</Text>
//       <Text className="text-yellow-400 text-sm font-medium">Client ID: {user?.client_id}</Text>
//       <Text className="text-yellow-400 text-sm font-medium">Company: {user?.company_name}</Text>

//       {/* Warranty Status Dashboard */}
//       <View className="mt-10 bg-yellow-400 rounded-2xl p-6 shadow-lg min-h-[180px]">
//         <View className="flex-row items-center mb-3">
//           <Ionicons name="shield-checkmark" size={22} color="black" />
//           <Text className="text-black text-xl font-bold ml-2">Warranty Status</Text>
//         </View>

//         {loading ? (
//           <ActivityIndicator color="#000" size="large" className="mt-6 self-center" />
//         ) : (
//           <>
//             {/* Applied */}
//             <View className="flex-row justify-center mb-4">
//               <View className="items-center">
//                 <Text className="text-black font-bold text-lg">Applied</Text>
//                 <Text className="text-black text-4xl font-extrabold mt-2">{counts.applied}</Text>
//               </View>
//             </View>

//             <View className="border-t border-black/30 my-2" />

//             {/* Status counts row */}
//             <View className="flex-row justify-between pt-2">
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Pending</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.pending}</Text>
//               </View>
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Review</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.under_review}</Text>
//               </View>
//               <View className="items-center flex-1">
//                 <Text className="text-black font-medium text-base">Approved</Text>
//                 <Text className="text-black text-3xl font-bold mt-2">{counts.approved}</Text>
//               </View>
//             </View>
//           </>
//         )}
//       </View>

//       {/* Floating Scan Button */}
//       <View className="absolute bottom-10 left-0 right-0 items-center">
//         <TouchableOpacity
//           onPress={openScanner}
//           className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-xl border border-yellow-200"
//         >
//           <Ionicons name="qr-code-outline" size={40} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;



import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

type WarrantyStatusCounts = {
  pending: number;
  under_review: number;
  approved: number;
  rejected: number;
  cancelled: number;
  applied: number;
};

const HomeScreen = () => {
  const router = useRouter();
  const { user } = useAuth();


 

  // React Query fetching warranty dashboard counts
  const {
    data: counts = {
      pending: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      cancelled: 0,
      applied: 0,
    },
    isLoading: loading,
    isError,
    error,
    refetch, // Optional: you may use this for pull-to-refresh patterns
  } = useQuery({
    queryKey: ["warrantyDashboardCounts"],
    queryFn: async () => {
      const res = await api.get("/warranty-dashboard-counts/");
      return res.data;
    },
    staleTime: 60_000, // Optional: keeps data fresh for 1 min
  });

  const openScanner = () => {
    router.push("/(main)/dashboard/qr-scanner");
  };


  useFocusEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => subscription.remove();
  });

  return (
    <View className="flex-1 bg-black px-6 pt-14 relative">
      {/* Header */}
      <Text className="text-white text-2xl font-extrabold mb-1">Hi, {user?.username}</Text>
      <Text className="text-white text-2xl font-extrabold mb-1">
        Welcome to Sunrack Warranty Portal !
      </Text>
      <Text className="text-yellow-400 text-sm font-medium">
        Client ID: {user?.client_id}
      </Text>
      <Text className="text-yellow-400 text-sm font-medium">
        Company: {user?.company_name}
      </Text>

      {/* Warranty Status Dashboard */}
      <View className="mt-10 bg-yellow-400 rounded-2xl p-6 shadow-lg min-h-[180px]">
        <View className="flex-row items-center mb-3">
          <Ionicons name="shield-checkmark" size={22} color="black" />
          <Text className="text-black text-xl font-bold ml-2">
            Warranty Status
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#000" size="large" className="mt-6 self-center" />
        ) : isError ? (
          <Text className="text-red-600 text-center mt-6">
            {error?.message || "Failed to load warranty data"}
          </Text>
        ) : (
          <>
            {/* Applied */}
            <View className="flex-row justify-center mb-4">
              <View className="items-center">
                <Text className="text-black font-bold text-lg">Applied</Text>
                <Text className="text-black text-4xl font-extrabold mt-2">{counts.applied}</Text>
              </View>
            </View>

            <View className="border-t border-black/30 my-2" />

            {/* Status counts row */}
            <View className="flex-row justify-between pt-2">
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Pending</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.pending}</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Review</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.under_review}</Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-black font-medium text-base">Approved</Text>
                <Text className="text-black text-3xl font-bold mt-2">{counts.approved}</Text>
              </View>
            </View>
          </>
        )}
      </View>

      {/* Floating Scan Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={openScanner}
          className="bg-yellow-400 w-20 h-20 rounded-full items-center justify-center shadow-xl border border-yellow-200"
        >
          <Ionicons name="qr-code-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
