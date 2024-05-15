/**
 * Component.jsx
 * description
 */

import React, { useContext } from 'react'
import { GameContext } from '../../Contexts'
import { EventContext } from '../../Contexts'

export const Score = (props) => {
  const { members, score } = useContext(GameContext)

  return (<p>{score}</p>)
}