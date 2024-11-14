import admin from "firebase-admin";
import fetch from "node-fetch"; // To call your notification API

admin.initializeApp();

const db = admin.firestore();


export const notifyUpcomingTasks = functions.pubsub.schedule('every 5 minutes').onRun(async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
  
  const tasksRef = db.collection("task"); // Use your task collection name here
  const snapshot = await tasksRef.get();

  const tasksToNotify = snapshot.docs.filter(doc => {
    const task = doc.data();
    const taskDate = new Date(`${task.date}T${task.time}`); // Parse task date and time

    return taskDate > now && taskDate <= oneHourLater && !task.completed; // Task is within 1 hour
  });

  for (const taskDoc of tasksToNotify) {
    const task = taskDoc.data();
    
    
    const notificationPayload = {
      token: "fjCZ0l8x3vWddwiTd_YMb6:APA91bHI_edEj21Xakitx13weQgWEgp0Rt4Kz9t12e9fT86PrJYhFFvCYq2XSWqNrRA9IHdmsDjjCrcAnec5PNealORpHFpw4OQQmfRFkagk1XfeTHpguRE", // Or use a saved FCM token
      title: "test-seuduler",
      message: "test-sheduler",
      link: `https://yourapp.com/task/${taskDoc.id}`, // Link to task if needed
      userid: "manab@upadhaya"
    };

    // Send notification by calling your API endpoint
    await fetch('https://localhost:3000/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationPayload)
    });
    
    console.log(`Notification sent for task: ${task.title}`);
  }
});
