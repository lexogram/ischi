/**
 * src/Pages/Event/Lobby/Start.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { EventContext } from '../../../Contexts'
import { StartButton } from '../StartButton'


export const Start = ({ folder }) => {
  const { t } = useTranslation()
  const {
    emoji,
    room,
    joinRoom,
    createRoom
  } = useContext(EventContext)

  // In the future, room (or something similar) will contain
  // data about the oldest publicly available game that has not
  // started yet.
  const { name, /* emoji, */ createdTime } = (room || {})


  const enterRoom = () => {
    createRoom(folder)
  }


  return (
    <div className="start">
      { room?.emoji && <StartButton
        $live={true}
        emoji={room.emoji}
        action={joinRoom}
        createdTime={createdTime}
        name={name}
        text={t("event.join")}
      />}
      <StartButton
        emoji={emoji}
        action={enterRoom}
        text={t("event.start")}
      />
    </div>
  )
}