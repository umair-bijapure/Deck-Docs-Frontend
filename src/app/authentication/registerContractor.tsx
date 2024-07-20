'use client'
import React,{useState,useEffect} from 'react';
import {CommonIconInput} from '@/app/components/common/inputs';
import {faAddressCard, faBuilding, faKey, faPhone} from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CommonAddButton, CommonButton, CommonButtonSolidBlue, CommonButtonText } from '@/app/components/common/buttons';
import { CommonAlert, CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';
import CommonPopup from '@/app/components/common/popUp';
import LoginPage from './login/page';
import { AddEmployeeProps } from '../context/[contractorId]/dashboard/TabMenu/addUser/page';

interface SlideInComponentProps {
  onClose: () => void;
}
interface CombinedProps extends SlideInComponentProps, AddEmployeeProps {}

 const RegisterContractor : React.FC<CombinedProps> = ({ contractorId, onEmployeeAdded,onClick,onClose ,profileType}) => {

    
    const [errorMessage, setErrorMessage] = useState('');
    const [
      company_name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [isPopupLogin, setPopupLogin] = useState(false);
    const [message, setMessage] = useState(''); 
    
  
    const router = useRouter();
  
    const formSubmitHandler = async (e: any) => {
  
      e.preventDefault();
      if (
        company_name.length == 0) {
        setErrorMessage('Username is Required');
        setShowLoader(false)
        return;
      }
  
      if (email.length == 0 && email.includes('@') ) {
        setErrorMessage('Email or Phone Number is Required');
        setShowLoader(false)
        return;
      }
      if (address.length == 0) {
        setErrorMessage('Address is Required');
        setShowLoader(false)
        return;
      }
    //   if (phoneno.length == 0) {
    //     setErrorMessage('Contact No. is Required');
    //     return;
    //   }
      if (phone_no.length != 10 && email.length == 0) {
        setErrorMessage('Phone No. is Invalid!');
        setShowLoader(false)
        return;
      }
      if (password.length == 0) {
        setErrorMessage('Password is Required');
        setShowLoader(false)
        return;
      }
      if (confPassword.length == 0) {
        setErrorMessage('Confirm Password is Required');
        setShowLoader(false)
        return;
      }
      if (password != confPassword) {
        setErrorMessage("Password and Confirm Password don't match");
        setShowLoader(false)
        return;
      }
      if(!isChecked) {
        setErrorMessage("Please Accept the Terms and Conditions");
        setShowLoader(false)
        return;
      }
      const body = {
        
company_name,
        password,
        email,
        phone_no,
        address
        
      };

      axios.post(
        contractorId
          ? `http://localhost:5000/api/auth/by_contractor_company/${contractorId}`
          : 'http://localhost:5000/api/auth/contractor_company',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          const data = response.data;
          if(!contractorId){
          const token = data['token'];
          localStorage.setItem('token', token);
          cookies.set('token', token);
          let decoded: any = jwtDecode(token);
          const role = decoded['role'];
          let contractorId = decoded['email']
          if (role == 'contractor_company') {
            router.replace(`/context/${encodeURIComponent(contractorId)}/dashboard/`);
            return;
          }}else{
            
            const token = data['message'];
            setMessage(token)
            onEmployeeAdded(phone_no);
          }
          setShowLoader(false)
          return;
        })
        .catch((e) => {
          setShowLoader(false)
          setErrorMessage(e.response.data['message']);
        });
    };
  
    const [isChecked, setIsChecked] = useState(false);
  

  

    return (
      <>
        <div className='no-scrollbar shadow-md w-[25vw] h-full bg-white shadow-lg fixed top-0 right-0 z-30 transition-transform duration-800 ease-in-out p-2'>
        <button
      className=" bg-red-500 text-white p-1 rounded-sm"
      onClick={onClose}
    >
      ×
    </button>
        {/* <h1 className='text-2xl flex justify-center items-center font-bold text-[color:var(--mainTitleColor)]' >Contractor Registration</h1>  */}
        <label htmlFor="profileImageInput" className='flex justify-center shadow-md items-center '>
                <img
                    id='contractor_company_profile'
                    src={'/engineer 1.png'}
                    alt="User Profile"
                    width={100}
                    height={100}
                    className="rounded-full pointer-events-none w-1/4 m-2 sm:m-4 "
                />
                <input
                    type="file"
                    id="contractor_company_profile_Input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    
                />
                
        </label>

        {errorMessage?.length > 0 ? 
          
          <DangerNotification message={errorMessage}  />
          : <></>}
                {message.length > 0 ? 
  
                 
          <SuccessNotification  message={message} />
          : <></>}

        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}
        <form onSubmit={formSubmitHandler} className="sm:my-2">
        <div className='grid grid-cols-6 p-2 sm:p-6'>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2 ">
                <CommonIconInput
                    id="name"
                    icon={faBuilding}
                    required={true} 
                    placeholder='Company Name'
                    onChange={(e) => {
                    setName(e.target.value);
                    }} 
                    />
            </div>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput                   
                    id="email"
                    // title="First name" 
                    icon={'/gmail.png'}
                    required={true} 
                    placeholder='Company Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput                   
                    id="address"
                    // title="First name" 
                    icon={faAddressCard}
                    required={true} 
                    placeholder='Company Address'
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput  
                    id="phone"
                    // title="First name" 
                    icon={faPhone}
                    required={true} 
                    placeholder='Company Phone No'
                    onChange={(e) => {
                        setPhoneNo(e.target.value)
                        console.log(e.target.value, "onnnnnnnnnnoooooooooooooooooooooooo");
                    }}
                />
            </div>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput      
                    id="password1"
                    // title="First name" 
                    icon={faKey}
                    required={true} 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput                   
                    id="password2"
                    // title="First name" 
                    icon={faKey}
                    required={true} 
                    placeholder='Confirm Password'
                    onChange={(e) => setConfPassword(e.target.value)}              
                />
            </div>
            <div className="flex col-span-6 sm:col-span-3 p-2">
                  <input type="checkbox" id="accept" name="accept" onChange={(e)=>{
                    console.log(e.target.checked)
                    setIsChecked(e.target.checked)
                    }} className='my-auto mr-2 w-fit' value="accept"/>
                  <p className='font-semibold text-sm text-gray-400 '>I accept the <Link target={"_blank"} className='underline' href={""}>Terms & Conditions</Link></p>
            </div>
        </div>


        <div className='flex justify-center sm:mt-6'onClick={()=> setShowLoader(true)}>
            <CommonButtonSolidBlue text='Register'/>
        </div>
                  
                
        </form>
        {/* <div className="flex flex-row items-center justify-center p-2 sm:p-4">
                <p className="text-md font-medium text-gray-400">
                  Already have an account?{' '}
                  <p
                    className="text-[color:var(--mainTitleColor)] font-semibold"
                   onClick={()=>setPopupLogin(true)}
                  >
                    Login
                  </p>

                </p>
              </div> */}
          
        </div>
        {/* <CommonPopup
              showModal={isPopupLogin}
              onClose={() => setPopupLogin(false)}
              heading={"Login "}
              content='' >
                   <LoginPage />
              </CommonPopup> */}

</>
        
    );
};
export default RegisterContractor