import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const TeamContext = createContext<any>(null);
interface Session {
    user?: {
      email?: string;
    };
  }
interface Team{
    session:Session
    children:React.ReactNode
}

export const TeamProvider = ({ children, session }:Team) => {
  const [teamCreated, setTeamCreated] = useState(false);

  async function checkTeam() {
    try {
      const docRef = await getDocs(collection(db, "teams"));
      const isAdmin = docRef.docs.some((team) => team.data().admin === session?.user?.email);
      setTeamCreated(isAdmin);
    } catch (error) {
      console.error("Error checking team:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      checkTeam();
    }
  }, [session]);

  return (
    <TeamContext.Provider value={{ teamCreated, checkTeam }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
