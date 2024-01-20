/**
 * src/Pages/Connecting.jsx
 * 
 * Used both as the main page when first connecting and as a
 * semi-transparent overlay when the connection is unexpectedly
 * broken.
 */


import React, { useState, useEffect } from 'react'


export const Connecting = ({ reconnecting }) => {
  const [ dotCount, setDotCount ] = useState(0)
  const dots = ".".repeat(dotCount)  
  

  const cycleDots = () => {
    setDotCount((dotCount + 1) % 4)
  }


  useEffect(() => {
    setTimeout(cycleDots, 500)
  })


  const text = (reconnecting)
    ? "Attempting to reconnect"
    : "Connecting"


  return (
    <div
      id="connecting"
      className={reconnecting ? "reconnecting" : ""}
    >
      <h1>{text}{dots}</h1>
    </div>
  )
}