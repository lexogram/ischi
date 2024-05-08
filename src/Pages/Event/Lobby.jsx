/**
 * src/Routes/Event/Lobby.jsx
 */


import React from 'react'
import { useParams } from 'react-router-dom';


export const Lobby = (props) => {
  const { host, player } = useParams()
  console.log("host:", host);
  console.log("player:", player);
  

  return (
    <h1>Lobby goes here</h1>
  )
}