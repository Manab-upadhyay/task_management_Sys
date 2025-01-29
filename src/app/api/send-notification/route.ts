import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../firebase/firebase"; // Ensure this exports your Firestore instance
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from "firebase/firestore";

const serviceAccount = require("../../../task-management-77408-firebase-adminsdk-4u7i2-8dc38cef6b.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: NextRequest) {
  const { token, title, message, link, userid } = await req.json();

  const payload = {
    token: token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link
      ? {
          fcmOptions: {
            link,
          },
        }
      : undefined,
  };

  try {
    // Send notification via Firebase Admin SDK
    await admin.messaging().send(payload);

    // Store the notification in Firestore
    const notificationRef = collection(db, "notifications");
    const docRef = await addDoc(notificationRef, {
      title,
      message,
      userid,
      timestamp: Timestamp.now(), // Firestore's timestamp
    });

    console.log("Notification saved:", docRef.id);
    return NextResponse.json({ text: "Sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ message:error }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch notifications from Firestore
    const notificationsCollection = collection(db, "notification");
    const querySnapshot = await getDocs(notificationsCollection);

    const notifications: any = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Delete notification by ID
    const notificationDoc = doc(db, "notifications", id);
    await deleteDoc(notificationDoc);

    return NextResponse.json(
      { message: "Notification deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}
