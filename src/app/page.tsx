"use client";
import Image from "next/image";
import Sidebar from "./components/sidebar";
import InputBox from "./components/inputBox";
import List from "./components/list";
import { FaRegMoon } from "react-icons/fa";
import { ModeToggle } from "./hooks/Theme";
import { RiMoonClearFill } from "react-icons/ri";
import LoginModal from "./components/Login";
import { useModal } from "./context/LoginModel";
import { useTheme } from "./context/ThemeContext";
import { Component } from "./hooks/componentClick";
import { useFCM } from "./hooks/useFmc";
import { useEffect } from "react";
import { isAsyncFunction } from "util/types";

export default function Home() {
  const { showModal } = useModal(); 
  const {theme, toggleTheme } = useTheme(); 
  const {component}= Component()
  const {requestPermission}= useFCM()
  console.log(component)

  useEffect(()=>{
requestPermission()
  })
  async function handdleclick() {
    try {
      await fetch("https://localhost:3000/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          title: "test",
          message: "test-body",
          token: "fjCZ0l8x3vWddwiTd_YMb6:APA91bH6-8-Cs2Hswvaut4PG4SPcD17pjRnhGiZ-X0FbNXbWeyZ_oBMrWpHtHFIArCXKNQgDtJVB5yt8zYrxOfpndml70vHMnpC8UPaPVJjq30ZEiAfhC9k",
        }),
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  

  return (
    <div className={`flex min-h-screen space-x-10 ${theme === 'dark' ? 'bg-gray-200 text-white' : 'bg-white text-black'}`}>

      
      <div className="relative w-full"> 
        
        {theme === "dark" ? (
          <RiMoonClearFill 
            className="absolute text-black top-4 right-10 cursor-pointer transition-transform duration-200 hover:scale-110"
            size={20}
            onClick={toggleTheme} 
            aria-label="Switch to light theme"
          />
        ) : (
          <FaRegMoon 
            className="absolute top-4 right-10 cursor-pointer transition-transform duration-200 hover:scale-110"
            size={20}
            onClick={toggleTheme} 
            aria-label="Switch to dark theme"
          />
        )}


          <div className="flex flex-col items-center justify-center w-full p-8 mb-32">
            <InputBox />
            <button onClick={handdleclick} className="text-black">Notification</button>
            <List />
          </div>
     

       
      </div>
    </div>
  );
}
