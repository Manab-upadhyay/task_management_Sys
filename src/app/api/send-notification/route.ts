import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "firebase-admin/messaging";
import {db,realtimeDb,ref,serverTimestamp,set,get,child,remove} from "../../firebase/firebase"
import { collection,addDoc, Timestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { notification } from "@/app/models/notification";



const serviceAccount = require("../../../../task-management-77408-firebase-adminsdk-4u7i2-40bb455e36.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


export async function POST(req: NextRequest) {
  const { token, title, message, link, userid } = await req.json();

    console.log(token)
   
  const payload: Message = {
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
    await admin.messaging().send(payload);
    const notificationRef = ref(realtimeDb, `notifications/${userid}/${Date.now()}`);
    await set(notificationRef, {
      title,
      message,
      userid,
      timestamp: serverTimestamp(), // Use Firebase server timestamp
    });
   console.log(notificationRef)
    return NextResponse.json({ text: "Sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function GET() {
  try {
    const dbRef = ref(realtimeDb); // Reference to the root of the database
    const snapshot = await get(child(dbRef, "notifications")); // Fetch data under the "notifications" node

    if (!snapshot.exists()) {
      return NextResponse.json({ notifications: [] }, { status: 200 });
    }

    
    const notifications:any = [];
    snapshot.forEach((userSnapshot) => {
      userSnapshot.forEach((notificationSnapshot) => {
        notifications.push({
          id: notificationSnapshot.key, // Use unique key as ID
          ...notificationSnapshot.val(),
        });
      });
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
export async function DELETE(req:NextRequest){
  try {
 const body= await req.json()

 
 const notificationRef = ref(realtimeDb, `notifications/${body.userId}/${body.id}`); // Reference to the specific notification
 const doc=await remove(notificationRef); 

  
      return NextResponse.json({message:"notification deleted",doc},{status:200})
      
  } catch (error) {
      console.error("Error deleting task:", error);
  return NextResponse.json({ error: "Failed to get task" },{status:200});
      
  }
}
