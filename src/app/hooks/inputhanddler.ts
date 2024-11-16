import { useState } from "react";
import { useSessionData } from "./useSession";
import { useTimePicker } from "../hooks/usetimepicker";
import { useDatePicker } from "../hooks/useDtaepicker";
import { useTime } from "../context/timepicker";
import { useDateContext } from "../context/date";
import dayjs from "dayjs";
import { toast, ToastContainer } from 'react-toastify';
// import { useListHandler } from "./listhanddler";
// import useTaskStore from "../zunstand/taskstore";


export function useTaskHandler() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { selectedDate, setSelectedDate } = useDateContext();
    const { selectedTime, setSelectedTime } = useTime();
    const { session } = useSessionData();
    const [error, seterror]= useState(String)
    // const {settaskdata}= useListHandler()
    // const addTask = useTaskStore((state) => state.addTask);
    
    const formattedTime = selectedTime ? dayjs(selectedTime).format('HH:mm:ss') : 'No time selected';
    const formattedDate = selectedDate ? dayjs(selectedDate).format('DD-MMMM-YYYY') : 'No date selected';

    console.log('Formatted Time:', formattedTime);
    console.log('Formatted Date:', formattedDate);
    function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
    }

    function onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    async function onAddTask() {
        try {
            console.log("calling")
            const getToken = sessionStorage.getItem("fmc");
            const taskData = {
                userid: session?.user?.email,
                title,
                description,
                date: formattedDate,
                time: formattedTime,
                fmc:getToken
               
            };
            if(!taskData.description||!taskData.title){
                seterror("Fill all the fields")
                return
            }
            else if(taskData.time=="No time selected"&&taskData.date=="No date selected"){
                seterror("Fill both Date and Time")
            }
            else if (taskData.time=="No time selected"){
                seterror("Fill time field")
                return
            }
            else if(taskData.date=="No date selected"){
                seterror("Fill date field")
                return
            }
            const taskDate = new Date(taskData.date);
        const taskTime = new Date(`${taskData.date} ${taskData.time}`);

        // Get the current date and time for comparison
        const currentDate = new Date();
        console.log("taskdate",taskDate,"correct time", currentDate)
        // Validate that the selected date and time are not in the past
        if (taskDate < currentDate) {
            seterror("The selected date cannot be in the past");
            return;
        }

        if (taskTime < currentDate) {
            seterror("The selected time cannot be in the past");
            return;
        }
    
            let response = await fetch('https://localhost:3000/api/Addtask', {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
                method: "POST",
            });

                       
            let newTask = await response.json();
                 if(newTask){
                    toast.success("Task Succesfully added")
                 }
                
            setTitle('');
            setDescription('');
        setSelectedDate(null)
        setSelectedTime(null)
        seterror('')
           
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    return { 
        onTitleChange, 
        onAddTask, 
        title, 
        description, 
        onDescriptionChange ,
        error
    };
}
