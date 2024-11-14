import { useEffect } from "react";
import { useTaskStore } from "../zunstand/taskstore";
import { useSessionData } from "./useSession";

const useListHandler = () => {
  const { taskdata, setTaskData, loading, setLoading } = useTaskStore();
  const { session } = useSessionData();

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

  useEffect(() => {
    if (session) {
      getTask(); // Only run if session data is available
    }
  }, [session]); // Re-run whenever session data updates

  const triggerfetch = async () => {
    await getTask();
  };

  return { taskdata, loading, getTask, triggerfetch };
};

export { useListHandler };
