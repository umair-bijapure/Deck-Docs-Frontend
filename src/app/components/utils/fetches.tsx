'use client';
import Cookies from "universal-cookie"
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { useState } from "react";

const cookies = new Cookies()
interface Permissions {
  permissions: string[];
}
interface Organisation{
  orgnisation:any;
  data:any;
}
interface CreateUserBody {
  // Define the shape of your CreateUserBody object based on your requirements

  phone_no: string;
  email: string;
  description: string;
  first_name: string;
  last_name: string;
  fathers_name: string;
  mothers_name: string;
  gender: string;
  birth_date: string;
  qualification: string;
  occupation: string;
  contractor_company_id: string;
  position_at_company: string;
  experience: string;
  permanent_address: string;
  permanent_city: string;
  permanent_state: string;
  permanent_country: string;
  current_address: string;
  current_city: string;
  current_state: string;
  current_country: string;
  is_supervisor: string;
  password_hashed: string;
  // Add other fields as necessary
}


interface FetchCreateUserOptions {
  url: string;
  method: string;
  body: CreateUserBody;
  controller?: AbortController | null;
  contentType: string;
}

export async function fetchCreateUser(
  organisationId: string,
  body: CreateUserBody,
  controller: AbortController | null = null
): Promise<Response> {
  const options: FetchCreateUserOptions = {
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/${organisationId}/users`,
    method: 'POST',
    body: body,
    controller: controller,
    contentType: 'application/json'
  };

  return standardFetch(options);
}


export const fetchChildOranisations = async (): Promise<Organisation> => {
  return standardFetch<Organisation>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/organisation/child-organisations`, // Adjust URL endpoint
    contentType: "application/json",
  });
};

export const fetchOrganisationUsers = async (): Promise<Organisation> => {
  return standardFetch<Organisation>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`, // Adjust URL endpoint
    contentType: "application/json",
  });
};


export const getUserPermissions = async (): Promise<Permissions> => {
  return standardFetch<Permissions>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/permissions`,
    contentType: "application/json",
  });
};

export async function fetchUsers(contractorId: string, controller?: AbortController | null) {
  return standardFetch({
    url: `http://localhost:5000/api/user/`,
    controller: controller ?? null,
    contentType: "application/json",
  });
}


export async function fetchFiles(contractorId:any, controller = null) {
  return standardFetch({
    url: `${process.env.NEXT_PUBLIC_API_URL}/organisations/${contractorId}/files`,
    controller: controller,
    contentType: "application/json",
  })
}

export function fetchSiteUsers() {
  return noAuthFetch(`http://localhost:5000/api/user/`)
}

async function noAuthFetch(url:string) {
  return fetch(url, {
    method: "GET",
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(response => {
      return response.data
    })
}
interface Organisation {
  id: string;
  name: string;
  // Add more fields as necessary
}
export async function fetchOrganisations(organisationId: string, controller: AbortController | null = null): Promise<Organisation[]> {
  return standardFetch({
    url: `${process.env.NEXT_PUBLIC_API_URL}/organisations`,
    controller: controller ?? undefined,
    contentType: "application/json",
  });
}
export const fetchContractorData = async (contractorId: string, field: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/organisation/${field}/${contractorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contractor data:", error);
    throw error;
  }
};



interface StandardFetchInput {
  url: string;
  method?: string;
  body?: any;
  contentType: string;
  controller?: AbortController | null;
}

interface StandardFetchResponse {
  status: string;
  data?: any;
  message?: string;
}

export async function standardFetch<T>(input: StandardFetchInput): Promise<T> {
  const data = {
    url: input.url,
    method: input.method ?? "GET",
    body: input.body ?? null,
    contentType: input.contentType,
    controller: input.controller ?? null,
  };

  const headers: any = {
    method: data.method,
    body: data.body,
    headers: {
      "Content-Type": data.contentType,
    },
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.headers.Authorization = `Bearer ${token}`;
  }

  if (data.controller?.signal) {
    headers.signal = data.controller.signal;
  }

  try {
    const response = await fetch(data.url, headers);
    console.warn("Fetch response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.warn("JSON response:", jsonResponse);

    return jsonResponse as T;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw error;
  }
}







// export async function fetchCreateUser(body: any, controller: AbortController | null = null) {
//   const url = 'http://localhost:5000/api/auth/user';
//   const contentType = 'application/json';

//   try {
//     const source = controller ? axios.CancelToken.source() : undefined;

//     const response = await axios.post(url, body, {
//       headers: {
//         'Content-Type': contentType,
//       },
//       cancelToken: source?.token,
//     });

//     // Check if the response indicates success
//     console.log('User created successfully:', response.data);
//     return response.data;
//   } catch (error: any) {
//     // Handle specific cases, e.g., user already exists
//     if (axios.isCancel(error)) {
//       console.log('Request canceled', error.message);
//     } else if (error.response?.status === 409) {
//       console.log('User already exists:', error.message);
//     } else {
//       console.error('Error creating user:', error.message);
//     }

//     // Propagate the error for the calling function to handle
//     throw error;
//   }
// }


export async function fetchCreateProject( body:any, controller = null) {
  console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllll")
  return standardFetch({
    url: `http://localhost:5000/api/project/create-project`,
    method: "POST",
    body: body,
    controller: controller,
    contentType: "application/json",
  })
}

interface DocumentStatus {
  uploading: boolean;
  frontUploaded: boolean;
  backUploaded: boolean;
  // Add other properties as needed based on your use case
}

// Example usage:
const initialDocumentStatus: DocumentStatus = {
  uploading: false,
  frontUploaded: false,
  backUploaded: false,
};

export const handleUpload = async (
  
  selectedFile: File | null | undefined,
  side: string,
  // documents: DocumentType[],
  
  setFileData: React.Dispatch<React.SetStateAction<string>>,
 
  setUploadedFrontImage: React.Dispatch<React.SetStateAction<string>>,
 
) => {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>,side:string) => {
    const selectedFile = e.target?.files?.[0]; // Use optional chaining to handle potential null values
    if (selectedFile && side==='front') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedFrontImage(() => event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    };

  };
  if (!selectedFile) return;

  try {


    const formData = new FormData();
    if (selectedFile) {
      formData.append(`${side}File`, selectedFile);
      formData.append(`${side}FileType`, selectedFile.type);
      formData.append('DocumentName', 'EmiratesId');
    }

    const syntheticEvent = {
      target: {
        files: [selectedFile],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleImageUpload(syntheticEvent, side);

    const res = await axios.post('http://127.0.0.1:5000/api/fileUploader/fileUploader', formData);

    if (res.status === 200) {
      const data = res.data;
      setFileData(data);

    }
  } catch (error) {
    console.error('Error with sending the POST request:', error);
  }
};







// interface CommonGridRowsProps {
//   rows: number;
//   columns: number;
//   hr?:string;
//   items:Array<{
//     color: string;
//     size: string;
//     content: ReactNode;
//     image:string;
//     width:number;
//     height:number;
//     heading?:string;
//     text:string;
//     first_name?:string;
//     last_name?:string;
//     Qualification?:string,
//     Experiance?:string,
//     Designation?:string,
//     Ratings?:string,
//     phone_no?:string,
//     email?:string,
//     Projects?:string,
//     UserType?:string,
//     date?:string
//     icon?:string
//     is_employee_user:Boolean,
//     is_supervisor:Boolean,
//     is_sub_contractor:Boolean,
//     is_main_contractor:Boolean,
//     is_client:Boolean,
//     createdAt?:Date}
//     >;
    
  
// }

// export const CommonGridRows: React.FC<CommonGridRowsProps> = ({ rows, columns,items,hr}) => {
//   const gridTemplateColumns = `repeat(${columns}, 1fr)`;
//   const employeeList = [
//     {
//       id: 1,
//       name: 'John Doe',
//       image: '/default-user-profile.png',
//       isPresent: true,
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       image: '/default-user-profile.png',
//       isPresent: false,
//     },
//     // Add more employees as needed
//   ];
//   const [showProfile, setShowProfile] = useState(false);

//   // Function to toggle the visibility of the profile component
//   const toggleProfile = () => {
//     setShowProfile(!showProfile);
//   };

//   return ( 
//     <>
//     {items.map((item, index) => (
//   <>
//    {showProfile && (
//     <div>
//       <CommonProfile 
//         id={''} 
//         profileImage={'/default-user-profile.png'} 
//         first_name={item.first_name||''} 
//         last_name={item.last_name} 
//         createdAt={item.createdAt||new Date(2023, 0, 1)} 
//         email={item.email||''}
//         is_main_contractor={item.is_main_contractor} 
//         is_sub_contractor={item.is_sub_contractor}
//         is_client={item.is_client} 
//         is_employee_user={item.is_sub_contractor}
//         location={''} 
//         team={[]}/>
//     </div>)}

//    {!showProfile && (
//     <div className=''>

//     {!hr?
//     <div>
      
//       <div className='hidden sm:grid '>
     
        
//       <div onClick={toggleProfile}>
//       <CommonGridItemRows gridTemplateColumns={gridTemplateColumns} gridTemplateRows={`repeat(${rows}, auto)`}
          
//           id={'1'}
//           image={item.image}
//           first_name= {item.first_name+' '+item.last_name}
//           Qualification={item.Qualification}
//           Designation={item.Designation}
//           Experiance={item.Experiance}
//           Ratings={item.Ratings}
//           phone_no={item.phone_no}
//           UserType={item.UserType}
//           date={item.date}
//           hr={hr}
//         />
//        </div>
      
     
//       </div>
       
//       <div className='sm:hidden grid grid-cols-2 content-start gap-y-1 gap-x-1 vvsm:gap-y-2 vvsm:gap-x-2 md:gap-x-4 md:gap-y-4 overflow-y-auto items-stretch px-1 py-2 w-full'>
      
//       {items.map((item, index) => (
//           <div onClick={toggleProfile}>
//         <CommonGridItemCard gridTemplateColumns={gridTemplateColumns} gridTemplateRows={`repeat(${rows}, auto)`}
//           id={'1'}
//           image={item.image}
//           first_name= {item.first_name}
//           Qualification={item.Qualification||item.phone_no}
//           Designation={item.Designation||item.Projects}
//           Experiance={item.Experiance}
//           Ratings={item.Ratings}
//           UserType={item.UserType}
//           date={item.date}
//           hr={hr}
//         />
//         </div>
      
//       ))} 

//       </div>
//       </div>       
//     :
            
//         <EmployeeAttendance
//           companyName="Your Company Name"
//           totalPresent={80}
//           employees={employeeList}
//           hr={hr}
//           />
          
//       }
//     </div>

//     )}
    
//   </>
//    ))} 
//    </>
//   );
// };