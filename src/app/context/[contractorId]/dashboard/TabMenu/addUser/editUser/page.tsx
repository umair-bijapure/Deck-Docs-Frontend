'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CommonFormSelect } from '@/app/components/common/inputs';
import { FaCog, FaEdit, FaEye, FaUpload } from 'react-icons/fa';


interface UserProfileProps {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfile = (props: any): JSX.Element => {

    const {userData} =props as UserProfileProps;
    const {setUserData} =props as UserProfileProps;
    const { isEditMode} =props as UserProfileProps;
    const { setIsEditMode} =props as UserProfileProps;


    const [isSettingsMode, setIsSettingsMode] = useState(false);
  const [inputFields, setInputFields] = useState(
    Object.keys(userData).map(key => ({
      label: key.replace(/_/g, ' '),
      label2: key,
      value: userData[key] || '',
    }))
  );

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>, key: string) => {
    const { value } = e.target;
    setUserData({ ...userData, [key]: value === '1' });
  };

  useEffect(() => {
    setInputFields(
      Object.keys(userData).map(key => ({
        label: key.replace(/_/g, ' '),
        label2: key,
        value: userData[key] || '',
      }))
    );
  }, [userData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFields];
    updatedFields[index].value = value;
    setInputFields(updatedFields);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (updatedData: any) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userData.phone_no}`, updatedData);
      console.log('Updated successfully:', response.data);
      // Optionally reload or update state after successful update
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = inputFields.reduce((acc, field) => {
        acc[field.label2] = field.value;
        return acc;
      }, {} as Record<string, any>);

      // Ensure boolean fields are correctly set
      if (updatedData.is_supervisor === '') updatedData.is_supervisor = false;
      if (updatedData.is_client === '') updatedData.is_client = false;
      if (updatedData.is_hsc_officer === '') updatedData.is_hsc_officer = false;
      if (updatedData.email_verified === '') updatedData.email_verified = false;




      handleSubmit(updatedData); // Call parent's handleSubmit with updatedData
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='p-2 m-2'>
      <div className='w-full h-full mx-auto'>
        <div className='flex items-center justify-between'>
        {isEditMode ? (
            <>

            <button onClick={() => setIsEditMode(false)} className='flex items-center justify-center text-green-500 gap-x-2 p-2 m-2 rounded-2xl primaryBtn font-semibold bg-green-200'><FaEye/> View</button>
            <button onClick={() => setIsSettingsMode(true)} className='flex items-center justify-center text-blue-500 gap-x-2 p-2 m-2 rounded-2xl primaryBtn font-semibold bg-blue-100'>
            <FaCog /> Settings
          </button></>
          ) :

           (
            <>
            <button onClick={() => {setIsEditMode(true);setIsSettingsMode(false)}} className='flex items-center justify-center text-amber-500 gap-x-2 p-2 m-2 rounded-2xl primaryBtn font-semibold bg-amber-100'><FaEdit/>Edit</button>
            <button onClick={() => {setIsSettingsMode(true);setIsEditMode(false)}} className='flex items-center justify-center text-blue-500 gap-x-2 p-2 m-2 rounded-2xl primaryBtn font-semibold bg-blue-100'>
                  <FaCog /> Settings
                </button></>
          )}
        </div>
        <form onSubmit={handleFormSubmit} className='font-semibold text-lg grid grid-cols-3 gap-x-2 gap-y-2'>
          {!isSettingsMode && (
            inputFields.map((field, index) => (
              !['is_client', 'is_hsc_officer', 'is_supervisor','email_verified'].includes(field.label2) &&
              <div key={field.label2} className=''>
                <div className='flex flex-col'>
                  <label className='col-span-1 mb-[1px] text-[10px] text-[color:var(--mainTitleColor)]' htmlFor={field.label2}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.label2}
                    value={field.value}
                    className="w-auto cols-span-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                    onChange={(e) => handleChange(e, index)}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            ))
          )}
          {isSettingsMode && (
            ['is_client', 'is_hsc_officer', 'is_supervisor','email_verified'].map(key => (
              <div key={key} className=''>
                <div className='grid grid-cols-2 sm:grid-cols-3 justify-between items-start'>
                  <label className='col-span-1 mb-[1px] text-[10px] text-[color:var(--mainTitleColor)]' htmlFor={key}>
                    {key.replace(/_/g, ' ')}
                  </label>
                  <CommonFormSelect
                    id={key}
                    title={key.replace(/_/g, ' ')}
                    required={true}
                    defaultValue={userData[key] ? '1' : '0'}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectChange(e, key)}
                    disabled={!isSettingsMode}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </CommonFormSelect>
                </div>
              </div>
            ))
          )}
          {isEditMode && !isSettingsMode && (
            <div className='flex justify-center align-middle my-4 bg-[color:var(--lightBackgroundGreyColor)] hover:text-white hover:bg-[color:var(--mainTitleLightColor)] text-[color:var(--mainTitleLightColor)] font-bold gap-x-2 py-2 px-4 rounded inline-flex items-center'>
              <FaUpload />
              <button className='primaryBtn' type='submit'>Update</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
