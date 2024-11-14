import { useEffect, useState } from "react";
import { useSessionData } from "./useSession";

 function NotificationHandler() {
  const [notifications, setNotifications] = useState([]);
const {session}= useSessionData()
useEffect(()=>{
  

    async function fetchNotifications() {
      try {
        const response = await fetch("https://localhost:3000/api/send-notification");
        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications.filter((noti:any)=>noti.userid==session?.user?.email)); // Assuming your API returns an array of notifications
        } else {
          console.error("Error fetching notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

   fetchNotifications() // Fetch notifications once on component mount
   
 },[])
  const handleDelete = async (id:any) => {
    try {
      console.log("Deleting notification with id:", id);
      
      const response = await fetch('https://localhost:3000/api/send-notification', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }) // Pass id as JSON
      });

      if (response.ok) {
        console.log("notification fetched")
    
      } else {
        console.error("Failed to delete notification:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  return {notifications,handleDelete}
}
export {NotificationHandler}