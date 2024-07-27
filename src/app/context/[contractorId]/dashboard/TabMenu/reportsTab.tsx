'use client'
import React, { useEffect, useState } from 'react';
import { CommonAddButton, PlusButton } from '@/app/components/common/buttons';
import { CommonGridRows, CommonGridRowsReport } from '@/app/components/common/grids';
import { useMyContext } from '@/app/Context';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import CreateReport from './projects/ReportFormate/page';


type Props = {
  project_name?:string;
  contractorId?:string;
  project_id?:string;
};

export const Reportstab: React.FC<Props> = ({contractorId,project_name, project_id}) => {
  
 const [showForm,setShowForm]=useState(false);
 const [reports, setReports] = useState<any>([]);
 const [showProfile, setShowProfile] = useState(false);
 const [selectedProfileData, setSelectedProfileData] = useState<typeof reports[number] | null>(null);
 const [selectedEmployees, setSelectedEmployees] = useState<Record<string, boolean>>({});


 const toggleProfile = (index: any) => {
   const selectedItem = reports[index];
   setSelectedProfileData(selectedItem);
   setShowProfile(!showProfile);
 };
   

 let profile=localStorage.getItem('token')||''
 let decoded: any = jwtDecode(profile);
 let profile_data = decoded['profile'];
 let contractorid=contractorId;
 const getData = async() => {
   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reports/project/reports/${project_id}`);
   
   
   const respData = response.data;
   setReports(respData)
 }

 useEffect(()=>{
 
   getData();
 }, [])
 const handleAddProject = async () => {
   await getData();
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
  

  return (
    <div className='bg-white w-screen h-screen sm:w-auto rounded-t-2xl'>
    <div className="flex  items-center justify-center w-full rounded-b-xl">

    </div>
    {showForm &&(<CreateReport project_id={ project_id} report_created_by={profile_data.name} />)}
    {!showForm &&
          <div className='rounded-md h-full flex-1 justify-between items-center mb-20 rounded-t-2xl'>
          
          <div className='p-2' onClick={() => setShowForm(true)}>
                <CommonAddButton
                  icon={faFileAlt}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Add Report"
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />

              </div>
       
        <div className="text-[color:var(--mainTitleColor)] mb-16 p-2 bg-[url('/reportbackground.pn')]">  
          <CommonGridRowsReport rows={1} columns={7} reports={reports?.reports} contractorId={''}/>
          {/* {reports?.reports?.map((item:any, index:any) => (
          <div className='relative'>
                    <div className='flex justify-start absolute'>
          <input
              type="checkbox"
              checked={selectedEmployees[item._id||''] || false}
              onChange={() => handleEmployeeSelection(item._id||'')}
            />
          </div>
          <div key={index} onClick={() => toggleProfile(index)}>
          <div className="grid grid-cols-3 items-center justify-between bg-[color:var(--mainTitleLightestColor)] hover:bg-[color:var(--lightBackgroundColor)] rounded-2xl  mb-1"  >
            <div className='p-4'>
              {item.heading}
            </div>

            <div className='p-4'>
              {item.submitted_by}
            </div>
            <div className='p-4'>
            {item.createdAt}
            </div>

            </div>


          </div>

          </div>
        ))} */}
          
        </div>
                    {/* <div className='p-2 overflow-scroll mb-10 text-[color:var(--mainTitleColor)] no-scrollbar'>
                      <Link href={'/context/dashboard/TabMenu/projects/ReportFormate'}>
                      <div className='flex items-center justify-between w-auto shadow-sm rounded-md  p-2 m-2'>
                      <Image
                        src={'/add-project.png'}
                        alt="/"
                        width={35}
                        height={35}
                        className={`z-6 cursor-pointer `}
                        />
                        <div className='hidden sm:flex items-center justify-between gap-x-2 md:gap-x-20'><p className=''>Project 1 Name</p><h3 className='text-sm text-[color:var(--lightBackgroundColor)]'>18/10/22</h3></div>
                        
                        <div className='hidden sm:flex text-sm text-[color:var(--lightBackgroundColor)] space-x-2'><p>Created by:</p>  <p className='text-auto text-[color:var(--mainTitleColor)]'> Umer bijapure</p></div>
                        <div>
                        <div className='flex sm:hidden items-center justify-between gap-x-20'><p className=''>Project 2 Name</p></div>
                        
                        <div className='flex sm:hidden text-[12px] text-[color:var(--lightBackgroundColor)] sm:space-x-2 space-x-1'><h3 className=' text-[color:var(--lightBackgroundColor)]'>18/10/22</h3><p>Created by:</p>  <p className='text-auto text-[color:var(--mainTitleColor)]'> Umer bijapure</p></div>
                      </div>

                      <div className="bg-red-100 rounded-xl flex items-center gap-x-2 p-2 text-red-500 font-bold m-4" >
                        <h1 className="text-lg">
                          <AiOutlineDelete />
                        </h1>
                        <h1 className="text-sm">Delete</h1>
                      </div>
                      </div> 
                      </Link>
                      <Link href={'/context/dashboard/TabMenu/projects/ReportFormate'}>
                      <div className='flex items-center justify-between w-auto shadow-sm rounded-md p-2 m-2'>
                      <Image
                        src={'/add-project.png'}
                        alt="/"
                        width={35}
                        height={35}
                        className={`z-6 cursor-pointer `}
                        />
                        <div className='hidden sm:flex items-center justify-between gap-x-2 md:gap-x-20'><p className=''>Project 1 Name</p><h3 className='text-sm text-[color:var(--lightBackgroundColor)]'>18/10/22</h3></div>
                        
                        <div className='hidden sm:flex text-sm text-[color:var(--lightBackgroundColor)] space-x-2'><p>Created by:</p>  <p className='text-auto text-[color:var(--mainTitleColor)]'> Umer bijapure</p></div>
                        <div>
                        <div className='flex sm:hidden items-center justify-between gap-x-20'><p className=''>Project 1 Name</p></div>
                        
                        <div className='flex sm:hidden text-[12px] text-[color:var(--lightBackgroundColor)] sm:space-x-2 space-x-1'><h3 className=' text-[color:var(--lightBackgroundColor)]'>18/10/22</h3><p>Created by:</p>  <p className='text-auto text-[color:var(--mainTitleColor)]'> Umer bijapure</p></div>
                      </div>

                      <div className="bg-red-100 rounded-xl flex items-center gap-x-2 p-2 text-red-500 font-bold m-4" >
                        <h1 className="text-lg">
                          <AiOutlineDelete />
                        </h1>
                        <h1 className="text-sm">Delete</h1>
                      </div>
                      </div>
                      </Link>
                    </div>  */}
                  
              </div>  
}
           </div>
           
  );
};

