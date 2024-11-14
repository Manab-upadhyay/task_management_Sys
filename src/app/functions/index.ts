// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendTaskReminder = functions.pubsub.schedule('every 1 hours').onRun(async (context:any) => {
    const now = new Date();
    const tasksSnapshot = await admin.firestore().collection('tasks')
        .where('time', '<=', now) // Assuming you have a 'dueDate' field
        .get();

    tasksSnapshot.forEach(async (taskDoc:any) => {
        const task = taskDoc.data();
        const fcmToken = task.fcmToken;

        if (fcmToken) {
            const payload = {
                notification: {
                    title: 'Task Reminder',
                    body: `Don't forget to complete your task: ${task.title}`, // Assuming there's a title field
                },
            };

            await admin.messaging().sendToDevice(fcmToken, payload);
        }
    });
});
