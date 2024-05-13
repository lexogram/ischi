/**
 * src/Components/QRCode.jsx
 */


import React, { useEffect, useState } from 'react'
import { toString } from 'qrcode' 
import { Copy } from './Copy'
import { copyToClipboardAsync } from '../Utilities/helpers'



export const QRCode = ({ link }) => {
  const [ src, setSrc ] = useState()
  const [ collapsed, setCollapsed ] = useState(true)
  

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }


  const copyToClipboard = () => {
    copyToClipboardAsync(link) // returns a promise
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

    toString(link, { type: "svg" }, callback)
  }

  useEffect(createQRCode, [])


  const imgStyle = {
    width: collapsed ? "10vw" : "80vmin",
    cursor: "pointer"
  }


  const aStyle = {
    display: collapsed ? "none" : "inherit",
    width: "80vmin"
  }


  return (
    <div
      className="qrcode"
      onClick={toggleCollapsed}
    >
      <img
        src={src}
        alt={`qrcode for ${link}`}
        style={imgStyle}
      />

      <div
        style={aStyle}
      >
        <a href={link}> {link}</a>
        <Copy
          action={copyToClipboard}
        />
      </div>
    </div>
  )
}