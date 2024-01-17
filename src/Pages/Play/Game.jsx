/**
 * src/Pages/Game.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../../Contexts'

import { Board } from './Components/Board'



export const Game = () => {
  const { gameData } = useContext(GameContext)
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


  return (
    <>
      <Board
        indices={indices}
        match={match}
        showScore={showScore}
      />
    </>
  )
}