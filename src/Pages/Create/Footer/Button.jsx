/**
 * src/Pages/Create/Footer/Button.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../Contexts'


export const Button = ({
  text,
  role,
  action,
  className,
  disabled
}) => {
  const { dialog, setDialog } = useContext(CreatorContext)
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
      disabled={disabled}
    >
      {text}
    </button>
  )
}