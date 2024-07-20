'use client';
import React, { useState } from 'react';
import { useMyContext } from '@/app/Context';
import { CommonProfile } from '@/app/components/common/bannersAndheadings';
import FolderStructure, { Folder } from '../projects/projectDocuments/FolderStructure'
import axios from 'axios';


const Sub_Contractor: React.FC = () => {
    const { data } = useMyContext();
    const [folders, setFolders] = useState<Folder[]>([]);
    const fetchFolders = async (
        folderId: string | null = "document-subcontractor"
      ) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId || ''}`);
          setFolders(response.data);
        } catch (error) {
          console.error('Error fetching folders:', error);
        }
      };
  return (
   
    <div className='w-screen sm:w-auto '>
        
      <div className=''>
        <CommonProfile skills={[]} id={''} email={''} team={[]} attendance={[]} is_hsc_officer={false} permanent_city={''} permanent_address={''} permanent_state={''} permanent_country={''} current_city={''} current_state={''} current_country={''} email_verified={false}/>
        {/* circleColor={'bg-[color:var(--primaryColor)]'} */}
      </div>
      
      {/* <div className='flex justify-end pr-2 '>
            <FileUploadForm folderId={''} refreshData={fetchFolders} /> 
          </div>
      <div className="sm:hidden flex-row flex  justify-center items-center mb-10">
      <div className='col-span-1 mx-auto h-full max-w-[100vw] lg:max-w-[70vw] xl:max-w-[60vw] w-[600px] bg-white p-2 '>
            <div className={`grid grid-cols-2 items-center justify-center content-start gap-y-2 gap-x-4 md:gap-x-6 md:gap-y-4 overflow-y-auto px-2 sm:px-4 py-2 w-ful border-2 border-[color:var(--lightBackgroundGreyColor)] rounded-md text-gray-400`}>
            <div className='col-span-2 sm:col-span-1'>
            <CommonFormTextInput
              id="editedTitle"
              value={'Abu Dabi'}
              onChange={(e) => e.target.value}
              className="text-md sm:text-xl bg-white text-[color:var(--mainTitleColor)] font-semibold hover:ring-1 ring-current rounded-md"
              placeholder='Abu Dabi'
              title='Project Location'
              
            />
            </div>
            <div className='col-span-2 sm:col-span-1'>
            <CommonFormTextInput
              id="editedTitle"
              value={'Main Contractor Name'}
              onChange={(e) => e.target.value}
              className="text-md sm:text-xl bg-white text-[color:var(--mainTitleColor)] font-semibold hover:ring-1 ring-current rounded-md"
              placeholder='Main Contractor'
              title={'Main Contractor Name'}
            /></div>
            <div className='col-span-2 sm:col-span-1'>
            <CommonFormTextInput
              id="editedTitle"
              value={'Sub Contractor Name'}
              onChange={(e) => e.target.value}
              className="text-md sm:text-xl bg-white text-[color:var(--mainTitleColor)] font-semibold hover:ring-1 ring-current rounded-md"
              placeholder='Sub COntractor'
              title={'Sub Contractor Name'}
            /></div>
            <div className='col-span-2 sm:col-span-1'>
            <CommonFormTextInput
              id="editedTitle"
              value={'Client Name'}
              onChange={(e) => e.target.value}
              className="text-md sm:text-xl bg-white text-[color:var(--mainTitleColor)] font-semibold hover:ring-1 ring-current rounded-md"
              placeholder='Client name'
              title={'Client Name'}
            /></div>
            <div className='col-span-2'>
            <CommonButtonSolidBlue className='w-full bg-[color:var(--primaryColor)]' text='save'/>
            </div>
            </div>
        </div>

      </div>
      <div className=''>
            <CommonprojectMobile who={data.name}  profileLink={'/context/dashboard/TabMenu/projects/projectProfile'} DocumentsLink={'/context/dashboard/TabMenu/projects/projectDocuments'} TeamsLink={'/context/dashboard/TabMenu/teams'} ExpensesLink={'/context/dashboard/TabMenu/projects/projectExpenses'}/>
          </div> */}


    </div>
  
  );
};

export default Sub_Contractor;
