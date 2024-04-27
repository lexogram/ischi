/**
 * src/Pages/Create/Creator/Footer/Button.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'


export const Button = ({ text, role, action, className }) => {
  const { dialog, setDialog } = useContext(LayoutContext)
  const doToggle = role && role === dialog
  // If className is "primary" (for Sign In), this takes priority
  // If this button opened a dialog, show it in its pressed state
  className = className || (doToggle ? "pressed" : undefined)


  const triggerAction = () => {
    if (doToggle) {
      setDialog()
    } else {
      action()
    }
  }
  

  return (
    <button
      className={className}
      onClick={triggerAction}
    >
      {text}
    </button>
  )
}