

"use client"
import type { Metadata } from "next";
import "./globals.css";
import ThemeWrapper from "./wrappers/ThemeProvider";

import Sidebar from "./components/sidebar";
import { RiMoonClearFill } from "react-icons/ri";
import { FaRegMoon } from "react-icons/fa";
import { ModeToggle } from "./hooks/Theme";
import { usePathname } from "next/navigation";
import SessionWrapper from "./wrappers/sessionWraper";
import { ThemeProvider } from "./context/ThemeContext";
import { TimeProvider } from "./context/timepicker";
import { DateProvider } from "./context/date";
import { toast, ToastContainer } from 'react-toastify';
import { TeamProvider } from "./context/teamContext";
import { ClerkProvider } from '@clerk/nextjs'
import { UserTeamTaskProvider } from "./context/userTeamTask";

import 'react-toastify/dist/ReactToastify.css';
import { useFCM } from "./hooks/useFmc";


export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) 

{

  const pathname = usePathname(); 
 

  return (
    <html lang="en">
      <body>

       <ClerkProvider
       >
   <UserTeamTaskProvider>
        <ThemeProvider>
     <SessionWrapper>
 
     <TeamProvider>
      <DateProvider>
   <TimeProvider>
      
        <ThemeWrapper
         
        >
          {pathname !== '/auth' && <Sidebar /> }
    
          {children}
          <ToastContainer></ToastContainer>
     
        </ThemeWrapper>
       
        </TimeProvider>
        </DateProvider>
        </TeamProvider>
        </SessionWrapper>
        </ThemeProvider>
        </UserTeamTaskProvider>
        </ClerkProvider>
       
      </body>
    </html>
  );
}
