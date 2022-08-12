import React, {useState} from "react";
import './Board.css'


export default function Board ( {boardGenerator, width, rowsOfThree, rowsOfFour, columnsOfFour, columnsOfThree, newboard } ) {

    const [colorDragged, setColorDragged] = useState(null)
    const [colorReplaced, setColorReplaced] = useState(null)
    //Drag functions make the game work!!

    const dragStart= (e) => {
      setColorDragged(e.target)
      console.log('dragstart')
    }   

    const dragDrop = (e) => {
      setColorReplaced(e.target)
      console.log('dragdrop')
    }

    const dragEnd = (e) => {
        //where the magic happens..
        const colorReplacedId = colorReplaced.getAttribute('data') 
        const ColorDraggedId = colorDragged.getAttribute('data')

        const validMoves = [
          parseInt(ColorDraggedId) + 1,
          ColorDraggedId - 1,
          parseInt(ColorDraggedId) + width,
          ColorDraggedId - width
        ]
        const isValid = validMoves.includes(parseInt(colorReplacedId))
        console.log(isValid)
        if(isValid) {

          boardGenerator[colorReplacedId] = colorDragged.getAttribute('src')
          boardGenerator[ColorDraggedId] = colorReplaced.getAttribute('src')
        }


        const isARowOfThree = rowsOfThree()
        const isARowOfFour = rowsOfFour()
        const isAColumnOfThree = columnsOfThree()
        const isAColumnOfFour = columnsOfFour()

        if(isValid && colorReplacedId && (isARowOfFour || isARowOfThree || isAColumnOfFour || isAColumnOfThree)) {
          setColorDragged(null)
          setColorReplaced(null)
        } else {
          boardGenerator[colorReplacedId] = colorReplaced.getAttribute('src')
          boardGenerator[ColorDraggedId] = colorDragged.getAttribute('src')
          newboard(boardGenerator)
        }

    }

    return (
        <div className="BOARD">
        {boardGenerator.map((color, index) => {
            return (
                <img
                className="IMG"
                src={color}
                alt={color}
                key={index}
                style={{backgroundColor: color}}
                data={index}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
                ></img>
           ) 
        })}
    </div>
    )
}