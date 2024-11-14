import { NextRequest, NextResponse } from "next/server"
import db from "../../firebase/firebase"
import { task } from "src/app/models/task"
import { promises } from "fs"
import { addDoc, collection, getDoc,getDocs,doc, deleteDoc, setDoc } from "firebase/firestore"


export async function POST(req:NextRequest){
    
    try {
        const body= await req.json()
        console.log(body)
        let toAdd:task={
            userid:body.userid,
            title:body.title,
            description:body.description,
            date:body.date,
            time: body.time,
            completed:false,
            fmc: body.fmc
        }
        const docref= await addDoc(collection(db,"task"), toAdd)
        return NextResponse.json({message:"task added", toAdd})
        
    } catch (error) {
        console.error("Error adding task:", error);
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
        
    }
}
export async function GET(req:NextRequest){
    try {
   
   
        const taskCollection = collection(db, "task"); 
        const querySnapshot = await getDocs(taskCollection); 

        const tasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json({tasks},{status:200})
        
    } catch (error) {
        console.error("Error getting task:", error);
    return NextResponse.json({ error: "Failed to get task" },{status:200});
        
    }
}
export async function DELETE(req:NextRequest){
    try {
   const body= await req.json()
   console.log(body)
   
   const taskDoc = doc(db, "task", body.id);
       const Doc= await deleteDoc(taskDoc)

    
        return NextResponse.json({message:"doc deleted",Doc},{status:200})
        
    } catch (error) {
        console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to get task" },{status:200});
        
    }
}
export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body)
       
        let formattedTask: Partial<task> = {};

        
        if (body.userid) formattedTask.userid = body?.userid;
        if (body.title) formattedTask.title = body?.title;
        if (body.description) formattedTask.description = body?.description;
        if (body.date) formattedTask.date = body?.date;
        if (body.time) formattedTask.time = body?.time;
        if (body.completed !== undefined) formattedTask.completed = body.completed;

        
        const taskDoc = await setDoc(doc(db, "task", body.id), formattedTask, { merge: true });
        
        return NextResponse.json({ message: "Document updated successfully", taskDoc }, { status: 200 });

    } catch (error) {
        console.error("Error updating task:", error);
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

