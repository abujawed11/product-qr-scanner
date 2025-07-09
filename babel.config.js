// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],
//     plugins: [
//       "react-native-reanimated/plugin", // ✅ This must be the last plugin
//     ],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//     ],
//     plugins: [
//       "nativewind/babel",
//       "expo-router/babel",               // ✅ Required for expo-router 5.x
//       "react-native-reanimated/plugin",  // ✅ Must be last
//     ],
//   };
// };



// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//     ],
//     plugins: [
//       "nativewind/babel", // ✅ Move here
//       "react-native-reanimated/plugin", // ✅ Always LAST
//     ],
//   };
// };

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }]
//     ],
//     plugins: [
//       "nativewind/babel",
//       "react-native-reanimated/plugin" // Must be LAST
//     ]
//   };
// };

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       ["nativewind/babel"],
//       "react-native-reanimated/plugin" // 👈 must be last
//     ]
//   };
// };
