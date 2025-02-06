import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../firebase/firebase";
import { collection, getDocs,query,doc,updateDoc,where,getDoc } from "firebase/firestore";
import { EmailAddress } from "@clerk/nextjs/server";
import { headers } from "next/headers";

interface TaskGroup {
  id:string
 fcm:string
    admin: string; 
    tasks: string[]; 
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
          (member:any) => member.email === "itclub.aus@gmail.com"
        );
console.log("member",member.tasks)
        if (member) {
            setIsmemberexists(true)
          // If matched, add the tasks and admin email to the result
          tasksForUser.push({
            id: doc.id,
            admin: teamData.admin,
            fcm:teamData.fcm,
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
  async function OnCheckBoxClick(admin: string, taskIndex: number,docid:string,fmc:string) {
    try {
      // Query to get the team where the current user is the admin and the member email matches
      console.log("calling fxn")
      console.log("Admin:", admin);
      console.log("Doc ID:", docid);
      console.log(fmc)
      const getToken = sessionStorage.getItem("fmc");
   
      await fetch ("https://localhost:3000/api/send-notification",{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({token:getToken,title:"Task completed",body:"Task has been completed by the user"})
      }
      )
      const teamDocRef = doc(db, "teams", docid);
      const teamDocSnap = await getDoc(teamDocRef);
  
      if (!teamDocSnap.exists()) {
        console.log("Team document not found");
        return;
      }
  
      const existingTeam = teamDocSnap.data() as FirestoreTeam;
  
      // Find the member whose email is "manab1233"
      const memberIndex = existingTeam.members.findIndex((m) => m.email === "itclub.aus@gmail.com");
  
      if (memberIndex === -1) {
        console.log("Member not found in the team");
        return;
      }
  
      // Get the member's tasks
      const memberToUpdate = existingTeam.members[memberIndex];
      const tasks = memberToUpdate.tasks || []; // Fallback to empty array if undefined
  
      // Validate the task index
      if (taskIndex < 0 || taskIndex >= tasks.length) {
        console.log("Invalid task index");
        return;
      }
  
      // Update the specific task's completed status
      tasks[taskIndex] = { ...tasks[taskIndex], completed: true };
  
      // Update the members array with the modified tasks
      const updatedMembers = [...existingTeam.members];
      updatedMembers[memberIndex] = { ...memberToUpdate, tasks };
  
      // Update Firestore with the modified team document
      await updateDoc(teamDocRef, { members: updatedMembers });
await getUserTasks()
      console.log(`Task at index ${taskIndex} updated to completed for ${memberToUpdate.email}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  return { userTasks, getUserTasks,ismemberExist,OnCheckBoxClick };
}
