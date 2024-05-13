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


import React from 'react'
import { Preview } from './Preview'
import { QRCode } from '../../../Components/QRCode'
import { Participants } from './Participants'
import { StartButton } from '../StartButton'


export const Room = (props) => {


  return (
    <div className="room">
      <QRCode />
      <Preview />
      <Participants />
      <StartButton />
    </div>
  )
}