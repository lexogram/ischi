/**
 * src/Pages/Play/Components/TeamCard.jsx
 */


import React from 'react'
import { SelectSound } from './SelectSound'


export const TeamCard = ({ name, color, sound, members }) => {

  const style = {
    backgroundColor: color
  }


  const membersList = members.map(({ user_id, user_name }) => {
    <li
      key={user_id}
    >
      {user_name}
    </li>
  })

  return (
    <div
     className="team"
     style={style}
    >
      <h1>{name}</h1>
      <SelectSound />
      <ul>
        {membersList}
      </ul>
    </div>
  )
}