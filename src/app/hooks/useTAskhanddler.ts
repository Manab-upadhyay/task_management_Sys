
import { useState } from "react";
import { useTime } from "../context/timepicker";
import { useDateContext } from "../context/date";
import dayjs from "dayjs";
import { useSessionData } from "./useSession";
import { FaTasks } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTaskStore } from "../zunstand/taskstore";
import { truncate } from "fs";
import { useUser,UserButton } from "@clerk/nextjs";
const useManageTask=()=>{
  interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    date: string;
    time: string;
  }
    const [taskdata, setTaskData]= useState(<any>[])
    const [editTaskId, setEditTaskId] = useState(null);
    const {selectedTime}= useTime()
    const {selectedDate}= useDateContext()
    const [editedTask, setEditedTask] = useState({ title: '', description: '', time: '', date: '', completed: false });
    const {session}= useSessionData()
    const [dropdownid, setdropdownid]= useState()
    const [show, setshow]= useState(false)
    const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [loading, setloading]= useState(false)
  const [pending,setpending]= useState(false)
  const {user}= useUser()
    const handleEditClick = (task:any) => {
        setEditTaskId(task.id);
        setEditedTask({ title: task.title, description: task.description, time: task.time, date: task.date, completed: task.completed });
      };
    
      const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
      };
    const getdata=async()=>{
      if(user){
        setloading(true)
        try {
            const data= await fetch('https://localhost:3000/api/Addtask') 
            console.log(data)
            const res= await data.json()
            const filteredData = res.tasks.filter((task: any) => task.userid === session?.user?.email);
            setTaskData(filteredData)
        } catch (error) {
            console.log("error fetching data", error)
            
        }finally{
          setloading(false)
        }
      }
    }
    const handleDeleteClick = (task:any) => {
      setTaskToDelete(task);
      setShowModal(true);
    };
    const Pending = (time: any) => {
     
      const givenTime = new Date(time).getTime();
    console.log("time",givenTime)
      
      if (givenTime < Date.now()) {
      setpending(true);
      } else {
        setpending(false);
      }
    };
    
    const confirmDelete = () => {
      if (taskToDelete) {
        deleteTask(taskToDelete.id);
        setShowModal(false);
        
        setTaskToDelete(null);
      }
    };
    const deleteTask = async (id: any) => {
      try {
        console.log("id>>",id)
        await fetch('https://localhost:3000/api/Addtask', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id }) // Send the ID as a JSON object
        });
    
        
        setTaskData(taskdata.filter((task: any) => task.id !== id));
    
      } catch (error) {
        console.log("Error deleting task", error);
      }
    };
    const handleEdit=()=>{
      setEditTaskId(null)
    }
      const handleCheckboxChange = async (taskId:any) => {
        try {
          const updatedTasks = taskdata.map((task:any) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          setTaskData(updatedTasks);
    
          
          await fetch('https://localhost:3000/api/Addtask', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: taskId, completed: !taskdata.find((task:any) => task.id === taskId).completed }),
          });
          const taskStatus = updatedTasks.find((task: any) => task.id === taskId).completed
      ? "Task marked as completed"
      : "Task marked as incomplete";
    toast.success(taskStatus);
   
        } catch (error) {
          console.error("Error updating task completion status:", error);
          toast.error("Failed to update task status");
        }
      };
    const showDropdown=(task:any)=>{
       setdropdownid(task.id)
       setshow(!show)
    }
      const handleSaveClick = async (taskId:any) => {
        try {
          const formattedTime = selectedTime ? dayjs(selectedTime).format('HH:mm:ss') : editedTask.time;
          const formattedDate = selectedDate ? dayjs(selectedDate).format('DD-MMMM-YYYY') : editedTask.date;
          
          const data = { title: editedTask.title, description: editedTask.description, id: editTaskId, time: formattedTime, date: formattedDate, completed: editedTask.completed };
    
          await fetch('https://localhost:3000/api/Addtask', {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
    
          const updatedTasks = taskdata.map((task:any) =>
            task.id === taskId ? { ...task, ...editedTask, time: formattedTime, date: formattedDate } : task
          );
          setTaskData(updatedTasks);
          setEditTaskId(null);
    
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };
      return {taskdata, handleEdit, pending, Pending, show, showModal, loading,  setShowModal,handleDeleteClick, confirmDelete, setdropdownid,showDropdown,dropdownid,deleteTask, handleCheckboxChange, handleSaveClick, getdata,handleEditClick,handleInputChange, selectedDate, selectedTime, editTaskId, editedTask}
}
export {useManageTask}