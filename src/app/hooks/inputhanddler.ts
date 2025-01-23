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

import { db } from "../firebase/firebase";
import { collection,getDocs,where,query,updateDoc,doc } from "firebase/firestore";
interface Task {
    title: string;
    description: string;
    date: string;
    time: string;
  }
  
  interface TeamMember {
    name: string;
    email: string; // If members have email or other unique identifiers
    tasks?: Task[]; // Optional tasks array
  }
  
  interface FirestoreTeam {
    admin: string;
    members: TeamMember[];
  }
export function useTaskHandler() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { selectedDate, setSelectedDate } = useDateContext();
    const { selectedTime, setSelectedTime } = useTime();
    const { session } = useSessionData();
    const [error, seterror]= useState(String)
    const [showAsingModel, setShowAsingModel]= useState(false)
    const [member,setmember]=useState<string|null>(null)
    // const {settaskdata}= useListHandler()
    // const addTask = useTaskStore((state) => state.addTask);
    
    const formattedTime = selectedTime ? dayjs(selectedTime).format('HH:mm:ss') : 'No time selected';
    const formattedDate = selectedDate ? dayjs(selectedDate).format('DD-MMMM-YYYY') : 'No date selected';


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
  function toggleModel(){
    setShowAsingModel(!showAsingModel)
  }
  function handdleSelectMembers(name:string){
setmember(name)
setShowAsingModel(false)
  }
  async function addAssignedTask() {
    try {
      // Query to get the team where the current user is the admin
      const teamQuery = query(
        collection(db, "teams"),
        where("admin", "==", session?.user?.email)
      );
      const docRef = await getDocs(teamQuery);
  
      if (!docRef.empty) {
        const teamDocId = docRef.docs[0].id; // ID of the team document
        const existingTeam = docRef.docs[0].data() as FirestoreTeam; // Team data
  
        // Find the member to assign the task to
        const memberToUpdate = existingTeam.members.find((m) => m.name === member);
             console.log(existingTeam)
        if (!memberToUpdate) {
         console.log("member not found")
          return;
        }
  
        // Prepare the new task data
        const newTask = {
          title,
          description,
          date: formattedDate,
          time: formattedTime,
        };
  
        // Add the task to the specific member's tasks array
        const updatedMembers = existingTeam.members.map((m) => {
          if (m.name === member) {
            return {
              ...m,
              tasks: m.tasks ? [...m.tasks, newTask] : [newTask], // Add task to the member's tasks array
            };
          }
          return m;
        });
  
        // Update the team document in Firestore
        await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });
  
        toast.success(`Task assigned to ${member} successfully!`);
        setTitle("");
        setDescription("");
        setSelectedDate(null);
        setSelectedTime(null);
        setmember(null)
       
      } 
    } catch (error) {
      console.error("Error assigning task:", error);
    
    }
  }
  function removeAsing(){
    setmember(null)
  }


    return { 
        onTitleChange, 
        onAddTask, 
        title, 
        description, 
        onDescriptionChange ,toggleModel,showAsingModel,handdleSelectMembers,member,addAssignedTask,removeAsing,
       
        error
    };
}
