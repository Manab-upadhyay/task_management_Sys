"use client";
import React, { useEffect, useState } from "react";
import { useUserTask } from "../../../hooks/userTeam"; // Assuming this hook provides ismemberExist
import { useUser } from '@clerk/nextjs';
export default function UserTasks() {
  const { userTasks, getUserTasks, ismemberExist,OnCheckBoxClick } = useUserTask();
  const [message, setMessage] = useState<string>("");
  const {user}=useUser()

  useEffect(() => {
    getUserTasks();
    console.log("usertask",userTasks)
    console.log("userTasks", userTasks.length); // Debugging to ensure tasks are being fetched correctly
  }, []);

  useEffect(() => {
    if (ismemberExist === false) {
      setMessage("You are not added to any team.");
    } else if (ismemberExist && userTasks.length === 0) {
      setMessage("You have been added to the team, but no tasks have been assigned by the admin.");
    } else {
      setMessage("");
    }
  }, [ismemberExist, userTasks]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Tasks</h1>

        {message && (
          <p className="text-lg text-purple-600 text-center mb-6 font-medium bg-purple-50 p-4 rounded-lg shadow-sm">
            {message}
          </p>
        )}

        {userTasks.length > 0 ? (
          userTasks.map((taskGroup, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">
                Assigned by: <span className="text-blue-600">{taskGroup.admin}</span>
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {taskGroup.tasks.map((task: any, i) => (
                  <div
                    key={i}
                    className="relative bg-gradient-to-r from-white to-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300"
                  >
                    {!task.completed&&<input
                      type="checkbox"
                      className="absolute top-4 right-4 w-5 h-5 text-blue-500 rounded focus:ring focus:ring-blue-300"
                      title="Mark task as done"
                    onClick={()=>OnCheckBoxClick(taskGroup.admin,i,taskGroup.id,taskGroup.fcm)}/>}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>
                        <strong>Task To be completed:</strong> {task.date}
                      </p>
                      <p>
                        <strong>Time To complete:</strong> {task.time}
                      </p>
                     
                      <p>
                      <strong>status:</strong> {task.completed ? "completed" : "Not completed"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg text-center text-gray-600 bg-gray-50 p-4 rounded-lg shadow-md">
            No tasks assigned to you.
          </p>
        )}
      </div>
    </div>
  );
}
