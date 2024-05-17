/**
 * src/Pages/Play/6_Game.jsx
 */




import React, { useContext } from 'react'
import { useCircles } from '../../Hooks/useCircles'
import { GameContext } from '../../Contexts'
import { NavContext } from '../../Contexts'

import { Card } from './Components/Card'
import { NextCard } from './Components/NextCard'
import { ScoreBoard } from './Components/ScoreBoard'
import { GoBack } from '../../Components/GoBack'



export const Game = ({action}) => {
  const { gameData } = useContext(GameContext)
  const { outletLeft } = useContext(NavContext)
  const { d, r, x, y } = useCircles(outletLeft)
  let {
    index,
    nextIndex,
    randomIndices,
    cardData,
    imageSources
  } = gameData


  let match
  let indices
  const showScore = isNaN(index)

  if (showScore) {
    indices = randomIndices.slice(-2) // last two: game is over

  } else {
    if (index === -1) {
      // This user is joining at a time when the game is paused,
      // waiting for the host to click "Next"
      index = isNaN(nextIndex) ? imageSources.length - 2 : nextIndex - 1
    }

    indices = randomIndices.slice(index, index + 2)


    // Find the file name of the images that match. First get at
    // array of indices of where to find the pictures for each
    // card in imageSources.
    const images1 = cardData[indices[0]]
                    .images
                    .map( image => image.imageIndex)
    // E.g.: [ 42, 54, 48, 29, 7, 23, 17, 11 ]
    const images2 = cardData[indices[1]]
                    .images
                    .map( image => image.imageIndex)
    // E.g.: [ 18, 10, 34, 2, 26, 42, 51, 43 ]
    // (imageIndex in the operation below will be set to 42)
    const imageIndex = images1.find(
      // For each value (index of an image in imageSources),
      // in images1, check if the same value can be found in
      // images2. If not, indexOf() returns -1; with +1, this
      // becomes 0, or falsy. If the same value _is_ found, it
      // will be at least 0. With +1 it will be truthy.
      index => images2.indexOf(index) + 1
    )

    if (!isNaN(imageIndex)) {
      try {
        match = imageSources[imageIndex].source

      } catch (error) {
        console.log("\n**********************");
        console.log("error:", error);
        console.log(
          "imageSources:", JSON.stringify(imageSources, null, 2)
        );
        console.log("imageIndex:", imageIndex);
        console.log("imageSources[imageIndex]:", imageSources[imageIndex]);
        console.log("images1:", images1);
        console.log("images2:", images2);
        console.log("**********************\n")
      }

    } else {
      console.log("\n**********************");
      console.log("** NO MATCH WAS FOUND **")
      console.log("images1:", images1);
      console.log("images2:", images2);
      console.log("\n**********************");
    }
  }

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
      <NextCard r={r}/>
      <ScoreBoard gameOver={showScore} action={action}/>
      <GoBack action={action}/>
    </div>
  )
}