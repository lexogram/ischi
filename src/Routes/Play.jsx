/**
 * src/Routes/Play.jsx
 */


import React, { useContext, useEffect } from 'react'
import { WSContext } from '../Contexts'
import { GameContext } from '../Contexts'

import { Connecting } from '../Pages/Play'
import { Disconnected } from '../Pages/Play'
import { JoinRoom } from '../Pages/Play'
import { ChoosePack } from '../Pages/Play'
import { Game } from '../Pages/Play'

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