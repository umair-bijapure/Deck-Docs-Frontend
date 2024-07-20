'use client';

import React, { useEffect, useState } from "react";
import { CommonHelmet } from "./components/common/commonHelmet";

import Footer from "./components/Footer";
import { FaAngleLeft } from "react-icons/fa";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainNavbar from "./components/MainNavbar";
import { useParams } from "next/navigation";

import UploadFolderPage from './components/folderUpload';
import LoginPage from "./authentication/login/page";
import RegisterContractor from "./authentication/registerContractor";
const Landing = () => {
  const advertisements = [
    { id: 1, text: 'Folder Link Generations', imageUrl: '/vshare.jpg' },
    { id: 2, text: 'Store Employee Documents', imageUrl: '/struct.jpg' },
    { id: 3, text: 'Employee Attendance', imageUrl: '/attendance.png' },
    { id: 4, text: 'Generate Salary Slips', imageUrl: '/salary cal.png' },
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);
  const [isVshareVisible, setVshareVisible] = useState(false);


  const handlePrevious = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex - 1 + advertisements.length) % advertisements.length);
  };

  const handleNext = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 5000); // Adjust the interval as needed (5 seconds in this example)

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleLoginClick = () => {
    setLoginVisible(!isLoginVisible);
    
};

const handleRegisterClick = () => {
    setRegisterVisible(!isRegisterVisible);
    
};

const handleVshareClick = () => {
  setVshareVisible(prevState => !prevState);
};

  return (
    < div className="no-scrollbar bg-[color:var(--primaryColor)]">
      <CommonHelmet pageTitle="Home" applicationTitle="Teams Promaestro" favicon={'/logo.png'} />  
      {isVshareVisible && (
            <div>                        
              <UploadFolderPage onClick={handleVshareClick} projectId={"General"} contractor_company={"Promarstro"} />
            </div>           
            )
            }
      <MainNavbar onVshareClick={handleVshareClick} onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} contractorId={""} />
    {/* <div className={`flex min-h-screen transition-transform duration-500 ${isLoginVisible ? 'transform -translate-x-[10%]' : ''}`}> */}

    
      <div className={`flex justify-between items-start min-h-screen overflow-auto bg-[color:var(--primaryColor)] transition-transform duration-700 ease-in-out no-scrollbar ${isVshareVisible ? 'transform -translate-x-[25vw]' :isLoginVisible||isRegisterVisible?'transform -translate-x-[25vw]': ''}`}>
      <div className="relative">
  <div className="flex flex-col items-start p-4 ml-20 relative z-10">
    <div className="relative flex items-center justify-center h-[500px] w-[500px]">
      <button
        onClick={handlePrevious}
        className="absolute left-[-50px] text-3xl text-white"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className="flex flex-col items-center justify-center text-white text-xl font-bold">
        <img
          src={advertisements[currentAdIndex].imageUrl}
          alt={advertisements[currentAdIndex].text}
          className="w-full h-full object-contain rounded-xl"
        />
        <h1 className="mt-4">{advertisements[currentAdIndex].text}</h1>
      </div>
      <button
        onClick={handleNext}
        className="absolute right-[-50px] text-3xl text-white"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  </div>
  <img
    src="/shield.png" // Replace with the path to your image
    alt="Background Image"
    className="absolute bottom-0 right-0 object-contain h-[400px] w-[400px] transform translate-x-[210px] translate-y-[100px]"
  />
</div>    
        <div className="mr-14 p-4">
          
          <div className="relative  h-[400px] w-[400px]">

            <div className="items-center flex flex-col justify-center text-white text-xl font-bold relative ">
            <img
              src={'/docs.jpg'}
              alt={"Documents"}
              className="w-full h-full object-contain rounded-xl z-10"
            />
            <img
          src="/ai.png" // Replace with the path to your image
          alt="Background Image"
          className="absolute top-0 right-0 object-contain h-[60px] w-[60px] transform translate-x-[48px] translate-y-[2px] opacity-40"
        />
            </div>
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4 hover:scale-110 duration-100">
        <img
        src="/images.png" // Replace with the path to your image
        alt="Background Image"
        className="rounded-full border-2 border-white h-[80px] w-[80px] p-1 hover:bg-white cursor-pointer"
        />
        <h1 className="text-sm font-semibold text-white m-1">Certificates</h1>
      </div>
      <div className="flex flex-col items-center justify-center p-4 hover:scale-110 duration-100">
        <img
        src="/report-updated.png" // Replace with the path to your image
        alt="Background Image"
          className="rounded-full border-2 border-white h-[80px] w-[80px] p-1 hover:bg-white cursor-pointer"
        />
         <h1 className="text-sm font-semibold text-white m-1">Reports</h1>
    </div>
    <div className="flex flex-col items-center justify-center p-4 hover:scale-110 duration-100">
    <img
    src="/dossier.png" // Replace with the path to your image
    alt="Background Image"
      className="rounded-full border-2 border-white h-[80px] w-[80px] p-1 hover:bg-white cursor-pointer"
    />
     <h1 className="text-sm font-semibold text-white m-1">Documents</h1>
    </div>
  </div>

          </div>
        </div>
     
      </div>
      {isLoginVisible && (
                <div >
                    <LoginPage onClose={handleLoginClick} />
                    
                </div>
            )}

            {isRegisterVisible && (
                <div>
                    <RegisterContractor onClose={handleRegisterClick} contractorId={""} onEmployeeAdded={function (id: string): void {
              throw new Error("Function not implemented.");
            } } onClick={function (): void {
              throw new Error("Function not implemented.");
            } } profileType={""} />
          
                </div>
            )}

    {/* </div> */}
  
      
      <Footer/>
    </div>
  );
};

export default Landing;
