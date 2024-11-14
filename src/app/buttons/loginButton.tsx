import Link from "next/link";
import { useModal } from "../context/LoginModel";
import { useSessionData, signOut } from "../hooks/useSession";

export default function LoginButton() {
  const { session } = useSessionData();

  return (
    <>
      
       {!session&& <Link href="/auth">
          <button
            className="w-20 h-10 rounded-lg shadow-lg bg-orange-600 text-white text-lg font-semibold hover:bg-orange-500 transition duration-200 ease-in-out"
          >
            Login
          </button>
        </Link>}

      
    </>
  );
}
