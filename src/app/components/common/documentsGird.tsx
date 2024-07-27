'use client';
import React, { useEffect, useRef, useState ,Ref, RefObject, forwardRef, useImperativeHandle } from 'react';
import { FaCheck, FaCheckCircle} from 'react-icons/fa';
import { CommonInput} from './inputs';// Import your CommonTextInput component
import 'react-calendar/dist/Calendar.css'; 
import {  getUploadedImageLink, toBase64 } from '../utils/utils';
import axios from 'axios';
import { CommonButtonSolidBlue } from './buttons';
import CommonPopup from './popUp';
import { CommonSpinner } from './notifications';

interface CommonDocumentListProps {
    userId?:string;
    className?:string;
    isPopup?:boolean;
    docType?:string;
    doc_name:string;
    doc_image:string;
    onCapture:()=>void;
    frontFileInputRef: RefObject<HTMLInputElement>;

  }
  
  interface DocumentAttribute {
    name: string;
    label: string;
    type: string;
    defaultValue: string;
  }
  
  const SingleDocument = forwardRef(({
    className,
    isPopup = false,
    docType,
    userId,
    doc_name,
    doc_image,
    onCapture,
    frontFileInputRef,

  }: CommonDocumentListProps, ref: Ref<any>) => {
    const [selectedDoc, setSelectedDoc] = useState<string>(doc_name);
    const [fileData, setFileData] = useState<any>('');
    const [captureMethod, setCaptureMethod] = useState<boolean | null>(null);
    const [document_front_picture, setDocumentFrontPicture] = useState<any>('');
    const [document_back_picture, setDocumentBackPicture] = useState<any>('');
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [frontFileData, setfrontFileData] = useState<any>('');
    const [uploadedImages, setUploadedImages] = useState<Record<string, { frontImage: string, backImage: string }>>({});
    const [isAnyDocumentUploading, setIsAnyDocumentUploading] = useState(false);
    const [backFileData, setbackFileData] = useState<any>('');
    const commonInputRef = useRef<HTMLInputElement | null>(null);
    const [documentUploadStatus, setDocumentUploadStatus] = useState({
        frontUploaded: false,
        backUploaded: false,
        uploading: false,
      });
      const changeDocumentFrontPicture = async(file:File) => {
        const theFile = await toBase64(file);
        setDocumentFrontPicture(theFile);
      }
      const changeDocumentBackPicture = async(file:File) => {
        const theFile = await toBase64(file);
        setDocumentBackPicture(theFile);
      }
    // const frontFileInputRef = useRef<HTMLInputElement>(null);
    const fetchDocumentData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/documents/${userId}`);
      
          // Assuming the response data structure matches the MongoDB document structure
          const { data } = response;

      
          // Update state variables with the fetched data
          setFileData(data);
          // setbackFileData(backData);
        } catch (error) {
          console.error('Error fetching document data:', error);
        }
      };
      
      useEffect(() => {
        fetchDocumentData();
      }, []);
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
        const selectedFile = e.target?.files?.[0];
      
        if (selectedFile) {
          const reader = new FileReader();
      
          reader.onload = (event) => {
            handleImageLinking(selectedFile, side);
          };
      
          reader.readAsDataURL(selectedFile);
        }
      };
      
      const handleImageLinking = async (file: File, side: string) => {
        const imageLink = await getUploadedImageLink(file);
      
        setUploadedImages((prevImages) => {
          const updatedImages = { ...prevImages };
      
          if (side === 'front') {
            updatedImages[selectedDoc] = {
              ...updatedImages[selectedDoc],
              frontImage: imageLink,
            };
          } else if (side === 'back') {
            updatedImages[selectedDoc] = {
              ...updatedImages[selectedDoc],
              backImage: imageLink,
            };
          }
      
          console.log('Updated Images:', updatedImages);
          return updatedImages;
        });
      };
      
      const handleFrontUpload = async (selectedFile: File | null | undefined) => {
        setShowLoader(true);
         if (!selectedFile) return;
    
        try {
            setDocumentUploadStatus((prevStatus) => ({
                ...prevStatus,
               
                uploading: false,
              }));
    
          const formData = new FormData();
          if (selectedFile) {
            formData.append('frontFile', selectedFile, selectedFile.name);
            formData.append('frontFileType', selectedFile.type);
            formData.append('DocumentName', doc_name);
          }
          const syntheticEvent = {
            target: {
              files: [selectedFile],
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleImageUpload(syntheticEvent,'front');
        
    
          const res = await fetch('http://127.0.0.1:5000/api/fileUploader/fileUploader', {
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            setfrontFileData(data);
            setDocumentUploadStatus((prevStatus) => ({
                ...prevStatus,
                frontUploaded: true,
                uploading: false,
              }));
              setIsAnyDocumentUploading(true);
          }
        } catch (error) {
          console.error('Error with sending the POST request:', error);
        }
      };
      
       const handleBackUpload = async (selectedFile: File | null | undefined) => {
        setShowLoader(true);
         if (!selectedFile) return;
        try {
            setDocumentUploadStatus((prevStatus) => ({
                ...prevStatus,
               
                uploading: false,
              }));
    
          const formData = new FormData();
          if (selectedFile) {
            formData.append('backFile', selectedFile);
            formData.append('backFileType', selectedFile.type);
            formData.append('DocumentName', doc_name);
          }
    
          const syntheticEvent = {
            target: {
              files: [selectedFile],
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          handleImageUpload(syntheticEvent,'back');
    
          const res = await fetch('http://127.0.0.1:5000/api/fileUploader/fileUploader', {
            method: 'POST',
            body: formData,
          });
    
          if (res.ok) {
            const data = await res.json();
            setbackFileData(data);
            setDocumentUploadStatus((prevStatus) => ({
                ...prevStatus,
                frontUploaded: true,
                uploading: false,
              }));
              setIsAnyDocumentUploading(true);
          }
        } catch (error) {
          console.error('Error with sending the POST request:', error);
        }
      };
      const handleAttributeChange = async (attributeName: string, attributeValue: string) => {

        if (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === "EmiratesId")) {
       
          const updatedData = {
            ...frontFileData,
            documents: fileData?.documents.map((doc: any) => {
              if (doc.document_name === "EmiratesId") {
              
                return {
                  ...doc,
                  front_image:attributeName === selectedDoc ? attributeValue : doc?.front_image,
                  back_image:attributeName === selectedDoc ? attributeValue : doc?.back_image,
                  document_id: attributeName === selectedDoc ? attributeValue : doc.document_id,
                  expiry: attributeName === selectedDoc+"Expiry" ? attributeValue : doc.expiry,
                  attributes: {
                    ...doc.attributes,
                    [attributeName]: attributeValue,
                  },
                };
              }
              return doc;
            }),
          };

          setFileData(updatedData);
          if (attributeName!=="back_image" && attributeName!=="front_image"){
                  try{
                  const response = await axios.post('http://localhost:5000/api/documents/create-document', updatedData);
                } catch (error: any) {
                  console.error('Error submitting form:', error.message);
                }
              }
        } else if (
          (frontFileData && frontFileData.names && frontFileData.names[attributeName]) ||
          (backFileData && backFileData?.names && backFileData?.names[attributeName])
        ) {
 
          // Check if 'frontFileData' has values for the given attribute
          const updatedData = frontFileData
            ? {
                ...frontFileData,
                names: {
                  ...frontFileData.names,
                  [attributeName]: attributeValue,
                },
              }
            : {
                ...backFileData,
                names: {
                  ...backFileData?.names,
                  [attributeName]: attributeValue,
                },
              };
          setfrontFileData(updatedData);
        } else if (
          (frontFileData && frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers[attributeName]) ||
          (backFileData && backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers[attributeName])
        ) {

          // Check if 'frontFileData' has values for the given attribute
          const updatedData = frontFileData
            ? {
                ...frontFileData,
                extractedIdNumbers: {
                  ...frontFileData.extractedIdNumbers,
                  [attributeName]: attributeValue,
                },
              }
            : {
                ...backFileData,
                extractedIdNumbers: {
                  ...backFileData?.extractedIdNumbers,
                  [attributeName]: attributeValue,
                },
              };
          setfrontFileData(updatedData);
        } else if (
          (frontFileData && frontFileData.dates && frontFileData.dates[selectedDoc+'expiryDate']) ||
          (backFileData && backFileData?.dates && backFileData?.dates[selectedDoc+'expiryDate'])
        ) {

          // Check if 'frontFileData' has values for the given attribute
          const updatedData = frontFileData
            ? {
                ...frontFileData,
                dates: {
                  ...frontFileData.dates,
                  [selectedDoc+'expiryDate']: attributeValue,
                },
              }
            : {
                ...backFileData,
                dates: {
                  ...backFileData?.dates,
                  [selectedDoc+'expiryDate']: attributeValue,
                },
              };
          setfrontFileData(updatedData);
        } else if (
          (fileData && fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.attributes[attributeName]) ||
          (backFileData && backFileData?.documents && backFileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.attributes[attributeName])
        ) {

          // Check if 'frontFileData' or 'backFileData' has values for the given attribute
          const updatedData = {
            ...frontFileData,
            documents: fileData?.documents.map((doc: any) => {
              if (doc.document_name === selectedDoc) {
                return {
                  ...doc,
                  document_id: attributeName === "document_id" ? attributeValue : doc.document_id,
                  expiry: attributeName === selectedDoc+"Expiry" ? attributeValue : doc.expiry,
                  attributes: {
                    ...doc.attributes,
                    [attributeName]: attributeValue,
                  },
                };
              }
              return doc;
            }),
          };
          setfrontFileData(updatedData);
        }
      
        // Add similar checks for other attributes (dates, etc.)
      };
      const collectDocumentData = (docType: string) => {
        const dataToCollect = [];
     
        switch (docType) {
          case 'EmiratesId':
            // Collect data for EmiratesId
            dataToCollect.push({
              name: (frontFileData.names && frontFileData.names["name"]) || (backFileData?.names && backFileData?.names["name"]),
              document_id: (frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers[docType]) ||
                          (backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers[docType]),
              expiryDate: (frontFileData.dates && frontFileData.dates[`${docType}expiryDate`]) ||
                          (backFileData?.dates && backFileData?.dates[`${docType}expiryDate`]),
              employer: (frontFileData.names && frontFileData.names["employer"]) || (backFileData?.names && backFileData?.names["employer"]),
              occupation: (frontFileData.names && frontFileData.names["occupation"]) || (backFileData?.names && backFileData?.names["occupation"]),
              dateOfBirth: (frontFileData.dates && frontFileData.dates["dateOfBirth"]) || (backFileData?.dates && backFileData?.dates["dateOfBirth"]),
            });
            break;
    
          default:
            dataToCollect.push({
              document_id: (frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers[docType]) ||
                        (backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers[docType]),
              expiryDate: (frontFileData.dates && frontFileData.dates[`${docType}expiryDate`]) ||
                          (backFileData?.dates && backFileData?.dates[`${docType}expiryDate`]),
            });
        }
        return dataToCollect;
      };
      const handleSubmit = async () => {
        try {
        
          const documentData = collectDocumentData(selectedDoc);
          const frontImage = uploadedImages[selectedDoc]?.frontImage || fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image||'';
          const backImage = uploadedImages[selectedDoc]?.backImage || fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image|| '';
          const updatedFormValues = {
            user_id: userId,
            is_personel_document: true, 
            documents: documentData.map(data => ({
              document_name: selectedDoc,
              front_image: frontImage,
              back_image: backImage,
              expiry: data.expiryDate, 
              document_id: data.document_id, 
              attributes: {
                ...Object.entries(data)
                  .filter(([key, _]) => key !== 'expiryDate' && key !== 'document_id' && key !== selectedDoc)
                  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
              },
            })),
          };
          setIsAnyDocumentUploading(false)
          const response = await axios.post('http://localhost:5000/api/documents/create-document', updatedFormValues);
        } catch (error: any) {
          console.error('Error submitting form:', error.message);
        }
      };
      useImperativeHandle(ref, () => ({
        handleSubmit
      }));
    return(
        <div className='flex flex-col justify-center'>
              {showLoader && (
      <div className="mx-auto flex flex-col align-middle items-center justify-center">
        <CommonSpinner />
      </div>
    )}
            <div
                style={{ width: '100%', height: 'auto' }}
                 
                  className={`no-scrollbar h-26 max-w-[100px] overflow-hidden rounded-2xl  bg-[color:var(--mainTitleLightestColor)] 
                     ${selectedDoc ? 'bg-[#EEF3FB] ring-2 ring-offset-2 ' : ''}`}
                  onClick={() =>{setSelectedDoc(doc_name);fetchDocumentData();}}  
                >
              
                <div className="flex items-center justify-center"  >
                  <img src={doc_image} alt={`Document`} width={50} height={50} />
                </div>

                    <p className="flex justify-center items-center text-[color:var(--mainTitleColor)] text-sm md:pb-2 pt-1 cursor-pointer no-underline hover:underline" onClick={() => onCapture()}>
                      {doc_name}
                    </p>
            
                  
                  { (!captureMethod && !documentUploadStatus.frontUploaded && !fileData) || (fileData?.documents && !fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image) || (fileData && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image) ? (
                    <>
                    
                    <input
                        type="file"
                      
                        style={{ display: 'none' }}
                       
                        ref={frontFileInputRef} 
                        onChange={(event) => {
                         
                          if (!captureMethod) {
                            const selectedFrontFile = event.target.files?.[0];
                            if (selectedFrontFile) {
                              changeDocumentFrontPicture(selectedFrontFile);
                              handleFrontUpload( selectedFrontFile);
                              handleAttributeChange("front_image",fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image)

                            }
                          }
                        }}
                        
                      />

                      <label htmlFor={`frontFileInput`}
                      onClick={(e) => e.preventDefault()} 
                      >
                        {documentUploadStatus.uploading ? (
                          <div className="flex items-center justify-center">
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center animate-pulse" >
                            Side 1
                          </div>
                        )}
                      </label>
                    </>
                  ) : (
                    <>
                      { !documentUploadStatus.backUploaded ? (
                        <>
                          <input
                            type="file"
                            id={`backFileInput`}
                            style={{ display: 'none' }}
                            ref={frontFileInputRef} 
                            onChange={(event) => {
                              const selectedBackFile = event.target.files?.[0];
                              if (selectedBackFile) {
                                changeDocumentBackPicture(selectedBackFile);
                                handleBackUpload(selectedBackFile);
                                handleAttributeChange("back_image", fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image)

                              }
                            }}
                          />
                          <label htmlFor={`backFileInput`}
                           onClick={(e) => e.preventDefault()} 
                          >
                            {documentUploadStatus.uploading ? (
                              <div className="flex items-center justify-center">
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center animate-pulse" >
                                Side 2
                              </div>
                            )}
                          </label>
                        </>
                      ) : (fileData?.documents && !fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image &&
                      fileData?.documents && !fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image?
                        <div className="flex justify-center items-center text-green-500">
                          <FaCheckCircle />
                        </div>:        <div className="flex justify-center items-center text-green-500">
                          <FaCheckCircle />
                        </div>
                      )}
                    </>
                  )}
                </div>
                

                <div className="sm:flex w-full justify-between mt-2 sm:mt-4 p-2 sm:p-4">

                  <div className="w-full">
                    <div className="flex items-center justify-center p-2">
                      {(uploadedImages[selectedDoc]?.frontImage || fileData?.documents) && (
                        <label >
                          <img
                            src={
                              (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image) ||

                              uploadedImages[selectedDoc]?.frontImage || '/default_image.jpg'}
                            alt={`${selectedDoc} Front Side`}
                            className="rounded-md pointer-events-none sm:ml-2"
                            style={{ width: '76%', height: 'auto' }}
                          />
                        </label>
                      )}
                      {(uploadedImages[selectedDoc]?.backImage  || fileData?.documents) && (
                        <label >
                          <img
                            src={(fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image
                            ) || uploadedImages[selectedDoc]?.backImage || '/default_image.jpg'}
                            alt={`${selectedDoc} Back Side`}
                            className="rounded-md pointer-events-none sm:ml-2"
                            style={{ width: '76%', height: 'auto' }}
                          />
                        </label>
                      )}
                    </div>
                    <CommonPopup
                      showModal={isAnyDocumentUploading}
                      onClose={() => setIsAnyDocumentUploading(false)}
                      heading={"Save "+selectedDoc+" Details"}
                      content='' >
                    <div className='flex-cols sm:w-auto p-10 h-auto overflow-scroll no-scrollbar'>  
                        <div className="flex items-center justify-center">
                          <CommonButtonSolidBlue onClick={handleSubmit} text={`Ok`} />
                        </div> 
                    </div>             
                  </CommonPopup>

                    
                    {selectedDoc==='EmiratesId'? 
                                <>
                                        <CommonInput
                                          label={"Name"}
                                          ref={commonInputRef}
                                          defaultValue={
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === "EmiratesId")?.attributes?.name) ||
                                              (frontFileData?.names && frontFileData.names["name"]) ||
                                            (backFileData?.names && backFileData?.names["name"]) 
                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange("name", e.target.value)}
                                        />

                                        <CommonInput
                                          label={"Emirates id"}
                                          ref={commonInputRef}
                                          defaultValue={
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.document_id) ||
                                            
                                              (frontFileData?.extractedIdNumbers && frontFileData.extractedIdNumbers["EmiratesId"]) ||
                                                (backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers["EmiratesId"]) 

                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange("EmiratesId", e.target.value)}
                                        />
                                        <CommonInput
                                          label={"Expiry Date"}
                                          ref={commonInputRef}
                                          
                                          defaultValue={
                                            
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.expiry) ||
                                                (frontFileData?.dates && frontFileData.dates[selectedDoc+"expiryDate"]) ||
                                                (backFileData?.dates && backFileData?.dates[selectedDoc+"expiryDate"]) 

                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange(selectedDoc+"Expiry", e.target.value)}
                                          />
                                        <CommonInput
                                          label={"Date of Birth"}
                                          ref={commonInputRef}
                                          defaultValue={
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.attributes?.dateOfBirth) ||
                                                (frontFileData?.dates && frontFileData.dates["dateOfBirth"]) ||
                                                (backFileData?.dates && backFileData?.dates["dateOfBirth"])

                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange("dateOfBirth", e.target.value)}
                                        />
                                        <CommonInput
                                          label={"Employer"}
                                          ref={commonInputRef}
                                          defaultValue={
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.attributes?.employer) ||
                                              (frontFileData?.names && frontFileData.names["employer"]) ||
                                                (backFileData?.names && backFileData?.names["employer"]) 
                                            
        
                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange("employer", e.target.value)}
                                        />
                                        <CommonInput
                                          label={"Occupation"}
                                          ref={commonInputRef}
                                          defaultValue={
                                            (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.attributes?.occupation) ||
                                              (frontFileData?.names && frontFileData.names["occupation"]) ||
                                                (backFileData?.names && backFileData?.names["occupation"]) 
                                            
        
                                          }
                                          className=""
                                          onChange={(e) => handleAttributeChange("occupation", e.target.value)}
                                        />
                                </>:
                    
                                <>
                                    <CommonInput
                                        label={selectedDoc+" "+"id"}
                                        ref={commonInputRef}
                                        defaultValue={
                                          
                                          (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.document_id) ||
                                              (frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers[selectedDoc]) ||
                                              (backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers[selectedDoc]) 

                                        }
                                        className=""
                                        onChange={(e) => handleAttributeChange(selectedDoc, e.target.value)}
                                      />
                                    <CommonInput
                                    label={"Expiry Date"}
                                    ref={commonInputRef}
                                    defaultValue={
                                        (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.expiry) ||
                                          (frontFileData.dates && frontFileData.dates[selectedDoc+"expiryDate"]) ||
                                          (backFileData?.dates && backFileData?.dates[selectedDoc+"expiryDate"])

                                    }
                                    className=""
                                    onChange={(e) => handleAttributeChange(selectedDoc+"Expiry", e.target.value)}
                                    />
                              </>

                            }
                  </div>
            </div>

        </div>
    )})

    SingleDocument.displayName = 'SingleDocument';
    export default SingleDocument;