"use-client"
import React from 'react';
import { GoDotFill } from "react-icons/go";
import { ModeToggle } from '../hooks/Theme';
import { useTheme } from '../context/ThemeContext';
import { CiCalendarDate, CiClock2 } from "react-icons/ci";

import { useEffect } from 'react';
// import useTaskStore from '../zunstand/taskstore';
import { useListHandler } from '../hooks/listhanddler';
import { useTaskHandler } from '../hooks/inputhanddler';
import { useTaskStore } from '../zunstand/taskstore';
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from 'react';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

export default function List() {
  const { theme } = useTheme();
  const { taskdata, loading } = useTaskStore();
  
  useEffect(() => {
   
    console.log("tsk",taskdata) // Fetch tasks on component mount
}, [taskdata]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {taskdata.length === 0 ? (
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
        theme === 'dark' ? "text-black" : "text-white"
      } mt-1 font-serif font-bold mb-8 text-center w-full`}
    >
      Your Added Tasks:
    </h1>
  )}

      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-3/4 ml-56 mb-48">
          {taskdata?.map((task:any, index:any) => {
            const { title, description, date, time } = task;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg border ${theme === 'dark' ? "bg-slate-700 border-slate-600 text-white" : "bg-orange-100 border-gray-300 text-gray-800"}`}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <GoDotFill className="text-orange-500 mr-2" />
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm text-sky-600 dark:text-sky-300 bg-sky-100 dark:bg-slate-700 rounded-lg px-2 py-1 shadow-inner">
  <CiCalendarDate className="text-lg" />
  <p>{new Date(date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</p>
</div>
<div className="flex items-center gap-2 mt-2 text-sm text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-slate-700 rounded-lg px-2 py-1 shadow-inner">
              <CiClock2 className="text-lg" />
              <p>{time}</p>
            </div>
          </div>
             
            );
          })}
        </div>
      ) : (
        <ClipLoader
        color="#36D399" // Professional green shade
        loading={loading}
        cssOverride={override}
        size={80} // Adjust size for a balanced look
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      )}
    </div>
  );
}
