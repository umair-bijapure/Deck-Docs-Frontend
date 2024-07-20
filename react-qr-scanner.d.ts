declare module 'react-qr-scanner' {
    import * as React from 'react';
  
    interface QrReaderProps {
      delay?: number | false;
      facingMode?: 'user' | 'environment';
      legacyMode?: boolean;
      resolution?: number;
      showViewFinder?: boolean;
      style?: React.CSSProperties;
      onScan?: (data: string | null) => void;
      onError?: (error: any) => void;
    }
  
    const QrReader: React.FC<QrReaderProps>;
    export default QrReader;
  }
  