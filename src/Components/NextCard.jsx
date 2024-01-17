/**
 * src/Components/NextCard.jsx
 */


import React, { useContext } from 'react'
import { WSContext, GameContext } from '../Contexts'


export const NextCard = ({ r }) => {
  const { user_id, owner_id } = useContext(WSContext)
  const {
    requestNextCard,
    foundBy,
    delay
  } = useContext(GameContext)
  const isOwner = user_id === owner_id

  if (!isOwner || !isNaN(delay)) {
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