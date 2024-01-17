/**
 * src/Components/ScoreBoard.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../Contexts'

export const ScoreBoard = (props) => {
  const { score, setGameData } = useContext(GameContext)
  // { <user_name>: <integer> }

  const byScore = (a, b) => {
    if (a[1] === b[1]) {
      return a[0] > b[0]
    }

    return b[1] - a[1]
  }

  let scoreboard = Object.entries(score)
  scoreboard.sort(byScore)
  scoreboard = scoreboard.map(([ name, score ], index) => (
      <li
        key={name + index}
      >
        <span className="name">{name}</span>
        <span className="score">{score}</span>
      </li>
    ))

  return (
    <div id="score">
      <div>
        <h1>Score</h1>
        <ul>
          {scoreboard}
        </ul>
      </div>
      <button
        onClick={() => setGameData()}
      >
        Play again
      </button>
    </div>
  )
}