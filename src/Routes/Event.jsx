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
  Room,
} from '../Pages/Event'
import { Game } from '../Pages/Play/6_Game'


let render = 0

export const Event = () => {
  const renders = ++render
  const { organization, room_host } = useParams()
  const {
    requestSocketToOpen,
    socketIsOpen,
    socketError
  } = useContext(WSContext)
  // const { gameOver } = useContext(GameContext)
  const {
    player,
    setOrganization,
    room,     // forwarded from WSContext
    roomHost, // read from params by players who are not host
    setRoomHost,
    startTime,
    leaveTheGame,
    leaving
  } = useContext(EventContext)

console.log(`EVENT ROUTE (render: ${renders}):
  socketIsOpen: ${socketIsOpen}
  socketError:  ${socketError}
  player:       ${player}
  room:         ${room}
  roomHost:     ${roomHost}
  startTime:    ${startTime}`)



  const page = (() => {
    if (!socketIsOpen) {
      if (!socketError) {
        return <Connecting />
      } else {
        return <Disconnected error={socketError} />
      }

    } else if (!player) {
      return <Welcome organization={organization}/>

    } else if (!room && !roomHost || leaving) {
      return <Lobby />

    } else if (!startTime) {
      return <Room />

    } else {
      return <Game action={leaveTheGame}/>
    }
  })()


  const setParams = () => {
  // console.log(`setParams organization: ${organization}, room_host: ${room_host}`)

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