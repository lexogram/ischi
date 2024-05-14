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
  Lobby,
  Room
} from '../Pages/Event'
import { Game } from '../Pages/Play/6_Game'

export const Event = () => {
  const { organization, room_host } = useParams()
  const {
    requestSocketToOpen,
    socketIsOpen,
    socketError
  } = useContext(WSContext)
  const {
    player,
    setOrganization,
    room,     // forwarded from WSContext
    roomHost, // read from params by a player who is not the host
    setRoomHost,
    startTime
  } = useContext(EventContext)


  const page = (() => {
    if (!socketIsOpen) {
      if (!socketError) {
        return <Connecting />
      } else {
        return <Disconnected error={socketError} />
      }

    } else if (!player) {
      return <Welcome organization={organization}/>

    } else if (!room && !roomHost) {
      return <Lobby />

    } else if (!startTime) {
      return <Room />

    } else {
      return <Game />
    }
  })()


  const setParams = () => {
    setOrganization(organization || "")
    setRoomHost(room_host || "")
  }


  const openSocketIfNeeded = () => {
    if (!socketIsOpen) {
      requestSocketToOpen()
    }
  }


  useEffect(openSocketIfNeeded, [])
  useEffect(setParams, [organization, room_host])


  return (
    <div id="event">
      {page}
    </div>
  )
}