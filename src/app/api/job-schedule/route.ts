import db from "src/app/firebase/firebase";
import { collection,getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "lib/authoption";
import { getToken } from "next-auth/jwt";
import cron from 'node-cron'
if (process.env.NODE_ENV === 'development') {
    cron.schedule('* * * * *', async () => { // Runs every minute as a test
      try {
        const response = await fetch('https://localhost:3000/api/job-schedule', {
          method: 'GET',
          // 5 seconds timeout
        });
  
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        console.log("Cron job executed successfully:", data);
      } catch (error) {
        console.error("Error in cron job:", error);
      }
    });
  }
  // Helper function to convert month names to month numbers
function getMonthFromName(monthName:string) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months.indexOf(monthName);
}

// Helper function to convert month names to month numbers


export async function GET(req:NextRequest) {
  const now = new Date();

  try {
    const docRef = collection(db, "task");
    const snapshot = await getDocs(docRef);
    console.log("inside get");
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const userEmail = session?.email
    const tasksToNotify = snapshot.docs.filter((doc) => {
      const task = doc.data();
      console.log("Raw date and time:", `${task.date} ${task.time}`);

      // Parse date and time as a string in the format "YYYY-MM-DDTHH:mm:ss" to ensure local timezone
      const [day, monthName, year] = task.date.split("-");
      const [hour, minute, second] = task.time.split(":");

      const month = getMonthFromName(monthName.trim());
      if (month === -1) {
        console.error("Invalid month name:", monthName);
        return false; // Skip if the month name is invalid
      }

      // Constructing date string in "YYYY-MM-DDTHH:mm:ss" format
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${hour}:${minute}:${second}`;
      const taskDate = new Date(dateStr);
      console.log("Parsed taskDate (local time):", taskDate);

      if (isNaN(taskDate.getTime())) {
        console.error("Invalid Date after parsing:", `${task.date} ${task.time}`);
        return false; // Skip this task if parsing resulted in an invalid date
      }

      // Calculate one hour before the task date in local time
      const oneHourBeforeTask = new Date(taskDate.getTime() - 60 * 60 * 1000);
      const isLessThanOneHourBefore = (
        oneHourBeforeTask.getTime() <= now.getTime() &&
        oneHourBeforeTask.getTime() > now.getTime() - 2 * 60 * 1000 &&
        !task.completed
      );

      const isExactTaskTime = (
        taskDate.getTime() <= now.getTime() &&
        taskDate.getTime() > now.getTime() - 2 * 60 * 1000 &&
        !task.completed
      );

      return isLessThanOneHourBefore || isExactTaskTime;
    });

    console.log("Tasks to notify:", tasksToNotify);
    for (const taskDoc of tasksToNotify) {
      const task = taskDoc.data();
      let notificationPayload;

      if (now.getTime() === new Date(`${task.date}T${task.time}`).getTime()) {
        // Exact task time notification
        notificationPayload = {
          token: task.fmc,
          title: 'Time for Your Task',
          message: `It's time for your task: "${task.title}".`,
          link: `https://localhost:3000/your-task`,
          userid: task.userid
        };
      } else {
        // Less than one hour reminder notification
        notificationPayload = {
          token: task.fmc,
          title: 'Upcoming Task Reminder',
          message: `Reminder: Your task "${task.title}" is due in less than 1 hour.`,
          link: `https://localhost:3000/your-task`,
          userid: task.userid
        };
      }

      // Call API to send notification
      await fetch('https://localhost:3000/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPayload),
      });

      console.log(`Notification sent for task: ${task.title}`);
    }

    return NextResponse.json("cron job schedules");
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json("cron job failed");
  }
}
