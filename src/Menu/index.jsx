/**
 * src/Components/Menu.jsx
 */


import React, { useState, useEffect } from 'react'
import '../SCSS/menu.scss'

import { Icon } from './Icon'


export const Menu = (props) => {
  const [ fixMenu, setFixMenu ] = useState(false)
  const [ open, setOpen ] = useState(true)


  const toggleFixMenu = () => {
    const fix = !fixMenu

    // The className of div#root affects the width of <Outlet />
    const set = fix ? "add" : "remove"
    document.getElementById("root").classList[set]("fixed-menu")

    setFixMenu(fix)
  }


  const style = {
    left: (open || fixMenu ? 0 : "calc(-1 * var(--menu-width))")
  }


  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }, [])


  return (
    <div id="menu"
      style={style}
    >
      { !fixMenu &&
        <Icon
          open={open}
          setOpen={setOpen}
        />
      }



      <label htmlFor="fix-menu">
        <input
          type="checkbox"
          id="fix-menu"
          name="fix_menu"
          onChange={toggleFixMenu}
          checked={fixMenu}
        />
        <span>Fix menu</span>
      </label>
    </div>
  )
}