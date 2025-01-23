import { useState } from "react";

export function useAsingTask(){
    const[asignedMember,setAsignedMember]= useState<string|null>(null)
    function handdleClick(name:string){
        setAsignedMember(name)
    }
    return {handdleClick,asignedMember}
}