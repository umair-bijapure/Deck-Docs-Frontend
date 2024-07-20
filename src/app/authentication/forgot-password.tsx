import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { CommonAlert, CommonSpinner } from '@/app/components/common/notifications';
import { CommonIconInput } from '@/app/components/common/inputs';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { AiFillAlert, AiOutlineCheck, AiOutlineMail } from 'react-icons/ai';
import { faCheckCircle, faCode, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
const UserSignUp: NextPage = () => {


    const [phone_no, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [toast, setToast] = useState("");

    const initateSubmitHandler = async(e:any) => {
        console.log("comiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        e.preventDefault();
        if(email.length == 0){
            setErrorMessage("Username is Required!");
            return;
        }
        if(phone_no.length == 0){
            setErrorMessage("Username is Required!");
            return;
        }
        const body = {
            email,
            phone_no
        }
        setErrorMessage("");
        axios.post('http://localhost:5000/api/auth/forgot-password/initiate', body, {
        headers: {
            'Content-Type': 'application/json'
        }
        } ).then((response)=>{
            const data = response.data;
            setToast(data['message']);
            setStep(2);
            return;
        }).catch((e)=>{
            setErrorMessage(e.response.data['message']);
        });
    }

    const verifySubmitHandler = async(e:any) => {
        e.preventDefault();
        if(code.length != 6){
            setErrorMessage("Code is invalid!");
            return;
        }
        const body = {
            phone_no, code
        }
        setErrorMessage("");
        axios.post('http://localhost:5000/api/auth/forgot-password/verify', body, {
        headers: {
            'Content-Type': 'application/json'
        }
        } ).then((response)=>{
            const data = response.data;
            setToast(data['message']);
            setStep(3);
            return;
        }).catch((e)=>{
            setErrorMessage(e.response.data['message']);
        });
    }

    const resetSubmitHandler = async(e:any) => {
        e.preventDefault();

        if(password.length == 0){
            setErrorMessage("Password is Required!");
            return;
        }

        if(confPassword.length == 0){
            setErrorMessage("Confirm Password is Required!");
            return;
        }

        if(password != confPassword){
            setErrorMessage("Passwords don't Match!");
            return;
        }

        const body = {
            phone_no, password
        }
        setErrorMessage("");
        axios.post('http://localhost:5000/api/auth/forgot-password/reset', body, {
        headers: {
            'Content-Type': 'application/json'
        }
        } ).then((response)=>{
            const data = response.data;
            setToast(data['message']);
            setStep(4);
            return;
        }).catch((e)=>{
            setErrorMessage(e.response.data['message']);
        });
    }


  return (
    <>
        <div id='about' className=" flex flex-col items-center justify-center  w-full p-2   py-10 ">
            {toast.length>0?
           <div className='flex p-4  items-center gap-x-2 text-green-500 rounded-lg dark:bg-green-800 dark:text-green-200 border border-green-300'><p><AiOutlineCheck/></p><p>{toast}</p></div>
           : <></>}
            {errorMessage.length > 0 ? <CommonAlert message={errorMessage} type='error'/>
             : <></>}
            <div className='m-auto m-10 flex justify-center'>
                <div className='flex justify-center lg:w-[370px] xl:w-[412px] h-auto m-auto rounded-md p-4 hover:scale-105  ease-in duration-300 shadow-md'>
                    <div className='grid md:grid-row-2 gap-2  w-full py-2'>
                        <div className='flex flex-col items-center justify-between mb-4'>
                            <h1 className='text-2xl font-bold text-[color:var(--mainTitleColor)]' >Forgot Password</h1> 
                            {step == 1 ? <p className='font-semibold text-[color:var(--mainTitleColor)] opacity-60'>Enter Your Username to Initiate Reset Password</p> : <></>}
                            {step == 2 ? <p className='font-semibold text-[color:var(--mainTitleColor)]'>Enter the Code Sent on Registered Email</p> : <></>}
                            {step == 3 ? <p className='font-semibold text-[color:var(--mainTitleColor)]'>Reset Your Password</p> : <></>}
                        </div>
                        {errorMessage.length > 0 ? <p className='text-center font-semibold text-[color:var(--primaryPink)]'>{errorMessage}</p> : <></>}
                        {step == 1 ? <form >
                            <div className='flex flex-col gap-y-2'>
                                
                                <CommonIconInput icon={faMailBulk} required={true} onChange={(e) => setEmail(e.target.value)} id={''} placeholder={'Enter Email'} />
                               
                                <CommonIconInput icon={faPhone}  required={true} onChange={(e) => setPhoneNo(e.target.value)} id={''} placeholder={'Enter Phone Number'} />
                            
                            </div>
                            <div className='flex items-center justify-center p-4' onClick ={initateSubmitHandler} >
                                <CommonButtonSolidBlue  text='Submit' />
                            </div>
                        </form> : <></>}
                        {step == 2 ? <form >
                            <div className='flex flex-col'>
                                <label className='text-sm py-1 font-semibold text-[color:var(--titleColor)]'>Code</label>
                                <CommonIconInput icon={faCode} required={true} onChange={(e) => setCode(e.target.value)} id={''} placeholder={'ENter Code'} />
                            </div>
                            <div className='flex items-center justify-center p-4' onClick={verifySubmitHandler}>
                                <CommonButtonSolidBlue  text='Submit' />
                            </div>
                        </form> : <></>}
                        {step == 3 ? <form >
                            <div className='flex flex-col gap-y-2'>
                                
                            <CommonIconInput icon={faPhone} id='' placeholder='Enter New Password'  required={true} onChange={(e)=>setPassword(e.target.value)} />
                            
                            
                            <CommonIconInput icon={faPhone} id='' placeholder='Renter New Password'  required={true} onChange={(e)=>setConfPassword(e.target.value)} />
                            </div>
                            <div className='p-4 flex justify-center text-white mt-2' onClick={resetSubmitHandler}>
                                <CommonButtonSolidBlue  text='Reset Password' />
                               
                            </div>
                          
                        </form> : <></>}
                        {/* {step == 4 ? <div className='flex flex-col align-middle justify-center'>
                            <p className='text-center font-semibold text-[color:var(--mainTitleColor)]'>Password Reset Successfully!</p>
                            <Link href={"/auth/login"}>
                                <button className='w-full p-2 border-2 font-semibold rounded-md bg-[color:var(--primaryPink)] border-gray-300 text-white mt-4'>
                                    Login To Continue
                                </button>
                            </Link>
                        </div> : <></>} */}
                    </div>
                </div>
            </div>
        </div>

        
    </>
    
  );
};

export default UserSignUp
