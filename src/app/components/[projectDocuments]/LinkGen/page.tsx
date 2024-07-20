'use client';
import React, { useEffect, useRef, useState } from 'react';

import { CircularButton, CommonButton } from '@/app/components/common/buttons';
import FolderStructure, { Folder } from './FolderStructure';
import axios from 'axios';
import { useSearchParams,useParams } from 'next/navigation';


const skills=['Drawings','Reports','Certificates','Contracts']

interface ProjectDocumentsProps {
  project_name?: string; // Define the type of prop you want to pass
  contractorId?:string;
  recieved_folders?:string[];
}


const ProjectDocuments= (props: any): JSX.Element => {

 // Call useParams() to get access to the query parameters
 const {contractorId}= props as ProjectDocumentsProps
 const {recieved_folders}= props as ProjectDocumentsProps
 const searchParams = useParams();

 // Extract the query parameter value from the projectDocuments key
 const queryString = searchParams.projectDocuments;
 let uniqueIdentifier = '';
 let folderId = '';
 let project_name2 = '';
 // Ensure queryString is a string
 if (typeof queryString === 'string') {
   // Split the queryString into an array of individual parameters
   const paramsArray = queryString.split('%20');

   // Extract uniqueIdentifier and folderId from paramsArray



   // Iterate through paramsArray to find uniqueIdentifier and folderId
   paramsArray.forEach(param => {
     const [key, value] = param.split('%3D');
     if (key === 'uniqueIdentifier') {
       uniqueIdentifier = decodeURIComponent(value);
     } else if (key === 'folderId') {
       folderId = decodeURIComponent(value);
     }else if (key === 'projectId') {
      project_name2 = decodeURIComponent(value);
    }
   });

   console.warn(searchParams, uniqueIdentifier, folderId, project_name2,recieved_folders);
 } else {
   console.error('QueryString is not a string:', queryString);
 }
  return (
    <div className='sm:mt-4 w-full p-[-2px] ' >
        {/* <div className='flex h-auto items-start p-2 '>
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                  <div className="flex flex-nowrap justify-center hide-scroll-bar">
                    { skills.map((status, index) => (
                      <div className="inline-block px-1 bsm:px-6" key={index}>
                        <div className="px-3 flex justify-center items-center inline-block h-8 bsm:h-10 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out whitespace-nowrap">
                          {status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>      
          </div> */}
        
        <div className='bg-gray-50 rounded-xl shadow-md p-4'>
            {/* <h1 className='text-[color:var(--primaryColor)]'>Add Documents</h1> */}
            <FolderStructure parentFolderId={folderId} project_name={project_name2} contractorId={contractorId} recieved_folders={recieved_folders} />
        </div>

  </div>
  );
};

export default ProjectDocuments;



