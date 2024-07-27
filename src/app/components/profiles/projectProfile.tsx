import axios from "axios";
import { JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { CommonAttendance } from "../attendance";
import { CommonSectionTitle, CommonUserCard, SubContractorsSection } from "../common/bannersAndheadings";
import { CommonInput } from "../common/inputs";
import { FaAngleDown, FaCalendarDay, FaFolder, FaUserPlus } from "react-icons/fa";
import { Collapsible, CollapsibleComponent, CollapsibleItem } from "../common/collapsible";
import { CommonButtonSolidBlue, PlusButton, ToggleSwitch } from "../common/buttons";
import CommonPopup from "../common/popUp";
import CommonDocumentList from "../common/documentsUpload";
import CommonSalary from "../salary";
import Link from "next/link";
import { Project, SubContractor } from "../common/projectGrid";
import { Reportstab } from "@/app/context/[contractorId]/dashboard/TabMenu/reportsTab";
import ProjectDocuments from "@/app/context/[contractorId]/dashboard/TabMenu/projects/projectDocuments/page";
import ProjectProgress from "../project_progress";
import { fetchContractorData, fetchOrganisationUsers } from "../utils/fetches";
import Select, { ActionMeta } from 'react-select';
import FileUploadForm from "@/app/context/[contractorId]/dashboard/TabMenu/projects/projectDocuments/FileUploadForm";
import CertificateUpload from "../common/certificatesUpload";
import PdfUploader from "../common/certificatesUpload";
import CertificateUploader from "../common/certificatesUpload";



interface Employee {
  employeeId: string;
  employeeName: string;
  employeeImage: string;
  position: string;

}
type SelectedOption = {
  value: string;
  label: string;
};

// Define the type for project sub-contractors
type ProjectSubContractors = string[];




interface ContractorDropdownProps {
  users: User[];
  addContractorToProject: (projectId: string, contractorId: string) => void;
  project_name: string;
}
export interface User {
  _id: string;
  first_name: string;
  name:string;
  // Add other properties as needed
}

interface CommonProfileProps {

    project_id?:string,//compulsory
    project_name?:string;//compulsory
    project_description?:string;
    start_date?:Date;//compulsory
    dead_line?:Date;
    contractorId?:string;
    project_main_contractor_name?:string;
    project_manager_name?:string;
    project_client_name?:string;
 
    project_sub_contractors?:SubContractor[];

    project_address?:string;
    project_country?:string;

    createdAt?:Date;
    project_status?:boolean;
    team: string[]; 
    list_of_works?:string[];
    documents_id?:string[];
    progress?:any;
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
   
 
    setSelectedProfileData: React.Dispatch<React.SetStateAction<Project | null>>;
    selectedProfileData: Project | null ;
    roles?: {
      [userId: string]: string;
    }
  }
  
  export const ProjectProfile: React.FC<CommonProfileProps & { onUpdateProjects: () => void }> = ({
    project_id,//compulsory
    
    project_name,//compulsory
    project_description,
    start_date,//compulsory
    dead_line,
    contractorId,
    project_main_contractor_name,
    project_manager_name,
    project_client_name,
    project_sub_contractors,

    project_address,
    project_country,
    project_status,
    team,
    list_of_works,
    documents_id,
    createdAt,
    employees,
    roles,
    progress,
    setSelectedProfileData,
    onUpdateProjects
   
  }) => {
  
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isPopupContractorVisible, setPopupContractorVisible] = useState(false);

    
    const [docType,setDocType]=useState('');
    const [position_update,setPosition]=useState('');
    const [is_employee_user_update, setEmployee] = useState(false);
    

    const [is_supervisor_update, setSupervisor] = useState(false);
    const [is_sub_contractor_update, setSubContractor] = useState(false);
    const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
    const [showNewPage, setShowNewPage] = useState('') ;
    const [remove, setRemove] = useState('') ;

    const [showSalary, setShowSalary] = useState(false) ;
    const [showEmployees, setShowEmployees] = useState(false) ;
    const [showokay, setOkay] = useState(false) ;

    const [showReports, setReports] = useState(false) ;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState({ uploadedImage:'' });
    const [userType, setUserType] = useState<string>('');
    const formattedDate = start_date instanceof Date ? start_date.toLocaleString() : start_date;
    const [team2, setTeam2] = useState<string[]>(team);
    const [addedEmployees, setAddedEmployees] = useState<string[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
    const [projectStatus, setProjectStatus] = useState<boolean>(project_status||true);
    useEffect(() => {
      if (project_status !== undefined) {
        setProjectStatus(project_status);
      }
    }, [project_status]);
    const handleToggle = (isOn: boolean) => {
      const status = isOn ? true : false;
      setProjectStatus(status);
      console.log(`Project status changed to: ${status}`);
    };
    const [inputFields, setInputFields] = useState([
      { label: 'Project Name', label2:'project_name',defaultValue: project_name, isDisabled: false ,value:project_name},
      { label: 'Project Address', label2:'project_address',defaultValue: project_address, isDisabled: false,value:project_address },
      { label: 'Description', label2:'description',defaultValue: project_name, isDisabled: false ,value:project_name},
      { label: 'Project Country', label2:'project_country',defaultValue:project_country, isDisabled: false,value:project_country},

    ]);


    const option_roles = [
      "Supervisor",
      "Project Manager",
      "Project Engineer",
      "Site Engineer",
      "Document Controller",
      "HSE Officer",
      
      // Add other roles here
    ];
    interface RolesObject {
      [userId: string]: string; // Define an interface for rolesObject
    }

  const handleInputChange = (index: number, newValue: string) => {
    setInputFields((prevState) =>
      prevState.map((field, i) => (i === index ? { ...field, value: newValue } : field))
    );
  };


    const addTeamMember = async (employee:string, employeeDetails: { _id?: string; first_name?: string; last_name?: string; profile_picture?: string; position?: string; current_projects: any[]; }) => {
      // setAddedEmployees((prevEmployees) => [...prevEmployees, employee]);
    
      try {
        // Ensure current_projects is initialized as an array
        setTeam2((prevTeam) => [...prevTeam, employee]);
        if (!Array.isArray(employeeDetails.current_projects)) {
          employeeDetails.current_projects = [];
        }
    
        // Push the new project_name to the current_projects array
        employeeDetails.current_projects.push(project_name);
        // Make a PUT request to update the user data
        const updateResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${employeeDetails._id}`, employeeDetails);
    
        // Handle the update response if needed
        console.log("User data updated:", updateResponse.data);
      } catch (error) {
        // Handle errors
        console.error("Error updating user data:", error);
      }
    };
// This ensures that the effect is re-run whenever team2 changes

    
    const removeFromTeam = async (employeeId: string,name:string) => {
      try {
        // Assuming your API call to remove the employee from the team is successful
        // Update the state with the modified team
        setOkay(true)
        setRemove(name)
        setSelectedProfileData((prevData) => {
          if (prevData && prevData.team) {
            const updatedTeam = prevData.team.filter((employee) => employee !== employeeId);
            return {
              ...prevData,
              team: updatedTeam,
            };
          }
          return prevData;
        });
    
        // Set team2 after the state has been updated
        setTeam2((prevTeam) => {
          const updatedTeam = prevTeam.filter((id) => id !== employeeId);
          return updatedTeam;
        });
       
      } catch (error) {
        // Handle error
        console.error('Error removing employee from team:', error);
      }
    };


    
  
    const removeTeamMember = async (employeeId: string, employeeDetails: any) => {
      
      setAddedEmployees((prevEmployees) => prevEmployees.filter((employee) => employee !== employeeId));
    
      try {
        // Ensure current_projects is initialized as an array
        setTeam2((prevTeam) => prevTeam.filter((id) => id !== employeeId));
        if (!Array.isArray(employeeDetails.current_projects)) {
          employeeDetails.current_projects = [];
        }
    
        // Remove the project_name from the current_projects array
        const projectIndex = employeeDetails.current_projects.indexOf(project_name);
        if (projectIndex !== -1) {
          employeeDetails.current_projects.splice(projectIndex, 1);
        }
    
        // Make a PUT request to update the user data
        const updateResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/${employeeDetails._id}`, employeeDetails);
        await handleSubmit();
        // Handle the update response if needed
        console.log("User data updated:", updateResponse.data);
      } catch (error) {
        // Handle errors
        console.error("Error updating user data:", error);
      }
    };

    

    const handleRemoveButtonClick = async (employeeId: string,employeeDetails:any) => {
           
            await  removeTeamMember(employeeId, employeeDetails)
     
      await removeFromTeam(employeeId,employeeDetails.first_name);
      
    

    };

    
    const handleSubmit = async () => {
      try {
        const updatedData = inputFields.reduce((acc, field) => {
          acc[field.label2] = field.value;
          return acc;
        }, { team: team2 } as Record<string, any>);
    
        updatedData.position = position_update;
        // Append new team members to the existing ones
        updatedData.team = [...team2, ...addedEmployees];
        updatedData.project_status=projectStatus;
        
        // Update the project data
// Ensure _id is a string (assign a default value if it's undefined)
        const updatedId = updatedData._id || '';

        // Spread the previous data and the updated data with the corrected _id
        setSelectedProfileData((prevData: Project | null) => {
          if (!prevData) {
            return null;
          }

          return { ...prevData, ...updatedData, _id: updatedId };
        });
        console.log(updatedData,contractorId,"ffffffffffffffffffffffffffffffffffffffffFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
                
            
        // Update the project on the server
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/project/${project_id}`, updatedData);
    
        console.log('Updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };
    
    // useEffect(() => {
    //   if (team) {
    //     handleSubmit(); // Call your handleSubmit function here
    //   }
    // }, [team]); 
  
    const openPopupPersonel = () => {
      setDocType('Personel Documents')
      setPopupVisible(true);
      
    };
    const openPopupCertificates = () => {
      setDocType('Certificates')
      setPopupVisible(true);
    };

  
    const firstSixFields = inputFields.slice(0, 8);
    const remainingFields = inputFields.slice(8);
    const [rolesObject, setRolesObject] = useState<RolesObject>({}); // Specify the type of rolesObject
const [rolesState, setRoles] = useState({});

    const handleRoleChange = (userId: string, role: string) => {
      setRoles(prevRoles => ({
        ...prevRoles, // Copy the previous roles
        [userId]: role || undefined // Update the role for the specific user
      }));
    
      // Prepare updated data to send to the backend
      const updatedData = {
        roles: {
          ...rolesState, // Copy the existing roles
          [userId]: role || undefined // Update the role for the specific user
        }
      };
    
      // Send updated data to the backend
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/project/${project_id}`, updatedData)
        .then(response => {
          console.log("Roles updated successfully:", response.data);
        })
        .catch(error => {
          console.error("Error updating roles:", error);
        });
        console.log(rolesState,"PQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQqqqq")
    };
    const [subContractors, setSubContractors] = useState<any>([]);

    // Function to add a subcontractor
    const addSubContractor = (subContractor: any) => {
      setSubContractors([...subContractors, subContractor]);
    };
  
    // Function to remove a subcontractor
    const removeSubContractor = (index: number) => {
      const updatedSubContractors = [...subContractors];
      updatedSubContractors.splice(index, 1);
      setSubContractors(updatedSubContractors);
    };
    const handleTogglePopup = () => {
      setPopupContractorVisible(!isPopupContractorVisible);

    };
    const [subcontractors, setSubcontractors] = useState<any>([]);
    const fetchSubContractors = async (contractorId: string) => {
      try {
        const subContractors = await fetchContractorData(contractorId, 'connection_organisations');
        console.log("Sub Contractors:", subContractors);
        setSubcontractors(subContractors);
        return subContractors;
      } catch (error) {
        console.error("Error fetching sub contractors:", error);
        throw error;
      }
    };
    
    useEffect(() => {
      if (contractorId) {
        fetchSubContractors(contractorId);
      }
    }, [contractorId]);
const [allusers, setUsers] = useState<User[]>([]); // State to store users
const [contractorCompanies, setContractorCompanies] = useState([]);
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [selectedContractor, setSelectedContractor] = useState<{ value: string; label: string; } | null>(null);


    const fetchUsers = async () => {
      try {
        const users = await fetchOrganisationUsers();
        console.log("Sub Contractors:", users );
        setUsers(users.data);
        return users ;
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
    const users = [...allusers, ...contractorCompanies];
    const addContractorToProject = async ( contractorId: string, projectSubContractors: string[]) => {
      try {
        // Push new contractor to the existing list of project sub-contractors
        const updatedProjectSubContractors = [...projectSubContractors, contractorId];
    
        // Update project data on the server
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/project/${project_id}`, { project_sub_contractors: updatedProjectSubContractors });
        
        console.log('Contractor added to project successfully');
      } catch (error) {
        console.error('Error adding contractor to project:', error);
      }
    };
    
    const removeContractorFromProject = async (projectId: any, contractorId: any) => {
      try {
        // Fetch current project data
        const projectData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`);
    
        // Remove contractor from the project data
        const updatedProjectData = {
          ...projectData.data,
          project_sub_contractors: projectData.data.project_sub_contractors.filter((id: any) => id !== contractorId)
        };
    
        // Update project data on the server
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}`, updatedProjectData);
        
        console.log('Contractor removed from project successfully');
      } catch (error) {
        console.error('Error removing contractor from project:', error);
      }
    };
    type SelectedOption = { value: string; label: string };

      const options = users.map(user => ({
        value: user._id,
        label: user.first_name || user.name
      }));
    
      const [projectSubContractors, setProjectSubContractors] = useState<SubContractor[]>([]);

      const handleAddContractor = async () => {
        if (selectedContractor) {
            try {
                const updatedProjectSubContractors = [...projectSubContractors, selectedContractor.value];
                
                // Update project data on the server with title, description, and contractorId
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/project/${project_id}`, {
                    title: title,
                    description: description,
                    contractorId: (selectedContractor as { value: string }).value,
                    project_sub_contractors: updatedProjectSubContractors
                });

                console.log('Contractor added to project successfully');
            } catch (error) {
                console.error('Error adding contractor to project:', error);
            }
        }
    };
    const [isCollapsed, setIsCollapsed] = useState(true);

    const [expandedContractorId, setExpandedContractorId] = useState('');

    const handleToggleCollapse = (contractorId: string) => {
      setExpandedContractorId((prevId) => (prevId === contractorId ? '' : contractorId));
    };
  
    return (

      <>
      {/* {
        showNewPage==='progress' &&
        <div className="h-screen w-full">
        <ProjectProgress projectId={project_name} progress={progress} team={team2} users={employees}/>
      </div>

      } */}

     
      {/* {showNewPage==='attendance' &&               
        <CommonAttendance profileType={'project'} team={team} editedTitle={""} attendance={attendance} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""} />
      } */}
      
        
      {showNewPage==='documents' &&     
           
        <ProjectDocuments project_name={project_id} contractorId={contractorId} />
      }
    
       {showNewPage==='certificates' &&     
           
         
          <CertificateUploader contractorId={contractorId}  project_name={project_id} />
         }
      {showNewPage==='reports' &&               
        <Reportstab contractorId={contractorId}  project_id={project_id}/>
      }
      {showNewPage==='' &&
      <div className="h-screen mb-20">
  
  
          <div className=" grid bsm:grid-cols-2 amd:grid-cols-3  mt-4 sm:mt-6 sm:w-full h-screen ">

              <div className="col-span-1 " >
                  <div className="flex justify-between p-2">
                  <div>
                      <CommonSectionTitle title={'PROJECT DETAILS'} titleColor={""} fontSize={""}/>
                    </div>
                    <div>
                      <ToggleSwitch project_status={projectStatus} defaultValue={project_status} onToggle={handleToggle}  />
                    </div>
                    {/* <div>
                       <CommonButtonSolidBlue onClick={() => setShowNewPage('progress')}/>
                    </div> */}
                  </div>
                  <div className="relative flex-col justify-center items-center mb-4">
                      <div className="flex justify-between ">
                        <div className={`flex items-center justify-center relative rounded-2xl ml-4 sm:mr-4 mb-2 w-[160px] h-[160px] bsm:w-auto md:w-full sm:h-auto ring-[color:var(--mainTitleLightestColor)] ring-offset-2 ring-2  `}>
                        
  
                        <label htmlFor="profileImageInput" className=''>
                          <img
                            src={'/hook 1.png'}
                            alt="Project Profile"
                            width={80}
                            height={80}
                            className={`items-center w-auto h-[160px] object-cover p-1`}
                          />
  
                        </label>
                          
                        </div>
                        <div className="sm:hidden space-y-4 ml-2 mr-4">
                          <h1
                            className="text-md bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] rounded-2xl p-3 hover:ring-offset-2 hover:ring-2 shadow-sm"
                            onClick={openPopupPersonel}        
                          >
                            Documents
                          </h1>
                          <h1
                            className="text-md bg-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleColor)] rounded-2xl p-3 hover:ring-offset-2 hover:ring-2 shadow-sm"
                            onClick={openPopupCertificates}
                          >
                            Certificates
                          </h1>
  
                        </div>
                      </div>

                  </div>
                  
                    <div className=" flex-col justify-center items-center w-full">
  
                        <div>
                          {/* First six elements */}
                          <div className="grid grid-cols-2 sm:grid-cols-2">
                            {firstSixFields.map((field, index) => (
                              <CommonInput
                                key={index}
                                label={field.label}
                                defaultValue={field.defaultValue}
                                isDisabled={field.isDisabled}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                              />
                            ))}
                          </div>
  
                          {/* Remaining elements */}
                          <div className="grid grid-cols-1">
                            {remainingFields.map((field, index) => (
                              <CommonInput
                                key={index + 8}  
                                label={field.label}
                                defaultValue={field.defaultValue}
                                isDisabled={field.isDisabled}
                                onChange={(e) => handleInputChange(index + 8, e.target.value)}
                              />
                            ))}
                          </div>
                          <div className=" text-lg p-2">
                            <CommonInput defaultValue="Carpenting, Lifting, Interior designing" label={'List of Work'}/>
                          </div>
                          <div className="flex justify-center mt-6">
                            <CommonButtonSolidBlue onClick={handleSubmit} text="Update"/>
                          </div>
                        </div>
                      
                    </div>
              </div>
              <div className="col-span-1" >

                  <div className="mt-6 sm:mt-2">
                      <div className="sm:hidden">
                        <CommonSectionTitle  title="EXPENSES" titleColor={""} fontSize={""}/>
                      </div>
                      <div className="truncate p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl ml-1  mr-1 ">
                        
                          <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                            <h1 className=""><FaFolder/></h1>
                            <h1 className="text-[color:var(--mainTitleColor)]  text-lg">{'Expenses'}</h1> 
                          </div>
                      </div>
                  </div>
                
                    <div className=" p-2">
                        <div className="flex justify-between">
                        <CommonSectionTitle title="TEAM 1" titleColor={""} fontSize={""}/>
                        <PlusButton
                        className="bg-[color:var(--lightBackgroundGreyColor)] shadow-md "
                        onClick={() => setShowEmployees(true)}/>
                        </div>
                        <div className="">
                        <div className="overflow-y-scroll h-[444px] no-scrollbar border-2 border-[color:var(--mainTitleLightestColor)] rounded-xl ">
                        {employees?.map((employee, index) => (
                          <div className="flex items-center" key={index}>
                            {/* Check if the current employee ID is in the team array */}
                            {/* {project_name && employee.current_projects?.some(project => project === project_name) ? ( */}
                            {team2?.some(id=>id===employee._id) && (
                              <>
                                <CommonUserCard
                                  circleColor={""}
                                  employeeImage={employee.profile_picture || '/default-user-profile.png'}
                                  employeeName={employee.first_name || ''}
                                  userDetailsPath={""}
                                  position={employee.position || 'Employee'}
                                  role={roles && roles[employee._id]}
                                />
                              
                              <button
                                      onClick={() => setSelectedEmployee(employee._id === selectedEmployee ? null : employee._id)}
                                      className="flex items-center bg-[color:var(--mainTitleLightestColor)] px-4 py-2 gap-x-2 h-16 rounded-xl shadow-md text-gray-700 p-2 m-2"
                                    >
                                      Role <FaAngleDown/>
                                    </button>
                                    {/* Dropdown for selecting role */}
                                    {employee._id === selectedEmployee && (
                                      <div className="absolute mt-1 w-40 bg-white border rounded-lg shadow-md z-10">
                                        {option_roles.map((role, index) => (
                                          <div
                                            key={index}
                                            onClick={() => {
                                              handleRoleChange(employee._id, role);
                                              setSelectedEmployee(null); // Hide options after selection
                                            }}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                          >
                                            {role}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                                  
                                <button
                                  className="flex justify-center text-[24px] font-extrabold bg-red-100 text-red-500 p-2 rounded-sm h-8 w-8 items-center border-none shadow-md hover:-translate-y-1 hover:scale-110 duration-300"
                                  onClick={() => handleRemoveButtonClick(employee._id, employee)}
                                >
                                  -
                                </button>
                              </>
                            )}
                          </div>
                        ))}

                        </div>
                        </div> 
                    </div>
              </div>
  
              <div className="col-span-1"  >
                <div className="hidden sm:block ">
                  {/* <CommonSectionTitle title="DOCUMENTS" titleColor={""} fontSize={""}/> */}
                    
                  <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" >
                  {/* onClick={openPopupPersonel} */}
                      <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">       
                          <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center" onClick={() => setShowNewPage('documents')}>
                            <h1 className=""><FaFolder/></h1>
                              {/* <Link href={DocumentsLink||''} className="text-[color:var(--mainTitleColor)] text-lg">All Documents</Link>  */}
                              <h1 className="text-[color:var(--mainTitleColor)] text-lg">All Documents</h1> 

                          </div>
                      </div>
                  </div>           
                </div>
                <div className="hidden sm:block ">
                  {/* <CommonSectionTitle title="DOCUMENTS" titleColor={""} fontSize={""}/> */}
                    
                  <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" >
                  {/* onClick={openPopupPersonel} */}
                      <div className="truncate sm:p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">       
                          <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center" onClick={() => setShowNewPage('certificates')}>
                            <h1 className=""><FaFolder/></h1>
                              {/* <Link href={DocumentsLink||''} className="text-[color:var(--mainTitleColor)] text-lg">All Documents</Link>  */}
                              <h1 className="text-[color:var(--mainTitleColor)] text-lg">Certificates</h1> 

                          </div>
                      </div>
                  </div>           
                </div>

            

            {/* <div className="mt-3">
                <div className="sm:hidden">
                <CommonSectionTitle  title="ATTENDANCE" titleColor={""} fontSize={""}/></div>
                <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" onClick={() => setShowNewPage('attendance')}>
                <div className="truncate p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">         
                        <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                          <h1 className=""><FaCalendarDay/></h1>
                          <h1 className="text-[color:var(--mainTitleColor)] text-lg">Attendance</h1> 
                        </div>
                    </div>
                </div>
            </div> */}
  
            <div className="mt-3">
                <div className="sm:hidden">
                <CommonSectionTitle  title="Project Reports" titleColor={""} fontSize={""}/></div>
                <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" onClick={() => setShowNewPage('reports')}>
                <div className="truncate p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">         
                        <div  className="shadow-[color:var(--mainTitleLightestColor)] cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                          <h1 className=""><FaCalendarDay/></h1>
                          <h1 className="text-[color:var(--mainTitleColor)] text-lg">Reports</h1> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">


                          <div className="mt-3">
                          <div className="sm:hidden">
                              <CommonSectionTitle  title="Project Reports" titleColor={""} fontSize={""}/></div>
                              <div className="flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 pl-4 pr-4 p-1" >
                              <div className="truncate p-4 bg-[color:var(--mainTitleLightestColor)] rounded-2xl">         
                                      <div  className="shadow-[color:var(--mainTitleLightestColor)] flex flex-col items-center justify-between cursor-pointer text-[color:var(--mainTitleLightColor)] text-sm flex gap-x-2 p-1 items-center">
                                      {project_sub_contractors?.map((contractor: SubContractor) => {
        const user = users.find((user) => user._id === contractor.contractorId);
        if (user) {
          return (
            <div key={contractor._id.$oid} className="contractor-container shadow-md p-4 rounded-2xl m-2 flex  justify-between w-full">
              <div className="">
              <div className="header flex justify-between gap-x-4 gap-y-2" onClick={() => handleToggleCollapse(contractor.contractorId)}>
                <div className="font-bold text-[color(--primaryColor)]">
                  {user.name + ' (' + contractor.contractorId + ')'}
                </div>
                <div>
                  <button className=" w-full " onClick={() => removeContractorFromProject(project_name, contractor.contractorId)}>
                    Remove
                  </button>
                </div>
              </div>
              {expandedContractorId === contractor.contractorId && (
                <div className="content">
                  <CommonInput
                    label={'Title'}
                    defaultValue={contractor.title}
                    isDisabled={false}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <CommonInput
                    label={'Description'}
                    defaultValue={contractor.description}
                    isDisabled={false}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <FileUploadForm folderId={contractor.folderId} refreshData={onUpdateProjects}/>
                </div>
              )}
              </div>
            </div>
          );
        } else {
          return null; // User not found in users array
        }
      })}

                          <div className="flex w-full items-center justify-center p-4 rounded-2xl shadow-md" onClick={() => handleTogglePopup()}>
                                        <h1 className="text-[color:var(--mainTitleColor)] text-lg">  + Add Contractor</h1> </div>
                                      </div>
                                  </div>
                              </div>
                          </div>



      </div>
                    

                    
          </div>
          </div>
  
          <div className="flex fixed top-[450px] items-center justify-center z-20 p-2 w-full">
            <CommonPopup
                showModal={isPopupVisible}
                onClose={() => setPopupVisible(false)}
                heading={docType}
                content='' >
              <div className='flex-cols sm:w-auto  h-[545px] sm:h-[550px] overflow-scroll no-scrollbar'>  
                <CommonDocumentList 
                  className="grid grid-cols-1"
                  isPopup={true}
                  docType={docType}
              />
              </div>             
            </CommonPopup>
            
            {isPopupContractorVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 ">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className='text-3xl p-2 m-2 '>
                                <button onClick={handleTogglePopup}>&times;</button>
                            </div>
                        </div>
                        <div>
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <Select
                                options={options}
                                isSearchable
                                onChange={(selectedOption) => setSelectedContractor(selectedOption)}
                                placeholder="Select Contractor"
                            />
                            <button onClick={handleAddContractor}>Add Contractor</button>
                        </div>
                    </div>
                </div>
            )}
       
            
            {/* <CommonPopup
              showModal={showTime}
              onClose={() => setShowTime(false)}
              heading={'Attendance'}
              content='' >
                <CommonAttendance editedTitle={""} locationValue={""} mainContractorValue={""} subContractorValue={""} clientNameValue={""} onSave={function (): void {
              throw new Error("Function not implemented.");
            } } />
            </CommonPopup> */}
            <CommonPopup
              showModal={showSalary}
              onClose={() => setShowSalary(false)}
              heading={'Salary Distribution'}
              content='' >
                <div className="overflow-y-scroll no-scrollbar  h-[500px] w-full">
                <CommonSalary>
                  <div>
                    Salary
                  </div>
                </CommonSalary>
                </div>
            </CommonPopup>
            <CommonPopup
              showModal={showEmployees}
              onClose={() => {
                setShowEmployees(false);
                handleSubmit(); // Call your handleSubmit function here
              }}
              heading={'Add Team Members'}
              content='' >
                <div className="overflow-y-scroll no-scrollbar  h-[500px] w-[500px]">
                {/* {projects?.map((item, index) => ( */}
                {employees.map((employee, index) => (
                  <div key={index} className="flex gap-x-2 items-center text-[color:var(--mainTitleColor)]">
                      <CommonUserCard
                        circleColor={""}
                        employeeImage={employee.profile_picture || "/engineer 1.png"}
                        employeeName={employee.first_name + " " + employee.last_name}
                        userDetailsPath={""}
                        position={employee.position || 'employee'}       
                      />
                      
                      <p>
                      {/* Assuming `employees` is an array */}

                  {project_name && employee.current_projects?.some(project => project === project_name) ? (
                    // Display the remove button if the project is already added
                    // <button
                    //   className="flex justify-center text-[24px] font-extrabold bg-red-100 text-red-500 p-2 rounded-sm h-8 w-8 items-center border-none shadow-md hover:-translate-y-1 hover:scale-110 duration-300"
                    //   onClick={() => removeTeamMember(employee._id, employee)}
                    // >
                    //   -
                    // </button>
                    ''
                  ) : (
                    // Allow the user to add the project
                    <PlusButton
                      className="bg-green-100 text-green-500 border-none shadow-md hover:-translate-y-1 hover:scale-110 duration-300"
                      onClick={() =>
                        addTeamMember(
                          
                             employee._id,

                          employee
                        )
                      }
                    />
                  )} 
                      </p>

                    </div>
                  ))}
                
                </div>
            </CommonPopup>
            <CommonPopup
              showModal={showokay}
              onClose={() => setOkay(false)}
              heading={'Salary Distribution'}
              content='' >
                <div className="flex flex-col items-center justfy-center p-4">
                      <div className="p-4">
                        You Have Removed an Eemployee {remove}.
                      </div>
                      <div className=" m-4">
                     < CommonButtonSolidBlue  text={"Okay"} onClick={()=>{handleSubmit;setOkay(false)}}/>
                     </div>
                </div>
            </CommonPopup>
          </div>

      </div>}
      </>
  
    );
  };