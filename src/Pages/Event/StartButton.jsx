/**
 * src/Pages/Event/Room/StartButton.jsx
 */


import React from 'react'
import { Timer } from './Timer'

export const StartButton = ({ emoji, room, $live }) => {


  return (
    <button
      className={$live ? "live" : ""}
    >

      { $live && <Timer />}
      <span className="emoji">
        {emoji}
      </span>
      <span 
        className="start"
      >
        {$live ? "Join" : "Start"}
      </span>
    </button>
  )
}