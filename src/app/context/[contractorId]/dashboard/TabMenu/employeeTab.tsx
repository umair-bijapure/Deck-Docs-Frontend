// 'use client';
// import React, { useState } from 'react';
// import {CommonGridRows } from '@/app/components/common/grids';
// import SearchComponent from '../../../search';
// import { CommonAddButton } from '@/app/components/common/buttons';
// import { AddEmployee } from './addUser/page';
// import {CommonSectionTitle } from '@/app/components/common/bannersAndheadings';
// import { useMyContext } from '@/app/Context';

// export const EmployeeTab: React.FC<{ contractorId: string,employees:any ,onEmployeeAdded: (id: string)  => void}> =  ({ contractorId,employees,onEmployeeAdded}) => {
//   const { data, setData } = useMyContext();
//   const [showForm,setShowForm]=useState(false);

//   if (!data) {
//       return <p>Loading...</p>;
//   }

//   return (
//     <div className='flex-col w-screen sm:w-full bg-white rounded-t-2xl h-screen no-scrollbar '> 
//      {showForm && (<AddEmployee profileType='employee' contractorId={contractorId} onEmployeeAdded={(id:string)=>onEmployeeAdded(id)} onClick={()=>setShowForm(false)}/>)}   
//      {!showForm &&
//      <div>  
//       <div>
//         <div className=' flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)] rounded-t-2xl'  >
            
//             <CommonSectionTitle title="ALL EMPLOYEES" titleColor={""} fontSize={""}/>
//             <div className='' onClick={()=>setShowForm(true)}>
//               <CommonAddButton
//                       icon="/default-user-profile.png"
                      
//                       color="color:var(--mainTitleColor)" // Add your desired color here
//                       title=""
//                       width={20}
//                       height={20}
//                       className=''
                     
//               />
//               </div>
//         </div>
//         <div>
//            <SearchComponent/>
//         </div>
//         </div>   
//         <div className='text-[color:var(--mainTitleColor)] mb-16 p-2 no-scrollbar '>  
//           <CommonGridRows onEmployeeAdded={(id:string)=>onEmployeeAdded(id)} profileType='employee' rows={1} columns={7} items={employees} contractorId={contractorId}/>
//         </div>
//          </div>}
//     </div>
//   );
// };

'use client';
import React, { useEffect, useState } from 'react';
import { CommonGridRows } from '@/app/components/common/grids';
import SearchComponent from '../../../search';
import { CommonAddButton } from '@/app/components/common/buttons';

import { CommonSectionTitle } from '@/app/components/common/bannersAndheadings';
import { useMyContext } from '@/app/Context';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CommonAttendance from '@/app/components/CommonAttendance';
import { fetchOrganisationUsers } from '@/app/components/utils/fetches';
import AddEmployee from './addUser/page';
interface EmployeeTabProps {
  organisationId: string;
  employees: any[];
  contractorId:string
  onEmployeeAdded?: (id: string) => void;
}

const EmployeeTab: React.FC<EmployeeTabProps> = ({ organisationId, contractorId,onEmployeeAdded}) => {
 
  const { data, setData } = useMyContext();
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const [showAttendance, setShowAttendance] = useState(false);
  const [employees, setEmployees] = useState<any>([]);
  const fetchUsers = async (contractorId: string) => {
    try {
      const subContractors = await fetchOrganisationUsers();
      console.warn("Sub Contractors:", subContractors);
      setEmployees(subContractors.data);
      return subContractors;
    } catch (error) {
      console.error("Error fetching sub contractors:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    if (contractorId) {
      fetchUsers(contractorId);
      onEmployeeAdded
    }
  }, [contractorId]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

  if (!data) {
    return <p>Loading...</p>;
  }
  const handlesearchbar = () => {
    setShowSearch(!showSearch)
  };
  const handleSearch = (results: any[]) => {
    setFilteredEmployees(results);
  };


  return (
    <div className='flex-col w-screen sm:w-full bg-white rounded-t-2xl h-screen no-scrollbar '>
      {showForm && (<AddEmployee profileType='employee' contractorId={organisationId} onEmployeeAdded={fetchUsers} onClick={() => setShowForm(false)} />)}

      {!showForm &&
        <div>
          <div>
            <div className=' flex justify-between items-center rounded-t-2xl'  >
              <CommonSectionTitle title="All Employees" titleColor={""} fontSize={""} />
              <div className='p-2' onClick={() => setShowForm(true)}>
                <CommonAddButton
                  icon={faUserPlus}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Add"
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />

              </div>
 
            </div>
            {showSearch &&
            <div >
              <SearchComponent onSearch={handleSearch} employees={employees} />
            </div>}
          </div>
          <div className='text-[color:var(--mainTitleColor)] mb-16 p-2 no-scrollbar '>
            <CommonGridRows
              // onEmployeeAdded={(id: string) => onEmployeeAdded(id)}
              profileType='employee'
              rows={1}
              columns={7}
              items={filteredEmployees.length > 0 ? filteredEmployees : employees}
              contractorId={contractorId}
              onProfileActive={()=>handlesearchbar()}
              onProfileUpdate={()=>fetchUsers}
            />
          </div>
        </div>}
    </div>
  );
};

export default EmployeeTab;
