/**
 * src/Routes/Event.jsx
 */


import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { WSContext } from '../Contexts'
import { EventContext } from '../Contexts'
import { Connecting } from '../Components/Connecting'
import { Disconnected } from '../Components/Disconnected'

import {
  Welcome,
  Lobby
} from '../Pages/Event'


export const Event = () => {
  const { host/* , player_id*/ } = useParams()
  const {
    requestSocketToOpen,
    socketIsOpen,
    socketError
  } = useContext(WSContext)
  const {
    player,
    setHost,
    setPlayer
  } = useContext(EventContext)


  const page = (() => {
    if (!socketIsOpen) {
      if (!socketError) {
        return <Connecting />
      } else {
        return <Disconnected error={socketError} />
      }
    } else if (!player) {

      return <Welcome host={host}/>
    } else {
      return <Lobby />
    }
  })()


  const setParams = () => {
    setHost(host || "")
    // setPlayer(player_id || "")
  }


  const openSocketIfNeeded = () => {
    if (!socketIsOpen) {
      requestSocketToOpen()
    }
  }


  useEffect(openSocketIfNeeded, [])
  useEffect(setParams, [host /*, player_id */])


  return (
    <div id="event">
      {page}
    </div>
  )
}