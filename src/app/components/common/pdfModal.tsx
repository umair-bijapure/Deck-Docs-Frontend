// PdfModal.tsx
import React from 'react';
import Modal from 'react-modal';
import { Document, Page } from 'react-pdf';

interface PdfModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  fileUrl: string | null;
}

const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onRequestClose, fileUrl }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="PDF Viewer"
    className="pdf-modal fixed inset-0 bg-white p-6 rounded shadow-lg overflow-auto"
    overlayClassName="pdf-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <button
      className="close-button absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1"
      onClick={onRequestClose}
    >
      ×
    </button>
    <div className="pdf-content">
      {fileUrl && (
        <Document file={fileUrl}>
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  </Modal>
);

export default PdfModal;
