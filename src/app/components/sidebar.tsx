"use client";
import React, { useState, useEffect } from "react";
import Loginbutton from "../buttons/loginButton";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDashboard } from "../utils/sidebarutill";
import Notifications from "./Notification";
import { useDropdownToggler } from "../hooks/toggleDropdown";
import { ModeToggle } from "../hooks/Theme";
import { useTheme } from "../context/ThemeContext";
import Link from "next/link";
import { NotificationHandler } from "../hooks/notificationHandldler";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import UserProfile from "./userprofile";

const Sidebar: React.FC = () => {
  const { show, toggleNotification } = useDropdownToggler();
  const { theme } = useTheme();
  const dashboard = useDashboard();
  const { fetchNotifications } = NotificationHandler();
  
  const [isOpen, setIsOpen] = useState(false); // Mobile Sidebar
  const [isOpenlg, setlgOpen] = useState(true); // Desktop Sidebar

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleSidebarLg = () => setlgOpen((prev) => !prev);

  return (
    <>
      {/* Hamburger Button for Small Screens */}
      {!isOpenlg && (
        <button
          onClick={toggleSidebarLg}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-lg shadow-lg bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-800"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
            ></path>
          </svg>
          <span>Open Sidebar</span>
        </button>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 h-full transition-transform w-64 ${
          theme === "dark" ? "bg-orange-800" : "bg-orange-50"
        } ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isOpenlg ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={`h-full px-3 py-4 overflow-y-auto ${theme === "dark" ? "bg-slate-700" : "bg-orange-100"}`}>
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
      {/* Logo Container */}
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r ml-20 from-blue-500 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        {/* Logo Icon */}
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      {/* Logo Text */}
      <span className="text-2xl font-bold text-orange-600 dark:text-white">
        Taskify
      </span>
    </Link>
          {/* Notification Icon */}
          <div className="relative">
            <IoIosNotificationsOutline
              onClick={toggleNotification}
              className={`cursor-pointer text-2xl ${theme === "dark" ? "text-white" : "text-black"}`}
            />
            {show && <Notifications />}
          </div>

          {/* Sidebar Links */}
          <ul className="space-y-2 font-medium mt-5">
            {dashboard.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  <div
                    onClick={toggleSidebar}
                    className={`flex items-center p-2 rounded-lg cursor-pointer ${
                      theme === "dark" ? "hover:bg-orange-600 text-white" : "hover:bg-orange-300 text-black"
                    }`}
                  >
                    <item.icon className="text-orange-500" />
                    <span className="ml-3">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Toggle Button for Large Screens */}
          <button
            onClick={toggleSidebarLg}
            className="hidden sm:flex absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-700 transition"
          >
            {isOpenlg ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
          </button>

          <UserProfile />
        </div>
      </aside>

      {/* Mobile Overlay for Closing Sidebar */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;