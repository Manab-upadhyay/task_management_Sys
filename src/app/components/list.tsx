"use-client"
import React, { useEffect, CSSProperties } from 'react';
import { GoDotFill } from "react-icons/go";
import { ModeToggle } from '../hooks/Theme';
import { useTheme } from '../context/ThemeContext';
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { useListHandler } from '../hooks/listhanddler';
import { useTaskStore } from '../zunstand/taskstore';
import ClipLoader from "react-spinners/ClipLoader";
import { MdDelete } from "react-icons/md";
import { DialogBox } from '../models/dialog';
import { useSessionData } from '../hooks/useSession';
import { useUser,UserButton } from "@clerk/nextjs";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

export default function List() {
  const { theme } = useTheme();
  const { taskdata, setTaskData } = useTaskStore();
  const { handdleDelete, confirmDelete, setShowModel, showModel,loading } = useListHandler();
  const {session}= useSessionData()
  const {user}= useUser()

  useEffect(() => {
    if (!user) {
      // Clear task data if the user is not logged in
      setTaskData([]);
    }
    console.log("tasknadler",taskdata)
  }, [user, setTaskData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
    {!user ? (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <svg
      className="w-16 h-16 mb-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0zm-9 4v1m0-8V7m-4 4h1m10-1h1m-1 4h1"
      />
    </svg>
    <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">
      Please log in to add tasks
    </h1>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Log in to your account to start managing your tasks.
    </p>
  </div>
) : 
  taskdata.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
    <svg
      className="w-16 h-16 mb-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0zm-9 4v1m0-8V7m-4 4h1m10-1h1m-1 4h1"
      />
    </svg>
    <p className="text-lg font-semibold">No tasks added yet</p>
    <p className="text-sm">Add new tasks to get started</p>
  </div>
) : (
  <h1
    className={`${
      theme === 'dark' ? "text-gray-800" : "text-gray-800"
    } mt-1 font-serif font-bold mb-8 text-center w-full`}
  >
    Your Added Tasks:
  </h1>
)}
  

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-3/4 mb-48 ml-auto mr-auto md:ml-56 md:mr-0 md:-mx-32">

      {!loading && taskdata?.map((task: any, index: any) => {
          const { title, description, date, time, completed } = task;
          return (
            <div
              key={index}
              className={`relative p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 border ${
                theme === 'dark'
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-orange-100 border-gray-300 text-gray-800"
              }`}
            >
              {/* Task Status */}
              <span
                className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full shadow-md ${
                  completed
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {completed ? "Completed" : "Incomplete"}
              </span>

              {/* Delete Icon */}
              <MdDelete
                className="absolute my-3 right-3 text-red-500 cursor-pointer hover:text-red-700 transform transition duration-200"
                onClick={() => handdleDelete(task)}
              />

              {/* Task Title */}
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <GoDotFill className="text-orange-500 mr-2" />
                {title}
              </h3>

              {/* Task Description */}
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {description}
              </p>

              <hr></hr>

              {/* Task Date */}
              <div className="flex items-center gap-2 mt-4 text-sm text-sky-600 dark:text-sky-300 bg-sky-100 dark:bg-slate-700 rounded-lg px-3 py-2 shadow-inner">
                <CiCalendarDate className="text-lg" />
                <p>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Task Time */}
              <div className="flex items-center gap-2 mt-2 text-sm text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-slate-700 rounded-lg px-3 py-2 shadow-inner">
                <CiClock2 className="text-lg" />
                <p>{time}</p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && (
        <ClipLoader
          color="#36D399"
          loading={loading}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    
    <div>
      {showModel && (
        <DialogBox
          handdleclick={() => setShowModel(false)}
          confirmDelete={confirmDelete}
        >
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4 text-white">Are you sure you want to delete this task?</p>
      </DialogBox>
      )}
    </div>
    
  </div>
  
  );
}
