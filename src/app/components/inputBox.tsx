import React from 'react';
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



export default function InputBox() {
  const { theme } = useTheme();
   const {triggerfetch}= useListHandler()
  

  
  const {onTitleChange, 
    onAddTask, 
    title, 
    description, 
    onDescriptionChange }= useTaskHandler()


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
     
    
        <button onClick={handleAddTask} className="mt-10 w-full bg-orange-600 text-white rounded-md shadow-md py-2 hover:bg-orange-500 transition duration-200">
        Add task
        </button>
      </div>
    </div>
  );
}
