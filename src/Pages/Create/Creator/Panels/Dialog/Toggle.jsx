/**
 * src/Pages/Create/Creator/Panels/Dialog/Toggle.jsx
 */


import React from 'react'


export const Toggle = ({
  prop,
  title,
  offText,
  onText,
  checked,
  action,
  className
}) => {

  
  const doAction = () => {
    action(!checked)
  }
  

  return (
    <div
      className={className}
    >
      <p>{title}</p>
      <label
        className="two-way"
      >
        <input
          type="checkbox"
          name={prop}
          checked={checked}
          onChange={doAction}
        />
        <span className="pre">{offText}</span>
        <span className="slot"/>
        <span className="post">{onText}</span>
      </label>
    </div>
  )
}

