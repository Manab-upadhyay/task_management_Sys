import { useEffect } from "react"
import UseCreateTeam from "../../../hooks/usecreateTeam"
export default function DisplayTeam(){
    const {teamdata,getTeam}= UseCreateTeam()
    useEffect(()=>{
        getTeam()
    })
    return(
        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Meet the team behind our success.
            </p>
          </div>
  
          {/* Only one team */}
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {teamdata && (
              <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5 w-full">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {teamdata[0]?.teamName}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-400">Admin: {teamdata[0].admin}</span>
  
                  {/* Iterating through members */}
                  <div className="mt-6 space-y-4">
                    {teamdata[0].members.map((member:any, memberIdx:any) => (
                      <div key={memberIdx} className="flex items-center space-x-4">
                        <img
                          className="w-12 h-12 rounded-full"
                          src={member.avatar || "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"} // Default avatar if none provided
                          alt={member.name}
                        />
                        <div>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</span>
                          <span className="block text-sm text-gray-500 dark:text-gray-400">{member.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
}