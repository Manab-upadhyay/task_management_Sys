"use client"
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useSessionData } from "./useSession";
import { collection,addDoc,getDocs,query,where,DocumentData,updateDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { BsWindowSidebar } from "react-icons/bs";
import { useRouter } from "next/navigation";
interface TeamMember {
    name: string;
    email: string;
  }
  interface FirestoreTeam {
    teamName: string;
    admin: string;
    members: TeamMember[];
    createdAt: Date;
  }
 
export function useCreateTeam() {
  const [team, setTeam] = useState<TeamMember[]>([{ name: "", email: "" }]);
  const [teamName, setTeamname]=useState<any>(null)
  const {session}= useSessionData()
  const [teamdata, setteamdata]= useState<FirestoreTeam[]>([])
  const router= useRouter()

  function handleInputChange(index:number, field:keyof TeamMember, value:string) {
    const updatedTeam = [...team];
    updatedTeam[index][field] = value;
    setTeam(updatedTeam);
  }
function handdleTeamName(e:any){
setTeamname(e.target.value)
}
  function addMember() {
    setTeam([...team, { name: "", email: "" }]);
  }

 
  async function saveTeam() {
    try {
      const teamDoc = {
        teamName,
        admin:session?.user?.email,
        members: team,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, "teams"), teamDoc);
      console.log("Document written with ID: ", docRef.id);
      setTeamname(""); // Reset teamName to an empty string
    setTeam([{ name: "", email: "" }]); 

      toast.success("Team Created Succesfully")
      router.push('/')
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  async function getTeam() {
    try {
   
      const teamQuery = query(collection(db, "teams"), where("admin", "==", session?.user?.email));
      
      
      const docRef = await getDocs(teamQuery);
  
      if (!docRef.empty) {
      
        const teamData = docRef.docs.map((doc) => doc.data() as FirestoreTeam);
        
        
        setteamdata(teamData);
      } else {
        console.log("No team found for this user.");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  }
  async function DeleteMembers(email: string) {
    try {
      // Filter out the member with the matching email
      const updatedMembers = teamdata[0]?.members.filter((mem) => mem.email !== email);
  
      // Update the team in Firestore
      const teamDocRef = collection(db, "teams"); // Adjust to your Firestore structure
      const teamQuery = query(teamDocRef, where("teamName", "==", teamdata[0]?.teamName));
      const teamDocs = await getDocs(teamQuery);
  
      if (!teamDocs.empty) {
        const teamDocId = teamDocs.docs[0].id; // Assuming the first document is the correct one
        await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });
        
        // Update local state
        const updatedTeamData = { ...teamdata[0], members: updatedMembers };
        setteamdata([updatedTeamData]);
  
        console.log("Member deleted successfully");
      } else {
        console.error("Team document not found");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  }
  
  return { team, handleInputChange, addMember, saveTeam,handdleTeamName,teamdata,getTeam,DeleteMembers };
}
