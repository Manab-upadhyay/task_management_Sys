"use client"
import { useCreateTeam } from "@/app/hooks/usecreateTeam";
interface DialogBoxProps {
    handdleClose: () => void;
   
  }
export default function AddMembers({handdleClose}:DialogBoxProps) {
  const { team, handleInputChange, addMember, saveTeam,error,showModel } = useCreateTeam();


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
   
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h4 className="text-red-600 font-serif">Add Memebers To The  Team </h4>
      {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}
       {team.map((member, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@domain.com"
              value={member.email}
              onChange={(e) => handleInputChange(index, "email", e.target.value)}
            />
            <label className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              value={member.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-between">
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={addMember}
          >
            Add
          </button>
          <button
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={saveTeam}
          >
            Done
          </button>
          <button
              onClick={handdleClose} // Assuming `showModel` also toggles `model` off
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Close
                </button>
        </div>
      </div>
    </div>
  );
}
