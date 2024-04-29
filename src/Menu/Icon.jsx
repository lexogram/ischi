/**
 * src/Menu/Icon.jsx
 */


import React, { useState } from 'react'


export const Icon = ({ open, setOpen }) => {
  const [ over, setOver ] = useState(true)
  
  const toggleOver = ({ type }) => {
    setOver(type === "mouseenter")
  }

  const openMenu = () => {
    open = !open
    setOpen(open)

    if (open) {
      // Prepare to close the menu automatically if the next
      // click is not on the menu
      const close = ({ target }) => {
        console.log("target:", target);
        if (target.closest("#menu")) {
          return
        }

        setOpen(false)
        document.body.removeEventListener("mousedown", close)
        document.body.removeEventListener("touchstart", close)
      }

      document.body.addEventListener("mousedown", close)
      document.body.addEventListener("touchstart", close)
    }
  }

  const openLeft = "calc(var(--menu-width) - var(--icon-size))"
  
  const style = {
    opacity: (open ? "1" : (over ? "0.75" : "0.25")),
    left: (open ? openLeft : "0"),
    // transitionProperty: "left, opacity", // for reference
    transitionDelay: (open ? ".1s, 0s" : "0s, .3s"),
  }

  return (
    <svg
      id="icon"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      onClick={openMenu}
      onMouseEnter={toggleOver}
      onMouseLeave={toggleOver}
      style={style}
    >
      <g
        className="menu"
        strokeWidth="20"
        strokeLinecap="round"
      >
        <path d="M5,20 L5,80 H95 L95,20 z"
          fill="#0000" // transparent, but still opaque to mouse
          stroke="none"
        />
        <line x1="15" y1="20" x2="85" y2="20" />
        <line x1="15" y1="50" x2="85" y2="50" />
        <line x1="15" y1="80" x2="85" y2="80" />     
      </g>
    </svg>
  )
}