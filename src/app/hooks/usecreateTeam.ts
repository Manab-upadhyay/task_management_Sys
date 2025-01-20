import { useState } from "react";
import { db } from "../firebase/firebase";
import { useSessionData } from "./useSession";
import { collection,addDoc,getDocs,query,where,DocumentData } from "firebase/firestore";
interface TeamMember {
    name: string;
    email: string;
  }
export default function UseCreateTeam() {
  const [team, setTeam] = useState<TeamMember[]>([{ name: "", email: "" }]);
  const [teamName, setTeamname]=useState()
  const {session}= useSessionData()
  const [teamdata, setteamdata]= useState<DocumentData[]>([])

  function handleInputChange(index:number, field:keyof TeamMember, value:string) {
    const updatedTeam = [...team];
    updatedTeam[index][field] = value;
    setTeam(updatedTeam);
  }
function handdleTeamName(e:any){
setTeamname(e.taget.value)
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
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  async function getTeam(session: any) {
    try {
   
      const teamQuery = query(collection(db, "teams"), where("admin", "==", session?.user?.email));
      
      
      const docRef = await getDocs(teamQuery);
  
      if (!docRef.empty) {
      
        const teamData = docRef.docs.map((doc) => doc.data());
        
        
        setteamdata(teamData);
      } else {
        console.log("No team found for this user.");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  }
  return { team, handleInputChange, addMember, saveTeam,handdleTeamName,teamdata,getTeam };
}
