'use client';
import React, {useState } from 'react';
import {CommonIconInput} from '@/app/components/common/inputs';
import { faKey, faPhone } from '@fortawesome/free-solid-svg-icons';
import CommonPopup from '@/app/components/common/popUp';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { CommonAlert, CommonSpinner } from '@/app/components/common/notifications';
import UserSignUp from '../forgot-password';
import { useOrganisation } from '@/app/OrganisationContext';

const cookies = new Cookies();

interface RequestBody {
  password: string;
  email?: string;
  phone_no?: string;
  emirates_id?: string;
}
// Assuming PageProps is defined somewhere
interface PageProps {
  [key: string]: never;
}

interface SlideInComponentProps {
  onClose: () => void;
}

// Define the component
const LoginPage = (props: any): JSX.Element => {
  const { onClose } = props as SlideInComponentProps;
  const [isPopupForgotPass, setPopupForgotPass] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { organisationId, setOrganisationId } = useOrganisation();
  const router = useRouter()
  const formSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (identifier.length == 0) {
        setErrorMessage("Phone Number is Required");
        return;
      }
  
      if (password.length == 0) {
        setErrorMessage("Password is Required");
        return;
      }
  
      let body: RequestBody = {
        password
      };
  
      if (/^\S+@\S+\.\S+$/.test(identifier)) {
        body.email = identifier;
      } else if (/\d{10}/.test(identifier)) {
        body.phone_no = identifier;
      } else if (identifier.length > 6 && identifier.includes('-')) {
        body.emirates_id = identifier;
      }
  
      setErrorMessage("");
  
      let response = await axios.post('http://13.201.21.16:5000/api/auth/login', body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = response.data;
      const token = data['token'];
      localStorage.setItem('token', token);
      cookies.set('token', token);
      let decoded: any = jwtDecode(token);
      const role = decoded['role'];
      let contractorId = decoded['identifier'];
      
      let profile_data = decoded['profile'];
      let userId = decoded['identifier'];
      let admin = decoded['identifier'];
      setOrganisationId(contractorId);
    
      if (role == 'contractor_company') {
        router.push(`context/${encodeURIComponent(contractorId)}/dashboard/`)
      } else if (role == 'user') {
        router.push(`/${encodeURIComponent(userId)}/`);
      } else if (role == 'admin') {
        router.push(`admin/${encodeURIComponent(admin)}/dashboard`);
      }
      setShowLoader(false)
    
    } catch (error:any) {

      setShowLoader(false)
  
  
      // Check for specific error status codes
      if (error.response && error.response.status === 403) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("User Does not exists");
      }
    }
  };


  return ( 
    
    <div className='no-scrollbar p-2 w-[25vw] h-full bg-white shadow-lg fixed top-0 right-0 z-30 transition-transform duration-800 ease-in-out '>
     
      <button
      className=" bg-red-500 text-white p-1 rounded-sm"
      onClick={onClose}
    >
      ×
    </button>
        <div className='m-10 bg-white  shadow-md '>
        
          <h1 className='text-2xl flex p-4 justify-center font-bold text-[color:var(--mainTitleColor)]' >Login</h1> 
               {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
              <CommonSpinner/>
              </div> : <></>}
              {errorMessage.length > 0 ? 
              <CommonAlert message={errorMessage} type='error'/>
              : <></>}
              

                <form onSubmit={formSubmitHandler} className="my-2 col-span-6 space-y-2" >
                      <div className='col-span-6'>
                        <CommonIconInput  
                            id="emirates_id"
                            // title="First name" 
                            icon={faPhone}
                            
                            required={true} 
                            placeholder='Enter Phone Number, Emirates Id or Email'
                            onChange={(e) => 
                            setIdentifier(e.target.value)
                            }
                        />
                    </div>
                    <div className='col-span-6  '>
                        <CommonIconInput      
                            id="password1"
                            // title="First name"   
                            icon={faKey}
                            required={true} 
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className='flex justify-center sm:mt-6 p-4' onClick={()=> setShowLoader(true)}>
                        <CommonButtonSolidBlue text='Login'/>
                      </div>
                      <div className="text-center mt-2 text-md text-[color:var(--primaryPink)] font-semibold">
                      <p className="text-[color:var(--mainTitleColor)] cursor-pointer mt-4" onClick={()=>setPopupForgotPass(true)}>Forgot Password?</p></div>
                      <CommonPopup
                      showModal={isPopupForgotPass}
                      onClose={() => setPopupForgotPass(false)}
                      heading={""}
                      content='' >
                          <  UserSignUp/>
                      </CommonPopup>
                </form>
              </div>
     
      
    </div>
  );
}
export default LoginPage
