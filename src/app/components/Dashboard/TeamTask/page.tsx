"use client"
import { useCreateTeam } from "@/app/hooks/usecreateTeam";
import { useTeamTask } from "@/app/hooks/useTeamTAsk";
import { useEffect } from "react";
import Link from "next/link";

import { AiOutlineDelete } from "react-icons/ai";
export default function DisplayTeamTask() {
  const { getTeamTask, teamTask,deleteTask } = useTeamTask();

  useEffect(() => {
    getTeamTask();
console.log("call")
  }, [getTeamTask]);


  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Assigned Tasks
        </h2>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          {teamTask[0]?.teamName}
        </h3>
        <span className="text-black text-lg">Admin: {teamTask[0]?.admin}</span>
      </div>

      {/* Display All Tasks */}
      {teamTask[0]?.members.length > 0 && teamTask[0]?.members.some((member) => (member.tasks || []).length > 0) ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 h-auto ml-2">
    {teamTask[0]?.members.map((member: any, memberIndex: number) => (
      member.tasks.length > 0 && (
        <div key={memberIndex} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <img
              className="w-16 h-16 rounded-full object-cover mr-4"
              src={member.avatar || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"}
              alt={member.name}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            {member.tasks.map((task: any, taskIndex: number) => (
              <div
                key={taskIndex}
                className="bg-gray-50 p-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
              >
                <AiOutlineDelete onClick={()=>deleteTask(member.email, taskIndex)} className="cursor-pointer"/>
                <h4 className="text-lg font-semibold text-gray-900">Title: {task.title}</h4>
                <p className="text-sm text-gray-500"><strong>Description:</strong> {task.description}</p>
                <p className="text-sm text-gray-500"><strong>Assigned Date:</strong> {task.date}</p>
                <p className="text-sm text-gray-500"><strong>Time:</strong> {task.time}</p>
              </div>
            ))}
          </div>
        </div>
      )
    ))}
  </div>
) : (
  <div className="text-center text-gray-600">
    <p>No tasks have been assigned yet.</p>
    <Link href={"/"}>
      <button className="mt-4 bg-green-500 border-e-red-500 rounded-md text-white px-4 py-2 hover:bg-green-600">
        Assign Task
      </button>
    </Link>
  </div>
)}
    </section>
  );
}
