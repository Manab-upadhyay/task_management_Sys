import { IoIosAddCircle } from "react-icons/io";
import { VscTasklist } from "react-icons/vsc";
import { CiClock2 } from "react-icons/ci";
import { MdIncompleteCircle } from "react-icons/md";
import { IoTodayOutline } from "react-icons/io5";

const dashboard=[
    {
    icon: IoIosAddCircle,
name: "Add Task",
link:"/"

    },
    {
        icon:VscTasklist ,
        name: "Your Tasks",
        link:"/components/Dashboard/Yours_task"
    },
    {
        icon: CiClock2,
        name:"Upcomming Tasks",
          link:"/components/Dashboard/Upcomming"
    },
    {
        icon: IoTodayOutline,
        name:"Todays Tasks",
          link:"/components/Dashboard/Todays"
    },
    {
        icon: MdIncompleteCircle ,
        name:"Completed Tasks",
          link:"/components/Dashboard/Completed"
    },
  
]
export {dashboard}