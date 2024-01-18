/**
 * src/Pages/Play/Game.jsx
 */


import React, { useContext } from 'react'
import { useCircles } from '../../Hooks/useCircles'
import { GameContext } from '../../Contexts'
import { NavContext } from '../../Contexts'

import { Card } from './Components/Card'
import { NextCard } from './Components/NextCard'
import { ScoreBoard } from './Components/ScoreBoard'



export const Game = () => {
  const { gameData } = useContext(GameContext)
  const { outletLeft } = useContext(NavContext)
  const { d, r, x, y } = useCircles(outletLeft)
  let {
    index,
    nextIndex,
    randomIndices,
    cardData,
    images
  } = gameData


  let match
  let indices
  const showScore = isNaN(index)

  if (showScore) {
    indices = randomIndices.slice(-2) // last two: game is over

  } else {
    if (index === -1) {
      // This user is joining at a time when the game is paused,
      // waiting for the owner to click "Next"
      index = isNaN(nextIndex) ? images.length - 2 : nextIndex - 1
    }

    indices = randomIndices.slice(index, index + 2)


    // Find the file name of the images that match
    const images1 = cardData[indices[0]]
                    .images
                    .map( image => image.imageIndex)
    const images2 = cardData[indices[1]]
                    .images
                    .map( image => image.imageIndex)
    const imageIndex = images1.find(
      index => images2.indexOf(index) + 1
    )
    match = images[imageIndex].source
  }


  // return (
  //   <>
  //     <Board
  //       indices={indices}
  //       match={match}
  //       showScore={showScore}
  //     />
  //   </>
  // )

  return (
    <div id="board">
      <Card
        index={indices[0]}
        top={true}
        d={d}
        x={x}
        y={y}
        match={match}
      />
      <Card
        index={indices[1]}
        d={d}
        x={x}
        y={y}
        match={match}
      />
      { showScore ? <ScoreBoard /> : <NextCard r={r}/> }
    </div>
  )
}