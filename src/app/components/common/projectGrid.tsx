import React, { ReactNode, useEffect, useState } from 'react';
import { CircularButton, CommonAddButton } from './buttons';
import Link from 'next/link';
import image from 'next/image';
import {NewCommonGrid, } from './gridItems';
import Select from 'react-select';

import { CommonHeader, CommonProfile, CommonProfileProps } from './bannersAndheadings';
import { ProjectProfile } from '../profiles/projectProfile';
import axios from 'axios';
import { FaFolder, FaUserPlus } from 'react-icons/fa';
import UploadFolderPage from '../folderUpload';
import { Popover} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { faTools } from '@fortawesome/free-solid-svg-icons';
 export interface SubContractor {
  contractorId: string;
  title: string;
  description: string;
  _id: { $oid: string }; // Assuming _id is an object with a $oid property
  folderId: string;
}

export interface Project {
  _id: string;
  project_name?:string|'',
  project_description?:string|'',
  project_client_name?:string|'';
  project_address?:string|'';
  project_status?:boolean;
  project_country?:string;
  project_sub_contractors?:SubContractor[];
  start_date?:Date;
  dead_line?:Date;
  list_of_works?: Array <{}>;
  projects_contractor_history?: Array <{}>;
  team?:string[];
  contractor_company_id?:string;
  status?:string;
  createdAt?:Date;
  allowed_users: string[];
  roles?: {
    [userId: string]: string;
  }
  progress?:any;
 
}
interface ProjectGridProps{
  profileLink:string;
  DocumentsLink:string;
  TeamsLink:string;
  ExpensesLink:string;
  who?:boolean|string;
  employees:{
    _id:string,//compulsory
    profile_picture?:string,//compulsory
    first_name?:string;//compulsory
    createdAt?:Date;//compulsory
    fathers_name?:string;
    last_name?:string;
    birth_date?:string;
    phone_no?:string;
  
    parmanent_country?:string;
    email:string;//compulsory
    current_address?:string;
    parmanent_address?:string;
    ratings?:number;
  
    description?:string;
    is_employee_user:boolean;
    is_main_contractor:boolean;//compulsory
    is_sub_contractor?:boolean;
    is_supervisor?:boolean;
    is_client:boolean;//compulsory
    user_status?:string;
    team:string[];
    skills?:string[];
  
    qualification?:string;  
    gender?:string;
    
    position?:string;
    experiance?:string;
    current_projects:[];
  }[];
  projects?: Project[];
  contractorId?:string;
  recieved_projects?:String[];

}

const gridItemsData = [
  {index:1, imageUrl: '/hook 1.png', name: 'Project Name 1' },
  {index:2, imageUrl: '/hook 1.png', name: 'Project Name 2' },
  {index:3, imageUrl: '/hook 1.png', name: 'Project Name 3' },
  {index:4, imageUrl: '/hook 1.png', name: 'Project Name 4' }];
export const CommonprojectGrid: React.FC<ProjectGridProps> = ({profileLink,DocumentsLink,TeamsLink,ExpensesLink,who,projects}) => {
  return (
    <div>
      
      <div className='hidden sm:flex flex-col'>
        { who==='Organisation' &&
        <div className="">
          <div className='pl-4 pr-4 flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)]'>
            <p className=' m-2 font-semibold text-[color:var(--mainTitleColor)] opacity-60 text-xl sm:p-4'>All Projects</p>
              <CommonAddButton
                icon={faTools}
                // href="/context/dashboard/TabMenu/addUser"
                color="color:var(--mainTitleColor)" // Add your desired color here
                title=""
                width={20}
                height={20}
                className=''
              />
          </div>
          <div>
            {/* <SearchComponent/> */}
            Search here
          </div>
      </div>
}
<div className=''>

    <div className=''>
          <div className='ml-10 flex justify-center items-center bg-[color:var(--lightBackgroundGreyColor)] mt-4 p-1 pl-10 pr-10 rounded-t-2xl w-[200px]'>
              <p className='font-semibold text-[color:var(--mainTitleColor)]'>Active Projects</p>
          </div>
          {/* Use the CommonGrid component */}
          <div className="grid grid-cols-1 vvvsm:grid-cols-2 gap-4 p-8">
              <NewCommonGrid  profileLink={profileLink} ExpensesLink={ExpensesLink} />
          {/* <NewCommonGrid gridItemsData={gridItemsData} profileLink={profileLink} ExpensesLink={ExpensesLink} /> */}
          </div>

    </div>
    <div>
          <div className='ml-10 flex justify-center items-center bg-[color:var(--lightBackgroundGreyColor)] p-1 pl-10 pr-10 rounded-t-2xl  w-[200px]'>
          <p className='font-semibold text-green-600'>Closed Projects</p>
        </div>
          {/* Use the CommonGrid component */}
          <div className="grid grid-cols-1 vvvsm:grid-cols-2 gap-4 p-8">
          <NewCommonGrid  profileLink={profileLink} ExpensesLink={ExpensesLink} />
          {/* <NewCommonGrid gridItemsData={gridItemsData} profileLink={profileLink} ExpensesLink={ExpensesLink} /> */}
          </div>
    </div>
  </div>
</div>       
</div>
  );
};
interface User {
  _id: string;
  first_name: string;
  name:string;
  // Add other properties as needed
}

export const CommonProject: React.FC<ProjectGridProps & { onUpdateProjects: () => void }> = ({ projects, employees, contractorId, onUpdateProjects,recieved_projects }) => {  
  const [showProfile, setShowProfile] = useState(false);
  const [selectedProfileData, setSelectedProfileData] = useState<Project | null>(null);
  const [allusers, setUsers] = useState<User[]>([]); // State to store users
  const [contractorCompanies, setContractorCompanies] = useState([]);


  let selectedItem: Project;
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setUsers(response.data); // Set the fetched users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchContractorCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/organisation');
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

  const toggleProfile = (index: any) => {
    if (projects) {
      selectedItem = projects[index];
      setSelectedProfileData((prevData) => ({ ...prevData, ...selectedItem }));
    }
    setShowProfile(!showProfile);
  };
  const [popupProjectProfile, setPopupProjectProfile] = useState<Project | null>(null);
  const [isAccessPopupVisible, setIsAccessPopupVisible] = useState(false);
  
  // Function to toggle the popup visibility and set the selected project profile
  const handleTogglePopup = (project:Project,index:any) => {

    setIsAccessPopupVisible(!isAccessPopupVisible);
    setPopupProjectProfile(project);
  };
  

// Function to revoke access to a project profile for a user
const handleRevokeAccess = async (projectId:string, userId:string) => {
  try {
    // Call the API to revoke access for the specified user in the project profile
    await axios.put(`http://localhost:5000/api/project/${projectId}/revoke-access`, { userId });

    // Update the local state to reflect the changes
    setPopupProjectProfile((prevProfile) => {
      if (!prevProfile) {
        return null;
      }

      // Check if the current popup project profile matches the updated project profile
      if (prevProfile._id === projectId) {
        // Filter out the revoked user from the allowedUsers array
        const updatedAllowedUsers = prevProfile.allowed_users.filter((id) => id !== userId);
        // Return the updated project profile object with the new allowedUsers array
        return {
          ...prevProfile,
          allowed_users: updatedAllowedUsers,
        };
      } else {
        return prevProfile;
      }
    });
    onUpdateProjects();
  } catch (error) {
    console.error('Error revoking access:', error);
  }
};

// Function to give access to a project profile for multiple users
const handleGiveAccess = async (projectId:string, userIds:string[]) => {
  try {
    // Call the API to give access to the specified users in the project profile
    await Promise.all(userIds.map((userId) => axios.put(`http://localhost:5000/api/project/${projectId}/give-access`, { userId, contractorId })));

    // Update the local state to reflect the changes
    setPopupProjectProfile((prevProfile) => {
      if (!prevProfile) {
        return null;
      }

      // Check if the current popup project profile matches the updated project profile
      if (prevProfile._id === projectId) {
        // Update the allowedUsers array with the newly added users
        const updatedAllowedUsers = [...new Set([...prevProfile.allowed_users, ...userIds])];
        // Return the updated project profile object with the new allowedUsers array
        return {
          ...prevProfile,
          allowed_users: updatedAllowedUsers,
        };
      } else {
        return prevProfile;
      }
    });
  onUpdateProjects();
  } catch (error) {
    console.error('Error giving access to multiple users:', error);
  }
};
const handleDeleteProject = async (projectId:string) => {
  try {
      // Send a DELETE request to your backend API to delete the project
      const response = await axios.delete(`http://localhost:5000/api/project/${projectId}`);

      // Check if the project was deleted successfully
      if (response.status === 200) {
          // Optionally, you can perform any additional actions after successful deletion
          console.log('Project deleted successfully:', response.data);
          // For example, you can navigate to a different page or refresh the project list
          // Navigate to a different page
          // history.push('/projects');
          // Or refresh the project list
          // fetchProjects();
      } else {
          // Handle other status codes if needed
          console.error('Failed to delete project. Status:', response.status);
      }
  } catch (error) {
      // Handle errors
      console.error('Error deleting project:', error);
  }
};
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

// Function to handle the confirmation of the delete action
const handleConfirmDelete = () => {
  // Call the delete function here
  if (selectedProfileData) {
    handleDeleteProject(selectedProfileData._id);
  }
  // Close the confirmation popup
  setShowDeleteConfirmation(false);
  setShowProfile(false)
};
console.log(projects,"FFFFFFDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
const users = [...allusers, ...contractorCompanies];

return(
<div className='h-screen'>
  
   
      {showProfile && (
                <div>
<CommonHeader
        circleColor={""}
        employeeImage={"/hook 1.png"}
        employeeName={selectedProfileData?.project_name}
        description={selectedProfileData?.project_name}
        addedOn={selectedProfileData?.start_date
          ? new Date(selectedProfileData?.start_date).toLocaleDateString('en-US')
          : ''}
        onClick={() => setShowProfile(false)}
        onDeleteClick={() => setShowDeleteConfirmation(true)} // Show confirmation popup
      />
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white cursor-pointer" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    
      <ProjectProfile 
        project_id={selectedProfileData?._id}
        project_name={selectedProfileData?.project_name}
        start_date={selectedProfileData?.start_date}
        dead_line={selectedProfileData?.dead_line}
        project_sub_contractors={selectedProfileData?.project_sub_contractors}
        project_client_name={selectedProfileData?.project_client_name}
        project_address={selectedProfileData?.project_address}
        project_country={selectedProfileData?.project_country}
        project_status={selectedProfileData?.project_status}
        createdAt={selectedProfileData?.createdAt}
        employees={employees}
        team={(selectedProfileData?.team || []) as string[]}           
        setSelectedProfileData={setSelectedProfileData}
        selectedProfileData={selectedProfileData}     
        contractorId={contractorId}    
        roles={selectedProfileData?.roles} 
        progress={selectedProfileData?.progress}
        onUpdateProjects={onUpdateProjects}
        />

        </div>
      )}


      {!showProfile &&
      <div className="flex ">
        
      {/* <div className='flex items-start'>
      {who?
        <div className=" p-4 m-4">
              <div className='pl-4 pr-4 flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)]'>
                  <p className=' m-2 font-semibold text-[color:var(--mainTitleColor)] opacity-60 text-xl sm:p-4'>All Projects</p>
                    <CommonAddButton
                            icon="/hook 1.png"
                            href="/context/dashboard/TabMenu/addUser"
                            color="color:var(--mainTitleColor)" // Add your desired color here
                            title=""
                            width={20}
                            height={20}
                            className=''
                    />
              </div>
              <div>
                <SearchComponent/>
              </div>

        </div>:
        <div className='w-full'>
        <div className='flex justify-start bg-white rounded-r-full mt-4 mb-10 items-center p-1 mr-8'>
          <CommonIcon id={''} width={60} height={60} href={''} src={'/default-user-profile.jpg'} classNameI='rounded-full border border-black-200 shadow-md items-center ml-2' />
        <p className='p-3 ml-4 text-xl font-semibold text-[color:var(--mainTitleColor)] w-full'>{who}</p>
        {who!=='Organisation'?
        <p className='border-l p-2 text-slate-400'>Designation</p>:""}
        
      </div>
      {who!=='Organisation'?
      <CollapsibleComponent expanded={false}  leftIcon={<div className='flex'><div className='h-4 text-lg'><FaFolder/></div></div>} className='text-yellow-400 bg-white bg-opacity-25'>
      <div className='flex justify-start bg-white w-full h-auto'>
          <FileUploadForm folderId={''} refreshData={fetchFolders} /> 
      </div>
      </CollapsibleComponent>:""}

      </div>

          }
      </div> */}
      

      <div className='flex flex-col sm:grid grid-cols-2 items-start gap-y-4 gap-x-4 rounded-t-xl w-full sm:w-auto '>
      

      {projects?.map((item, index) => (
          <div key={index} className={`relative flex flex-wrap shadow-md rounded-b-xl ${recieved_projects?.includes(item.project_name ?? '') ? 'bg-yellow-50 rounded-t-xl' : 'bg-[color:var(--mainTitleLightestColor)]'}`}>
            <div className='flex flex-col justify-end w-full p-1 rounded-t-xl hover:bg-white '>
                
                
                  <div className='flex items-start justify-between pl-4 pr-4 pt-4'  onClick={()=>toggleProfile(index)}>
                      <div className=''>
                        <h1 className='text-xl text-[color:var(--mainTitleColor)] font-semibold '>{item.project_name}</h1>
                        {/* <h2 className='text-green-600 text-md flex justify-center items-center mb-6'>Active</h2> */}
                        {/* <AiOutlineFolder/><AiOutlineDash/> <AiOutlineExclamationCircle/> <AiOutlineCheckCircle/>*/}
                        <div>
                        <p className='text-[color:var(--mainTitleLightColor)] opacity-60 text-[12px] mt-2 '>{item.status}</p>
                        </div>
                      </div>

                  </div>

                
                <div>
                  <p className='text-[color:var(--mainTitleColor)] opacity-50 pl-4 pr-4 mt-2'>{item.project_description}</p>
                </div>
                <div className='flex  items-center mt-6 border-spacing-2 border-[color:var(--mainTitleLightestColor)]  justify-between text-[12px] text-[color:var(--mainTitleColor)] pl-4 pr-4'>
                  <div className='flex-col'>
                    <p className='text-[color:var(--mainTitleColor)] opacity-50'>Started on</p>
                    <p>         {item.start_date
                            ? new Date(item.start_date).toLocaleDateString('en-US')
                            : ''}</p>
                  </div>
                  <div className='flex-col'>
                    <p className='text-[color:var(--mainTitleColor)] opacity-50'>Deadline</p>
                    <p>          {item.dead_line
                            ? new Date(item.dead_line).toLocaleDateString('en-US')
                            : ''}</p>
                  </div>
                  </div>

              </div>

          {/* Popup for giving and revoking access */}
          {isAccessPopupVisible && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10'>
              <div className='bg-white rounded-lg p-6 w-full max-w-md'>
                <div className='flex justify-between items-center mb-4'>
                  <div className='flex text-lg font-bold items-center items-center gap-x-4'>
                    <h4 className='text-[color:var(--primaryColor)]'><FaFolder /></h4>
                    <h4>{popupProjectProfile?.project_name}</h4>
                  </div>
                  <div className='text-3xl p-2 m-2'>
                    <button onClick={() => setIsAccessPopupVisible (false)}>&times;</button>
                  </div>
                </div>
                <h3>Allowed Users</h3>
                {popupProjectProfile?.allowed_users.map((userId) => {
                    // Find the user object in the users array based on the userId
                    const user = users.find((user) => user._id === userId);

                    if (user) {
                        return (
                            <div key={userId} className='flex items-center justify-between bg-gray-100 p-2 rounded-xl mb-2'>
                                <div className='mr-2'>{`${user.first_name} (${userId})`}</div>
                                <button className='text-red-500 bg-red-100 hover:bg-[color:var(--lightBackgroundColor)] rounded-xl px-4' onClick={() => handleRevokeAccess(popupProjectProfile._id, userId)}>Revoke Access</button>
                            </div>
                        );
                    } else {
                        return null; // User not found in users array
                    }
                })}

                {/* Select users to give access */}
                {/* You need to implement the logic for selecting users and handling the give access action */}
                <Select
                  options={users.map((user) => ({ value: user._id, label: user.first_name || user.name}))}
                  isMulti
                  onChange={(selectedOptions) => {
                    const selectedUserIds = selectedOptions.map((option) => option.value);
                    if (popupProjectProfile) {
                      handleGiveAccess(popupProjectProfile._id, selectedUserIds);
                    }
                  }}
                  placeholder='Select Users'
                />
              </div>
            </div>
          )}
            <div className='flex flex-col w-full p-4 text-[color:var(--mainTitleColor)] hover:bg-white rounded-b-xl '>                
              <div>
                <div className="flex items-center space-x-2 text-base">
                  <h4 className="font-semibold text-slate-900">Team</h4>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {item.team ? item.team.length : 0}
                  </span>
                </div>
                <div className='flex'>
                  {(item.team as string[]).slice(0, 7).map((employeeId: string, index: number) => {
                    // Find the corresponding user in employees array
                    const user = employees.find((employee) => employee._id === employeeId!)!;
                      // Display user information
                      return (
                        <div className="mt-3 flex flex-col -space-x-2 overflow-hidden" key={index}>
                          <img
                            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                            src={user?.profile_picture || '/default-user-profile.png'}
                            alt=""
                          />
                          <p className="text-[10px] p-2 w-[4px]">{user?.first_name} {user?.last_name}</p>
                        </div>
                      );
                    })}
                  </div>
                  {item.team && item.team.length > 7 && (
                    <div className="mt-3 text-sm font-medium">
                      <a href="#" className="text-blue-500">+ {item.team.length - 7} others</a>
                    </div>
                  )}
              </div>

            </div>
            <div className='absolute top-0 right-0 '>
              <Popover content={
                  <div>

                      <div className='flex justify-center items-center cursor-pointer p-2 gap-x-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white' onClick={() => { handleTogglePopup(item,index);}}>
                        <h1><FaUserPlus /> </h1>
                        <h1>Give Access </h1>

                      </div>
                      <div>
                        <div className='justify-center cursor-pointer p-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white'>
                          <UploadFolderPage projectId={item.project_name} contractor_company={item.contractor_company_id} onClick={undefined} />
                        </div>
                      </div>
                  </div>} trigger="hover">
                  <h1 className='font-extrabold text-[30px] p-2 m-2'><EllipsisOutlined /></h1>
                                            
              </Popover>
            </div>                        

          </div>
      ))}
      </div>

      </div>
      }
</div>
)
};
