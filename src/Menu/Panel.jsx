/**
 * src/Components/Menu.jsx
 */


import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import { NavContext } from '../Contexts'
import { usePage } from '../Hooks/usePage'
import '../SCSS/menu.scss'

import { Icon } from './Icon'
import { PageTracker } from './PageTracker'
import { PlayActions } from '../Pages/Play/PlayActions'



export const Menu = () => {
  const { setOutletLeft } = useContext(NavContext)
  const menuRef = useRef()
  const page = usePage()
  const [ fixMenu, setFixMenu ] = useState(false)
  const [ open, setOpen ] = useState(true)
  const [ sectionIsOpen, setSectionIsOpen ] = useState({
    pages: true,
    play: true
  })


  const updateOutletWidth = () => {
    if (fixMenu) {
      const { width } = menuRef.current.getBoundingClientRect()
      setOutletLeft(width)

    } else {
      setOutletLeft(0)
    }

    // The className of div#root affects the width of <Outlet />
    const set = fixMenu ? "add" : "remove"
    document.getElementById("root").classList[set]("fixed-menu")
  }


  const toggleFixMenu = () => {
    setFixMenu(!fixMenu)
    // updateOutletWidth() will be called by useEffect
  }


  const style = {
    left: (open || fixMenu ? 0 : "calc(-1 * var(--menu-width))")
  }


  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }, [])

  useEffect(updateOutletWidth, [fixMenu])


  const toggleOpen = (section, state) => {
    setSectionIsOpen({ ...sectionIsOpen, [section]: state })
  }


  return (
    <div id="menu"
      style={style}
      ref={menuRef}
    >
      { !fixMenu &&
        <Icon
          open={open}
          setOpen={setOpen}
        />
      }

      <div className="items">
        {/* More local actions will go here */}
        { page === "/play" &&
          <PlayActions
            open={sectionIsOpen.play}
            toggleOpen={toggleOpen}
          />
        }
        <PageTracker
          open={sectionIsOpen.pages}
          toggleOpen={toggleOpen}
          page={page}
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