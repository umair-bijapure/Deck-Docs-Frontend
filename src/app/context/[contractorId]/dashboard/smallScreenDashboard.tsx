import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface GridItemType {
    name: string;
    size: string;
    content: React.ReactNode;
    reference: string;
    image: string;
    width: number;
    height: number;
    heading: string;
    text: string;
    textcolor: string;
  }

interface SmallScreenDashboard {
    gridItems: GridItemType[];
  }
 export const SmallScreenDashboard : React.FC<SmallScreenDashboard > = ({ gridItems }) => {
  
  const [notifications, setNotifications] = useState(false);
  const getSmallScreenNotifications = () => {
    setNotifications(!notifications);
  };
  const floatingMenuRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target as Node)) {
        setNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='sm:hidden'>
      <div className="floating-menu" ref={floatingMenuRef}>
        <div className="flex items-between floating-menu-button" onClick={getSmallScreenNotifications}>
          <div className="relative m-4 inline-flex w-fit">
            <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-700 p-2.5 text-xs"></div>
            <div className="flex items-center justify-center rounded-full bg-indigo-400 px-2 py-2 text-center text-white shadow-lg dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 ">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {notifications && <div className="floating-menu-content">Hello!</div>
      }

      <div className="flex flex-col justify-center gap-y-4 items-center h-screen p-2 ">
        <div className='bg-indigo-400 w-full h-[250px] rounded-xl shadow-xl flex text-white  flex-col items-start p-4 justify-center '>
          <h1 className='pb-4 text-3xl font-bold'>Welcome Ahmad Khan!</h1>
          <p className='font-semibold'>Lets Manage!! </p>
          <p> All the Employees</p>
          <p>All the projects</p>
          <p>All the documents</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 text-white gap-y-4">
          {gridItems.map((item, index) => (
            <Link key={item.reference} href={item.reference}>
              <div className={`grid grid-cols-2 cursor-pointer rounded-xl justify-center items-center text-sm option bg-white p-2 transition ease-in-out delay-150 bg-opacity-50 hover:-translate-y-1 hover:scale-110 hover:bg-[color:var(--primaryColor)] duration-300`}>
                <div className='flex-col items-center'>
                  <img src={item.image} className='m-2'></img>
                  <p className='whitespace-nowrap p-2 text-lg'>{item.heading}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


