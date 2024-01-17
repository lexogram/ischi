/**
 * src/Components/MemberList.jsx
 */


import React, { useContext } from 'react'
import { WSContext } from '../../../Contexts'

export const MemberList = () => {
  const { members, user_id, owner_id } = useContext(WSContext)
  // members = { <uuid>: <user_name>, ...}


  const alphabetically = (a, b) => {
    // [ <name>, <user_id> ]
    if (a[0] === user_id) {
      return -1
    } else if (b[0] === user_id) {
      return 1
    } else {
      return a[1] > b[1]
    }
  }


  const memberList = Object.entries(members)
    .sort(alphabetically)
    .map(( entry ) => {
      const [ user_id, name ] = entry
      const className = user_id === owner_id ? "owner" : ""
      return (
        <li
          key={user_id}
          className={className}
        >
          {name}
        </li>
      )
    })

  return (
    <ul
      id="memberList"
      
    >
      {memberList}
    </ul>
  )
}