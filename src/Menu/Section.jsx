/**
 * src/Menu/Section.jsx
 * 
 * Creates a section for the Menu with a disclosure button to
 * hide the section's contents.
 * 
 * Called by Panel.jsx, via either PageTracker.jsx or 
 * src/Pages/Play/PlayActions.jsx
 */


import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize, toneColor } from '../Utilities/helpers'
import { Disclose } from '../Components/Disclose'


export const Section = ({
  section,    // "pages" | "play"
  title,      // "Pages" | "Actions"
  open,       // boolean
  toggleOpen, // function
  items,      // { text: <string>,
              //   type: "play",
              //   callback: setUpVoting,
              //   level: ADMIN,
              //   colour: "#660"
              // } OR {
              //   text: <string>,
              //   type: "link",
              //   to: "/details"
              // }
  page // required for call from PageTracker. Used in Panel.jsx
       // to determine whether to show the Actions section
}) => {

  const toggleSection = () => {
    toggleOpen(section, !open)
  }


  title = title || capitalize(section)


  /** Called by list mapper if type === "page" */
  const getLink = ({ text, type, to }) => {
    // Add .here class to the link to the current page
    const className = to === page ? "button here" : "button"
    return (
      <Link
        to={to}
        className={className}
        draggable="false"
      >
        {text}
      </Link>
    )
  }


  /** Called by list mapper if type === "play" */
  const getButton = ({ text, callback, colour }) => {
    const style = {
      backgroundColor: colour ? colour : "inherit",
      borderColor: colour ? toneColor(colour, 2) : "inherit"
    }
    return (
      <button
        onClick={callback}
        style={style}
      >
        {text}
      </button>
    )
  }


  const list = items.map( data => {
    const { type, text } = data

    const item = (() => {
      switch (type) {
        // <<< Request from PageTracker
        case "link":
          return getLink(data)

        case "divider":
          return <>
            <span className="hr"><hr/></span>
            <span>{text}</span>
            <span><hr/></span>
          </>
        // >>> <<< Request from PlayActions
        case "play":
          return getButton(data)
        // >>>
      }
    })()

    return (
      <li
        key={text}
        draggable={false}
      >
        {item}
      </li>
    )
  })


  return (
    <div className="menu-section">
      <label htmlFor={section}>
        <input
          type="checkbox"
          id={section}
          onChange={toggleSection}
          checked={open}
        />
        <Disclose open={open} />
        <span className="section-title">{title}</span>
        <ul>
          {list}
        </ul>
      </label>
    </div>
  )
}