import React, { useState, useEffect, useRef } from 'react';
import './offLine.css';

enum ConnectionStatus {
  Online,
  Offline,
  SwitchingOnline,
}

const OfflineModal: React.FC = () => {
  const [connStatus, setConnStatus] = useState<ConnectionStatus>(ConnectionStatus.Online);
  const connStatusRef = useRef(connStatus);
  connStatusRef.current = connStatus;

  useEffect(() => {
    const toggleOffline = (): void => {
      setConnStatus(ConnectionStatus.Offline);
    };

    let timer: NodeJS.Timeout | undefined;

    const toggleOnline = (): void => {
      setConnStatus(ConnectionStatus.SwitchingOnline);
      timer = setTimeout(() => {
        if (connStatusRef.current !== ConnectionStatus.Offline) {
          setConnStatus(ConnectionStatus.Online);
        }
      }, 2000);
    };

    window.addEventListener('online', toggleOnline);
    window.addEventListener('offline', toggleOffline);

    return () => {
      window.removeEventListener('online', toggleOnline);
      window.removeEventListener('offline', toggleOffline);
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div className="offline-container">
      <p>Connection Status: {ConnectionStatus[connStatus]}</p>
    </div>
  );
};

export default OfflineModal;
