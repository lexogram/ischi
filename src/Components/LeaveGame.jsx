/**
 * src/Pages/Event/Room/LeaveGame.jsx
 */


import React, { useContext } from 'react'
import { EventContext } from '../Contexts'
import exit from '../Assets/exit.png'


export const LeaveGame = ({ $isPreview }) => {
  const {
    leaveTheGame
  } = useContext(EventContext)


  return (
    <button
      className="leave-room"
      onClick={leaveTheGame}
    >
      <img src={exit} alt="exit" />
    </button>
  )
}