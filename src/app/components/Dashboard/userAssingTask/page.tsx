"use client";
import React, { useEffect, useState } from "react";
import { useUserTask } from "../../../hooks/userTeam"; // Assuming this hook provides ismemberExist
import { useTaskContext } from "@/app/context/userTeamTask";

export default function UserTasks() {
  const { userTasks, getUserTasks, ismemberExist } = useUserTask(); // Get ismemberExist from your hook
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    getUserTasks();
    console.log(ismemberExist);
    console.log(userTasks.length); // Fetch tasks on component mount
  }, []);

  useEffect(() => {
    if (ismemberExist === false) {
      setMessage("You are not added to any team.");
      return;
    } else if (userTasks.length === 1) {
      setMessage("You have been added to the team, but no tasks have been assigned by the admin.");
      return;
    } else {
      setMessage(""); // Clear any previous messages if tasks exist
    }
  }, [ismemberExist, userTasks]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Tasks</h1>

        {message && (
          <p className="text-xl text-blue-500 text-center mb-4 font-medium">
            {message}
          </p>
        )}

        {userTasks.length > 1 ? (
          userTasks.map((taskGroup, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6 border-l-4 border-blue-500"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Assigned by:{" "}
                {taskGroup.admin.length > 1 ? (
                  taskGroup.admin
                ) : (
                  taskGroup.admin
                )}
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {taskGroup.tasks.map((task: any, i) => (
                  <li key={i} className="text-lg text-gray-700">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-lg text-center text-gray-600">No tasks assigned to you.</p>
        )}
      </div>
    </div>
  );
}
