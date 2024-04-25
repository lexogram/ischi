/**
 * Context.jsx
 * description
 */

import React from 'react'

import { NavProvider, NavContext } from './NavContext'
import { WSProvider, WSContext } from './WSContext'
import { UserProvider, UserContext } from './UserContext'
// import { CreateProvider, CreateContext } from './CreateContext'
import { LayoutProvider, LayoutContext } from './LayoutContext'
import { GameProvider, GameContext } from './GameContext'



const Provider = ({ children }) => {
  return (
    <NavProvider>
      <WSProvider>
        <UserProvider>
          <LayoutProvider>
            {/* <CreateProvider> */}
              <GameProvider>
                {children}
              </GameProvider>
            {/* </CreateProvider> */}
          </LayoutProvider>
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
  LayoutContext,
  // CreateContext,
  GameContext
}