import { Network } from '@capacitor/network';
import { useEffect, useState } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    let isMounted = true;

    // Check status on startup
    Network.getStatus().then((status) => {
      if (isMounted) {
        setIsOnline(status.connected);
        setConnectionType(status.connectionType);
      }
    }).catch(() => {
      // Fallback to browser navigator
      if (isMounted) setIsOnline(navigator.onLine);
    });

    // Listen to network status change events
    const listenerPromise = Network.addListener('networkStatusChange', (status) => {
      if (isMounted) {
        setIsOnline(status.connected);
        setConnectionType(status.connectionType);
      }
    });

    // Also attach standard window events for maximum PWA compatibility
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      listenerPromise.then((handle) => handle.remove()).catch(() => {});
    };
  }, []);

  return { isOnline, connectionType };
}
