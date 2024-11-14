import { useState } from "react"

const Date =()=>{
const [date, setDate]= useState(false)
function toggleDate(){
    setDate(!date)
}
return {date , toggleDate}
}
export {Date}