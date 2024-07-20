'use client';
import { CommonSectionHeadings } from "@/app/components/common/bannersAndheadings"


import Image from 'next/image'; 
import { useState } from "react";
import { Collapsible, CollapsibleComponent } from "./common/collapsible";
import { CommonInput, CommonTextInput } from "./common/inputs";


export default function CommonSalary({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    // Make sure to import the Image component

  
    return (
        <>
        <div className="flex">
        <Collapsible>
                          <CollapsibleComponent expanded={true} leftIcon={'Salary and Allowance'} >
                              <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-2 mt-4'>
                                {/*  <CommonInput label='Basic'/> */}
                                <CommonInput label={"Basic"}/>
                                 <CommonInput label='Food'/>
                                 <CommonInput label='Other'/>
                                 <CommonInput label='Special'/>
                                 <CommonInput label='Total Salary'/>
                                
                              </div>
                          </CollapsibleComponent>
                          <CollapsibleComponent expanded={true} leftIcon={'Unit Rate'} >
                              <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-2 mt-4'>
                                 <CommonInput label='Salary'/>
                                 <CommonInput label='SL Rate'/>
                                 <CommonInput label='Over Time'/>
                                 <CommonInput label='Absent Fine'/>
                                
                              </div>
                          </CollapsibleComponent>
                          <CollapsibleComponent expanded={true} leftIcon={'Working Hours'} >
                              <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-2 mt-4'>
                                 <CommonInput label='Days'/>
                                 <CommonInput label='Over Time 125%'/>
                                 <CommonInput label='Over Time 150%'/>
                                 <CommonInput label='Over Time 200%'/>
                                 <CommonInput label='Normal'/>
                                 <CommonInput label='Holidays'/>
                                 <CommonInput label='SL'/>
                                 <CommonInput label='Fine HR'/>
                                
                              </div>
                          </CollapsibleComponent>
                          <CollapsibleComponent expanded={true} leftIcon={'Payable Amount'} >
                              <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-2 mt-4'>
                                 <CommonInput label='Salary'/>
                                 <CommonInput label='Over Time 125%'/>
                                 <CommonInput label='Over Time 150%'/>
                                 <CommonInput label='Over Time 200% '/>
                                 <CommonInput label='Sick Leave'/>
                                 <CommonInput label='Holidays'/>
                                 <CommonInput label='Total'/>
                                
                              </div>
                          </CollapsibleComponent>
                              <div className='flex border-2 mt-4  w-full gap-x-1 rounded-2xl p-4 mb-4'>
                                 <CommonInput label='Deductions'/>
                                 <CommonInput label='Net Payable Salary'/>
                              </div>
                        </Collapsible>
        </div>
        </>
    )
  }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProgressBar from './common/progressBar';
// import { CommonInput } from './common/inputs';

// interface DocumentData {
//   _id: {
//     $oid: string;
//   };
//   document_name: string;
//   document_id: string;
//   attributes: {
//     certificateName: string;
//     issuerName: string;
//   };
//   expiry: Date;
//   front_image: string;
// }

// interface FileData {
//   documents: DocumentData[];
// }
// interface CommonCertificateProps {
//   contractorId?: string;
//   name?: string;
//   phone_no?:string;
// }

// const SalarySheet: React.FC<CommonCertificateProps> = ({ contractorId, phone_no,name }) => {
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
//   const [responseText, setResponseText] = useState<string | null>(null);
//   const [showLoader, setShowLoader] = useState<boolean>(false);
//   const [frontFileData, setFrontFileData] = useState<any>(null);
//   const [uploadedImageLink, setUploadedImageLink] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
//   const [progress, setProgress] = useState<number>(0);
//   const [fileData, setFileData] = useState<FileData | null>(null);
//   const [deletedRowIndex, setDeletedRowIndex] = useState<null | number>(null);
//   const [credit, setCredit] = useState('');
//   const [debit, setDebit] = useState('');
//   const [balance, setBalance] = useState('');
//   const [date, setDate] = useState<Date | Date[] | null>(null);
//   const [particulars, setParticulars] = useState('');



//   const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);


//   const handleFileUpload = async () => {
//     if (!pdfFile || !uploadedImageLink) return;

//     setShowLoader(true);
//     setProgress(70);

//     const formData = new FormData();
//     formData.append('', pdfFile, pdfFile.name);
//     formData.append('FileType', pdfFile.type);
//     formData.append('organisation_id', contractorId || 'promaestro');
   

//     if (uploadedImageLink) {
//       formData.append('front_image', uploadedImageLink);
//     }

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/fileUploader/pdfUploader', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setFrontFileData(response.data);
//         setResponseText(response.data.text);
//         fetchDocumentData();
//       } else {
//         console.error('Error uploading file:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error with sending the POST request:', error);
//     } finally {
//       setShowLoader(false);
//       setProgress(100);
//     }
//   };

//   const closeModal = () => setIsModalOpen(false);
//   const openModal = (url: string) => {
//     setSelectedDocumentUrl(url);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     if (uploadedImageLink) {
//       setIsModalOpen(true); // Automatically open modal when the uploadedImageLink is set
//     }
//   }, [uploadedImageLink]);

//   const fetchDocumentData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/documents/${project_name}`, {
//         params: {
//           is_personel_document: true
//         }
//       });

//       const { data } = response;
//       setFileData(data);
//     } catch (error) {
//       console.error('Error fetching document data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDocumentData();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     rowIndex: number,
//     columnIndex: number
//   ) => {
//     if (!fileData) return;

//     const updatedDocuments = fileData.documents.map((doc, index) => {
//       if (index === rowIndex) {
//         switch (columnIndex) {
//           case 0: // document_name
//             return { ...doc, document_name: e.target.value };
//           case 1: // document_id
//             return { ...doc, document_id: e.target.value };
//           case 2: // certificateName
//             return {
//               ...doc,
//               attributes: {
//                 ...doc.attributes,
//                 certificateName: e.target.value,
//               },
//             };
//           case 3: // issuerName
//             return {
//               ...doc,
//               attributes: {
//                 ...doc.attributes,
//                 issuerName: e.target.value,
//               },
//             };
//           case 4: // expiry
//             const updatedExpiry = new Date(e.target.value);
//             return { ...doc, expiry: updatedExpiry };
//           default:
//             return doc;
//         }
//       }
//       return doc;
//     });

//     setFileData({ ...fileData, documents: updatedDocuments });
//   };

//   const handleInputBlur = async (rowIndex: number, columnIndex: number) => {
//     const docToUpdate = fileData?.documents[rowIndex];
//     if (docToUpdate) {
//       try {
//         let fieldToUpdate: Partial<DocumentData> | undefined;
//         switch (columnIndex) {
//           case 0:
//             fieldToUpdate = { document_name: docToUpdate.document_name };
//             break;
//           case 1:
//             fieldToUpdate = { document_id: docToUpdate.document_id };
//             break;
//           case 2:
//             fieldToUpdate = {
//               attributes: {
//                 ...docToUpdate.attributes,
//                 certificateName: docToUpdate.attributes.certificateName,
//               },
//             };
//             break;
//           case 3:
//             fieldToUpdate = {
//               attributes: {
//                 ...docToUpdate.attributes,
//                 issuerName: docToUpdate.attributes.issuerName,
//               },
//             };
//             break;
//           case 4:
//             fieldToUpdate = { expiry: docToUpdate.expiry };
//             break;
//           default:
//             break;
//         }

//         if (fieldToUpdate) {
//           const response = await axios.put(
//             `http://localhost:5000/api/documents/${project_name}/${docToUpdate._id}`,
//             fieldToUpdate,
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );

//           console.log('Document updated successfully:', response.data);
//         }
//       } catch (error) {
//         console.error('Error updating document:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user/salary/${phon_no}`, {
//           params: {
//             is_personel_document: false,
//           },
//         });

//         const { data } = response;
//         setFileData(data);
//       } catch (error) {
//         console.error('Error fetching document data:', error);
//       }
//     };

//     fetchData();
//   }, [phone_no]);

  

//   const handleDeleteRow = async (rowIndex: number) => {
//     if (!fileData || !fileData.documents) return; // Check for null values
//     setDeletedRowIndex(rowIndex);
//     const docToDelete = fileData.documents[rowIndex];

//     try {
//       const response = await axios.delete(`http://localhost:5000/api/documents/${project_name}/${docToDelete._id}`);

//       if (response.status === 200) {
//         // Remove the deleted document from fileData
//         const updatedDocuments = fileData.documents.filter((doc, index) => index !== rowIndex);
//         // Update fileData (assuming fileData is mutable)
//         fileData.documents = updatedDocuments;

//         console.log('Document deleted successfully:', response.data);
//       } else {
//         console.error('Failed to delete document:', response.data);
//       }
//     } catch (error) {
//       console.error('Error deleting document:', error);
//     }
//   };
//   useEffect(() => {
//     if (deletedRowIndex !== null) {
//       const timeoutId = setTimeout(() => {
//         resetDeletedRowIndex();
//       }, 1000);
  
//       return () => clearTimeout(timeoutId);
//     }
//   }, [deletedRowIndex]);
//   const resetDeletedRowIndex = () => {
//     setDeletedRowIndex(null);
//   };

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedDateString = event.target.value;
//     const selectedDate2 = new Date(selectedDateString);
//     setDate(selectedDate2);
//   };
//   return (
//     <div className="app-container p-4 w-auto mx-auto bg-[var(--mainTitleLightestColor)] min-h-screen">
//     <h1 className="text-3xl font-bold mb-6 text-center text-[var(--mainTitleColor)]">Certificate Uploader</h1>
//     <div className="flex flex-col items-center mb-6">
//     <input
//           type="date"
//           className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1  placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-xl sm:text-sm focus:ring-1 w-full"
//           onChange={handleDateChange}
//           // max={currentDate.toISOString().split('T')[0]} // Set max date
//         />
//         <CommonInput 
//           label='Particulars'
//           onChange={(e) => {setParticulars(e.target.value);}} 
//         />
//        <CommonInput 
//           label='Credit'
//           onChange={(e) => {setCredit(e.target.value);}} 
//         />
//        <CommonInput 
//           label='Debit' 
//           onChange={(e) => {setDebit(e.target.value);}} 
//        />
//         <CommonInput 
//           label='Balance' 
//           onChange={(e) => {setBalance(e.target.value);}} 
//           isDisabled={true}
//        />
//       <button
//         onClick={handleFileUpload}
//         disabled={!credit || !debit }
//         className="bg-[var(--primaryColor)] text-[var(--mainTitleLightestColor)] px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mb-4"
//       >
//         Upload PDF
//       </button>
//     </div>
//     {showLoader && <p className="text-center text-gray-500 mb-4">Loading...</p>}

//     {isImageUploading && <ProgressBar />}

//     <div>
//       {fileData && fileData.documents && (
//         <div className="overflow-auto">
//           <table className="document-table w-full mt-4 border-collapse bg-white">
//             <thead>
//               <tr className="bg-[var(--mainTitleLightColor)] text-white">
//                 <th className="border p-2">Particulars</th>
//                 <th className="border p-2">Credit</th>
//                 <th className="border p-2">Debit</th>
//                 <th className="border p-2">Balance</th>
//                 <th className="border p-2">Expiry Date</th>
//                 <th className="border p-2">View Details</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fileData.documents.map((doc, rowIndex) => (
//                 <tr
//                   key={doc._id.$oid}
//                   className={rowIndex === deletedRowIndex ? 'highlight-row' : ''}
//                 >
//                   <td className="border p-2">
//                     <input
//                       type="text"
//                       value={doc.document_name}
//                       onChange={(e) => handleInputChange(e, rowIndex, 0)}
//                       onBlur={() => handleInputBlur(rowIndex, 0)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="border p-2">
//                     <input
//                       type="text"
//                       value={doc.document_id}
//                       onChange={(e) => handleInputChange(e, rowIndex, 1)}
//                       onBlur={() => handleInputBlur(rowIndex, 1)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="border p-2">
//                     <input
//                       type="text"
//                       value={doc.attributes.certificateName}
//                       onChange={(e) => handleInputChange(e, rowIndex, 2)}
//                       onBlur={() => handleInputBlur(rowIndex, 2)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="border p-2">
//                     <input
//                       type="text"
//                       value={doc.attributes.issuerName}
//                       onChange={(e) => handleInputChange(e, rowIndex, 3)}
//                       onBlur={() => handleInputBlur(rowIndex, 3)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="border p-2">
//                     <input
//                       value={doc.expiry ? new Date(doc.expiry).toISOString().split('T')[0] : ''}
//                       type="date"
//                       onChange={(e) => handleInputChange(e, rowIndex, 4)}
//                       onBlur={() => handleInputBlur(rowIndex, 4)}
//                       className="w-full px-2 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="border p-2 text-center">
//                     <button
//                       onClick={() => openModal(doc.front_image)}
//                       className="text-blue-600 underline"
//                     >
//                       View PDF
//                     </button>
//                   </td>
//                   <td className="border p-2 text-center">
//                     <button
//                       onClick={() => handleDeleteRow(rowIndex)}
//                       className="bg-red-500 text-white py-1 px-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   </div>
//   );
// };

// export default SalarySheet;
