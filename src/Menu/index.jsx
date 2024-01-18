/**
 * src/Components/Menu.jsx
 */


import React, { useState, useEffect } from 'react'
import '../SCSS/menu.scss'

import { Icon } from './Icon'
import { PageTracker } from './PageTracker'
import { Section } from './Section'



export const Menu = () => {
  const [ fixMenu, setFixMenu ] = useState(true)
  const [ open, setOpen ] = useState(true)
  const [ sectionIsOpen, setSectionIsOpen ] = useState({
    pages: true
  })



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


  const toggleOpen = (section, state) => {
    setSectionIsOpen({ ...sectionIsOpen, [section]: state })
  }


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

      <div className="items">
        {/* More local actions will go here */}
        <PageTracker
          open={sectionIsOpen.pages}
          toggleOpen={toggleOpen}
        />
      </div>

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