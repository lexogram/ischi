/**
 * src/Pages/Create/Creator/Button/index.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'


export const Tab = ({ content, role }) => {
  const {
    activeTab,
    setActiveTab,
    columns
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
      setActiveTab("cards")
    } else if (!className) {
      const { name } = target
      setActiveTab(name)
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