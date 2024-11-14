import { useState } from "react";
const Component=(type="Add-Task")=>{
    const [component, setComponent]= useState(type)
    function OnChoose(newType:string) {
        setComponent(newType);
        console.log("component is ", component)
      }
    
    return {component, OnChoose}
}
export {Component}