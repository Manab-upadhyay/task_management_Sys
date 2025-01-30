import { IoIosAddCircle } from "react-icons/io";
import { VscTasklist } from "react-icons/vsc";
import { CiClock2 } from "react-icons/ci";
import { MdIncompleteCircle } from "react-icons/md";
import { IoTodayOutline } from "react-icons/io5";
import { useTeam } from "../context/teamContext";
import { useTaskContext } from "../context/userTeamTask";
import { useEffect } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import { GoTasklist } from "react-icons/go";

export const useDashboard = () => {
  const { teamCreated } = useTeam();
  const {userTeamTasks}= useTaskContext() 
useEffect(()=>{
  console.log(userTeamTasks)
})
  const dashboard = [
    {
      icon: IoIosAddCircle,
      name: "Add Task",
      link: "/",
    },
    {
      icon: VscTasklist,
      name: "Your Tasks",
      link: "/components/Dashboard/Yours_task",
    },
    {
      icon: CiClock2,
      name: "Upcomming Tasks",
      link: "/components/Dashboard/Upcomming",
    },
    {
      icon: IoTodayOutline,
      name: "Todays Tasks",
      link: "/components/Dashboard/Todays",
    },
    {
      icon: MdIncompleteCircle,
      name: "Completed Tasks",
      link: "/components/Dashboard/Completed",
    },
    !teamCreated && {
      icon: MdCreateNewFolder,
      name: "Create Team",
      link: "/components/Dashboard/createTeam",
    },
    teamCreated && {
      icon: MdIncompleteCircle,
      name: "Team",
      link: "/components/Dashboard/Team",
    },
    teamCreated && {
      icon: AiOutlineTeam,
      name: "Team Task",
      link: "/components/Dashboard/TeamTask",
    },
    userTeamTasks&&{
      icon: GoTasklist,
      name: "Assing  Task",
      link: "/components/Dashboard/userAssingTask",

    }
  ].filter(Boolean); 

  return dashboard;
};
