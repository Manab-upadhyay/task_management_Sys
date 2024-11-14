import { useState } from "react";
import { useSessionData } from "./useSession";
import { useTimePicker } from "../hooks/usetimepicker";
import { useDatePicker } from "../hooks/useDtaepicker";
import { useTime } from "../context/timepicker";
import { useDateContext } from "../context/date";
import dayjs from "dayjs";
// import { useListHandler } from "./listhanddler";
// import useTaskStore from "../zunstand/taskstore";


export function useTaskHandler() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { selectedDate, setSelectedDate } = useDateContext();
    const { selectedTime, setSelectedTime } = useTime();
    const { session } = useSessionData();
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

            let response = await fetch('https://localhost:3000/api/Addtask', {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
                method: "POST",
            });

                       
            let newTask = await response.json();

            console.log(newTask)
            setTitle('');
            setDescription('');
        setSelectedDate(null)
        setSelectedTime(null)
           
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    return { 
        onTitleChange, 
        onAddTask, 
        title, 
        description, 
        onDescriptionChange 
    };
}
