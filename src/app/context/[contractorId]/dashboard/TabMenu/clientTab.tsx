'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CommonGridRows } from '@/app/components/common/grids';
import { FaCog, FaFile, FaUsers } from 'react-icons/fa';
import SearchComponent from '../../../search';
import { CircularButton, CommonAddButton } from '@/app/components/common/buttons';
import { useMyContext } from '@/app/Context';
import { CommonIcon } from '@/app/components/common/icons';
import { CommonHeading, CommonSectionTitle } from '@/app/components/common/bannersAndheadings';

import axios from 'axios';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';


const ClientTab: React.FC  <{ contractorId: string}> =({contractorId})=>{
    const { data, setData } = useMyContext();
    const [showForm,setShowForm]=useState(false);
    const [clients, setClients] = useState<any>([]);
    const [showSearch, setShowSearch] = useState(true);
    const getData = async () => {
      const response = await axios.get(`http://localhost:5000/api/user/clients/${contractorId}`);
      const respData = response.data;
      
      setClients(respData);
    };
    
    useEffect(() => {
      getData();
    }, []);
    const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
    const handlesearchbar = () => {
      setShowSearch(!showSearch)
    };
    const handleSearch = (results: any[]) => {
      setFilteredEmployees(results);
    };
    

  return (
    <div className='flex-col w-screen sm:w-full bg-white h-screen rounded-t-2xl'> 
         {/* {showForm &&(<AddEmployee profileType='client' contractorId={contractorId} onEmployeeAdded={(id:string)=>getData()} onClick={()=>setShowForm(false)}/>)} */}
     {!showForm &&
     <div>  
           
          <div>       
        <div className='pl-4 pr-4 flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)] rounded-t-2xl'>
            
            <CommonSectionTitle title="ALL CLIENTS" titleColor={""} fontSize={""}/>
            <div className='' onClick={()=>setShowForm(true)}>
              <CommonAddButton
                      icon={faHandshake}
                      // href="/context/dashboard/TabMenu/addUser"
                      color="color:var(--mainTitleColor)" // Add your desired color here
                      title=""
                      width={20}
                      height={20}
                      className=''
              />
              </div>
        </div>
        <div>
          search here
           {/* <SearchComponent/> */}
        </div>
        </div>

        <div className='text-[color:var(--mainTitleColor)] mb-16 p-2'>  
        <CommonGridRows profileType='client' rows={1} columns={7} items={clients} contractorId={contractorId}
                    onProfileActive={()=>handlesearchbar()}
                    onProfileUpdate={()=>getData}
        />
        </div>
        </div>}
    </div>
  );
};

export default ClientTab;
