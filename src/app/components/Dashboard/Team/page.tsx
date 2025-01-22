"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useCreateTeam } from "../../../hooks/usecreateTeam";
import AddMembers from "@/app/models/addMembers";

export default function DisplayTeam() {
  const { teamdata, getTeam, DeleteMembers, showModel, model } = useCreateTeam();
  

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
          {/* Add Members Button */}
          {teamdata[0]?.members.length <= 4 && (
            <div>
              <button
                onClick={showModel}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Members
              </button>
            </div>
          )}
          <span className="text-black">Admin: {teamdata[0]?.admin}</span>
        </div>

        {/* Display Team Members */}
        {teamdata[0]?.members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-40">
            {teamdata[0]?.members.map((member: any, index: any) => (
              <div
                key={index}
                className="relative flex items-center space-x-4 bg-gray-50 rounded-lg shadow-md p-4 dark:bg-gray-800"
              >
                <AiOutlineDelete
                  onClick={() => DeleteMembers(member.email)}
                  className="absolute top-4 right-4 text-red-500 cursor-pointer"
                />
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
          </div>
        ) : (
          <div>
            There are no Team Members{" "}
            <button
              onClick={showModel}
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Members
            </button>
          </div>
        )}
      </div>

      {/* Modal for Adding Members */}
      {model && (
        <AddMembers handdleClose={showModel} />
      )}
        
           
          
    </section>
  );
}
