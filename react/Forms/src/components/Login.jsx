import { useState } from "react";

export default function Login() {
  const [enteredValues,setEnteredValues] = useState({
    email:'',
    password:''
  });

  const[didEdited,setdidEdited] =  useState({
    email:false,
    password:false
  });
  const emailIsValid  = didEdited.email && !enteredValues.email.includes('@')
  function handleSubmit(event){
    event.preventDefault();

  }
  function handleInputChange(identifier,value){
    setEnteredValues(prevValues=>({
      ...prevValues,
      [identifier]:value
    }))
    setdidEdited(prevEdit=>({
      ...prevEdit,
      [identifier]:false
    }))
  }
  function handleInputBlur(identifier){
    setdidEdited(prevEdit=>({
      ...prevEdit,
      [identifier]:true
    }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" 
          onBlur={(event)=>handleInputBlur('email')}
          onChange={(event)=>handleInputChange("email",event.target.value)}
          value={enteredValues.email} />
          <div className="control-error">{emailIsValid &&<p> Please enter valid email address</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"
              onChange={(event)=>handleInputChange("password",event.target.value)}
              value={enteredValues.password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
