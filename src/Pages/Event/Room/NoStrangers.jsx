/**
 * src/Pages/Event/Room/NoStrangers.jsx
 */


import React, { useContext } from 'react'
import { EventContext } from '../../../Contexts'


export const NoStrangers = () => {
  const { noStrangers, setNoStrangers } = useContext(EventContext)
  

  const toggleNoStrangers = () => {
    setNoStrangers(!noStrangers)
  }


  return (
    <button
      className="noStrangers"
    >
      <label>
        <input
          type="checkbox"
          onChange={toggleNoStrangers}
          checked={noStrangers}
        />
        <span
          className={noStrangers ? "stranger" : "danger" }
        >
          👽
        </span>
        <span
          className={noStrangers ? "danger" : "hidden" }
        >
          🚫
        </span>
      </label>
     
    </button>
  )
}