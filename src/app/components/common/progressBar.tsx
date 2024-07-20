import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = () => {
  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', marginTop: '10px', position: 'relative' }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, #4caf50, transparent)',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translateX(-100%)',
        animation: 'loading 1.5s infinite'
      }}></div>
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;






interface FileUploadProgressBarProps {
  currentFileIndex: number;
  totalFiles: number;
}

export const FileUploadProgressBar: React.FC<FileUploadProgressBarProps> = ({ currentFileIndex, totalFiles }) => {
  const progressPercentage = (currentFileIndex / totalFiles) * 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#00bcd4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginRight: '10px' }}>
          {currentFileIndex + 1}
        </div>
        <div style={{ flex: 1, height: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', position: 'relative' }}>
          <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: '#007bff', borderRadius: '5px', transition: 'width 0.5s ease-in-out' }}></div>
        </div>
      </div>
      <div style={{ marginLeft: '10px' }}>
        {`In progress | ${currentFileIndex + 1} / ${totalFiles} files`}
      </div>
    </div>
  );
};










