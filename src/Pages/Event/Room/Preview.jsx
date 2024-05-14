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

  console.log("Preview",{ player, room, organization, roomHost });
  // console.log("typeof joinRoom:", typeof joinRoom);
  // console.log("gameData:", gameData);


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


  const getGameData = () => {
    const data = {
      user_name: player,
      room,
      create_room: false
    }

    console.log("getGameData", JSON.stringify(data, null, '  '));

    joinRoom(data)
  }

  // Tell WSContext to send the message "send_user_to_room"
  useEffect(getGameData, [])

  return (
    // <h1>room: {room}, roomHost: {roomHost}</h1>
    <div className="preview">
      <ul>{preview}</ul>
    </div>
  )
}