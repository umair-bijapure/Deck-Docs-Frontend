// 'use client'
// import React, { ReactNode, useState } from 'react';
// import { CommonBackground } from '@/app/components/common/bannersAndheadings';
// import { CommonFormTextInput, CommonIconInput, CommonSelect, CommonTextInput} from '@/app/components/common/inputs';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
// // import { faMailBulk, faMailReply, faUser} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdCard, faKey, faPerson, faPhone, faUser, faUserAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { CommonIcon } from '@/app/components/common/icons';
// import { CommonSpinner } from '@/app/components/common/notifications';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { dataUrlToFile, getLoggedInUserData, getUploadedImageLink, toBase64 } from '@/app/components/utils/utils';
// import { CommonAlert } from '@/app/components/common/notifications';
// import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
// import { FaUser } from 'react-icons/fa';
// interface RegiterUserProps {

//     // show: boolean;
//     color?:string;
//     children:ReactNode;
//     showConfirmPassword?: boolean; 
//     twoDocumentsUploaded?:boolean;
//   }


// const RegisterUser : React.FC<RegiterUserProps> = ({ color,children,showConfirmPassword = true,twoDocumentsUploaded=true}) => {


//     const [profile, setProfile] = useState({ names: { name: 'User' },uploadedImage:'' });
//     const [frontFileData, setfrontFileData] = useState<any>('');
//     const [showLoader, setShowLoader] = useState(false);

//     const [userData, setUserData] = useState({
//       "_id": "",
//       "emirates_id":"",
//       "name": "",
//       "email": "",
//       "phone_no": "",
//       "profile_picture": "",
//       "isActive": true,
//       "__v": 0,
//     });
//     const [errorMessage, setErrorMessage] = useState('');
//     const [message, setMessage] = useState('');
//     const [alerttype, setAlertType] = useState('');
//     const [emirates_id, setEID] = useState('');
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');
   
//     const [phone_no, setPhoneNo] = useState('');
//     const [password, setPassword] = useState('');
//     const [confPassword, setConfPassword] = useState('');
//     const [profile_picture, setProfilePicture] = useState<any>(null);
    
//     const router = useRouter();
//     const changeProfilePicture = async(file:File) => {
//       const theFile = await toBase64(file);
//       setProfilePicture(theFile);
//     }
//     const formSubmitHandler = async (e: any) => {
  
//       e.preventDefault();
//       setShowLoader(true);
//       const theImageFile = await dataUrlToFile(profile_picture, "profile_picture");
//       const theImageLink = await getUploadedImageLink(theImageFile);
//       if (first_name.length == 0) {
//         setErrorMessage('Name is Required');
//         return;
//       }
  
//       // if(theImageLink == ""){
//       //   <CommonAlert message={"Error Uploading Image"}/>
//       //   setShowLoader(false);
//       //   return;
//       // }
//       // if (emirates_id.length == 0) {
//       //   setErrorMessage('Emirates is Required');
//       //   setShowLoader(false);
//       //   return;
//       // }
//       if (phone_no.length == 0 && emirates_id.length == 0) {
//         setErrorMessage('Contact No. or Emirates id is Required.');
//         setShowLoader(false);
//         return;
//       }
//       if (phone_no.length != 10 ) {
//         setErrorMessage('Phone No is Invalid!');
//         setShowLoader(false);
//         return;
//       }

//       if (password.length == 0) {
//         setErrorMessage('Password is Required');
//         setShowLoader(false);
//         return;
//       }
//       if (confPassword.length == 0) {
//         setErrorMessage('Confirm Password is Required');
//         setShowLoader(false);
//         return;
//       }
//       if (password != confPassword) {
//         setErrorMessage("Password and Confirm Password don't match");
//         setShowLoader(false);
//         return;
//       }
//       if(!isChecked) {
//         setErrorMessage("Please Accept the Terms and Conditions");
//         setShowLoader(false);
//         return;
//       }
//       setProfilePicture(theImageLink)
//       const body = {
//         first_name,
//         last_name,
//         emirates_id,
//         password,
//         phone_no,
//         profile_picture,
        
//       };
//       setErrorMessage('');
//       axios
//         .post('http://localhost:5000/api/auth/user', body, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//         .then((response) => {
//           const data = response.data;
//           const token = data['token'];
//           localStorage.setItem('token', token);
//           cookies.set('token', token);
//           let decoded: any = jwtDecode(token);
//           setMessage('"Profile Picture Updated Successfully!"')
//           setAlertType('success')
         
//           setShowLoader(false);
//           const role = decoded['role'];
//           let userId = decoded['identifier'];
//           if (role == 'user') {
//             router.replace(`context/${encodeURIComponent(userId)}/dashboard`);
//             return;
//           }
//           return;
//         })
        
//         .catch((e) => {
//           setErrorMessage(e.response.data['message']);
//         });
//     };
  
//     const [isChecked, setIsChecked] = useState(false);

//   return (
    

// <div>
//     <form className='my-2 mx-auto text-center' onSubmit={formSubmitHandler}>
      
//       <div className='flex'>
//         <label htmlFor="employee_company_profile_Input" className='flex flex-col sm:flex-row justify-center shadow-md items-center w-auto sm:pl-3 '>
//                 <img
//                     id='contractor_company_profile'
//                     src={userData['profile_picture']||'/Emirates ID.jpg'}
//                     alt="Emirates ID"
//                     width={100}
//                     height={100}
//                     className="rounded-sm pointer-events-none w-1/4 m-2 sm:m-4 "
//                 />
//                 <input
//                     type="file"
//                     id="employee_company_profile_Input"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={(e)=>changeProfilePicture(e.target.files![0])}      
//                 />
//             {true &&
//             <div className='grid grid-cols-1 sm:grid-cols-2 p-2 '>
//               <div className='col-span-1 p-2'>
//               <CommonIconInput
//                     id="first_name"
//                     icon={faUser}
//                     required={true} 
//                     placeholder='First Name'
//                     onChange={(e) => {
//                     setFirstName(e.target.value);
//                     }} 
//                     />
//                 </div>
//                 <div className='col-span-1 p-2'>
//                 <CommonIconInput
//                     id="last_name"
//                     icon={faUser}
//                     required={true} 
//                     placeholder='Last Name'
//                     onChange={(e) => {
//                     setLastName(e.target.value);
//                     }} 
//                     />
//                 </div>

//             </div>
//               }
                
//         </label>
       

            
//         </div>
//         {errorMessage.length > 0 ? 
//         <CommonAlert message={errorMessage} type='error'/>
//         : <></>}
//         {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
//             <CommonSpinner/>
//       </div> : <></>}
//         <div className='grid grid-cols-6 p-2 sm:p-6'>
//         <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
//                 <CommonIconInput  
//                     id="emirates_id"
//                     // title="First name" 
//                     icon={faIdCard}
//                     required={true} 
//                     placeholder='Emirates Id'
//                     onChange={(e) => 
//                     setEID(e.target.value)
//                     }
//                 />
//             </div>




//             <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
//                 <CommonIconInput  
//                     id="phone"
//                     // title="First name" 
//                     icon={faPhone}
//                     required={true} 
//                     placeholder='Phone Number'
//                     onChange={(e) => {
//                         setPhoneNo(e.target.value)
//                         console.log(e.target.value, "onnnnnnnnnnoooooooooooooooooooooooo");
//                     }}
//                 />
//             </div>
//             <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
//                 <CommonIconInput      
//                     id="password1"
//                     // title="First name" 
//                     icon={faKey}
//                     required={true} 
//                     placeholder='Password'
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
//                 <CommonIconInput                   
//                     id="password2"
//                     // title="First name" 
//                     icon={faKey}
//                     required={true} 
//                     placeholder='Confirm Password'
//                     onChange={(e) => setConfPassword(e.target.value)}              
//                 />
//             </div>
//             <div className="flex items-center col-span-6 sm:col-span-3 p-2">
//                   <input type="checkbox" id="accept" name="accept" onChange={(e)=>{
//                     console.log(e.target.checked)
//                     setIsChecked(e.target.checked)
//                     }} className='my-auto mr-2 w-fit' value="accept"/>
//                   <p className='font-semibold text-sm text-gray-400 '>I accept the <Link target={"_blank"} className='underline' href={""}>Terms & Conditions</Link></p>
//         </div>
//         </div>
//         <div className='sm:mt-6'>
//             <CommonButtonSolidBlue text='Register'/>
//         </div>
//     </form>
//     <div className="flex flex-row items-center justify-center p-2 sm:p-4">
//                 <p className="text-md font-medium text-gray-400">
//                   Already have an account?{' '}
//                   <Link
//                     className="text-[color:var(--mainTitleColor)] font-semibold"
//                     href="/context/authentication/login"
//                   >
//                     Login
//                   </Link>
//                 </p>
//               </div>
       

// </div>




    
//   );
// };
// export default RegisterUser;





// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj


'use client'
import React, {  useEffect, useState } from 'react';
import {  CommonIconInput} from '@/app/components/common/inputs';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { faIdCard, faKey, faPhone, faUser} from '@fortawesome/free-solid-svg-icons';
import { CommonSpinner, DangerNotification, SuccessNotification } from '@/app/components/common/notifications';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { dataUrlToFile, getUploadedImageLink, toBase64 } from '@/app/components/utils/utils';
import { CommonButtonSolidBlue } from '@/app/components/common/buttons';
import { FaUpload } from 'react-icons/fa';
import { fetchCreateUser, handleUpload } from '@/app/components/utils/fetches';
import axios from 'axios';
interface RegiterUserProps {
    contractorId?:any;
  }
  interface Contractor {
    _id: string;
    name: string;
  }

const RegisterUser : React.FC<RegiterUserProps> = () => {

   
    const [profile, setProfile] = useState({ names: { name: 'User' },uploadedImage:'' });
    const [fileData, setFileData] = useState<any>('');
    const [showLoader, setShowLoader] = useState(false);


    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [alerttype, setAlertType] = useState('');
    const [isChecked, setIsChecked] = useState(false);
   
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [profile_picture, setProfilePicture] = useState<any>('');
    const [uploadedFrontImage, setUploadedFrontImage] = useState<string>('');
    const [birth_date, setBirthDate] = useState('');
    const [emirates_id, setEmiratesID] = useState('');
    const [emirates_id_expiry, setEmiratesIdExpiry] = useState('');
    const [userType, setUserType] = useState<string>('');
    const [is_employee_user, setEmployee] = useState(true);
    const [is_supervisor, setSupervisor] = useState(false);
    const [is_sub_contractor, setSubContractor] = useState(false);
    const [is_main_contractor, setMainContractor] = useState(false);
    const [is_client, setClient] = useState(false);
    const [contractors, setContractors] = useState<any>([]);
    
    const router = useRouter();
    const [contractor_company_id,setContractorCompanyId]=useState('');
    const formSubmitHandler = async (e: any) => {
  
      e.preventDefault();
      setShowLoader(true);
      const theImageFile = await dataUrlToFile(profile_picture, "profile_picture");
      const theImageLink = await getUploadedImageLink(theImageFile);
      if (first_name.length == 0) {
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
      if (phone_no.length == 0 ) {
        setErrorMessage('Contact No. or Emirates id is Required.');
        setShowLoader(false);
        return;
      }
      if (phone_no.length != 10 ) {
        setErrorMessage('Phone No is Invalid!');
        setShowLoader(false);
        return;
      }
     
      if (password.length == 0 ) {
        setErrorMessage('Password is Required');
        setShowLoader(false);
        return;
      }
      if (confPassword.length == 0) {
        setErrorMessage('Confirm Password is Required');
        setShowLoader(false);
        return;
      }
      if (password != confPassword )  {
        setErrorMessage("Password and Confirm Password don't match");
        setShowLoader(false);
        return;
      }
      if(!isChecked ) {
        setErrorMessage("Please Accept the Terms and Conditions");
        setShowLoader(false);
        return;
      }
      // if (userType=="Employee"){
      //   setEmployee(true);
      // }else if(userType=="Client"){
      //   setClient(true);
      // }else if(userType=="Supervisor"){
      //   setSupervisor(true);
      // }else if(userType=="Main Contractor"){
      //   setMainContractor(true);
      // }else{
      //   setSubContractor(true);
      // }
      setProfilePicture(theImageLink)

      const body = {
        first_name,
        last_name,
        password,
        phone_no,
        emirates_id,
        is_client,
        is_employee_user,
        is_main_contractor,
        is_sub_contractor,
        is_supervisor,
        contractor_company_id,
        birth_date,
        profile_picture
      };
     
      // const createUserPromise = fetchCreateUser(JSON.stringify(body));

      // createUserPromise
      //   .then(response => {
          // const data = response.data;
      
          // setMessage(response);
          // setAlertType('success');
          // setShowLoader(false);
      
          // const token = data['token'];
          // localStorage.setItem('token', token);
          // cookies.set('token', token);
          
          // let decoded: any = jwtDecode(token);
          // const role = decoded['role'];
          // let userId = decoded['identifier'];
      
          // if (role === 'user') {
          //   router.replace(`context/${encodeURIComponent(userId)}/`);
          // }
      //   })
      //   .catch(e => {
      //     console.error("Error during user creation:", e);
      //     setMessage(e.response?.data?.message || 'An error occurred');
      //   });
      axios
        .post('http://localhost:5000/api/auth/user', body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const data = response.data;
          const token = data['token'];
          localStorage.setItem('token', token);
          cookies.set('token', token);
          let decoded: any = jwtDecode(token);
          const role = decoded['role'];
          let userId = decoded['username'];
          if (role == 'user') {
            router.replace(`/${encodeURIComponent(userId)}/`);
            return;
          }
          return;
        })
        .catch((e) => {
          setShowLoader(false)
          setErrorMessage(e.response.data['message']);
        });    
      
    }

    const getData = async () => {
  
      const response = await axios.get(`http://localhost:5000/api/contractor_company/`);
      const respData = response.data;
      
      setContractors(respData)
    };
  
    useEffect(()=>{
      
      getData();
    }, [])

    const [searchText, setSearchText] = useState('');
    const [selectedContractor, setSelectedContractor] = useState<Contractor | string>('');
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    };
    const handleContractorSelect = (contractor: Contractor) => {
      setSelectedContractor(contractor);
      setContractorCompanyId(contractor._id);
      setSearchText('');
    };
  
  
  
    const filteredContractors = contractors
      .sort((a: { _id: string; }, b: { _id: string; }) => {
        // Sort by _id matching first, then by name matching
        const aIdMatch = a._id.toLowerCase().includes(searchText.toLowerCase());
        const bIdMatch = b._id.toLowerCase().includes(searchText.toLowerCase());
  
        if (aIdMatch && !bIdMatch) {
          return -1;
        } else if (!aIdMatch && bIdMatch) {
          return 1;
        } else {
          return 0;
        }
      })
      .filter((contractor:any) =>
        contractor.name.toLowerCase().includes(searchText.toLowerCase())
      );

  return (
    

<div>
      {errorMessage.length > 0 ? 
        <DangerNotification message={errorMessage} />
        : <></>}
      {message.length > 0 ? 
        <SuccessNotification  message={message} />
        : <></>}
        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}
    <form className='my-2 mx-auto text-center shadow-md ' onSubmit={formSubmitHandler}>
      {/* <label htmlFor="employee_company_profile_Input" className='flex flex-col justify-center items-center w-auto sm:pl-3 '>
          
                  <img
                      id='contractor_company_profile'
                      src={'/Emirates ID.jpg'}
                      alt="Emirates ID"
                      width={100}
                      height={100}
                      className="rounded-sm bg-red-300  w-1/4 m-2 sm:m-4 hover:bg-opacity-30 "

                  />
                  <div className='absolute p-12 text-white text-[40px] rounded-full bg-gray-50 bg-opacity-60 hover:bg-slate-600 hover:opacity-60 '>
                  <FaUpload/></div>
                  <input
                      type="file"
                      id="employee_company_profile_Input"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      
                  />
                  {fileData &&
                  <div className='ml-20 flex items-center justify-center gap-x-2 text-[color:var(--mainTitleLightColor)]'>
                    <p>EID Expiry Date:</p>
                  <input  value={fileData && fileData.dates?fileData.dates.expiryDate:''}                     
                  onChange={(e) => {
                      setEmiratesIdExpiry(e.target.value);
                      }} />
                  <p>Birth Date:</p>
                  <input  value={fileData&&fileData.dates?fileData.dates.dateOfBirth:''}
                                      onChange={(e) => {
                                        setBirthDate(e.target.value);
                                        }} 
                  />
                  </div>}
                  </label> */}
      
      <div className='flex items-center justify-center'>
        
            <div className='grid grid-cols-1 sm:grid-cols-2 p-2 '>

              <div className='col-span-1 p-2'>
              <CommonIconInput
                    id="first_name"
                    icon={faUser}
                    required={true} 
                    defaultvalue={fileData && fileData.names?fileData.names.name:first_name}
                    placeholder='First Name'
                    onChange={(e) => {
                    setFirstName(e.target.value);
                    }} 
                    />
                </div>
                <div className='col-span-1 p-2'>
                <CommonIconInput
                    id="last_name"
                    icon={faUser}
                    required={true} 
                    defaultvalue={fileData && fileData.names?fileData.names.name:last_name}
                    placeholder='Last Name'
                    onChange={(e) => {
                    setLastName(e.target.value);
                    }} 
                    />
                </div>
                <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput  
                    id="phone"
                    // title="First name" 
                    defaultvalue={phone_no}
                    icon={faPhone}
                    required={true} 
                    placeholder='Phone Number'
                    onChange={(e) => {
                        setPhoneNo(e.target.value)
                        
                    }}
                />
            </div>
                {/* <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">

                  <select 
                    onChange={(event) => setUserType(event.target.value)}
                    id="User Type" 
                    className="p-5 shadow-md bg-[color:var(--lightBackgroundGreyColor)]  hover:border border-[color:var(--lightBackgroundColor)]  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-[color:var(--lightBackgroundColor)]  dark:border-[color:var(--lightBackgroundColor)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Select a User Type</option>
                            <option value="Employee">Employee/ Labour</option>
                            <option value="Main Contractor">Main Contractor</option>
                            <option value="Sub Contractor">Sub Contractor</option>
                           
                  </select>

                </div> */}


            {/* <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput  
                    id="emirates_id"
                    // title="First name" 
                    icon={faIdCard}
                    required={true} 
                    defaultvalue={fileData && fileData.extractedIdNumbers?fileData.extractedIdNumbers.EmiratesId:''}
                    placeholder='Emirates Id'
                    onChange={(e) =>
                      setEmiratesID(e.target.value)
                    }
                />
            </div> */}
            
          
              <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">

              <div className="relative">
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Select Your Contractor/Organisation"
        className="p-5 shadow-md bg-[color:var(--lightBackgroundGreyColor)] hover:border border-[color:var(--lightBackgroundColor)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-[color:var(--lightBackgroundColor)] dark:border-[color:var(--lightBackgroundColor)] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {searchText && (
        <div className="absolute top-10 left-0 right-0 border rounded-md bg-white shadow-md">
          {filteredContractors.map((contractor: Contractor) => (
            <div
              key={contractor._id}
              className="p-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleContractorSelect(contractor)}
            >
              {contractor.name}
            </div>
          ))}
        </div>
      )}
      {/* {selectedContractor && (
        <p className="mt-2 text-gray-700">
          Selected Contractor: {selectedContractor.name}
        </p>
      )} */}
    </div>

              </div>
              <div className='col-span-6 sm:col-span-3 p-1 sm:p-2 flex justify-between'>
            <div className="col-span-6 sm:col-span-3 p-1 sm:p-2">
                <CommonIconInput   
                    // defaultvalue={last_name+first_name}   
                    id="password1"
                    // title="First name" 
                    icon={faKey}
                    required={true} 
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    // isDisabled={true}
                  
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
            </div>
            <div className="flex items-center col-span-6 sm:col-span-3 p-2">
                  <input type="checkbox" id="accept" name="accept" onChange={(e)=>{
                    console.log(e.target.checked)
                    setIsChecked(e.target.checked)
                    }} className='my-auto mr-2 w-fit' value="accept"/>
                  <p className='font-semibold text-sm text-gray-400 '>I accept the <Link target={"_blank"} className='underline' href={""}>Terms & Conditions</Link></p>
        </div> 
            </div>     
            
        </div>

        <div className='sm:mt-6'>
            <CommonButtonSolidBlue text={'Register'}/>
        </div>


      

    </form>
    
      <div className="flex flex-row items-center justify-center p-2 sm:p-4">
          <p className="text-md font-medium text-gray-400">
              Already have an account?{' '}
              <Link
                className="text-[color:var(--mainTitleColor)] font-semibold"
                href="/context/authentication/login">
                  Login
              </Link>
          </p>
      </div>:<></>
                    
       
</div>

    
  );
};
export default RegisterUser;