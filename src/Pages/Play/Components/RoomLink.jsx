/**
 * src/Components/RoomLink.jsx
 */


import React, { useContext, useEffect, useState } from 'react'
import { toString } from 'qrcode' 
import { WSContext } from '../../../Contexts'
import { Copy } from '../../../Components/Copy'
import { copyToClipboardAsync } from '../../../Utilities/helpers'



export const RoomLink = () => {
  const { room } = useContext(WSContext)
  const [ src, setSrc ] = useState()
  const [ collapsed, setCollapsed ] = useState(true)
  
  const href = location.href.replace(/(?<=play).*/, "")
  const roomLink = `${href}/${encodeURI(room)}`
  

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }


  const copyToClipboard = () => {
    copyToClipboardAsync(roomLink) // returns a promise
  }


  const createQRCode = () => {
    function callback(error, string) {
      if (error) {
        return console.log("error:", error);
      }

      if (string) {
        // https://stackoverflow.com/a/71546193/1927589
        const blob = new Blob([string], { type: "image/svg+xml" })
        const src = URL.createObjectURL(blob)
        setSrc(src)
      }
    }

    toString(roomLink, { type: "svg" }, callback)
  }

  useEffect(createQRCode, [])


  const imgStyle = {
    width: collapsed ? "10vw" : "100%",
    cursor: "pointer"
  }


  const aStyle = {
    display: collapsed ? "none" : "inherit"
  }


  return (
    <div
      id="room-link"
      onClick={toggleCollapsed}
    >
      <img
        src={src}
        alt={`qrcode for ${roomLink}`}
        style={imgStyle}
      />

      <div
        style={aStyle}
      >
        <a href={roomLink}> {roomLink}</a>
        <Copy
          action={copyToClipboard}
        />
      </div>
    </div>
  )
}