/**
 * src/Pages/Event/Room/index.js
 * 
 * The thumbnail for the pack
 * A scrolling list of images in the pack
 * A QR code, so that other people can join you
 * A Start Now button
 * The emoji of each person who has entered the room
 * A line that takes 1 minute to draw a complete circle. When the minute is up, the game will start automatically, and no new players can join.
 */


import React, { useContext } from 'react'
import { EventContext } from '../../../Contexts'
import { QRCode } from '../../../Components/QRCode'
// import { NoStrangers } from './NoStrangers'
import { GoBack } from '../../../Components/GoBack'
import { Preview } from './Preview'
import { Participants } from './Participants'


export const Room = () => {
  const {
    leaveTheGame,
    link
  } = useContext(EventContext)

  return (
    <div className="room">
      <QRCode link={link}/>
      <GoBack action={leaveTheGame}/>
      {/* <NoStrangers /> */}
      <Participants />
      <Preview />
    </div>
  )
}