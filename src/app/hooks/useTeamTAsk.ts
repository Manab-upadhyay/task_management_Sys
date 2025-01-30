import { useState } from "react";
import { collection, query, where, getDocs,updateDoc,doc } from "firebase/firestore";
import { useSessionData } from "./useSession";// Your Firestore initialization file
import { db } from "../firebase/firebase";
import { useUser } from '@clerk/nextjs';
import { BlobOptions } from "buffer";

// Interfaces
interface Task {
  title: string;
  description: string;
  date: string;
  time: string;
  completed:boolean
}

interface TeamMember {
  name: string;
  email: string;
  tasks?: Task[];
}

interface FirestoreTeam {
  admin: string;
  teamName: string;
  members: TeamMember[];
}

export  function useTeamTask() {
  const [teamTask, setTeamdata] = useState<FirestoreTeam[]>([]);
  const {session}= useSessionData()
  const [updatedTasks, setUpdatedTasks] = useState(teamTask);
  const {user}= useUser()

  const getTeamTask = async () => {
    try {
      // Query Firestore for teams where the current user is the admin
      const teamQuery = query(
        collection(db, "teams"), // Replace "teams" with your Firestore collection name
        where("admin", "==", user?.emailAddresses[0].emailAddress) // Replace with the current user's email
      );

      // Fetch documents from Firestore
      const querySnapshot = await getDocs(teamQuery);

      // Map the Firestore data to your interface
      const teams: FirestoreTeam[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          admin: data.admin,
          teamName: data.teamName,
          members: data.members.map((member: any) => ({
            name: member.name,
            email: member.email,
            tasks: member.tasks || [], // Default to an empty array if tasks are missing
          })),
        };
      });

      // Update state
      setTeamdata(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  async function deleteTask(email: string, tidx: number) {
    try {
      console.log("Task index to delete:", tidx);
  
      // Update tasks for the specific member
      const updatedMembers = teamTask[0].members.map((member) => {
        if (member.email === email) {
          return {
            ...member,
            tasks: (member.tasks || []).filter((_, index) => index !== tidx), // Remove task at index tidx
          };
        }
        return member; 
      });
  
      console.log("Updated Members:", updatedMembers);
  
      // Firestore Query to get the document
      const teamDocRef = collection(db, "teams");
      const teamQuery = query(teamDocRef, where("teamName", "==", teamTask[0]?.teamName));
      const teamDocs = await getDocs(teamQuery);
  
      if (!teamDocs.empty) {
        const teamDocId = teamDocs.docs[0].id;
  
        // Update Firestore
        await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });
  
        // Update local state
        const updatedTeamData = { ...teamTask[0], members: updatedMembers };
        setTeamdata([updatedTeamData]);
  
        console.log("Task deleted successfully and state updated!");
      } else {
        console.error("Team document not found.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  

  return { teamTask, getTeamTask,deleteTask };
}
