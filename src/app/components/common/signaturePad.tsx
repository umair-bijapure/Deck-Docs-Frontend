import React, { useRef, useState } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';

interface ESignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSignature: (signatureData: string) => void;
}

const ESignaturePad: React.FC<ESignaturePadProps> = ({
  isOpen,
  onClose,
  onUploadSignature,
}) => {
  const signatureCanvasRef = useRef<ReactSignatureCanvas | null>(null);
  const [signatureData, setSignatureData] = useState('');

  const handleClearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
      setSignatureData('');
    }
  };

  const handleSaveSignature = () => {
    if (signatureCanvasRef.current) {
      const data = signatureCanvasRef.current.toDataURL();
      setSignatureData(data);
      onUploadSignature(data);
      
    }
  };

  return (
    <div >
      <div className="border-2">
        <h2>Add Signature</h2>
        <ReactSignatureCanvas
          ref={signatureCanvasRef}
          canvasProps={{ width: 500, height: 200 }}
        />
        <div className="flex justify-between bg-[color:var(--lightBackgroundGreyColor)] p-2">
          <button onClick={handleClearSignature} className='bg-[color:var(--primaryColor)] rounded-md p-1 text-white'>Clear Signature</button>
          <button onClick={handleSaveSignature} className='bg-[color:var(--primaryColor)] rounded-md p-1 text-white'>Save Signature</button>
          
        </div>
      </div>
    </div>
  );
};

export default ESignaturePad;
