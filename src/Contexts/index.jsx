/**
 * Context.jsx
 * description
 */

import React from 'react'

import { WSProvider, WSContext } from './WSContext'
import { GameProvider, GameContext } from './GameContext'



const Provider = ({ children }) => {
  return (
    <WSProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </WSProvider>
  )
}


export {
  Provider,
  WSContext,
  GameContext
}