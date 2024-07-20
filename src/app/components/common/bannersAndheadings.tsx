'use client';
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash, FaImage, FaArrowLeft, FaFolder, FaCalendarDay, FaMoneyBillAlt, } from "react-icons/fa";
import { CommonFormTextInput, CommonInput } from "./inputs";
import { CommonButtonSolidBlue} from "./buttons";
import {AiOutlineDelete} from "react-icons/ai";
import { Collapsible, CollapsibleItem } from "./collapsible";
import { useRouter } from "next/navigation";
import CommonPopup from "./popUp";
import CommonDocumentList from "./documentsUpload";
import { CommonAttendance } from "../attendance";
import CommonSalary from "../salary";
import axios from "axios";
import { getUploadedImageLink } from "../utils/utils";
import Rating from "../rating";
import { Project } from "./projectGrid";
import PDFGenerator from "../collectedDocuments";
import PDFContainer from "../collectedDocuments";
import { IoGridOutline } from "react-icons/io5";
import QrReader from "react-qr-reader";
import Modal from 'react-modal';
interface CommonBackgroundTabsProps {
    description?: string;
    errorText: string;
    showError: boolean;
    children: ReactNode;
    disabled?:boolean;
    href:boolean;
    color:string;
    heading:string;
  }

export const CommonSectionHeadings: React.FC<CommonBackgroundTabsProps> = ({

    errorText,
    showError,
    children,
    disabled,
    href,
    color,
    heading,
  }) => {
   
    return (
      <div className="mx-auto">
        <p className={`flex justify-center text-white text-[26px] item-center w-full bg-[color:var(--mainTitleColor)]`}>{heading}</p>
        <div className="w-screen ">
        {children}
        </div>    
      </div>
    );
      
  };

interface CommonHeadingProps {
  color: string;
  heading: string;
  content: React.ReactNode;
  className?:string,
  children?:ReactNode;
  handleClick?: () => void;

}

export const CommonHeading: React.FC<CommonHeadingProps> = ({
  color,
  heading,
  content,
  className,
  children,
  handleClick
}) => {
  return (
    <div className={` p-1`}>
      <div className="flex justify-center p-1 mb-3 w-full border-b-2">
        <h2 className="text-[color:var(--mainTitleColor)] text-lg font-semibold ">{heading}</h2>
      </div>
      <div className={`${className} rounded-md`}>
        {content}
      </div>
      <div>{children}</div>
    </div>
);
};


interface ImageInfo {
  title: string;
  description: string;
  imageUrl: string;
  className?:string;

}

interface CommonImageWithInfoProps {
  imageInfo: ImageInfo;
  imageClassName?:string;
  upload?:string;

}

export const CommonImageWithInfo: React.FC<CommonImageWithInfoProps> = ({
  imageInfo,
  imageClassName,
  upload,
  // onEditClick,
  // onDeleteClick,
}) => {
  const [showImagePopup, setShowImagePopup] = useState(false);

  const handleImageClick = () => {
    setShowImagePopup(true);
  };
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited title and description
    setEditing(false);
  };

  const handleCancelClick = () => {
    // Reset edited values and exit editing mode
    setEditing(false);
  };

  return (
    <div className={`${imageInfo.className} grid grid-cols-1 justify-between items-center vvvsm:p-1 border border-[color:var(--lightBackgroundGreyColor)] rounded-md bg-white w-full `}>
      <div className="vvvsm:flex items-center md:flex-none ">
        <div className="flex-shrink-0">
          <img
            src={imageInfo.imageUrl}
            alt={imageInfo.title}
            className={`${imageClassName} rounded-sm cursor-pointer h-9 w-9 vvvsm:h-16 vvvsm:w-14  vvsm:h-[90px] vvsm:w-16  vsm:h-[100px] vsm:w-[125px] bsm:w-auto bsm:h-auto`}
            // w-[60px] vvvsm:w-[98px] vvsm:w-[110px] vsm:w-[200px] md:w-[175px] lg:w-[235px]
            onClick={handleImageClick}
          />
        </div>
        <div className="bsm:ml-4 ml-1 w-full p-1 vsm:p-3 sm:p-8">
          <CommonFormTextInput
            id="editedTitle"
            value={imageInfo.title}
            onChange={(e) => imageInfo.title = e.target.value}
            className="text-lg font-semibold w-auto"
          />
          <CommonFormTextInput
            id="editedDescription"
            value={imageInfo.description}
            onChange={(e) => imageInfo.description = e.target.value}
            className="text-gray-500 w-auto"
          />
        </div>
      </div>
      <div className="flex justify-between space-x-2 mt-3 ml-2 mr-2">
        <div>
        <button
          className="text-red-500 hover:text-red-700 transition-colors"
          // onClick={onDeleteClick}
        >
          <FaTrash />
        </button>
        </div>
        <div>
        {upload &&
        <button
          className="text-red-500 hover:text-red-700 transition-colors"
          // onClick={onDeleteClick}
        >
          <FaEdit />
        </button>}
        </div>
      </div>
      {showImagePopup && (
        //w-full
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50  ">
          <div className="max-w-screen-md p-4 bg-white rounded-md shadow-lg w-[600px] h-[600px]">
            <img
              src={imageInfo.imageUrl}
              alt={imageInfo.title}
              className="w-full h-full"
            />
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors mt-2"
              onClick={() => setShowImagePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export interface CommonProfileProps {
  id?:string,//compulsory
  profile_picture?:string,//compulsory
  first_name?:string;//compulsory
  createdAt?:Date;//compulsory
  fathers_name?:string;
  mothers_name?:string;
  last_name?:string;
  birth_date?:string;
  phone_no?:string;

  parmanent_country?:string;
  email:string;//compulsory
  current_address?:string;
  parmanent_address?:string;
  ratings?:number[];

  description?:string;

  is_supervisor?:boolean;
  is_client?:boolean;//compulsory
  user_status?:string;
  team:string[];
  skills?:string[];
  attendance:[],
  qualification?:string;  
  gender?:string;
  occupation?:string,
  position_at_company?:string;
  is_hsc_officer:boolean;
  
  permanent_city:string
  permanent_address:string;
  permanent_state:string;
  permanent_country:string;
  current_city:string;
  current_state:string;
  current_country:string;
  email_verified:boolean;
  experiance?:string;
  current_projects?:[];
  qr_code?:string;
  onClick?: (() => void) | undefined;
  onProfileUpdate?: ()=>void;
}

export const CommonProfile: React.FC<CommonProfileProps> = ({
  id,
  profile_picture,
  first_name,
  createdAt,

  fathers_name,
  mothers_name,
  last_name,
  birth_date,
  phone_no,
  parmanent_country,
  email,
  current_address,
  parmanent_address,
  qualification,
  gender,
  attendance,
  position_at_company,
  experiance,
  ratings,
  current_projects,
  description,

  is_supervisor,
  is_client,
  user_status,
  team,
  skills,
}) => {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPdfVisible, setPdfVisible] = useState(false);

  const [docType,setDocType]=useState('');
  const [position_update,setPosition]=useState('');
  const [is_employee_user_update, setEmployee] = useState(false);
  const [is_supervisor_update, setSupervisor] = useState(false);
  const [is_sub_contractor_update, setSubContractor] = useState(false);
  const [calendarAvailability, setCalendarAvailability] = useState<any[]>(attendance);
  

  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [showTime, setShowTime] = useState(false) ;
  const [showSalary, setShowSalary] = useState(false) ;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({ uploadedImage:'' });
  const [userType, setUserType] = useState<string>('');
  const [fileData, setFileData] = useState<any>('');
 


  const formattedDate = createdAt instanceof Date ? createdAt.toLocaleString() : createdAt;

  let label_1='EMPLOYEE DETAILS';
  let label_2='ROLE';
  let label_8='SKILLS';
  const [inputFields, setInputFields] = useState([
    { label: 'First Name',label2: 'first_name', defaultValue: first_name, isDisabled: false,value: first_name  },
    { label: 'Middle Name',  label2: 'fathers_name',defaultValue: fathers_name, isDisabled: false ,value:fathers_name},
    { label: 'Last Name',label2: 'last_name', defaultValue: last_name, isDisabled: false,value:last_name },
    { label: 'Phone Number', label2: 'phone_no',defaultValue: phone_no, isDisabled: false,value:phone_no },
    { label: 'Birth Date',label2: 'birth_date', defaultValue: birth_date, isDisabled: false,value:birth_date },
    { label: 'Gender', label2: 'gender',defaultValue: gender, isDisabled: false,value:gender },
    { label: 'Qualification', label2: 'qualification',defaultValue: qualification, isDisabled: false,value:qualification },
    { label: 'Experiance', label2: 'experiance',defaultValue: experiance, isDisabled: false,value:experiance },
 
    { label: 'Country', label2: 'parmanent_country',defaultValue: parmanent_country, isDisabled: false,value:parmanent_country },
    { label: 'Email Address', label2: 'email',defaultValue: email, isDisabled: false,value:email },
    { label: 'Current Address', label2: 'current_address',defaultValue: current_address, isDisabled: false,value:current_address },
    { label: 'Parmanent Address',label2: 'parmanent_address', defaultValue: parmanent_address, isDisabled: false,value:parmanent_address },
  ]);
  const [tableData, setTableData] = useState([
    { No: 1, 'Trade-InDirect': 'Project Manager', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 2, 'Trade-InDirect': 'Project Engineer', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 3, 'Trade-InDirect': 'Site Engineer', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 4, 'Trade-InDirect': 'Document Controller', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 5, 'Trade-InDirect': 'HSE Officer', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 6, 'Trade-InDirect': 'Foreman', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 7, 'Trade-InDirect': 'Surveyor', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 8, 'Trade-InDirect': 'Driver', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 9, 'Trade-InDirect': 'Supervisor', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 10, 'Trade-InDirect': 'Store Keeper', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 11, 'Trade-InDirect': 'Mason', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 12, 'Trade-InDirect': 'Labour', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 13, 'Trade-InDirect': 'Erector /Rigger', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 14, 'Trade-InDirect': 'Carpenter', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 15, 'Trade-InDirect': 'Water Proofing Technician', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 16, 'Trade-InDirect': 'Pile Breaker', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 17, 'Trade-InDirect': 'Electrician/ Plumber', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 18, 'Trade-InDirect': 'Crane operator', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
    { No: 19, 'Trade-InDirect': 'Others- Day & Night Security', ATS: '0', 'S.C': '0', 'SC Details': 'Details..' },
  ]);

  const handleInputChange = (index: number, newValue: string) => {
    setInputFields((prevState) =>
      prevState.map((field, i) => (i === index ? { ...field, value: newValue } : field))
    );
  };
  const imageUpload = async (imageDataUrl:string) => {
    const blob = await fetch(imageDataUrl).then(res => res.blob());
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    const imageLink = await getUploadedImageLink(file);
    return imageLink;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageLink = await imageUpload(event.target?.result as string);
        setProfile({ uploadedImage: imageLink });
        handleSubmit();
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const [averageRating, setAverageRating] = useState<number>(0);
  const handleSubmit = async () => {
    try {
      const updatedData = inputFields.reduce((acc, field) => {
        acc[field.label2] = field.value;
        return acc;
      }, {} as Record<string, any>);
      updatedData.position = position_update;
      console.warn(averageRating,"JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
      updatedData.rating=userRatings;

      if (userType === "Employee") {
        setEmployee(true);
      } else if (userType === "Supervisor") {
        setSupervisor(true);
      } else {
        setSubContractor(true);
      }

      if (profile.uploadedImage) {
        updatedData.profile_picture = profile.uploadedImage;
      }

      const response = await axios.put(`http://localhost:5000/api/user/${phone_no}`, updatedData);
      console.log('Updated successfully:', response.data);
      // window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  
  const openPopupPersonel = () => {
    setDocType('Personel Documents')
    setPopupVisible(true);
    
  };
  const openPopupCertificates = () => {
    setDocType('Certificates')
    setPopupVisible(true);
  };

 


  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const firstSixFields = inputFields.slice(0, 8);
const remainingFields = inputFields.slice(8);
  // Function to handle rating change
  

  const [userRatings, setUserRatings] = useState<number[]>([]);
 

  // Calculate average rating when ratings prop changes
  useEffect(() => {
      if (ratings && ratings.length > 0) {
          const averageRating = calculateAverageRating(ratings);
          setAverageRating(averageRating);
          setUserRatings(ratings);
      }
  }, [ratings]);

  // Function to handle rating changes
  const handleRatingChange = (value: number | number[]) => {
      const newRatings = Array.isArray(value) ? value : [value]; // Ensure value is an array
      setUserRatings(newRatings); // Update the state with the new ratings

      // Recalculate the average rating
      const averageRating = calculateAverageRating(newRatings);
      console.log('Average Rating:', averageRating);
      setAverageRating(averageRating);
  };

  // Function to calculate the average rating
  const calculateAverageRating = (ratings: number[]) => {
      const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
      const averageRating = totalRating / ratings.length;
      return averageRating;
  };

  const ratingsArray = Array.isArray(ratings) ? ratings : ratings ? [ratings] : [];
  const fetchDocumentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/documents/${phone_no}`);
  
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
console.warn(attendance,fileData,"zxxxxxxxxxxxxxxxxxxxxxzzzzzzzzzzzzzzzMNNNNNNNNNNNNNNNNNCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
const [error, setError] = useState<string | null>(null);

const handleScan = async (data: any) => {
  if (data) {
    try {
      const response = await axios.get(`/api/users/profile/${data}`);
      // setUser(response.data);
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
    <>
    { isPopupVisible && <div className='flex-cols sm:w-auto  h-full sm:h-[550px] overflow-scroll no-scrollbar'>  
              <CommonDocumentList 
                className="grid grid-cols-1"
                isPopup={true}
                docType={docType}
                userId={phone_no}
                // fileData={fileData}
                // setFileData={setFileData}
            />
            </div> }
            { isPdfVisible &&
    <div className='flex-cols sm:w-auto  h-full overflow-scroll no-scrollbar'> 
            <PDFContainer userId={phone_no || ''} />
    </div>}

    {showTime &&               
    <CommonAttendance profileType={'user'} phone_no={phone_no} attendance={attendance} editedTitle={""} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""} onSave={function (): void {
            throw new Error("Function not implemented.");
          } } />
    }
    {!showTime && !isPopupVisible && !isPdfVisible &&
    <div className="h-screen mb-20">


        <div className=" grid bsm:grid-cols-2 amd:grid-cols-3  mt-4 sm:mt-6 sm:w-full h-screen ">

            <div className="col-span-1 " >

                <CommonSectionTitle title={label_1} titleColor={""} fontSize={""}/>

                <div className="relative flex-col justify-center items-center mb-4">
                    <div className="flex justify-between ">
                      <div className={`flex items-center justify-center relative rounded-2xl ml-4 sm:mr-4 mb-2 w-[160px] h-[160px] bsm:w-auto md:w-full sm:h-auto ring-[color:var(--mainTitleLightestColor)] ring-offset-2 ring-2  `}>
                      <label htmlFor="profileImageInput" className=''>
                     
                      {profile_picture!=null ? <img className='mb-2 mx-auto aspect-square'                           width={80}
                          height={80} src={profile_picture} alt={''} />: <img className='mb-2 mx-auto aspect-square h-[200px] w-[200px]' src='' />}

                      </label>
                        
                      </div>
                      <div className="sm:hidden space-y-4 ml-2 mr-4">
                        <h1
                          className="text-md bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] rounded-2xl p-3 hover:ring-offset-2 hover:ring-2 shadow-sm"
                          onClick={openPopupPersonel}        
                        >
                          Documents
                        </h1>
                        <h1
                          className="text-md bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] rounded-2xl p-3 hover:ring-offset-2 hover:ring-2 shadow-sm"
                          onClick={()=>setPdfVisible(true)}      
                        >
                          <IoGridOutline />
                        </h1>
                        
                        <h1
                          className="text-md bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] rounded-2xl p-3 hover:ring-offset-2 hover:ring-2 shadow-sm"
                          onClick={openPopupCertificates}
                        >
                          Certificates
                        </h1>

                      </div>
                    </div>
                    <div className="flex items-center justify-center text-[12px] text-[color:var(--mainTitleLightColor)] gap-x-2 font-bold "> 
                        <h1><FaImage/></h1>
                        <h1 onClick={() => {  openFileInput()}} style={{ cursor: 'pointer' }}>
                          Change Profile Image
                        </h1>
                            <input
                              ref={fileInputRef}
                              type="file"
                              id="profileImageInput"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleImageUpload}
                            />
                      </div>
                </div>
              
                <Rating defaultValue={ratings} onChange={handleRatingChange} />
                {/* <div style={{ margin: '0 auto', width: '320px' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />
      </div> */}

                <div className="flex justify-center mt-6">
              <CommonButtonSolidBlue onClick={handleSubmit} text="Update"/>
          </div>

            </div>
            <div className="col-span-1" >

            <div className=" flex-col justify-center items-center w-full">

              <div>
                {/* First six elements */}
                <div className="grid grid-cols-2 sm:grid-cols-2">
                  {firstSixFields.map((field, index) => (
                    <CommonInput
                      key={index}
                      label={field.label}
                      defaultValue={field.defaultValue}
                      isDisabled={field.isDisabled}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>

                {/* Remaining elements */}
                <div className="grid grid-cols-1">
                  {remainingFields.map((field, index) => (
                    <CommonInput
                      key={index + 8}  
                      label={field.label}
                      defaultValue={field.defaultValue}
                      isDisabled={field.isDisabled}
                      onChange={(e) => handleInputChange(index + 8, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              </div>
          
              {/* <div  className=" flex-col justify-center sm:space-y-3 items-center w-full">
                  
                 

                 <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1">
                      <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl ">
                        <h1 className="text-[10px]  text-[color:var(--mainTitleLightColor)]">{label_2}</h1>      
                        <select 
                          onChange={(event) => setUserType(event.target.value)}
                          id="User Type" 
                          className="p-2 bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] text-md   focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-[color:var(--lightBackgroundColor)]  dark:border-[color:var(--lightBackgroundColor)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                  <option  value="Not selected">Select a User Type</option>
                                  <option selected={is_employee_user} value="Employee">Employee/ Labour</option>
                                  
                                  <option selected={is_supervisor} value="Supervisor">Supervisor</option>
                                  
                                  <option selected={is_sub_contractor} value="Sub Contractor">Sub Contractor</option>
                        </select>
                      </div>
                  </div> 
                
                  <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4  pl-4 pr-4 p-1">
                      <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl ">
                        <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Position</h1>

                        <select 
                          onChange={(event) => setPosition(event.target.value)}
                          id="User Type" 
                          className="p-2 bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] text-md   focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-[color:var(--lightBackgroundColor)]  dark:border-[color:var(--lightBackgroundColor)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="Not selected">Select Position</option>
                          
                          {tableData.map((row) => (
                            <option key={row.No} value={row['Trade-InDirect']}>{row['Trade-InDirect']}</option>
                          ))}
                        </select>
                      </div>
                  </div>           
              </div>

                <div className=" p-2">
                    <CommonSectionTitle title="TEAM 1" titleColor={""} fontSize={""}/>
                    <div className="">
                    <div className="overflow-y-scroll h-[444px] no-scrollbar border-2 border-[color:var(--mainTitleLightestColor)] rounded-xl ">
                    <CommonUserCard  circleColor={""} employeeImage={'/engineer 1.png'} employeeName={"Zaid Shaikh"} userDetailsPath={""} position="Structual Engineer"/>
                    </div>
                    </div> 
                </div> */}

            </div>

            <div className="col-span-1"  >
              <div className="hidden sm:grid grid-cols-6">
                {/* <CommonSectionTitle title="DOCUMENTS" titleColor={""} fontSize={""}/> */}
                  
                <div className="col-span-5 flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4  p-1" onClick={openPopupPersonel}>
                    <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-l-2xl">       
                        <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                          <h1 className=""><FaFolder/></h1>
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg">All Documents</h1> 
                       
                          </div>
                    </div>
                </div>   
                <div className="col-span-1 flex z-10 items-center justify-center w-full sm:h-auto gap-x-4  pr-4 p-1" onClick={()=>setPdfVisible(true)}>
                    <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-r-2xl">       
                        <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                          
                        <h1 className="text-[color:var(--mainTitleColor)] text-3xl"><IoGridOutline /></h1> 
                        
                          </div>
                    </div>
                </div>          
              </div>
              <div className="mt-3 hidden sm:block">
                  {/* <CommonSectionTitle title="CERTIFICATES" titleColor={""} fontSize={""}/> */}
                  <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" onClick={openPopupCertificates}>
                  <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">              
                          <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                            <h1 className=""><FaFolder/></h1>
                          <h1 className="text-[color:var(--mainTitleColor)] text-lg">All Certificates</h1> 
                            </div>
                      </div>
                  </div>
              </div>
          
        
            {/* <div className="mt-3">
              
              <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" onClick={() => setShowSalary(true)}>
                  <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">                    
                      <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                        <h1 className=""><FaMoneyBillAlt/></h1>
                      <h1 className="text-[color:var(--mainTitleColor)] text-lg">Salary</h1> 
                        </div>
                  </div>
              </div>           
          </div> */}
          <div className="mt-3">
              <div className="sm:hidden">
              <CommonSectionTitle  title="ATTENDANCE" titleColor={""} fontSize={""}/></div>
              <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" onClick={() => setShowTime(true)}>
              <div className="truncate p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">         
                      <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                        <h1 className=""><FaCalendarDay/></h1>
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg">Attendance</h1> 
                      </div>
                  </div>
              </div>
          </div>
               
          <div className="mt-3">
             <div className="sm:hidden">
              <CommonSectionTitle title="PROJECT HISTORY" titleColor={""} fontSize={""}/></div>
              <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4  pl-4 pr-4 p-1">
                  <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">
                      <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]"></h1>
                        <Collapsible>

                        <CollapsibleItem headerText={"All Projects"} iconClass={''} className="shadow-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] text-lg" >
                        {current_projects?.map((item, index) => (
                          <div key={index} className='flex flex-wrap shadow-md rounded-b-xl hover:bg-gray-100'>
                            
              
                                <h1 className='text-lg text-[color:var(--mainTitleColor)] p-2 m-2  '>{item}</h1>
                              
                           
                          </div>


          
   
                        ))}
                        </CollapsibleItem>
                        </Collapsible>
                  </div>

              </div>
          </div>
                  
          <div className="mt-3 text-lg p-2">
          {/* <div className="sm:hidden ">
          <CommonSectionTitle title="SKILLS" titleColor={""} fontSize={""}/>
          </div> */}
                
              <CommonInput defaultValue="Carpenting, Lifting, Interior designing" label={label_8}/>
          </div>

                  
        </div>
        </div>


         <div className="flex fixed top-[450px] items-center justify-center z-20 p-2 w-full">
          
         {/* <CommonPopup
              showModal={isPopupVisible}
              onClose={() => setPopupVisible(false)}
              heading={docType}
              content='' >
            <div className='flex-cols sm:w-auto  h-[545px] sm:h-[550px] overflow-scroll no-scrollbar'>  
              <CommonDocumentList 
                className="grid grid-cols-1"
                isPopup={true}
                docType={docType}
                userId={phone_no}
            />
            </div>             
          </CommonPopup> */}
          
          {/* <CommonPopup
            showModal={showTime}
            onClose={() => setShowTime(false)}
            heading={'Attendance'}
            content='' >
              <CommonAttendance editedTitle={""} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""} onSave={function (): void {
            throw new Error("Function not implemented.");
          } } />
          </CommonPopup> */}
          <CommonPopup
            showModal={showSalary}
            onClose={() => setShowSalary(false)}
            heading={'Salary Distribution'}
            content='' >
              <div className="overflow-y-scroll no-scrollbar  h-[500px] w-full">
              <CommonSalary >
                <div>sddvsdv</div>
              </CommonSalary>
              </div>
          </CommonPopup>
        </div>
    </div>}
    </>

  );
};


interface CommonHeader {
  circleColor?: string;
  employeeImage?: string;
  employeeName?: string;
  addedOn?: string;
  onDeleteClick?: () => void;
  onClick?: (() => void) | undefined;
  description?:string;
}

export const CommonHeader: React.FC<CommonHeader> = ({
  circleColor,
  employeeImage,
  employeeName,
  addedOn,
  onDeleteClick,
  onClick,
  description,
}) => {
  return (
    <>
      <div className="flex items-center justify-between cursor-pointer sm:w-full ml-2 " >
        <div className="flex items-center gap-x-4">
          <div className="text-[14px] sm:shadow-sm text-[color:var(--mainTitleLightColor)]" onClick={onClick}>
            <FaArrowLeft />
          </div>
          <div className={`flex items-center justify-center relative z-20 mt-4 sm:mt-0 rounded-full shadow-xl w-auto h-auto ${circleColor} mb-2`}>
            <img src={employeeImage} alt="Employee" className="items-center w-[40px] h-[40px] object-cover p-1" />
          </div>
          <div>
            <h1 className="sm:text-2xl font-bold text-[color:var(--mainTitleColor)]">{employeeName}</h1>
          </div>
        </div>
        <div className="hidden sm:flex gap-y-2 sm:gap-y-0 items-center gap-x-4">
          <div className="hidden sm:block">
            <h6 className="text-[16px] text-[color:var(--lightBackgroundColor)] font-semibold">Added on {addedOn}</h6>
          </div>
          <div className="bg-red-100 rounded-xl flex items-center gap-x-2 p-2 text-red-500 font-bold m-2" onClick={onDeleteClick}>
            <h1 className="text-lg">
              <AiOutlineDelete />
            </h1>
            <h1 className="text-sm">Delete</h1>
          </div>
        </div>
      </div>
      <div className="sm:hidden flex items-center justify-between gap-y-2 sm:gap-y-0 gap-x-4 pl-2 pr-2">
        <div className="">
          <h6 className="text-[10px] text-[color:var(--lightBackgroundColor)] font-semibold">Added on {addedOn}</h6>
        </div>
        <div className="bg-red-100 rounded-xl flex items-center gap-x-2 p-2 text-red-500 font-bold mb-2" onClick={onDeleteClick}>
          <h1 className="text-lg">
            <AiOutlineDelete />
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {description}
      </div>
      <div className="border-b-2 sm:mt-4 border-[color:var(--lightBackgroundGreyColor)] sm:w-full"></div>
    </>
  );
};


interface CommonUserCardProps {
  circleColor: string;
  employeeImage: string;
  employeeName: string;
  userDetailsPath: string;
  position?:string;
  role?:string;
}

export const CommonUserCard: React.FC<CommonUserCardProps> = ({
  circleColor,
  employeeImage,
  employeeName,
  userDetailsPath,
  position,
  role
}) => {
  const router = useRouter();

  const handleUserCardClick = () => {
    router.push(userDetailsPath);
  };

  return (
    <div className="flex-col items-center justify-center w-full sm:h-auto gap-x-4 p-2">
      <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] shadow-md rounded-2xl pl-4">
        {/* <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">{position}</h1> */}
        <h1 className="text-[12px] text-[color:var(--mainTitleLightColor)]">{role}</h1>

        <div className="flex items-center justify-start gap-x-2" onClick={handleUserCardClick}>
          <div className={`flex items-center justify-center relative rounded-full shadow-xl w-auto h-auto ${circleColor}  mb-2`}>
            <img
              src={employeeImage}
              alt="Employee"
              className={`items-center w-[28px] h-[28px] object-cover p-1 cursor-pointer`}
            />
          </div>
          <div className="flex flex-col items-start gap-y-1">
            <h1 className="text-[color:var(--mainTitleColor)] text-lg">{employeeName}</h1>
            {/* <h1 className="text-[color:var(--mainTitleColor)] text-sm opacity-50">{role}</h1> */}

          </div>
        </div>
      </div>
    </div>
  );
};



interface CommonSectionTitleProps {
  title: string;
  titleColor: string;
  fontSize: string;
}

export const CommonSectionTitle: React.FC<CommonSectionTitleProps> = ({ title, titleColor, fontSize }) => {
  return (
    <div className="flex items-center justify-start pl-4 sm:pl-6 pb-2">
      <h1 className='text-[16px] md:text-[18px] text-[color:var(--mainTitleLightColor)]'>{title}</h1>
    </div>
  );
};

interface ContractorProfileProps {
  id?: string;
  profile_picture?: string;
  company_name?: string;
  contractor_name?:string;
  phone_no?: string;
  address?:string;
  country?:string;
  email?:string;//compulsory
  description?:string;
  services_provided?: string[];
  team: string[];
  materials_supplied?: string[];
  projects: string[];
  billing_information?: string;
  documents_and_contracts?: string[];
  activity_logs?: string[];
  createdAt?:Date;
}

export const ContractorProfile: React.FC<ContractorProfileProps> = ({
  id,
  profile_picture,
  createdAt,
  company_name,
  contractor_name,
  phone_no,
 country,
  email,
  description,
  team,
  address
}) => {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showTime, setShowTime] = useState(false) ;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({ uploadedImage:'' });
  let label_1='EMPLOYEE DETAILS';
  const [inputFields, setInputFields] = useState([
    { label: 'Name',label2: 'name', defaultValue: company_name, isDisabled: false,value: company_name  },
    { label: 'Contractor Name',  label2: 'contractor_name',defaultValue: contractor_name, isDisabled: false ,value:contractor_name},
    { label: 'Phone Number', label2: 'phone_no',defaultValue: phone_no, isDisabled: false,value:phone_no },
    { label: 'Country', label2: 'parmanent_country',defaultValue: country, isDisabled: false,value:country },
    { label: 'Email Address', label2: 'email',defaultValue: email, isDisabled: false,value:email },
    { label: 'Current Address', label2: 'current_address',defaultValue: address, isDisabled: false,value:address },  
  ]);
  const handleInputChange = (index: number, newValue: string) => {
    setInputFields((prevState) =>
      prevState.map((field, i) => (i === index ? { ...field, value: newValue } : field))
    );
  };
  const imageUpload = async (imageDataUrl:string) => {
    const blob = await fetch(imageDataUrl).then(res => res.blob());
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    const imageLink = await getUploadedImageLink(file);
    return imageLink;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageLink = await imageUpload(event.target?.result as string);
        setProfile({ uploadedImage: imageLink });
        handleSubmit();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedData = inputFields.reduce((acc, field) => {
        acc[field.label2] = field.value;
        return acc;
      }, {} as Record<string, any>);
     

      if (profile.uploadedImage) {
        updatedData.profile_picture = profile.uploadedImage;
      }

      const response = await axios.put(`http://localhost:5000/api/contractor_company/${phone_no}`, updatedData);
      console.log('Updated successfully:', response.data);
      // window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const firstSixFields = inputFields.slice(0, 8);
  const remainingFields = inputFields.slice(8);
  return (
    <>
    {!showTime && !isPopupVisible && 
    <div className="h-screen mb-20">
        <div className=" grid bsm:grid-cols-2 amd:grid-cols-3  mt-4 sm:mt-6 sm:w-full h-screen ">
            <div className="col-span-1 " >
                <CommonSectionTitle title={label_1} titleColor={""} fontSize={""}/>
                <div className="relative flex-col justify-center items-center mb-4">
                    <div className="flex justify-between ">
                      <div className={`flex items-center justify-center relative rounded-2xl ml-4 sm:mr-4 mb-2 w-[160px] h-[160px] bsm:w-auto md:w-full sm:h-auto ring-[color:var(--mainTitleLightestColor)] ring-offset-2 ring-2  `}>
                      <label htmlFor="profileImageInput" className=''>
                     
                      {profile_picture!=null ? <img className='mb-2 mx-auto aspect-square'                           width={80}
                          height={80} src={profile_picture} alt={''} />: <img className='mb-2 mx-auto aspect-square h-[200px] w-[200px]' src='' />}

                      </label>            
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-[12px] text-[color:var(--mainTitleLightColor)] gap-x-2 font-bold "> 
                        <h1><FaImage/></h1>
                        <h1 onClick={() => {  openFileInput()}} style={{ cursor: 'pointer' }}>
                          Change Profile Image
                        </h1>
                            <input
                              ref={fileInputRef}
                              type="file"
                              id="profileImageInput"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={handleImageUpload}
                            />
                      </div>
                </div>
                <div className="flex justify-center mt-6">
                   <CommonButtonSolidBlue onClick={handleSubmit} text="Update"/>
                </div>
            </div>
            <div className="col-span-1" >
            <div className=" flex-col justify-center items-center w-full">
              <div>
                {/* First six elements */}
                <div className="grid grid-cols-2 sm:grid-cols-2">
                  {firstSixFields.map((field, index) => (
                    <CommonInput
                      key={index}
                      label={field.label}
                      defaultValue={field.defaultValue}
                      isDisabled={field.isDisabled}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>

                {/* Remaining elements */}
                <div className="grid grid-cols-1">
                  {remainingFields.map((field, index) => (
                    <CommonInput
                      key={index + 8}  
                      label={field.label}
                      defaultValue={field.defaultValue}
                      isDisabled={field.isDisabled}
                      onChange={(e) => handleInputChange(index + 8, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              </div>
            </div>
            <div className="col-span-1">   
          <div className="mt-3">
             <div className="sm:hidden">
              <CommonSectionTitle title="PROJECT HISTORY" titleColor={""} fontSize={""}/></div>
              {/* <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4  pl-4 pr-4 p-1">
                  <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">
                      <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]"></h1>
                        <Collapsible>

                        <CollapsibleItem headerText={"All Projects"} iconClass={''} className="shadow-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] text-lg" >
                        {projects?.map((item, index) => (
                          <div key={index} className='flex flex-wrap shadow-md rounded-b-xl hover:bg-gray-100'>
                            
                                <h1 className='text-lg text-[color:var(--mainTitleColor)] p-2 m-2  '>{item}</h1>
                                   
                          </div>
                        ))}
                        </CollapsibleItem>
                        </Collapsible>
                  </div>

              </div> */}
          </div>           
        </div>
        </div>
    </div>}
    </>

  );
};



interface SubContractor {
  title: string;
  description: string;
}

interface SubContractorsSectionProps {
  subcontractors: SubContractor[];
  onAddSubContractor: (subContractor: SubContractor) => void;
  onRemoveSubContractor: (index: number) => void;
}

export const SubContractorsSection: React.FC<SubContractorsSectionProps> = ({ subcontractors, onAddSubContractor, onRemoveSubContractor }) => {
  // State variable to manage new subcontractor data
  const [newSubContractor, setNewSubContractor] = useState<SubContractor>({ title: '', description: '' });

  // Function to handle adding a new subcontractor
  const handleAddSubContractor = () => {
    onAddSubContractor(newSubContractor);
    setNewSubContractor({ title: '', description: '' }); // Clear input fields after adding
  };

  return (
    <div>
      {/* Render existing subcontractors */}
      {subcontractors.map((subContractor, index) => (
        <div key={index}>
          <p>{subContractor.title}</p>
          <p>{subContractor.description}</p>
          {/* Add more details as needed */}
          <button onClick={() => onRemoveSubContractor(index)}>Remove</button>
        </div>
      ))}
      {/* Input fields to add new subcontractor */}
      <input
        type="text"
        value={newSubContractor.title}
        placeholder="Title"
        onChange={(e) => setNewSubContractor({ ...newSubContractor, title: e.target.value })}
      />
      <input
        type="text"
        value={newSubContractor.description}
        placeholder="Description"
        onChange={(e) => setNewSubContractor({ ...newSubContractor, description: e.target.value })}
      />
      <button onClick={handleAddSubContractor}>Add Subcontractor</button>
    </div>
  );
};





interface ModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoc: string;
  fileData: any; // Replace with actual type
  uploadedImages: any; // Replace with actual type
  handleAttributeChange: (attribute: string, value: string) => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  isOpen,
  onClose,
  selectedDoc,
  fileData,
  uploadedImages,
  handleAttributeChange,
}) => {
  const commonInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="w-full">
        {/* Your content here, similar to what you described */}
        {selectedDoc === 'EmiratesId' ? (
          <>
            <CommonInput
              label="Name"
              ref={commonInputRef}
              defaultValue={
                (fileData?.documents && fileData.documents.find((doc: any) => doc.document_name === 'EmiratesId')?.attributes?.name) ||
                (uploadedImages[selectedDoc]?.names && uploadedImages[selectedDoc]?.names['name']) ||
                ''
              }
              className=""
              onChange={(e) => handleAttributeChange('name', e.target.value)}
            />
            {/* Include other CommonInput components as needed */}
          </>
        ) : (
          <>
            <CommonInput
              label={`${selectedDoc} id`}
              ref={commonInputRef}
              defaultValue={
                (fileData?.documents && fileData.documents.find((doc: any) => doc.document_name === selectedDoc)?.document_id) ||
                (uploadedImages[selectedDoc]?.extractedIdNumbers && uploadedImages[selectedDoc]?.extractedIdNumbers[selectedDoc]) ||
                ''
              }
              className=""
              onChange={(e) => handleAttributeChange(selectedDoc, e.target.value)}
            />
            {/* Include other CommonInput components as needed */}
          </>
        )}
        <button className="text-red-500" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

















