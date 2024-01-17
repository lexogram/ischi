/**
 * src/Compenents/Board.jsx
 */


import React from 'react'
import { useResize } from '../Hooks/useResize'

import { Card } from '../Components/Card'
import { NextCard } from './NextCard'
import { ScoreBoard } from '../Components/ScoreBoard'




export const Board = ({ indices, match, showScore }) => {
  const [ width, height ] = useResize()

  let d
  let x = 0
  let y = 0

  if (width < height / 2) {
    d = width
    y = height / 2 - width
  } else if (height < width / 2) {
    d = height
    x = width / 2 - height
  } else {
    d = (width + height - Math.sqrt(2 * width * height))
  }
  const r = d * (Math.sqrt(2) - 1) / 2

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