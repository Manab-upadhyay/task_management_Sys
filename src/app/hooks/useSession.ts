import { useSession, signIn, signOut } from "next-auth/react"

const useSessionData = () => {
  const { data: session, status } = useSession();
  return {session,status};
};

export { useSessionData,signIn, signOut };
