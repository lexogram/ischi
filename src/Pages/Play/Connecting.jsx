/**
 * src/Pages/Connecting.jsx
 */


import React, { useState, useEffect } from 'react'


export const Connecting = (props) => {
  const [ dotCount, setDotCount ] = useState(0)
  const dots = ".".repeat(dotCount)  
  

  const cycleDots = () => {
    setDotCount((dotCount + 1) % 4)
  }


  useEffect(() => {
    setTimeout(cycleDots, 500)
  })


  return (
    <h1 id="connecting">Connecting{dots}</h1>
  )
}