/**
 * src/Pages/Create/Creator/Button/index.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'


export const Tab = ({ content, role }) => {
  const {
    activeTab,
    setActiveTab,
    columns,
    setDialog
  } = useContext(LayoutContext)
  const className = activeTab === role ? "selected" : ""


  const selectTab = ({ target }) => {
    while (target) {
      if (target.tagName === "BUTTON") {
        break
      }
      target = target.parentNode
    }
    
    if (columns && activeTab === "help") {
      // The "help" tab should act as a toggle when both "gallery"
      // and "cards" are showing.
      setActiveTab("gallery") // arbitrary: "cards" is good too

    } else if (!className) {
      // Switch to the chosen panel
      const { name } = target
      setActiveTab(name)

      if (name === "help") {
        // Close any dialogs that may be open
        setDialog()
      }
    }
  }


  return (
    <button
      name={role}
      className={className}
      onClick={selectTab}
    >
      {content}
    </button>
  )
}