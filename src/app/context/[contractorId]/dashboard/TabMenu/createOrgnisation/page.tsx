// components/CreateOrganisationForm.tsx
'use client';
import { standardFetch } from '@/app/components/utils/fetches';
import React, { useState } from 'react';

import styled, { keyframes } from 'styled-components';
import { FaBuilding, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCity, FaGlobe, FaCogs, FaSpinner, FaFlag, FaArrowLeft, FaLock } from 'react-icons/fa';
import { CommonSpinner } from '@/app/components/common/notifications';


interface CreateOrganisationFormProps {
  parentOrganisationId: string;
  onClick: () => void;
}
  interface OrganisationResponse {
    status: number;
    data?: any; // Replace `any` with your actual expected data type
    message?: string;
    
  }
  
const CreateOrganisationForm = (props: any): JSX.Element => {

  const {parentOrganisationId} = props as CreateOrganisationFormProps
  const {onClick} = props as CreateOrganisationFormProps

    const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [services, setServices] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [password, setPassword] = useState('');
  const handleCreateSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setShowLoader(true);

    if (name.length == 0) {
      setError('First Name is Required');
      setShowLoader(false);
      return;
    }
    
  
    if (phoneNo.length == 0) {
      setError('Phone Number is Required.');
      setShowLoader(false);
      return;
    }
  
    if (phoneNo.length != 10) {
      setError('Phone Number is Invalid!');
      setShowLoader(false);
      return;
    }

    const requestBody = {
      name,
      owner_name: ownerName,
      phone_no: phoneNo,
      email,
      address,
      city,
      state,
      country,
      password,
      services: services.split(','), // Assuming services are comma-separated
    };
    let createOrganisation: OrganisationResponse | undefined=undefined; 

    try {
        createOrganisation = await standardFetch({
        url: `${process.env.NEXT_PUBLIC_API_URL}/organisation/create-organisation/${parentOrganisationId}`, // Replace parentOrganisationId with actual ID
        method: 'POST',
        body: JSON.stringify(requestBody),
        contentType: 'application/json',
      });
      setShowLoader(false);
        setSuccess(true); // Set success state to true on successful creation
        setError('');

      
    } catch (error) {
      setShowLoader(false);
      setSuccess(false);
        if (error instanceof Error) {
          setError(error.message);
          if (error.message === 'HTTP error! Status: 400') {
            setError("An organisation with this name already exists.");
          } else if (error.message === 'HTTP error! Status: 501') {
            setError("An organisation with this email already exists.");
          } else if (error.message === 'HTTP error! Status: 502') {
            setError("An organisation with this Phone no. already exists.");
          }
        } else {
          setError('An unexpected error occurred');
        }
      }finally {
      setLoading(false);
      setShowLoader(false);
    }
  };
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  return (
    <>
          <div className=" text-[18px] gap-x-2 m-2 p-2 text-gray-700 hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 transition-all ease-out duration-300 cursor-pointer" onClick={onClick}>
        <FaArrowLeft />
        <h1 className="text-lg">Back</h1>
      </div>
  
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            {showLoader && (
      <div className="mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center">
        <CommonSpinner />
      </div>
    )}
      <form onSubmit={handleCreateSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg space-y-6">
      {/* {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Organisation created successfully!</p>} */}
      {success? <p className="text-green-500">Organisation created successfully!</p>:error?<p className="text-red-500">{error}</p>:''}
        <div className="flex items-center space-x-2">
          <FaBuilding className="text-gray-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Organisation Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaUser className="text-gray-500" />
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Owner Name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaPhone className="text-gray-500" />
          <input
            type="text"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            placeholder="Phone Number"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
               
                placeholder="Enter password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"

              />
             
            </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCity className="text-gray-500" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaFlag className="text-gray-500" />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaGlobe className="text-gray-500" />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaCogs className="text-gray-500" />
          <input
            type="text"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            placeholder="Services (comma-separated)"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {loading ? <FaSpinner className="animate-spin" /> : 'Create Organisation'}
        </button>
      
      </form>
    </div>
    </>
  );
};

export default CreateOrganisationForm;