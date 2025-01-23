import { useEffect } from "react";
import { useCreateTeam } from "../hooks/usecreateTeam";

interface AssignTask {
    confirmclose(): void;
    handleClick(name: string): void;
}

export default function AssignTask({ confirmclose, handleClick }: AssignTask) {
    const { teamdata, getTeam } = useCreateTeam();

    useEffect(() => {
        getTeam();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Assign Task to Team Members
                </h2>
                <ul className="space-y-4">
                    {teamdata && teamdata[0]?.members.length > 0 ? (
                        teamdata[0]?.members.map((member, idx) => (
                            <li
                                key={idx}
                                className="flex items-center p-3 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-200"
                                onClick={() => handleClick(member.name)}
                            >
                                <img
                                    alt={member.name}
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                    className="w-12 h-12 rounded-full border border-gray-300"
                                />
                                <span className="ml-4 text-lg font-medium text-gray-700">
                                    {member.name}
                                </span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">
                            No team members found.
                        </p>
                    )}
                </ul>
                <button
                    onClick={confirmclose}
                    className="mt-6 w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
