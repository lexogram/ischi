/**
 * Context.jsx
 * description
 */

import React from 'react'

import { NavProvider, NavContext } from './NavContext'
import { WSProvider, WSContext } from './WSContext'
import { I18nProvider, I18nContext } from './I18nContext'
import { UserProvider, UserContext } from './UserContext'
import { CreateProvider, CreateContext } from './CreateContext'
import { LayoutProvider, LayoutContext } from './LayoutContext'
import { GameProvider, GameContext } from './GameContext'



const Provider = ({ children }) => {
  return (
    <NavProvider>
      <WSProvider>
        <I18nProvider>
          <UserProvider>
            <LayoutProvider>
              <CreateProvider>
                <GameProvider>
                  {children}
                </GameProvider>
              </CreateProvider>
            </LayoutProvider>
          </UserProvider>
        </I18nProvider>
      </WSProvider>
    </NavProvider>
  )
}


export {
  Provider,
  NavContext,
  WSContext,
  I18nContext,
  UserContext,
  LayoutContext,
  CreateContext,
  GameContext
}