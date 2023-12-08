import Header from "./components/Header"
import Result from "./components/Results";
import UserInput from "./components/UserInput"
import { useState } from "react"

function App() {
  const[userInput,setUserInput] =useState({
    'initialInvestment':10000,
    'annualInvestment':1200,
    'expectedReturn':6,
    'duration':10
});

const inputIsValid =userInput.duration>=1;
function handleChange(inputIdentifier,newValue){
  setUserInput((prevUserInput)=>{
     return{
      ...prevUserInput,
      [inputIdentifier]:+newValue
     }
  })
}
  return (
    <>
     <Header></Header>
     <UserInput onChange={handleChange} userInput={userInput}></UserInput>
     {inputIsValid && <Result userInput={userInput}/>}
     {!inputIsValid && <p className="center">Please add duration greater than zero</p>}
    </>
   
  )
}
export default App
