/**
 * src/Pages/Event/Room/Participants.jsx
 * 
 * Shows a block of four cells containing:
 * 1.   The host's emoji
 * 2-3. Empty square or a player's emoji
 * 4.   EITHER: Start Now button (on host's screen)
 *      OR:     Empty square (on player's screens)
 *      OR:     (Momentarily) a fourth player's emoji    
 */


import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { WSContext } from '../../../Contexts'
import { EventContext } from '../../../Contexts'
import { StartButton } from '../StartButton'

const SPLIT_NAME_REGEX = /(.*)_(.*)/


export const Participants = () => {
  const { t } = useTranslation()
  const { members } = useContext(WSContext)
  const {
    roomHost,
    createdTime,
    startGame
  } = useContext(EventContext)
  const memberEntries = Object.values(members || {})


  // For the actual host, roomHost is empty. Show Start Now button
  const showStartNow = !roomHost
  const addEmpties = 4 - showStartNow

  while (memberEntries.length < addEmpties) {
    memberEntries.push("empty")
  }


  // Create a block of 4 divs, containing emojis, nothing or
  // a Start Now button 
  const memberDivs = memberEntries.map(( memberName, index ) => {
    const match = SPLIT_NAME_REGEX.exec(memberName)

    let emoji, name
    if (match) {
      ([ , emoji, name ] = match)

    } else {
      memberName = `empty_${index}`
      emoji = ""
      name = t("event.no-player-yet")
    }

    return (
      <div
        key={memberName}
        className="button like"
      >
        <span title={name}>{emoji}</span>
      </div>
    )
  }).filter( item => !!item )

  
  if (showStartNow) {
    // The game still needs a fourth member... unless the user
    // starts the game now
    if (memberDivs.length < 4) {
      memberDivs.push(
        <StartButton
          key="start"
          emoji=""
          createdTime={createdTime} //\\ intended for showing
          $live={true}                // a minute timer
          action={startGame}
          text={t("event.start-now")}
        />
      )
    }
  }
  

  const startIfHostPlusThreeOtherPlayers = () => {
    if (showStartNow && memberEntries.length === 4) {
      startGame()
      // The fourth member will have been shown only for a moment.
      // The game will start just as soon as a message can be sent
      // to the server and back.
    }
  }
  useEffect(startIfHostPlusThreeOtherPlayers)


  return (
    <div className="members">
      {memberDivs}
    </div>
  )
}