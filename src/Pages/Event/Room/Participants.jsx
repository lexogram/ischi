/**
 * src/Pages/Event/Room/Participants.jsx
 */


import React, { useContext, useEffect, useState } from 'react'
import { WSContext } from '../../../Contexts'
import { StartButton } from '../StartButton'

const SPLIT_NAME_REGEX = /(.*)_(.*)/


export const Participants = (props) => {
  const { members } = useContext(WSContext)
  const memberEntries = Object.values(members || {})


  const start = () => {
    
  }


  const memberDivs = memberEntries.map( memberName => {
    const match = SPLIT_NAME_REGEX.exec(memberName)
    if (match) {
      const [ , emoji, name ] = match

      return (
        <div
          key={memberName}
          className="button like"
        >
          <span title={name}>{emoji}</span>
        </div>
      )
    } else {
      console.log("No split for:", memberName);    
    }
  }).filter( item => !!item )

  while (memberDivs.length < 3) {
    memberDivs.push(<div className="button like"/>)
  }
  if (memberDivs.length < 4) {
    memberDivs.push(
      <StartButton 
        emoji=""
        $live={true}
        action={start}
        createdTime={+new Date()}
        name
        text="Start Now"
      />
    )
  }
  

  return (
    <div className="members">
      {memberDivs}
    </div>
  )
}