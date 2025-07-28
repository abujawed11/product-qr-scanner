// // app/(main)/warranty/claim-status.tsx

// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";

// // Sample mock data; replace with your API logic!
// const sampleClaims = [
//   {
//     id: "WC-00123",
//     kit_id: "KIT_12345",
//     date: "2024-06-05",
//     status: "Pending",
//     description: "Loose connection detected in Kit 12345.",
//   },
//   {
//     id: "WC-00124",
//     kit_id: "KIT_67890",
//     date: "2024-05-21",
//     status: "Approved",
//     description: "Panel overheating in Kit 67890.",
//   },
//   {
//     id: "WC-00125",
//     kit_id: "KIT_676761",
//     date: "2024-04-19",
//     status: "Rejected",
//     description: "No defect found.",
//   },
// ];

// const STATUS_COLORS: Record<string, string> = {
//   "Pending": "#facc15",
//   "Approved": "#22c55e",
//   "Rejected": "#f87171",
// };

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [claims, setClaims] = useState<typeof sampleClaims>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     // Simulate API loading!
//     setTimeout(() => {
//       setClaims(sampleClaims);
//       setIsLoading(false);
//     }, 1000);
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     // Simulate refresh
//     setTimeout(() => {
//       setClaims(sampleClaims);
//       setRefreshing(false);
//     }, 1000);
//   };

//   if (isLoading) {
//     return (
//       <View style={{flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center"}}>
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#000", padding: 14 }}>
//       <FlatList
//         data={claims}
//         keyExtractor={(item) => item.id}
//         refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
//         ListEmptyComponent={
//           <Text style={{ color: "#fff", textAlign: "center", marginTop: 42, fontSize: 16 }}>No claims found.</Text>
//         }
//         renderItem={({ item }) => (
//           <View
//             style={{
//               backgroundColor: "#18181b",
//               borderRadius: 16,
//               padding: 18,
//               marginBottom: 14,
//               shadowColor: "#000",
//               shadowOpacity: 0.08,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 8,
//               borderLeftWidth: 6,
//               borderLeftColor: STATUS_COLORS[item.status] ?? "#fff",
//             }}
//           >
//             <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 7 }}>
//               <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//                 {item.kit_id}
//               </Text>
//               <Text style={{ color: "#a1a1aa", fontWeight: "bold", fontSize: 13 }}>
//                 {item.date}
//               </Text>
//             </View>
//             <Text style={{ color: "#d4d4d8", flexShrink: 1, marginBottom: 7 }}>{item.description}</Text>
//             <Text
//               style={{
//                 color: STATUS_COLORS[item.status] ?? "#fff",
//                 fontWeight: "bold",
//                 alignSelf: "flex-end",
//                 fontSize: 14,
//                 textTransform: "uppercase",
//                 letterSpacing: 1,
//               }}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }


// app/(main)/warranty/claim-status.tsx

// import api from "@/utils/api";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   Linking,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// --- Status display config ---
// const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
//   pending: { label: "Pending", color: "#facc15" },
//   under_review: { label: "Under Review", color: "#3b82f6" },
//   approved: { label: "Approved", color: "#22c55e" },
//   rejected: { label: "Rejected", color: "#f87171" },
//   cancelled: { label: "Cancelled", color: "#9ca3af" },
// };

// // --- Group the claims by orderId (for display) ---
// function groupClaimsByOrder(claims: any[]) {
//   const map = new Map<string, any[]>();
//   for (const claim of claims) {
//     console.log(claim.pdf_url)
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId)?.push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [claims, setClaims] = useState<any[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // --- Fetch the claims from backend ---
//   const fetchClaims = useCallback(async () => {
//     setError(null);
//     setRefreshing(true);
//     try {
//       // TODO: Set your API BASE URL and provide client id/auth if needed
//       const response = await api.get("/warranty-claims-status/");
//       // console.log(response.data)
//       setClaims(response.data);
//     } catch (e: any) {
//       setError("Failed to load warranty claims. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchClaims();
//   };

//   if (isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#000",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "#000",
//           justifyContent: "center",
//           alignItems: "center",
//           paddingHorizontal: 20,
//         }}
//       >
//         <Text style={{ color: "#f87171", fontSize: 16, marginBottom: 16 }}>{error}</Text>
//         <TouchableOpacity
//           onPress={fetchClaims}
//           style={{
//             backgroundColor: "#facc15",
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             borderRadius: 8,
//           }}
//         >
//           <Text style={{ color: "#000", fontWeight: "bold" }}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const grouped = groupClaimsByOrder(claims);


//   return (
//     <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
//       <FlatList
//         keyExtractor={([orderId]) => orderId}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         data={grouped}
//         ListEmptyComponent={
//           <Text style={{ color: "#fff", textAlign: "center", marginTop: 40, fontSize: 16 }}>
//             No warranty claims found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const orderPurchaseDate = claimsForOrder[0]?.order?.purchase_date
//             ? new Date(claimsForOrder[0].order.purchase_date).toLocaleDateString()
//             : null;

//           return (
//             <View style={{ marginBottom: 28 }}>
//               <Text style={{ color: "#facc15", fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>
//                 Order ID: {orderId}
//               </Text>
//               {orderPurchaseDate ? (
//                 <Text style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 11 }}>
//                   Purchase Date: {orderPurchaseDate}
//                 </Text>
//               ) : null}

//               {claimsForOrder.map((claim: any) => {
//                 const statusObj = STATUS_DISPLAY[claim.status] ?? { label: claim.status, color: "#fff" };
//                 return (
//                   <View
//                     key={claim.war_req_id}
//                     style={{
//                       backgroundColor: "#18181b",
//                       borderRadius: 16,
//                       padding: 18,
//                       marginBottom: 12,
//                       borderLeftWidth: 6,
//                       borderLeftColor: statusObj.color,
//                     }}
//                   >
//                     <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
//                       <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
//                         Claim ID: {claim.war_req_id}
//                       </Text>
//                       <Text style={{ color: "#a1a1aa", fontWeight: "600", fontSize: 12 }}>
//                         {new Date(claim.status_updated_at).toLocaleDateString(undefined, {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </Text>
//                     </View>
//                     <Text style={{ color: "#d4d4d8", marginBottom: 5 }}>
//                       Kit Number: {claim.kit_number || "N/A"}
//                     </Text>
//                     {claim.review_comment ? (
//                       <Text style={{ color: "#f87171", fontStyle: "italic", marginBottom: 6 }}>
//                         Reviewer Comment: {claim.review_comment}
//                       </Text>
//                     ) : null}
//                     {claim.pdf_url ? (
//                       <TouchableOpacity
//                         onPress={() => {
//                           Linking.openURL(claim.pdf_url);
//                         }}
//                         style={{
//                           marginBottom: 6,
//                           paddingVertical: 6,
//                           paddingHorizontal: 12,
//                           backgroundColor: "#2563eb",
//                           borderRadius: 8,
//                           alignSelf: "flex-start",
//                         }}
//                       >
//                         <Text style={{ color: "#fff", fontWeight: "bold" }}>
//                           View PDF
//                         </Text>
//                       </TouchableOpacity>
//                     ) : null}
//                     <Text
//                       style={{
//                         color: statusObj.color,
//                         fontWeight: "bold",
//                         fontSize: 14,
//                         textTransform: "uppercase",
//                         letterSpacing: 1,
//                         alignSelf: "flex-end",
//                       }}
//                     >
//                       {statusObj.label}
//                     </Text>
//                   </View>
//                 );
//               })}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// import api from "@/utils/api";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View
// } from "react-native";

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const STATUS_DISPLAY = {
//   pending: { label: "Pending", color: "#facc15" },
//   under_review: { label: "Under Review", color: "#3b82f6" },
//   approved: { label: "Approved", color: "#22c55e" },
//   rejected: { label: "Rejected", color: "#f87171" },
//   cancelled: { label: "Cancelled", color: "#9ca3af" },
// };

// function groupClaimsByOrder(claims) {
//   const map = new Map();
//   for (const claim of claims) {
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId).push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [claims, setClaims] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState({});

//   const fetchClaims = useCallback(async () => {
//     setError(null);
//     setRefreshing(true);
//     try {
//       const response = await api.get("/warranty-claims-status/");
//       setClaims(response.data);
//     } catch (e) {
//       setError("Failed to load warranty claims. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchClaims();
//   };

//   const grouped = groupClaimsByOrder(claims);

//   const toggleExpand = orderId => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded(prev => ({
//       ...prev,
//       [orderId]: !prev[orderId]
//     }));
//   };

//   if (isLoading) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 20
//       }}>
//         <Text style={{ color: "#f87171", fontSize: 16, marginBottom: 16 }}>{error}</Text>
//         <TouchableOpacity
//           onPress={fetchClaims}
//           style={{
//             backgroundColor: "#facc15",
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             borderRadius: 8,
//           }}
//         >
//           <Text style={{ color: "#000", fontWeight: "bold" }}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
//       <FlatList
//         keyExtractor={([orderId]) => orderId}
//         data={grouped}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         ListEmptyComponent={
//           <Text style={{ color: "#fff", textAlign: "center", marginTop: 40, fontSize: 16 }}>
//             No warranty claims found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const isOpen = !!expanded[orderId];
//           return (
//             <View
//               key={orderId}
//               style={{
//                 backgroundColor: "#18181b",
//                 borderRadius: 18,
//                 marginBottom: 20,
//                 overflow: "hidden",
//                 borderLeftWidth: 6,
//                 borderLeftColor: "#facc15"
//               }}
//             >
//               {/* Order Card Header */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => toggleExpand(orderId)}
//                 style={{
//                   padding: 18,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between"
//                 }}
//               >
//                 <View>
//                   <Text style={{
//                     color: "#facc15",
//                     fontWeight: "bold",
//                     fontSize: 18,
//                     marginBottom: 5
//                   }}>
//                     Order ID: {orderId}
//                   </Text>
//                   <Text style={{
//                     color: "#a1a1aa",
//                     fontSize: 14,
//                   }}>
//                     Number of Kits: {claimsForOrder.length}
//                   </Text>
//                 </View>
//                 <Text style={{
//                   fontSize: 32,
//                   color: "#fff"
//                 }}>{isOpen ? "▲" : "▼"}</Text>
//               </TouchableOpacity>

//               {/* Expanded Claim List */}
//               {isOpen && (
//                 <View style={{ backgroundColor: "#23232c", paddingVertical: 8, paddingHorizontal: 12 }}>
//                   {claimsForOrder.map((claim, idx) => {
//                     const statusObj = STATUS_DISPLAY[claim.status] ?? { label: claim.status, color: "#fff" };
//                     return (
//                       <View
//                         key={claim.war_req_id}
//                         style={{
//                           marginBottom: idx !== claimsForOrder.length - 1 ? 15 : 0,
//                           backgroundColor: "#23232c",
//                           borderRadius: 12,
//                           padding: 12,
//                           borderLeftWidth: 5,
//                           borderLeftColor: statusObj.color,
//                         }}
//                       >
//                         <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
//                           <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//                             Claim ID: {claim.war_req_id}
//                           </Text>
//                           <Text style={{ color: statusObj.color, fontWeight: "bold", fontSize: 14 }}>
//                             {statusObj.label}
//                           </Text>
//                         </View>
//                         <Text style={{ color: "#d4d4d8", marginBottom: 4 }}>
//                           Kit ID: {claim.kit}
//                         </Text>
//                         <Text style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 4 }}>
//                           Last Updated: {new Date(claim.status_updated_at).toLocaleString()}
//                         </Text>
//                         {claim.review_comment ? (
//                           <Text style={{
//                             color: "#f87171",
//                             fontStyle: "italic",
//                             marginBottom: 4
//                           }}>
//                             Reviewer: {claim.review_comment}
//                           </Text>
//                         ) : null}
//                         <Text style={{ color: "#a1a1aa", fontSize: 13 }}>
//                           Submitted: {new Date(claim.created_at).toLocaleString()}
//                         </Text>
//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }


// import api from "@/utils/api";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View
// } from "react-native";

// // --- TYPES ---
// type WarrantyClaim = {
//   war_req_id: string;
//   order: { order_id: string } | null;
//   kit_id: string;
//   status: string;
//   status_updated_at: string;
//   review_comment?: string | null;
//   created_at: string;
// };

// type GroupedClaims = [string, WarrantyClaim[]];

// // --- NAV BAR / LAYOUT ---
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- STATUS COLORS/labels ---
// const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
//   pending: { label: "Pending", color: "#facc15" },
//   under_review: { label: "Under Review", color: "#3b82f6" },
//   approved: { label: "Approved", color: "#22c55e" },
//   rejected: { label: "Rejected", color: "#f87171" },
//   cancelled: { label: "Cancelled", color: "#9ca3af" },
// };

// // --- GROUPING ---
// function groupClaimsByOrder(claims: WarrantyClaim[]): GroupedClaims[] {
//   const map = new Map<string, WarrantyClaim[]>();
//   for (const claim of claims) {
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId)!.push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [claims, setClaims] = useState<WarrantyClaim[]>([]);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const fetchClaims = useCallback(async () => {
//     setError(null);
//     setRefreshing(true);
//     try {
//       const response = await api.get<WarrantyClaim[]>("/warranty-claims-status/");
//       setClaims(response.data);
//     } catch (e) {
//       setError("Failed to load warranty claims. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchClaims();
//   };

//   const grouped = groupClaimsByOrder(claims);

//   const toggleExpand = (orderId: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded(prev => ({
//       ...prev,
//       [orderId]: !prev[orderId]
//     }));
//   };

//   if (isLoading) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 20
//       }}>
//         <Text style={{ color: "#f87171", fontSize: 16, marginBottom: 16 }}>{error}</Text>
//         <TouchableOpacity
//           onPress={fetchClaims}
//           style={{
//             backgroundColor: "#facc15",
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             borderRadius: 8,
//           }}
//         >
//           <Text style={{ color: "#000", fontWeight: "bold" }}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
//       <FlatList<GroupedClaims>
//         keyExtractor={([orderId]) => orderId}
//         data={grouped}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         ListEmptyComponent={
//           <Text style={{ color: "#fff", textAlign: "center", marginTop: 40, fontSize: 16 }}>
//             No warranty claims found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const isOpen = !!expanded[orderId];
//           return (
//             <View
//               key={orderId}
//               style={{
//                 backgroundColor: "#18181b",
//                 borderRadius: 18,
//                 marginBottom: 20,
//                 overflow: "hidden",
//                 borderLeftWidth: 6,
//                 borderLeftColor: "#facc15"
//               }}
//             >
//               {/* Order Card Header */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => toggleExpand(orderId)}
//                 style={{
//                   padding: 18,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between"
//                 }}
//               >
//                 <View>
//                   <Text style={{
//                     color: "#facc15",
//                     fontWeight: "bold",
//                     fontSize: 18,
//                     marginBottom: 5
//                   }}>
//                     Order ID: {orderId}
//                   </Text>
//                   <Text style={{
//                     color: "#a1a1aa",
//                     fontSize: 14,
//                   }}>
//                     Number of Kits: {claimsForOrder.length}
//                   </Text>
//                 </View>
//                 <Text style={{
//                   fontSize: 32,
//                   color: "#fff"
//                 }}>{isOpen ? "▲" : "▼"}</Text>
//               </TouchableOpacity>

//               {/* Expanded Claim List */}
//               {isOpen && (
//                 <View style={{ backgroundColor: "#23232c", paddingVertical: 8, paddingHorizontal: 12 }}>
//                   {claimsForOrder.map((claim, idx) => {
//                     const statusObj = STATUS_DISPLAY[claim.status] ?? { label: claim.status, color: "#fff" };
//                     return (
//                       <View
//                         key={claim.war_req_id}
//                         style={{
//                           marginBottom: idx !== claimsForOrder.length - 1 ? 15 : 0,
//                           backgroundColor: "#23232c",
//                           borderRadius: 12,
//                           padding: 12,
//                           borderLeftWidth: 5,
//                           borderLeftColor: statusObj.color,
//                         }}
//                       >
//                         <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
//                           <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//                             Request ID: {claim.war_req_id}
//                           </Text>
//                           <Text style={{ color: statusObj.color, fontWeight: "bold", fontSize: 14 }}>
//                             {statusObj.label}
//                           </Text>
//                         </View>
//                         <Text style={{ color: "#d4d4d8", marginBottom: 4 }}>
//                           Kit ID: {claim.kit_id}
//                         </Text>
//                         <Text style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 4 }}>
//                           Last Updated: {new Date(claim.status_updated_at).toLocaleString()}
//                         </Text>
//                         {claim.review_comment ? (
//                           <Text style={{
//                             color: "#f87171",
//                             fontStyle: "italic",
//                             marginBottom: 4
//                           }}>
//                             Reviewer: {claim.review_comment}
//                           </Text>
//                         ) : null}
//                         <Text style={{ color: "#a1a1aa", fontSize: 13 }}>
//                           Submitted: {new Date(claim.created_at).toLocaleString()}
//                         </Text>
//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }


// import { useRefresh } from "@/context/RefreshContext";
// import api from "@/utils/api";
// import { router, useFocusEffect } from "expo-router";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   BackHandler,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View
// } from "react-native";

// // --- TYPES ---
// type WarrantyClaim = {
//   war_req_id: string;
//   order: { order_id: string } | null;
//   kit_id: string;
//   status: string;
//   status_updated_at: string;
//   review_comment?: string | null;
//   created_at: string;
//   kit_number: string;
// };

// type GroupedClaims = [string, WarrantyClaim[]];

// // --- NAV BAR / LAYOUT ---
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- STATUS COLORS/labels ---
// const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
//   pending: { label: "Pending", color: "#facc15" },
//   under_review: { label: "Under Review", color: "#3b82f6" },
//   approved: { label: "Approved", color: "#22c55e" },
//   rejected: { label: "Rejected", color: "#f87171" },
//   cancelled: { label: "Cancelled", color: "#9ca3af" },
// };

// // --- GROUPING ---
// function groupClaimsByOrder(claims: WarrantyClaim[]): GroupedClaims[] {
//   const map = new Map<string, WarrantyClaim[]>();
//   for (const claim of claims) {
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId)!.push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [claims, setClaims] = useState<WarrantyClaim[]>([]);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const { refreshKey } = useRefresh();


//   useFocusEffect(
//     React.useCallback(() => {

//       const onBackPress = () => {
//         router.replace('/(main)/dashboard');
//         return true;
//       };
//       const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//       return () => subscription.remove();
//     }, [])
//   );


//   const fetchClaims = useCallback(async () => {
//     setError(null);
//     setRefreshing(true);
//     try {
//       const response = await api.get<WarrantyClaim[]>("/warranty-claims-status/");
//       setClaims(response.data);
//     } catch (e) {
//       setError("Failed to load warranty claims. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims,refreshKey]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchClaims();
//   };

//   const grouped = groupClaimsByOrder(claims);

//   const toggleExpand = (orderId: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded(prev => ({
//       ...prev,
//       [orderId]: !prev[orderId]
//     }));
//   };

//   if (isLoading) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center"
//       }}>
//         <ActivityIndicator size="large" color="#facc15" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 20
//       }}>
//         <Text style={{ color: "#f87171", fontSize: 16, marginBottom: 16 }}>{error}</Text>
//         <TouchableOpacity
//           onPress={fetchClaims}
//           style={{
//             backgroundColor: "#facc15",
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             borderRadius: 8,
//           }}
//         >
//           <Text style={{ color: "#000", fontWeight: "bold" }}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#000", padding: 16 }}>
//       <FlatList<GroupedClaims>
//         keyExtractor={([orderId]) => orderId}
//         data={grouped}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//         ListEmptyComponent={
//           <Text style={{ color: "#fff", textAlign: "center", marginTop: 40, fontSize: 16 }}>
//             No warranty claims found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const isOpen = !!expanded[orderId];
//           return (
//             <View
//               key={orderId}
//               style={{
//                 backgroundColor: "#18181b",
//                 borderRadius: 18,
//                 marginBottom: 20,
//                 overflow: "hidden",
//                 // NO borderLeftColor here any more!
//               }}
//             >
//               {/* Order Card Header (NO status color!) */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => toggleExpand(orderId)}
//                 style={{
//                   padding: 18,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between"
//                 }}
//               >
//                 <View>
//                   <Text style={{
//                     color: "#fff",
//                     fontWeight: "bold",
//                     fontSize: 18,
//                     marginBottom: 5
//                   }}>
//                     Order ID: {orderId}
//                   </Text>
//                   <Text style={{
//                     color: "#a1a1aa",
//                     fontSize: 14,
//                   }}>
//                     Number of Kits Orderd: {claimsForOrder.length}
//                   </Text>
//                 </View>
//                 <Text style={{
//                   fontSize: 32,
//                   color: "#fff"
//                 }}>{isOpen ? "▲" : "▼"}</Text>
//               </TouchableOpacity>

//               {/* Expanded Claim List */}
//               {isOpen && (
//                 <View style={{ backgroundColor: "#23232c", paddingVertical: 8, paddingHorizontal: 12 }}>
//                   {claimsForOrder.map((claim, idx) => {
//                     const statusObj = STATUS_DISPLAY[claim.status] ?? { label: claim.status, color: "#fff" };
//                     return (
//                       <View
//                         key={claim.war_req_id}
//                         style={{
//                           marginBottom: idx !== claimsForOrder.length - 1 ? 15 : 0,
//                           backgroundColor: "#23232c",
//                           borderRadius: 12,
//                           padding: 12,
//                           borderLeftWidth: 5,
//                           borderLeftColor: statusObj.color, // <-- Only here!
//                         }}
//                       >
//                         <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
//                           <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
//                             Request ID: {claim.war_req_id}
//                           </Text>
//                           <Text style={{ color: statusObj.color, fontWeight: "bold", fontSize: 14 }}>
//                             {statusObj.label}
//                           </Text>
//                         </View>
//                         <Text style={{ color: "#d4d4d8", marginBottom: 4 }}>
//                           Kit ID: {claim.kit_id}
//                         </Text>
//                         <Text style={{ color: "#d4d4d8", marginBottom: 4 }}>
//                           Kit Number: {claim.kit_number}
//                         </Text>
//                         <Text style={{ color: "#a1a1aa", fontSize: 13, marginBottom: 4 }}>
//                           Last Updated: {new Date(claim.status_updated_at).toLocaleString()}
//                         </Text>
//                         {claim.review_comment ? (
//                           <Text style={{
//                             color: "#f87171",
//                             fontStyle: "italic",
//                             marginBottom: 4
//                           }}>
//                             Reviewer: {claim.review_comment}
//                           </Text>
//                         ) : null}
//                         <Text style={{ color: "#a1a1aa", fontSize: 13 }}>
//                           Submitted: {new Date(claim.created_at).toLocaleString()}
//                         </Text>
//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }


// import { useRefresh } from "@/context/RefreshContext";
// import api from "@/utils/api";
// import { router, useFocusEffect } from "expo-router";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   BackHandler,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from "react-native";

// // --- TYPES ---
// type WarrantyClaim = {
//   war_req_id: string;
//   order: { order_id: string } | null;
//   kit_id: string;
//   status: string;
//   status_updated_at: string;
//   review_comment?: string | null;
//   created_at: string;
//   kit_number: string;
// };
// type GroupedClaims = [string, WarrantyClaim[]];

// // --- NAV BAR / LAYOUT ---
// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- STATUS COLORS/labels ---
// const STATUS_DISPLAY: Record<
//   string,
//   { label: string; color: string; faded: string }
// > = {
//   pending: { label: "Pending", color: "#facc15", faded: "#18181b" },
//   under_review: { label: "Under Review", color: "#3b82f6", faded: "#18181b" },
//   approved: { label: "Approved", color: "#22c55e", faded: "#18181b" },
//   rejected: { label: "Rejected", color: "#f87171", faded: "#18181b" },
//   cancelled: { label: "Cancelled", color: "#9ca3af", faded: "#18181b" },
// };

// // --- GROUPING ---
// function groupClaimsByOrder(claims: WarrantyClaim[]): GroupedClaims[] {
//   const map = new Map<string, WarrantyClaim[]>();
//   for (const claim of claims) {
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId)!.push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [claims, setClaims] = useState<WarrantyClaim[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});
//   const { refreshKey } = useRefresh();

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace("/(main)/dashboard");
//         return true;
//       };
//       const subscription = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );
//       return () => subscription.remove();
//     }, [])
//   );

//   const fetchClaims = useCallback(async () => {
//     setError(null);
//     setRefreshing(true);
//     try {
//       const response = await api.get<WarrantyClaim[]>(
//         "/warranty-claims-status/"
//       );
//       setClaims(response.data);
//     } catch (e) {
//       setError("Failed to load warranty requests. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims, refreshKey]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchClaims();
//   };

//   const grouped = groupClaimsByOrder(claims);

//   const toggleExpand = (orderId: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center">
//         <ActivityIndicator size="large" color="#facc15" />
//         <Text className="text-yellow-400 mt-4 font-bold">Loading...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center px-6">
//         <Text className="text-red-400 text-base mb-4 font-bold">{error}</Text>
//         <TouchableOpacity
//           onPress={fetchClaims}
//           className="bg-yellow-400 px-6 py-3 rounded-xl"
//         >
//           <Text className="text-black font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-black p-4">
//       <Text className="text-white text-3xl font-extrabold text-center mb-2 mt-4">
//         Warranty Requests
//       </Text>
//       <FlatList
//         keyExtractor={([orderId]) => orderId}
//         data={grouped}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <Text className="text-zinc-400 text-center mt-16 text-lg font-semibold">
//             No warranty Request found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const isOpen = !!expanded[orderId];

//           return (
//             <View className="bg-[#18181b] rounded-2xl mb-5 overflow-hidden border border-[#23232b]">
//               {/* Order header */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => toggleExpand(orderId)}
//                 className="px-5 py-4 flex-row items-center justify-between bg-[#18181b]"
//               >
//                 <View>
//                   <Text className="text-white font-bold text-lg">
//                     Order ID: <Text className="font-bold">{orderId}</Text>
//                   </Text>
//                   <Text className="text-[#a3a3a6] text-sm">
//                     Number of Kits Ordered:{" "}
//                     <Text className="font-bold">{claimsForOrder.length}</Text>
//                   </Text>
//                 </View>
//                 <Text className="text-white text-[28px] font-bold">
//                   {isOpen ? "▾" : "▸"}
//                 </Text>
//               </TouchableOpacity>
//               {isOpen && (
//                 <View className="bg-[#23232c] pt-2 pb-2 px-2 rounded-b-2xl">
//                   {claimsForOrder.map((claim, idx) => {
//                     const statusObj = STATUS_DISPLAY[claim.status] ?? {
//                       label: claim.status,
//                       color: "#facc15",
//                       faded: "#18181b",
//                     };
//                     return (
//                       <View
//                         key={claim.war_req_id}
//                         className="mb-4 rounded-xl px-4 py-3"
//                         style={{
//                           borderLeftWidth: 5,
//                           borderLeftColor: statusObj.color,
//                         }}
//                       >
//                         <View className="flex-row justify-between items-center mb-2">
//                           <Text className="text-white font-bold text-base">
//                             Request:{" "}
//                             <Text className="font-extrabold text-yellow-400">
//                               {claim.war_req_id}
//                             </Text>
//                           </Text>
//                           <View
//                             className="rounded-full px-3 py-1"
//                             style={{
//                               backgroundColor: "#18181b",
//                               borderWidth: 1,
//                               borderColor: statusObj.color,
//                             }}
//                           >
//                             <Text
//                               className="font-bold text-xs"
//                               style={{
//                                 color: statusObj.color,
//                               }}
//                             >
//                               {statusObj.label}
//                             </Text>
//                           </View>
//                         </View>
//                         <Text className="text-zinc-200 mb-[1px]">
//                           Kit ID:{" "}
//                           <Text className="text-yellow-400 font-bold">
//                             {claim.kit_id}
//                           </Text>
//                         </Text>
//                         <Text className="text-zinc-200 mb-[1px]">
//                           Kit Number:{" "}
//                           <Text className="text-yellow-400 font-bold">
//                             {claim.kit_number}
//                           </Text>
//                         </Text>
//                         <Text className="text-zinc-400 text-xs mb-[1px]">
//                           Last Updated:{" "}
//                           {new Date(claim.status_updated_at).toLocaleString()}
//                         </Text>
//                         {claim.review_comment ? (
//                           <View className="bg-[#18181b] border border-[#f87171] rounded-lg mt-2 mb-1 px-3 py-2">
//                             <Text className="text-[#f87171] font-bold text-xs mb-1">
//                               Reviewer Comment
//                             </Text>
//                             <Text className="text-[#f87171] italic text-sm">
//                               {claim.review_comment}
//                             </Text>
//                           </View>
//                         ) : null}
//                         <Text className="text-zinc-400 text-xs">
//                           Submitted:{" "}
//                           {new Date(claim.created_at).toLocaleString()}
//                         </Text>
//                         {idx !== claimsForOrder.length - 1 && (
//                           <View className="h-[1px] bg-[#23232c] opacity-40 mt-3" />
//                         )}
//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }



// import api from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// import { router, useFocusEffect } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   BackHandler,
//   FlatList,
//   LayoutAnimation,
//   Platform,
//   RefreshControl,
//   Text,
//   TouchableOpacity,
//   UIManager,
//   View,
// } from "react-native";

// // --- TYPES ---
// type WarrantyClaim = {
//   war_req_id: string;
//   order: { order_id: string } | null;
//   kit_id: string;
//   status: string;
//   status_updated_at: string;
//   review_comment?: string | null;
//   created_at: string;
//   kit_number: string;
// };
// type GroupedClaims = [string, WarrantyClaim[]];

// // --- NAV BAR / LAYOUT ---
// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// // --- STATUS COLORS/labels ---
// const STATUS_DISPLAY: Record<
//   string,
//   { label: string; color: string; faded: string }
// > = {
//   pending: { label: "Pending", color: "#facc15", faded: "#18181b" },
//   under_review: { label: "Under Review", color: "#3b82f6", faded: "#18181b" },
//   approved: { label: "Approved", color: "#22c55e", faded: "#18181b" },
//   rejected: { label: "Rejected", color: "#f87171", faded: "#18181b" },
//   cancelled: { label: "Cancelled", color: "#9ca3af", faded: "#18181b" },
// };

// // --- GROUPING ---
// function groupClaimsByOrder(claims: WarrantyClaim[]): GroupedClaims[] {
//   const map = new Map<string, WarrantyClaim[]>();
//   for (const claim of claims) {
//     const orderId = claim.order?.order_id ?? "Unknown";
//     if (!map.has(orderId)) map.set(orderId, []);
//     map.get(orderId)!.push(claim);
//   }
//   return Array.from(map.entries());
// }

// export default function ClaimStatusScreen() {
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   useFocusEffect(
//     React.useCallback(() => {
//       const onBackPress = () => {
//         router.replace("/(main)/dashboard");
//         return true;
//       };
//       const subscription = BackHandler.addEventListener(
//         "hardwareBackPress",
//         onBackPress
//       );
//       return () => subscription.remove();
//     }, [])
//   );

//   // React Query for warranty claims (replace all old state/fetch useEffect)
//   const {
//     data: claims = [],
//     isLoading,
//     isRefetching: refreshing,
//     isError,
//     error,
//     refetch,
//   } = useQuery<WarrantyClaim[]>({
//     queryKey: ["myWarrantyClaims"],
//     queryFn: async () => {
//       const res = await api.get<WarrantyClaim[]>("/warranty-claims-status/");
//       return res.data;
//     },
//   });

//   const grouped = groupClaimsByOrder(claims);

//   const onRefresh = () => refetch();

//   const toggleExpand = (orderId: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setExpanded((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center">
//         <ActivityIndicator size="large" color="#facc15" />
//         <Text className="text-yellow-400 mt-4 font-bold">Loading...</Text>
//       </View>
//     );
//   }

//   if (isError) {
//     return (
//       <View className="flex-1 bg-black justify-center items-center px-6">
//         <Text className="text-red-400 text-base mb-4 font-bold">
//           Could not load warranty requests.
//         </Text>
//         <TouchableOpacity
//           // onPress={refetch}
//           onPress={() => refetch()}
//           className="bg-yellow-400 px-6 py-3 rounded-xl"
//         >
//           <Text className="text-black font-bold">Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-black p-4">
//       {/* <Text className="text-white text-3xl font-extrabold text-center mb-2 mt-4">
//         Warranty Requests
//       </Text> */}
//       <FlatList
//         keyExtractor={([orderId]) => orderId}
//         data={grouped}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <Text className="text-zinc-400 text-center mt-16 text-lg font-semibold">
//             No warranty Request found.
//           </Text>
//         }
//         renderItem={({ item }) => {
//           const [orderId, claimsForOrder] = item;
//           const isOpen = !!expanded[orderId];

//           return (
//             <View className="bg-[#18181b] rounded-2xl mb-5 overflow-hidden border border-[#23232b]">
//               {/* Order header */}
//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 onPress={() => toggleExpand(orderId)}
//                 className="px-5 py-4 flex-row items-center justify-between bg-[#18181b]"
//               >
//                 <View>
//                   <Text className="text-white font-bold text-lg">
//                     Order ID: <Text className="font-bold">{orderId}</Text>
//                   </Text>
//                   <Text className="text-[#a3a3a6] text-sm">
//                     Number of Kits Ordered:{" "}
//                     <Text className="font-bold">{claimsForOrder.length}</Text>
//                   </Text>
//                 </View>
//                 <Text className="text-white text-[28px] font-bold">
//                   {isOpen ? "▾" : "▸"}
//                 </Text>
//               </TouchableOpacity>
//               {isOpen && (
//                 <View className="bg-[#23232c] pt-2 pb-2 px-2 rounded-b-2xl">
//                   {claimsForOrder.map((claim, idx) => {
//                     const statusObj = STATUS_DISPLAY[claim.status] ?? {
//                       label: claim.status,
//                       color: "#facc15",
//                       faded: "#18181b",
//                     };
//                     return (
//                       <View
//                         key={claim.war_req_id}
//                         className="mb-4 rounded-xl px-4 py-3"
//                         style={{
//                           borderLeftWidth: 5,
//                           borderLeftColor: statusObj.color,
//                         }}
//                       >
//                         <View className="flex-row justify-between items-center mb-2">
//                           <Text className="text-white font-bold text-base">
//                             Request:{" "}
//                             <Text className="font-extrabold text-yellow-400">
//                               {claim.war_req_id}
//                             </Text>
//                           </Text>
//                           <View
//                             className="rounded-full px-3 py-1"
//                             style={{
//                               backgroundColor: "#18181b",
//                               borderWidth: 1,
//                               borderColor: statusObj.color,
//                             }}
//                           >
//                             <Text
//                               className="font-bold text-xs"
//                               style={{
//                                 color: statusObj.color,
//                               }}
//                             >
//                               {statusObj.label}
//                             </Text>
//                           </View>
//                         </View>
//                         <Text className="text-zinc-200 mb-[1px]">
//                           Kit ID:{" "}
//                           <Text className="text-yellow-400 font-bold">
//                             {claim.kit_id}
//                           </Text>
//                         </Text>
//                         <Text className="text-zinc-200 mb-[1px]">
//                           Kit Number:{" "}
//                           <Text className="text-yellow-400 font-bold">
//                             {claim.kit_number}
//                           </Text>
//                         </Text>
//                         <Text className="text-zinc-400 text-xs mb-[1px]">
//                           Last Updated:{" "}
//                           {new Date(claim.status_updated_at).toLocaleString()}
//                         </Text>
//                         {claim.review_comment ? (
//                           <View className="bg-[#18181b] border border-[#f87171] rounded-lg mt-2 mb-1 px-3 py-2">
//                             <Text className="text-[#f87171] font-bold text-xs mb-1">
//                               Reviewer Comment
//                             </Text>
//                             <Text className="text-[#f87171] italic text-sm">
//                               {claim.review_comment}
//                             </Text>
//                           </View>
//                         ) : null}

//                         <Text className="text-zinc-400 text-xs">
//                           Submitted:{" "}
//                           {new Date(claim.created_at).toLocaleString()}
//                         </Text>
//                         {idx !== claimsForOrder.length - 1 && (
//                           <View className="h-[1px] bg-[#23232c] opacity-40 mt-3" />
//                         )}
//                         {/* ---- ADD THIS VIEW DETAILS BUTTON BELOW ---- */}
//                         <TouchableOpacity
//                           className="bg-blue-600 mt-3 py-2 px-4 rounded-lg items-center self-start"
//                           activeOpacity={0.9}
//                           onPress={() =>
//                             router.push({
//                               pathname: '/(main)/warranty/warranty-status-page', // CHANGE to your WarrantyStatusPage route!
//                               params: { war_req_id: claim.war_req_id }
//                             })
//                           }
//                         >
//                           <Text className="font-bold text-white text-base">View Details</Text>
//                         </TouchableOpacity>
//                         {/* ---- END BUTTON ---- */}
//                         {/* Other fields... */}
//                         {claim.status === "approved" && (
//                           <TouchableOpacity
//                             className="bg-yellow-400 mt-3 py-2 px-4 rounded-lg items-center self-start"
//                             activeOpacity={0.9}
//                             onPress={() =>
//                               router.push({
//                                 pathname: '/(main)/warranty/warranty-card',
//                                 params: { war_req_id: claim.war_req_id }
//                               })
//                             }
//                           >
//                             <Text className="font-bold text-black text-base">View Card</Text>
//                           </TouchableOpacity>
//                         )}

//                       </View>
//                     );
//                   })}
//                 </View>
//               )}
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }



import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  LayoutAnimation,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";

// --- TYPES ---
type WarrantyClaim = {
  war_req_id: string;
  order: { order_id: string } | null;
  kit_id: string;
  status: string;
  status_updated_at: string;
  review_comment?: string | null;
  created_at: string;
  kit_number: string;
};
type GroupedClaims = [string, WarrantyClaim[]];

// --- NAV BAR / LAYOUT ---
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- STATUS COLORS/labels ---
const STATUS_DISPLAY: Record<
  string,
  { label: string; color: string; faded: string }
> = {
  pending: { label: "Pending", color: "#facc15", faded: "#18181b" },
  under_review: { label: "Under Review", color: "#3b82f6", faded: "#18181b" },
  approved: { label: "Approved", color: "#22c55e", faded: "#18181b" },
  rejected: { label: "Rejected", color: "#f87171", faded: "#18181b" },
  cancelled: { label: "Cancelled", color: "#9ca3af", faded: "#18181b" },
};

// --- GROUPING ---
function groupClaimsByOrder(claims: WarrantyClaim[]): GroupedClaims[] {
  const map = new Map<string, WarrantyClaim[]>();
  for (const claim of claims) {
    const orderId = claim.order?.order_id ?? "Unknown";
    if (!map.has(orderId)) map.set(orderId, []);
    map.get(orderId)!.push(claim);
  }
  return Array.from(map.entries());
}

export default function ClaimStatusScreen() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/(main)/dashboard");
        return true;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  const {
    data: claims = [],
    isLoading,
    isRefetching: refreshing,
    isError,
    error,
    refetch,
  } = useQuery<WarrantyClaim[]>({
    queryKey: ["myWarrantyClaims"],
    queryFn: async () => {
      const res = await api.get<WarrantyClaim[]>("/warranty-claims-status/");
      return res.data;
    },
  });

  const grouped = groupClaimsByOrder(claims);

  const onRefresh = () => refetch();

  const toggleExpand = (orderId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#facc15" />
        <Text className="text-yellow-400 mt-4 font-bold">Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-black justify-center items-center px-6">
        <Text className="text-red-400 text-base mb-4 font-bold">
          Could not load warranty requests.
        </Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-yellow-400 px-6 py-3 rounded-xl"
        >
          <Text className="text-black font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black p-4">
      <FlatList
        keyExtractor={([orderId]) => orderId}
        data={grouped}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text className="text-zinc-400 text-center mt-16 text-lg font-semibold">
            No warranty Request found.
          </Text>
        }
        renderItem={({ item }) => {
          const [orderId, claimsForOrder] = item;
          const isOpen = !!expanded[orderId];

          return (
            <View className="bg-[#18181b] rounded-2xl mb-5 overflow-hidden border border-[#23232b]">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleExpand(orderId)}
                className="px-5 py-4 flex-row items-center justify-between bg-[#18181b]"
              >
                <View>
                  <Text className="text-white font-bold text-lg">
                    Order ID: <Text className="font-bold">{orderId}</Text>
                  </Text>
                  <Text className="text-[#a3a3a6] text-sm">
                    Number of Kits Ordered:{" "}
                    <Text className="font-bold">{claimsForOrder.length}</Text>
                  </Text>
                </View>
                <Text className="text-white text-[28px] font-bold">
                  {isOpen ? "▾" : "▸"}
                </Text>
              </TouchableOpacity>

              {isOpen && (
                <View className="bg-[#23232c] pt-2 pb-2 px-2 rounded-b-2xl">
                  {claimsForOrder.map((claim, idx) => {
                    const statusObj = STATUS_DISPLAY[claim.status] ?? {
                      label: claim.status,
                      color: "#facc15",
                      faded: "#18181b",
                    };
                    return (
                      <View
                        key={claim.war_req_id}
                        className="mb-4 rounded-xl px-4 py-3"
                        style={{
                          borderLeftWidth: 5,
                          borderLeftColor: statusObj.color,
                        }}
                      >
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-white font-bold text-base">
                            Request:{" "}
                            <Text className="font-extrabold text-yellow-400">
                              {claim.war_req_id}
                            </Text>
                          </Text>
                          <View
                            className="rounded-full px-3 py-1"
                            style={{
                              backgroundColor: "#18181b",
                              borderWidth: 1,
                              borderColor: statusObj.color,
                            }}
                          >
                            <Text
                              className="font-bold text-xs"
                              style={{
                                color: statusObj.color,
                              }}
                            >
                              {statusObj.label}
                            </Text>
                          </View>
                        </View>

                        <Text className="text-zinc-200 mb-[1px]">
                          Kit ID:{" "}
                          <Text className="text-yellow-400 font-bold">
                            {claim.kit_id}
                          </Text>
                        </Text>
                        <Text className="text-zinc-200 mb-[1px]">
                          Kit Number:{" "}
                          <Text className="text-yellow-400 font-bold">
                            {claim.kit_number}
                          </Text>
                        </Text>
                        <Text className="text-zinc-400 text-xs mb-[1px]">
                          Last Updated:{" "}
                          {new Date(claim.status_updated_at).toLocaleString()}
                        </Text>

                        {claim.review_comment ? (
                          <View className="bg-[#18181b] border border-[#f87171] rounded-lg mt-2 mb-1 px-3 py-2">
                            <Text className="text-[#f87171] font-bold text-xs mb-1">
                              Reviewer Comment
                            </Text>
                            <Text className="text-[#f87171] italic text-sm">
                              {claim.review_comment}
                            </Text>
                          </View>
                        ) : null}

                        <Text className="text-zinc-400 text-xs">
                          Submitted:{" "}
                          {new Date(claim.created_at).toLocaleString()}
                        </Text>

                        <View className="flex-row mt-3 gap-x-6">


                          <TouchableOpacity
                            className="bg-blue-600 py-2 px-4 rounded-lg items-center"
                            activeOpacity={0.9}
                            onPress={() =>
                              router.push({
                                pathname: "/(main)/warranty/warranty-status-page",
                                params: { war_req_id: claim.war_req_id },
                              })
                            }
                          >
                            <Text className="font-bold text-white text-base">
                              View Details
                            </Text>
                          </TouchableOpacity>

                          {claim.status === "approved" && (
                            <TouchableOpacity
                              className="bg-yellow-400 py-2 px-4 rounded-lg items-center"
                              activeOpacity={0.9}
                              onPress={() =>
                                router.push({
                                  pathname: "/(main)/warranty/warranty-card",
                                  params: { war_req_id: claim.war_req_id },
                                })
                              }
                            >
                              <Text className="font-bold text-black text-base">
                                View Card
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        {idx !== claimsForOrder.length - 1 && (
                          <View className="h-[1px] bg-[#23232c] opacity-40 mt-3" />
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}
