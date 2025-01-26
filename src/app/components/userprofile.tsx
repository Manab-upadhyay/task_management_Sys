"use client";

import { useUser,UserButton } from "@clerk/nextjs";
import { useTheme } from "../context/ThemeContext";

export default function UserProfile() {
  const { user } = useUser(); // Get user information from Clerk
  const { theme } = useTheme(); // Get theme from context

  return (
    <div
      className={`flex flex-col items-center justify-center mt-20 ${
        theme === "dark" ? "bg-slate-700 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {user ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-bold">Welcome, {user.firstName || "User"}!</p>
          <UserButton />
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">You are not logged in.</p>
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg ${
              theme === "dark"
                ? "bg-gray-600 text-white hover:bg-gray-500"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => window.location.assign("/cauth")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
