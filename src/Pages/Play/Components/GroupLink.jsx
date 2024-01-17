/**
 * src/Components/GroupLink.jsx
 */


import React, { useContext, useEffect, useState } from 'react'
import { toString } from 'qrcode' 
import { WSContext } from '../../../Contexts'
import { Copy } from '../../../Components/Copy'
import { copyToClipboardAsync } from '../../../Utilities/helpers'



export const GroupLink = () => {
  const { group_name } = useContext(WSContext)
  const [ src, setSrc ] = useState()
  const [ collapsed, setCollapsed ] = useState(true)
  
  const { origin, pathname, hash } = location
  const group = encodeURI(group_name)
  const groupLink = `${origin}${pathname}${hash}?group=${group}`
  

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }


  const copyToClipboard = () => {
    copyToClipboardAsync(groupLink) // returns a promise
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

    toString(groupLink, { type: "svg" }, callback)
  }

  useEffect(createQRCode, [])


  const imgStyle = {
    width: collapsed ? "20%" : "100%",
    cursor: "pointer"
  }


  const aStyle = {
    display: collapsed ? "none" : "inherit"
  }


  return (
    <div
      id="group-link"
      onClick={toggleCollapsed}
    >
      <img
        src={src}
        alt={`qrcode for ${groupLink}`}
        style={imgStyle}
      />

      <div
        style={aStyle}
      >
        <a href={groupLink}> {groupLink}</a>
        <Copy
          action={copyToClipboard}
        />
      </div>
    </div>
  )
}