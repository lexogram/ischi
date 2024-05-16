/**
 * Context.jsx
 * description
 */

import React from 'react'

import { NavProvider, NavContext } from './1_NavContext'
import { WSProvider, WSContext } from './2_WSContext'
import { I18nProvider, I18nContext } from './3_I18nContext'
import { UserProvider, UserContext } from './4_UserContext'
import { CreatorProvider, CreatorContext } from './5_CreatorContext'
import { GameProvider, GameContext } from './6_GameContext'
import { EventProvider, EventContext } from './7_EventContext'



const Provider = ({ children }) => {
  return (
    <NavProvider>
      <WSProvider>
        <I18nProvider>
          <UserProvider>
            <CreatorProvider>
              <GameProvider>
                <EventProvider>
                  {children}
                </EventProvider>
              </GameProvider>
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
  GameContext,
  EventContext
}