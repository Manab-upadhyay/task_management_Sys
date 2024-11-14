"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface ModeToggleReturnType {
    theme: string | undefined; // Theme can be undefined initially
    ChangeTheme: () => void;
}

export function ModeToggle(): ModeToggleReturnType {
 
    const { theme, setTheme } = useTheme();

    useEffect(()=>{
        console.log("theme")
    }, [theme])
    function ChangeTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
       
    }


    return { theme, ChangeTheme };
}
