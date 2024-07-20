'use client';
import React, { useEffect,useContext, useState } from 'react';

import {CommonImageWithInfo,CommonHeading } from '@/app/components/common/bannersAndheadings';
import { CommonFormSelect, CommonFormTextInput, CommonInput, CommonTextInput } from '@/app/components/common/inputs';
import RegisterUser from '@/app/authentication/registerUser';
import { FaCheck, FaCloudUploadAlt, FaArrowDown,FaArrowAltCircleDown,FaImage, FaFile, FaArrowLeft} from 'react-icons/fa';
import  {  FileUploader,FileUploadertest} from '@/app/components/common/fileUploader';
import styled from 'styled-components';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from '@/app/components/common/collapsible';
import { MyContextProvider, useMyContext } from '@/app/Context';
import { CommonIcon } from '@/app/components/common/icons';
import CommonDocumentList from '@/app/components/common/documentsUpload';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { fetchCreateProject, fetchCreateUser } from '@/app/components/utils/fetches';
import { useRouter } from 'next/navigation';
import { CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';




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

  const [project_name, setProjectName] = useState('');
  const [project_address, setProjectAddress] = useState('');
  const [project_description, setProjectDescription] = useState('');
  const [project_client_name, setProjectClientName] = useState('');
  // console.warn(contractorId,contractorId.contractorId,"??????????????????????????????????????????????////////////////")
  let contractor_company_id=contractorId;
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



  const formSubmit = async (e: any) => {
  
    e.preventDefault();
    setShowLoader(true);
    console.log("pppppppppppppzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    if (project_name.length == 0) {
      setErrorMessage('Name is Required');
      return;
    }

    // if(theImageLink == ""){
    //   <CommonAlert message={"Error Uploading Image"}/>
    //   setShowLoader(false);
    //   return;
    // }
    // if (emirates_id.length == 0) {
    //   setErrorMessage('Emirates is Required');
    //   setShowLoader(false);
    //   return;
    // }

    if (project_address.length < 10 ) {
      setErrorMessage('Please enter full address is Invalid!');
      setShowLoader(false);
      return;
    }
   


    
    const body = {
      project_name,
      project_address,
      project_client_name,
      project_description,
      start_date,
      dead_line,
      contractor_company_id,

    };
    setErrorMessage('');
    const createUser = await (async () => {
      try {
        const response: any =  fetchCreateProject(JSON.stringify(body));
        const data = response.data;
        setShowLoader(false);
        setMessage(`${project_name}  Created Successfully!`);
        // handleAddProject();
        setAlertType('success');
       
        
      }
       catch (e:any) {
        setErrorMessage(e.response?.data?.message || 'An error occurred');
        throw e; // rethrow the error if needed
      }
    
  })();}
return (
  <div className="sm:border-2  sm:rounded-md sm:shadow-md mt-8 shadow-2xl">
            <div className=" text-[18px] shadow-md rounded-full m-4 p-4 w-16 text-[color:var(--mainTitleLightColor)] hover:from-green-500 hover:to-green-400  hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300" onClick={onClick}>
            <FaArrowLeft />
          </div>
            {/* Render your RegisterUser component here */}
            {errorMessage.length > 0 ? 
        <DangerNotification message={errorMessage} />
        : <></>}
      {message.length > 0 ? 
        <SuccessNotification  message={message} />
        : <></>}
        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}
      <form  onSubmit={formSubmit}>
      <div className={` rounded-t-2xl shadow-t-md justify-center sm:align-middle p-2 ${true ? 'opacity-1 ' : 'opacity-30'}`}>
      {/* ${twoDocumentsUploaded ? 'opacity-1 ' : 'opacity-30'}`} */}
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
          <div className='grid grid-cols-2 amd:grid-cols-3'>
            <CommonInput 
              label={'Project Name'}   
              placeholder='Enter Project Name'
              onChange={(e) => {
                setProjectName(e.target.value);
                }} 
              />
            <CommonInput 
              label={'Project Address'}  
              placeholder='Enter Project Address'
              onChange={(e) => {
                setProjectAddress(e.target.value);
                }} 
              />
            <CommonInput 
              label={'Client'}  
              placeholder='Select Client Name'
              onChange={(e) => {
                setProjectClientName(e.target.value);
                }} 
              />

            {/* <CommonInput label={'Main Contractor'}  placeholder='Select Main Contractor Name'/>
            <CommonInput label={'Sub Contractor'}  placeholder='Select Sub Contractor Name'/>
            <CommonInput label={'Manager'}  placeholder='Select Sub Contractor Name'/>
            <CommonInput label={'Manager Phone no'}  placeholder='Select Sub Contractor Name'/>
            <CommonInput label={'Manager Email'}  placeholder='Select Sub Contractor Name'/> */}
           


          </div>
          <CommonInput 
            label={'Description'}  
            placeholder='Enter project description'
            onChange={(e) => {
              setProjectDescription(e.target.value);
              }} 
            />
          <div className='flex justify-between items-center p-4 text-[color:var(--mainTitleColor)] gap-2'>
          <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4  ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Start Date</h1>
          
            <input
          type="date"
          className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1  placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-xl sm:text-sm focus:ring-1 w-full"
          onChange={handleDateChangeStart}
          // max={currentDate.toISOString().split('T')[0]} // Set max date
        />
        </div>
        <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4  ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Deadline</h1>
          
            <input
          type="date"
          className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1  placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-xl sm:text-sm focus:ring-1 w-full"
          onChange={handleDateChangeEnd}
          // max={currentDate.toISOString().split('T')[0]} // Set max date
        />
        </div>
      </div>
    <div className='sm:mt-6 flex justify-center'>
            <CommonButtonSolidBlue text={'Create Project'}/>
        </div>
      </div>
      </form>


    
    </div>
  );
}

export default AddProject;

