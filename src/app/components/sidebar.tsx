"use client"
import React from 'react';
import Loginbutton from '../buttons/loginButton';
import { IoIosNotificationsOutline } from "react-icons/io";
import { dashboard } from '../utils/sidebarutill';
import Notifications from './Notification';
import { useDropdownToggler } from '../hooks/toggleDropdown';
import { ModeToggle } from '../hooks/Theme';
import { useModal } from '../context/LoginModel';

import UserProfile from './userprofile';
import { useSessionData } from '../hooks/useSession';
import { useTheme } from '../context/ThemeContext';
import Link from 'next/link';
import { Component } from '../hooks/componentClick';

const Sidebar: React.FC = () => {
  const { show, toggleNotification } = useDropdownToggler();
  const { theme } = useTheme(); 
  const {component, OnChoose}= Component()


console.log("from side bar", theme)
  return (
    <>
      <div className={`${theme==='dark'?"bg-slate-700":"bg-orange-500" }`} >
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-orange-500 rounded-lg sm:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:text-orange-400 dark:hover:bg-orange-700 dark:focus:ring-orange-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="sidebar-multi-level-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${theme === 'dark' ? 'bg-orange-800' : 'bg-orange-50'}`} // Adjust background color based on theme
          aria-label="Sidebar"
        >
          <div className={`h-full px-3 py-4 overflow-y-auto ${theme === 'dark' ? "bg-slate-700" : "bg-orange-100"}`}>
            <div className='flex justify-between items-center' >
             <Loginbutton  />
              <div className="relative ml-52">
                <IoIosNotificationsOutline
                  onClick={toggleNotification}
                  className={`${theme==='dark'?"text-white":"text-black"} cursor-pointer text-black`}
                  size={30}
                />
              </div>
            </div>

          <UserProfile></UserProfile>
            {show && (
  <div className="absolute top-16 right-4 z-50 w-48 mt-2 bg-white border rounded shadow-lg dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-700">
    <Notifications />
  </div>
)}

<ul className="space-y-2 font-medium mt-5">
  {dashboard.map((item, index) => (
    <li key={index}>
     
        <Link href={item.link}><div
        onClick={()=>OnChoose(item.name)}
          className={`flex items-center p-2 rounded-lg cursor-pointer ${
            theme === 'dark' ? 'hover:bg-orange-600 text-white' : 'hover:bg-orange-300 text-black'
          }`}
        >
          <item.icon className='text-orange-500' />
          <span className="ms-3">{item.name}</span>
        </div>
        </Link>
     
    </li>
  ))}
</ul>

          </div>
         
        </aside>
      
      </div>
    
    </>
  );
};

export default Sidebar;
