/**
 * src/Routes/Play.jsx
 */


import React, { useContext } from 'react'
import { WSContext } from '../Contexts'
import { GameContext } from '../Contexts'

import { Connecting } from '../Pages/Play'
import { Disconnected } from '../Pages/Play'
import { JoinGroup } from '../Pages/Play'
import { WaitingRoom } from '../Pages/Play'
import { Game } from '../Pages/Play'


export const Play = () => {
  const {
    socketIsOpen,
    socketError,
    user_name,
    group_name,
  } = useContext(WSContext)
  const {
    gameData
  } = useContext(GameContext)



  if (!socketIsOpen) {
    if (!socketError) {
      return <Connecting />
    } else {
      return <Disconnected error={socketError} />
    }

  } else if (!user_name || !group_name) {
      return <JoinGroup />

  } else if (!gameData) {
    return <WaitingRoom />

  } else {
    return <Game />
  }
}