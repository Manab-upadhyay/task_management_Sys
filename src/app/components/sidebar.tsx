"use client";
import React, { useState, useEffect } from "react";
import Loginbutton from "../buttons/loginButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDashboard } from "../utils/sidebarutill";
import Notifications from "./Notification";
import { useDropdownToggler } from "../hooks/toggleDropdown";
import { ModeToggle } from "../hooks/Theme";
import { useModal } from "../context/LoginModel";
import UserProfile from "./userprofile";
import { useSessionData,signOut } from "../hooks/useSession";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { Component } from "../hooks/componentClick";
import { NotificationHandler } from "../hooks/notificationHandldler";
import { CiLogout } from "react-icons/ci";
import { useUser } from "@clerk/nextjs";
import {  IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Sidebar: React.FC = () => {
  const { show, toggleNotification } = useDropdownToggler();
  const { theme } = useTheme();
  const dashboard= useDashboard()

  const { fetchNotifications } = NotificationHandler();
  const [isOpen, setIsOpen] = useState(false);
  const[isOpenlg,setlgopen]= useState(true)
  const {user}= useUser()

  useEffect(() => {
    fetchNotifications();

    // Polling for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSidebarLg = () => setlgopen(!isOpenlg);
  console.log(isOpenlg)

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
  onClick={toggleSidebarLg}
  className={`fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 
    ${
      isOpenlg ? "hidden" : "block"
    } bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800`}
>
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
    ></path>
  </svg>
  <span>Open Sidebar</span>
</button>
      <button
        onClick={toggleSidebar}
        aria-controls="sidebar"
        className={`fixed top-4 left-4 z-50 p-2 text-orange-500 rounded-lg sm:hidden hover:bg-orange-200 dark:text-orange-400 dark:hover:bg-orange-600`}
      >
        <span className="sr-only">Toggle Sidebar</span>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:${isOpenlg ? "translate-x-0" : "-translate-x-full"} w-64 ${
          theme === "dark" ? "bg-orange-800" : "bg-orange-50"
        }`}
      >
        <div
          className={`h-full px-3 py-4 overflow-y-auto ${
            theme === "dark" ? "bg-slate-700" : "bg-orange-100"
          }`}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4 relative z-20">

  <div className="relative">
    {/* Notification Icon */}
    <IoIosNotificationsOutline
      onClick={toggleNotification}
      className={`cursor-pointer text-2xl ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    />
    {show && (
      <div
       
      >
        {/* Notification Content */}
        <Notifications />
      </div>
    )}
  </div>
</div>

        

          {/* Sidebar Links */}
          <ul className="space-y-2 font-medium mt-5">
            {dashboard.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  <div
                    onClick={toggleSidebar}
                    className={`flex items-center p-2 rounded-lg cursor-pointer ${
                      theme === "dark"
                        ? "hover:bg-orange-600 text-white"
                        : "hover:bg-orange-300 text-black"
                    }`}
                  >
                    <item.icon className="text-orange-500" />
                    <span className="ml-3">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        
          <button
            onClick={toggleSidebarLg}
            className="hidden sm:flex absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-700 transition"
          >
            {isOpenlg ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
          </button>
         
          <UserProfile  />
          
        </div>

      </aside>
  
     
      
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
