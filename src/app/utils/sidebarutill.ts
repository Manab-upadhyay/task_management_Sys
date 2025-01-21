import { IoIosAddCircle } from "react-icons/io";
import { VscTasklist } from "react-icons/vsc";
import { CiClock2 } from "react-icons/ci";
import { MdIncompleteCircle } from "react-icons/md";
import { IoTodayOutline } from "react-icons/io5";
import { useTeam } from "../context/teamContext";

export const useDashboard = () => {
  const { teamCreated } = useTeam();

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
      icon: MdIncompleteCircle,
      name: "Create Team",
      link: "/components/Dashboard/createTeam",
    },
    teamCreated && {
      icon: MdIncompleteCircle,
      name: "Team",
      link: "/components/Dashboard/Team",
    },
    teamCreated && {
      icon: MdIncompleteCircle,
      name: "Team Task",
      link: "/components/Dashboard/tTask",
    },
  ].filter(Boolean); // Remove falsy values like `false` or `null`

  return dashboard;
};
