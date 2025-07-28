// import { Stack } from "expo-router";

// export default function WarrantyLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       {/* Let tab navigator manage its own "header" via options */}
//       <Stack.Screen name="claim-form" options={{ title: "Request Warranty" }} />
//       <Stack.Screen name="claim-status" options={{ title: "Warranty Status" }} />
//       {/* ...other screens */}
//     </Stack>
//   );
// }


// warranty/_layout.tsx

// import { Stack, useRouter } from "expo-router";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// export default function WarrantyLayout({ route }) {
//   // Helper to determine active tab route name:
//   const activeRouteName = getFocusedRouteNameFromRoute(route) ?? "Request Warranty";
//   // Map route names to titles:
//   const headerTitles = {
//     "Request Warranty": "Request Warranty",
//     "Warranty Status": "Warranty Status"
//   };

//   return (
//     <Stack
//       screenOptions={{
//         // Dynamically set the header title based on selected tab
//         headerTitle: headerTitles[activeRouteName] ?? "Warranty",
//       }}
//     />
//   );
// }

// app/(main)/warranty/_layout.tsx
// import { Stack } from "expo-router";
// export default function Layout() {
//     return <Stack
//         screenOptions={{
//             headerShown: false
//         }}
//     />;
// }

import { Slot } from "expo-router";

export default function WarrantyLayout() {
  return <Slot />;
}
