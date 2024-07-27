'use client';
import React, { useEffect, useRef, useState ,Dispatch, SetStateAction, createRef, RefObject, useCallback} from 'react';
import { FaCheck, FaCheckCircle} from 'react-icons/fa';
import { CommonInput, CommonTextInput } from './inputs';// Import your CommonTextInput component
import 'react-calendar/dist/Calendar.css'; 
import { dataUrlToFile, getUploadedImageLink, toBase64 } from '../utils/utils';
import axios from 'axios';
import { CommonButtonSolidBlue } from './buttons';
import CommonPopup from './popUp';
import CameraScan from './cameraScan';
import { CommonSpinner } from './notifications';


interface CommonDocumentListProps {
  userId?:string;
  frontFileData?: any; 
  backFileData?: any; 
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

interface DocumentAttribute {
  name: string;
  label: string;
  type: string;
  defaultValue: string;
}





const CommonDocumentList: React.FC<CommonDocumentListProps> = ({

  className,
  isPopup=false,
  docType, 
  userId,
}) => {
  const [currentUploadIndex, setCurrentUploadIndex] = useState(-1);
  const [twoDocumentsUploaded, setTwoDocumentsUploaded] = useState(false);
  const [frontFileData, setfrontFileData] = useState<any>('');
  const [fileData, setFileData] = useState<any>('');

  const [expiry, setExpiry] = useState<any>(Date);
  const commonInputRefs: React.MutableRefObject<HTMLInputElement | null>[] = [];
  const [backFileData, setbackFileData] = useState<any>('');
  const [selectedDoc, setSelectedDoc] = useState<string>('EmiratesId');
  const [uploadedFrontImage, setUploadedFrontImage] = useState({ uploadedFrontImage:'' });
  const [uploadedBackImage, setUploadedBackImage] = useState({ uploadedBackImage:'' });
  const [document_front_picture, setDocumentFrontPicture] = useState<any>('');
  const [document_back_picture, setDocumentBackPicture] = useState<any>('');
  const [message, setMessage] = useState('');
  const [document_id, setDocumentId] = useState('');
  const [uploadedImages, setUploadedImages] = useState<Record<string, { frontImage: string, backImage: string }>>({});
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [captureMethod, setCaptureMethod] = useState<boolean | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const frontFileInputRef = useRef<HTMLInputElement | null>(null);
  const [savedDocuments, setSavedDocuments] = useState<any[]>([]);
  const [isAnyDocumentUploading, setIsAnyDocumentUploading] = useState(false);

  const changeDocumentFrontPicture = async(file:File) => {
    const theFile = await toBase64(file);
    setDocumentFrontPicture(theFile);
   
  }
  const changeDocumentBackPicture = async(file:File) => {
    const theFile = await toBase64(file);
    setDocumentBackPicture(theFile);
  }
    // Sample documentAttributes
    const getCurrentValues = () => {
      const values: Record<string, string> = {};
  
      commonInputRefs.forEach((ref, index) => {
        const attributeName = attributes[index].name;
        values[attributeName] = ref.current ? ref.current.value : '';
      });
  
      return values;
    };
     
    const [documentAttributes, setDocumentAttributes] = useState({
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
        // Add other attributes specific to Visa
      ],
      Lisence: [
        { name: 'Drivers Lisence', label: 'Lisence ID', type: 'text', defaultValue: '' },
        { name: 'LisenseexpiryDate', label: 'Expiry Date', type: 'text', defaultValue: '' },
        // Add other attributes specific to Lisence
      ],
      // Add other document types with their respective attributes
    });

    const [formValues, setFormValues] = useState({
      user_id: userId || '', 
      is_personel_document: true, 

      documents: [
        {
          document_name: selectedDoc || '', 
          
        } as { [key: string]: any },
      ],
    });
  
    // const handleAttributeChange = (attributeName: string, attributeValue: string) => {
    //   console.log(attributeName,"JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJjJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
    //   if (
    //     (frontFileData && frontFileData.names && frontFileData.names[attributeName]) ||
    //     (backFileData && backFileData?.names && backFileData?.names[attributeName])
    //   ) {
    //     // Check if 'frontFileData' has values for the given attribute
        
    //     const updatedData = frontFileData
    //       ? {
    //           ...frontFileData,
    //           names: {
    //             ...frontFileData.names,
    //             [attributeName]: attributeValue,
    //           },

              
    //         }
    //       : {
    //           ...backFileData,
    //           names: {
    //             ...backFileData?.names,
    //             [attributeName]: attributeValue,
    //           },
    //         };
    //         console.log(updatedData,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //     setfrontFileData(updatedData);
    //   } else if (
    //     (frontFileData && frontFileData.extractedIdNumbers && frontFileData.extractedIdNumbers[attributeName]) ||
    //     (backFileData && backFileData?.extractedIdNumbers && backFileData?.extractedIdNumbers[attributeName])
    //   ) {
    //     // Check if 'frontFileData' has values for the given attribute
    //     const updatedData = frontFileData
    //       ? {
    //           ...frontFileData,
    //           extractedIdNumbers: {
    //             ...frontFileData.extractedIdNumbers,
    //             [attributeName]: attributeValue,
    //           },
    //         }
    //       : {
    //           ...backFileData,
    //           extractedIdNumbers: {
    //             ...backFileData?.extractedIdNumbers,
    //             [attributeName]: attributeValue,
    //           },
    //         };
    //         console.log(updatedData,"xxxxxxxxxxxxxxxxxxxxxxxxxxxooxoxoxooooxooxoxxooxoxoxox")
    //     setfrontFileData(updatedData);
    //   }else if (
    //     (frontFileData && frontFileData.dates && frontFileData.dates[selectedDoc+'expiryDate']) ||
    //     (backFileData && backFileData?.dates && backFileData?.dates[selectedDoc+'expiryDate'])
    //   ) {
        
    //     // Check if 'frontFileData' has values for the given attribute
    //     const updatedData = frontFileData
    //       ? {
    //           ...frontFileData,
    //           dates: {
    //             ...frontFileData.dates,
    //             [selectedDoc+'expiryDate']: attributeValue,
    //           },
    //         }
    //       : {
    //           ...backFileData,
    //           dates: {
    //             ...backFileData?.dates,
    //             [selectedDoc+'expiryDate']:attributeValue,
    //           },
    //         };
    //     console.log(updatedData,"lllllllllllllllllllllllll",attributeName,"xxxxxxxxxxxxxxxxxxxxxxxxxxxooxoxoxooooxooxoxxooxoxoxox")
    //     setfrontFileData(updatedData);
    //   }

    //   // Add similar checks for other attributes (dates, etc.)
    // };
    const handleAttributeChange = async (attributeName: string, attributeValue: string) => {
     
    
      if (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === "EmiratesId")) {
        // Check if 'frontFileData' contains documents and EmiratesId document
       
        const updatedData = {
          ...frontFileData,
          documents: fileData?.documents.map((doc: any) => {
            if (doc.document_name === "EmiratesId") {
              // Update the EmiratesId document attributes
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
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/documents/create-document`, updatedData);
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
            // Add more attributes for Lisence
          });
      }
      return dataToCollect;
    };
  
  
    const handleSubmit = async () => {
      try {
        // Collect data for the selected document
        const documentData = collectDocumentData(selectedDoc);
        const frontImage = uploadedImages[selectedDoc]?.frontImage || fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image||'';
        const backImage = uploadedImages[selectedDoc]?.backImage || fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image|| '';
        // const values = getCurrentValues();
        // Construct the updatedFormValues with the documentData array properly iterated
        const updatedFormValues = {
          user_id: userId, // Assuming userId is accessible in this scope
          is_personel_document: true, // Assuming it's always a personal document
          // project_id: projectId, // Assuming projectId is accessible in this scope
          // organisation_id: organisationId, // Assuming organisationId is accessible in this scope
          documents: documentData.map(data => ({
            document_name: selectedDoc,
            front_image: frontImage,
            back_image: backImage,
            expiry: data.expiryDate, // Map 'expiryDate' to 'expiry' field
            document_id: data.document_id, // Map 'selectedDoc' to 'document_id' field
            attributes: {
              ...Object.entries(data)
                .filter(([key, _]) => key !== 'expiryDate' && key !== 'document_id' && key !== selectedDoc)
                .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
            },
          })),
        };
        setIsAnyDocumentUploading(false)
        // Proceed with saving the document data...
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/documents/create-document`, updatedFormValues);
        // Find the index of the selected document in the documents array
        const selectedIndex = documents.findIndex(doc => doc.name === selectedDoc);

        // If the selected document is found and it's not the last element
        if ((selectedIndex !== -1 && selectedIndex < documents.length - 1 ) || (fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image|| fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image)) {
            // Get the name of the next document
            const nextDocumentName = documents[selectedIndex + 1].name;
            // Use nextDocumentName as needed
           setSelectedDoc(nextDocumentName)
        } else {
            // Handle case where selectedDoc is not found or it's the last element
            console.log("Selected document not found or it's the last element.");
        }

      } catch (error: any) {
        console.error('Error submitting form:', error.message);
      }
    };
    
    
    
  
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
    
  let documentDetails: string[]=[];
  if (docType!=='Certificates'){
      documentDetails =['/id_card.png','EmiratesId', '/passport.png','Passport', '/visa.png','Visa', '/driver-license.png','License','/blank-document.jpg','Other']
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
    },
    {
      src: documentDetails[8],
      name: documentDetails[9],
      isEditable: true,
      frontUploaded: false,
      backUploaded: false,
    },
    
  ]);
  const addNewDocument = () => {
    const newDocumentName = `Document Name ${documents.length + 1}`;
    const newDocument = {
      src: '/blank-document.jpg',
      name: newDocumentName,
      isEditable: true,
      frontUploaded: false,
      backUploaded: false,
    };
    setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    setDocumentUploadStatus((prevStatus) => [
      ...prevStatus,
      {
        frontUploaded: false,
        backUploaded: false,
        uploading: false,
      },
    ]);
    setDocumentAttributes((prevAttributes) => ({
      ...prevAttributes,
      [newDocumentName]: [
        { name: newDocumentName, label: `${newDocumentName} ID`, type: 'text', defaultValue: '' },
        { name: `${newDocumentName}expiryDate`, label: 'Expiry Date', type: 'text', defaultValue: '' },
      ],
    }));
    setSelectedDoc(newDocumentName);
  };
  
  const [documentUploadStatus, setDocumentUploadStatus] = useState(
    Array(documents.length).fill({
      frontUploaded: false,
      backUploaded: false,
      uploading: false,
    })
  );


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
    

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fileUploader/fileUploader`, {
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
      // Check for any document uploading status here
      // const anyDocumentUploading = documentUploadStatus.some(
      //   status => status.frontUploaded || status.backUploaded || status.uploading
      // );

      // Call the setter function to update the state
      setIsAnyDocumentUploading(true);
      }
    } catch (error) {
      console.error('Error with sending the POST request:', error);
    }
  };
  
   const handleBackUpload = async (index: number, selectedFile: File | null | undefined) => {
    setShowLoader(true);
     if (!selectedFile) return;
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fileUploader/fileUploader`, {
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
        setIsAnyDocumentUploading(true);
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

  const inputRef = useRef<HTMLInputElement | null>(null); 
  const [frontFileInputRefs, setFrontFileInputRefs] = useState<Array<RefObject<HTMLInputElement>>>(
    () => Array.from({ length: documents.length }, () => createRef())
  );
  
  // Update frontFileInputRefs when documents change
  useEffect(() => {
    setFrontFileInputRefs(Array.from({ length: documents.length }, () => createRef()));
  }, [documents]);


  const handleCopyToClipboard = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const valueWithoutHyphens = inputValue.replace(/-/g, ''); 
      inputRef.current.value = valueWithoutHyphens; 
      inputRef.current.select();
      document.execCommand('copy');
      inputRef.current.value = inputValue; 
    }
  };
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const handleIndex = (documentNumber: number) => {
    setSelectedFileIndex(documentNumber);
  };

const attributes = (documentAttributes as Record<string, DocumentAttribute[]>)[selectedDoc] || [];

const commonInputRef = useRef<HTMLInputElement | null>(null);
commonInputRefs.push(commonInputRef);
const fetchDocumentData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/documents/${userId}`);

    // Assuming the response data structure matches the MongoDB document structure
    const { data } = response;
    const frontData = data.documents.find((doc: any) => doc.document_name === "EmiratesId");
    const backData = data.documents.find((doc: any) => doc.document_name === "Passport");

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

return (
  <>

  <div className='flex flex-col justify-start'>

      <div className="flex flex-col overflow-y-scroll mt-2 sm:mt-0">
      {showLoader && (
      <div className="mx-auto flex flex-col align-middle items-center justify-center">
        <CommonSpinner />
      </div>
    )}

        <div style={{ width: '100%', height: 'auto' }} className="no-scrollbar">
          <div className="flex-col overflow-x-scroll no-scrollbar overflow-y-scroll mt-2 sm:ml-2 sm:mr-2">
            <ul
              className={`p-2 grid grid-cols-3 sm:flex flex-wrap items-center justify-center gap-y-2 gap-x-2 overflow-y-scroll no-scrollbar md:gap-x-4 md:gap-y-4 items-stretch  ${className}`}
            >
              {documents.map((document, index) => (
                <li
                  style={{ width: '100%', height: 'auto' }}
                  key={index}
                  className={`no-scrollbar h-26 items-center  justify-center max-w-[100px] overflow-hidden rounded-2xl  bg-[color:var(--mainTitleLightestColor)] ${
                    document.frontUploaded && document.backUploaded ? 'pointer-events-none opacity-60' : ''
                  } ${selectedDoc === document.name ? 'bg-[#EEF3FB] ring-2 ring-offset-2 ' : ''}`}
                  onClick={() =>{setSelectedDoc(`${documents[index].name}`);fetchDocumentData();}}  
                >
              
                <div className="flex items-center justify-center"  >
                  <img src={document.src} alt={`Document ${index}`} width={50} height={50} />
                </div>



                  {document.isEditable ? (
                    <>  <CommonTextInput
                    value={document.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder="Other Document Name"
                    className="text-[10px] pl-2 pr-2 rounded-2xl"
                    id=""
                  /> <p className="flex justify-center items-center text-[color:var(--mainTitleColor)] text-sm md:pb-2 pt-1 cursor-pointer no-underline hover:underline" onClick={() => {setPopupVisible(true);handleIndex(index)}}>
                    Upload {document.name}
                  </p></>

                  ) : (
                    <p className="flex justify-center items-center text-[color:var(--mainTitleColor)] text-sm md:pb-2 pt-1 cursor-pointer no-underline hover:underline" onClick={() => {setPopupVisible(true);handleIndex(index)}}>
                      {document.name}
                    </p>
                  )}
                  
                  { (!captureMethod && !documentUploadStatus[index].frontUploaded && !fileData) || (fileData?.documents && !fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image) || (fileData && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image) ? (
                    <>
                    
                    <input
                        type="file"
                        id={`frontFileInput-${index}`}
                        style={{ display: 'none' }}
                       
                        ref={frontFileInputRefs[index]} // Accessing RefObject at index directly
                        onChange={(event) => {
                          if (!captureMethod) {
                            const selectedFrontFile = event.target.files?.[0];
                            if (selectedFrontFile) {
                              changeDocumentFrontPicture(selectedFrontFile);
                              handleFrontUpload(index, selectedFrontFile);
                              handleAttributeChange("front_image",fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.front_image)
                            }
                          }
                        }}
                        
                      />


                      <label htmlFor={`frontFileInput-${index}`}
                      onClick={(e) => e.preventDefault()} 
                      >
                        {documentUploadStatus[index].uploading ? (
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
                    // Backside file upload
                    <>
                      { !documentUploadStatus[index].backUploaded ? (
                        <>
                          <input
                            type="file"
                            id={`backFileInput-${index}`}
                            style={{ display: 'none' }}
                            ref={frontFileInputRefs[index]} 
                            onChange={(event) => {
                              const selectedBackFile = event.target.files?.[0];
                              if (selectedBackFile) {
                                changeDocumentBackPicture(selectedBackFile);
                                handleBackUpload(index, selectedBackFile);
                                handleAttributeChange("back_image", fileData?.documents && fileData?.documents.find((doc: any) => doc.document_name === selectedDoc)?.back_image)
                              }
                            }}
                          />
                          <label htmlFor={`backFileInput-${index}`}
                           onClick={(e) => e.preventDefault()} 
                          >
                            {documentUploadStatus[index].uploading ? (
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
                </li>
              ))}
              <li onClick={addNewDocument} className="flex p-2 w-26 md:w-36 h-26 hover:ring-offset-2 hover:ring-2 items-center justify-center text-3xl text-extrabold bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleLightColor)] rounded-2xl transition-all duration-[250ms] ease-out group-hover:w-full">
                <span className="relative group-hover:text-white">+</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="sm:flex w-full justify-between mt-2 sm:mt-4 p-2 sm:p-4">
              <div className="w-full">
                <div className="flex items-center justify-center p-2">
                  {(uploadedImages[selectedDoc]?.frontImage || fileData?.documents) && (
                    <label htmlFor="profileImageInput">
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
                    <label htmlFor="profileImageInput">
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
                {/* <div className="flex items-center justify-center">
                  <CommonButtonSolidBlue onClick={handleSubmit} text={`Save ${selectedDoc} Details`} />
                </div> */}
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

                                        <div className="flex items-center justify-center">
                          <CommonButtonSolidBlue onClick={handleSubmit} text={`Ok`} />
                        </div> 
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
        </div>
      </div>

  </div>
  <CommonPopup
          showModal={captureMethod||false}
          onClose={() => setCaptureMethod(false)}
          heading="Camera Capture"
          content=""
        >
        <div>
          <CameraScan  />
      </div>
      </CommonPopup>
      <CommonPopup
          showModal={isPopupVisible}
          onClose={() => setPopupVisible(false)}
          heading="Camera Capture"
          content=""
        >
          <div className='flex flex-col w-full h-full' onClick={()=>setPopupVisible(false)}>
            <div className="flex gap-x-4 gap-y-4 justify-center">
           
            <div className='p-4 hover:ring-2 hover:ring-[color:var(--mainTitleColor)]' onClick={() => { 
            setCaptureMethod(false); 
            setPopupVisible(true); 
            if (selectedFileIndex !== null && selectedFileIndex < frontFileInputRefs.length) {
              frontFileInputRefs[selectedFileIndex].current?.click();
            }
          }}>
            <img className='h-10 w-10' src="/Folder.png" alt="Folder Icon" />
          </div>


              <div className='p-4 hover:ring-2 hover:ring-[color:var(--mainTitleColor)]' onClick={() => {setCaptureMethod(true),setPopupVisible(false)}}>
                <img className='h-20 w-20 ' src="/camera.jpg"></img>
              </div>
              
            </div>
            <button  className='w-full text-red-500' onClick={() => setPopupVisible(false)}>Cancel</button>
          </div>
        </CommonPopup>
  </>
);
};

export default CommonDocumentList;

