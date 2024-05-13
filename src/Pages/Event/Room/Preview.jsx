/**
 * src/Pages/Event/Room/Preview.jsx
 */


import React, { useContext, useEffect } from 'react'
import {
  EventContext,
  WSContext,
  GameContext
} from '../../../Contexts'
import { ISCHI } from '../../../Constants'


export const Preview = () => {
  let {
    player,
    room,    // will be set to `nevzorovyh/<emoji>_name` for host
    organization,
    roomHost // will be set to `<emoji>_name` for visitor
  } = useContext(EventContext)
  const { joinRoom } = useContext(WSContext)
  const { gameData } = useContext(GameContext)

  if (!room) {
    room = `${organization}/${roomHost}`
  }

  let preview = []
  const root = gameData?.root
  if (root) {
    const imageSources = gameData.imageSources
    preview = imageSources.map(({ source }) => {
      const src = `${ISCHI}/${root}${source}`
      return (
        <li
          key={source}
        >
          <img src={src} alt={source} />
        </li>
      )
    })
  }

  const data = {
    user_name: player,
    room,
    create_room: false
  }

  // Tell WSContext to send the message "send_user_to_room"
  ;
  useEffect(() => joinRoom(data), [])

  return (
    // <h1>room: {room}, roomHost: {roomHost}</h1>
    <div className="preview">
      <ul>{preview}</ul>
    </div>
  )
}