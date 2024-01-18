/**
 * src/Components/PageTracker.jsx
 * 
 * Creates a Section with links to the pages accessible by the
 * user.
 */


import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Section } from './Section'


export const PageTracker = (props) => {
  const pages = <Section
    section="pages"
    {...props} // { open, toggleOpen, page }
    items={[
      { text: "Home",        type: "link",     to: "/" },
      { text: "Play",        type: "link",     to: "/play" },
      { text: "Create",      type: "link",     to: "/create" },
      { text: "community",   type: "divider"},
      { text: "Log in / Register",type: "link",to: "/login" },
      { text: "Account",     type: "link",     to: "/o/account" },
      { text: "information", type: "divider"},
      { text: "About",       type: "link",     to: "/about" },
      { text: "Contact",     type: "link",     to: "/contact" },
      { text: "Credits",     type: "link",     to: "/credits" },
      { text: "Insights",    type: "link",     to: "/details" }
    ]}
  />

  return pages
}