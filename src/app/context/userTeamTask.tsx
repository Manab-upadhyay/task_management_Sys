import React, { createContext, useContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// Define the structure of a task group
interface TaskGroup {
  admin: string;
  tasks: string[];
}

// Define the context type
interface TaskContextType {
    userTeamTasks: TaskGroup[];
  isUserTeamTaskPresent: boolean;
  getUserTasks: () => Promise<void>;
}

// Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provide the context
export const UserTeamTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser(); // Logged-in user's details
  const [userTeamTasks, setUserTasks] = useState<TaskGroup[]>([]); // Store tasks
  const [isUserTeamTaskPresent, setIsUserTeamTaskPresent] = useState(false); // Track task presence

  // Function to fetch user tasks
  const getUserTasks = async () => {
    try {
      const teamCollectionRef = collection(db, "teams");
      const teamDocs = await getDocs(teamCollectionRef);

      const tasksForUser: TaskGroup[] = [];

      teamDocs.forEach((doc) => {
        const teamData = doc.data();
console.log("cont", teamData)
        const member = teamData.members.find(
          (member: any) => member.email === "manab1233" // Adjust as per your user object
        );
        console.log("member task", member)

        if (member) {
          tasksForUser.push({
            admin: teamData.admin,
            tasks: member.tasks || [],
          });
        }
      });

      setUserTasks(tasksForUser);
      // Update task presence state
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ userTeamTasks, isUserTeamTaskPresent, getUserTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
