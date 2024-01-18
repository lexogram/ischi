/**
 * src/Components/PageTracker.jsx
 * 
 * Creates a Section with links to the pages accessible by the
 * user.
 */


import React from 'react'
import { Section } from './Section'


export const PageTracker = (props) => {
  const items = [
    { text: "Home",        type: "link",     to: "/"          },
    { text: "Play",        type: "link",     to: "/play"      },
    { text: "Create",      type: "link",     to: "/create"    },
    { text: "community",   type: "divider"},
    { text: "Log in / Register",type: "link",to: "/login"     },
    { text: "Account",     type: "link",     to: "/o/account" },
    { text: "information", type: "divider"},
    { text: "About",       type: "link",     to: "/about"     },
    { text: "Contact",     type: "link",     to: "/contact"   },
    { text: "Credits",     type: "link",     to: "/credits"   },
    { text: "Insights",    type: "link",     to: "/details"   }
  ]

  const actions = {
    section: "pages",
    ...props, // { open, toggleOpen, page }
    items
  }
  
  return <Section {...actions} />
}