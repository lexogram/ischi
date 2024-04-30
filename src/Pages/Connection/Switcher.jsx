/**
 * frontend/src/pages/Connection/Switcher.jsx
 */


import React from 'react'


export const Switcher = ({
  actions,
  action,
  setAction,
  setLogInstead
}) => {

  const switchAction = event => {
    const name = event.target.name
    if (name !== action) {
      setLogInstead(false)
      setAction(name)
    }
  }


  const buttons = Object.entries(actions).map(([ key, text ]) => {
    const className = key === action ? "active" : ""
    return (
      <button
        type="button" // MUST assign type: default is "submit"
        className={className}
        key={key}
        name={key}
      >
        {text}
      </button>
    )
  })


  return (
    <div
      className="switcher"
      onClick={switchAction}
    >
      {buttons}
    </div>
  )
}