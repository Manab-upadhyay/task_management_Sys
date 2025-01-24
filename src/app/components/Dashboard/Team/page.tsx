"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from "react";
import { useCreateTeam } from "../../../hooks/usecreateTeam";
import AddMembers from "@/app/models/addMembers";
import { DialogBox } from "@/app/models/dialog";

export default function DisplayTeam() {
  const { teamdata, getTeam, DeleteMembers, showModel, model, showDelModel, showDeleteModel, handledelete } = useCreateTeam();

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return (
    <section className=" py-10 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Your Team
        </h2>
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          {teamdata[0]?.teamName}
        </h3>
        
        {/* Add Members Button */}
        {teamdata[0]?.members.length < 4 && (
          <div>
            <button
              onClick={showModel}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Add Members
            </button>
          </div>
        )}
        <span className="text-gray-700 text-lg">Admin: {teamdata[0]?.admin}</span>
      </div>

      {/* Display Team Members */}
      {teamdata[0]?.members.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-2">
          {teamdata[0]?.members.map((member: any, index: any) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              {/* Delete Icon */}
              <AiOutlineDelete
                onClick={() => handledelete(member.email)}
                className="absolute top-4 right-4 text-red-600 cursor-pointer hover:text-red-800 transition duration-200"
                title="Delete Member"
              />

              {/* Member Avatar */}
              <img
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 mb-4"
                src={member.avatar || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"}
                alt={member.name}
              />

              {/* Member Info */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          There are no Team Members yet.
          <div className="mt-4">
            <button
              onClick={showModel}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Add Members
            </button>
          </div>
        </div>
      )}

      {/* Modal for Adding Members */}
      {model && (
        <AddMembers handdleClose={showModel} />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModel && (
        <DialogBox handdleclick={showDelModel} confirmDelete={DeleteMembers}>
          <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-4 text-white">Are you sure you want to delete this member?</p>
        </DialogBox>
      )}
    </section>
  );
}
