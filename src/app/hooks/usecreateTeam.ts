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
  const [error,setError]= useState<string|null>(null);
  const[model,setShowModel]= useState(false)
  const [showDeleteModel,setShowDeleteModel]= useState(false)
  const[email,setEmail]=useState<string|null>(null)
  const router= useRouter()

  function handleInputChange(index:number, field:keyof TeamMember, value:string) {
    const updatedTeam = [...team];
    updatedTeam[index][field] = value;
    setTeam(updatedTeam);
  }
function handdleTeamName(e:any){
setTeamname(e.target.value)
}
   async function addMember() {
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
    if(teamdata[0]?.members.length+team.length>=4){
      setError("Team Size limit exceded")
      return;
    }
setError(null)
    setTeam([...team, { name: "", email: "" }]);

  }
 
  
  async function showModel() {
    await getTeam()
    setShowModel(!model)
    console.log(teamdata[0]?.members.length)
   
  
  }
  function showDelModel(){
    setShowDeleteModel(!showDeleteModel)
   
  }
  function handledelete(email:string){
    setEmail(email)
    setShowDeleteModel(true)
  }
  
 
 async function saveTeam() {
  setShowModel(false)
  if (team.some((member) => !member.name || !member.email)) {
    setError("All team members must have both name and email.");
    return;
  }

  try {
   
    const teamQuery = query(
      collection(db, "teams"),
      where("admin", "==", session?.user?.email)
    );
    const docRef = await getDocs(teamQuery);

    if (!docRef.empty) {
     
      const teamDocId = docRef.docs[0].id;
      const existingTeam = docRef.docs[0].data() as FirestoreTeam;

     
      if (existingTeam.members.length + team.length > 5) {
        setError("Cannot add more than 5 members.");
        return;
      }

      setError(null); 

    
      const updatedMembers = [...existingTeam.members, ...team];

     
      await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });

      
      setTeam([{ name: "", email: "" }]);
      await getTeam(); // Refresh team data
      toast.success("Team updated successfully");
      
      
    } else {
      // No existing team, so create a new one
      const newTeam = {
        teamName,
        admin: session?.user?.email,
        members: team,
        createdAt: new Date(),
      };

      const newDocRef = await addDoc(collection(db, "teams"), newTeam);
      console.log("New team created with ID:", newDocRef.id);

      setTeamname(""); // Reset team name
      setTeam([{ name: "", email: "" }]); // Reset new member input
       // Refresh team data
      setShowModel(false)
      toast.success("Team created successfully");
    }
    setShowModel(false)
    router.push('/');
  } catch (error) {
    console.error("Error saving team:", error);
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
  async function DeleteMembers() {
    try {
   
      console.log("called del")
      const updatedMembers = teamdata[0]?.members.filter((mem) => mem.email !== email);
  
      
      const teamDocRef = collection(db, "teams"); // Adjust to your Firestore structure
      const teamQuery = query(teamDocRef, where("teamName", "==", teamdata[0]?.teamName));
      const teamDocs = await getDocs(teamQuery);
  
      if (!teamDocs.empty) {
        const teamDocId = teamDocs.docs[0].id; 
        await updateDoc(doc(db, "teams", teamDocId), { members: updatedMembers });
        
      
        const updatedTeamData = { ...teamdata[0], members: updatedMembers };
        setteamdata([updatedTeamData]);
  
        console.log("Member deleted successfully");
        
      } else {
        console.error("Team document not found");
      }
      setEmail(null)
        setShowDeleteModel(false)
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  }
  
  return { team, handleInputChange, addMember, saveTeam,handdleTeamName,teamdata,getTeam,DeleteMembers,showModel,model,error,showDelModel,showDeleteModel,handledelete };
}
