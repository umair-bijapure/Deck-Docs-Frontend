import React, { useState } from 'react'
import Link from 'next/link';
import {FaFacebook,FaTwitter,FaInstagram} from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import axios from 'axios';
import { getLoggedInRole, isUserLoggedIn, logOutUser } from '../components/utils/utils';
const Footer = () => {

  const validateEmail = (email:string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formSubmitHandler = async(e:any) => {
    e.preventDefault();
    if(email.length == 0){
      setErrorMessage("Email is Required");
      return;
    }
    if(!validateEmail(email)){
      setErrorMessage("Email is not valid!");
      return;
    }
    const body = {
      email
    }
    setErrorMessage("");
    axios.post('https://api.kuickplan.com/api/newsletters', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    } ).then((response)=>{
      setErrorMessage("Sent Successfully!")
      return;
    }).catch((e)=>{
      setErrorMessage(e.response.data['message']);
    })
  }

  return (
    <div className="py-8 bg-[color:var(--lightBackgroundColor)] border-0 !border-t-2 flex flex-col-reverse xl:flex-row align-middle justify-evenly text-lg max-xl:text-center">
      <div className="flex flex-col sm:flex-row mx-auto xl:flex-row justify-evenly align-middle w-full max-sm:my-0 sm:py-0 my-4 p-4 xl:mx-4">
        <div className='flex-1 justify-center items-center my-4 sm:my-0 xl:mx-8'>
      
          <div className='mb-4 text-[color:var(--textColor)]'>
            <h1 className='flex flex-col items-center'>
          <img className=" h-20 w-[90px]" src={'/full_logo.png'} alt="Engineering team working together" />
          Office M10,< br />
          Makateb Building,<br />
          Airport Road,<br />
          Port Saeed, Dubai, UAE<br/>
          </h1>
          </div>

        </div>
        <div className='flex-1 my-4 sm:my-0 xl:mx-8'>
          <h2 className='font-bold text-[color:var(--titleColor)] mb-2'>Options</h2>
          <h6 className='mb-2 text-[color:var(--textColor)]'><Link href={"/vendor-services"}>Services</Link></h6>
          <h6 className='mb-2 text-[color:var(--textColor)]'><Link href={"/about-us"}>About Us</Link></h6>
          <h6 className='mb-2 text-[color:var(--textColor)]'><Link href={"/terms"}>Terms & Policy</Link></h6>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mx-auto justify-evenly align-middle w-full max-sm:my-0 sm:py-0 my-4 p-4 xl:mx-4">
        <div className='flex-1 my-4 sm:my-0 xl:mx-8'>
        <h4 className='font-bold text-[color:var(--titleColor)] mb-0'>Contact Us</h4>
          <p className='mb-2 text-[color:var(--textColor)]'><a href="tel:+919529882280">+971 54 730 4530</a></p>
          <h6 className='mb-2 text-[color:var(--titleColor)]'><Link href={"/"}>info@promaestroae.com</Link></h6>
        </div>
        <div className='flex-1 my-4 sm:my-0 xl:mx-8'>
          <h2 className='font-bold text-[color:var(--titleColor)] mb-2'>Stay Connected</h2>
          <div className='flex flex-row align-middle max-xl:mx-auto justify-center xl:justify-start'>
            <div className='m-2'>
              <Link target={"_blank"} href={"https://www.instagram.com/kuickplan"}>
                <FaInstagram color='var(--mainTitleColor)' size={30} />
              </Link>
            </div>
            <div className='m-2'>
              <Link target={"_blank"} href={"https://www.facebook.com/profile.php?id=100089094078254&mibextid=ZbWKwL"}>
                <FaFacebook color='var(--mainTitleColor)' size={30} />
              </Link>
            </div>
            <div className='m-2'>
              <Link target={"_blank"} href={"https://twitter.com/kuickplan?t=dA_cnQ5SoW3G8SIojgCOkQ&s=09"}>
                <FaTwitter color='var(--mainTitleColor)' size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mx-auto justify-evenly align-middle w-max xl:mx-4 sm:py-0 my-4 p-4">
        <div className='xl:mx-8 flex flex-col'>
          <h2 className='font-bold text-[color:var(--titleColor)] mb-2'>Join our Newsletter</h2>
          <form onSubmit={formSubmitHandler} className="flex flex-row align-middle justify-center">
            <input type="email" onChange={(e)=>setEmail(e.target.value)} required className='customInput p-2 rounded-md' placeholder='Enter your email' />
            <button className='primaryBtn ml-2 text-[color:var(--mainTitleColor)] '><RiSendPlaneFill size={26} /></button>
          </form>
          {errorMessage.length > 0 ? <p className='my-2 font-semibold text-[color:var(--primaryColor)] text-center'>{errorMessage}</p>:<></>}
        </div>
      </div>
    </div>
  )
}

export default Footer