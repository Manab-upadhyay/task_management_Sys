import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
interface TaskGroup {
    admin: string; // Admin's email
    tasks: string[]; // List of tasks
  }
export function useUserTask() {
  const { user } = useUser(); // Get the logged-in user's details
  const [userTasks, setUserTasks] = useState<TaskGroup[]>([]);
  const [ismemberExist, setIsmemberexists]=useState(false) // State to store all tasks for the user

  async function getUserTasks() {
    try {
      // Reference the "teams" collection
      const teamCollectionRef = collection(db, "teams");

      // Fetch all team documents
      const teamDocs = await getDocs(teamCollectionRef);

      const tasksForUser:TaskGroup[] = [];

      // Iterate through each team document
      teamDocs.forEach((doc) => {
        const teamData = doc.data();

        // Check if the logged-in user's email matches any member's email
        const member = teamData.members.find(
          (member:any) => member.email === "manab1233"
        );

        if (member) {
            setIsmemberexists(true)
          // If matched, add the tasks and admin email to the result
          tasksForUser.push({
            admin: teamData.admin,
               tasks: member.tasks || [],
          });
        }
      });

      // Update the state with all tasks assigned to the user
      setUserTasks(tasksForUser);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  }

  // Return state and the function for use in components
  return { userTasks, getUserTasks,ismemberExist };
}
