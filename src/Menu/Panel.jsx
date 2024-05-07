/**
 * src/Components/Menu.jsx
 * 
 * Generates a slide-out menu with sections for Actions and Pages
 */


import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import { NavContext } from '../Contexts'
import { usePage } from '../Hooks/usePage'
// import '../SCSS/menu.scss'

import { Icon } from './Icon'
import { PageTracker } from './PageTracker'
import { PlayActions } from '../Pages/Play/Components/PlayActions'
import { Languages } from '../Components/Languages'



export const Menu = () => {
  const { setOutletLeft } = useContext(NavContext)
  // 0 by default
  const menuRef = useRef()
  const page = usePage() // "/hash" from "http://site.com/#/hash"
  // Will be compared in <Section /> to the `to` link in the items
  // defined by PageTracker, in order to highligh the current page

  // Make menu slide away (unfixed) by default
  const [ fixMenu, setFixMenu ] = useState(false)
  // Initially show menu open
  const [ open, setOpen ] = useState(true)
  // Disclose all sections in menu by default
  const [ sectionIsOpen, setSectionIsOpen ] = useState({
    pages: true,
    play: true
  })


  /** Called by useEffect if Fix Menu button toggled
   *  Moves Outlet content away from menu if it's to be fixed open
   */
  const updateOutletWidth = () => {
    if (fixMenu) {
      // --menu-width is min(15em, 50vw) (in app.scss), so it can
      // change  depending on the width of the viewport
      const { width } = menuRef.current.getBoundingClientRect()
      setOutletLeft(width)

    } else {
      setOutletLeft(0)
    }

    // The className of div#root adjusts the width of <Outlet />
    // by --menu-width, or 0
    const set = fixMenu ? "add" : "remove"
    document.getElementById("root").classList[set]("fixed-menu")
  }


  const toggleFixMenu = () => {
    setFixMenu(!fixMenu)
    // updateOutletWidth() will be called by useEffect
  }


  const style = {
    // Move Menu left if it's neither open nor fixed
    left: (open || fixMenu ? 0 : "calc(-1 * var(--menu-width))")
  }


  /** Slide the Menu off to the left after the user has seen it */
  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }, [])

  useEffect(updateOutletWidth, [fixMenu])


  /** Called by a click on a section disclosure triangle */
  const toggleOpen = (section, state) => {
    setSectionIsOpen({ ...sectionIsOpen, [section]: state })
  }


  return (
    <div id="menu"
      style={style} // { left }
      ref={menuRef}
    >
      { !fixMenu && // hide icon if Menu is fixed open
        <Icon
          open={open}
          setOpen={setOpen}
        />
      }

      <div className="items">
        {/* More local actions will go here */}
        {/* { page === "/play" &&
          <PlayActions
            open={sectionIsOpen.play}
            toggleOpen={toggleOpen}
          />
        } */}
        <PageTracker
          open={sectionIsOpen.pages}
          toggleOpen={toggleOpen}
          page={page}
        />
        <Languages />
      </div>

      <label htmlFor="fix-menu">
        <input
          type="checkbox"
          name="fix_menu"
          onChange={toggleFixMenu}
          checked={fixMenu}
        />
        <span>Fix menu</span>
      </label>
    </div>
  )
}