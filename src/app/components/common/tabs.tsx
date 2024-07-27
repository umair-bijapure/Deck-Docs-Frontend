  'use client';
  import { useMyContext } from '@/app/Context';
  import React, { useEffect, useState } from 'react';
  import {  CommonSectionTitle } from './bannersAndheadings';
  import { faBell, faCalendarCheck, faFile, faHandshake, faPeopleGroup, faPersonDress } from '@fortawesome/free-solid-svg-icons';
  import { FaBell, FaBellSlash, FaBuilding, FaFacebookMessenger, FaFile, FaFolder, FaPersonBooth, FaRegBell, FaUserCircle } from 'react-icons/fa';
  import { AiFillBank, AiFillBell, AiFillMessage, AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';
import {  CommonAlert, CommonSpinner, NotificationsList, Notificationsss } from './notifications';
import Image from 'next/image'; 
import EmployeeTab from '@/app/context/[contractorId]/dashboard/TabMenu/employeeTab';
import { jwtDecode } from "jwt-decode";
import { ProjectsTab } from '@/app/context/[contractorId]/dashboard/TabMenu/projectTab';
import SubContractor from '@/app/context/[contractorId]/dashboard/TabMenu/sub_contractor';
import { Reportstab } from '@/app/context/[contractorId]/dashboard/TabMenu/reportsTab';
import ClientTab from '@/app/context/[contractorId]/dashboard/TabMenu/clientTab';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from './collapsible';
import { Popover} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { ProjectProfile } from '../profiles/projectProfile';
import { Project } from './projectGrid';
import { CommonInput } from './inputs';

import { CommonButtonSolidBlue } from './buttons';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { useRouter } from 'next/navigation';
import UserSignUp from '@/app/authentication/forgot-password';
import ProjectDocuments from '@/app/context/[contractorId]/dashboard/TabMenu/projects/projectDocuments/page';

import { getLoggedInUserData, logOutUser, useUserPermissions } from '../utils/utils';
import { CommonProfile } from '../profiles/employeeProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommonAttendance from '../CommonAttendance';
import { fetchOrganisationUsers } from '../utils/fetches';



export enum UserTypes {
  CONTRACTOR_COMPANY = 'CONTRACTOR_COMPANY',
  USER = 'USER',
  // Add more user types if needed
}


  interface Tab {
    name: string;
    permission: string;
    content: React.JSX.Element;
    icon: React.JSX.Element;
  }

  interface CommonTabsProps {
 
   
    userType: 'contractor' | 'user';
    profile_data:any;
    username:string;
    organisationId:string;
 
    

  }

  const CommonTabs: React.FC<CommonTabsProps> = ({ userType,username,profile_data, organisationId}) => {
    const [activeTab, setActiveTab] = useState(0);
    const { data, setData } = useMyContext();
    const [unreadCount, setUnreadCount] = useState(0); // Initial unread count
    const [employees, setEmployees] = useState<any>([]);
  
    const [clients, setClients] = useState<any>([]);

    const [contractors, setContractor] = useState<any>([]);

    const [showProfile, setShowProfile] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone_no, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const router = useRouter();
    const formSubmitHandler = async (e: any) => {
  
      e.preventDefault();
      let body: any = {};
      body['email']=profile_data.email;
      if (name.length !== 0) {
        body['name']=name;
      
       
      }
      if (city.length !== 0) {
        body['city']=city;

        
      }
      if (state.length !== 0) {
        body['state']=state;
      
     
      }
      if (email.length !== 0 && email.includes('@') ) {
        body['email']=email;
     
       
      }
      if (address.length !== 0) {
        body['address']=address;
        
        
      }
      if (phone_no.length !== 0 && phone_no.length != 10) {
        body['phone_no']=phone_no;
       
       
      }


      // if ( password.length!==0 && password != confPassword) {
      //   setErrorMessage("Password and Confirm Password don't match");
      //   return;
    
      // }else {
      //   body['password']=password;
      // }
      
      // setErrorMessage('Please try again');
      axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/contractor_company/${username}`, body, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const data = response.data;
          const token = data['token'];
          localStorage.setItem('token', token);
          cookies.set('token', token);
          // let decoded: any = jwtDecode(token);
          // const role = decoded['role'];
          // let contractorId = decoded['identifier'];
          // if (role == 'contractor_company') {
          //   router.replace(`context/${encodeURIComponent(contractorId)}/dashboard`);
          //   return;
          // }
          setShowLoader(false)
          return;
        })
        .catch((e) => {
          setShowLoader(false)
          setErrorMessage(e.response.data['message']);
        });
    };

    const [isNotificationsExpanded, setIsNotificationsExpanded] = useState(false);
    const [selectedProfileData, setSelectedProfileData] = useState<Project | null>(null);
    const fetchUsers = async () => {
      try {
        const subContractors = await fetchOrganisationUsers();
       
        setEmployees(subContractors.data);
        return subContractors;
      } catch (error) {
        console.error("Error fetching sub contractors:", error);
        throw error;
      }
    };
  
    useEffect(()=>{
  
      fetchUsers();
    }, [])
    const handleTabClick = (index: number,tabName:string) => {
      const newData = {
        horizontalTabStatus:tabName
      };
    
      // Set the newData object in the context
      setData(newData);
    

      setActiveTab(index);
    };

    const handleEmployeeAdded = async (id:string) => {
   
 
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
      const respData = response.data;
      setEmployees((prevData:any)=>[...prevData,...respData])
      fetchUsers(); // Fetch the updated employee list
    };
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      if (username) {
        fetchNotifications(username);
      }
    }, [username]);
  
// Modify the fetchNotifications function to fetch notifications and calculate unreadCount
const fetchNotifications = async (username:string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/notifications/${username}`);
    setNotifications(response.data);
    // Calculate unread count
    const unreadNotifications = response.data.filter((notification: { read: any; }) => !notification.read);
    setUnreadCount(unreadNotifications.length);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};
const toggleProfile = () => {

  setShowProfile(!showProfile);
};

// Use the handleNotificationTabClick function to mark notifications as read and fetch updated notifications
const handleNotificationTabClick = async () => {
  try {
    // Update backend to mark notifications as read
    setIsNotificationsExpanded(prevState => !prevState);
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notification/update/${username}`);
    // Refetch notifications to get updated data
    fetchNotifications(username);
  } catch (error) {
    console.error('Error updating notifications:', error);
  }
};
const handleInputChange = (newValue: string) => {
  setName(newValue)
};

  
    const handleDeleteNotification = async (notificationId: string) => {
      try {
        await axios.delete(`/api/notifications/${username}/${notificationId}`);
        setNotifications(notifications.filter((n: any) => n._id !== notificationId));
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    };
// Example usage to fetch sub_contractors array for a specific contractor
const fetchSubContractors = async (username: string) => {
  try {
    const subContractors = fetchContractorData(username, 'connection_organisations');
    console.log("Sub Contractors:", subContractors);
    return subContractors;
  } catch (error) {
    console.error("Error fetching sub contractors:", error);
    throw error;
  }
};

// Example usage to fetch clients array for a specific contractor
const fetchClients = async (username: string) => {
  try {
    const clients =  fetchContractorData(username, 'clients');
    console.log("Clients:", clients);
    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
const handleLogout = () => {
  logOutUser();
  router.push("/");
};
const [userPermissions, updateUserPermissions] = useUserPermissions();



const availableTabs: Tab[] = [
  { 
    name: 'Employees', 
    permission: 'ListAllEmployees', 
    content: <EmployeeTab contractorId={username} onEmployeeAdded={(id) => handleEmployeeAdded(id)}  organisationId={organisationId} employees={employees}  />, 
    icon: <FontAwesomeIcon icon={faPeopleGroup}/>
  },
  { 
    name: 'Attendance', 
    permission: 'ViewAttendance', 
    content: <CommonAttendance  employees={employees}  />, 
    icon: <FontAwesomeIcon icon={faCalendarCheck}/>
  },
  // { 
  //   name: 'Attendance', 
  //   permission: 'ViewMyAttendance', 
  //   content:     <CommonAttendance profileType={'user'} phone_no={phone_no} attendance={profile_data.attendance} editedTitle={""} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""} onSave={function (): void {
  //     throw new Error("Function not implemented.");
  //   } } />, 
  //   icon: <FontAwesomeIcon icon={faCalendarCheck}/>
  // },
  { 
    name: 'Projects', 
    permission: 'ListAllProjects', 
    content: <ProjectsTab contractorId={username} recieved_projects={profile_data?.recieved_projects} employees={employees} />, 
    icon: <FaBuilding/> 
  },
  { 
    name: 'Contractors', 
    permission: 'ViewContractors', 
    content: <SubContractor onEmployeeAdded={(id) => handleEmployeeAdded(id)} contractorId={username} />, 
    icon: <FaPersonBooth/>
  },
  // { 
  //   name: 'Reports', 
  //   permission: 'ViewReports', 
  //   content: <Reportstab contractorId={username} />, 
  //   icon: <FontAwesomeIcon icon={faFile}/>
  // },
  { 
    name: 'Clients', 
    permission: 'ListAllClients', 
    content: <ClientTab contractorId={username} />, 
    icon:<FontAwesomeIcon icon={faHandshake}/>
  },
  { 
    name: 'My Documents', 
    permission: 'ViewMyDocuments', 
    content: <ProjectDocuments project_name={profile_data.pro_team_id} contractorId={username} recieved_folders={profile_data?.recieved_folders} />, 
    icon:  <FaFolder/>
  },
  { 
    name: 'My Profile', 
    permission: 'UpdateSelf', 
    content: (
      <CommonProfile
        profile_picture={profile_data.profile_picture}
        first_name={profile_data.first_name}
        last_name={profile_data.last_name}
        fathers_name={profile_data.fathers_name}
        ratings={profile_data.ratings}
        phone_no={profile_data.phone_no}
        parmanent_country={profile_data.parmanent_country}
        email={profile_data.email}

        is_client={profile_data.is_client}
        createdAt={profile_data.createdAt}
        gender={profile_data.gender}
        current_address={profile_data.current_address}
        parmanent_address={profile_data.parmanent_address}
        team={profile_data.team}
        qualification={profile_data.qualification}
        experiance={profile_data.experiance}

        position_at_company={profile_data.position}
        attendance={profile_data.attendance} is_hsc_officer={false} permanent_city={profile_data} permanent_address={profile_data} permanent_state={profile_data.permanent_state} permanent_country={profile_data.parmanent_country} current_city={profile_data.current_city} current_state={profile_data.current_state} current_country={profile_data.current_country} email_verified={true}      />
    ), 
    icon: profile_data.profile_picture ? (
      <img src={profile_data.profile_picture} className="cursor-pointer" alt={`${profile_data.first_name} ${profile_data.last_name}`} />
    ) : (
      <FaUserCircle className="cursor-pointer" />
    ) 
  },
];

const tabs: Tab[] = [];
const userPermissionsSet = new Set(userPermissions);

for (let i = 0; i < userPermissions.length; i++) {
  const permission = userPermissions[i];
  if (["ViewAll"].includes(permission)) {
    tabs.push(...availableTabs);
    break;
  } else {
    availableTabs.forEach(tab => {
      if (tab.permission === permission && !tabs.includes(tab)) {
        tabs.push(tab);
      }
    });
  }
}

if (!tabs.find(tab => tab.name === '')) {
  tabs.push({
    name: '',
    permission: '',
    content: <></>, // Empty React Element
    icon: (
      <button onClick={handleLogout} className="flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold hover:scale-110 duration-100">
        Logout<AiOutlineLogout />
      </button>
    ),
  });
}
return (
  <> 
        {errorMessage?.length > 0 ? 
        <CommonAlert message={errorMessage} type='error'/>
        : <></>}

        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}

      <div className="flex justify-center">
      <div className="grid grid-cols-6 gap-x-2">
        <div className="col-span-1 flex-col w-auto relative ">

          <div className="inline-block flex justify-center bg-white  py-2 m-1">
            <Popover content={
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <NotificationsList notifications={notifications} onDelete={handleDeleteNotification} />
              </div>
            } trigger="click">
              <div className='flex items-center w-60 justify-center mb-2'>
              
                <div className="relative inline-flex items-center justify-center w-fit">
                {unreadCount > 0 &&
                  <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-500 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                                      
                                    <div>
                                      {unreadCount}
                                    </div>
                  </div>}
                  
                    <button
                      type="button"
                      className="inline-block rounded px-2 pb-2 pt-2.5 font-bold leading-normal bg-[color:var(--mainTitleLightestColor)] text-black hover:bg-blue-100 hover:text-[color:var(--mainTitleColor)] transition "
                      data-twe-ripple-init
                      data-twe-ripple-color="light">
                      <div className="flex items-center gap-2">
                        <div className=' text-[30px] text-[color:var(--primaryColor)]'><FaBell/></div>
                        <div className="text-left text-black">Notifications</div>
                      </div>
                    </button>
                </div>

               
                  {/* Display unread count here */}

              </div>
            </Popover>

          </div> 
          <div className="tab-button-container flex flex-col w-60 h-full bg-white p-4 shadow-lg">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`w-full h-16 flex items-center justify-start px-4 ${
                  index === activeTab
                    ? 'bg-[color:var(--primaryColor)] text-white text-lg shadow-md font-bold'
                    : 'bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleLightColor)] hover:bg-blue-100 hover:text-black'
                } transition-all duration-300 ease-in-out rounded-lg mb-2`}
                onClick={() => handleTabClick(index, tab.name)}
              >
                <div className="flex items-center gap-2">
                  <div>{tab.icon}</div>
                  <div className="text-left">{tab.name}</div>
                </div>
              </button>
            ))}
          </div>

        </div>
        <div className="col-span-5 bg-white overflow-y-scroll no-scrollbar rounded-lg">{tabs[activeTab]?.content}</div>
      </div>
    </div>


  </>
);

  };

  export default CommonTabs;

function fetchContractorData(username: string, arg1: string) {
  throw new Error('Function not implemented.');
}
