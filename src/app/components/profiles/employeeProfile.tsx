'use client';
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { FaEdit, FaTrash, FaImage, FaArrowLeft, FaFolder, FaCalendarDay, FaMoneyBillAlt, FaStar, FaQrcode, FaPen, FaToolbox, FaPlus, FaBuilding } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { BsQrCode } from "react-icons/bs";
import { CommonAttendance } from "../attendance";
import CommonSalary from "../salary";
import axios from "axios";
import { getUploadedImageLink } from "../utils/utils";
import Rating from "../rating";
import Modal from 'react-modal';
import PDFGenerator from "../collectedDocuments";
import PDFContainer from "../collectedDocuments";
import { CommonProfileProps, CommonSectionTitle } from "../common/bannersAndheadings";
import CommonDocumentList from "../common/documentsUpload";
import { CommonAddButton, CommonButtonSolidBlue } from "../common/buttons";
import { CommonInput } from "../common/inputs";
import { Collapsible, CollapsibleComponent, CollapsibleItem } from "../common/collapsible";
import CommonPopup from "../common/popUp";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { faEdit,faPerson, faQrcode, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillQqSquare, AiOutlineQrcode } from "react-icons/ai";
import SingleDocument from "../common/documentsGird";
import CameraScan from "../common/cameraScan";
import UserProfile from "@/app/context/[contractorId]/dashboard/TabMenu/addUser/editUser/page";
import { CommonSpinner } from "../common/notifications";






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
  occupation,
  ratings,
  current_projects,
  description,


  is_supervisor,
  is_client,
  is_hsc_officer,
  permanent_address,
  permanent_city,
  permanent_state,
  permanent_country,
  current_city,
  current_state,
  current_country,
  email_verified,
  user_status,
  team,
  skills: initialSkills = [],
  qr_code,
  onClick
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPdfVisible, setPdfVisible] = useState(false);

  const [docType,setDocType]=useState('');
  const [doc_name,setDocName]=useState('');

  const [doc_image,setDocImage]=useState('');
  const [showLoader, setShowLoader] = useState(false);

  const [position_update,setPosition]=useState('');
  const [is_employee_user_update, setEmployee] = useState(false);
  const [is_supervisor_update, setSupervisor] = useState(false);
  const [is_sub_contractor_update, setSubContractor] = useState(false);

  

  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [showTime, setShowTime] = useState(false) ;
  const [showSalary, setShowSalary] = useState(false) ;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<string | undefined>(profile_picture);
  const [userType, setUserType] = useState<string>('');
  const [fileData, setFileData] = useState<any>('');
  const [showInput, setShowInput] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(initialSkills);

  const [updated, setUpdated] = useState(false);

  

  useEffect(() => {
    setProfile(profile_picture);
  }, [profile_picture]);

  useEffect(() => {
    if (updated) {
      handleSubmit();
      setUpdated(false);
    }
  }, [skills]);

  const handleAddSkill = () => {
    setShowInput(true);
  };

  const handleSaveSkill = () => {
    if (skillInput.trim()) {
      setSkills(prevSkills => [...prevSkills, skillInput.trim()]);
      setSkillInput('');
      setShowInput(false);
      setUpdated(true);
    }
  };


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


  const handleInputChange = (index: number, newValue: string) => {
    setInputFields((prevState) =>
      prevState.map((field, i) => (i === index ? { ...field, value: newValue } : field))
    );
  };

  const handleImageLinking = async (file: File, side: string) => {
    const imageLink = await getUploadedImageLink(file);
  
    setProfile(imageLink)
  };
  
  const handleProfilUpload = async (selectedFile: File | null | undefined) => {
    setShowLoader(true);
     if (!selectedFile) return;

      const syntheticEvent = {
        target: {
          files: [selectedFile],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(syntheticEvent,'front');
    

  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: string) => {
    const selectedFile = e.target?.files?.[0];
  
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        handleImageLinking(selectedFile, side);
      };
      handleSubmit()
  
      reader.readAsDataURL(selectedFile);
    }
  };
  const [averageRating, setAverageRating] = useState<number>(0);
  const handleSubmit = async () => {
    setShowLoader(true);
    try {
      const updatedData = inputFields.reduce((acc, field) => {
        acc[field.label2] = field.value;
        return acc;
      }, {} as Record<string, any>);
      updatedData.position = position_update;
      updatedData.rating=userRatings;
      updatedData.skill_set = skills;
     
      if (profile) {
        updatedData.profile_picture = profile;
      }



      const response = await axios.put(`http://localhost:5000/api/user/${phone_no}`, updatedData);
      setShowLoader(false);
      // window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
      setShowLoader(false);
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
      setShowLoader(false);
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

const [error, setError] = useState<string | null>(null);


const [modalIsOpen, setModalIsOpen] = useState(false);
const [isDocumentDisplay, setDocumentDisplay] = useState(false);


const openModal = () => {
  setModalIsOpen(true);
};

const closeModal = () => {
  setModalIsOpen(false);
};

const [isFlipped, setIsFlipped] = useState(false);

const handleFlip = () => {
  setIsFlipped(!isFlipped);
};


const [captureMethod, setCaptureMethod] = useState<boolean | null>(null);

const [isCapturePopupVisible, setCapturePopupVisible] = useState(false);
const frontFileInputRef = useRef<HTMLInputElement>(null);
const [isAnyDocumentUploading, setIsAnyDocumentUploading] = useState(false);
const childRef = useRef<any>(null);
const [userData, setUserData] = useState({
  phone_no: phone_no,
  email: email,
  description:description,
  first_name: first_name,
  last_name: last_name,
  fathers_name: fathers_name,
  mothers_name: mothers_name,
  gender:  gender,
  birth_date:  birth_date,
  qualification:qualification,
  occupation: occupation,
  position_at_company: position_at_company,
  experience: experiance,
  permanent_address:permanent_address,
  permanent_city:permanent_city,
  permanent_state:  permanent_state,
  permanent_country: permanent_country,
  current_address:  current_address,
  current_city: current_city,
  current_state: current_state,
  current_country: current_country,
  email_verified: email_verified,
  is_client: is_client,
  is_hsc_officer:is_hsc_officer,
  is_supervisor: is_supervisor,
});

const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>


    
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Profile Image Modal"
                      className="modal"
                      overlayClassName="overlay"
                    >
                      <button onClick={closeModal} className="close-button">&times;</button>
                      <div className="flex flex-col items-center">
                        <img
                          className='mb-4'
                          src={profile_picture || '/default-user-profile.png'}
                          alt='Enlarged Profile Pic'
                          style={{ width: '300px', height: '300px' }}
                        />
                        <div className="flex items-center justify-center">
                        <h1><FaImage /></h1>
                        <button
                          onClick={() => { openFileInput();}}
                          className="btn-change-profile"
                        >
                      
                          Change Profile Image
                        </button>
                        </div>
                      </div>
                    </Modal>

    { isPopupVisible && <div className='flex-cols sm:w-auto h-full sm:h-[550px] overflow-scroll no-scrollbar'>  
      <div className="flex justify-start">
            <div className="flex items-center justify-center text-[18px] gap-x-2 m-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={()=>setPopupVisible(false)}>
            <FaArrowLeft />
            <h1 className="text-lg">Back </h1>
          </div></div>
              <CommonDocumentList 
                className="grid grid-cols-1"
                isPopup={true}
                docType={docType}
                userId={phone_no}
                // fileData={fileData}
                // setFileData={setFileData}
            />
            </div> }
 

    {showTime &&               
    <CommonAttendance profileType={'user'} phone_no={id} attendance={attendance} editedTitle={""} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""}  />
    }
    {/* {!showTime && !isPopupVisible && !isPdfVisible && */}
    {!isPopupVisible &&
    
    <div className="h-screen mb-20 ">
    <div className="flex justify-start">
            <div className="flex items-center justify-center text-[18px] gap-x-2 m-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={onClick}>
            <FaArrowLeft />
            <h1 className="text-lg">Back </h1>
            {showLoader && (
      <div className="mx-auto flex flex-col align-middle items-center justify-center">
        <CommonSpinner />
      </div>
    )}
          </div></div>


        <div className=" grid bsm:grid-cols-2 amd:grid-cols-3 flip-card sm:w-full h-screen ">
        <div className={`col-span-2 flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 flip-card-front">
        <div className="col-span-1 bg-[color:var(--mainTitleLightestColor)] rounded-2xl z-50 pl-2 pr-2" >

<div className="relative justify-center items-center mb-4 ">
   
      <div className={`flex items-center justify-between relative rounded-2xl w-[160px] mt-2 h-[160px] bsm:w-auto md:w-full bg-[color:var(--mainTitleLightColor)] sm:h-auto ring-[color:var(--mainTitleLightestColor)] ring-offset-2 ring-1  `}>
      <div className="relative cols-span-1 m-2 rounded-2xl ring-[color:var(--mainTitleLightestColor)] ring-offset-2 ring-2 bg-white">
        <label htmlFor="profileImageInput" className=' m-2  '>
          <img
            className='mb-2 mx-auto aspect-square cursor-pointer hover:scale-105 duration-300'
            width={200}
            height={100}
            src={profile|| profile_picture || '/default-user-profile.png'}
            alt='Profile Pic'
            onClick={() => { 

             
                fileInputRef.current?.click();
              
            }}
            // onClick={openModal}
          />
        </label>
        <FaPen
          className="absolute bottom-0 right-0 transform translate-x-1/2 -translate-y-1/2 cursor-pointer [color:var(--lightBackgroundColor)]"
          // onClick={openFileInput}
          onClick={()=>handleImageUpload}

          style={{ fontSize: '20px' }}
        />
        <div className="flex items-center justify-center text-[12px] text-[color:var(--mainTitleLightColor)] gap-x-2 font-bold">

                      <input
                        type="file"
                      
                        style={{ display: 'none' }}
                       
                        ref={fileInputRef} 
                        onChange={(event) => {
                         
                          if (!captureMethod) {
                            const selectedFrontFile = event.target.files?.[0];
                            if (selectedFrontFile) {
                             
                              handleProfilUpload( selectedFrontFile);
                             

                            }
                          }
                        }}
                        
                      />
        </div>
      </div>
      <div className="cols-span-2 flex flex-col items-center w-full justify-center text-white">
      <div className=" m-2">                   
          <h1 className="sm:text-2xl font-bold m-2  text-wrap">{first_name+" "+last_name}</h1>
          <h1 className="sm:text-md m-2 text-wrap ">{qualification}</h1>
          {/* <h1 className="sm:text-md text-[color:var(--lightBackgroundColor)] p-2 text-wrap ">experiance : {experiance}</h1> */}
      </div>

      <CommonAddButton
        icon={faPerson}
        color="bg-[color:var(--primaryColor)] text-white font-medium justify-center m-2 rounded-xl shadow-md hover:bg-white hover:text-gray-800" // Add your desired color here
        title="View Personal info"
        width={20}
        height={20}
        onClick={handleFlip}
        className='cursor-pointer hover:scale-105 duration-300'
      />

        </div>               
      </div>

   
</div>
<div className="grid grid-cols-1 gap-x-2 gap-y-2">
<Collapsible >
<CollapsibleItem className="bg-white rounded-xl shadow-md" headerText={"QR Code"} iconClass={<BsQrCode />}>
      <div>
        <div style={{ marginTop: '20px' }}>

         {qr_code && <img src={qr_code} alt="User QR Code" />}
       </div>
      </div>
      </CollapsibleItem>
      </Collapsible>
<Collapsible >
<CollapsibleItem className="bg-white rounded-xl shadow-md" headerText={"Ratings"} iconClass={<FaStar/>}>

<CommonAddButton
                  icon={faEdit}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Update"
                  width={20}
                  height={20}
                  onClick={()=>handleSubmit()}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />
   <Rating defaultValue={ratings} onChange={handleRatingChange} />
</CollapsibleItem>
</Collapsible>
<Collapsible>
      <CollapsibleItem className="bg-white rounded-xl shadow-md" headerText={"Skills"} iconClass={<FaToolbox />}>
        <div className="p-2">
          <div className="flex justify-end items-center">
           
            <button onClick={handleAddSkill} className="bg-blue-500 text-white p-2 rounded-full">
              <FaPlus />
            </button>
          </div>
          {showInput && (
            <div className="mt-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Enter skill"
              />
              <button onClick={handleSaveSkill} className="bg-green-500 text-white p-2 rounded mt-2">
                Save
              </button>
            </div>
          )}
          <div className="mt-2">
          
            <ul>
              {skills.map((skill, index) => (
                <li className="bg-white p-2 m-2 flex items-center justify-center" key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </CollapsibleItem>
    </Collapsible>
</div>
<div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 mt-2`}>
  <div className="truncate bg-white rounded-2xl w-full ">
   
    <div className="flex items-center justify-center w-full ">

    <textarea   
    placeholder="Description"          
    className="text-md h-[300px] bg-white ring-[color:var(--mainTitleLightestColor)] ring-2 text-[color:var(--mainTitleColor)] p-2 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
    />

</div>
  </div>
</div>

</div>
              
            <div className="col-span-1" >

                 <div  className="flex items-center justify-between ml-5 mr-5 shadow-md rounded-2xl bg-[color:var(--mainTitleLightestColor)] cursor-pointer">
                          <Image alt={'/'} src={"/documents.png"} className={`z-6 p-2`} width={40}  height={40}/>

        
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg">Documents</h1>  
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg"></h1>                 

            </div>
            <div className=" flex-col justify-center items-center w-full">

              <div>
                {/* First six elements */}
                <div className="grid grid-cols-2 gap-2 text-[color:var(mainTitleLightColor)] opacity-80">
                    {[
                      { name: "EmiratesId", image: "/emirates-1.png" },
                      { name: "Passport", image: "/passport-1.png" },
                      { name: "Visa", image: "/visa-1.png" },
                      { name: "License", image: "/license-1.png" },
                    ].map((doc) => (
                      <div
                        key={doc.name}
                        className="flex flex-col items-center col-span-1 rounded-2xl p-2 m-2"
                        onClick={() => {
                          setDocumentDisplay(true);
                          setDocImage(doc.image);
                          setDocName(doc.name);
                        }}
                      >
                        <div className="relative w-full h-[100px] hover:scale-105 duration-300">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-md"
                          />
                        </div>
                        <h1 className="mt-2">{doc.name}</h1>
                      </div>
                    ))}

                </div>
                <div className="flex items-center justify-center">
                <li onClick={openPopupPersonel} className="flex p-2 w-26 md:w-36 h-26 hover:ring-offset-2 hover:ring-2 items-center justify-center text-3xl text-extrabold bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleLightColor)] rounded-2xl transition-all duration-[250ms] ease-out group-hover:w-full">
                                <span className="relative group-hover:text-white">+</span>
                              </li></div>
                <div className="flex items-center justify-center" onClick={()=>setPdfVisible(true)}>
                    
                  <h1 className="flex items-center justify-center bg-white shadow-sm text-sm m-2 p-1 cursor-pointer gap-x-2"> <IoGridOutline /><h1>View all in one</h1></h1>
                </div>

              
              </div>

              </div>

              <div className=" flex-col justify-center items-center w-full">
              <div  className="flex items-center justify-between ml-5 mr-5 shadow-md rounded-2xl bg-[color:var(--mainTitleLightestColor)] cursor-pointer">
                          <Image alt={'/'} src={"/certificate_batch.png"} className={`z-6 p-2`} width={40}  height={40}/>

        
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg opacity-90">Certificates</h1> 
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg"></h1>                 

            </div>
              <div>
              {/* First six elements */}
                    <div className="grid grid-cols-2 gap-2 text-[color:var(mainTitleLightColor)] opacity-80">
                  {[
                  { name: "Certificate-1", image: "/certificate.png" },
                  { name: "Certificate-2", image: "/certificate.png" },
                  { name: "Certificate-2", image: "/certificate.png" },
                  { name: "Certificate-4", image: "/certificate.png" },
                  ].map((doc) => (
                  <div
                  key={doc.name}
                  className="flex flex-col items-center col-span-1 rounded-2xl p-4 opacity-80 m-2"
                  onClick={() => {
                  setDocumentDisplay(true);
                  setDocImage(doc.image);
                  setDocName(doc.name);
                  }}
                  >
                  <div className="relative w-full h-[100px] hover:scale-105 duration-300">
                  <img
                  src={doc.image}
                  alt={doc.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-80"
                  />
                  </div>
                  <h1 className="mt-2">{doc.name}</h1>
                  </div>
                  ))}

                  </div>

              </div>

</div>
          
            

            </div>
    </div>
    <div className="flip-card-back w-full h-auto p-2 m-2">
      <div>
        <div className="flex items-center justify-center text-[18px] gap-x-2 m-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={handleFlip}>
            <FaArrowLeft />
            <h1 className="text-lg">Back </h1>
        </div>
        <UserProfile
          userData={userData}
          setUserData={setUserData}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
       
        />
      </div>
    </div>
  </div>
      
            <div className="col-span-1"  >
            <div  className="flex items-center justify-between ml-5 mr-5 shadow-md rounded-2xl bg-[color:var(--mainTitleLightestColor)] cursor-pointer">
                
                        <h1 className="h-[40px] w-[40px] p-3 text-[color:var(--primaryColor)]"><FaBuilding/></h1>
        
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg opacity-90">Projects</h1> 
                        <h1 className="text-[color:var(--mainTitleColor)] text-lg"></h1>                 

            </div>
          
        

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
                <div>
                  Salary
                </div>
              </CommonSalary>
              
              </div>
          </CommonPopup>


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
      <Modal
                        isOpen={isPdfVisible }
                        onRequestClose={() =>setPdfVisible(false)}
                        contentLabel="Example Modal"
                        className="modal-content"
                        overlayClassName="modal-overlay"
                      >
                              <div className="relative model-body">
          <button className="absolute top-0 right-0 text-red-500" onClick={() =>setPdfVisible(false)}>
            Close
          </button>
    <div className='flex-cols sm:w-auto  h-full overflow-scroll no-scrollbar'> 
            <PDFContainer userId={phone_no || ''} />
    </div>
    </div>
    </Modal>


                  <Modal
      isOpen={isDocumentDisplay}
      onRequestClose={() =>setDocumentDisplay(true)}
      contentLabel="Example Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
                       
      <div className="relative model-body flex items-center justify-center">
          <button className="absolute top-0 right-0 text-red-500" onClick={() =>setDocumentDisplay(false)}>
            Close
          </button>
                  <SingleDocument
                            className=""
                            isPopup={true}
                            docType={docType}
                            userId={phone_no}
                            doc_name={doc_name}
                            doc_image={doc_image}
                            onCapture={()=>setCapturePopupVisible(true)}
                            frontFileInputRef={frontFileInputRef}
                           
                            ref={childRef}

                    />
                              <CommonPopup
          showModal={isCapturePopupVisible}
          onClose={() => setCapturePopupVisible(false)}
          heading="Camera Capture"
          content=""
        >
          <div className='flex flex-col w-full h-full' onClick={()=>setCapturePopupVisible(false)}>
            <div className="flex gap-x-4 gap-y-4 justify-center">
           
            <div className='p-4 hover:ring-2 hover:ring-[color:var(--mainTitleColor)]' onClick={() => { 
            setCaptureMethod(false); 
            setCapturePopupVisible(true); 
           
              frontFileInputRef.current?.click();
            
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
                 
                </div>
                </Modal>
        </div>
    </div>
}
    {/* } */}
    </>

  );
};

