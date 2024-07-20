import React, { useState } from 'react';
import { CommonFormTextInput, CommonInput } from './common/inputs';
import { CommonButtonSolidBlue } from './common/buttons';
import Calendar from 'react-calendar';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from './common/collapsible';
import { CommonUserCard } from './common/bannersAndheadings';
import { checkIfDateStringIncludesADate, dateObjectArrayToStringArray } from './utils/utils';

import axios from 'axios';
import { CommonSpinner, DangerNotification, SuccessNotification } from './common/notifications';


interface AttendanceProps {
  editedTitle: string;
  locationValue: string;
  mainContractorValue: string;
  subContractorValue: string;
  clientNameValue: string;
  profileType?:string;
  onSave: () => void;
  attendance?:any[];
  team?:string[];
  phone_no?:string;
  employees?:{
    _id:string,//compulsory
    profile_picture?:string,//compulsory
    first_name?:string;//compulsory
    createdAt?:Date;//compulsory
    fathers_name?:string;
    last_name?:string;
    birth_date?:string;
    phone_no?:string;
    attendance?:[];
  
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
  
}

export const CommonAttendance: React.FC<AttendanceProps> = ({
  editedTitle,
  locationValue,
  mainContractorValue,
  subContractorValue,
  clientNameValue,
  onSave,
  attendance=[],
  profileType,
  team,
  phone_no,
  employees
}) => {
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInputVisible, setInputVisible] = useState(false);
  const [calendarAvailability, setCalendarAvailability] = useState<any[]>(attendance);
  const [showList, setShowList] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  

  const updateCalendarAvailability = async(newData:any) => {
    try{
      const response = await axios.put(`http://localhost:5000/api/user/${phone_no}`, {attendance:dateObjectArrayToStringArray(newData)}, {
        headers: {
          'Content-Type': "application/json"
        }
      });
      setMessage("Calendar Updated Successfully!");
      //getStoreData();
    }catch(e){
      setMessage("Error Updating Image");
    }
  }
  const handleDateChange = (newDateRange: any, event: any) => {
    setDateRange({ start: newDateRange[0], end: newDateRange[1] });
  };
  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };
  const getMinDate = () => {
    const today = new Date();
    return today;
  };

  const getMaxDate = () => {
    const today = new Date();
    let maxDate = new Date();
    // Upto 3 months from today
    maxDate.setMonth( today.getMonth() + 3 );
    return maxDate;
  };
  const addDate = async (date: Date) => {
    const newData = [...calendarAvailability, date.toString()];
  
    // Update the state only after the asynchronous operation is complete
    try {
      await updateCalendarAvailability(newData);
      setCalendarAvailability(newData);
    } catch (error) {
      // Handle the error if needed
      console.error("Error updating calendar availability:", error);
    }
  };
  
  const removeDate = async (date: Date) => {
    const dtString = date.toString();
    const newData = calendarAvailability.filter((val) => val !== dtString);
  
    // Update the state only after the asynchronous operation is complete
    try {
      await updateCalendarAvailability(newData);
      setCalendarAvailability(newData);
    } catch (error) {
      // Handle the error if needed
      console.error("Error updating calendar availability:", error);
    }
  };
  
console.warn(profileType,attendance,"{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{[[[[[[[[[")
  return (
    <>
            {errorMessage.length > 0 ? 
        <DangerNotification message={errorMessage} />
        : <></>}
      {message.length > 0 ? 
        <SuccessNotification  message={message} />
        : <></>}
        {showLoader ? <div className='mx-auto flex flex-col align-middle items-center mt-[-20px] justify-center'>
            <CommonSpinner/>
      </div> : <></>}
   
    <div className='h-[580px] overflow-y-scroll sm:flex justify-center gap-x-4  mt-10 no-scrollbar' >

        <div className="flex flex-col items-center justify-between overflow-y-scroll no-scrollbar overflow-x-scroll  content-start gap-y-2 gap-x-4 md:gap-x-6 md:gap-y-4  px-2 sm:px-4 py-2 w-ful rounded-md text-gray-400">

                {/* <CollapsibleComponent expanded={true} leftIcon={"Regular Attendance"} > */}
                <div className="hidden sm:block calendar-container overflow-x-scroll no-scrollbar ">
                <Calendar
                  className="mx-auto"
                  tileClassName={({ date }: { date: any }) => {
                    const dateString = date.toDateString();
                    const isHighlighted = checkIfDateStringIncludesADate(calendarAvailability, dateString);

                    // Add the styles directly based on the highlighted condition
                    const tileStyles = isHighlighted
                      ? 'react-calendar__tile--active bg-[color:var(--primaryPink)] text-white' // Adjust based on your Tailwind setup
                      : '';

                    return `react-calendar__tile ${tileStyles}`;
                  }}
                  minDate={getMinDate()}
                  maxDate={getMaxDate()}
                  onChange={(e: any) => setSelectedDate(e)}
                />
        
        {selectedDate ? <div className='my-6 flex flex-row align-middle justify-center mx-auto'>
          {/* <div className='mx-6 my-2'>
            {checkIfDateStringIncludesADate(attendance, selectedDate) ? <p className='p-2 rounded-sm text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>Absent</p> : <p className='p-2 rounded-sm text-lg font-semibold bg-[color:var(--primaryPink)] text-[color:var(--textFieldBackground)]'>Present</p> }
          </div> */}
          <div className='flex-col mx-6 my-2'>
            {checkIfDateStringIncludesADate(attendance, selectedDate) ? <button onClick={(e)=>{
              removeDate(selectedDate);
              }} className='p-2 shadow-lg m-10 rounded-lg text-lg font-semibold bg-[color:var(--primaryPink)] text-[color:var(--textFieldBackground)]'>Mark as Present</button> : <button onClick={(e)=>{
                addDate(selectedDate);
                }} className='p-2 shadow-lg  m-10 rounded-lg text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>Mark as Absent</button> }
          </div>
        </div>: <></> }

                  </div>
                {/* </CollapsibleComponent> */}
                <div className='sm:hidden'>
                  <CollapsibleComponent expanded={true} leftIcon={"Attendance"} >
                    <div className="calendar-container overflow-x-scroll  ">
                        <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        onClickDay={() => setShowList('Attendance')}
                      
                        />
                      </div>
                   </CollapsibleComponent>
                </div>
              
              {showList!==''&& profileType==='project' &&
                <div className='sm:hidden w-full border-2 h-[200px] sm:h-[400px] sm:w-[300px] overflow-y-scroll '  onClick={toggleInput}>
                  <p className='flex justify-center'>{showList}</p>

                  {employees?.map((employee, index) => (
                        <div className="flex items-center" key={index}>
                          {/* Check if the current employee ID is in the team array */}
                          {/* {project_name && employee.current_projects?.some(project => project === project_name) ? ( */}
                          {team?.some(id=>id===employee._id) && (
                            <>
                              <CommonUserCard
                                circleColor={""}
                                employeeImage={employee.profile_picture || '/default-user-profile.png'}
                                employeeName={employee.first_name || ''}
                                userDetailsPath={""}
                                position={employee.position || 'Employee'}
                              />
                            
                            </>
                          )}
                        </div>
                      ))}
                    
                </div>}
               


        </div>
        <div>

        { profileType==='project'? 
            <div className='hidden sm:block w-full border-2 h-[200px] sm:h-[460px]  grid-cols-2 overflow-y-scroll m-2'  onClick={()=>toggleInput()}>
                  <div className='grid grid-cols-2'>
                  {employees?.map((employee, index) => (
                        <div className="flex items-center" key={index}>
                          {/* Check if the current employee ID is in the team array */}
                          {/* {project_name && employee.current_projects?.some(project => project === project_name) ? ( */}
                          {team?.some(id=>id===employee._id) && (
                            <>
                              <CommonUserCard
                                circleColor={""}
                                employeeImage={employee.profile_picture || '/default-user-profile.png'}
                                employeeName={employee.first_name || ''}
                                userDetailsPath={""}
                                position={employee.position || 'Employee'}
                              />
                            
                            </>
                          )}
                        </div>
                      ))}
                  </div>
            </div>
            :
            <div className=''>
            
                          <CommonInput label='Site..'/>
         
                        <div className='grid grid-cols-2 gap-x-2 '>
                            
                            <CommonInput label='bonus'/>
                            <CommonInput label='Regular Hours..'/>
                            <CommonInput label='Holiday Hours'/>
                            <CommonInput label='Absent Hours'/>
                            <CommonInput label='Sick Hours'/>
                            <CommonInput label='125% Overtime'/>
                            <CommonInput label='150% Overtime'/>
                            <CommonInput label='200% Overtime'/>
                        </div>

                      </div>

            }
            {isInputVisible && (
            <div className='m-6 max-lg:w-[90vw] flex flex-col align-middle justify-center mx-auto text-center shadow-2xl floating-menu-content '>
              <p className='flex justify-end m-2' onClick={()=>setInputVisible(false)}>X</p>
                            <CommonInput label='Site..'/>
           
                          <div className='grid grid-cols-2 gap-x-2 '>
                              
                              <CommonInput label='bonus'/>
                              <CommonInput label='Regular Hours..'/>
                              <CommonInput label='Holiday Hours'/>
                              <CommonInput label='Absent Hours'/>
                              <CommonInput label='Sick Hours'/>
                              <CommonInput label='125% Overtime'/>
                              <CommonInput label='150% Overtime'/>
                              <CommonInput label='200% Overtime'/>
                          </div>
                          




                        </div>
                        )}

        </div>
      
   </div>
   </>
  );
};


