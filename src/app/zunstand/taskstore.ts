import { create } from "zustand";

// Define the type for your store
interface TaskStoreState {
    taskdata: any[];
    loading: boolean;
    setTaskData: (newData: any[]) => void;
    setLoading: (status: boolean) => void;
}

const useTaskStore = create<TaskStoreState>((set) => ({
    taskdata: [],
    loading: true,
    setTaskData: (newData) => set({ taskdata: newData }),
    setLoading: (status) => set({ loading: status }),
}));

export { useTaskStore };
