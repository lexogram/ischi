/**
 * src/Routes/Event/Lobby.jsx
 */


import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { EventContext } from '../../Contexts';

export const Lobby = (props) => {
  const { host, player } = useParams()
  const { avatar } = useContext(EventContext)

  console.log("host:", host);
  console.log("player:", player);
  

  return (
    <div style={{ textAlign: "center" }}>
      <p>You are registered as:</p>
      <h1>{avatar}</h1>
      <h2>Game coming soon : )</h2>
    </div>
  )
}