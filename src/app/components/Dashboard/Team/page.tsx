"use client";
import { PiDotsThreeCircle } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useCreateTeam } from "../../../hooks/usecreateTeam";


export default function DisplayTeam() {
  const { teamdata, getTeam,DeleteMembers } = useCreateTeam();

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Your Team
          </h2>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            {teamdata[0]?.teamName}
          </h3>
          <span className="text-black">Admin: {teamdata[0]?.admin}</span>
        </div>

        {/* Display team members */}
        {teamdata[0]?.members.length>0?<div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-40">
          {teamdata[0]?.members.map((member: any, index: any) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-50 rounded-lg shadow-md p-4 dark:bg-gray-800"
            >
              
              <AiOutlineDelete onClick={()=>DeleteMembers(member.email)}  className="absolute mb-32 text-red-500 cursor-pointer" />

              <img
                className="w-12 h-12 rounded-full"
                src={
                  member.avatar ||
                  "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                } 
                alt={member.name}
              />
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {member.email}
                </div>
              </div>
            </div>
          ))}
        </div>:<div>There are no Team Members <button>Add Members</button></div>}
      </div>
    </section>
  );
}
