'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { CommonGridItem, CommonGridItemCard, CommonGridItemEmployee, CommonGridItemRows, EmployeeAttendance } from './gridItems';
import { FaCog, FaFile, FaUsers,FaTrash,FaStarAndCrescent, FaStar, FaShare, FaUserPlus, FaShareAlt, FaUserFriends, FaUser, FaUserEdit, FaUserSecret, FaUserTie, FaUserTimes } from 'react-icons/fa';
import { CommonIcon } from './icons';
import Link from 'next/link';
import CommonPopup from './popUp';
import { CommonHeader,ContractorProfile } from './bannersAndheadings';
import { AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai';

import { Project } from './projectGrid';
import axios from 'axios';
import Select from 'react-select';
import { Popover} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import Rating from '../rating';
import { CommonAddButton } from './buttons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { CommonProfile } from '../profiles/employeeProfile';
import CreateReport from '@/app/context/[contractorId]/dashboard/TabMenu/projects/ReportFormate/page';
import { createOrUpdateNotification, fetchOrganisationUsers } from '../utils/fetches';

interface CommonGridProps {
  rows: number;
  columns: number;
  items: Array<{
    color: string;
    size: string;
    content: ReactNode;
    // reference: string;
    image:string;
    width:number;
    height:number;
    heading:string;
    text:string;
    textcolor:string;
    
  }>;
}

export const CommonGrid: React.FC<CommonGridProps> = ({ rows, columns, items}) => {
  const gridTemplateColumns = `repeat(${columns}, 1fr)`;

  return (
    <>
    <div className='hidden bsm:flex '>
    <div className="flex bsm:grid vsm:gap-x-2 bsm:gap-x-6 vsm:gap-y-6 sm:gap-x-6 sm:gap-y-6 md:gap-x-6 md:gap-y-6 overflow-y-auto items-stretch px-4 py-2 w-full mt-[30px]" style={{ gridTemplateColumns, gridTemplateRows: `repeat(${rows}, auto)` }}>
      {items.map((item, index) => (
        <CommonGridItem
          key={index}
          color={item.color}
          size={item.size}
          content={item.content}
          // reference={item.reference}
          image={item.image}
          width={item.width}
          height={item.height}
          // href={item.reference}
          text={item.text}
          textcolor={item.textcolor}
          heading={item.heading}
          index={''}
          onItemClick={''} 
  />
      ))}
    </div>
    </div>
    <div className='bsm:hidden flex h-full w-full justify-center'>
      
    <div className="grid grid-cols-1 vsm:gap-x-2 bsm:gap-x-6 vsm:gap-y-6 sm:gap-x-6 sm:gap-y-6 md:gap-x-6 md:gap-y-6 overflow-y-auto items-stretch px-4 py-2 w-full mt-[30px]">
      {items.map((item, index) => (
        <CommonGridItem
          key={index}
          color={item.color}
          size={item.size}
          content={item.content}
          // reference={item.reference}
          image={item.image}
          width={item.width}
          height={item.height}
          // href={item.reference}
          text={item.text}
          textcolor={item.textcolor}
          heading={item.heading}
          index={''}
          onItemClick={''}
 />
      ))}
    </div>
    </div>
    </>
  );
};

interface Document {
  document_name: string;
  user_id:string;
  front_image: string;
  back_image: string;
  expiry: string | null;
  document_id: string;
  attributes: {
    dateOfBirth?: string;
    [key: string]: any; // other attributes
  };
}


interface ProfileCompletion {
  phoneNo: string;
  completionPercentage: number;
  missingDocuments: string[];
  incompleteDocuments: { documentName: string; missingFields: string[] }[];
  documentExpiryInfo: { documentName: string; timeLeft: string }[];
  documents: Document[];
  dateOfBirth: string | null;
  documentDependencies: number;
}


interface CommonGridRowsProps {
  rows: number;
  columns: number;
  profileType?:string;
  contractorId:string;
  onProfileActive: ()  => void;
  onDeleteClick?: () => void;
  onProfileUpdate?:()=>void;
 
  items:Array<{
   
    color: string;
    size: string;
    content: ReactNode;
    image:string;
    width:number;
    height:number;
    heading?:string;
    text:string;
    _id:string,//compulsory
    profile_picture:string,//compulsory
    first_name:string;//compulsory
    createdAt:Date;//compulsory
    updatedAt:Date;
    fathers_name?:string;
    mothers_name?:string;
    occupation?:string;
    last_name?:string;
    name?:string;
    phone_no:string;
    email:string;//compulsory
    current_address?:string;
    parmanent_address?:string;
     qr_code?:string;
    position_at_company?:string;
    
    rating?:number[];
    
  
    deadLine?:Date;
    description?:string;
   
    is_main_contractor:boolean;//compulsory
    is_sub_contractor?:boolean;
    is_client:boolean;//compulsory
    location:string;//compulsory
    status1?:string;
    status2?:string;
    is_hsc_officer:boolean;
    permanent_city:string
    permanent_address:string;
    permanent_state:string;
    permanent_country:string;
    current_city:string;
    current_state:string;
    current_country:string;
    email_verified:boolean;
    team:string[];
    skill_set?:string[];
    profileType?:string;
    qualification?:string;
    experiance?:string;
    designation?:string;
    gender?:string;
    parmanent_country?:string;
    icon?:string;
    attendance: {
      [key: string]: {
        absences: number[];
        leaves: number[];
      };
    };
    allowed_users:[]
    projects:[]
    company_name?:string;
    contractor_name?:string;
    is_supervisor?:boolean;
   
  }>;
    
}
interface User {
  _id: string;
  first_name: string;
  name:string;
   allowedUsers: string[];
   company_name:string;
  // Add other properties as needed
}
export const CommonGridRows: React.FC<CommonGridRowsProps> = ({ rows, columns,items,profileType,contractorId, onProfileActive,onDeleteClick,onProfileUpdate}) => {
  const gridTemplateColumns = `repeat(${columns}, 1fr)`;
  const [selectedProfileData, setSelectedProfileData] = useState<typeof items[number] | null>(null);
  const [profile_picture, setProfilePicture] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [allusers, setUsers] = useState<User[]>([]); // State to store users
  const [contractorCompanies, setContractorCompanies] = useState([]);
  const [selectedItem, setSelectedItem] = useState<CommonGridRowsProps['items'][0] | null>(null);

  const handleItemClick = (item: CommonGridRowsProps['items'][0]) => {
    setSelectedItem(item);
  };

  const fetchUsers = async () => {
    try {
      const users = await fetchOrganisationUsers();
      console.log("Sub Contractors:", users);
      setUsers(users.data);
      return users;
    } catch (error) {
      console.error("Error fetching sub contractors:", error);
      throw error;
    }
  };


  const fetchContractorCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/organisation`);
      const contractorCompanies = response.data;
      setContractorCompanies(contractorCompanies); // Set the fetched contractor companies in state
    } catch (error) {
      console.error('Error fetching contractor companies:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
    fetchContractorCompanies(); // Fetch contractor companies when the component mounts
  }, []);

  // const handleTogglePopup = (Users: strings[], index: number) => {
  //   setPopupVisible(!isPopupVisible);
  //   setPopupFolder(folder); // Set the entire folder object to state
  //   setPopupFolderIndex(index);
  // };
  const toggleProfile = (index: any) => {
    const selectedItem = items[index];
    setSelectedProfileData(selectedItem);
    setShowProfile(!showProfile);
    onProfileActive()
  };
  

  const [selectedEmployees, setSelectedEmployees] = useState<Record<string, boolean>>({});
  const handleEmployeeSelection = (phone_no: string) => {
    setSelectedEmployees(prevSelected => {
      const updatedSelected = {
        ...prevSelected,
        [phone_no]: !prevSelected[phone_no]
      };
      
      return updatedSelected;
    });
  };
  const selectedEmployeeCount = Object.values(selectedEmployees).filter(Boolean).length;

  const handleGiveAccessToProfiles = async (profileIds: string[]) => {
    try {
      const selectedUserIds = Object.keys(selectedEmployees).filter(userId => selectedEmployees[userId]);
      await Promise.all(profileIds.map(profileId => 
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile/${profileId}/give-access`, { userIds: selectedUserIds })
      ));
  
      // Handle success and update UI accordingly
    } catch (error) {
      console.error('Error giving access to profiles:', error);
    }
  };
  
  // Function to revoke access for selected users from multiple profiles
  const handleRevokeAccessFromProfiles = async (profileIds: string[]) => {
    try {
      const selectedUserIds = Object.keys(selectedEmployees).filter(userId => selectedEmployees[userId]);
      await Promise.all(profileIds.map(profileId => 
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/profile/${profileId}/revoke-access`, { userIds: selectedUserIds })
      ));
  
      // Handle success and update UI accordingly
    } catch (error) {
      console.error('Error revoking access from profiles:', error);
    }
  };
  const handleTogglePopup = (selectedEmployees: Record<string, boolean>) => {
    setPopupVisible(!isPopupVisible);

    setSelectedEmployees(selectedEmployees); // Pass the selected employees to state
  };
  const [isPopupVisible2, setPopupVisible2] = useState(false);
console.log(selectedEmployees,items,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
const handleTogglePopup2 = () => {
  setPopupVisible2(!isPopupVisible2);


};

const handleShareProfiles = async (selectedUserIds: string[]) => {
  try {
    // Call the backend API to share profiles with selected users
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/share-profiles`, {
      selectedUserIds,
      selectedEmployees, // Assuming selectedEmployees contains the list of employee phone numbers to share profiles
      contractorId
    });

    // Optionally, you can update the UI or perform other actions upon successful sharing
    console.log('Profiles shared successfully');
    fetchUsers(); // Fetch users when the component mounts
    fetchContractorCompanies();
    
  } catch (error) {
    console.error('Error sharing profiles:', error);
    // Handle error scenarios
  }
};

const handleRemoveEmployee = async (userId:string,phone_no: string) => {
  try {
    // Call the backend API to revoke access for the specified employee
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/revoke-access`,{
      userId,
      phone_no
    });

    // Optionally, you can update the UI or perform other actions upon successful removal
    console.log(`Access revoked for employee with phone numberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ${phone_no}`);
    fetchUsers(); // Fetch users when the component mounts
    fetchContractorCompanies();
    
  } catch (error) {
    console.error('Error revoking access:', error);
    // Handle error scenarios
  }
};

const users = [...allusers, ...contractorCompanies];
  // State to store items
  const [profileCompletion, setProfileCompletion] = useState<ProfileCompletion | null>(null);  

  const Documents = ["EmiratesId", "Passport", "Visa", "License"];
  const totalDependencies = 15;
  // Function to fetch document data and calculate profile completion
  const fetchAndCalculateProfileCompletion = async (phoneNo: string): Promise<ProfileCompletion | null> => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/documents/${phoneNo}`);
        const { data } = response;

        if (data && data.documents) {
            const fetchedDocuments: Document[] = data.documents;
            const currentDate = new Date();

            const documentExpiryInfo = fetchedDocuments.map((doc: Document) => {
                if (doc.expiry) {
                    const expiryDate = new Date(doc.expiry);
                    const timeDiff = expiryDate.getTime() - currentDate.getTime();
                    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

                    // Create a notification if the document expiry is nearing
                    if (daysLeft <= 30) {
                        const notificationData = {
                            this_notification_user: doc.user_id, // replace with actual user ID
                            title: 'Document Expiry Reminder',
                            type: 8, // replace with appropriate type
                            text: `${doc.document_name} is about to expire in ${daysLeft} days.`,
                            document_name: doc.document_name,
                            
                           
                            senderId: 'Deck Docs', // replace with actual sender ID
                            userIds: ['user123'] // replace with actual user IDs
                        };
                        createOrUpdateNotification(notificationData);
                    }

                    return { documentName: doc.document_name, timeLeft: `${daysLeft} days` };
                }
                return { documentName: doc.document_name, timeLeft: "No expiry date" };
            });

            // Calculate profile completion metrics
            const requiredDocuments = Documents;
            const totalDocuments = requiredDocuments.length;
            const validDocuments = fetchedDocuments.filter((doc: Document) => {
                if (doc.expiry) {
                    const expiryDate = new Date(doc.expiry);
                    return expiryDate > currentDate;
                }
                return false;
            });

            const validDocumentsCount = validDocuments.length;
            const completionPercentage = (validDocumentsCount / totalDocuments) * 100;
            const missingDocuments = requiredDocuments.filter((docName) =>
                !fetchedDocuments.some((doc) => doc.document_name === docName)
            );

            const incompleteDocuments = fetchedDocuments.map(doc => {
                const missingFields: string[] = [];
                if (!doc.front_image) missingFields.push('front_image');
                if (!doc.back_image) missingFields.push('back_image');
                if (!doc.document_id) missingFields.push('document_id');
                return { documentName: doc.document_name, missingFields };
            }).filter(doc => doc.missingFields.length > 0);

            let dateOfBirth = null;
            for (const doc of fetchedDocuments) {
                if (doc.attributes && doc.attributes.dateOfBirth) {
                    dateOfBirth = doc.attributes.dateOfBirth;
                    break;
                }
            }

            if (!dateOfBirth) {
                missingDocuments.push("dateOfBirth");
            }

            const documentDependencies = Documents.reduce((count, docName) => {
                const document = fetchedDocuments.find(doc => doc.document_name === docName);
                if (document) {
                    count += 1;
                    if (document.front_image) count += 1;
                    if (document.expiry) count += 1;
                }
                return count;
            }, 0);

            return {
                phoneNo,
                completionPercentage,
                missingDocuments,
                incompleteDocuments,
                documentExpiryInfo,
                documents: fetchedDocuments,
                dateOfBirth,
                documentDependencies,
            };
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return {
                phoneNo,
                completionPercentage: 0,
                missingDocuments: Documents,
                incompleteDocuments: [],
                documentExpiryInfo: [],
                documents: [],
                dateOfBirth: null,
                documentDependencies: 0,
            };
        } else {
            console.error('Error fetching document data:', error);
        }
    }

    return null;
};
  
  const [profileCompletions, setProfileCompletions] = useState<(ProfileCompletion | null)[]>([]);
// Calculate profile completion percentage

  useEffect(() => {
    const fetchAllProfileCompletions = async () => {
      const completionPromises = items.map(async (item) => {
        return fetchAndCalculateProfileCompletion(item.phone_no);
      });
  
      const completionList = await Promise.all(completionPromises);
      setProfileCompletions(completionList);
    };
  
    fetchAllProfileCompletions();
  }, [items]);

  const getBorderColor = (percentage: number): string => {
    if (percentage >= 75) return 'green';
    if (percentage >= 50) return 'orange';
    return 'red';
  };
  const calculateCompletionPercentage = (profile: ProfileCompletion | null | undefined, item: any): number => {
    if (!profile) return 0; // Handle case where profile is null or undefined

    const dependencies = {
      experience: item.experience ? 1 : 0,
      current_address: item.current_address ? 1 : 0,
      dateOfBirth: profile.dateOfBirth ? 1 : 0,
      gender: item.gender ? 1 : 0,
    };

    const completedCount = Object.values(dependencies).reduce((sum, value) => sum + value, 0) + profile.documentDependencies;
    return (completedCount / totalDependencies) * 100;
  };
  

  return ( 
  <>
  
      {showProfile &&  selectedProfileData && (
        <div>

        {profileType=="employee"?
          <CommonProfile
              id={selectedProfileData._id}
              profile_picture={selectedProfileData.profile_picture}
              first_name={selectedProfileData.first_name}
              last_name={selectedProfileData.last_name}
              fathers_name={selectedProfileData.fathers_name}
              ratings={selectedProfileData.rating}
              phone_no={selectedProfileData.phone_no}
              parmanent_country={selectedProfileData.parmanent_country}
              email={selectedProfileData.email}

              is_supervisor={selectedProfileData.is_supervisor}

              is_client={selectedProfileData.is_client}
              createdAt={selectedProfileData.createdAt}
              gender={selectedProfileData.gender}
              current_address={selectedProfileData.current_address}
              parmanent_address={selectedProfileData.parmanent_address}
              team={selectedProfileData.team}
              qualification={selectedProfileData.qualification}
              experiance={selectedProfileData.experiance}
              onProfileUpdate={onProfileUpdate}
              position_at_company={selectedProfileData.position_at_company}
              attendance={selectedProfileData.attendance}
              current_projects={selectedProfileData.projects}
              qr_code={selectedProfileData.qr_code}
              onClick={() => setShowProfile(false)} mothers_name={selectedProfileData.mothers_name} occupation={selectedProfileData.occupation} 
              is_hsc_officer={selectedProfileData.is_hsc_officer} 
              permanent_city={selectedProfileData.permanent_city} 
              permanent_address={selectedProfileData.permanent_address} 
              permanent_state={selectedProfileData.permanent_state} 
              permanent_country={selectedProfileData.permanent_country} 
              current_city={selectedProfileData.current_city} 
              current_state={selectedProfileData.current_state} 
              current_country={selectedProfileData.current_country} 
              email_verified={selectedProfileData.email_verified}
              skills={selectedProfileData.skill_set}          />
          :profileType=="contractor"?
          <ContractorProfile
          // id={selectedProfileData.id}
          profile_picture={selectedProfileData.profile_picture}
          company_name={selectedProfileData.company_name }
          contractor_name={selectedProfileData.contractor_name}
          phone_no={selectedProfileData.phone_no}
          country={selectedProfileData.parmanent_country}
          email={selectedProfileData.email}
          createdAt={selectedProfileData.createdAt}
          
          address={selectedProfileData.current_address}
         
          team={selectedProfileData.team}

          projects={selectedProfileData.projects}
              
        />
          :
          <div>CLient profile here</div>
            }
        </div>
      )}

   {!showProfile && (
    <div className=''>


    <div>
      
        <div className="hidden sm:grid">
        {selectedEmployeeCount > 0 && (
          <div className='flex items-center rounded-xl justify-start border-2 border-[color:var(--lightBackgroundGreyColor)]'>

              <div className='p-2' onClick={() => handleTogglePopup(selectedEmployees)}>
                <CommonAddButton
                  icon={faShare}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title={`Share ${selectedEmployeeCount}`}
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />
            
            </div>
      
        </div>  )}
        {items.map((item, index) => (
        <div className='grid grid-cols-12 items-center justify-between' key={index}>


          <div className='flex items-center justify-center hover:scale-110 relative col-span-1'>
            <input
              type="checkbox"
              checked={selectedEmployees[item.phone_no || ''] || false}
              onChange={() => handleEmployeeSelection(item.phone_no || '')}
              className="border-2 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <div className='flex items-center justify-center relative col-span-1'>
          <Popover
              content={
                <div className='flex items-center justify-center relative col-span-1'>
                  <div>
                    {profileCompletions.every(profile => profile === null) ? (
                  <p>No documents uploaded</p>
                      ) : (
                        <div>
                            <div >
                                {profileCompletions.map((profile) => (
                                                    profile?.phoneNo === item.phone_no && (
                                                      <div className='flex items-center justify-between' key={profile.phoneNo}>
                                                        {profile.dateOfBirth ?'' : <h1 className="flex px-6 py-3 text-left text-xs font-medium   bg-gray-50 uppercase tracking-wider">Date of Birth: <p className='text-red-400'>Missing Date of Birth</p></h1>   }               

                                                        <h1 className="px-6 py-3 text-left text-xs font-medium bg-gray-50 uppercase tracking-wider">Profile Completion: {calculateCompletionPercentage(profile, item).toFixed(2)}%</h1>
                                                      </div>

                                                    
                                        )
                                      ))} 

                                    </div>
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">

                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Document
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Avalability
                                  </th>
                                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Document ID
                                  </th> */}
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Front Image
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Back Image
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expiry Date
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expirs in
                                  </th>
                                </tr>

                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">

                                {Documents.map((docName) => (
                                  <tr key={docName}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{docName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documents.some((doc) => doc.document_name === docName) ? <span className="text-green-500 text-xl font-extrabold">✓</span> : <span className="text-red-500">❌</span>}
                                            
                                          </div>

                                        
                                        )
                                      ))}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documents
                                              .filter((doc) => doc.document_name === docName)
                                              .map((doc, index) => (
                                                <div key={index}>{doc.document_id}</div>
                                              ))}
                                          </div>
                                        )
                                      ))}
                                    </td> */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documents
                                              .filter((doc) => doc.document_name === docName)
                                              .map((doc, index) => (
                                                <div key={index}>
                                                {doc.front_image ? <span className="text-green-500 text-xl font-extrabold">✓</span> : <span className="text-red-500">❌</span>}
                                              </div>

                                              ))}
                                          </div>
                                        )
                                      ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documents
                                              .filter((doc) => doc.document_name === docName)
                                              .map((doc, index) => (
                                                <div key={index}>
                                                  {doc.back_image ? <span className="text-green-500 text-xl font-extrabold">✓</span> : <span className="text-amber-500">?</span>}
                                                </div>

                                              ))}
                                          </div>
                                        )
                                      ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documents
                                              .filter((doc) => doc.document_name === docName)
                                              .map((doc, index) => (
                                                <div key={index}>
                                                  {doc.expiry ? new Date(doc.expiry).toLocaleDateString() : "No expiry date"}
                                                </div>
                                              ))}
                                              
                                          </div>
                                        )
                                      ))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {profileCompletions.map((profile) => (
                                        profile?.phoneNo === item.phone_no && (
                                          <div key={profile.phoneNo}>
                                            {profile.documentExpiryInfo
                                              .filter((info) => info.documentName === docName)
                                              .map((info, index) => (
                                                <div key={index}>{info.timeLeft}</div>
                                              ))}
                                          </div>
                                        )
                                      ))}
                                    </td>

                                  </tr>
                                ))}
                              </tbody>
                            </table>
                        </div>
                )}
                  </div>
                </div>}
                trigger={'click'}>
              <div className="col-span-1 relative m-2">
                <div className="relative hover:scale-110 duration-300">
                  {item.profile_picture !== ''? (
                    profileType=="employee" ?
                    <img 
                      className='mx-auto aspect-square rounded-full border-2 p-1' 
                      style={{ borderColor: getBorderColor(calculateCompletionPercentage(profileCompletions.find(profile => profile?.phoneNo === item.phone_no), item)) }} 
                      width={60}  
                      height={60} 
                      src={item.profile_picture} 
                      alt={'Pic'} 
                    />:
                    <img 
                    className='mx-auto aspect-square rounded-full border-2 p-1' 
                    width={60}  
                    height={60} 
                    src={item.profile_picture} 
                    alt={'Pic'} 
                  />
                    

                  ) : (
                    profileType=="employee" ?
                    <img 
                      className='mx-auto aspect-square rounded-full border-2 p-1' 
                      style={{ borderColor: getBorderColor(calculateCompletionPercentage(profileCompletions.find(profile => profile?.phoneNo === item.phone_no), item)) }} 
                      src={`${profileType === 'employee' ? '/default-user-profile.png' : '/engineer 1.png'}`} 
                      alt={'Default Pic'} 
                    /> :
                    <img 
                    className='mx-auto aspect-square rounded-full border-2 p-1' 
                    src={`${profileType === 'employee' ? '/default-user-profile.png' : '/engineer 1.png'}`} 
                    alt={'Default Pic'} 
                  /> 
                    
                  )}
                  {profileType=="employee" &&
                  <div 
                    className="absolute bg-white rounded-lg p-1 bg-opacity-90 -bottom-1.5 left-1/2 transform -translate-x-1/2 text-[8px] flex items-center justify-center font-bold"
                  >
                    {
                      profileCompletions.map((profile) => {
                        if (profile?.phoneNo === item.phone_no) {
                          return (
                            <div key={profile.phoneNo}>
                              <p style={{ color: getBorderColor(calculateCompletionPercentage(profileCompletions.find(profile => profile?.phoneNo === item.phone_no),item)) }}>
                                {profileCompletions? calculateCompletionPercentage(profileCompletions.find(profile => profile?.phoneNo === item.phone_no),item).toFixed(2) : '0%'}%
                              </p>
                            </div>
                          );
                        }
                        return null; // or handle the case when profile is not found
                      })
                    }
                    {!profileCompletions.some(profile => profile?.phoneNo === item.phone_no) && (
                      <div style={{ color: getBorderColor(0) }}>
                        0%
                      </div>
                    )}
                  </div>}
                </div>
              </div>

          </Popover>
          </div>


          <div className='col-span-9' onClick={() => {toggleProfile(index);}}>
            <CommonGridItemRows
              gridTemplateColumns={gridTemplateColumns}
              gridTemplateRows={`repeat(${rows}, auto)`}
              profileType={profileType}
              id={'1'}
              image={item.image}
              first_name={item.first_name || item.name||item.company_name}
              last_name={item.last_name}
              qualification={item.qualification}
              position={item.position_at_company}
              experience={item.experiance}
              ratings={item.rating}
              phone_no={item.phone_no}
              profile_picture={item.profile_picture}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
            />
          </div>

          <div className="col-span-1 hover:scale-110 bg-[color:var(--mainTitleLightestColor)] p-2  hover:bg-[color:var(--lightBackgroundColor)] cursor-pointer rounded-2xl flex justify-center items-center gap-x-2 text-red-500 font-bold m-2">
            <Popover
              content={
                <div>
                  <div className='bg-blue-100 cursor-pointer rounded-xl flex justify-center items-center gap-x-2 p-2 text-[color:var(--mainTitleLightColor)] m-4' onClick={() => { handleTogglePopup2(); handleItemClick(item); }}>
                    <h1 className="text-lg">
                      <FaUserTimes />
                    </h1>
                    <h1 className="text-sm">Revoke Access</h1>
                  </div>
                  <div className="bg-red-100 rounded-xl cursor-pointer flex justify-center items-center gap-x-2 p-2 text-red-500 font-bold m-4" onClick={onDeleteClick}>
                    <h1 className="text-lg">
                      <AiOutlineDelete />
                    </h1>
                    <h1 className="text-sm">Delete</h1>
                  </div>
                </div>
              }
              trigger="hover"
            >
              
              
              <FaUserTimes/>
            </Popover>
          </div>
        </div>
      ))}
                  {isPopupVisible2 && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 ">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                  <div className="flex justify-between items-center mb-4">
                                    <div className='flex text-lg font-bold items-center items-center gap-x-4'>
                                      <h4 className='text-[color:var(--primaryColor)]'><FaUser/></h4>
                                      <h4 className='  ' >{selectedItem?.first_name}</h4>                                   
                                    </div>
                                    <div className='text-3xl p-2 m-2 '>
                                    <button  onClick={() => handleTogglePopup2()}>&times;</button>
                                    </div>
                                  </div>
                                  <h3>Allowed Users</h3>
                                  {selectedItem?.allowed_users?.map((userId) => {
                                              // Find the user object in the users array based on the userId
                                      const user = users.find((user) => user._id === userId);
                                      if (user) {
                                          return (
                                          <div key={userId} className="flex items-center justify-between bg-gray-100 p-2 rounded-xl mb-2 cursor-pointer" onClick={() =>{handleRemoveEmployee(selectedItem.phone_no ,userId),handleTogglePopup2()}}>
                                          <div className="mr-2">{`${user.first_name} (${userId})`}</div>
                                              <button className="text-red-500 bg-red-100 hover:bg-[color:var(--lightBackgroundColor)] rounded-xl px-4">Revoke Access</button>
                                          </div>
                                          );
                                      } else {
                                      return null; // User not found in users array
                                      }
                                      })}

                                </div>
                              </div>
                            )}
                {isPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 ">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className='flex items-start justify-between mb-6 '>
                      <h1 className='flex items-center gap-x-4 text-16 font-bold'><FaUserFriends/>User Sharing</h1>
                          <button className='text-3xl' onClick={() => setPopupVisible(false)}>&times;</button>
                        </div>
                      <h3>Selected Employees</h3>
                      {Object.entries(selectedEmployees).map(([phone_no, isSelected]) => (
                        isSelected && (
                          <div key={phone_no} className="flex items-center justify-between bg-gray-100 p-2 rounded-xl mb-2 cursor-pointer">
                            <div className="mr-2">{phone_no}</div>
                            
                          
                          </div>
                        )
                      ))}

                      {/* Add React Select component to select users to share profiles */}
                      <Select
                        options={users.map(user => ({ value: user._id, label: user.first_name || user.name||user.company_name }))} // Assuming phone_no is used as a unique identifier for users
                        isMulti
                        onChange={(selectedOptions) => {
                          const selectedUserIds = selectedOptions.map(option => option.value);
                          handleShareProfiles(selectedUserIds); // Call function to share profiles with selected users
                        }}
                        placeholder="Select Users"
                      />
                    </div>
                  </div>
                )}



          
        </div>
  
      <div className='sm:hidden grid grid-cols-2 content-start gap-y-1 gap-x-1 vvsm:gap-y-2 vvsm:gap-x-2 md:gap-x-4 md:gap-y-4 overflow-y-auto items-stretch px-1 py-2 w-full'>
      
      {items.map((item, index) => (
  <div key={index} onClick={() => toggleProfile(index)}>
    <CommonGridItemCard
      gridTemplateColumns={gridTemplateColumns}
      gridTemplateRows={`repeat(${rows}, auto)`}
      id={'1'}
      image={item.image}
      first_name={item.first_name}
      last_name={item.last_name}
      qualification={item.qualification || item.phone_no}
      position={item.position_at_company}
      experience={item.experiance}
      ratings={item.rating}
      createdAt={item.createdAt}
      profile_picture={profile_picture}
    />
  </div>
))}


      </div>
      </div>       
    
            
        {/* <EmployeeAttendance
          companyName="Your Company Name"
          totalPresent={80}
          employees={employeeList}
          hr={hr}
          /> */}
          
    
    </div>

    )}
  </>
  );
};

interface TableEntry {
  No: number;
  TradeInDirect: string;
  ATS: string;
  SC: string;
  SCDetails: string;
  // Add more fields as needed
}
interface Report {
  _id: string;
  date: Date;
  type: string; // Daily, monthly, etc.
  project_id: string;
  organisation_id: string;
  heading: string;
  submitted_by: string; // Report can be submitted by anyone in a team
  day:string;
  weather:string;
  temperature:string;

  progressDescription: string;
  tables: {
    tableName: string; // Store the name or identifier of the table
    entries: TableEntry[]; // Store the entries for the table
  }[];
  other_images: string[];
  remark: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommonGridRowsReportProps {
  rows: number;
  columns: number;
  contractorId: string;
  reports: Report[];
}
export const CommonGridRowsReport: React.FC<CommonGridRowsReportProps> = ({ rows, columns,reports,contractorId}) => {
  const gridTemplateColumns = `repeat(${columns}, 1fr)`; 
  const [selectedProfileData, setSelectedProfileData] = useState<typeof reports[number] | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Record<string, boolean>>({});
  const toggleProfile = (index: any) => {
    const selectedItem = reports[index];
    setSelectedProfileData(selectedItem);
    setShowProfile(!showProfile);
  };

  const handleEmployeeSelection = (phone_no: string) => {
    setSelectedEmployees(prevSelected => {
      const updatedSelected = {
        ...prevSelected,
        [phone_no]: !prevSelected[phone_no]
      };
      
      return updatedSelected;
    });
  };

  const handleGiveAccess = () => {
    // Implement logic to give access to selected employees
    console.log('Selected Employees:', selectedEmployees);
  };
  const selectedEmployeeCount = Object.values(selectedEmployees).filter(Boolean).length;

  return ( 
  <>
      {showProfile &&  selectedProfileData && (
        <div>

        <CreateReport 
          project_id={selectedProfileData.project_id} 
          report_created_by={selectedProfileData.submitted_by} 
          report_id={selectedProfileData._id}
          day={selectedProfileData.day}
          weather={selectedProfileData.weather}
          temperature={selectedProfileData.temperature}
           />
        </div>
      )}

   {!showProfile && (
    <div className=''>
    <div>
      
      <div className="hidden sm:grid">
      {selectedEmployeeCount > 0 && (
        <div className='flex rounded-xl justify-end mb-2 p-2 bg-[color:var(--lightBackgroundColor)]'>
      
        <button  className='flex items-center gap-x-1 'onClick={handleGiveAccess}>Share <FaShare/></button>
    
      </div>  )}
      {reports?.map((item, index) => (
  <div key={item._id || index} className='relative'>
    <div className='flex justify-start absolute'>
      <input
        type="checkbox"
        checked={selectedEmployees[item._id || ''] || false}
        onChange={() => handleEmployeeSelection(item._id || '')}
      />
    </div>
    <div onClick={() => toggleProfile(index)}>
      <div className="grid grid-cols-4 items-center justify-between bg-[color:var(--mainTitleLightestColor)] hover:bg-[color:var(--lightBackgroundColor)] rounded-2xl mb-1">
        <div className='p-4'>
          {item.heading}
        </div>

        <div className='p-4'>
          {item.submitted_by}
        </div>
        <div className='p-4'>
          {new Date(item.createdAt).toLocaleString()} {/* Convert to Date if needed */}
        </div>
        <div className="bg-red-100 rounded-xl flex justify-center items-center gap-x-2 p-2 text-red-500 font-bold m-4">
          <h1 className="text-lg">
            <AiOutlineDelete />
          </h1>
          <h1 className="text-sm">Delete</h1>
        </div>
      </div>
    </div>
  </div>
))}

      </div>
  
      <div className='sm:hidden grid grid-cols-2 content-start gap-y-1 gap-x-1 vvsm:gap-y-2 vvsm:gap-x-2 md:gap-x-4 md:gap-y-4 overflow-y-auto items-stretch px-1 py-2 w-full'>
      
      {/* {reports.map((item, index) => (
          <div onClick={()=>toggleProfile(index)}>
        <CommonGridItemCard gridTemplateColumns={gridTemplateColumns} gridTemplateRows={`repeat(${rows}, auto)`}
          id={'1'}
          image={item.image}
          first_name= {item.first_name}
          last_name={item.last_name}
          qualification={item.qualification||item.phone_no}
          position={item.position}
          experiance={item.experiance}
          ratings={item.ratings}       
          createdAt={item.createdAt}
        
        />
        </div>
      
      ))}  */}

      </div>
      </div>       

      
    </div>

    )}
  </>
  );
};






export const CardComponent: React.FC = () => {
  const cardData = [
    { heading: 'Card 1 Heading' },
    { heading: 'Card 2 Heading' },
    { heading: 'Card 3 Heading' },
    { heading: 'Card 4 Heading' },
  ];

return (
    <div className="bg-white p-5">
      <h1 className="font-bold text-4xl text-gray-800 mb-5">Example</h1>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        {cardData.map((card, index) => (
          <div key={index} className="flex-shrink-0 mr-5">
            <h2 className="font-bold text-xl text-gray-800 mb-3">{card.heading}</h2>
            <div className="max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out h-64"></div>
          </div>
        ))}
      </div>
    </div>
  );
};




