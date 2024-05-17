/**
 * src/Pages/Event/Room/StartButton.jsx
 */


import React from 'react'
import { Timer } from './Timer'

export const StartButton = ({
  emoji,
  action,
  text,
  // For future use with a minute timer. $live may be redundant
  $live,
  createdTime
}) => {


  return (
    <button
      className={$live ? "live" : "primary"}
      onClick={action}
    >

      { $live && <Timer createdTime={createdTime} />}
      <span className="emoji">
        {emoji}
      </span>
      <span 
        className="start"
      >
        {text}
      </span>
    </button>
  )
}