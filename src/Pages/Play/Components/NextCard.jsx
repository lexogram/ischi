/**
 * src/Components/NextCard.jsx
 */


import React, { useContext } from 'react'
import { WSContext, GameContext } from '../../../Contexts'


export const NextCard = ({ r }) => {
  const { user_id, host_id } = useContext(WSContext)
  const {
    requestNextCard,
    foundBy,
    delay
  } = useContext(GameContext)
  const isHost = user_id === host_id

  if (!isHost || !isNaN(delay)) {
    return ""
  }

  const style = {
    "--radius": r + "px"
  }

  return (
    <button id="next-card"
      onClick={requestNextCard}
      style={style}
      disabled={!foundBy}
    >
      <span>Next</span>
    </button>
  )
}