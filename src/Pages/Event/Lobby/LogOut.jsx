/**
 * src/Pages/Event/Lobby/LogOut.jsx
 */


import React, { useContext } from 'react'
import { EventContext } from '../../../Contexts'


export const LogOut = (props) => {
  const { emoji } = useContext(EventContext)


  return (
    <button className="log-out"><span>{emoji}</span></button>
  )
}