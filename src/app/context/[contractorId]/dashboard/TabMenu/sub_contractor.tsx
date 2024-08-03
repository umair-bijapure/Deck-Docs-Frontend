'use client';
import React, { useEffect, useState } from 'react';

import { CommonGridRows } from '@/app/components/common/grids';

import SearchComponent from '@/app/context/search';
import {  CommonAddButton } from '@/app/components/common/buttons';

import { CommonSectionTitle } from '@/app/components/common/bannersAndheadings';




import axios from 'axios';

import CreateOrganisationForm from './createOrgnisation/page';
import { faBuilding, faHandshake, faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import { fetchChildOranisations } from '@/app/components/utils/fetches';
import CreateOrganisationUser from './createOrgnisation/createOrganisationUser/page';
export interface ContractorsTabProps {
  contractorId: string;

  onEmployeeAdded: (id: string) => void;
}
const SubContractor: React.FC<ContractorsTabProps> = ({ contractorId,  onEmployeeAdded }) => {

  const [showForm,setShowForm]=useState(false);
  const [showOrganisationUserForm,setShowOrganisationUserForm]=useState(false);

  const [sub_contractors, setSubcontractors] = useState<any>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

  
  const fetchSubContractors = async (contractorId: string) => {
    try {
      const subContractors = await fetchChildOranisations();
      console.log("Sub Contractors:", subContractors);
      setSubcontractors(subContractors.data);
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
  

  const handleSearch = (results: any[]) => {
    setFilteredEmployees(results);
  };

  return (
    <div className='flex-col w-screen sm:w-full h-screen bg-white rounded-t-2xl'> 
     {showForm &&
      (
      // <RegisterContractor profileType='contractor_company' contractorId={contractorId} onEmployeeAdded={(id: string) => onEmployeeAdded(id)} onClick={() => setShowForm(false)} />
      <CreateOrganisationForm parentOrganisationId={contractorId} onClick={() => setShowForm(false)} />
      )}
            {showOrganisationUserForm && (<CreateOrganisationUser profileType='employee' contractorId={contractorId} onEmployeeAdded={fetchSubContractors} onClick={() => setShowOrganisationUserForm(false)} />)}

     {!showForm && !showOrganisationUserForm &&
     <div>
             
          <div>         
        <div className='pl-4 pr-4 flex justify-between items-center bg-[color:var(--lightBackgroundGreyColor)] rounded-t-2xl'>
            
            <CommonSectionTitle title="All Subcontractors/ Organisarions" titleColor={""} fontSize={""}/>
            <div className='p-2' onClick={() => setShowForm(true)}>
                <CommonAddButton
                  icon={faPersonBooth}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Add Organisation/C"
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />

              </div>
              <div className='p-2' onClick={() => setShowOrganisationUserForm(true)}>
                <CommonAddButton
                  icon={faPersonBooth}
                  color="color:var(--mainTitleColor)" // Add your desired color here
                  title="Add Organisation User"
                  width={20}
                  height={20}
                  className='shadow-md cursor-pointer hover:scale-105 duration-300'
                />

              </div>
        </div>
        <div>
        <SearchComponent onSearch={handleSearch} employees={sub_contractors} />
        </div>
        </div>

        <div className='text-[color:var(--mainTitleColor)] mb-16 p-2'>  
          {/* <CommonGridRows rows={1} columns={7} items={items}/> */}
          <CommonGridRows
              
              profileType={'contractor'}
              rows={1}
              columns={7}
              items={filteredEmployees.length > 0 ? filteredEmployees : sub_contractors}
              contractorId={contractorId} onProfileActive={function (): void {
                throw new Error('Function not implemented.');
              } }            />
        </div>
        </div>}
    </div>
  );
};


export default SubContractor