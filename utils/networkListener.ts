import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { QueryClient } from '@tanstack/react-query';

export const setupNetworkListener = (queryClient: QueryClient) => {
  // Listen for network state changes
  const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
    console.log('Network status changed:', state.isConnected);
    
    if (state.isConnected) {
      // When network is restored, refetch all failed queries
      console.log('📶 Network restored - refetching queries');
      
      // Invalidate all queries to force refetch
      queryClient.invalidateQueries();
      
      // Resume paused queries
      queryClient.resumePausedMutations();
    } else {
      console.log('📵 Network lost');
    }
  });

  return unsubscribe;
};
