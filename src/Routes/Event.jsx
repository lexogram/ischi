/**
 * src/Routes/Event.jsx
 */


import React, { useContext, useEffect } from 'react'
import { WSContext } from '../Contexts'
import { EventContext } from '../Contexts'
import { Connecting } from '../Components/Connecting'
import { Disconnected } from '../Components/Disconnected'

import {
  Welcome,
  Lobby
} from '../Pages/Event'


export const Event = () => {
  const {
    requestSocketToOpen,
    socketIsOpen,
    socketError
  } = useContext(WSContext)
  const {
    avatar
  } = useContext(EventContext)


  const page = (() => {
    if (!socketIsOpen) {
      if (!socketError) {
        return <Connecting />
      } else {
        return <Disconnected error={socketError} />
      }
    } else if (!avatar) {
      return <Welcome />
    } else {
      return <Lobby />
    }
  })()


  const openSocketIfNeeded = () => {
    if (!socketIsOpen) {
      requestSocketToOpen()
    }
  }


  useEffect(openSocketIfNeeded, [])


  return (
    <div id="event">
      {page}
    </div>
  )
}