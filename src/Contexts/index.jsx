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
import { CreatorProvider, CreatorContext } from './CreatorContext'
import { GameProvider, GameContext } from './GameContext'



const Provider = ({ children }) => {
  return (
    <NavProvider>
      <WSProvider>
        <I18nProvider>
          <UserProvider>
            <CreatorProvider>
              <CreateProvider>
                <GameProvider>
                  {children}
                </GameProvider>
              </CreateProvider>
            </CreatorProvider>
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
  CreatorContext,
  CreateContext,
  GameContext
}