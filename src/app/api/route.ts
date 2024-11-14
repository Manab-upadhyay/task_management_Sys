import { collection, addDoc } from "firebase/firestore"; 
import db from "../firebase/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res:NextResponse, req:NextRequest) {
  try {
    const docRef = await addDoc(collection(db, "test-user"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({ id: docRef.id });
  } catch (e) {
    console.error("Error adding document: ", e);
    return NextResponse.json({ error: "Error adding document" });
  }
}
