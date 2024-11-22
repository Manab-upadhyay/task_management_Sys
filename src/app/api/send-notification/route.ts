import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "firebase-admin/messaging";
import db from "../../firebase/firebase"
import { collection,addDoc, Timestamp, getDocs, deleteDoc, doc } from "firebase/firestore";



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
   const data= await addDoc(collection(db, "notification"), {
        title: title,
        message: message,
        userid: userid,
        timestamp: Timestamp.now()  // Optional: add timestamp
      });
      console.log(data)
    return NextResponse.json({ text: "Sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function GET() {
  try {
    const docRef = collection(db, "notification"); 
    const snapshot = await getDocs(docRef); 
    
   
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
export async function DELETE(req:NextRequest){
  try {
 const body= await req.json()
 console.log("body is",body)
 
 const taskDoc = doc(db, "notification", body.id);
     const Doc= await deleteDoc(taskDoc)

  
      return NextResponse.json({message:"notification deleted",Doc},{status:200})
      
  } catch (error) {
      console.error("Error deleting task:", error);
  return NextResponse.json({ error: "Failed to get task" },{status:200});
      
  }
}
