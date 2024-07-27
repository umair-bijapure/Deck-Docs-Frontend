'use client';
import React, { useEffect,useContext, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import {CommonImageWithInfo,CommonHeading } from '@/app/components/common/bannersAndheadings';
import { CommonFormSelect, CommonFormTextInput, CommonInput, CommonTextInput } from '@/app/components/common/inputs';
import RegisterUser from '@/app/authentication/registerUser';
import { FaCheck, FaCloudUploadAlt, FaArrowDown,FaArrowAltCircleDown,FaImage, FaFile, FaArrowLeft, FaBuilding, FaLocationArrow} from 'react-icons/fa';
import  {  FileUploader,FileUploadertest} from '@/app/components/common/fileUploader';
import styled from 'styled-components';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from '@/app/components/common/collapsible';
import { MyContextProvider, useMyContext } from '@/app/Context';
import { CommonIcon } from '@/app/components/common/icons';
import CommonDocumentList from '@/app/components/common/documentsUpload';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { fetchCreateProject, fetchCreateUser, fetchOrganisationUsers } from '@/app/components/utils/fetches';
import { useRouter } from 'next/navigation';
import { CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';
import axios from 'axios';
import { User } from '@/app/components/profiles/projectProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
// import { faUserHelmetSafety } from '@fortawesome/free-solid-svg-icons';




interface AddProjectProps {
  contractorId: any;
  handleAddProject: () => void;
  onClick: () => void;
}

 const AddProject = (props: any): JSX.Element => {



  const {contractorId}= props as AddProjectProps
  const { onClick } = props as AddProjectProps
  const [profile, setProfile] = useState({ uploadedImage:'' });
  const [start_date, setStartDate] = useState<Date | Date[] | null>(null);
  const [dead_line, setDeadLine] = useState<Date | Date[] | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [alerttype, setAlertType] = useState('');
  const [typedValue, setTypedValue] = useState('');

  const [project_name, setProjectName] = useState('');
  const [project_address, setProjectAddress] = useState('');
  const [project_description, setProjectDescription] = useState('');
  const [client_id, setProjectClientName] = useState('');
  // console.warn(contractorId,contractorId.contractorId,"??????????????????????????????????????????????////////////////")
  let organisation_id=contractorId;
  const currentDate = new Date();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0]; // Use optional chaining to handle potential null values
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ uploadedImage: event.target?.result as string });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDateChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = event.target.value;
    const selectedDate2 = new Date(selectedDateString);
    setStartDate(selectedDate2);
  };
  const handleDateChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = event.target.value;
    const selectedDate2 = new Date(selectedDateString);
    setDeadLine(selectedDate2);
  };

  const [isExpanded, setIsExpanded] = useState(true);

  const { data } = useMyContext();
  const router = useRouter();
  const [allusers, setUsers] = useState<User[]>([]); // State to store users
  const [contractorCompanies, setContractorCompanies] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState<{ value: string; label: string; } | null>(null);

  const fetchUsers = async () => {
    try {
      const users = await fetchOrganisationUsers();
      console.log("Sub Contractors:", users );
      setUsers(users.data);
      return users ;
    } catch (error) {
      console.error("Error fetching sub contractors:", error);
      throw error;
    }
  };
  const fetchContractorCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organisation`);
      const contractorCompanies = response.data;
      setContractorCompanies(contractorCompanies); // Set the fetched contractor companies in state
    } catch (error) {
      console.error('Error fetching contractor companies:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
    fetchContractorCompanies(); // Fetch contractor companies when the component mounts
  }, []);
  const users = [...allusers, ...contractorCompanies];
  const options = users.map(user => ({
    value: user._id,
    label: user.first_name || user.name
  }));

  const handleSelectChange = (selectedOption: any) => {
    setSelectedContractor(selectedOption);
    setTypedValue(''); // Clear typed value when an option is selected
  };

  const handleInputChange = (newValue: string) => {
    setTypedValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !selectedContractor) {
      event.preventDefault();
      setSelectedContractor({ value: typedValue, label: typedValue });
    }
  };

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoader(true);
  
    if (selectedContractor) {
      setProjectClientName(selectedContractor.value);
    }
  
    if (project_name.length == 0) {
      setErrorMessage('Name is Required');
      setShowLoader(false);
      return;
    }
  
    if (project_address.length < 10) {
      setErrorMessage('Please enter full address is Invalid!');
      setShowLoader(false);
      return;
    }
  
    const body = {
      project_name,
      project_address,
      client_id,
      project_description,
      start_date,
      dead_line,
      organisation_id,
    };
  
    setErrorMessage('');
    try {
      const response = await fetchCreateProject(JSON.stringify(body));
      setShowLoader(false);
      setMessage(`${project_name} Created Successfully!`);
      setAlertType('success');
    } catch (e: any) {
      setShowLoader(false);
      if (e.response?.status === 403) {
        setErrorMessage(e.response.data.message);
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };
  


  return (
    <>
    
        <div className="no-scrollbar text-[18px] gap-x-2 m-2 p-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={onClick}>
  <FaArrowLeft />
  <h1 className="text-lg">Back</h1>
</div>


    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 align-middle ">


      {showLoader && (
        <div className='mx-auto mt-[-20px] justify-center'>
          <CommonSpinner />
        </div>
      )}
      <form onSubmit={formSubmit} className='bg-white p-8 rounded shadow-md w-full max-w-lg space-y-6 no-scrollbar'>
      {errorMessage && <DangerNotification message={errorMessage} />}
      {message && <SuccessNotification message={message} />}

          <div className='flex justify-center items-center w-full space-x-2'>
            <label htmlFor="profileImageInput">
              <img
                src={profile.uploadedImage || '/hook 1.png'}
                alt="User Profile"
                width={100}
                height={100}
                className="rounded-md mt-4 pointer-events-none ml-2 border-2 p-2 m-4"
              />
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </label>
          </div>
         
          <div className="flex items-center space-x-2">
          <FaBuilding className="text-gray-500" />
          <input
            type="text"
            value={project_name}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Organisation Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>

        <div className="flex items-center space-x-2">
          <FaLocationArrow className="text-gray-500" />
          <input
            type="text"
            value={project_address}
            onChange={(e) => setProjectAddress(e.target.value)}
            placeholder="Organisation Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center  space-x-2">
    
          <FontAwesomeIcon icon={faHandshake} className="text-gray-500"/>

            <Select
              options={options}
              isSearchable
              onChange={handleSelectChange}
              onInputChange={handleInputChange}
              onKeyDown={handleKeyDown}
              inputValue={typedValue}
              placeholder="Select Contractor"
              className='z-50 w-full'
            />
          </div>
          <div className="flex items-center space-x-2">
          <FaBuilding className="text-gray-500" />
          <input
            type="text"
            value={project_description}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Details"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>

          <div className='flex justify-between items-center p-4 text-[color:var(--mainTitleColor)] gap-2'>
            <div >
              <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Start Date</h1>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                onChange={handleDateChangeStart}
              />
            </div>
            <div >
              <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Deadline</h1>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                onChange={handleDateChangeEnd}
              />
            </div>
          </div>
        
        <div className="mb-2 p-2 flex justify-center items-center">
          <CommonButtonSolidBlue text='Submit' />
            
        </div>
      </form>
    </div>
    </>
  );
};

export default AddProject;

