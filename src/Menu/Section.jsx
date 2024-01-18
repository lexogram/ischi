/**
 * src/Menu/Section.jsx
 */


import React from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../Utilities/helpers'
import { Disclose } from '../Components/Disclose'


export const Section = ({ 
  section, 
  open,
  toggleOpen,
  items,
  page // required for call from PageTracker
}) => {

  const toggleSection = () => {
    toggleOpen(section, !open)
  }

  const title = capitalize(section)

  
  const getLink = ({ text, type, to }) => {
    // Add .here class to the link to the current page
    const className = to === page ? "here" : ""
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