'use client';
import React,{ReactNode, useEffect, useState} from 'react';
import { CommonFormTextInput, CommonTextInput } from './inputs';
import { FaDownload, FaStar, FaTrash, FaUpload } from 'react-icons/fa';
import { CommonIcon } from './icons'; // Import the CommonIcon component
import { MyContextProvider, useMyContext } from '@/app/Context';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import Link from 'next/link';
import SearchComponent from '@/app/context/search';
import { Collapsible, CollapsibleComponent, CollapsibleItem } from './collapsible';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { checkIfDateStringIncludesADate } from '../utils/utils';
import CalendarComponent from './calendar';
import { CommonHeading } from './bannersAndheadings';
import { CommonButtonFileUploader } from './fileUploader';


import { AiOutlineDelete } from 'react-icons/ai';
import CommonSalary from '../salary';
interface CommonGridItemProps {
  color: string;
  size: string;
  content: ReactNode;
  // reference: string;
  index:string;
  onItemClick:string;
  image:string;
  width:number;
  height:number;
  // href:string;
  heading:string;
  text:string;
  textcolor:string,
}

export const CommonGridItem: React.FC<CommonGridItemProps> = ({
    color,
    size,
    content,
    // reference,
    index, // Pass the index as a prop
    onItemClick,
    image,
    width,
    height,
    // href,
    heading,
    text,
    textcolor,
  }) => {
  const bgColorClass = `${color}`;
//   const bgColorClass = `bg-${color}`;
//   const isExpanded = expandedItem === index;

  return (
<Link href={''}>
  <div className={`grid bsm:grid-cols-4 ${textcolor} vvsm:grid-cols-1 bsm:gap-x-[-20px] p-4 ${color} bsm:h-full w-full col-span-${size} rounded-t-xl bsm:rounded-md vvvsm:mt-6 vvsm:mt-6 vsm:mt-0 vsm:h-[100px] sm:h-[150px] md:h-[200px] break-all overflow-hidden shadow hover:shadow-lg hover:bg-primary-600 gap-y-10 border-spacing-10 bsm:border-spacing-0 border-4  bsm:border-0`}>
    {/* Render the image */}
    <div className='flex w-auto bsm:flex-none h-16 bsm:h-20 col-span-1 vsm:w-[50px] justify-center vsm:ml-[-10px] md:ml-[4px] sm:w-[80px]'>
        
        {image?
        <Image
        src={image}
        alt="/"
        width={width}
        height={height}
        className={`z-6 cursor-pointer w-[90px] h-[90px] md:w-[120px] lg:w-[140px]`}
        />:null}
    </div>
    <div className='md:w-[255px] sm:w-[200px] bsm:flex bsm:flex-col col-span-3 vvsm:col-span-1 justify-center vsm:w-[100px] vsm:p-2 bsm:ml-2 md:p-6'>
        
            <h1 className='hidden  vsm:flex vsm:text-[6px] text-[6px] bsm:text-[13px] sm:text-[17px] md:text-[20px] mb-3 '>{heading}</h1>
            <p className='flex  bsm:text-[8px] sm:text-[10px] md:text-[14px] bg-white bsm:bg-inherit text-[color:var(--mainTitleColor)] bsm:text-[color:var(--none)] p-2 rounded-full'>{text}</p>
    
    </div>

    {/* <a href={reference}>
      {content}
    </a> */}
  </div>
  <div className='bsm:hidden vvvsm:flex justify-center bg-[color:var(--lightBackgroundGreyColor)] bg-opacity-25 mb-6 rounded-b-xl h-10 items-center'>   
        <h1 className='text-xl text-[color:var(--mainTitleColor)] '>{heading}</h1>
</div>
</Link>
  );
};


interface CommonGridItemEmployeeProps {
    size: string;
    content: ReactNode;
    reference?: string;
    onItemClick?: string;
    image?: string;
    width?: number;
    height?: number;
    href?: string;
    heading?: string;
    text?: string;
    name?: string;
    Qualification?: string;
    Experiance?: string;
    Designation?: string;
    Ratings?: string;
    icon?: string;
  }
  
  export const CommonGridItemEmployee: React.FC<CommonGridItemEmployeeProps> = ({
    size,
    content,
    reference,
    onItemClick,
    image,
    width,
    height,
    href,
    heading,
    text,
    name,
    Qualification,
    Experiance,
    Designation,
    Ratings,
    icon,
    }) => {
    // const bgColorClass = `bg-${color}`;
  //   const isExpanded = expandedItem === index;
//   console.log(color,"kkkkkkkkkkkkkk")
    return (
    <div className={` col-span-${size} `}>
        <div>
            {content}
        </div>
    </div>
  
    );
  };



// another    
  interface GridItemProps {
    gridTemplateColumns:string;
    gridTemplateRows:string;
    profileType?:string;

      // href: string;
      id: string;
      image: string;
      first_name: ReactNode;
      last_name:ReactNode;
      qualification?: ReactNode;
      position?: ReactNode;
      experience?: ReactNode;
      ratings?: ReactNode;
      phone_no?: ReactNode ;
      isSelected?: boolean;
      profile_picture:string;
      hr?:string;
      createdAt?:Date;
      updatedAt?:Date;

      onDeleteClick?: () => void;
      children?:ReactNode;
      onClick?:()=>void;
    
  }
  
  const calculateAverageRating = (ratings: number[]): number => {
    if (ratings.length === 0) return 0;

    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating;
};

export const CommonGridItemRows: React.FC<GridItemProps> = ({gridTemplateColumns,gridTemplateRows,profileType,id,image,first_name,qualification,position,experience,ratings,phone_no,hr,createdAt,updatedAt,onDeleteClick,children,profile_picture,last_name}) => {
  const { data, setData } = useMyContext();

  const handleClick = () => {
    const newData = {
      
      name: name,
    };
  
    // Set the newData object in the context
    setData(newData);

  };
  const formattedDate = createdAt?  new Date(createdAt).toLocaleDateString('en-US'):''
  const formattedDateupdated = updatedAt?  new Date(updatedAt).toLocaleDateString('en-US'):''


    return (
  <div className='pl-2 pr-2 flex-col items-start m-1 bg-[color:var(--mainTitleLightestColor)] hover:scale-95 duration-100 hover:bg-[color:var(--lightBackgroundColor)] rounded-2xl cursor-pointer'>
<div className="flex flex-wrap justify-between">
  <Link href={''}>
    <div className="flex text-xl items-center justify-center text-[color:var(--mainTitleLightColor)] font-bold m-2">
      <p>{first_name} {last_name}</p>
    </div>
  </Link>
  {profileType === 'employee' && (
    <>
      <div className="flex items-center justify-center m-2">
        <p>{qualification || <span className="text-[12px] text-red-400">Qualification</span>}</p>
      </div>
      <div className="flex items-center justify-center m-2">
        <p>{experience || <span className="text-[12px] text-red-400">Experience</span>}</p>
      </div>
    </>
  )}
  <div className="flex items-center justify-center m-2">
    <p>{phone_no || <span className="text-[12px] text-red-400">Phone No</span>}</p>
  </div>
  <div className="flex items-center justify-center m-2">
    <div className="flex space-x-1 items-center">
      <p className='text-amber-400'>
        {Array.isArray(ratings) && ratings.length > 0 ? calculateAverageRating(ratings) : 0} {/* Display average rating */}
      </p>
      <p className="text-amber-400">
        <FaStar />
      </p>
    </div>
  </div>

  {children}
</div>
<div className='flex items-center justify-between text-[8px] text-gray-400 pl-2 pr-2'>
  <div className="flex items-center justify-start p-1 ">
  <p className="text-sm">{createdAt ? formattedDate : 'N/A'}</p>
</div>
<div className="flex items-center justify-start p-1 ">
  <p className="text-sm">{updatedAt ? formattedDateupdated : 'N/A'}</p>
</div>
</div>
</div>
    );
  };




 export const CommonGridItemCard: React.FC<GridItemProps> = ({id,image,first_name,qualification,position,experience,ratings,phone_no,hr }) => {
  const { data, setData } = useMyContext();

  const handleClick = () => {
    const newData = {
     
      name: name,
    };
  
    // Set the newData object in the context
    setData(newData);

  };

  
    return (
     
      <div className=" rounded-md shadow-md shadow-[color:var(--lightBackgroundGreyColor)] focus:outline-none transition-all hover:bg-[color:var(--mainTitleLightestColor)]">
        
        <div>
          <div className="bsm:hidden mt-[-10] p-2 bg-[color:var(--lightBackgroundGreyColor)]  rounded-t-md" onClick={handleClick}>
       
            <CommonIcon id={''} width={60} height={60} href={''} src={image} classNameI='rounded-full border-2 border-white shadow-md ' />
          
          </div>
        </div>



        <div className="bsm:flex justify-between m-4">
          <div className="vvvsm:mt-[-10px] vvsm:mt-[-8px] vvsm:flex justify-center">
            <p className="text-[color:var(--mainTitleColor)] font-semibold vvvsm:text-[14px] vvsm:text-[16px] vsm:text-[19px] bsm:text-[21px]">
              {first_name}
            </p>
          </div>
          <div className="hidden bsm:flex">
            <CommonIcon id={''} width={60} height={60} href={''} src={image} />
          </div>
        </div>


        <div className="mt-[-10px] vvvsm:mt-[-22px] vvsm:mt-[-18px] p-4 vvvsm:text-[11px] vvsm:text-[13px] vsm:text-[16px] bsm:text-[18px]">           
        {qualification?
        <div className="truncate w-full p-1 m-1 text-[color:var(--mainTitleColor)]">{qualification}</div>:""}
        {position?
        <div className="truncate w-full p-1 m-1 text-[color:var(--mainTitleColor)]">{position}</div>:""}
        {experience?
        <div className="truncate w-full  p-1 m-1 text-[color:var(--mainTitleColor)]">{experience}</div>:""}
        {phone_no?
        <div className="truncate w-full p-1 m-1 text-[color:var(--mainTitleColor)]">{phone_no}</div>:""}
        </div>
        <div className="flex p-4 justify-between mt-[-10px] vvvsm:mt-[-20px] vvsm:mt-[-18px] vvvsm:text-[11px] vvsm:text-[13px] vsm:text-[16px] bsm:text-[18px] items-center">
        
        <div className="col-span-1 m-2">
    <div className="flex space-x-1 items-center">
        <p className='text-amber-400'>
            {Array.isArray(ratings) && ratings.length > 0 ? calculateAverageRating(ratings) : 0} {/* Display average rating */}
        </p>
        <p className="text-amber-400">
            <FaStar />
        </p>
    </div>
</div>

        
          <div className="text-red-600">
            <FaTrash />
          </div>
        </div>
      </div>
   
    );
  };
  
 


 

  type NewGridItem = {
    index: number;
    imageUrl: string;
    heading: string;
    color: string;
    link: string;
  };
  
  type CommonGridProps = {
    
    profileLink: string;
    ExpensesLink: string;
  };
  
  const GridItemComponent: React.FC<{ item: NewGridItem; profileLink: string; ExpensesLink: string }> = ({ item, profileLink, ExpensesLink }) => {
    return (
      <div
        className={`relative flex-grow ${item.color} h-36 w-[298px] hover:bg-[color:var(--primaryColor)] vvvsm:w-[380px] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
      >
        {item.index === 1 ? (
          <div
            className="h-[78px] w-[78px]  relative border-2 border-white rounded-full  inset-y-0 m-auto top-8"
            style={{
              backgroundImage: `url("${item.imageUrl}")`,
              backgroundSize: 'cover',
            }}
          />
        ) : (
          <div className="h-[78px] w-[78px]  relative inset-y-0 m-auto top-8" />
        )}
        {item.index === 1 ? (
          <div className="absolute inset-0 flex items-end justify-center p-2">
            <h2 className="text-xl  text-center text-white  font-semibold mt-4">
              {item.heading}
            </h2>
          </div>
        ) : (
          <a href={profileLink}>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-xl font-semibold text-center text-white">{item.heading}</h2>
            </div>
          </a>
        )}
      </div>
    );
  };
  const gridItemsData = [
    {index:1, imageUrl: '/hook 1.png', heading: 'Project Name 1',color:`bg-[color:var(--mainTitleColor)]`,link:'' },
    {index:1, imageUrl: '/dossier.png', heading: 'Documents',color:`bg-[color:var(--lightBackgroundColor)]`,link:'' },
    {index:1, imageUrl: '/engineers 1.png', heading: 'Team',color:`bg-[color:var(--lightBackgroundColor)]`,link:''  },
    { index:1,imageUrl: '/budget 1.png', heading: 'Expenses',color:`bg-[color:var(--lightBackgroundColor)]`,link:'' },
  ];
  export  const NewCommonGrid: React.FC<CommonGridProps> = ({profileLink, ExpensesLink }) => {
    return ( 
     
        <div className="col-span-2 bsm:col-span-1 flex flex-col gap-2 rounded-full p-4 ">
          <div className="flex flex-col vvvsm:flex-row gap-2">
            {gridItemsData.slice(0, 2).map((item) => (
              <GridItemComponent key={item.index} item={item} profileLink={profileLink} ExpensesLink={ExpensesLink} />
            ))}
          </div>
          <div className="flex flex-col vvvsm:flex-row gap-2 mt-2">
            {gridItemsData.slice(2, 4).map((item) => (
              <GridItemComponent key={item.index} item={item} profileLink={profileLink} ExpensesLink={ExpensesLink} />
            ))}
          </div>
        </div>
     
    );
  };




  

  interface Employee {
    id: number;
    name: string;
    image: string;
    isPresent: boolean;
  }
  
  interface EmployeeAttendanceProps {
    companyName?: string;
    totalPresent?: number;
    employees: Employee[];
    hr:string;
  }
  

  
  
 export const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({
    companyName,
    totalPresent,
    employees,
    hr
  }) => {
    const currentDate = new Date();
    const [selectedDate2, setSelectedDate2] = useState<Date | Date[] | null>(null);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [calendarAvailability, setCalendarAvailability] = useState<any[]>([]);
    const [showScreen, setShowScreen] = useState(true);
    const [attendanceData, setAttendanceData] = useState(employees);
    // const [username, setUsername] = useState(getLoggedInUserData()['username']);

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
  
    const handleAttendanceClick = (index: number) => {
      const updatedAttendanceData = [...attendanceData];
      updatedAttendanceData[index].isPresent = !updatedAttendanceData[index].isPresent;
      setAttendanceData(updatedAttendanceData);
    };
    // calender at top
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedDateString = event.target.value;
      const selectedDate2 = new Date(selectedDateString);
      setSelectedDate2(selectedDate2);
    };

    const documentData = [
      {
        name: 'Visa',
        expiresIn: '30 days',
      },
      {
        name: 'Passport',
        expiresIn: '60 days',
      },
      {
        name: 'EID',
        expiresIn: '15 days',
      },
    ];
  
    return (
      <div className="z-5">
      <div className="text-center bg-[color:var(--primaryColor)] sm:bg-[color:var(--lightBackgroundColor)] vvvsm:rounded-xl sm:rounded-none sm:rounded-b-xl bg-opacity-30">
          <div className=' m-4 '>
              <p className='p-2 '></p>
          </div>
          <div className='bg-white shadow-sm m-4 rounded-sm'>
            <h1 className='p-2 font-semibold text-xl '>{companyName}</h1>
          </div>
          <div className='flex justify-between text-white font-medium text-2xl m-4'>
              <p>{hr}</p>
              <p> {totalPresent}/{employees.length}</p>
          </div>
          <div className="mt-4 p-4">
          {hr!=='Pending Actions' && hr!=='All Sites' &&
        <input
          type="date"
          className="border border-gray-300 rounded-md p-2"
          onChange={handleDateChange}
          max={currentDate.toISOString().split('T')[0]} // Set max date
        />
    }

        {/* Render attendance data and toggle buttons */}
      </div>
        
          {/* <p>Total Present: </p> */}
          {/* <p>Total Absent: {employees.length - totalPresent}</p> */}
      </div>
      <div className='rounded-lg  mt-[-20px]'>
        <div className='flex justify-center gap-x-2 md:gap-x-20 items-center'>
            <div>
              {/* <SearchComponent /> */}
              Search component here
            </div>

          </div>
        <div className="mt-4">
          {attendanceData.map((employee, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-1 "
            >
              <Collapsible>
              <CollapsibleItem 
                    headerText={
                                <div className='flex justify-between'>
                                            <div className="flex justify-between items-center">
                                            <img
                                              src={employee.image}
                                              alt={employee.name}
                                              className="w-12 h-12 rounded-full mr-2"
                                            />
                                            <p className='text-semibold'>{employee.name}</p>
                                          </div>
                                          {hr!=='Salary' && hr!=='Pending Actions' && hr!=='All Sites' &&
                                          <div className='   hover:bg-green-100 shadow-md p-2 ml-16'>
                                              <button
                                                className={`${
                                                  employee.isPresent ? 'text-green-500' : 'text-red-500'
                                                }`}
                                                onClick={() => handleAttendanceClick(index)}
                                              >
                                                {employee.isPresent ? '✔' : '❌'}
                                              </button>
                                          </div>} 
                                </div>
                              } 
                    iconClass={undefined}>

                    
                    {hr==='Salary' || hr==='Pending Actions'?<p>Status:  Paid ✔</p>:""}
                   
                  
                                     
                    {showScreen && hr!=='Salary' && hr!=='Pending Actions' && hr!=='All Sites'? 
                        <div className='m-6 max-lg:w-[90vw] flex flex-col align-middle justify-center mx-auto text-center mb-10'>
                          <div className='flex gap-x-2 mb-4'>
                              <CommonTextInput id={''} placeholder='Site..'/>
                              <CommonTextInput id={''} placeholder='bonus'/>
                          </div>
                          {/* {calendarAvailability.length > 0 ? <Calendar minDate={getMinDate()} maxDate={getMaxDate()} value={stringArrayToDateObjectArray(calendarAvailability)} onClick={(e:any)=>setSelectedDate(e)} />:<Calendar minDate={getMinDate()} maxDate={getMaxDate()} onClick={(e:any)=>setSelectedDate(e)} />} */}
                          <div className='sm:flex justify-between '>
                              <CalendarComponent
                                heading="Regular Calendar"
                                // calendarAvailability={calendarAvailability}
                                // selectedDate={selectedDate}
                                // setSelectedDate={setSelectedDate}
                                // removeDate={removeDate}
                                // addDate={addDate}
                              />
                              <CalendarComponent
                                heading="Overtime Calendar"
                                // calendarAvailability={calendarAvailability}
                                // selectedDate={selectedDate}
                                // setSelectedDate={setSelectedDate}
                                // removeDate={removeDate}
                                // addDate={addDate}
                              />
                          </div>
                          <div className='grid grid-cols-2 gap-x-2 mt-4'>
                              <CommonTextInput id={''} placeholder='Regular Hours..'/>
                              <CommonTextInput id={''} placeholder='Holiday Hours'/>
                              <CommonTextInput id={''} placeholder='Absent Hours'/>
                              <CommonTextInput id={''} placeholder='Sick Hours'/>
                              <CommonTextInput id={''} placeholder='125% Overtime'/>
                              <CommonTextInput id={''} placeholder='150% Overtime'/>
                              <CommonTextInput id={''} placeholder='200% Overtime'/>
                          </div>
                          : <></> 




                        </div>
                         : (hr!=='Pending Actions' && hr!=='All Sites'?
                   
                              <CommonSalary >
                                <div>Salary</div>
                              </CommonSalary>


                        :(hr==='All Sites'?
                        <div>
                          clients here
                        </div>:

                       <div className=''>

                          <CommonHeading color={''} heading={'All Document Expiry'} content={undefined}/>
                          <div>
                              {documentData.map((document, index) => (
                                <div key={index}>
                                  <div className='flex justify-between p-3'>
                                    <h1 className='text-lg font-semibold'>{document.name}</h1>
                                    <h2 className='text-red-600'>Expires in {document.expiresIn}</h2>
                                    <CommonButtonFileUploader
                                      icon={<FaUpload />}
                                      label=''
                                      className='text-green-600'
                                      onFileSelected={(files: FileList | null) => {
                                        // Handle file selection here
                                        if (files) {
                                          // Handle the selected files
                                          console.log(`Selected files for ${document.name}:`, files);
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                      </div>)
                  
                    )}
              </CollapsibleItem>
              </Collapsible>

            </div>
          ))}
        </div>
      </div>
    </div>
    );
  };
  
  

  interface CommongriditemProps {
    gridItems: string[];
    onClick?: () => void;
    // href?:string;
  }

  export const Commongriditem: React.FC<CommongriditemProps> = ({
    gridItems,
  }) => {
    const handleProjectClick = () => {
      // Navigate to the common URL for all projects
      window.location.href = '/';
    };
    return(
        <div className='flex items-center justify-center w-full'>
          <div className='grid grid-cols-2 bsm:grid-cols-4 gap-x-2 w-full gap-y-2'>
            {gridItems.map((gridItem, index) => (
              <div
                key={index}
                onClick={handleProjectClick}
                className='flex flex-col items-center justify-center cursor-pointer p-1 hover:bg-gray-100 transition-all duration-300 shadow-sm border-r border-b border-gray-200 rounded-md'
              >
                <div className='mt-[-20px]'>
                  <CommonIcon id={''} width={50} height={50} href={''} src={'/hook 1.png'} classNameI='rounded-full shadow-md m-4 p-1'/>
                </div>
                <p>✔</p>
                {gridItem}
              </div>
            ))}
          </div>
        </div>
    )
  }