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
import { LeaveGame } from '../../../Components/LeaveGame'
import { Preview } from './Preview'
import { Participants } from './Participants'


export const Room = () => {
  const {
    roomHost,
    player
  } = useContext(EventContext)

  // Strip any existing emoji+name from the location.href...
  const safe_host = encodeURI(roomHost || player) + "/"
  let href = location.href.replace(safe_host, "")
  // Ensure href ends in "/"
  if (href.slice(-1) !== "/") {
    href += "/"
  }
  // href = "http://domain:PORT/ischi#/event/nevzorovyh"
  // ... and then add it (again)
  const link = `${href}${safe_host}`

  return (
    <div className="room">
      <QRCode link={link}/>
      <LeaveGame $isPreview={true}/>
      {/* <NoStrangers /> */}
      <Participants />
      <Preview />
    </div>
  )
}