// import React, { useState } from 'react';
// import axios from 'axios';
// import { dataUrlToFile, getUploadedImageLink, toBase64 } from '../utils/utils';
// interface CertificateData {
//     serialNo: string;
//     certificateName: string;
//     description: string;
//     certificateNumber: string;
//     expiryDate: string;
//     consultantName: string;
//     toolsLocation: string;
//   }
// const CertificateUpload = () => {
//     const [file, setFile] = useState<File | null>(null);
//   const [data, setData] = useState<CertificateData[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState<Record<string, { pdf: string}>>({});
//   const [pdfFileData, setPdfFileData] = useState<any>('');

//   const handleUpload = async () => {
//     console.warn(file,"0000000000000000000000000000000000000000000000000000000000000000000")
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('files', file);

//     try {
//       setLoading(true);
//       const response = await axios.post('http://127.0.0.1:5000/api/fileUploader/pdfUploader', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target?.files?.[0];
  
//     if (selectedFile) {
//       const reader = new FileReader();
  
//       reader.onload = (event) => {
//         handlePdfLinking(selectedFile);
//       };
  
//       reader.readAsDataURL(selectedFile);
//     }
//   };
  
//   const handlePdfLinking = async (file: File) => {
//     const imageLink = await getUploadedImageLink(file);
  
//     setUploadedImages((prevImages) => {
//       const updatedImages = { ...prevImages };
  
    
//         updatedImages["Certificates"] = {
//           ...updatedImages["Certificates"],
//           pdf: imageLink,
//         };

  
//       console.log('Updated Images:', updatedImages);
//       return updatedImages;
//     });
//   };

//   const handleFrontUpload = async (selectedFile: File | null | undefined) => {
//     setShowLoader(true);
//      if (!selectedFile) return;

//     try {


//       const formData = new FormData();
//       if (selectedFile) {
//         formData.append('CertificatePdf', selectedFile, selectedFile.name);
//         formData.append('FileType', selectedFile.type);
       
//       }
//       const syntheticEvent = {
//         target: {
//           files: [selectedFile],
//         },
//       } as unknown as React.ChangeEvent<HTMLInputElement>;
//       handlePdfUpload(syntheticEvent);
    

//       const res = await fetch('http://127.0.0.1:5000/api/fileUploader/pdfUploader', {
//         method: 'POST',
//         body: formData,
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setPdfFileData(data);

//       // Check for any document uploading status here
//       // const anyDocumentUploading = documentUploadStatus.some(
//       //   status => status.frontUploaded || status.backUploaded || status.uploading
//       // );


//       }
//     } catch (error) {
//       console.error('Error with sending the POST request:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload PDF and Extract Data</h1>
//       <input
//                         type="file"
            
                       
//                         // ref={frontFileInputRefs[index]} // Accessing RefObject at index directly
//                         onChange={(event) => {
//                           console.warn("pxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                          
//                             const selectedFrontFile = event.target.files?.[0];
//                             if (selectedFrontFile) {
//                               console.warn("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiissssssssssss");
                              
//                               handleFrontUpload(selectedFrontFile);
//                             }
                          
//                         }}
                        
//                       />

//       <button
//         onClick={handleUpload}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//         disabled={loading}
//       >
//         {loading ? 'Uploading...' : 'Upload PDF'}
//       </button>

//       {data.length > 0 && (
//         <table className="table-auto w-full mt-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Serial No</th>
//               <th className="px-4 py-2">Certificate Name</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">Certificate Number</th>
//               <th className="px-4 py-2">Expiry Date</th>
//               <th className="px-4 py-2">Consultant Name</th>
//               <th className="px-4 py-2">Tools Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((cert, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{cert.serialNo}</td>
//                 <td className="border px-4 py-2">{cert.certificateName}</td>
//                 <td className="border px-4 py-2">{cert.description}</td>
//                 <td className="border px-4 py-2">{cert.certificateNumber}</td>
//                 <td className="border px-4 py-2">{cert.expiryDate}</td>
//                 <td className="border px-4 py-2">{cert.consultantName}</td>
//                 <td className="border px-4 py-2">{cert.toolsLocation}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CertificateUpload;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import Modal from 'react-modal';
import ProgressBar from './progressBar';
import { getUploadedImageLink } from '../utils/utils';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import PdfModal from './pdfModal';

interface DocumentAttributes {
  certificateName: string;
  issuerName: string;
}

interface DocumentData {
  _id: {
    $oid: string;
  };
  document_name: string;
  document_id: string;
  attributes: {
    certificateName: string;
    issuerName: string;
  };
  expiry: Date;
  front_image: string;
}

interface FileData {
  documents: DocumentData[];
}
interface CommonCertificateProps {
  contractorId?: string;
  project_name?: string;
}

const CertificateUploader: React.FC<CommonCertificateProps> = ({ contractorId, project_name }) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [frontFileData, setFrontFileData] = useState<any>(null);
  const [uploadedImageLink, setUploadedImageLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [deletedRowIndex, setDeletedRowIndex] = useState<null | number>(null);

  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);


  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPdfFile(file);
      setIsImageUploading(true);
      setProgress(10);
      const imageLink = await handleImageUpload(file);
      setUploadedImageLink(imageLink);
      setIsImageUploading(false);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPdfDataUrl(reader.result as string);
          setProgress(100);
          setIsModalOpen(true); // Open the modal as soon as the file is read
          setSelectedDocumentUrl(reader.result as string); // Set the selected document URL
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setProgress(30);
    const imageLink = await getUploadedImageLink(file);
    setProgress(60);
    return imageLink;
  };

  const handleFileUpload = async () => {
    if (!pdfFile || !uploadedImageLink) return;

    setShowLoader(true);
    setProgress(70);

    const formData = new FormData();
    formData.append('CertificatePdf', pdfFile, pdfFile.name);
    formData.append('FileType', pdfFile.type);
    formData.append('organisation_id', contractorId || 'promaestro');
    formData.append('project_id', project_name || 'promaestro');

    if (uploadedImageLink) {
      formData.append('front_image', uploadedImageLink);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/fileUploader/pdfUploader', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setFrontFileData(response.data);
        setResponseText(response.data.text);
        fetchDocumentData();
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error with sending the POST request:', error);
    } finally {
      setShowLoader(false);
      setProgress(100);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  const openModal = (url: string) => {
    setSelectedDocumentUrl(url);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (uploadedImageLink) {
      setIsModalOpen(true); // Automatically open modal when the uploadedImageLink is set
    }
  }, [uploadedImageLink]);

  const fetchDocumentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/documents/${project_name}`, {
        params: {
          is_personel_document: true
        }
      });

      const { data } = response;
      setFileData(data);
    } catch (error) {
      console.error('Error fetching document data:', error);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    if (!fileData) return;

    const updatedDocuments = fileData.documents.map((doc, index) => {
      if (index === rowIndex) {
        switch (columnIndex) {
          case 0: // document_name
            return { ...doc, document_name: e.target.value };
          case 1: // document_id
            return { ...doc, document_id: e.target.value };
          case 2: // certificateName
            return {
              ...doc,
              attributes: {
                ...doc.attributes,
                certificateName: e.target.value,
              },
            };
          case 3: // issuerName
            return {
              ...doc,
              attributes: {
                ...doc.attributes,
                issuerName: e.target.value,
              },
            };
          case 4: // expiry
            const updatedExpiry = new Date(e.target.value);
            return { ...doc, expiry: updatedExpiry };
          default:
            return doc;
        }
      }
      return doc;
    });

    setFileData({ ...fileData, documents: updatedDocuments });
  };

  const handleInputBlur = async (rowIndex: number, columnIndex: number) => {
    const docToUpdate = fileData?.documents[rowIndex];
    if (docToUpdate) {
      try {
        let fieldToUpdate: Partial<DocumentData> | undefined;
        switch (columnIndex) {
          case 0:
            fieldToUpdate = { document_name: docToUpdate.document_name };
            break;
          case 1:
            fieldToUpdate = { document_id: docToUpdate.document_id };
            break;
          case 2:
            fieldToUpdate = {
              attributes: {
                ...docToUpdate.attributes,
                certificateName: docToUpdate.attributes.certificateName,
              },
            };
            break;
          case 3:
            fieldToUpdate = {
              attributes: {
                ...docToUpdate.attributes,
                issuerName: docToUpdate.attributes.issuerName,
              },
            };
            break;
          case 4:
            fieldToUpdate = { expiry: docToUpdate.expiry };
            break;
          default:
            break;
        }

        if (fieldToUpdate) {
          const response = await axios.put(
            `http://localhost:5000/api/documents/${project_name}/${docToUpdate._id}`,
            fieldToUpdate,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          console.log('Document updated successfully:', response.data);
        }
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/documents/${project_name}`, {
          params: {
            is_personel_document: false,
          },
        });

        const { data } = response;
        setFileData(data);
      } catch (error) {
        console.error('Error fetching document data:', error);
      }
    };

    fetchData();
  }, [project_name]);

  

  const handleDeleteRow = async (rowIndex: number) => {
    if (!fileData || !fileData.documents) return; // Check for null values
    setDeletedRowIndex(rowIndex);
    const docToDelete = fileData.documents[rowIndex];

    try {
      const response = await axios.delete(`http://localhost:5000/api/documents/${project_name}/${docToDelete._id}`);

      if (response.status === 200) {
        // Remove the deleted document from fileData
        const updatedDocuments = fileData.documents.filter((doc, index) => index !== rowIndex);
        // Update fileData (assuming fileData is mutable)
        fileData.documents = updatedDocuments;

        console.log('Document deleted successfully:', response.data);
      } else {
        console.error('Failed to delete document:', response.data);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
  useEffect(() => {
    if (deletedRowIndex !== null) {
      const timeoutId = setTimeout(() => {
        resetDeletedRowIndex();
      }, 1000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [deletedRowIndex]);
  const resetDeletedRowIndex = () => {
    setDeletedRowIndex(null);
  };
 
  
  return (
    <div className="app-container p-4 w-auto mx-auto bg-[var(--mainTitleLightestColor)] min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-center text-[var(--mainTitleColor)]">Certificate Uploader</h1>
    <div className="flex flex-col items-center mb-6">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--primaryColor)] file:text-[var(--mainTitleLightestColor)] hover:file:bg-yellow-400 mb-4"
      />
      <button
        onClick={handleFileUpload}
        disabled={!pdfFile || isImageUploading || !uploadedImageLink}
        className="bg-[var(--primaryColor)] text-[var(--mainTitleLightestColor)] px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        Upload PDF
      </button>
    </div>
    {showLoader && <p className="text-center text-gray-500 mb-4">Loading...</p>}
    {frontFileData && (
      <div className="data-container bg-[var(--lightBackgroundColor)] p-6 rounded shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--mainTitleColor)]">Extracted Data:</h2>
        <p className="mb-2"><strong>Issuer Name:</strong> {frontFileData.issuerName}</p>
        <p className="mb-2"><strong>Serial No:</strong> {frontFileData.serialNo}</p>
        <p className="mb-2"><strong>Certificate Number:</strong> {frontFileData.certificateNumber}</p>
        <p className="mb-2"><strong>Certificate Name:</strong> {frontFileData.certificateName}</p>
        <p className="mb-2"><strong>Date Of Expiry:</strong> {new Date(frontFileData.dateOfExpiry).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Date Of Inspection:</strong> {new Date(frontFileData.dateOfInspection).toLocaleDateString()}</p>
      </div>
    )}
    {isImageUploading && <ProgressBar />}
    {pdfDataUrl && (
      <button
        onClick={() => openModal(pdfDataUrl)}
        className="bg-[var(--primaryColor)] text-[var(--mainTitleLightestColor)] px-4 py-2 rounded mb-4"
      >
        View PDF
      </button>
    )}
    <div>
      {fileData && fileData.documents && (
        <div className="overflow-auto">
          <table className="document-table w-full mt-4 border-collapse bg-white">
            <thead>
              <tr className="bg-[var(--mainTitleLightColor)] text-white">
                <th className="border p-2">Document Name</th>
                <th className="border p-2">Document Id/Certificate No.</th>
                <th className="border p-2">Certificate Name</th>
                <th className="border p-2">Issuer Name</th>
                <th className="border p-2">Expiry Date</th>
                <th className="border p-2">View Document</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fileData.documents.map((doc, rowIndex) => (
                <tr
                  key={doc._id.$oid}
                  className={rowIndex === deletedRowIndex ? 'highlight-row' : ''}
                >
                  <td className="border p-2">
                    <input
                      type="text"
                      value={doc.document_name}
                      onChange={(e) => handleInputChange(e, rowIndex, 0)}
                      onBlur={() => handleInputBlur(rowIndex, 0)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={doc.document_id}
                      onChange={(e) => handleInputChange(e, rowIndex, 1)}
                      onBlur={() => handleInputBlur(rowIndex, 1)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={doc.attributes.certificateName}
                      onChange={(e) => handleInputChange(e, rowIndex, 2)}
                      onBlur={() => handleInputBlur(rowIndex, 2)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={doc.attributes.issuerName}
                      onChange={(e) => handleInputChange(e, rowIndex, 3)}
                      onBlur={() => handleInputBlur(rowIndex, 3)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      value={doc.expiry ? new Date(doc.expiry).toISOString().split('T')[0] : ''}
                      type="date"
                      onChange={(e) => handleInputChange(e, rowIndex, 4)}
                      onBlur={() => handleInputBlur(rowIndex, 4)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => openModal(doc.front_image)}
                      className="text-blue-600 underline"
                    >
                      View PDF
                    </button>
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(rowIndex)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <PdfModal isOpen={isModalOpen} onRequestClose={closeModal} fileUrl={selectedDocumentUrl} />
  </div>
  );
};

export default CertificateUploader;
