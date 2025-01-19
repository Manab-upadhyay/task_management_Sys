import { useSessionData, signOut } from "../hooks/useSession";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function UserProfile() {
  const { session } = useSessionData();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { theme } = useTheme();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div
      className={`relative flex items-center space-x-2 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      {session ? (
        <>
          <img
            onClick={toggleDropdown}
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"
            src={session.user?.image || "/default-avatar.jpg"}
            alt="User avatar"
          />
          <p
            onClick={toggleDropdown}
            className="font-bold cursor-pointer"
          >
            Welcome, {session.user?.name}
          </p>

          {isDropdownOpen && (
            <div
              className={`absolute top-12 right-0 z-10 divide-y divide-gray-100 rounded-lg shadow-lg w-44 ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-200 divide-gray-600"
                  : "bg-white text-gray-700 divide-gray-100"
              }`}
            >
              <ul className="py-2 text-sm">
                <li>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000" })
                    }
                    className={`w-full px-4 py-2 text-left transition-colors ${
                      theme === "dark"
                        ? "hover:bg-gray-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-4 font-poppins">
          <p className="mb-2 text-lg font-semibold">You are not logged in.</p>
        </div>
      )}
    </div>
  );
}
