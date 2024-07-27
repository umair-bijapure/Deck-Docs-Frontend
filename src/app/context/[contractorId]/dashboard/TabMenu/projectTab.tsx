// 'use client';
// import React, { useEffect, useState, useMemo } from 'react';
// import { CommonprojectGrid, CommonProject, Project } from '@/app/components/common/projectGrid';
// import { CommonAddButton } from '@/app/components/common/buttons';


// import { CommonSectionTitle } from '@/app/components/common/bannersAndheadings';
// import { useMyContext } from '@/app/Context';
// import AddProject from './addProject/page';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';


// export const ProjectsTab: React.FC<{ contractorId: string, employees:any,recieved_projects:[]}> = ({ contractorId ,employees,recieved_projects}) => {
//   const { data, setData } = useMyContext();
//   const [showForm, setShowForm] = useState(false);
//   const [projects, setProjects] = useState<any>([]);
//   const [projects2, setProjects2] = useState<any>([]);
//   const memoizedRecievedProjects = useMemo(() => recieved_projects, [recieved_projects]);

//   const fetchProjects = async () => {
//     if (!memoizedRecievedProjects) return; // Check if memoizedRecievedProjects is defined
//     let fetchedProjects: Project[] = [];
//     for (const projectName of memoizedRecievedProjects) {
//       try {
//         const response = await axios.get<Project>(`http://localhost:5000/api/project/project/${projectName}`);
//         const respData = response.data;
//         fetchedProjects.push(respData);
//       } catch (error) {
//         console.error('Error fetching project:', error);
//       }
//     }
//     // Update state after fetching all projects
//     setProjects2((prevProjects: any) => [...prevProjects, ...fetchedProjects]);
//   };
//   useEffect(() => {

  
//     fetchProjects();
//   }, [memoizedRecievedProjects]);
  
  
  
  
//   const handleTabClick = (tabName: any) => {
//     const newData = {
//       horizontalTabStatus: tabName,
//     };

//     setData(newData);
//   };
//   let contractorid=contractorId;
//   const getData = async() => {
//     const response = await axios.get(`http://localhost:5000/api/project/${contractorid}`);
//     const respData = response.data;
//     setProjects(respData.concat(projects2)); // Merge projects2 into projects
//   }

//   useEffect(()=>{
  
//     getData();
   

//   }, [])
//   const handleAddProject = async () => {
//     // Assuming newProjectData contains the details of the newly added project
//     // Perform the logic to add the project to the database
//     // ...
//     console.warn("9999999999999999999999999999999999999999999999999999999999999999999")
//     // After adding the project successfully:
//     // Trigger a re-fetch of projects
//     await getData();
//   };
 
//   useEffect(() => {
//     // Merge projects2 into projects
//     setProjects((prevProjects: any) => [...prevProjects, ...projects2]);
//   }, [projects2]);
//   console.warn(projects,projects2,recieved_projects,contractorId,"````````````````````````````````ggggggggggggggggggggggggggggggg")
//   return (
//     <div className="flex-col bg-white justify-center items-start mb-10 w-screen h-screen sm:w-auto rounded-t-2xl overflow-y-scroll">
//       {showForm && (<AddProject contractorId={contractorId} handleAddProject={handleAddProject} onClick={()=>setShowForm(true)} />)}
//       {!showForm && (
//         <div>
//           {data.horizontalTabStatus && (
//             <div>
//               <div className='flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)] rounded-t-2xl'>
//                 <div className='flex items-center p-2'>
//                   <CommonSectionTitle title="ALL PROJECTS" titleColor={""} fontSize={""} />
//                 </div>
//                 <div className='' onClick={() => setShowForm(true)}>
                  
//                     <CommonAddButton
//                       icon="/hook 1.png"
//                       color="color:var(--mainTitleColor)"
//                       title=""
//                       width={20}
//                       height={20}
//                       className=''
//                     />               
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className='text-[color:var(--mainTitleColor)] mb-16 mt-4 p-4' >
//             <CommonProject
//               who={'Organisation'}
//               profileLink={'/context/dashboard/TabMenu/projects/projectProfile'}
//               DocumentsLink={`/context/${contractorId}/dashboard/TabMenu/projects/projectDocuments`}
//               TeamsLink={'/context/dashboard/TabMenu/teams'}
//               ExpensesLink={'/context/dashboard/TabMenu/projects/projectExpenses'}
//               projects={projects}
//               employees={employees}
//               contractorId={contractorId}
//               onUpdateProjects={getData}
            
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { CommonprojectGrid, CommonProject, Project } from '@/app/components/common/projectGrid';
import { CommonAddButton } from '@/app/components/common/buttons';


import { CommonSectionTitle } from '@/app/components/common/bannersAndheadings';
import { useMyContext } from '@/app/Context';
import AddProject from './addProject/page';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { faBuilding} from '@fortawesome/free-solid-svg-icons';


export const ProjectsTab: React.FC<{ contractorId: string, employees:any,recieved_projects:[]}> = ({ contractorId ,employees,recieved_projects}) => {
  const { data, setData } = useMyContext();
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<any>([]);
  const [projects2, setProjects2] = useState<any>([]);
  const fetchProjectsByIDs = async () => {
    try {
      if(recieved_projects){
        const response = await axios.get('http://localhost:5000/api/project/recievedProjects/projectbyIds', {
            params: { ids: recieved_projects } // Pass project IDs as query parameters
        });
        setProjects2(response.data)
        return response.data;
      }
        
    } catch (error) {
        console.error('Error fetching projects by IDs:', error);
        throw error; // You can handle the error appropriately in your UI
    }
};
  useEffect(() => {

  
    fetchProjectsByIDs();
  }, []);
  
  
  
  
  const handleTabClick = (tabName: any) => {
    const newData = {
      horizontalTabStatus: tabName,
    };

    setData(newData);
  };
  let contractorid=contractorId;
  const getData = async() => {
    const response = await axios.get(`http://localhost:5000/api/project/${contractorId}`);
    const respData = response.data;
    setProjects(respData.concat(projects2)); // Merge projects2 into projects
  }

  useEffect(()=>{
  
    getData();
   

  }, [])
  const handleAddProject = async () => {
    // Assuming newProjectData contains the details of the newly added project
    // Perform the logic to add the project to the database
    // ...
   
    // After adding the project successfully:
    // Trigger a re-fetch of projects
    await getData();
  };
 
  useEffect(() => {
    // Merge projects2 into projects
    setProjects((prevProjects: any) => [...prevProjects, ...projects2]);
  }, [projects2]);
  return (
    <div className="flex-col bg-white justify-center items-start mb-10 w-screen h-screen sm:w-auto rounded-t-2xl overflow-y-scroll">
      {showForm && (<AddProject contractorId={contractorId} handleAddProject={handleAddProject} onClick={()=>setShowForm(false)} />)}
      {!showForm && (
        <div>
          {data.horizontalTabStatus && (
            <div>
              <div className='flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)] rounded-t-2xl'>
                <div className='flex items-center p-2'>
                  <CommonSectionTitle title="ALL PROJECTS" titleColor={""} fontSize={""} />
                </div>
                <div className='p-2' onClick={() => setShowForm(true)}>
                <CommonAddButton
                  icon={faBuilding}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Add Project"
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />

              </div>
              </div>
            </div>
          )}

          <div className='text-[color:var(--mainTitleColor)] mb-16 mt-4 p-4' >
            <CommonProject
              who={'Organisation'}
              profileLink={'/context/dashboard/TabMenu/projects/projectProfile'}
              DocumentsLink={`/context/${contractorId}/dashboard/TabMenu/projects/projectDocuments`}
              TeamsLink={'/context/dashboard/TabMenu/teams'}
              ExpensesLink={'/context/dashboard/TabMenu/projects/projectExpenses'}
              projects={projects}
              employees={employees}
              contractorId={contractorId}
              onUpdateProjects={handleAddProject}
              recieved_projects={recieved_projects}
            
            />
          </div>
        </div>
      )}
    </div>
  );
};







