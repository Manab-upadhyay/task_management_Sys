"use client";
import React, { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { useTheme } from '../../../context/ThemeContext';
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import BasicDatePicker from 'src/app/utils/calender';
import BasicTimePicker from 'src/app/utils/timepicker';
import { useManageTask } from 'src/app/hooks/useTAskhanddler';
import { useSessionData } from 'src/app/hooks/useSession';
import { DialogBox } from 'src/app/models/dialog';
import { useTaskHandler } from 'src/app/hooks/inputhanddler';
import { useTaskStore } from 'src/app/zunstand/taskstore';
import ClipLoader from "react-spinners/ClipLoader";
import { CSSProperties } from 'react';
import { Router } from 'next/router';
import Link from 'next/link';
import { task } from '@/app/models/task';
import { AnyAaaaRecord } from 'dns';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "green",
};

export default function List() {
  const [filterdata, setfilterdata] = useState<any[]>([]);
  const [pending, setpending]= useState([])
  const {
    handleCheckboxChange,
    handleEditClick,
    handleInputChange,
    handleSaveClick,
    taskdata,
    editTaskId,
    editedTask,
    deleteTask,
    getdata,
    dropdownid,
    setdropdownid,
    showDropdown,
    show,
    handleDeleteClick,
    confirmDelete,
    showModal,
    setShowModal, handleEdit, loading
  } = useManageTask();

  const { theme } = useTheme();
  const { session } = useSessionData();
  
  useEffect(() => {
    getdata();
 
  }, [session]);
 
   useEffect(() => {
    const now= Date.now()
    const pendinglist:any=[]
   taskdata.forEach((task:any) => {
    const taskDateTime = new Date(`${task.date} ${task.time}`).getTime();
    if(taskDateTime<now)
      pendinglist[task.id]=true
    setpending(pendinglist)

   });

    const data = taskdata.filter((task: any) => task.completed === false);
    setfilterdata(data);
    
  }, [taskdata]); 
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      { taskdata.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fadeIn">
      <svg
        className="w-16 h-16 mb-4 text-gray-400 animate-pulse"
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
      <p className="text-lg font-semibold animate-fadeIn">No tasks added yet</p>
      <p className="text-sm animate-fadeIn">Add new tasks to get started</p>
      {session&&<Link href={"/"}><button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transform transition-transform duration-200 ease-in-out animate-bounce"
   
      >
        Add a Task
      </button></Link>}
      {!session&&<Link href={"/auth"}><button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transform transition-transform duration-200 ease-in-out animate-bounce"
   
      >
        Add a Task
      </button></Link>}
    </div>
  ) : filterdata.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-fadeIn">
      <p className="text-lg font-semibold">No tasks here, maybe they are completed.</p>
    </div>
  ) : (
    <h1
  className={`${
    theme === 'dark'
      ? "text-black bg-transparent"
      : "text-white bg-transparent"
  } mt-0 font-serif font-bold text-xl sm:text-2xl md:text-2xl mb-6 text-center w-full py-3 rounded-lg transition-all duration-300 ease-in-out`}
>
  Your Added Tasks:
</h1>
      )}

      
      

   

     {!loading&& <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-3/4 ml-56 mb-48">
 
        
        
        {filterdata.map((task: any) => (
         <div
         key={task.id}
         className={`relative p-6 rounded-lg shadow-lg border transform transition duration-300 ease-in-out ${
           theme === 'dark'
             ? "bg-slate-700 border-slate-600 text-white hover:shadow-slate-800/80"
             : "bg-orange-100 border-gray-300 text-gray-800 hover:shadow-orange-300/40"
         } hover:scale-105 hover:shadow-2xl`}
       >
            <div className="absolute top-2 right-2">
              <div className="relative">
                <BsThreeDotsVertical
                  className="cursor-pointer"
                  onClick={() => showDropdown(task)}
                />
               {show && dropdownid === task.id && (
  <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
    <button
      onClick={() => handleEditClick(task)}
      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
    >
      Edit
    </button>
    <button
      onClick={() => handleDeleteClick(task)}
      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
    >
      Delete
    </button>
  </div>
)}

              </div>
            </div>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
              className="mr-2"
            />
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleInputChange}
                  className="text-xl font-semibold mb-2 w-full p-2 rounded bg-slate-700"
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleInputChange}
                  className="text-sm text-gray-500 dark:text-gray-300 w-full p-2 rounded bg-slate-700"
                />
                <div className="mt-2 flex items-center gap-4">
                  <CiCalendarDate className="text-lg mr-2" />
                  <BasicDatePicker />
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <CiClock2 className="text-lg mr-2" />
                  <BasicTimePicker />
                </div>
                <button
                  onClick={() => handleSaveClick(task.id)}
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
                <button
                    onClick={handleEdit}
                    className="px-4 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <GoDotFill className="text-orange-500 mr-2" />
                  {task.title}
                 
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
  {task.description}
</p>
<hr></hr>
                <div className="flex items-center gap-2 mt-4 text-sm text-sky-600 dark:text-sky-300 bg-sky-100 dark:bg-slate-700 rounded-lg px-2 py-1 shadow-inner">
  <CiCalendarDate className="text-lg" />
  <p>{new Date(task.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</p>
</div>
<div className="flex items-center gap-2 mt-2 text-sm text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-slate-700 rounded-lg px-2 py-1 shadow-inner">
              <CiClock2 className="text-lg" />
              <p>{task.time}
              
              </p>
              {pending[task.id] && (
  <span className="ml-32 px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full shadow-sm dark:text-yellow-300 dark:bg-yellow-800">
    Pending
  </span>
)}

            </div>
         
              </>
            )}
          </div>
        ))}
      </div>}
      {loading &&
    <ClipLoader
      color="#36D399"
      loading={loading}
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  }

   
      {/* Modal for Delete Confirmation */}
      {showModal && (
        <DialogBox handdleclick={() => setShowModal(false)} confirmDelete={confirmDelete} />


      )}
    </div>
  );
}
