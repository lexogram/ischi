/**
 * src/Routes/Play.jsx
 */


import React, { useContext, useEffect } from 'react'
import { WSContext } from '../Contexts'
import { GameContext } from '../Contexts'

import Screens from  '../Pages/Play'
const {
  Connecting,
  Disconnected,
  JoinRoom,
  TeamManagement,
  TeamMembers,
  ChoosePack,
  Game
} = Screens

import '../SCSS/play.scss'


export const Play = () => {
  const {
    requestSocketToOpen,
    socketIsOpen,
    reconnectionFailed,
    socketError,
    user_id,
    user_name,
    room,
    create_room,
    host_name,
    host_id,
    teams,
  } = useContext(WSContext)
  const {
    gameData
  } = useContext(GameContext)


  const screenToShow = (() => {
    if (!user_name || !room) {
      return "JoinRoom"

    } else if (!gameData) {
      if (teams.length > 1) {
        if (host_id === user_id) {
          return "TeamManagement"
        } else {
          return "TeamMembers"
        }
      } else {
        return "ChoosePack"
      }

    } else {
      return "Game"
    }
  })()


  const page = (() => {
    if (!socketIsOpen) {
      if (!socketError) {
        return <Connecting />
      } else {
        return <Disconnected error={socketError} />
      }

    } else if (!user_name || !room) {
        return <JoinRoom />

    } else if (!gameData) {
      return <ChoosePack />

    } else {
      return <Game />
    }
  })()


  const openSocketIfNeeded = () => {
    if (!socketIsOpen) {
      requestSocketToOpen()
    }
  }


  useEffect(openSocketIfNeeded, [])


  return (
    <div id="play">
      {page}
    </div>
  )
}