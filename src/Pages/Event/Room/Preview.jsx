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
    roomHost // will be set to `<emoji>_name` for visitor
  } = useContext(EventContext)
  const { joinRoom } = useContext(WSContext)
  const { gameData } = useContext(GameContext)

  // console.log("Preview",{ player, room, organization, roomHost });
  // console.log("typeof joinRoom:", typeof joinRoom);
  // console.log("gameData:", gameData);


  if (!room) { // for player
    room = roomHost
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



  /** Two cases: room host and player joining the room
   *
   *  1. The room host will have sent a "create_event_room"
   *     message to the server and will have received a
   *     "room_created" message in reply, with a content like
   *     { ..., gameData, ... }. So gameData will already be set.
   *
   *     If the host reconnects, WSContext will attempt to
   *     restoreUserId(), and the userIdRestored() function will
   *     call joinRoom(), so again `gameData` will be set.
   *
   *  2. A player who joins the room will have been sent here
   *     by the Event Route, which read in the `room_host` param
   *     and called EventContext's setRoomHost(). This player
   *     will not have joined the room yet. Joining the room
   *     triggers setUserNameAndRoom() in the ischi.js script on
   *     the server, which sends a "gameData" message which
   *     triggers loadGameData() in GameContext, and then we'll
   *     re-render Preview with gameData all set.
   *
   *     getGameData() is only triggered by useEffect the first
   *     time this Preview component is rendered.
   *
   *     If a player disconnects and then reconnects, the same
   *     sequence will occur.
   */
  const getGameData = () => {
    if (!gameData) {
      const data = {
        user_name: player,
        room,
        create_room: false
      }

      joinRoom(data)
    }
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