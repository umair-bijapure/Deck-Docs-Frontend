
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CommonTabs from '@/app/components/common/tabs';
import DashboardPage from './TabMenu/page';

import styled from "styled-components";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getLoggedInRole, getLoggedInUserData, isUserLoggedIn } from '@/app/components/utils/utils';
import { SmallScreenDashboard } from './smallScreenDashboard';
import axios from 'axios';

  const OrganisationHome: React.FC = () => {

  const loggedInUserData = getLoggedInUserData();
  const username = loggedInUserData ? loggedInUserData['identifier'] : '';
  const organisationId = loggedInUserData && loggedInUserData['profile'] ? loggedInUserData['profile'].organisation_id : null;






  const gridItems = [
    {name: 'Teams & Employees', size: '', 
    content:
    <DashboardPage
    username={username}
    organisationId={organisationId}
    />
    , reference: `/context/${encodeURIComponent(username)}/dashboard/TabMenu/`, image: '/dossier.png',width:60,height:40,heading:'Teams',text:'Teams, Documents, Projects',textcolor:'text-white'},
    // {name: 'Attendance and Salary', size: '', content:<DashboardPageHr children={undefined}/>, reference: '/pages/dashboard/HR/', image: '/teams.png',width:60,height:40,heading:'Attendance',text:'Employee Details, Attendance',textcolor:'text-[color:var(--mainTitleColor)]'   },

    // {name: 'Permits', size: '', content: '', reference: '', image: '/expenditure.png',width:60,height:30,heading:'Permits',text:'Access, Admin Panel, Security',textcolor:'text-white'   },
  ];

  
  
  const advertisements = [
    { id: 1, text: 'Hi!, Welcome Ahmad Khan!!', imageUrl: '/ad1.jpg' },
    { id: 2, text: 'Store Employee Documents', imageUrl: '/ad2.jpg' },
    { id: 3, text: 'Generate Salary Slips', imageUrl: '/ad3.jpg' },
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 1000); // Adjust the interval as needed (3 seconds in this example)

    return () => {
      clearInterval(interval);
    };
  }, []);

const router = useRouter();


useEffect(()=>{
  if(!isUserLoggedIn()){
    router.push("/");
  }
  if(getLoggedInRole() != "contractor_company"){
    router.push("/");
  }
}, [router])


  return (
    
    <div className=' z-10 sm:bg-none bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 '>
        <div className='hidden sm:flex vsm:mx-auto bsm:bg-none sm:justify-center z-10'> 
          {/* <CommonTabs
            tabs={gridItems}  
            contractorId={contractorId}
             /> */}
                <DashboardPage
                  username={username}
                  organisationId={organisationId}

                  />
        </div>
        {/* <div className='sm:hidden'>
          <SmallScreenDashboard gridItems={gridItems} />
        </div> */}
    </div> 
  );
};

export default OrganisationHome;
