'use client';
import React, { useEffect, useRef, useState ,Dispatch, SetStateAction} from 'react';
import { FaCheck} from 'react-icons/fa';
import { CommonInput, CommonTextInput } from './inputs';// Import your CommonTextInput component
import 'react-calendar/dist/Calendar.css'; 
import { dataUrlToFile, getUploadedImageLink, toBase64 } from '../utils/utils';
import axios from 'axios';

interface CommonDocumentListProps {
  userId?:string;
  frontFileData?: any; // Define the appropriate type for frontFileData
  backFileData?: any; // Define the appropriate type for backFileData
  className?:string;
  isPopup?:boolean;
  docType?:string;
  setEmiratesID?: Dispatch<SetStateAction<string>>;
  setFirstName?:Dispatch<SetStateAction<string>>;
  setLastName?:Dispatch<SetStateAction<string>>;
  setDOB?:Dispatch<SetStateAction<string>>;
  setOccupation?:Dispatch<SetStateAction<string>>;
  setEmiratesIdExpiry?:Dispatch<SetStateAction<string>>;
  emirates_id?:string;
  first_name?:string;
  emirates_id_expiry?:string;
  last_name?:string;
  occupation?:string;
  dob?:string;
  

}

const CommonDocumentList: React.FC<CommonDocumentListProps> = ({

  className,
  isPopup=false,
  docType,
  
  setEmiratesID,

  setEmiratesIdExpiry,


  setFirstName,
  setLastName,
 
  setOccupation,
  setDOB,
  first_name,
  emirates_id,
  emirates_id_expiry,
  last_name,
  occupation,
  dob,
  userId
}) => {
  const [currentUploadIndex, setCurrentUploadIndex] = useState(-1); // Initialize with -1
  const [twoDocumentsUploaded, setTwoDocumentsUploaded] = useState(false);
  const [frontFileData, setfrontFileData] = useState<any>('');
  const [expiry, setExpiry] = useState<any>(Date);

  const [backFileData, setbackFileData] = useState<any>('');
  const [selectedDoc, setSelectedDoc] = useState<any>('EmiratesId');
  const [uploadedFrontImage, setUploadedFrontImage] = useState({ uploadedFrontImage:'' });
  const [uploadedBackImage, setUploadedBackImage] = useState({ uploadedBackImage:'' });
  const [document_front_picture, setDocumentFrontPicture] = useState<any>('');
  const [document_back_picture, setDocumentBackPicture] = useState<any>('');
  const [message, setMessage] = useState('');
  const [document_id, setDocumentId] = useState('');


  const [showLoader, setShowLoader] = useState(false);
  const selectedDocument=(index:number)=>{
    if (index===0){
      setSelectedDoc('EmiratesId')
    }else if(index===1){
      setSelectedDoc('Passport')
    }else if(index===2){
      setSelectedDoc('Visa')
    }else if(index===3){
      setSelectedDoc('Lisence')
    }else{
      setSelectedDoc('Other')
    }
  }
  console.warn(selectedDoc,"ssssssssssssssssssssssssssssssss")
  const changeDocumentFrontPicture = async(file:File) => {
    const theFile = await toBase64(file);
    setDocumentFrontPicture(theFile);
  }
  const changeDocumentBackPicture = async(file:File) => {
    const theFile = await toBase64(file);
    setDocumentBackPicture(theFile);
  }
    // Sample documentAttributes
    const documentAttributes: {
      [key: string]: { name: string; label: string; type: string; defaultValue: string }[];
    } = {
      Passport: [
        { name: 'Passport', label: 'Passport ID', type: 'text', defaultValue: '' },
        { name: 'PassportexpiryDate', label: 'Expiry Date', type: 'date', defaultValue: '' },
        // Add other attributes specific to Passport
      ],
      EmiratesId: [
        { name: 'EmiratesId', label: 'Emirates ID', type: 'text', defaultValue: '' },
        { name: 'EmiratesIdexpiryDate', label: 'Expiry Date', type: 'text', defaultValue: '' },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'text', defaultValue: '' },
        { name: 'employer', label: 'Employer', type: 'text', defaultValue: '' },
        { name: 'occupation', label: 'Occupation', type: 'text', defaultValue: '' },
      

        // Add other attributes specific to Emirates ID
      ],
      Visa: [
        { name: 'Visa', label: 'Visa ID', type: 'text', defaultValue: '' },
        { name: 'VisaexpiryDate', label: 'Expiry Date', type: 'date', defaultValue: '' },
        // Add other attributes specific to Passport
      ],
      Lisence: [
        { name: 'Drivers Lisence', label: 'Lisence ID', type: 'text', defaultValue: '' },
        { name: 'LisenseexpiryDate', label: 'Expiry Date', type: 'text', defaultValue: '' },
        // Add other attributes specific to Passport
      ],
      Other: [
        { name: `${selectedDoc}`, label: `${selectedDoc}ID`, type: 'text', defaultValue: '' },
        { name: `${selectedDoc}expiryDate`, label: 'Expiry Date', type: 'text', defaultValue: '' },
        // Add other attributes specific to Passport
      ],
      // Add other document types with their respective attributes
    };
  
    const [formValues, setFormValues] = useState({
      user_id: userId || '', // Replace with the actual user ID
      is_personel_document: true, // Replace with the actual value

      documents: [
        {
          document_name: selectedDoc || '', // Replace with the actual document name
          expiry:expiry
        },
      ],
    });
  
    const handleAttributeChange = (attributeName: string, value: string) => {
      console.warn("{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{UUUUUUUUUUUUUUUUUUUUUU")
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        documents: [
          {
            ...prevFormValues.documents[0],
            [attributeName]: value,
          },
        ],
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/documents/create-document', formValues);
        console.log('Response from the server:', response.data);
        // Handle success response
      } catch (error:any) {
        console.error('Error submitting form:', error.message);
        // Handle error response
      }
    };
  

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>,side:string) => {
    
    const selectedFile = e.target?.files?.[0]; // Use optional chaining to handle potential null values
    if (selectedFile && side==='front') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFrontImage({ uploadedFrontImage: event.target?.result as string });
      };
      reader.readAsDataURL(selectedFile);
    };
    if (selectedFile && side==='back') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedBackImage({ uploadedBackImage: event.target?.result as string });
      };
      reader.readAsDataURL(selectedFile);
    };
  };
  let documentDetails: string[]=[];
  if (docType!=='Certificates'){
      documentDetails =['/id_card.png','EmiratesId', '/passport.png','Passport', '/visa.png','Visa', '/driver-license.png','License']
    }else{
      documentDetails =['/mobile_crane.png','Work at Height','/hook 1.png','Lifting','/theodolite.png','Tools','/blank-document.jpg','Other']
  }
   
  const [documents, setDocuments] = useState([
    {
      src: documentDetails[0],
      name:documentDetails[1],
    },
    {
      src: documentDetails[2],
      name: documentDetails[3],
    },
    {
      src:documentDetails[4],
      name: documentDetails[5],
    },
    {
      src: documentDetails[6],
      name: documentDetails[7],
      isEditable: false,
      frontUploaded: false,
      backUploaded: false,
    },
    
  ]);

  const [documentUploadStatus, setDocumentUploadStatus] = useState(
    Array(documents.length).fill({
      frontUploaded: false,
      backUploaded: false,
      uploading: false,
    })
  );

  const addNewDocument = () => {
    setDocuments((prevDocuments) => [
      ...prevDocuments,
      {
        src: '/blank-document.jpg',
        name: 'Document Name',
        isEditable: true,
        frontUploaded: false,
        backUploaded: false,
      },
    ]);

    setDocumentUploadStatus((prevStatus) => [
      ...prevStatus,
      {
        frontUploaded: false,
        backUploaded: false,
        uploading: false,
      },
    ]);
  };

  const handleNameChange = (index:number, newName:string) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = [...prevDocuments];
      updatedDocuments[index].name = newName;
      return updatedDocuments;
    });
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  useEffect(() => {
    // When uploadProgress reaches 100, mark the upload as complete
    if (uploadProgress === 100 && currentUploadIndex !== -1) {
      setDocumentUploadStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === currentUploadIndex
            ? { ...status, frontUploaded: true, uploading: false }
            : status
        )
      );
      setUploadProgress(0);
      setCurrentUploadIndex(-1); // Reset current upload index
    }

  }, [uploadProgress, currentUploadIndex]);


   const handleFrontUpload = async (index: number, selectedFile: File | null | undefined) => {
    setShowLoader(true);
    const theImageFile = await dataUrlToFile(document_front_picture, `${userId}`);
    const theImageLink = await getUploadedImageLink(theImageFile);
    if (!selectedFile) return;
   
    try {
      setDocumentUploadStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === index ? { ...status, uploading: true } : status
        )
      );

      const formData = new FormData();
      if (selectedFile) {
        formData.append('frontFile', selectedFile, selectedFile.name);
        formData.append('frontFileType', selectedFile.type);
        formData.append('DocumentName', documents[index].name);
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
        setDocumentUploadStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === index ? { ...status, frontUploaded: true, uploading: false } : status
          )
        );
      }
    } catch (error) {
      console.error('Error with sending the POST request:', error);
    }
  };
  
   const handleBackUpload = async (index: number, selectedFile: File | null | undefined) => {
    setShowLoader(true);
    const theImageFile = await dataUrlToFile(document_back_picture, "document_picture");
    const theImageLink = await getUploadedImageLink(theImageFile);
    if (!selectedFile) return;
    handleImageUpload
    try {
      setDocumentUploadStatus((prevStatus) =>
        prevStatus.map((status, i) =>
          i === index ? { ...status, uploading: true } : status
        )
      );

      const formData = new FormData();
      if (selectedFile) {
        formData.append('backFile', selectedFile);
        formData.append('backFileType', selectedFile.type);
        formData.append('DocumentName', documents[index].name);
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
        setDocumentUploadStatus((prevStatus) =>
          prevStatus.map((status, i) =>
            i === index ? { ...status, backUploaded: true, uploading: false } : status
          )
        );
      }
    } catch (error) {
      console.error('Error with sending the POST request:', error);
    }
  };



  useEffect(() => {
    const uploadedCount = documentUploadStatus.filter(
      (status) => status.frontUploaded && status.backUploaded
    ).length;
    setTwoDocumentsUploaded(uploadedCount === documents.length-3);
  }, [documentUploadStatus, documents.length,twoDocumentsUploaded]);

  const inputRef = useRef<HTMLInputElement | null>(null); // Specify the type explicitly

  const handleCopyToClipboard = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const valueWithoutHyphens = inputValue.replace(/-/g, ''); // Remove hyphens
      inputRef.current.value = valueWithoutHyphens; // Update the input value
      inputRef.current.select();
      document.execCommand('copy');
      inputRef.current.value = inputValue; // Restore the original value
    }
  };
  
  return (
    <>
    <div className='flex flex-col overflow-y-scroll mt-2 sm:mt-0'>
      <div style={{ width: '100%', height: 'auto' }} className=' no-scrollbar '>
        <div className="flex-col overflow-x-scroll no-scrollbar overflow-y-scroll  mt-2 sm:ml-2 sm:mr-2">
          <ul  className={`p-2 grid grid-cols-3 sm:flex flex-wrap items-center justify-center gap-y-2 gap-x-2 overflow-y-scroll no-scrollbar md:gap-x-4 md:gap-y-4 items-stretch sm:mt-[16px] ${className}`}>
            {documents.map((document, index) => (
              <li
              style={{ width: '100%', height: 'auto' }}
                key={index}
                // onClick={document.isEditable ? () => addNewDocument() : undefined}
                className={` no-scrollbar h-26 items-center justify-center max-w-[100px] overflow-hidden rounded-2xl hover:ring-offset-2 hover:ring-2 bg-[color:var(--mainTitleLightestColor)] ${document.frontUploaded && document.backUploaded ? 'pointer-events-none opacity-60' : ''}`}
              >
                <div className='flex items-center justify-center' onClick={() => selectedDocument(index)}>
                  <img src={document.src} alt={`Document ${index}`} width={50} height={50} />
                </div>

                {document.isEditable ? (
                  <CommonTextInput
                    value={document.name}
                    
                    onChange={(e) => handleNameChange(index, e.target.value)} placeholder='Other Document Name'  
                    className='text-[10px] pl-2 pr-2 rounded-2xl' 
                          
                    id={''}
                  />
                ) : (
                  <p className='flex justify-center items-center text-[color:var(--mainTitleColor)] text-sm md:pb-2 pt-1'>{document.name}</p>
                )}
                
                {/* Frontside file upload */}
                {!documentUploadStatus[index].frontUploaded ? (
                  <>
                    <input
                      type="file"
                      id={`frontFileInput-${index}`}
                      style={{ display: 'none' }}
                      onChange={(event) => {
                        const selectedFrontFile = event.target.files?.[0];
                        if (selectedFrontFile) {
                          changeDocumentFrontPicture(selectedFrontFile);
                          handleFrontUpload(index, selectedFrontFile);
                        }
                      }}
                    />
                    <label htmlFor={`frontFileInput-${index}`}>
                      {documentUploadStatus[index].uploading ? (
                        <div className="flex items-center justify-center">
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                      ) : (
                        <div className="flex justify-center animate-pulse">
                          Side 1
                        </div>
                      )}
                    </label>
                  </>
                ) : (
                  // Backside file upload
                  <>
                    {!documentUploadStatus[index].backUploaded ? (
                      <>
                        <input
                          type="file"
                          id={`backFileInput-${index}`}
                          style={{ display: 'none' }}
                          onChange={(event) => {
                            const selectedBackFile = event.target.files?.[0];
                            if (selectedBackFile) {
                              changeDocumentBackPicture(selectedBackFile);
                              handleBackUpload(index, selectedBackFile);
                            }
                          }}
                        />
                        <label htmlFor={`backFileInput-${index}`}>
                          {documentUploadStatus[index].uploading ? (
                            <div className="flex items-center justify-center">
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                          ) : (
                            <div className="flex justify-center animate-pulse">
                              Side 2
                            </div>
                          )}
                        </label>
                      </>
                    ) : (
                      <div className='flex justify-center items-center text-green-500'>
                      <FaCheck 
                      // style={{ color: 'green-500' }} 
                      /></div>
                    )}
                  </>
                )}
              </li>
              
            ))}
            <li onClick={()=> addNewDocument() } className='flex p-2 w-26 md:w-36 h-26 hover:ring-offset-2 hover:ring-2 items-center justify-center text-3xl text-extrabold bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleLightColor)] rounded-2xl transition-all duration-[250ms] ease-out group-hover:w-full' >
              <span className='relative group-hover:text-white '>
              +
              </span>
            </li>
          </ul>        
          <div className='flex items-center justify-center p-2'>
            {uploadedFrontImage.uploadedFrontImage!=='' &&
              <label htmlFor="profileImageInput">
                <img
                  src={uploadedFrontImage.uploadedFrontImage || '/default_image.jpg'}
                  alt="Emirates Id Front Side"
                  className="rounded-md pointer-events-none  sm:ml-2"
                  style={{ width: '40%', height: 'auto' }}
                /> 
              </label>}
          {uploadedBackImage.uploadedBackImage!==''&&
          <label htmlFor="profileImageInput">
            <img
              src={uploadedBackImage.uploadedBackImage || '/default_image.jpg'}
              alt="Emirates Id Back Side"
              className="rounded-md pointer-events-none sm:ml-2"
              style={{ width: '72%', height: 'auto' }}
            />
          </label>}
        </div> 
        </div>
      <div>
      <div className='sm:flex w-full justify-between mt-2 sm:mt-4 p-2 sm:p-4'>
          <div className='sm:w-full'>
              {selectedDoc==='EmiratesId' && isPopup && (
                <div className='w-full'>
                  
                      <div className="flex justify-center gap-x-1 items-center ">
                            {/* <CommonTextInput disabled={twoDocumentsUploaded ?false:true} value={frontFileData?frontFileData.names.name:''} id={''} className='bg-transparent shadow-none mt-[-8px]' placeholder='Full Name'/> */}
                            
                            <CommonInput
                              label={documentDetails[1]}
                              ref={inputRef}
                              defaultValue={
                                frontFileData.extractedIdNumbers && backFileData.extractedIdNumbers && backFileData.extractedIdNumbers.EmiratesId && frontFileData.extractedIdNumbers.EmiratesId
                                  ? backFileData.extractedIdNumbers.EmiratesId!=="Emirates ID Number not found" 
                                    ? backFileData.extractedIdNumbers.EmiratesId
                                    : frontFileData.extractedIdNumbers.EmiratesId
                                  : ((frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers.EmiratesId )|| (backFileData.extractedIdNumbers && backFileData.extractedIdNumbers.EmiratesId) || '')
                              }
                              copy={true}
                              handleCopyToClipboard={handleCopyToClipboard}
                              className='pl-0 pr-0'
                              onChange={(e) => handleAttributeChange('emirates_id', e.target.value)}
                            />
                          <CommonInput
                                label={'Name'}
                                defaultValue={
                                  backFileData.names && backFileData.names.name && frontFileData.names && frontFileData.names.name
                                    ? backFileData.names.name.length > frontFileData.names.name.length
                                      ? backFileData.names.name
                                      : frontFileData.names.name
                                    : (frontFileData.names && frontFileData.names.name) || (backFileData.names && backFileData.names.name) || ''
                                }
                                className='hidden sm:block pl-0 pr-0'
                                onChange={(e) => handleAttributeChange('name', e.target.value)}
                              />

                      </div>
                      <div className='sm:hidden col-span-2 '>
                        
                        <CommonInput
                            label={'Name'}
                            defaultValue={
                              backFileData.names && backFileData.names.name && frontFileData.names && frontFileData.names.name
                                ? backFileData.names.name.length > frontFileData.names.name.length
                                  ? backFileData.names.name
                                  : frontFileData.names.name
                                : (frontFileData.names && frontFileData.names.name) || (backFileData.names && backFileData.names.name) || ''
                            }
                            className='pl-0 pr-0'
                          />

                      </div>
                  
                      <div className=' grid grid-cols-1 sm:grid-cols-2 w-full'>    
                        

                          
                            
                        <div className='col-span-1'>
                            <CommonInput 
                              label={'Expiry Date'} 
                              defaultValue={(frontFileData && frontFileData.extractedIdNumbers.EmiratesId && frontFileData.dates.expiryDate)||(backFileData && backFileData.extractedIdNumbers.EmiratesId && backFileData.dates.expiryDate)} 
                              onChange={(e) =>{handleAttributeChange('expiry', e.target.value);setExpiry(e.target.value)}}
                            />
                        </div>
                              <div className='col-span-1'>
                                <CommonInput 
                                label={'Date Of Birth'} 
                                defaultValue={(frontFileData && frontFileData.dates.dateOfBirth )|| (backFileData && backFileData.dates.dateOfBirth )} 
                                className='pl-0 pr-0'
                                />
                            </div>
                       

                       
                      
                        
                        <div className='col-span-1'>
                            <CommonInput 
                            label={'Employer'} 
                            defaultValue={(frontFileData && frontFileData.names.employer )||(backFileData && backFileData.names.employer)} 
                            className='pl-0 pr-0'
                            />
                          </div>
                          
                            <div className='col-span-1'>
                                <CommonInput 
                                label={'Occupation'} 
                                defaultValue={(frontFileData && frontFileData.names.occupation)|| (backFileData && backFileData.names.occupation )}
                                className='pl-0 pr-0'

                              onChange={(e) => {
                                if (setOccupation) {
                                  setOccupation(e.target.value)
                                }
                              }}
                                />  
                                 
                            </div>
                      
                  
                      </div>

                      <div className='col-span-2 flex justify-center'>
                            
                            <a className='p-2 m-2 text-[12px] sm:truncate sm:text-[16px] text-blue-500 hover:text-[color:var(--primaryColor)] animate-pulse' href="https://smartservices.icp.gov.ae/echannels/web/client/default.html#/login">Verify Emirates Id On Government Portal </a>
                        
                      </div> 
                      <button onClick={handleSubmit}>Submit Form</button>
                </div> 
                  )}
              {selectedDoc==='Passport' && isPopup && (
              <div className='w-full'>     
                <div className=' flex justify-center gap-x-1 items-center'>
                  <div className='flex flex-row'>
                  <div>
                    {/* <div className=' col-span-1'>
                          <CommonInput label={'Name'}  defaultValue={(frontFileData && frontFileData.names.name)||(backFileData && backFileData.names.name )}  />
                    </div> */}

                    <div className=' col-span-1'>
                      <CommonInput 
                        label={documentDetails[3]} 
                        defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Passport)||(backFileData && backFileData.extractedIdNumbers.Passport)}
                        className=''
                      
                      />
                    </div>
                  </div>
                  <div>
                  <div className='col-span-1'>
                        <CommonInput 
                          label={'Expiry Date'} 
                          defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Passport && frontFileData.dates.expiryDate)||(backFileData && backFileData.extractedIdNumbers.Passport && backFileData.dates.expiryDate)} 
                        />
                    </div>
                  </div>
                  </div>
                  <div className='col-span-2 flex justify-center'>
                            
                            {/* <a className='p-2 m-2 text-[12px] sm:truncate sm:text-[16px] text-blue-500 hover:text-[color:var(--primaryColor)] animate-pulse' href="https://smartservices.icp.gov.ae/echannels/web/client/default.html#/login">Verify Emirates Id On Government Portal </a> */}
                        
                      </div> 
                </div>
              </div>
                  )}
              {selectedDoc==='Visa' && isPopup && (
              <div className='flex items-end justify-center'>     
              <div className=' flex flex-col'>
                <div className='flex flex-row'>
                <div>
                    {/* <div className=' col-span-1'>
                        
                          <CommonInput label={'Name'}  defaultValue={frontFileData?frontFileData.names.name:''||backFileData ? backFileData.names.name : ''}  />
                    </div> */}

                    <div className=' col-span-1'>
                      <CommonInput 
                        label={documentDetails[5]} 
                        defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Visa)||(backFileData && backFileData.extractedIdNumbers.Visa )}
                        ref={inputRef}
                        handleCopyToClipboard={handleCopyToClipboard}
                        copy={true}
                        />
                    </div>
                  </div>
                  <div>
                    <div className='col-span-1'>
                        <CommonInput 
                          label={'Expiry Date'} 
                          defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Visa && frontFileData.dates.expiryDate)||(backFileData && backFileData.extractedIdNumbers.Visa && backFileData.dates.expiryDate)} 
                          onChange={(e) => handleAttributeChange('expiry', e.target.value)}
                        />
                    </div>
                
                </div>

                </div>
                <div className='col-span-2 flex justify-center'>
                            
                            <a className='p-2 m-2 text-[12px] sm:truncate sm:text-[16px] text-blue-500 hover:text-[color:var(--primaryColor)] animate-pulse' href="https://smart.gdrfad.gov.ae/Public_Th/StatusInquiry_New.aspx">Verify Visa On Government Portal </a>
                            {/* selected language as english--select File round button */}
                      </div> 
                
                </div>
              </div>
                  )}
              {selectedDoc==='Lisence' && isPopup && (
                <div className='flex items-end justify-center'>
                  <div className=' flex flex-row '>
                    <div>
                    {/* <div className=' col-span-1'>
                          <CommonInput label={'Name'}  defaultValue={frontFileData?frontFileData.names.name:''||backFileData ? backFileData.names.name : ''}  />
                    </div> */}

                    <div className=' col-span-1'>
                      <CommonInput 
                        label={documentDetails[7]} 
                        defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Driving)||(backFileData && backFileData.extractedIdNumbers.Driving)}
                      />
                    </div>
                  </div>
                  <div>
                  <div className='col-span-1'>
                        <CommonInput 
                          label={'Expiry Date'} 
                          defaultValue={(frontFileData && frontFileData.extractedIdNumbers.Driving && frontFileData.dates.expiryDate)||(backFileData && backFileData.extractedIdNumbers.Driving && backFileData.dates.expiryDate)} 
                        />
                    </div>
                
                </div>
                </div>
              </div>
                  )}
              {selectedDoc==='Other' && isPopup && (
              <div className='flex items-end justify-center'>
                <div className=' flex flex-row '>
                  <div>
                    {/* <div className=' col-span-1'>
                        
                          <CommonInput label={'Name'}  defaultValue={frontFileData?frontFileData.names.name:''||backFileData ? backFileData.names.name : ''}  />
                    </div> */}

                    <div className=' col-span-1'>
                      <CommonInput 
                      label={'Other'} 
                      defaultValue={frontFileData ? frontFileData.extractedIdNumbers : ''} 
                      />
                    </div>
                  </div>
                  <div>
                    <div className='col-span-1'>
                        <CommonInput 
                        label={'Expiry Date'} 
                        defaultValue={frontFileData ? frontFileData.dates.expiryDate : ''|| backFileData ? backFileData.dates.expiryDate : ''}
                        />
                    </div>
                
                </div>
                </div>
              </div>
                  )}
          </div>
          <button onClick={handleSubmit}>Submit Form</button>

   </div>

        </div>

  
    </div>
          

  
  </div>

  </>
);
};

export default CommonDocumentList;










