import { useState } from "react"

export default function Player({initialName,symbol,isActive,onChangeName}){
    const [playerName,setPlayerName] =useState(initialName)
    const [isEditing,setIsEditiong] = useState(false)
    function handleEditClick(){
        setIsEditiong(editing =>!editing)
        
        if(isEditing){
            
            onChangeName(symbol,playerName)
        }
      
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }
    let editiablePlayerName =<span className="player-name">{playerName}</span>
    if(isEditing){
        editiablePlayerName= <input type="text" required value={playerName} onChange={handleChange}></input>
    }
    return (  <li className={isActive ?'active':undefined}>
        <span className="player">
            {editiablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? 'Save' :'Edit'}</button>
      </li>)
}