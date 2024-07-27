import React, { useEffect, useState } from 'react';
import { CommonFormTextInput, CommonInput } from './common/inputs';
import { CommonButtonSolidBlue } from './common/buttons';
import Calendar from 'react-calendar';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from './common/collapsible';
import { CommonUserCard } from './common/bannersAndheadings';
import { checkIfDateStringIncludesADate, dateObjectArrayToStringArray } from './utils/utils';

import axios from 'axios';
import { CommonSpinner, DangerNotification, SuccessNotification } from './common/notifications';
interface Attendance {
  absences: number[];
  leaves: number[];
}

type CalendarTileProperties = {
  date: Date;
  view: string;
};
interface AttendanceData {
  absences: number[];
  leaves: number[];
}

type AttendanceMap = {
  [key: string]: AttendanceData;
};
interface AttendanceProps {
  editedTitle: string;
  locationValue: string;
  mainContractorValue: string;
  subContractorValue: string;
  clientNameValue: string;
  profileType?:string;
  onSave?: () => void;
  attendance: AttendanceMap;
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
    attendance: { [month: string]: Attendance };
  
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
  attendance = {},
  profileType,
  team,
  phone_no,
  employees
}) => {
  const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInputVisible, setInputVisible] = useState(false);
  const [calendarAvailability, setCalendarAvailability] = useState<AttendanceMap>({});

  const [showList, setShowList] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const transformedAttendance = transformAttendance(attendance);
    setCalendarAvailability(transformedAttendance);
  }, [attendance]);


  const transformAttendance = (attendance: AttendanceMap): { [key: string]: { absences: number[], leaves: number[] } } => {
    const result: { [key: string]: { absences: number[], leaves: number[] } } = {};
  
    Object.entries(attendance).forEach(([key, value]: [string, AttendanceData]) => {
      const [year, month, day] = key.split('-').map(Number);
      const baseDate = new Date(year, month - 1, day);
      const monthName = baseDate.toLocaleString('default', { month: 'short' });
  
      if (!result[monthName]) {
        result[monthName] = { absences: [], leaves: [] };
      }
  
      value.absences.forEach(absence => {
        result[monthName].absences.push(absence);
      });
  
      value.leaves.forEach(leave => {
        result[monthName].leaves.push(leave);
      });
    });
  
    return result;
  };
  
  
  
  const updateCalendarAvailability = async (newData: { [month: string]: { absences: number[]; leaves: number[] } }) => {
    try {
      const month = new Date().toLocaleString('default', { month: 'short' });
      
      await axios.put(`http://localhost:5000/api/user/${phone_no}/attendance`, {
        attendance: {
          [month]: newData[month] || { absences: [], leaves: [] }
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      setMessage('Calendar Updated Successfully!');
    } catch (e) {
      setMessage('Error Updating Calendar');
    }
  };
  
  
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
  const [attendanceStatus, setAttendanceStatus] = useState<'P' | 'A' | 'L'>('P');

const handleStatusChange = (status: 'P' | 'A' | 'L') => {
  setAttendanceStatus(status);
};
const tileClassName = ({ date }: { date: Date }) => {
  const dateString = date.toDateString();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  // Check if the month entry exists
  const monthData = calendarAvailability[month];
  if (monthData) {
    // Check if the date (day) is in absences or leaves
    const isHighlighted = monthData.absences.includes(day) || monthData.leaves.includes(day);
    return isHighlighted ? 'react-calendar__tile--active bg-[color:var(--primaryPink)] text-white' : '';
  }

  return '';
};


const addDate = async (date: Date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  // Create a copy of the current calendar availability
  const newData: AttendanceMap = { ...calendarAvailability };

  // Initialize the month entry if it does not exist
  if (!newData[month]) {
    newData[month] = { absences: [], leaves: [] };
  }

  // Update the attendance data based on the status
  if (attendanceStatus === 'A') {
    if (!newData[month].absences.includes(day)) {
      newData[month].absences.push(day);
    }
  } else if (attendanceStatus === 'L') {
    if (!newData[month].leaves.includes(day)) {
      newData[month].leaves.push(day);
    }
  } else if (attendanceStatus === 'P') {
    // Mark as present: Remove the date from absences and leaves if present
    newData[month].absences = newData[month].absences.filter(d => d !== day);
    newData[month].leaves = newData[month].leaves.filter(d => d !== day);
  }

  // Update the calendar availability
  try {
    await updateCalendarAvailability(newData);
    setCalendarAvailability(newData);
  } catch (error) {
    console.error('Error updating calendar availability:', error);
  }
};

const removeDate = async (date: Date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  // Create a copy of the current calendar availability
  const newData: AttendanceMap = { ...calendarAvailability };

  // Initialize the month entry if it does not exist
  if (!newData[month]) {
    newData[month] = { absences: [], leaves: [] };
  }

  // Remove the date from absences and leaves if present
  newData[month].absences = newData[month].absences.filter(d => d !== day);
  newData[month].leaves = newData[month].leaves.filter(d => d !== day);

  // Update the calendar availability
  try {
    await updateCalendarAvailability(newData);
    setCalendarAvailability(newData);
  } catch (error) {
    console.error('Error updating calendar availability:', error);
  }
};




  
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
              tileClassName={tileClassName}
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              onChange={(e: any) => setSelectedDate(e)}
            />
        
        {selectedDate && (
            <div className='my-6 flex flex-row align-middle justify-center mx-auto'>
              <div className='flex-col mx-6 my-2'>
                <button
                  onClick={() => handleStatusChange('A')}
                  className='p-2 shadow-lg m-10 rounded-lg text-lg font-semibold bg-[color:var(--primaryPink)] text-[color:var(--textFieldBackground)]'>
                  Mark as Absent
                </button>
                <button
                  onClick={() => handleStatusChange('L')}
                  className='p-2 shadow-lg m-10 rounded-lg text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>
                  Mark as Leave
                </button>
                <button
                  onClick={() => handleStatusChange('P')}
                  className='p-2 shadow-lg m-10 rounded-lg text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>
                  Mark as Present
                </button>
                <button
                  onClick={() => addDate(selectedDate)}
                  className='p-2 shadow-lg m-10 rounded-lg text-lg font-semibold bg-[color:var(--primaryGreen)] text-[color:var(--textFieldBackground)]'>
                  Apply Status
                </button>
              </div>
            </div>
          )}

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


