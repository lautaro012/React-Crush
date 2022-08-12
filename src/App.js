import Score from './Components/Score/Score'
import Moves from './Components/Moves/Moves'
import './App.css'
import { useEffect, useState } from 'react';
import Board from './Components/Board/Board';
import ANGULAR from './Components/Icons/ANGULAR.png'
import REACT from './Components/Icons/REACT.png'
import VUE from './Components/Icons/VUE.jpg'
import JS from './Components/Icons/JS.jpg'
import HTML from './Components/Icons/HTML.jpg'
import BOOTSTRAPP from './Components/Icons/BOOTSTRAPP.jpg'
import BLANK from './Components/Icons/BLANK.png'
import Timer from './Components/Timer/Timer'
const width = 8;

const candyColors = [
   REACT,
   VUE,
   JS,
   BOOTSTRAPP,
   ANGULAR,
   HTML
]

function App() {

  const [boardGenerator, setBoardGenerator] = useState([])
  const [score, setScore] = useState(0)

  const columnsOfThree = () => {
    //47 is exactly for a width of 8. excluding last rows
    for (let i = 0; i <= 47 ; i++) {

      const sucessColumn = [i, i + width, i + width * 2]
      const scopeColor = boardGenerator[i]
      const isBlank = boardGenerator[i] === BLANK

      if(sucessColumn.every(color => boardGenerator[color] === scopeColor && !isBlank)) {
        setScore(score => score + 3)
        sucessColumn.forEach(color => boardGenerator[color] = BLANK )
        return true
      }
    }
  }
  
  const rowsOfThree = () => {
    for (let i = 0; i < 64 ; i++) {
      const sucessRow = [i, i + 1, i + + 2]
      const scopeColor = boardGenerator[i]
      const isBlank = boardGenerator[i] === BLANK
      //exclude last columms
      const excludeColumns = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      if(excludeColumns.includes(i)) continue;

      if(sucessRow.every(color => boardGenerator[color] === scopeColor && !isBlank)) {
        setScore(score => score + 3)
        sucessRow.forEach(color => boardGenerator[color] = BLANK )
        return true
      }
    }
  }
  
  const columnsOfFour = () => {
    //39 is exactly for a width of 8. excluding last rows
    for (let i = 0; i <= 39 ; i++) {

      const sucessColumn = [i, i + width, i + width * 2, i + width * 3]
      const scopeColor = boardGenerator[i]
      const isBlank = boardGenerator[i] === BLANK
      if(sucessColumn.every(color => boardGenerator[color] === scopeColor && !isBlank)) {
        setScore(score => score + 4)
        sucessColumn.forEach(color => boardGenerator[color] = BLANK )
        return true
      }
    }
  }

  const rowsOfFour = () => {
    for (let i = 0; i < 64 ; i++) {
      const sucessRow = [i, i + 1, i + 2, i + 3]
      const scopeColor = boardGenerator[i]
      const isBlank = boardGenerator[i] === BLANK
      //exclude last columms
      const excludeColumns = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,  54, 55, 62, 63, 64]
      if(excludeColumns.includes(i)) continue;

      if(sucessRow.every(color => boardGenerator[color] === scopeColor && !isBlank)) {
        setScore(score => score + 4)
        sucessRow.forEach(color => boardGenerator[color] = BLANK )
        return true
      } 
    }
  }

  const moveColorsBelow = () => {
    for (let i = 0; i < 55; i++) {
      const begining = [0,1,2,3,4,5,6,7]
      const isFirstRow = begining.includes(i)

      if(isFirstRow && boardGenerator[i] === BLANK){
          let randomNumber = Math.floor(Math.random() * candyColors.length);
          boardGenerator[i] = candyColors[randomNumber];
      }
      
      if(boardGenerator[i + width] === BLANK){
        boardGenerator[i + width] = boardGenerator[i]
        boardGenerator[i] =  BLANK
      }
    }
  }
  
  
  const createBoard = () => {
    const currentColor = []
    // create the 64 colors
    for (let i = 0; i < width * width ; i++) {
      const randomNumber = Math.floor(Math.random() * candyColors.length);
      const randomColor = candyColors[randomNumber];
      currentColor.push(randomColor)
    }
    setBoardGenerator(currentColor)
  }

  useEffect(() => {
    createBoard()
  }, [])

  //useEffect for updates 

  useEffect(() => {
    const timer = setInterval(() => {
      moveColorsBelow()
      rowsOfFour()
      columnsOfFour()
      columnsOfThree()
      rowsOfThree()
      setBoardGenerator([...boardGenerator])
    }, 100)
    return () => clearInterval(timer)
  }, [moveColorsBelow, columnsOfFour, rowsOfFour, columnsOfThree, rowsOfThree])

  return (
    <div className="App">
        <Timer></Timer>
        <Board
        boardGenerator={boardGenerator} 
        width={width} 
        rowsOfThree={rowsOfThree}
        rowsOfFour={rowsOfFour} 
        columnsOfFour={columnsOfFour} 
        columnsOfThree={columnsOfThree}
        newboard={newboard => setBoardGenerator([...newboard])}
        />
      <Score
      score={score}
      />
      <Moves/>
    </div>
  );
}

export default App;
