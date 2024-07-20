// components/CalendarComponent.tsx

import { FunctionComponent, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { checkIfDateStringIncludesADate } from '../utils/utils';
interface CalendarComponentProps {
  heading: string;
//   calendarAvailability: any[]; // Change the type to match your data
//   selectedDate: string | null; // Change the type to match your data
//   setSelectedDate: (date: string | null) => void;
//   removeDate: (date: string) => void;
//   addDate: (date: string) => void;
}

const CalendarComponent: FunctionComponent<CalendarComponentProps> = ({
  heading,
//   calendarAvailability,
//   selectedDate,
//   setSelectedDate,
//   removeDate,
//   addDate,
}) => {
    const currentDate = new Date();
    
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [calendarAvailability, setCalendarAvailability] = useState<any[]>([]);
    const [showScreen, setShowScreen] = useState(true);
    

    const getStoreData = async() => {
        // const response = await axios.get(`https://api.kuickplan.com/api/stores/${username}`);
        // setUserData(response.data);
        // setCalendarAvailability(response.data['calendarAvailability'])
        setShowScreen(true);
      }
    
      useEffect(()=>{
        getStoreData();
      }, []);
  
      const updateCalendarAvailability = async(newData:any) => {
        try{
          // // const response = await axios.put(`https://api.kuickplan.com/api/stores/${username}`, {calendarAvailability:dateObjectArrayToStringArray(newData)}, 
          // {
          //   headers: {
          //     'Content-Type': "application/json"
          //   }
          // });
          // toast("Calendar Updated Successfully!");
          getStoreData();
        }catch(e){
          // toast("Error Updating Image");
        }
      }
  
      const addDate = async(date:Date) => {
        const newData = [...calendarAvailability, date.toString()];
        setCalendarAvailability(newData);
        await updateCalendarAvailability(newData);
      }
      const removeDate = async(date:Date) => {
        const dtString = date.toString();
        const newData = calendarAvailability.filter((val, i)=>{
          if(val == dtString){
            return false;
          }
          return true;
        });
        setCalendarAvailability(newData);
        await updateCalendarAvailability(newData);
      }
      const getMinDate = () => {
        const today = new Date();
        return today;
      };
    
      const getMaxDate = () => {
        const today = new Date();
        // let maxDate = new Date();
        // // Upto 3 months from today
        // maxDate.setMonth( today.getMonth() + 3 );
        // return maxDate;
        return today;
      };
    

  return (
    <div className="-z-30">
      <h1>{heading}</h1>
      {/* Render your Calendar here */}
      {/* You can reuse the existing code for Calendar */}
      {/* Replace occurrences of calendarAvailability, selectedDate, etc., with the corresponding prop names */}
      <Calendar className="mx-auto z-20 " tileClassName={({ date }:{date:any}) => {
          if(checkIfDateStringIncludesADate(calendarAvailability, date)){
            return "calendar-highlight"
          }
          return ""
        }}
         maxDate={getMaxDate()} onChange={(e:any)=>setSelectedDate(e)} />
        {selectedDate ? <div className='flex flex-row justify-center mx-auto my-6 align-middle '>
          <div className='mx-6 my-2 '>
            {checkIfDateStringIncludesADate(calendarAvailability, selectedDate) ? <div className='p-2 rounded-sm text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>Unavailable</div> : <div className='p-2 rounded-sm text-lg font-semibold bg-[color:var(--primaryPink)] text-[color:var(--textFieldBackground)]'>Available</div> }
          </div>
          <div className='mx-6 my-2 '>
            {checkIfDateStringIncludesADate(calendarAvailability, selectedDate) ? <button onClick={(e)=>{
              removeDate(selectedDate);
              }} className='p-2 shadow-lg rounded-lg text-lg font-semibold bg-[color:var(--primaryPink)] text-[color:var(--textFieldBackground)]'>Mark as Available</button> : <button onClick={(e)=>{
                addDate(selectedDate);
                }} className='p-2 shadow-lg rounded-lg text-lg font-semibold bg-[color:var(--textColor)] text-[color:var(--textFieldBackground)]'>Mark as Unavailable</button> }
          </div>
        </div>: <></> }
      
    </div>
  );
};

export default CalendarComponent;
