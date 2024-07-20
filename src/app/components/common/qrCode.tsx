// // components/QRScanner.tsx
// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';
// import axios from 'axios';

// const QRScanner: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleScan = async (data: any) => {
//     if (data) {
//       try {
//         const response = await axios.get(`/api/users/profile/${data}`);
//         setUser(response.data);
//       } catch (err) {
//         console.error('Error fetching user data', err);
//         setError('Error fetching user data');
//       }
//     }
//   };

//   const handleError = (err: any) => {
//     console.error('Error accessing camera:', err);
//     setError('Error accessing camera');
//   };

//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h2>QR Code Scanner</h2>
//       <div style={{ margin: '0 auto', width: '320px' }}>
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={previewStyle}
//         />
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {user && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>User Profile</h3>
//           <p>Username: {user.username}</p>
//           <p>Email: {user.email}</p>
//           {user.qrCode && <img src={user.qrCode} alt="User QR Code" />}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QRScanner;
// components/QRScanner.tsx
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';
import axios from 'axios';

const QRScanner: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (data: any) => {
    if (data) {
      try {
        const response = await axios.get(`/api/users/profile/${data}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data', err);
        setError('Error fetching user data');
      }
    }
  };

  const handleError = (err: any) => {
    console.error('Error accessing camera:', err);
    setError('Error accessing camera');
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>QR Code Scanner</h2>
      <div style={{ margin: '0 auto', width: '320px' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && (
        <div style={{ marginTop: '20px' }}>
          <h3>User Profile</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {user.qrCode && <img src={user.qrCode} alt="User QR Code" />}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
