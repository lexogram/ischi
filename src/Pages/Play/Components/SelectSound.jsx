/**
 * src/Pages/Play/Components/SelectSound.jsx
 */


import React, { useRef } from 'react'


export const SelectSound = (props) => {

  const audioRef = 

  const previewSFX = ({ value }) => {
    
  }

  return (
    <select
      name="sfx"
      id="sfx"
      onChange={previewSFX}
    > 
      <option value="audio/pop.mp3">pop</option>
      <option value="audio/clink.mp3">clink</option>
      <option value="audio/bong.mp3">bong</option>
      <option value="audio/pow.mp3">pow</option>
      <option value="audio/rise.mp3">rise</option>
      <option value="audio/ping.mp3">ping</option>
      <option value="audio/quack.mp3">quack</option>
      <option value="audio/trill.mp3">trill</option>
    </select>
  )
}