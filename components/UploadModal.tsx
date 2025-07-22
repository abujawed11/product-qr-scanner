// components/UploadModal.tsx
import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

export function UploadModal({ visible, progress }: { visible: boolean, progress: number }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
        <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FACC15" />
          <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
            {progress < 100
              ? `Uploading... ${Math.round(Math.max(0, Math.min(progress, 100)))}%`
              : "Processing..."}
          </Text>
        </View>
      </View>
    </Modal>
  );
}


// export function UploadModal({ visible, progress }: { visible: boolean, progress: number }) {
//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View style={{
//         flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
//       }}>
//         <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#FACC15" />
//           <Text style={{ marginVertical: 16, color: "#222", fontWeight: "bold" }}>
//             Uploading... {Math.round(Math.max(0, Math.min(progress, 100)))}%
//           </Text>
//         </View>
//       </View>
//     </Modal>
//   );
// }
