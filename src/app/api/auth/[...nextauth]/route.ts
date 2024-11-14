import { authOptions } from "lib/authoption"; // Assuming you have your NextAuth options defined here
import NextAuth from "next-auth";

// This will handle both GET and POST methods automatically
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
