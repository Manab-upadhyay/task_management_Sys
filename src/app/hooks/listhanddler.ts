import { useEffect, useState } from "react";
import { useTaskStore } from "../zunstand/taskstore";
import { useSessionData } from "./useSession";
import { DialogBox } from "../models/dialog";
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date: string;
  time: string;
}
const useListHandler = () => {
  const { taskdata, setTaskData, loading, setLoading } = useTaskStore();
  const { session } = useSessionData();
  const [showModel, setShowModel]= useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const getTask = async () => {
    setLoading(true);
    try {
      console.log("Fetching tasks...");
      const response = await fetch('https://localhost:3000/api/Addtask', {
        method: 'GET',
      });
      const res = await response.json();
      console.log(res);
      const filteredData = res?.tasks?.filter((task: any) => task.userid === session?.user?.email);
      setTaskData(filteredData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
const handdleDelete=(task:Task)=>{
setTaskToDelete(task)
  setShowModel(true)


}
const confirmDelete=()=>{
  if(taskToDelete){
    deleteTask(taskToDelete.id)
    setShowModel(false)
  }
}
const deleteTask = async (id: number) => {
  try {
    console.log("id>>",id)
    await fetch('https://localhost:3000/api/Addtask', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }) // Send the ID as a JSON object
    });

    
    setTaskData([...taskdata.filter((task) => task.id !== id)]);


  } catch (error) {
    console.log("Error deleting task", error);
  }
};
  useEffect(() => {
    if (session) {
      getTask(); // Only run if session data is available
    }
  }, [session]); // Re-run whenever session data updates

  const triggerfetch = async () => {
    await getTask();
  };

  return { taskdata, loading, getTask, triggerfetch,showModel,handdleDelete ,confirmDelete,setShowModel};
};

export { useListHandler };
