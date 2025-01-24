import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSessionData } from "./useSession";// Your Firestore initialization file
import { db } from "../firebase/firebase";

// Interfaces
interface Task {
  title: string;
  description: string;
  date: string;
  time: string;
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

  const getTeamTask = async () => {
    try {
      // Query Firestore for teams where the current user is the admin
      const teamQuery = query(
        collection(db, "teams"), // Replace "teams" with your Firestore collection name
        where("admin", "==", session?.user?.email) // Replace with the current user's email
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

  return { teamTask, getTeamTask };
}
