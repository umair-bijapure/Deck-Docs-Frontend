'use client'
import React, { useState } from 'react';



import RegisterUser from './registerUser';
import CommonPopup from '@/app/components/common/popUp';


interface FormProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


type Props = {};

const SignUpPage: React.FC<Props> = () => {
  
  const [selectedTab, setSelectedTab] = useState('contractor'); // Default selected tab is 'user'
  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, formData: FormProps) => {
    e.preventDefault();
    console.log(formData);
    // Implement your form submission logic here
  };
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setPopupVisible(true)
  };

  return (
    <div className="flex  align-middle bg-white h-screen">
      <div className="mx-auto flex flex-col justify-center text-center gap-y-4">

        <div className='mt-4'>
            <h2 className=" text-xl md:text-2xl lg:text-3xl font-bold text-[color:var(--mainTitleColor)] mb-2">
                Free Registration
            </h2>
            {/* <p className="text-md lg:text-xl text-[color:var(--lightGrayFontColor)]">
                Simple Registration of your Organisation to get started.
            </p> */}
        </div>

        <div className="flex justify-center mb-1">
          <button
            className={`px-4 py-2 mx-2 border border-transparent rounded-md  ${
              selectedTab === 'user' ? ' bg-[color:var(--mainTitleColor)] text-white text-2xl' : ' bg-blue-50 text-[color:var(--mainTitleColor)] border-2 border-[color:var(--lightGrayFontColor)]'
            }`}
            onClick={() => handleTabChange('user')}>
              Employee
          </button>
          <button
            className={`px-4 py-2  mx-2 border border-transparent  rounded-md ${
              selectedTab === 'contractor' ? '  bg-[color:var(--mainTitleColor)] text-white text-2xl' : 'bg-blue-50 text-[color:var(--mainTitleColor)] border-2 border-[color:var(--lightGrayFontColor)]'
            }`}
            onClick={() => handleTabChange('contractor')}>
              Contractor
          </button>
        </div>
        {selectedTab === 'user' && (
            <CommonPopup
              showModal={isPopupVisible}
              onClose={() => setPopupVisible(false)}
              heading={"Registration of Employees and Clients "}
              content='' >
              <RegisterUser />
            </CommonPopup>
        )}

      </div>
    </div>
  );
};

export default SignUpPage;
