
'use client';
import React,{useState,useEffect, useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineLogout,AiOutlineMenu} from 'react-icons/ai';
import { CommonButton, CommonButtonSolidBlue } from './common/buttons';
import styled from "styled-components";
import { getLoggedInRole, isUserLoggedIn, logOutUser } from './utils/utils';
import CommonPopup from './common/popUp';

import { useParams, usePathname, useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faFolderOpen, faFolderTree } from '@fortawesome/free-solid-svg-icons';
import { FaFolderOpen } from 'react-icons/fa';

const MainNavbar: React.FC<{ contractorId: string, onLoginClick: () => void, onRegisterClick: () => void, onVshareClick: () => void }> = ({ contractorId, onLoginClick, onRegisterClick,onVshareClick }) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupLogin, setPopupLogin] = useState(false);
  const floatingMenuRef = useRef<HTMLDivElement | null>(null);
  const [isInputVisible, setInputVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target as Node)) {
        setInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    setHydrated(true);

    if (!isUserLoggedIn()) {
      router.replace('/');
      logOutUser();
    }
  }, [router]);

  const handleLogout = () => {
    logOutUser();
    router.push('/');
  };

  const handleDashboard = () => {
    router.push(`/${encodeURIComponent(contractorId)}/dashboard/`);
  };

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  if (!hydrated) {
    return null; // Return null or a loading indicator while hydrating
  }

  return (
    <div className='no-scrollbar'>

<div className="hidden sm:flex justify-between items-center font-bold w-full h-auto bg-[color:var(--primaryColor)] no-scrollbar">
        <div className="flex ml-6 p-4 space-x-20">
          <Link href="/">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full p-1 hover:scale-105 duration-100">
              <Image
                src="/logo.png"
                alt="/"
                width={180}
                height={180}
                className="cursor-pointer rounded-full"
              />
            </div>
          </Link>
          <button
            className="ring-2 m-2 p-2 pl-2 pr-2 ring-white text-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--primaryColor)] flex items-center justify-center gap-x-2 hover:scale-105 duration-100"
            onClick={onVshareClick}
          >
            <FontAwesomeIcon icon={faFolderOpen} /> Folder Link Generate
          </button>
        </div>

        <div className="w-[510px] max-auto p-4">
          <div className="flex items-center justify-center gap-x-6 text-white">
            {!isLoggedIn ? (
              <>
                <Link href="/contact">
                  <button className="hover:ring-2 m-2 p-2 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--primaryColor)] hover:scale-105 duration-100">
                    Contact
                  </button>
                </Link>
                <Link href="/about">
                  <button className="hover:ring-2 m-2 p-2 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--primaryColor)] hover:scale-105 duration-100">
                    About
                  </button>
                </Link>
                <button
                  className="ring-2 m-2 p-2 pl-4 pr-4 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--primaryColor)] hover:scale-105 duration-100"
                  onClick={onLoginClick}
                >
                  Login
                </button>
                <button
                  className="ring-2 m-2 p-2 pl-2 pr-2 ring-white shadow-mg rounded-xl hover:bg-white hover:text-[color:var(--primaryColor)] hover:scale-105 duration-100"
                  onClick={onRegisterClick}
                >
                  Register
                </button>
              </>
            ) : (
              <>
              <p>sdvsdv</p>
                {/* <button
                  onClick={handleLogout}
                  className="flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold hover:scale-110 duration-100"
                >
                  Logout <AiOutlineLogout />
                </button>
                <button
                  onClick={handleDashboard}
                  className="flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold hover:scale-110 duration-100"
                >
                  Dashboard <AiOutlineLogout />
                </button> */}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden floating-menu" ref={floatingMenuRef}>
        <button
          className="flex items-between floating-menu-button-logout"
          onClick={toggleInput}
        >
          <AiOutlineMenu />
        </button>

        {isInputVisible && (
          <div className="floating-menu-content-logout">
            <div className="p-2 flex flex-col items-center space-y-4">
              {!isLoggedIn ? (
                <>
                  <Link href="/contact">
                    <CommonButtonSolidBlue
                      text="Contact"
                      className="pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md"
                    />
                  </Link>
                  <Link href="/about">
                    <CommonButtonSolidBlue
                      text="About"
                      className="pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md"
                    />
                  </Link>
                  <Link href="/auth/login" onClick={onLoginClick}>
                    <CommonButtonSolidBlue
                      text="Login"
                      className="pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md"
                    />
                  </Link>
                  <Link href="/auth/signup" onClick={onRegisterClick}>
                    <CommonButtonSolidBlue
                      text="Register"
                      className="pl-10 pr-10 hover:text-white hover:bg-[color:var(--primaryColor)] pt-1 pb-1 rounded-md"
                    />
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:bg-red-200 justify-center gap-x-2 text-red-500 bg-red-100 p-2 pl-10 pr-10 rounded-xl font-semibold"
                >
                  Logout <AiOutlineLogout />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;