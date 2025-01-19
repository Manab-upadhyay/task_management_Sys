import { useSession } from "next-auth/react";
import { useTheme } from "../context/ThemeContext";

export default function UserProfile() {
  const { data: session } = useSession();
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-black"}`}>
      {session ? (
        <div>
          <h2 className="text-lg font-semibold">Welcome, {session.user?.name}!</h2>
          <p>Email: {session.user?.email}</p>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="User profile"
              className="mt-2 w-16 h-16 rounded-full"
            />
          )}
        </div>
      ) : (
        <p>You are not signed in</p>
      )}
    </div>
  );
}
