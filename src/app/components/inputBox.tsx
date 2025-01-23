import React, { useEffect, useState } from 'react';
import { ModeToggle } from '../hooks/Theme';
import { useTheme } from '../context/ThemeContext';
import { CiCalendarDate } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import BasicDatePicker from '../utils/calender';
import { Date } from '../hooks/DatePicker';
import BasicTimePicker from '../utils/timepicker';
import {useTaskHandler}  from '../hooks/inputhanddler';
import { useListHandler } from '../hooks/listhanddler';
import { useTimePicker } from '../hooks/usetimepicker';
import { useSessionData } from '../hooks/useSession';
import Link from 'next/link';
import { useTeam } from '../context/teamContext';
import AssignTask from '../models/asingTask';
import { ImCross } from "react-icons/im";
import { remove } from 'firebase/database';




export default function InputBox() {
  const { theme } = useTheme();
   const {triggerfetch}= useListHandler()
   const {session}= useSessionData()

  const {teamCreated}= useTeam()

  
  const {onTitleChange, 
    onAddTask, 
    title, 
    description, 
    onDescriptionChange,error,toggleModel,showAsingModel,handdleSelectMembers,member,addAssignedTask,removeAsing }= useTaskHandler()


    const handleAddTask = async () => {
      await onAddTask(); // Call the existing onAddTask function
        triggerfetch(); // Trigger fetching the updated task list
  };

  

  return (
    <div className="flex flex-col items-center justify-center w-2/4 h-3/4">
      <h6 className={`${theme === 'dark' ? 'text-black' : 'text-black'} mt-1 font-serif font-bold mb-4 text-left w-full pl-4 my-20 ml-10`}>
        Add Your Task
      </h6>
      <div className={`${theme==='dark'?"bg-slate-700 ":"bg-orange-200"} w-full h-82 rounded-lg shadow-lg p-6 border border-gray-300 ml-20`}>
        {error&&<div>
          <h1 className='text-red-600'>{error}</h1>
          </div>}
        <label className="block mb-2 text-gray-700 font-medium">
          Enter the task:
          <input
            type="text"
            value={title}
            onChange={(e)=>onTitleChange(e)}
            placeholder="Type your task here..."
            className={`${theme==='dark'?" bg-white":"bg-black"}mt-2 w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </label>
        <label className="block mb-2 text-gray-700 font-medium">
         Enter The Description(If needed):
          <input
            type="text"
            value={description}
            onChange={(e)=>onDescriptionChange(e)}
            placeholder="Enter The Description..."
            className={`${theme==='dark'?" bg-balck":"bg-white"}mt-2 w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </label>
        
        
   <div className='flex justify-start space-x-10'>
       <BasicDatePicker ></BasicDatePicker>
       
       
       <BasicTimePicker ></BasicTimePicker>
      
       </div>
     
    
        {!session&&<Link href={'/auth'}><button className="mt-10 w-full bg-orange-600 text-white rounded-md shadow-md py-2 hover:bg-orange-500 transition duration-200">
        Add task
        </button></Link>}
        {session&&<button  onClick={member?addAssignedTask:handleAddTask} className="mt-10 w-full bg-orange-600 text-white rounded-md shadow-md py-2 hover:bg-orange-500 transition duration-200">
        Add task
        </button>}
        <div className="mt-10 flex flex-col items-center">
  {/* Assign Task Button */}
  {teamCreated&&!member&&<button
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
    onClick={toggleModel}
  >
    Assign Task
  </button>}

  {/* Task Assigned Section */}
  {member && (
    <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md w-full max-w-md text-center">
       <ImCross onClick={removeAsing} />
      <p className="text-gray-700 font-medium text-lg">
        Task Assigned to: <span className="font-semibold text-blue-600">{member}</span>
      </p>
      <button
        onClick={toggleModel}
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition-all"
      >
        Change Assigned
      </button>
     
      
    </div>
  )}
</div>

      </div>
      {showAsingModel&&(
<AssignTask confirmclose={toggleModel} handleClick={handdleSelectMembers}></AssignTask>
      )}
    </div>
  );
}

