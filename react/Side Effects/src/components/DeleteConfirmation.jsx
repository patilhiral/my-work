import { useEffect, useState } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const TIMER=3000;
  const [remaingingTime,setRemaingingTime] =useState(TIMER)
  useEffect(()=>{
    const interval = setInterval(()=>{
      setRemaingingTime(prevTime =>prevTime-10)
    },10);

    return ()=>{
      clearInterval(interval)
    }
  },[])
  useEffect(()=>{
    const timer = setTimeout(()=>{
      onConfirm();
    },TIMER)
    return ()=>{
      clearTimeout(timer)
    }
  },[onConfirm])
 console.log(remaingingTime)
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remaingingTime} max={TIMER}/>
    </div>
  );
}
