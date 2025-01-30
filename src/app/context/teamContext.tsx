import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSessionData } from "../hooks/useSession";
import { useUser } from "@clerk/nextjs";

interface Team{
   
    children:React.ReactNode
}
const TeamContext = createContext<any>(null);
export const TeamProvider = ({ children }:Team) => {
  
  const [teamCreated, setTeamCreated] = useState(false);
  const {user}= useUser()

  async function checkTeam() {
    try {
      const docRef = await getDocs(collection(db, "teams"));
      const isAdmin = docRef.docs.some((team) => team.data().admin === user?.emailAddresses[0].emailAddress);
      setTeamCreated(isAdmin);
    } catch (error) {
      console.error("Error checking team:", error);
    }
  }

  useEffect(() => {
    if (user?.emailAddresses[0].emailAddress) {
      checkTeam();
    }
  }, [user]);

  return (
    <TeamContext.Provider value={{ teamCreated, checkTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a ThemeProvider");
  }
  return context;
};

