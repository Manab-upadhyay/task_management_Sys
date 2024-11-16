import { ModeToggle } from "../hooks/Theme";
import { useTheme } from "../context/ThemeContext";
import { NotificationHandler } from "../hooks/notificationHandldler";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
 // Make sure to install a tooltip library or replace this with your preferred solution

export default function Notifications() {
  const { theme } = useTheme();
  const { notifications, handleDelete } = NotificationHandler();

  const formatTimestamp = (timestamp: { seconds: number; nanoseconds: number }) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;
    const date = new Date(milliseconds);
    return date.toLocaleString(); // Format the date to a readable format
  };
  console.log("noti", notifications)

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-lg p-6 w-96 z-10`}>
      <h3 className="text-xl font-semibold text-white mb-4 border-b pb-2">
        Notifications
      </h3>
      <div className="h-72 overflow-y-auto space-y-4"> 
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No new notifications</p>
        ) : (
          <ol className="space-y-4">
            {notifications.map((noti: any, idx: number) => (
              <li key={idx} className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="bg-indigo-500 text-white rounded-full w-7 h-7 flex items-center justify-center mr-3 font-bold">
                  {idx + 1}
                </span>
                <div className="flex flex-col w-full">
                  <span className="text-gray-800 font-semibold mb-1">{noti.title}</span>
                  <span className="text-gray-600 mb-1">{noti.message}</span>
                  <span className="text-sm text-gray-500">Time: {formatTimestamp(noti.timestamp)}</span>
                </div>
                <MdDelete
                  onClick={() => handleDelete(noti.id)}
                  className="text-gray-500 hover:text-red-500 ml-4 cursor-pointer"
                  title="Delete notification"
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
