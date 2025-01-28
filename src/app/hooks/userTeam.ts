import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase/firebase";
import { collection, getDocs,query,doc,updateDoc,where } from "firebase/firestore";
import { EmailAddress } from "@clerk/nextjs/server";

interface TaskGroup {
    admin: string; // Admin's email
    tasks: string[]; // List of tasks
  }
  interface Task {
    title: string;
    description: string;
    date: string;
    time: string;
    completed:boolean
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
console.log("member",member.tasks)
        if (member) {
            setIsmemberexists(true)
          // If matched, add the tasks and admin email to the result
          tasksForUser.push({
            admin: teamData.admin,
               tasks: member.tasks || [],
          });
        }
      });
      console.log("tfu",tasksForUser)

      setUserTasks(tasksForUser);
      console.log("ut",userTasks)// Update the state with all tasks assigned to the user
     
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  }
  async function OnCheckBoxClick(admin: string, taskIndex: number) {
    try {
      // Query to get the team where the current user is the admin and the member email matches
      const teamQuery = query(
        collection(db, "teams"),
        where("admin", "==", admin),
        where("members.email", "==", user?.emailAddresses[0].emailAddress)
      );
      
      const docRef = await getDocs(teamQuery);
  
      if (!docRef.empty) {
        const teamDocId = docRef.docs[0].id; // Get the team document ID
        const existingTeam = docRef.docs[0].data() as FirestoreTeam; // Team data
  
        // Find the member to update in the team's members array
        const memberToUpdate = existingTeam.members.find((m) => m.email === user?.emailAddresses[0].emailAddress);
  
        if (!memberToUpdate) {
          console.log("Member not found");
          return;
        }
  
        // Check if tasks is undefined or empty, and assign an empty array as fallback
        const tasks = memberToUpdate.tasks || []; // If tasks is undefined, it will fallback to an empty array
  
        // Check if the taskIndex is valid (within range)
        if (taskIndex < 0 || taskIndex >= tasks.length) {
          console.log("Invalid task index");
          return;
        }
  
        // Update the specific task's status to completed for this member
        const updatedTasks = [...tasks]; // Copy tasks to modify them
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed: true }; // Update the specific task
  
        // Update the member's tasks array with the modified task
        const updatedMembers = existingTeam.members.map((m) => {
          if (m.email === user?.emailAddresses[0].emailAddress) {
            return {
              ...m,
              tasks: updatedTasks, // Updated tasks
            };
          }
          return m;
        });
  
        // Update the team document in Firestore with the new tasks data
        await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });
        console.log(`Task at index ${taskIndex} updated to completed for ${user?.emailAddresses[0].emailAddress}`);
      } else {
        console.log("Team not found or member email does not match");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  return { userTasks, getUserTasks,ismemberExist,OnCheckBoxClick };
}
