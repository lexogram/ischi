/**
 * src/Pages/Event/Room/Participants.jsx
 */


import React, { useContext, useEffect, useState } from 'react'
import { WSContext } from '../../../Contexts'

const SPLIT_NAME_REGEX = /(.*)_(.*)/


export const Participants = (props) => {
  const { members } = useContext(WSContext)
  

  const memberEntries = Object.values(members || {})

  const memberList = memberEntries.map( memberName => {
    const match = SPLIT_NAME_REGEX.exec(memberName)
    if (match) {
      const [ , emoji, name ] = match

      return (
        <li
          key={memberName}
          className="button like"
        >
          <span title={name}>{emoji}</span>
        </li>
      )
    } else {
      console.log("No split for:", memberName);
      
    }
  }).filter( item => !!item )
  

  return (
    <div className="members">
      <ul>{memberList}</ul>
    </div>
  )
}