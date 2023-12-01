import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X':'Player1',
   'O':'Player2'
}
const INITIAL_GAMEBOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];
function deriveActivePlayer(gameTurns){
  let currPlayer ='X'
  if(gameTurns.length>0 && gameTurns[0].player ==='X'){
    currPlayer='O';
  }
  return currPlayer;
}
function deriveWinner(gameBoard,players){
  let winner;
 for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol 
      && firstSquareSymbol === thirdSquareSymbol){
        console.log(players)
      winner = players[firstSquareSymbol];
    }
 }
 return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAMEBOARD.map(array=>[...array])];
  for(const turn of gameTurns){
   const {square,player}=turn;
   const {row,col}=square;
   gameBoard[row][col]=player;
  }
  return gameBoard;
}
function App() {
  const[players,setPlayers]=useState({'X':'Player1','O':'Player2'})
  const[gameTurns,setGameTurns] =useState([])
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner =  deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 & !winner;
  function handleSelectSquare(rowIndex,colIndex){
  
    setGameTurns(prevTurns=>{
      const currPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns =[
        {square:{row:rowIndex,col:colIndex}, player:currPlayer},
        ...prevTurns]

        return updatedTurns;
    })
  }
  function handleRestart(){
   setGameTurns([])
  }

  function handlePlayerNameChanged(symbol,newName){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
    })

  }
  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer==='X'} onChangeName={handlePlayerNameChanged}></Player>
        <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer==='O'} onChangeName={handlePlayerNameChanged}></Player>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
     <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns} />
   </main>
  )
}

export default App
