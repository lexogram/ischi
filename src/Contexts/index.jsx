/**
 * Context.jsx
 * description
 */

import React from 'react'

import { NavProvider, NavContext } from './NavContext'
import { WSProvider, WSContext } from './WSContext'
import { UserProvider, UserContext } from './UserContext'
import { GameProvider, GameContext } from './GameContext'



const Provider = ({ children }) => {
  return (
    <NavProvider>
      <WSProvider>
        <UserProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </UserProvider>
      </WSProvider>
    </NavProvider>
  )
}


export {
  Provider,
  NavContext,
  WSContext,
  UserContext,
  GameContext
}