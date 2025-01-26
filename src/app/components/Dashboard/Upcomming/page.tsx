"use client"
import React from 'react';
import { GoDotFill } from "react-icons/go";
import { useTheme } from '../../../context/ThemeContext';
import { useTaskStore } from 'src/app/zunstand/taskstore';
import { useSessionData } from 'src/app/hooks/useSession';
import { useEffect, useState } from 'react';
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { useUser } from '@clerk/nextjs';

export default function List() {
  const { theme } = useTheme();
  const {session}= useSessionData()
  const [taskdata, settaskdata]= useState <any[]>([])
  const [filterdata, setFilterdata]= useState<any[]>([])
  const {user}= useUser()
  useEffect(()=>{
    async function fetchData(){
      try {
        const data= await fetch ('http://localhost:3000/api/Addtask')
        const res= await data.json()
        const filteredData = res.tasks.filter((task: any) => task.userid === session?.user?.email);
  settaskdata(filteredData)
       
      } catch (error) {
      console.log(error)
      }
     
    }
    fetchData()
      },[user])
useEffect(()=>{
 
  const displayTask= taskdata.filter((task: any) => task.completed===false);
  console.log(displayTask)
  
  setFilterdata(displayTask)
}, [taskdata])
 
  const today = new Date();
  const todayDate = today.getDate();  // Returns day of the month (1-31)
  const currentTime = today.getTime();  // Returns current timestamp in milliseconds
console.log("u-tsk",taskdata)

  const upcomingTasks = filterdata.filter(task => {
    const taskDate = new Date(task.date).getDate();
    console.log("taskdate",taskDate, "tasktime", todayDate)
    const taskTime = new Date(`${task.date} ${task.time}`).getTime();

  
    return (taskDate >= todayDate && taskTime >= currentTime);
  });
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      {taskdata.length === 0 ? (
      // No tasks in taskdata
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
    ) : upcomingTasks.length === 0 ? (
      // taskdata exists but no upcoming tasks
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-lg font-semibold">No upcoming tasks</p>
        <p className="text-sm">All tasks are complete or in the past</p>
      </div>
    ) : (
      // Show upcoming tasks header if there are upcoming tasks
      <h1
        className={`${
          theme === 'dark' ? "text-black" : "text-white"
        } mt-1 font-serif font-bold mb-8 text-center w-full`}
      >
        Your upcoming tasks:
      </h1>
    )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-3/4 ml-56 mb-48">
        {upcomingTasks.map(task => (
          <div
            key={task.id}
            className={`p-6 rounded-lg shadow-lg border ${theme === 'dark' ? "bg-slate-700 border-slate-600 text-white" : "bg-orange-100 border-gray-300 text-gray-800"}`}
          >
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
              <p>{task.time}</p>
            </div>
          </div>
         
        ))}
      </div>
    </div>
  );
}
