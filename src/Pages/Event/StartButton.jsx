/**
 * src/Pages/Event/Room/StartButton.jsx
 */


import React from 'react'
import { Timer } from './Timer'

export const StartButton = ({
  emoji,
  $live,
  action,
  createdTime,
  name,
  text
}) => {


  return (
    <button
      className={$live ? "live" : "primary"}
      onClick={action}
    >

      { $live && <Timer />}
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