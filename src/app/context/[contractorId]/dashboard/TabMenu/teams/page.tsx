'use client';
import React from 'react';

import Link from 'next/link';
import { CommonGridItemEmployee } from '@/app/components/common/gridItems';
import { CommonGridRows } from '@/app/components/common/grids';
import { FaCog, FaFile, FaUsers } from 'react-icons/fa';
import SearchComponent from '@/app/context/search';
import { CircularButton, CommonAddButton } from '@/app/components/common/buttons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const EmployeeTab: React.FC = () => {
  
    const items = [
        {
          onItemClick: 'click-1',
          color: 'red-500',
          size: '1',
          content: <FaFile />,
          reference: '/context/dashboard/TabMenu/documentsProfile',
          image: "/default-user-profile.png",
          width: 30,
          height: 20,
          heading: 'Heading 1',
          text: 'Some text for item 1',
          name: 'John Doe',
          Qualification: 'Ph.D.',
          Experiance: '5 years',
          Designation: 'Software Engineer',
          Ratings: '4.5',
        },
        {
          onItemClick: 'click-2',
          color: 'blue-500',
          size: '1',
          content: <FaUsers />,
          reference: '/link-2',
          image: "/default-user-profile.png",
          width: 30,
          height: 20,
          heading: 'Heading 2',
          text: 'Some text for item 2',
          name: 'Jane Smith',
          Qualification: 'M.Sc.',
          Experiance: '8 years',
          Designation: 'Data Scientist',
          Ratings: '4.8',
        },
        {
          onItemClick: 'click-3',
          color: 'blue-500',
          size: '1',
          content: <FaCog />,
          reference: '/link-3',
          image: "/default-user-profile.png",
          width: 30,
          height: 20,
          heading: 'Heading 3',
          text: 'Some text for item 3',
          name: 'Alex Johnson',
          Qualification: 'B.E.',
          Experiance: '3 years',
          Designation: 'Web Developer',
          Ratings: '4.2',
        },
        // ... add more items as needed
      ];

  return (
    <div className='flex-col w-screen bg-white mt-12'>
        <div className='pl-4 pr-4 flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)]'>
            <p className=' m-2 font-semibold text-[color:var(--mainTitleColor)] opacity-60 text-xl sm:p-4'>Project 1 Team </p>
              <CommonAddButton
                      icon={faUser}
                      href="/context/dashboard/TabMenu/addUser"
                      color="color:var(--mainTitleColor)" // Add your desired color here
                      title=""
                      width={20}
                      height={20}
                      className=''
              />
        </div>
        {/* <div>
           <SearchComponent onSearch={function (results: Employee[]): void {
          throw new Error('Function not implemented.');
        } } employees={[]}/>
        </div> */}
           
        {/* <div className='text-[color:var(--mainTitleColor)] mb-16'>
          
          <CommonGridRows rows={1} columns={7} items={items}
                />
          
        </div> */}
     </div>
  );
};

export default EmployeeTab;
