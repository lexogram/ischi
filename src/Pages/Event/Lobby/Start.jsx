/**
 * src/Pages/Event/Lobby/Start.jsx
 */


import React, { useContext } from 'react'
import { EventContext } from '../../../Contexts'
import { StartButton } from '../StartButton'


export const Start = ({ folder }) => {
  const {
    emoji,
    room = { emoji: "🎁" },
    joinRoom,
    createRoom
  } = useContext(EventContext)
  const { name, /* emoji, */ createdTime } = room


  const enterRoom = () => {
    createRoom(folder)
  }


  return (
    <div className="start">
      { room.emoji && <StartButton
        $live={true}
        emoji={room.emoji}
        action={joinRoom}
        createdTime={createdTime}
        name={name}
      />}
      <StartButton
        emoji={emoji}
        action={enterRoom}
      />
    </div>
  )
}