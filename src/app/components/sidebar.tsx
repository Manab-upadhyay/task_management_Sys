"use client";
import React, { useState, useEffect } from "react";
import Loginbutton from "../buttons/loginButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import { dashboard } from "../utils/sidebarutill";
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



const Sidebar: React.FC = () => {
  const { show, toggleNotification } = useDropdownToggler();
  const { theme } = useTheme();

  const { fetchNotifications } = NotificationHandler();
  const [isOpen, setIsOpen] = useState(false);
  const {session}= useSessionData()

  useEffect(() => {
    fetchNotifications();

    // Polling for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger Menu Button */}
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
        } sm:translate-x-0 w-64 ${
          theme === "dark" ? "bg-orange-800" : "bg-orange-50"
        }`}
      >
        <div
          className={`h-full px-3 py-4 overflow-y-auto ${
            theme === "dark" ? "bg-slate-700" : "bg-orange-100"
          }`}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <Loginbutton />
            <div className="relative">
              <IoIosNotificationsOutline
                onClick={toggleNotification}
                className={`cursor-pointer text-2xl ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
              {show && (
                <div className="absolute right-0 top-8 w-48 bg-white border rounded shadow-lg dark:bg-orange-900 hover:bg-orange-100 dark:hover:bg-orange-700">
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
          <div className="mt-96 text-white cursor-pointer">
          {session&&<CiLogout   onClick={() => signOut({ callbackUrl: "https://localhost:3000" })}  className="ml-40"/>}
          <UserProfile  />
          </div>
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
