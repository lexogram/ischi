/**
 * src/Pages/Event/Room/Participants.jsx
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
  const { roomHost, startGame } = useContext(EventContext)
  const memberEntries = Object.values(members || {})


  // For the actual host, roomHost is empty. Show Start Now button
  const showStartNow = !roomHost
  const addEmpties = 4 - showStartNow

  while (memberEntries.length < addEmpties) {
    memberEntries.push("empty")
  }


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
          emoji=""
          $live={true}
          action={startGame}
          createdTime={+new Date()}
          name
          text={t("event.start-now")}
        />
      )
    }
  }
  

  const startIfHostPlusThreeOtherPlayers = () => {
    if (showStartNow && memberEntries.length === 4) {
      startGame()
      // The fourth member will have been shown only for a momen.
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