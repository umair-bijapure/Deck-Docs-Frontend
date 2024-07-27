'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { CommonFormSelect, CommonFormTextInput, CommonIconInput, CommonSelect, CommonTextInput} from '@/app/components/common/inputs';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import Select, { ActionMeta } from 'react-select';

const cookies = new Cookies();
// import { faMailBulk, faMailReply, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faIdCard, faKey, faPerson, faPhone, faUser, faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonIcon } from '@/app/components/common/icons';
import { CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dataUrlToFile, getLoggedInUserData, getUploadedImageLink, toBase64 } from '@/app/components/utils/utils';
import { CommonAlert } from '@/app/components/common/notifications';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { FaArrowLeft, FaBriefcase, FaBuilding, FaCalendar, FaCheck, FaCity, FaClock, FaEnvelope, FaFileAlt, FaFlag, FaGlobe, FaGraduationCap, FaIdCard, FaMapMarkerAlt, FaPhone, FaSpinner, FaUpload, FaUser } from 'react-icons/fa';
import { fetchCreateUser, handleUpload, standardFetch } from '@/app/components/utils/fetches';
import { User } from '@/app/components/profiles/projectProfile';


export interface CreateOrganisationUserProps {
  contractorId: string;
  onEmployeeAdded: (id: string)  => void;
  onClick:()=>void;
  profileType?:string;
}

const CreateOrganisationUser = (props: any): JSX.Element => {

  const {contractorId}= props as CreateOrganisationUserProps
  const { onClick } = props as CreateOrganisationUserProps
  const { onEmployeeAdded } = props as CreateOrganisationUserProps

  const [profile, setProfile] = useState({ names: { name: 'User' }, uploadedImage: '' });
  const [fileData, setFileData] = useState<any>('');
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [alerttype, setAlertType] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  let password = '';
  const [confPassword, setConfPassword] = useState('');
  const [profile_picture, setProfilePicture] = useState<any>(null);
  const [uploadedFrontImage, setUploadedFrontImage] = useState<string>('');
  const [birth_date, setBirthDate] = useState('');
  const [emirates_id, setEmiratesID] = useState('');
  const [emirates_id_expiry, setEmiratesIdExpiry] = useState('');
  
  const contractor_company_id = contractorId;
  
  const [userType, setUserType] = useState<string>('');
  const [is_employee_user, setEmployee] = useState(false);
  const [is_supervisor, setSupervisor] = useState(false);
  const [is_sub_contractor, setSubContractor] = useState(false);
  const [is_main_contractor, setMainContractor] = useState(false);
  const [is_client, setClient] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [services, setServices] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState('');
  
  // New fields from user schema
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [fathers_name, setFathersName] = useState('');
  const [mothers_name, setMothersName] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [occupation, setOccupation] = useState('');
  const [position_at_company, setPositionAtCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [permanent_address, setPermanentAddress] = useState('');
  const [permanent_city, setPermanentCity] = useState('');
  const [permanent_state, setPermanentState] = useState('');
  const [permanent_country, setPermanentCountry] = useState('');
  const [current_address, setCurrentAddress] = useState('');
  const [current_city, setCurrentCity] = useState('');
  const [current_state, setCurrentState] = useState('');
  const [current_country, setCurrentCountry] = useState('');
  const [skill_set, setSkillSet] = useState([]);
  const [documents_id, setDocumentsId] = useState('');
  const [projects, setProjects] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [project_roles, setProjectRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState<{ value: string; label: string; } | null>(null);


  const router = useRouter();

  function UserType(userType: string) {
    setUserType(userType);
    if (userType == "Employee") {
      setEmployee(true);
    } else if (userType == "Client") {
      setClient(true);
    } else {
      setSubContractor(true);
    }
  }

  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    setShowLoader(true);
    setErrorMessage('');
    setMessage('');
    password = first_name;
  
    const theImageFile = await dataUrlToFile(profile_picture, "profile_picture");
    const theImageLink = await getUploadedImageLink(theImageFile);
  
    if (first_name.length == 0) {
      setError('First Name is Required');
      setShowLoader(false);
      return;
    }
  
    if (phone_no.length == 0) {
      setError('Phone Number is Required.');
      setShowLoader(false);
      return;
    }
  
    if (phone_no.length != 10) {
      setError('Phone Number is Invalid!');
      setShowLoader(false);
      return;
    }
  
    const requestBody = {
      phone_no,
      email,
      description,
      first_name,
      last_name,
      fathers_name,
      mothers_name,
      gender,
      birth_date,
      qualification,
      occupation,
      organisation_id:selectedContractor?.value,
      position_at_company,
      experience,
      permanent_address,
      permanent_city,
      permanent_state,
      permanent_country,
      current_address,
      current_city,
      current_state,
      current_country,
      is_supervisor,
      password_hashed: password,
    };
  
    try {
      const createOrganisation = await standardFetch({
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/organisationUser`, // Replace parentOrganisationId with actual ID
        method: 'POST',
        body: JSON.stringify(requestBody),
        contentType: 'application/json',
      });
  
      setSuccess(true); // Set success state to true on successful creation
      setShowLoader(false);
      onEmployeeAdded(contractorId)
      setError('')
    } catch (error) {

      setSuccess(false);
        if (error instanceof Error) {
          setError(error.message);
         if (error.message === 'HTTP error! Status: 501') {
            setError("A User with this email already exists.");
          } else if (error.message === 'HTTP error! Status: 502') {
            setError("A User with this Phone number already exists.");
          }
        } else {
          setError('An unexpected error occurred');
        }
      setShowLoader(false);
      }finally {
      setLoading(false);
      setShowLoader(false);
    }
  };
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowLoader(true);
    const selectedFile = e.target?.files?.[0];
    handleUpload(selectedFile, 'front', setFileData, setUploadedFrontImage);
  };

  useEffect(() => {
    if (message.length > 0) {
      setErrorMessage('');
    }
    if (errorMessage.length > 0) {
      setMessage('');
    }
  }, [message, errorMessage]);

  const changeProfilePicture = async (file: File) => {
    const theFile = await toBase64(file);
    setProfilePicture(theFile);
  }
  const [contractorCompanies, setContractorCompanies] =useState<User[]>([]); 
  const fetchContractorCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/organisation');
      const contractorCompanies = response.data;
      setContractorCompanies(contractorCompanies); // Set the fetched contractor companies in state
    } catch (error) {
      console.error('Error fetching contractor companies:', error);
    }
  };

  useEffect(() => {
  // Fetch users when the component mounts
    fetchContractorCompanies(); // Fetch contractor companies when the component mounts
  }, []);
  const users = [ ...contractorCompanies];
  const options = users.map(user => ({
    value: user._id,
    label: user.first_name || user.name
  }));
  const handleSelectChange = (selectedOption: any) => {
    setSelectedContractor(selectedOption);
   // Clear typed value when an option is selected
  };





  return (
    <div className="sm:border-2 sm:rounded-md sm:shadow-md mt-2 shadow-2xl bg-gray-100 p-4">
      
    <div className="flex justify-between items-center">
    
      <div className="flex items-center justify-center text-[18px] gap-x-2 m-2 p-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={onClick}>
        <FaArrowLeft />
        <h1 className="text-lg">Back </h1>
      </div>
     
      <div className="text-lg">Add Employee </div>
    </div>


    {showLoader && (
      <div className="mx-auto flex flex-col align-middle items-center justify-center">
        <CommonSpinner />
      </div>
    )}

    <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-x-2 sm:gap-x-4 gap-y-2 my-2 mx-auto bg-white p-8 rounded shadow-md w-full" onSubmit={formSubmitHandler}>
    {success? <p className="text-green-500">User created successfully!</p>:error?<p className="text-red-500">{error}</p>:''}
      <div className="sm:hidden flex justify-between items-center p-2 col-span-3">
        <CommonButtonSolidBlue text="Submit" />
      </div>
      <div className="flex items-center space-x-2">
        <FaUser className="text-gray-500" />
        <input
          type="text"
          id="first_name"
          defaultValue={fileData && fileData.names ? fileData.names.name : first_name}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaUser className="text-gray-500" />
        <input
          type="text"
          id="last_name"
          defaultValue={fileData && fileData.names ? fileData.names.name : last_name}
          placeholder="Last Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaPhone className="text-gray-500" />
        <input
          type="text"
          id="phone"
          defaultValue={phone_no}
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPhoneNo(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaEnvelope className="text-gray-500" />
        <input
          type="email"
          id="email"
          defaultValue={email}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center  space-x-2">
    
    <FontAwesomeIcon icon={faHandshake} className="text-gray-500"/>

      <Select
        options={options}
        isSearchable
        onChange={handleSelectChange}
     
        placeholder="Select Contractor"
        className='z-50 w-full'
      />
    </div>
      <div className="flex items-center space-x-2">
        <FaMapMarkerAlt className="text-gray-500" />
        <input
          type="text"
          id="address"
          defaultValue={address}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaCity className="text-gray-500" />
        <input
          type="text"
          id="city"
          defaultValue={city}
          placeholder="City"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaFlag className="text-gray-500" />
        <input
          type="text"
          id="state"
          defaultValue={state}
          placeholder="State"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaGlobe className="text-gray-500" />
        <input
          type="text"
          id="country"
          defaultValue={country}
          placeholder="Country"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaBuilding className="text-gray-500" />
        <input
          type="text"
          id="permanent_address"
          defaultValue={permanent_address}
          placeholder="Permanent Address"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPermanentAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaCity className="text-gray-500" />
        <input
          type="text"
          id="permanent_city"
          defaultValue={permanent_city}
          placeholder="Permanent City"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPermanentCity(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaFlag className="text-gray-500" />
        <input
          type="text"
          id="permanent_state"
          defaultValue={permanent_state}
          placeholder="Permanent State"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPermanentState(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaGlobe className="text-gray-500" />
        <input
          type="text"
          id="permanent_country"
          defaultValue={permanent_country}
          placeholder="Permanent Country"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPermanentCountry(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaMapMarkerAlt className="text-gray-500" />
        <input
          type="text"
          id="current_address"
          defaultValue={current_address}
          placeholder="Current Address"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCurrentAddress(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaCity className="text-gray-500" />
        <input
          type="text"
          id="current_city"
          defaultValue={current_city}
          placeholder="Current City"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCurrentCity(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaFlag className="text-gray-500" />
        <input
          type="text"
          id="current_state"
          defaultValue={current_state}
          placeholder="Current State"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCurrentState(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <FaGlobe className="text-gray-500" />
        <input
          type="text"
          id="current_country"
          defaultValue={current_country}
          placeholder="Current Country"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setCurrentCountry(e.target.value)}
        />
      </div>



      <div className="flex items-center space-x-2">
        <FaEnvelope className="text-gray-500" />
        <input
          type="text"
          id="description"
          defaultValue={description}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <FaUser className="text-gray-500" />
        <input
          type="text"
          id="fathers_name"
          defaultValue={fathers_name}
          placeholder="Father's Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setFathersName(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <FaUser className="text-gray-500" />
        <input
          type="text"
          id="mothers_name"
          defaultValue={mothers_name}
          placeholder="Mother's Name"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setMothersName(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaUser className="text-gray-500" />
        <input
          type="text"
          id="gender"
          defaultValue={gender}
          placeholder="Gender"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaGraduationCap className="text-gray-500" />
        <input
          type="text"
          id="qualification"
          defaultValue={qualification}
          placeholder="Qualification"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setQualification(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaBriefcase className="text-gray-500" />
        <input
          type="text"
          id="occupation"
          defaultValue={occupation}
          placeholder="Occupation"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setOccupation(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaBuilding className="text-gray-500" />
        <input
          type="text"
          id="position_at_company"
          defaultValue={position_at_company}
          placeholder="Position at Company"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setPositionAtCompany(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2">
        <FaBriefcase className="text-gray-500" />
        <input
          type="text"
          id="experience"
          defaultValue={experience}
          placeholder="Experience"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <FaCalendar className="text-gray-500" />
        <input
          type="date"
          id="birth_date"
          defaultValue={birth_date}
          placeholder="Birth Date"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      
      <div className="sm:flex flex justify-between items-center p-2 col-span-3">
        <CommonButtonSolidBlue text="Submit" />
      </div>
      
    </form>
  </div>
  );
}
export default CreateOrganisationUser;


